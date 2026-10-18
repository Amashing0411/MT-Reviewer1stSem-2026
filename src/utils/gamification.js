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
  { 
    id: "default", 
    name: "Classic Minimal", 
    minLevel: 1, 
    cssClass: "avatar-frame-default", 
    label: "Clean",
    desc: "Standard clean student border",
    tier: "Common",
    shape: "rounded"
  },
  { 
    id: "bronze", 
    name: "Bronze Circuit", 
    minLevel: 2, 
    cssClass: "avatar-frame-bronze", 
    label: "Circuit",
    desc: "Pulsing copper trace & amber energy nodes",
    tier: "Uncommon",
    shape: "rounded"
  },
  { 
    id: "silver", 
    name: "Silver Chrome", 
    minLevel: 3, 
    cssClass: "avatar-frame-silver", 
    label: "Chrome",
    desc: "Liquid metallic chrome sweeping specular shine",
    tier: "Rare",
    shape: "rounded"
  },
  {
    id: "cyberpunk-custom",
    name: "Cyberpunk Glitch & Hologram",
    minLevel: 4,
    assetUrl: "/frames/cyberpunk.gif",
    cssClass: "avatar-frame-neon",
    label: "Cyberpunk",
    desc: "RGB chromatic aberration & twitching scanlines",
    tier: "Epic",
    scale: 1.65,
    shape: "rounded"
  },
  {
    id: "lightning-custom",
    name: "High-Voltage Lightning Arc",
    minLevel: 7,
    assetUrl: "/frames/lightning.gif",
    cssClass: "avatar-frame-sapphire",
    label: "Lightning Arc",
    desc: "Crackling electric arcs & blue spark bursts",
    tier: "Legendary",
    scale: 1.95,
    shape: "rounded"
  },
  {
    id: "inferno-custom",
    name: "Inferno Overclock",
    minLevel: 8,
    assetUrl: "/frames/inferno.gif",
    cssClass: "avatar-frame-ruby",
    label: "Inferno",
    desc: "Roaring animated hellfire flames & incandescent heat",
    tier: "Mythic",
    scale: 2.0,
    shape: "rounded"
  },
  {
    id: "dsp-fourier-custom",
    name: "DSP Fourier Frequency Master",
    minLevel: 5,
    assetUrl: "/frames/dsp-fourier.gif",
    cssClass: "avatar-frame-emerald",
    label: "DSP Fourier",
    desc: "Streaming frequency harmonics & glowing emerald waveform",
    tier: "Epic",
    scale: 1.85,
    shape: "rounded"
  },
  {
    id: "valkyrie-custom",
    name: "Prismatic Valkyrie Bifrost Halo",
    minLevel: 10,
    assetUrl: "/frames/valkyrie.gif",
    cssClass: "avatar-frame-prismatic",
    label: "Valkyrie",
    desc: "Hyper-prismatic shifting aurora crystal halo",
    tier: "Ascended",
    scale: 2.15,
    shape: "circle"
  },
  {
    id: "deans-lister-custom",
    name: "Room 106 Dean's Lister Crest",
    minLevel: 9,
    assetUrl: "/frames/deans-lister.gif",
    cssClass: "avatar-frame-honor",
    label: "Dean's Crest",
    desc: "Official academic honor crest for Room 106 top students",
    tier: "Ascended",
    scale: 2.05,
    shape: "rounded"
  },
  {
    id: "solar-corona-custom",
    name: "Eternal Deity Solar Corona",
    minLevel: 12,
    assetUrl: "/frames/solar-corona.gif",
    cssClass: "avatar-frame-gold",
    label: "Solar Corona",
    desc: "Blinding solar flare god-rays & pulsating divinity",
    tier: "Godlike",
    scale: 2.25,
    shape: "circle"
  },
];

// Helper to reliably resolve an avatar frame by ID, including backwards-compatible aliases
export const getAvatarFrame = (frameId) => {
  if (!frameId) return AVATAR_FRAMES[0];
  const direct = AVATAR_FRAMES.find((f) => f.id === frameId);
  if (direct) return direct;
  const aliasMap = {
    "cyber": "cyberpunk-custom",
    "neon": "cyberpunk-custom",
    "lightning": "lightning-custom",
    "sapphire": "lightning-custom",
    "ruby": "inferno-custom",
    "fire": "inferno-custom",
    "emerald": "dsp-fourier-custom",
    "matrix": "dsp-fourier-custom",
    "valkyrie": "valkyrie-custom",
    "prismatic": "valkyrie-custom",
    "deans-lister": "deans-lister-custom",
    "honor": "deans-lister-custom",
    "deity": "solar-corona-custom",
    "gold": "solar-corona-custom",
    "cosmic": "valkyrie-custom",
  };
  const targetId = aliasMap[frameId];
  if (targetId) {
    return AVATAR_FRAMES.find((f) => f.id === targetId) || AVATAR_FRAMES[0];
  }
  return AVATAR_FRAMES[0];
};

