// Gamification, Leveling & LocalStorage Engine for MT-Reviewer 2026

export const AVATAR_PRESETS = [
  { id: "bot", emoji: "🤖", label: "Cyber Bot" },
  { id: "circuit", emoji: "⚡", label: "Volt Hacker" },
  { id: "laptop", emoji: "💻", label: "Dev Lead" },
  { id: "brain", emoji: "🧠", label: "Quantum Mind" },
  { id: "tools", emoji: "🛠️", label: "Hardware Eng" },
  { id: "rocket", emoji: "🚀", label: "Topnotcher" },
  { id: "trophy", emoji: "🏆", label: "Dean's Lister" },
  { id: "owl", emoji: "🦉", label: "Night Owl" },
  { id: "coffee", emoji: "☕", label: "Caffeine Fueled" },
  { id: "target", emoji: "🎯", label: "Precision Sniper" },
  { id: "shield", emoji: "🛡️", label: "Cyber Defender" },
  { id: "fire", emoji: "🔥", label: "Combo Striker" },
];

export const LEVELS = [
  { level: 1, title: "Novice Trainee", minXp: 0, maxXp: 300, icon: "🌱" },
  { level: 2, title: "Junior Circuit Hacker", minXp: 300, maxXp: 800, icon: "⚡" },
  { level: 3, title: "System Operator", minXp: 800, maxXp: 1600, icon: "💻" },
  { level: 4, title: "Logic Gate Wizard", minXp: 1600, maxXp: 2700, icon: "🔮" },
  { level: 5, title: "Kernel Architect", minXp: 2700, maxXp: 4200, icon: "🛡️" },
  { level: 6, title: "DSP Mastermind", minXp: 4200, maxXp: 6200, icon: "📡" },
  { level: 7, title: "Cyber Defense Commander", minXp: 6200, maxXp: 8800, icon: "⚔️" },
  { level: 8, title: "Room 106 Dean's Lister", minXp: 8800, maxXp: 12000, icon: "🎖️" },
  { level: 9, title: "National Topnotcher Candidate", minXp: 12000, maxXp: 16000, icon: "👑" },
  { level: 10, title: "Legendary PRC Board Top 1 🏆", minXp: 16000, maxXp: Infinity, icon: "🌟" },
];

export function getLevelInfo(xp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].minXp) {
      const cur = LEVELS[i];
      const next = LEVELS[i + 1] || null;
      const progressInLevel = next ? xp - cur.minXp : 100;
      const levelSpan = next ? next.minXp - cur.minXp : 100;
      const percent = next ? Math.min(100, Math.round((progressInLevel / levelSpan) * 100)) : 100;
      const xpNeeded = next ? next.minXp - xp : 0;
      return {
        ...cur,
        percent,
        xpNeeded,
        nextTitle: next ? next.title : "MAX RANK",
      };
    }
  }
  return { ...LEVELS[0], percent: 0, xpNeeded: 300, nextTitle: LEVELS[1].title };
}

const STORAGE_KEY = "mt_reviewer_student_profile_2026";
const ROSTER_KEY = "mt_reviewer_class_roster_2026";

export function loadProfile() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed.id) {
      parsed.id = "student_" + Date.now().toString(36) + "_" + Math.random().toString(36).substr(2, 6);
      saveProfile(parsed);
    }
    return parsed;
  } catch (e) {
    console.error("Failed to read user profile:", e);
    return null;
  }
}

export function saveProfile(profile) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error("Failed to save user profile:", e);
  }
}

