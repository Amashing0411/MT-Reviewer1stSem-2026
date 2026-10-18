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
  mergeCloudRoster,
  getNewlyUnlockedRewards
} from "../utils/gamification";
import { sound } from "../utils/sound";
import confetti from "canvas-confetti";
import { LevelUpModal } from "../components/LevelUpModal";

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
  const [levelUpReward, setLevelUpReward] = useState(null);
  const [inspectedStudent, setInspectedStudent] = useState(null);
  const [isFeedOpen, setIsFeedOpen] = useState(false);

  // Campus Study Shoutbox Feed State with seed & localStorage cache
  const [feedMessages, setFeedMessages] = useState(() => {
    try {
      const saved = localStorage.getItem("mt_reviewer_feed_cache_2026");
      if (saved) return JSON.parse(saved);
      return [
        {
          id: "seed-1",
          text: "Review well for Midterms guys! Room 106 represents! ⚡",
          studentName: "Room 106 Dean's Lister",
          studentSection: "BSCPE 4D",
          avatar: "🎖️",
          frame: "ruby",
          nameFx: "fire",
          tagline: "🎖️ Room 106 Dean's Lister",
          level: 8,
          createdAt: Date.now() - 1000 * 60 * 25,
        },
        {
          id: "seed-2",
          text: "Don't forget the difference between DFT and FFT formulas sa DSP! 📡",
          studentName: "Signal Architect",
          studentSection: "BSCPE 4A",
          avatar: "⚡",
          frame: "lightning",
          nameFx: "lightning",
          tagline: "📡 DSP Fourier Master",
          level: 6,
          createdAt: Date.now() - 1000 * 60 * 10,
        }
      ];
    } catch {
      return [];
    }
  });

  // Theme Management (Light / Dark Mode with localStorage persistence)
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("mt_reviewer_theme_2026");
      if (saved === "dark" || saved === "light") return saved;
      return "light"; // Default clean institutional light mode
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
        nameFx: currentProfile.nameFx || "none",
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
          nameFx: p.nameFx || "none",
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
        try { sound?.playFanfare?.(); } catch (e) {}
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
        setFeedMessages([]);
        try {
          localStorage.removeItem("mt_reviewer_feed_cache_2026");
        } catch (e) {}
        setRosterVersion((v) => v + 1);
        setXpToast("✨ Clean start! Cloud leaderboard and feed have been cleared.");
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

  // Synchronize with Vercel KV cloud database (Leaderboard + Campus Feed)
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
        if (Array.isArray(data.feed) && data.feed.length > 0) {
          setFeedMessages(data.feed);
          try {
            localStorage.setItem("mt_reviewer_feed_cache_2026", JSON.stringify(data.feed));
          } catch (e) {}
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

  // Send a message to the 4th Year Campus Shoutbox Feed
  const sendFeedMessage = async (text) => {
    if (!text || !text.trim()) return false;
    const cleanText = text.trim().slice(0, 200);
    const newMsg = {
      id: "msg_" + Date.now().toString(36) + "_" + Math.random().toString(36).substr(2, 5),
      text: cleanText,
      studentId: profile.id,
      studentName: profile.name,
      studentSection: profile.section || "BSCPE 4D",
      avatar: profile.avatar || "🤖",
      frame: profile.frame || "default",
      nameFx: profile.nameFx || "none",
      tagline: profile.tagline || "",
      customPhoto: profile.customPhoto || null,
      level: getLevelInfo(profile.xp).level || 1,
      xp: profile.xp || 0,
      fastestBlitz: profile.fastestBlitzSeconds || null,
      highestPercent: profile.highestScorePercent || 0,
      createdAt: Date.now(),
    };

    // Optimistic local update
    setFeedMessages((prev) => {
      const updated = [...prev, newMsg].slice(-50);
      try {
        localStorage.setItem("mt_reviewer_feed_cache_2026", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    try {
      const res = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "post_feed",
          ...newMsg,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.feed)) {
          setFeedMessages(data.feed);
          try {
            localStorage.setItem("mt_reviewer_feed_cache_2026", JSON.stringify(data.feed));
          } catch (e) {}
        }
      }
      return true;
    } catch {
      return true;
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
            frame: entry.frame || "default",
            tagline: entry.tagline || "🎓 4th Year Candidate",
            nameFx: entry.nameFx || "none",
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

  // Add XP with optional celebratory sound & toast
  const addXp = (amount, reason = "Study Reward", subjectId = null) => {
    setProfile((prev) => {
      const prevLevel = getLevelInfo(prev.xp).level;
      const newXp = prev.xp + amount;
      const newLevelInfo = getLevelInfo(newXp);

      // Level up celebration!
      if (newLevelInfo.level > prevLevel) {
        try { sound?.playFanfare?.(); } catch (e) {}
        confetti({
          particleCount: 120,
          spread: 85,
          origin: { y: 0.5 },
        });
        const unlocked = getNewlyUnlockedRewards(prev.xp, newXp);
        if (unlocked) {
          setLevelUpReward(unlocked);
        }
        setXpToast(`🎉 LEVEL UP! You reached Level ${newLevelInfo.level} — ${newLevelInfo.title}!`);
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

  // Update profile details with immediate force-save and cloud sync
  const updateProfile = (data) => {
    let updatedProfile;
    setProfile((prev) => {
      updatedProfile = {
        ...prev,
        ...data,
        isConfigured: true,
      };
      saveProfile(updatedProfile);
      return updatedProfile;
    });

    if (updatedProfile && isCloudConnected) {
      pushProfileToCloud(updatedProfile);
    }
    return updatedProfile;
  };

  // Toggle flashcard mastery status and award XP strictly ONCE per card and deck
  const toggleFlashcardMastered = (cardKey, subjectId, subjectCode, totalDeckCards) => {
    let xpAdded = 0;
    let isNowMastered = false;

    setProfile((prev) => {
      const mastered = { ...(prev.masteredFlashcards || {}) };
      const claimedCards = { ...(prev.claimedFlashcards || {}) };
      const completedDecks = { ...(prev.completedDecks || {}) };

      if (mastered[cardKey]) {
        // Toggle OFF: unmark as mastered, but NEVER deduct or re-award XP
        delete mastered[cardKey];
        isNowMastered = false;
        return {
          ...prev,
          masteredFlashcards: mastered,
        };
      }

      // Toggle ON: mark as mastered
      mastered[cardKey] = true;
      isNowMastered = true;

      // Count total mastered in this subject deck
      let subjectMasteredCount = 0;
      Object.keys(mastered).forEach((k) => {
        if (k.startsWith(`${subjectId}_`)) {
          subjectMasteredCount++;
        }
      });
      const isDeckComplete = totalDeckCards > 0 && subjectMasteredCount >= totalDeckCards;

      let reason = "";
      // Award 25 XP strictly ONCE per card
      if (!claimedCards[cardKey]) {
        claimedCards[cardKey] = true;
        xpAdded += 25;
        reason = `${subjectCode} Flashcard Mastered`;
      }

      // Award 200 XP deck bonus strictly ONCE per deck
      if (isDeckComplete && !completedDecks[subjectId]) {
        completedDecks[subjectId] = true;
        xpAdded += 200;
        reason = reason ? `${reason} + 100% Deck Mastery! 🎓` : `100% Deck Mastery: ${subjectCode}! 🎓`;
      }

      if (xpAdded === 0) {
        return {
          ...prev,
          masteredFlashcards: mastered,
        };
      }

      const prevLevel = getLevelInfo(prev.xp).level;
      const newXp = prev.xp + xpAdded;
      const newLevelInfo = getLevelInfo(newXp);

      if (newLevelInfo.level > prevLevel) {
        try { sound?.playFanfare?.(); } catch (e) {}
        confetti({ particleCount: 120, spread: 85, origin: { y: 0.5 } });
        const unlocked = getNewlyUnlockedRewards(prev.xp, newXp);
        if (unlocked) setLevelUpReward(unlocked);
        setXpToast(`🎉 LEVEL UP! You reached Level ${newLevelInfo.level} — ${newLevelInfo.title}!`);
        setTimeout(() => setXpToast(null), 4000);
      } else {
        setXpToast(`+${xpAdded} XP: ${reason}`);
        setTimeout(() => setXpToast(null), 2200);
      }

      const updated = {
        ...prev,
        xp: newXp,
        masteredFlashcards: mastered,
        claimedFlashcards: claimedCards,
        completedDecks: completedDecks,
      };

      if (subjectId) {
        const stats = { ...(prev.subjectStats || {}) };
        const sub = stats[subjectId] || { xp: 0, highestPercent: 0, fastestBlitz: null, quizzesTaken: 0 };
        stats[subjectId] = {
          ...sub,
          xp: (sub.xp || 0) + xpAdded,
        };
        updated.subjectStats = stats;
      }

      return updated;
    });

    return { isNowMastered, xpAdded };
  };

  // Equip newly unlocked rewards (frame, tagline, nameFx)
  const equipRewards = ({ frame, tagline, nameFx }) => {
    let updated;
    setProfile((prev) => {
      updated = { ...prev };
      if (frame) updated.frame = frame;
      if (tagline) updated.tagline = tagline;
      if (nameFx) updated.nameFx = nameFx;
      saveProfile(updated);
      return updated;
    });
    if (updated && isCloudConnected) {
      pushProfileToCloud(updated);
    }
    setLevelUpReward(null);
    setXpToast("✨ New prestige rewards equipped & saved!");
    setTimeout(() => setXpToast(null), 3000);
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
        levelUpReward,
        setLevelUpReward,
        equipRewards,
        addXp,
        recordExamResult,
        updateProfile,
        toggleFlashcardMastered,
        importScorecard,
        isCloudConnected,
        isSyncing,
        syncWithCloud,
        restoreProfileFromCloud,
        flushCloudDatabase,
        feedMessages,
        sendFeedMessage,
        isFeedOpen,
        setIsFeedOpen,
        inspectedStudent,
        setInspectedStudent,
      }}
    >
      {children}

      {/* Prestige Level-Up Victory Modal */}
      <LevelUpModal
        rewardData={levelUpReward}
        profile={profile}
        onEquipAll={equipRewards}
        onClose={() => setLevelUpReward(null)}
      />

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
