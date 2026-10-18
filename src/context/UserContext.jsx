import React, { createContext, useContext, useState, useEffect } from "react";
import { 
  loadProfile, 
  saveProfile, 
  createDefaultProfile, 
  getLevelInfo,
  buildLeaderboard 
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
  const [xpToast, setXpToast] = useState(null);

  // Sync to localStorage whenever profile changes
  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  // Add XP with optional celebratory sound & toast
  const addXp = (amount, reason = "Study Reward") => {
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

      return {
        ...prev,
        xp: newXp,
      };
    });
  };

  // Record an exam completion
  const recordExamResult = ({ subjectId, score, total, timeSeconds, mode }) => {
    const percent = Math.round((score / total) * 100);

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

      return updated;
    });

    // Award XP
    const earnedXp = score * 100 + (percent >= 80 ? 300 : percent >= 60 ? 150 : 50);
    addXp(earnedXp, `${mode === "blitz" ? "Rapid Blitz" : "Midterm Sim"} (${score}/${total})`);
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
  const leaderboard = buildLeaderboard(profile);

  return (
    <UserContext.Provider
      value={{
        profile,
        levelInfo,
        leaderboard,
        isWelcomeOpen,
        setIsWelcomeOpen,
        isLeaderboardOpen,
        setIsLeaderboardOpen,
        addXp,
        recordExamResult,
        updateProfile,
      }}
    >
      {children}

      {/* Floating Global XP / Level-Up Toast */}
      {xpToast && (
        <div className="fixed bottom-6 right-6 z-50 pointer-events-none animate-popIn">
          <div className="px-4 py-2.5 bg-slate-900/95 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-2.5 backdrop-blur-md">
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