export function loadClassRoster() {
  try {
    const raw = localStorage.getItem(ROSTER_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveClassRoster(roster) {
  try {
    localStorage.setItem(ROSTER_KEY, JSON.stringify(roster));
  } catch (e) {
    console.error("Failed to save class roster:", e);
  }
}

export function createDefaultProfile() {
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  const uniqueId = "student_" + Date.now().toString(36) + "_" + Math.random().toString(36).substr(2, 6);
  return {
    id: uniqueId,
    isConfigured: false,
    name: `Student #${randomSuffix}`,
    section: "BSCPE 4D",
    isAnon: true,
    avatar: "🤖",
    customPhoto: null,
    xp: 0,
    streak: 0,
    maxStreak: 0,
    fastestBlitzSeconds: null,
    highestScorePercent: 0,
    totalQuizzesTaken: 0,
    masteredFlashcards: {},
    completedUnits: {},
    subjectStats: {},
    joinedAt: new Date().toISOString(),
  };
}

// Merges cloud roster with local roster, preserving highest XP and records
export function mergeCloudRoster(localRoster, cloudRoster, currentUserId) {
  const mergedMap = new Map();

  // Index local entries
  (localRoster || []).forEach((item) => {
    if (item && item.id && item.id !== currentUserId && item.id !== "me") {
      mergedMap.set(item.id, item);
    }
  });

  // Merge cloud entries
  (cloudRoster || []).forEach((item) => {
    if (item && item.id && item.id !== currentUserId && item.id !== "me") {
      const existing = mergedMap.get(item.id);
      if (existing) {
        // Merge subjectStats
        const mergedSubjectStats = { ...(existing.subjectStats || {}) };
        if (item.subjectStats) {
          Object.keys(item.subjectStats).forEach((subKey) => {
            const prevSub = mergedSubjectStats[subKey] || {};
            const newSub = item.subjectStats[subKey] || {};
            mergedSubjectStats[subKey] = {
              xp: Math.max(prevSub.xp || 0, newSub.xp || 0),
              highestPercent: Math.max(prevSub.highestPercent || 0, newSub.highestPercent || 0),
              fastestBlitz: newSub.fastestBlitz
                ? (prevSub.fastestBlitz ? Math.min(prevSub.fastestBlitz, newSub.fastestBlitz) : newSub.fastestBlitz)
                : prevSub.fastestBlitz,
              quizzesTaken: Math.max(prevSub.quizzesTaken || 0, newSub.quizzesTaken || 0),
            };
          });
        }

        mergedMap.set(item.id, {
          ...existing,
          ...item,
          xp: Math.max(existing.xp || 0, item.xp || 0),
          fastestBlitz: item.fastestBlitz
            ? (existing.fastestBlitz ? Math.min(existing.fastestBlitz, item.fastestBlitz) : item.fastestBlitz)
            : existing.fastestBlitz,
          highestPercent: Math.max(existing.highestPercent || 0, item.highestPercent || 0),
          subjectStats: mergedSubjectStats,
        });
      } else {
        mergedMap.set(item.id, item);
      }
    }
  });

  return Array.from(mergedMap.values());
}

// Builds leaderboard containing ONLY real user submissions (Overall or Per-Subject!)
export function buildLeaderboard(currentUser, subjectFilter = "all") {
  const roster = loadClassRoster();
  const isAll = !subjectFilter || subjectFilter === "all";

  const mySub = isAll ? null : (currentUser.subjectStats?.[subjectFilter] || {});
  const userEntry = {
    id: "me",
    name: currentUser.name || (currentUser.isAnon ? "You (Anonymous)" : "You"),
    section: currentUser.section || "BSCPE 4D",
    avatar: currentUser.avatar || "🤖",
    customPhoto: currentUser.customPhoto || null,
    xp: isAll ? (currentUser.xp || 0) : (mySub?.xp || 0),
    fastestBlitz: isAll ? (currentUser.fastestBlitzSeconds || null) : (mySub?.fastestBlitz || null),
    highestPercent: isAll ? (currentUser.highestScorePercent || 0) : (mySub?.highestPercent || 0),
    subjectStats: currentUser.subjectStats || {},
    isCurrentUser: true,
  };

  // Filter out any duplicates matching current user name or id
  const otherClassmates = roster
    .filter((c) => c.name !== currentUser.name && c.id !== "me")
    .map((c) => {
      if (isAll) return c;
      const cSub = c.subjectStats?.[subjectFilter] || {};
      return {
        ...c,
        xp: cSub.xp || 0,
        fastestBlitz: cSub.fastestBlitz || null,
        highestPercent: cSub.highestPercent || 0,
      };
    });

  // Sort by XP descending
  const list = [userEntry, ...otherClassmates].sort((a, b) => b.xp - a.xp);
  
  return list.map((item, index) => ({
    ...item,
    rank: index + 1,
    levelInfo: getLevelInfo(item.xp),
  }));
}

// Encodes a student's scorecard for sharing with classmates (includes all 8 subjects)
export function encodeScorecard(profile) {
  const payload = {
    n: profile.name,
    s: profile.section || "BSCPE 4D",
    a: profile.avatar || "🤖",
    x: profile.xp || 0,
    b: profile.fastestBlitzSeconds || null,
    p: profile.highestScorePercent || 0,
    st: profile.subjectStats || {},
  };
  return btoa(JSON.stringify(payload));
}

// Decodes and imports a classmate's shared scorecard
export function decodeScorecard(codeStr) {
  try {
    const raw = atob(codeStr.trim());
    const data = JSON.parse(raw);
    if (!data.n) return null;
    return {
      id: "classmate-" + Math.random().toString(36).substr(2, 9),
      name: data.n,
      section: data.s || "BSCPE 4D",
      avatar: data.a || "🤖",
      customPhoto: null,
      xp: data.x || 0,
      fastestBlitz: data.b || null,
      highestPercent: data.p || 0,
      subjectStats: data.st || {},
      isCurrentUser: false,
    };
  } catch (e) {
    return null;
  }
}