export const NAME_EFFECTS = [
  { id: "none", name: "Standard Clean", minLevel: 1, cssClass: "name-fx-none", label: "Clean" },
  { id: "glitch", name: "Cyber Glitch RGB", minLevel: 4, cssClass: "name-fx-glitch", label: "👾 Glitch" },
  { id: "matrix", name: "Terminal Phosphor", minLevel: 5, cssClass: "name-fx-matrix", label: "📟 Matrix" },
  { id: "lightning", name: "Electric Arc Zap", minLevel: 7, cssClass: "name-fx-lightning", label: "⚡ Lightning" },
  { id: "fire", name: "Burning Flame 🔥", minLevel: 8, cssClass: "name-fx-fire", label: "🔥 Burning" },
  { id: "prismatic", name: "Rainbow Aurora 🌈", minLevel: 10, cssClass: "name-fx-prismatic", label: "🌈 Prismatic" },
  { id: "godlike", name: "Golden Deity Radiance 👑", minLevel: 12, cssClass: "name-fx-godlike", label: "👑 Godlike" },
];

export const VANITY_TAGLINES = [
  { id: "tag-1", label: "🎓 4th Year Candidate", minLevel: 1, tier: "Starter" },
  { id: "tag-2", label: "⚡ Circuit Overclocker", minLevel: 2, tier: "Uncommon" },
  { id: "tag-3", label: "💻 System Architecture Lead", minLevel: 3, tier: "Rare" },
  { id: "tag-4", label: "☕ Powered by 3 Hours of Sleep", minLevel: 4, tier: "Epic" },
  { id: "tag-5", label: "🛡️ Cyber Defense Commander", minLevel: 5, tier: "Epic" },
  { id: "tag-6", label: "📡 DSP Fourier Master", minLevel: 6, tier: "Master" },
  { id: "tag-7", label: "⚖️ RA 9292 Legal Scholar", minLevel: 7, tier: "Legendary" },
  { id: "tag-8", label: "🎖️ Room 106 Dean's Lister", minLevel: 8, tier: "Mythic" },
  { id: "tag-9", label: "🔨 Design 2 Thesis Survivor", minLevel: 9, tier: "Ascended" },
  { id: "tag-10", label: "🎯 PRC Board Top 1 Aspirant", minLevel: 10, tier: "Ascended" },
  { id: "tag-11", label: "✨ Midterm Valkyrie (Ascended)", minLevel: 11, tier: "Ascended" },
  { id: "tag-12", label: "👑 Eternal DLSP Engineering Deity", minLevel: 12, tier: "Godlike" },
];

