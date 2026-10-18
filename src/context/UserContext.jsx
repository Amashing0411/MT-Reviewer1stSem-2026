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

  // Theme Management (Light / Dark Mode with localStorage persistence)
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("mt_reviewer_theme_2026");
      if (saved === "dark" || saved === "light") return saved;
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } catch {
      return "light";
    }
  });

  useEffect(() => {
    try {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("mt_reviewer_theme_2026", theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Background helper to upload profile to Vercel KV cloud
  const pushProfileToCloud = async (currentProfile) => {
    // DO NOT upload unconfigured default profiles or ghost visits
    if (!currentProfile || !currentProfile.id || !currentProfile.isConfigured) return;
    if (currentProfile.name?.startsWith("Student #") && (!currentProfile.xp || currentProfile.xp === 0)) return;

    try {
      const payload = {
        id: currentProfile.id,
        name: currentProfile.name,
        section: currentProfile.section || "BSCPE 4D",
        avatar: currentProfile.avatar || "🤖",
        frame: currentProfile.frame || "default",
        tagline: currentProfile.tagline || "",
        customPhoto: currentProfile.customPhoto || null,
        xp: currentProfile.xp || 0,
        levelInfo: getLevelInfo(currentProfile.xp),
        fastestBlitz: currentProfile.fastestBlitzSeconds || null,
        highestPercent: currentProfile.highestScorePercent || 0,
        subjectStats: currentProfile.subjectStats || {},
        pin: currentProfile.pin || null,
      };
      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.isCloudConnected && Array.isArray(data.roster)) {
          const localRoster = loadClassRoster();
          const merged = mergeCloudRoster(localRoster, data.roster, currentProfile.id);
          saveClassRoster(merged);
          setRosterVersion((v) => v + 1);
        }
      }
    } catch (e) {}
  };

  // Restore profile from Vercel KV cloud by Name + 4-Digit PIN
  const restoreProfileFromCloud = async (name, pin) => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "restore",
          name: name.trim(),
          pin: pin ? pin.trim() : "",
        }),
      });
      const data = await res.json();
      if (res.ok && data.ok && data.profile) {
        const p = data.profile;
        const restored = {
          ...profile,
          id: p.id || profile.id,
          name: p.name,
          section: p.section || "BSCPE 4D",
          avatar: p.avatar || "🤖",
          frame: p.frame || "default",
          tagline: p.tagline || "🎓 4th Year Candidate",
          customPhoto: p.customPhoto || null,
          pin: pin ? pin.trim() : (p.pin || ""),
          xp: Number(p.xp) || 0,
          fastestBlitzSeconds: p.fastestBlitz || null,
          highestScorePercent: p.highestPercent || 0,
          subjectStats: p.subjectStats || {},
          isConfigured: true,
          isAnon: false,
        };
        setProfile(restored);
        saveProfile(restored);
        sound.playFanfare();
        confetti({ particleCount: 90, spread: 70, origin: { y: 0.5 } });
        setXpToast(`🎉 Restored ${restored.name} (${restored.xp.toLocaleString()} XP) to this device!`);
        setTimeout(() => setXpToast(null), 4500);
        return { ok: true, profile: restored };
      } else {
        return { ok: false, error: data.error || "Profile could not be restored." };
      }
    } catch (err) {
      return { ok: false, error: err.message || "Network error. Please try again." };
    } finally {
      setIsSyncing(false);
    }
  };

  // Force flush cloud database for a completely clean start
  const flushCloudDatabase = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "flush_clean_all" }),
      });
      if (res.ok) {
        saveClassRoster([]);
        setRosterVersion((v) => v + 1);
        setXpToast("✨ Clean start! Cloud leaderboard has been cleared.");
        setTimeout(() => setXpToast(null), 3500);
        return true;
      }
      return false;
    } catch {
      return false;
    } finally {
      setIsSyncing(false);
    }
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
        if (profile?.isConfigured && (!profile.name?.startsWith("Student #") || profile.xp > 0)) {
          await pushProfileToCloud(profile);
        }
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
    if (isCloudConnected && profile?.isConfigured && (!profile.name?.startsWith("Student #") || profile.xp > 0)) {
      pushProfileToCloud(profile);
    }
  }, [profile, isCloudConnected]);

  // Initial cloud sync check on mount
  useEffect(() => {
    syncWithCloud();
  }, []);

  // Handle URL query parameters: 1-Tap Sync (?sync=...) or Classmate Scorecard (?score=...)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      
      // 1-Tap Device Sync (Transfer account to phone)
      const syncCode = params.get("sync");
      if (syncCode) {
        const entry = decodeScorecard(syncCode);
        if (entry && entry.name) {
          const restored = {
            ...profile,
            id: entry.id || profile.id,
            name: entry.name,
            section: entry.section || "BSCPE 4D",
            avatar: entry.avatar || "🤖",
            customPhoto: entry.customPhoto || null,
            pin: entry.pin || params.get("pin") || profile.pin || "",
            xp: Number(entry.xp) || 0,
            fastestBlitzSeconds: entry.fastestBlitz || null,
            highestScorePercent: entry.highestPercent || 0,
            subjectStats: entry.subjectStats || {},
            isConfigured: true,
            isAnon: false,
          };
          setProfile(restored);
          saveProfile(restored);
          sound.playStreak();
          confetti({ particleCount: 80, spread: 60, origin: { y: 0.5 } });
          setXpToast(`📱 Restored ${restored.name} (${restored.xp.toLocaleString()} XP) on this device!`);
          setTimeout(() => setXpToast(null), 4500);
        }
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      }

      // Classmate Scorecard share
      const scoreCode = params.get("score");
      if (scoreCode) {
        const imported = importScorecard(scoreCode);
        if (imported) {
          setXpToast("🏆 Added classmate to your Standings Leaderboard!");
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
        theme,
        toggleTheme,
        setTheme,
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
        restoreProfileFromCloud,
        flushCloudDatabase,
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
