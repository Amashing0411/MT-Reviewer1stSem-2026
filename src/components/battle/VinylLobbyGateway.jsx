import React, { useState } from "react";
import VinylHalftonePreloader from "../ui/vinyl-halftone-preloader";
import { sound } from "../../utils/sound";
import { Zap, Bot, Swords, Volume2, VolumeX, Flame, ChevronRight, Disc3 } from "lucide-react";
import { StudentAvatar } from "../StudentAvatar";

const WAGER_OPTIONS = [50, 100, 250, 500, 1000];
const CLOCK_OPTIONS = [
  { duration: 10, label: "10s BLITZ ⚡", name: "Blitz" },
  { duration: 30, label: "30s RAPID ⏱️", name: "Rapid" },
  { duration: 60, label: "60s TACTICAL 🧠", name: "Tactical" },
];

const SUBJECT_OPTIONS = [
  { id: "all", label: "ALL 6 SUBJECTS 📚" },
  { id: "cpe413", label: "CPE413: COMP ARCH 💻" },
  { id: "elect3", label: "ELECT3: SYSADMIN 🐧" },
  { id: "engwork", label: "ENGWORK: ENGLISH ✍️" },
  { id: "cpe416", label: "CPE416: LAWS ⚖️" },
  { id: "cpe415", label: "CPE415: ENG MGT 📊" },
  { id: "cpe411", label: "CPE411: CAPSTONE 🚀" },
];