export const LEVELS = [
  { 
    level: 1, 
    title: "Novice Trainee", 
    minXp: 0, 
    maxXp: 300, 
    icon: "🌱", 
    unlockedFrame: "default", 
    unlockedTagline: "🎓 4th Year Candidate",
    unlockedNameFx: "none",
    rewardTitle: "Trainee Starter Pack", 
    rewardDesc: "Novice Trainee Title & Starter Badge" 
  },
  { 
    level: 2, 
    title: "Junior Circuit Hacker", 
    minXp: 300, 
    maxXp: 800, 
    icon: "⚡", 
    unlockedFrame: "bronze", 
    unlockedTagline: "⚡ Circuit Overclocker",
    unlockedNameFx: null,
    rewardTitle: "Bronze Circuit Frame", 
    rewardDesc: "Animated copper energy circuit avatar border" 
  },
  { 
    level: 3, 
    title: "System Architect", 
    minXp: 800, 
    maxXp: 1600, 
    icon: "💻", 
    unlockedFrame: "silver", 
    unlockedTagline: "💻 System Architecture Lead",
    unlockedNameFx: null,
    rewardTitle: "Silver Chrome Frame", 
    rewardDesc: "Liquid metallic chrome sweeping shine" 
  },
  { 
    level: 4, 
    title: "Logic Gate Wizard", 
    minXp: 1600, 
    maxXp: 2700, 
    icon: "🔮", 
    unlockedFrame: "cyberpunk-custom", 
    unlockedTagline: "☕ Powered by 3 Hours of Sleep",
    unlockedNameFx: "glitch",
    rewardTitle: "Cyberpunk Glitch Frame & Glitch Name FX", 
    rewardDesc: "RGB chromatic glitch border + glitching name text!" 
  },
  { 
    level: 5, 
    title: "Kernel Commander", 
    minXp: 2700, 
    maxXp: 4200, 
    icon: "🛡️", 
    unlockedFrame: "dsp-fourier-custom", 
    unlockedTagline: "🛡️ Cyber Defense Commander",
    unlockedNameFx: "matrix",
    rewardTitle: "DSP Fourier Frequency Frame & Terminal Name FX", 
    rewardDesc: "CRT green digital code stream + phosphor hacker name!" 
  },
  { 
    level: 6, 
    title: "DSP Frequency Master", 
    minXp: 4200, 
    maxXp: 6200, 
    icon: "📡", 
    unlockedFrame: null, 
    unlockedTagline: "📡 DSP Fourier Master",
    unlockedNameFx: null,
    rewardTitle: "Custom Vanity Creation Unlocked!", 
    rewardDesc: "You can now create and save custom engineering taglines!" 
  },
  { 
    level: 7, 
    title: "Cloud Security Architect", 
    minXp: 6200, 
    maxXp: 8800, 
    icon: "⚔️", 
    unlockedFrame: "lightning-custom", 
    unlockedTagline: "⚖️ RA 9292 Legal Scholar",
    unlockedNameFx: "lightning",
    rewardTitle: "High-Voltage Lightning Arc Frame & Electric Name FX", 
    rewardDesc: "Crackling electric blue lightning border + sparking name!" 
  },
  { 
    level: 8, 
    title: "Room 106 Dean's Lister", 
    minXp: 8800, 
    maxXp: 12000, 
    icon: "🎖️", 
    unlockedFrame: "inferno-custom", 
    unlockedTagline: "🎖️ Room 106 Dean's Lister",
    unlockedNameFx: "fire",
    rewardTitle: "Inferno Overclock Frame & Flame Name FX", 
    rewardDesc: "Roaring animated hellfire flame border + burning name text!" 
  },
  { 
    level: 9, 
    title: "National Topnotcher Candidate", 
    minXp: 12000, 
    maxXp: 16000, 
    icon: "👑", 
    unlockedFrame: "deans-lister-custom", 
    unlockedTagline: "🔨 Design 2 Thesis Survivor",
    unlockedNameFx: null,
    rewardTitle: "Room 106 Dean's Lister Crest Frame", 
    rewardDesc: "Official academic honor crest for Room 106 top students!" 
  },
  { 
    level: 10, 
    title: "Legendary PRC Board Top 1 🏆", 
    minXp: 16000, 
    maxXp: 22000, 
    icon: "🌟", 
    unlockedFrame: "valkyrie-custom", 
    unlockedTagline: "🎯 PRC Board Top 1 Aspirant",
    unlockedNameFx: "prismatic",
    rewardTitle: "Prismatic Valkyrie Frame & Rainbow Flow Name FX", 
    rewardDesc: "Continuous rainbow aurora bifrost crystal shine + chromatic text!" 
  },
  { 
    level: 11, 
    title: "Midterm Valkyrie (Ascended) ✨", 
    minXp: 22000, 
    maxXp: 30000, 
    icon: "✨", 
    unlockedFrame: null, 
    unlockedTagline: "✨ Midterm Valkyrie (Ascended)",
    unlockedNameFx: null,
    rewardTitle: "Ascended Valkyrie Prestige", 
    rewardDesc: "Elite recognition across DLSP College of Engineering!" 
  },
  { 
    level: 12, 
    title: "Eternal DLSP Engineering Deity ⚡", 
    minXp: 30000, 
    maxXp: Infinity, 
    icon: "👑", 
    unlockedFrame: "solar-corona-custom", 
    unlockedTagline: "👑 Eternal DLSP Engineering Deity",
    unlockedNameFx: "godlike",
    rewardTitle: "Solar Deity Corona Frame & Godlike Radiance Name FX", 
    rewardDesc: "Blinding solar flare god-rays + pulsating divine molten gold name!" 
  },
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

export function getNewlyUnlockedRewards(oldXp, newXp) {
  const oldLevel = getLevelInfo(oldXp).level;
  const newLevelInfo = getLevelInfo(newXp);
  const newLevel = newLevelInfo.level;
  if (newLevel <= oldLevel) return null;

  const crossedLevels = LEVELS.filter((l) => l.level > oldLevel && l.level <= newLevel);
  if (crossedLevels.length === 0) return null;

  const topLevel = crossedLevels[crossedLevels.length - 1];
  return {
    level: topLevel.level,
    title: topLevel.title,
    icon: topLevel.icon,
    rewardTitle: topLevel.rewardTitle,
    rewardDesc: topLevel.rewardDesc,
    unlockedFrame: topLevel.unlockedFrame,
    unlockedTagline: topLevel.unlockedTagline,
    unlockedNameFx: topLevel.unlockedNameFx,
  };
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
    nameFx: "none",
    xp: 0,
    streak: 0,
    maxStreak: 0,
    fastestBlitzSeconds: null,
    highestScorePercent: 0,
    totalQuizzesTaken: 0,
    masteredFlashcards: {},
    claimedFlashcards: {},
    completedDecks: {},
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
      fx: profile.nameFx || "none",
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
      nameFx: data.fx || "none",
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

