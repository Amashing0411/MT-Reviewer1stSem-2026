import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  loadProfile, 
  saveProfile, 
  createDefaultProfile, 
  getLevelInfo,
  buildLeaderboard,
  loadClassRoster,
  saveClassRoster,
  decodeScorecard,
  mergeCloudRoster
} from "../utils/gamification";
import { sound } from "../utils/sound";
import confetti from "canvas-confetti";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    const existing = loadProfile();
    return existing || createDefaultProfile();
  });

  const [isWelcomeOpen, setIsWelcomeOpen] = useState(() => {
    const existing = loadProfile();
    return !existing || !existing.isConfigured;
  });

  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [rosterVersion, setRosterVersion] = useState(0);
  const [xpToast, setXpToast] = useState(null);
  const [isCloudConnected, setIsCloudConnected] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Background helper to upload profile to Vercel KV cloud
  const pushProfileToCloud = async (currentProfile) => {
    if (!currentProfile || !currentProfile.id) return;
    try {
      const payload = {
        id: currentProfile.id,
        name: currentProfile.name,
        section: currentProfile.section || "BSCPE 4D",
        avatar: currentProfile.avatar || "🤖",
        customPhoto: currentProfile.customPhoto || null,
        xp: currentProfile.xp || 0,
        levelInfo: getLevelInfo(currentProfile.xp),
        fastestBlitz: currentProfile.fastestBlitzSeconds || null,
        highestPercent: currentProfile.highestScorePercent || 0,
        subjectStats: currentProfile.subjectStats || {},
      };
      await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (e) {}
  };

  // Synchronize with Vercel KV cloud database
  const syncWithCloud = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/leaderboard");
      if (!res.ok) {
        setIsCloudConnected(false);
        return false;
      }
      const data = await res.json();
      if (data.isCloudConnected) {
        setIsCloudConnected(true);
        if (Array.isArray(data.roster)) {
          const localRoster = loadClassRoster();
          const merged = mergeCloudRoster(localRoster, data.roster, profile.id);
          saveClassRoster(merged);
          setRosterVersion((v) => v + 1);
        }
        await pushProfileToCloud(profile);
        return true;
      } else {
        setIsCloudConnected(false);
        return false;
      }
    } catch (err) {
      setIsCloudConnected(false);
      return false;
    } finally {
      setIsSyncing(false);
    }
  };

  // Sync to localStorage whenever profile changes
  useEffect(() => {
    saveProfile(profile);
    if (isCloudConnected) {
      pushProfileToCloud(profile);
    }
  }, [profile, isCloudConnected]);

  // Initial cloud sync check on mount
  useEffect(() => {
    syncWithCloud();
  }, []);

  // Import score from URL query parameter (if someone shared a link)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const scoreCode = params.get("score");
      if (scoreCode) {
        const imported = importScorecard(scoreCode);
        if (imported) {
          setXpToast("🏆 Added classmate to your Room 106 Leaderboard!");
          setTimeout(() => setXpToast(null), 3500);
        }
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } catch (e) {}
  }, []);

  // Import a classmate's scorecard code
  const importScorecard = (code) => {
    const entry = decodeScorecard(code);
    if (!entry) return false;
    const roster = loadClassRoster();
    // Avoid duplicate entries with same name
    const filtered = roster.filter((c) => c.name.toLowerCase() !== entry.name.toLowerCase() && c.id !== "me");
    filtered.push(entry);
    saveClassRoster(filtered);
    setRosterVersion((v) => v + 1);
    return true;
  };

  // Add XP with optional celebratory sound & toast
  const addXp = (amount, reason = "Study Reward", subjectId = null) => {
    setProfile((prev) => {
      const prevLevel = getLevelInfo(prev.xp).level;
      const newXp = prev.xp + amount;
      const newLevelInfo = getLevelInfo(newXp);

      // Level up celebration!
      if (newLevelInfo.level > prevLevel) {
        sound.playStreak();
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
        setXpToast(`🎉 LEVEL UP! You are now Level ${newLevelInfo.level} — ${newLevelInfo.title}!`);
        setTimeout(() => setXpToast(null), 4000);
      } else {
        setXpToast(`+${amount} XP: ${reason}`);
        setTimeout(() => setXpToast(null), 2200);
      }

      const updated = {
        ...prev,
        xp: newXp,
      };

      if (subjectId) {
        const stats = { ...(prev.subjectStats || {}) };
        const sub = stats[subjectId] || { xp: 0, highestPercent: 0, fastestBlitz: null, quizzesTaken: 0 };
        stats[subjectId] = {
          ...sub,
          xp: (sub.xp || 0) + amount,
        };
        updated.subjectStats = stats;
      }

      return updated;
    });
  };

  // Record an exam completion
  const recordExamResult = ({ subjectId, score, total, timeSeconds, mode }) => {
    const percent = Math.round((score / total) * 100);
    const earnedXp = score * 100 + (percent >= 80 ? 300 : percent >= 60 ? 150 : 50);

    setProfile((prev) => {
      const updated = { ...prev };
      updated.totalQuizzesTaken = (prev.totalQuizzesTaken || 0) + 1;

      if (percent > (prev.highestScorePercent || 0)) {
        updated.highestScorePercent = percent;
      }

      if (mode === "blitz") {
        if (!prev.fastestBlitzSeconds || timeSeconds < prev.fastestBlitzSeconds) {
          updated.fastestBlitzSeconds = timeSeconds;
        }
      }

      // Update per-subject stats
      const stats = { ...(prev.subjectStats || {}) };
      const curSub = stats[subjectId] || { xp: 0, highestPercent: 0, fastestBlitz: null, quizzesTaken: 0 };
      stats[subjectId] = {
        xp: (curSub.xp || 0) + earnedXp,
        highestPercent: Math.max(curSub.highestPercent || 0, percent),
        fastestBlitz: mode === "blitz"
          ? (curSub.fastestBlitz ? Math.min(curSub.fastestBlitz, timeSeconds) : timeSeconds)
          : curSub.fastestBlitz,
        quizzesTaken: (curSub.quizzesTaken || 0) + 1,
      };
      updated.subjectStats = stats;

      return updated;
    });

    // Award XP
    addXp(earnedXp, `${mode === "blitz" ? "Rapid Blitz" : "Midterm Sim"} (${score}/${total})`, subjectId);
  };

  // Update profile details
  const updateProfile = (data) => {
    setProfile((prev) => ({
      ...prev,
      ...data,
      isConfigured: true,
    }));
  };

  const levelInfo = getLevelInfo(profile.xp);
  // Leaderboard rebuilds with real submissions only
  const leaderboard = buildLeaderboard(profile, "all");
  const getLeaderboard = (subjectFilter = "all") => buildLeaderboard(profile, subjectFilter);

  return (
    <UserContext.Provider
      value={{
        profile,
        levelInfo,
        leaderboard,
        getLeaderboard,
        isWelcomeOpen,
        setIsWelcomeOpen,
        isLeaderboardOpen,
        setIsLeaderboardOpen,
        addXp,
        recordExamResult,
        updateProfile,
        importScorecard,
        isCloudConnected,
        isSyncing,
        syncWithCloud,
      }}
    >
      {children}

      {/* Floating Global XP / Level-Up Toast */}
      {xpToast && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 pointer-events-none animate-popIn">
          <div className="px-3.5 py-2 sm:px-4 sm:py-2.5 bg-slate-900/95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-2 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>{xpToast}</span>
          </div>
        </div>
      )}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