export function VinylLobbyGateway({
  profile,
  createWager,
  setCreateWager,
  createClockDuration,
  setCreateClockDuration,
  createSubject,
  setCreateSubject,
  onEnterArena,
  onStartBotMatch,
  onOpenCreateRoom,
  isMuted,
  onToggleMute,
  roomsCount = 0,
  children,
}) {
  const [deckRunKey, setDeckRunKey] = useState(0);

  // Cycle handlers with tactile audio feedback
  const handleStageClick = (index) => {
    sound.playTap();
    if (index === 0) {
      // Cycle Wager
      const currIdx = WAGER_OPTIONS.indexOf(createWager);
      const nextIdx = (currIdx + 1) % WAGER_OPTIONS.length;
      setCreateWager(WAGER_OPTIONS[nextIdx]);
    } else if (index === 1) {
      // Cycle Clock
      const currIdx = CLOCK_OPTIONS.findIndex((c) => c.duration === createClockDuration);
      const nextIdx = (currIdx + 1) % CLOCK_OPTIONS.length;
      setCreateClockDuration(CLOCK_OPTIONS[nextIdx].duration);
    } else if (index === 2) {
      // Cycle Subject
      const currIdx = SUBJECT_OPTIONS.findIndex((s) => s.id === createSubject);
      const nextIdx = (currIdx + 1) % SUBJECT_OPTIONS.length;
      setCreateSubject(SUBJECT_OPTIONS[nextIdx].id);
    }
  };

  const currentClock = CLOCK_OPTIONS.find((c) => c.duration === createClockDuration) || CLOCK_OPTIONS[1];
  const currentSubject = SUBJECT_OPTIONS.find((s) => s.id === createSubject) || SUBJECT_OPTIONS[0];

  const stagesList = [
    `1. WAGER: ${createWager} XP 🪙`,
    `2. CLOCK: ${currentClock.label}`,
    `3. SUBJECT: ${currentSubject.label}`,
    `4. ENTER ARENA ▶`,
  ];

  const credits = [
    `PLAYER: ${(profile?.name || "STUDENT").toUpperCase()} · LVL ${profile?.level || 1} (${(profile?.xp || 0).toLocaleString()} XP)`,
    `STAKE: ${createWager} XP (POT: ${(createWager * 2).toLocaleString()} XP) · ${currentClock.name.toUpperCase()} CLOCK`,
    `ROOM 106–109 MIDTERM CLASH · DLSP COLLEGE OF ENGINEERING`,
  ];

  // Cyber HUD overlaid on the turntable gate
  const hudContent = (
    <div className="flex flex-col justify-between w-full h-full pointer-events-none p-2 sm:p-5 select-none">
      {/* Top Bar HUD */}
      <div className="flex items-center justify-between gap-3 pointer-events-auto">
        {/* Left: Player Profile Chip */}
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-cyan-500/40 shadow-lg shadow-cyan-950/40">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-400 shrink-0 bg-slate-800">
            <StudentAvatar avatar={profile?.avatar} customPhoto={profile?.customPhoto} className="w-full h-full object-cover" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-white truncate max-w-[130px] sm:max-w-[200px]">
                {profile?.name || "Player"}
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-950/80 border border-cyan-400/50 text-cyan-300">
                {profile?.section || "4A"}
              </span>
            </div>
            <div className="flex items-center gap-1 text-[10.5px] font-mono font-bold text-amber-300">
              <Zap className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{(profile?.xp || 0).toLocaleString()} XP</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 text-[10px]">Ready</span>
            </div>
          </div>
        </div>

        {/* Right: Quick Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleMute}
            className={`p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 backdrop-blur-md border ${
              isMuted
                ? "bg-slate-900/80 border-slate-700 text-slate-400"
                : "bg-cyan-950/80 border-cyan-500/50 text-cyan-300 shadow-md shadow-cyan-500/20"
            }`}
            title={isMuted ? "Unmute Sound" : "Mute Sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            <span className="hidden sm:inline font-mono">{isMuted ? "MUTED" : "SOUND ON"}</span>
          </button>

          <button
            type="button"
            onClick={onEnterArena}
            className="px-3 sm:px-4 py-2 rounded-xl bg-slate-900/85 hover:bg-slate-850 backdrop-blur-md border border-slate-700 hover:border-amber-400/60 text-slate-200 hover:text-amber-300 text-xs font-black transition-all active:scale-95 cursor-pointer flex items-center gap-1 shadow-lg"
            title="Skip directly to active room browser"
          >
            <span>Skip to Lobbies</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Center: Cyberpunk Quick Action Command Deck */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pointer-events-auto max-w-2xl mx-auto w-full pb-1 sm:pb-3">
        {/* Practice vs AI Bot */}
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            onStartBotMatch();
          }}
          className="w-full sm:w-auto flex-1 px-4 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-850 backdrop-blur-md border border-cyan-500/50 hover:border-cyan-400 text-cyan-300 hover:text-white font-black text-xs transition-all active:scale-95 shadow-xl shadow-cyan-950/60 flex items-center justify-center gap-2 cursor-pointer group"
        >
          <Bot className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
          <div className="text-left leading-tight">
            <div className="text-[11.5px] uppercase tracking-wide">Quick Play vs AI</div>
            <div className="text-[9.5px] text-cyan-400/80 font-mono font-medium">Practice with {currentClock.name} ({createWager} XP)</div>
          </div>
        </button>

        {/* Host Public Match */}
        <button
          type="button"
          onClick={() => {
            sound.playTap();
            onOpenCreateRoom();
          }}
          className="w-full sm:w-auto flex-1 px-4 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs transition-all active:scale-95 shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Swords className="w-4 h-4 fill-slate-950" />
          <div className="text-left leading-tight">
            <div className="text-[11.5px] uppercase tracking-wide">Host Public Match</div>
            <div className="text-[9.5px] text-slate-900 font-mono font-bold">Wager {createWager} XP in Pot</div>
          </div>
        </button>

        {/* Enter Arena / Browse Lobbies */}
        <button
          type="button"
          onClick={onEnterArena}
          className="w-full sm:w-auto flex-1 px-4 py-3 rounded-2xl bg-slate-900/90 hover:bg-slate-850 backdrop-blur-md border border-indigo-500/50 hover:border-indigo-400 text-indigo-300 hover:text-white font-black text-xs transition-all active:scale-95 shadow-xl shadow-indigo-950/60 flex items-center justify-center gap-2 cursor-pointer group"
        >
          <Disc3 className="w-4 h-4 text-indigo-400 group-hover:animate-spin" />
          <div className="text-left leading-tight">
            <div className="text-[11.5px] uppercase tracking-wide">Browse Rooms ({roomsCount})</div>
            <div className="text-[9.5px] text-indigo-400/80 font-mono font-medium">Enter Live Multiplayer Floor</div>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <div key={deckRunKey} className="relative w-full rounded-3xl overflow-hidden border border-cyan-500/25 shadow-2xl bg-slate-950">
      <VinylHalftonePreloader
        durationMs={2200}
        enter="click"
        preset="arena"
        title="BSCPE 4TH YEAR"
        subtitle="ROOM 106–109 MIDTERM BATTLE ARENA"
        loadingWord="DUEL DECK"
        readyWord="READY TO CLASH"
        credits={credits}
        ringText="SIDE A · BSCPE 4A · 4B · 4C · 4D · 1v1 SPEED CHESS CLOCKS · DOUBLE YOUR WAGER · DLSP COLLEGE OF ENGINEERING · "
        stages={stagesList}
        onStageClick={handleStageClick}
        hud={hudContent}
        bpm={128}
        hint="Click stages to customize match · Grab record to scratch"
        height="clamp(600px, 78vh, 820px)"
        onComplete={onEnterArena}
        className="w-full"
      >
        {children}
      </VinylHalftonePreloader>
    </div>
  );
}
export default VinylLobbyGateway;
