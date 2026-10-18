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

export const AVATAR_FRAMES = [
  { id: "default", name: "Classic Minimal", minLevel: 1, cssClass: "avatar-frame-default", label: "Clean" },
  { id: "bronze", name: "Bronze Circuit", minLevel: 2, cssClass: "avatar-frame-bronze", label: "Bronze" },
  { id: "silver", name: "Silver Silicon", minLevel: 3, cssClass: "avatar-frame-silver", label: "Silver" },
  { id: "cyber", name: "Cyber Neon Cyan", minLevel: 4, cssClass: "avatar-frame-cyber", label: "Cyber" },
  { id: "emerald", name: "Matrix Phosphor", minLevel: 5, cssClass: "avatar-frame-emerald", label: "Matrix" },
  { id: "gold", name: "Dean's List Gold", minLevel: 7, cssClass: "avatar-frame-gold", label: "Gold" },
  { id: "ruby", name: "Ruby Overclock", minLevel: 8, cssClass: "avatar-frame-ruby", label: "Ruby" },
  { id: "valkyrie", name: "Prismatic Valkyrie", minLevel: 10, cssClass: "avatar-frame-valkyrie", label: "Valkyrie" },
];

export const VANITY_TAGLINES = [
  "🎓 4th Year Candidate",
  "⚡ Room 106 Dean's Lister",
  "☕ Powered by 3 Hours of Sleep",
  "🔨 Design 2 Thesis Survivor",
  "🛡️ Cyber Defense Commander",
  "📡 DSP Fourier Master",
  "⚖️ RA 9292 Legal Scholar",
  "🎯 PRC Board Top 1 Aspirant",
  "💻 System Architecture Lead",
  "🔥 Rapid Blitz Streak Striker",
];

export const LEVELS = [
  { level: 1, title: "Novice Trainee", minXp: 0, maxXp: 300, icon: "🌱", unlockedFrame: "default", rewardDesc: "Default Frame" },
  { level: 2, title: "Junior Circuit Hacker", minXp: 300, maxXp: 800, icon: "⚡", unlockedFrame: "bronze", rewardDesc: "Unlocked: Bronze Circuit Frame" },
  { level: 3, title: "System Architect", minXp: 800, maxXp: 1600, icon: "💻", unlockedFrame: "silver", rewardDesc: "Unlocked: Silver Silicon Frame" },
  { level: 4, title: "Logic Gate Wizard", minXp: 1600, maxXp: 2700, icon: "🔮", unlockedFrame: "cyber", rewardDesc: "Unlocked: Cyber Neon Frame" },
  { level: 5, title: "Kernel Commander", minXp: 2700, maxXp: 4200, icon: "🛡️", unlockedFrame: "emerald", rewardDesc: "Unlocked: Matrix Phosphor Frame" },
  { level: 6, title: "DSP Frequency Master", minXp: 4200, maxXp: 6200, icon: "📡", unlockedFrame: null, rewardDesc: "Next Frame at Level 7" },
  { level: 7, title: "Cloud Security Architect", minXp: 6200, maxXp: 8800, icon: "⚔️", unlockedFrame: "gold", rewardDesc: "Unlocked: Dean's List Gold Frame" },
  { level: 8, title: "Room 106 Dean's Lister", minXp: 8800, maxXp: 12000, icon: "🎖️", unlockedFrame: "ruby", rewardDesc: "Unlocked: Ruby Overclock Frame" },
  { level: 9, title: "National Topnotcher Candidate", minXp: 12000, maxXp: 16000, icon: "👑", unlockedFrame: null, rewardDesc: "Next Frame at Level 10" },
  { level: 10, title: "Legendary PRC Board Top 1 🏆", minXp: 16000, maxXp: 22000, icon: "🌟", unlockedFrame: "valkyrie", rewardDesc: "Unlocked: Prismatic Valkyrie Frame" },
  { level: 11, title: "Midterm Valkyrie (Ascended) ✨", minXp: 22000, maxXp: 30000, icon: "✨", unlockedFrame: null, rewardDesc: "Ascended Honor" },
  { level: 12, title: "Eternal DLSP Engineering Deity ⚡", minXp: 30000, maxXp: Infinity, icon: "👑", unlockedFrame: null, rewardDesc: "MAX PRESTIGE" },
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
    pin: "",
    frame: "default",
    tagline: "🎓 4th Year Candidate",
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

// Encodes a student's scorecard for sharing or device sync (Unicode-safe and URL-safe base64)
export function encodeScorecard(profile, includePin = false) {
  try {
    const payload = {
      n: profile.name || "Student",
      s: profile.section || "BSCPE 4D",
      a: profile.avatar || "🤖",
      fr: profile.frame || "default",
      tg: profile.tagline || "",
      x: profile.xp || 0,
      b: profile.fastestBlitzSeconds || null,
      p: profile.highestScorePercent || 0,
      st: profile.subjectStats || {},
      ...(includePin && profile.pin ? { pin: profile.pin } : {}),
    };
    const jsonStr = JSON.stringify(payload);
    const utf8Bytes = new TextEncoder().encode(jsonStr);
    let binary = "";
    for (let i = 0; i < utf8Bytes.length; i++) {
      binary += String.fromCharCode(utf8Bytes[i]);
    }
    // URL-safe base64 without padding errors
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  } catch (err) {
    console.error("Scorecard encoding error:", err);
    return "";
  }
}

// Generates a 1-tap device sync link
export function createSyncUrl(profile) {
  const code = encodeScorecard(profile, true);
  return `${window.location.origin}/?sync=${code}`;
}

// Decodes and imports a classmate's shared scorecard (supports Unicode & URL-safe base64)
export function decodeScorecard(codeStr) {
  try {
    if (!codeStr || typeof codeStr !== "string") return null;
    let cleanStr = codeStr.trim();
    // Convert URL-safe back to standard base64
    cleanStr = cleanStr.replace(/-/g, "+").replace(/_/g, "/");
    while (cleanStr.length % 4) {
      cleanStr += "=";
    }

    let jsonStr = "";
    try {
      const binary = atob(cleanStr);
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      jsonStr = new TextDecoder().decode(bytes);
    } catch {
      // Fallback for legacy plain strings
      jsonStr = atob(cleanStr);
    }

    const data = JSON.parse(jsonStr);
    if (!data.n) return null;
    return {
      id: "classmate-" + Math.random().toString(36).substr(2, 9),
      name: data.n,
      section: data.s || "BSCPE 4D",
      avatar: data.a || "🤖",
      frame: data.fr || "default",
      tagline: data.tg || "🎓 4th Year Candidate",
      pin: data.pin || "",
      customPhoto: null,
      xp: data.x || 0,
      fastestBlitz: data.b || null,
      highestPercent: data.p || 0,
      subjectStats: data.st || {},
      isCurrentUser: false,
    };
  } catch (e) {
    console.error("Scorecard decoding error:", e);
    return null;
  }
}

