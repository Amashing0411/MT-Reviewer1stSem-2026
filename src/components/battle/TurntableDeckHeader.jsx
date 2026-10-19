import React, { useState } from "react";
import { sound } from "../../utils/sound";
import { StudentAvatar } from "../StudentAvatar";
import {
  Zap,
  Bot,
  Swords,
  Volume2,
  VolumeX,
  Flame,
  Clock,
  Sparkles,
  Disc3,
  HelpCircle,
} from "lucide-react";

const WAGER_OPTIONS = [50, 100, 250, 500, 1000];

const CLOCK_OPTIONS = [
  { duration: 10, label: "10s Blitz", icon: "⚡", tag: "Fast Reflexes" },
  { duration: 30, label: "30s Rapid", icon: "⏱️", tag: "Standard Speed" },
  { duration: 60, label: "60s Tactical", icon: "🧠", tag: "Deep Formulas" },
];

const SUBJECT_OPTIONS = [
  { id: "all", label: "⚡ All 6 Subjects (Mixed Random)" },
  { id: "cpe413", label: "💻 CPE413: Comp Architecture" },
  { id: "elect3", label: "🐧 ELECT3: Systems Admin III" },
  { id: "engwork", label: "✍️ ENGWORK: English Workplace" },
  { id: "cpe416", label: "⚖️ CPE416: Eng Laws & Ethics" },
  { id: "cpe415", label: "📊 CPE415: Eng Management" },
  { id: "cpe411", label: "🚀 CPE411: Capstone Design 2" },
];

export function TurntableDeckHeader({
  profile,
  createWager,
  setCreateWager,
  createClockDuration,
  setCreateClockDuration,
  createSubject,
  setCreateSubject,
  onStartBotMatch,
  onOpenCreateRoom,
  isMuted,
  onToggleMute,
}) {
  const [isScratching, setIsScratching] = useState(false);
  const [scratchPitch, setScratchPitch] = useState(0);

  const handleTurntableClick = () => {
    sound.playTap();
    setIsScratching(true);
    setScratchPitch((p) => p + 30);
    setTimeout(() => {
      setIsScratching(false);
    }, 400);
  };

  const canAffordWager = (profile?.xp || 0) >= createWager;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-950 border-2 border-cyan-500/40 shadow-2xl shadow-cyan-950/50 p-5 sm:p-7 text-white select-none">
      {/* Background Halftone Cyber Grid & Glow Orbs */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, #38bdf8 1px, transparent 1.5px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Grid: Left Vinyl Turntable | Right Battle Match Command */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* LEFT: Interactive 3D Vinyl Turntable (4 Columns on LG) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-inner">
          {/* Turntable Platter Deck */}
          <div
            onClick={handleTurntableClick}
            className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full flex items-center justify-center cursor-pointer group transition-transform active:scale-95"
            title="Click or tap to scratch vinyl!"
          >
            {/* Outer Slipmat Bezel */}
            <div className="absolute inset-0 rounded-full bg-slate-900 border-4 border-slate-700 shadow-2xl flex items-center justify-center">
              {/* Spinning Vinyl Record with Grooves & Specular Sheen */}
              <div
                className={`w-full h-full rounded-full relative flex items-center justify-center transition-all ${
                  isScratching ? "rotate-45" : "animate-spin"
                }`}
                style={{
                  animationDuration: isScratching ? "0.2s" : "4.5s",
                  background:
                    "radial-gradient(circle, #1e293b 0%, #0f172a 35%, #020617 70%, #000000 100%)",
                  boxShadow:
                    "inset 0 0 14px rgba(0,0,0,0.9), 0 0 25px rgba(56,189,248,0.25)",
                }}
              >
                {/* Vinyl Grooves (Concentric Circles) */}
                <div className="absolute inset-3 rounded-full border border-slate-700/40 pointer-events-none" />
                <div className="absolute inset-6 rounded-full border border-slate-800 pointer-events-none" />
                <div className="absolute inset-9 rounded-full border border-slate-700/50 pointer-events-none" />
                <div className="absolute inset-12 rounded-full border border-slate-800 pointer-events-none" />
                <div className="absolute inset-16 rounded-full border border-slate-700/40 pointer-events-none" />

                {/* Rotating Vinyl Specular Sheen Reflection */}
                <div
                  className="absolute inset-0 rounded-full opacity-30 pointer-events-none"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.25) 45deg, transparent 90deg, transparent 180deg, rgba(255,255,255,0.25) 225deg, transparent 270deg)",
                  }}
                />

                {/* High-Contrast Center Record Label */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 border-2 border-white/80 shadow-lg flex flex-col items-center justify-center text-center p-1 relative z-10 text-slate-950">
                  <div className="text-[7.5px] font-black uppercase tracking-tighter leading-none text-slate-950">
                    BSCPE 4TH YEAR
                  </div>
                  <div className="text-[10px] sm:text-xs font-black tracking-tight leading-none text-slate-950 mt-0.5">
                    1v1 ARENA
                  </div>
                  <div className="w-3 h-3 rounded-full bg-slate-950 border border-amber-300 my-0.5 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-cyan-400" />
                  </div>
                  <div className="text-[6.5px] font-mono font-bold tracking-widest text-slate-900 leading-none">
                    SIDE A · 33 RPM
                  </div>
                </div>
              </div>
            </div>

            {/* Tonearm & Stylus */}
            <div className="absolute top-2 right-2 sm:right-3 w-16 h-24 pointer-events-none z-20">
              {/* Tonearm Pivot */}
              <div className="w-5 h-5 rounded-full bg-slate-700 border-2 border-slate-400 shadow-md absolute top-0 right-0" />
              {/* Tonearm Bar */}
              <div className="w-1 h-20 bg-gradient-to-b from-slate-400 to-slate-200 absolute top-3 right-2 origin-top rotate-[-28deg] shadow-lg">
                {/* Cartridge Head with Glowing Cyan LED */}
                <div className="w-3 h-4 bg-slate-900 border border-slate-300 absolute -bottom-3 -left-1 rounded-sm flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Turntable Subtitle & Scratch Hint */}
          <div className="mt-3 text-center">
            <div className="inline-flex items-center gap-1.5 text-xs font-black text-cyan-300 uppercase tracking-wider">
              <Disc3 className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: "3s" }} />
              <span>Room 106–109 Soundcheck Deck</span>
            </div>
            <p className="text-[10.5px] text-slate-400 font-medium mt-0.5">
              Click turntable to scratch · Real-time speed chess battle
            </p>
          </div>
        </div>

        {/* RIGHT: High-Contrast Match Command Center (8 Columns on LG) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Top Bar: Player Identity & Audio Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400 shrink-0 bg-slate-900 shadow-md">
                <StudentAvatar
                  avatar={profile?.avatar}
                  customPhoto={profile?.customPhoto}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-black text-white">
                    {profile?.name || "Student"}
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-400/60 text-cyan-300">
                    BSCPE {profile?.section || "4A"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-amber-400" />
                    <span>{(profile?.xp || 0).toLocaleString()} XP Available</span>
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-emerald-400 text-[11px] font-sans font-bold">● Matchmaking Online</span>
                </div>
              </div>
            </div>

            {/* Audio Toggle Button */}
            <button
              type="button"
              onClick={onToggleMute}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 border ${
                isMuted
                  ? "bg-slate-900 border-slate-700 text-slate-400"
                  : "bg-cyan-950/80 border-cyan-500/50 text-cyan-300 shadow-md shadow-cyan-500/20"
              }`}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
              <span className="font-mono">{isMuted ? "Muted" : "Sound ON"}</span>
            </button>
          </div>

          {/* Section 1: Choose Wager Amount */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>1. Select Match Wager (Winner Takes All Pot)</span>
              </label>
              <span className="text-xs font-mono font-black text-amber-300">
                Pot: {(createWager * 2).toLocaleString()} XP 🏆
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {WAGER_OPTIONS.map((amt) => {
                const isSelected = createWager === amt;
                const canAfford = (profile?.xp || 0) >= amt;

                return (
                  <button
                    key={amt}
                    type="button"
                    disabled={!canAfford}
                    onClick={() => {
                      sound.playTap();
                      setCreateWager(amt);
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-black font-mono transition-all active:scale-95 cursor-pointer border ${
                      isSelected
                        ? "bg-gradient-to-r from-amber-500 to-amber-600 border-amber-300 text-slate-950 shadow-lg shadow-amber-500/30 scale-105 z-10"
                        : canAfford
                        ? "bg-slate-900 hover:bg-slate-850 border-slate-700 text-slate-200 hover:border-amber-400/60"
                        : "bg-slate-900/40 border-slate-800 text-slate-600 opacity-40 cursor-not-allowed"
                    }`}
                  >
                    {amt} XP
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Choose Speed Chess Clock */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>2. Select Speed Chess Clock</span>
              </label>
              <span className="text-[11px] text-cyan-300 font-medium">
                Pass = -5s Penalty · Wrong = -3s
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2.5">
              {CLOCK_OPTIONS.map((c) => {
                const isSelected = createClockDuration === c.duration;

                return (
                  <button
                    key={c.duration}
                    type="button"
                    onClick={() => {
                      sound.playTap();
                      setCreateClockDuration(c.duration);
                    }}
                    className={`py-2.5 px-3 rounded-2xl border text-left transition-all active:scale-95 cursor-pointer ${
                      isSelected
                        ? "bg-cyan-950/80 border-cyan-400 text-white ring-2 ring-cyan-400/50 shadow-lg shadow-cyan-950/50"
                        : "bg-slate-900 hover:bg-slate-850 border-slate-800 text-slate-300 hover:border-cyan-500/40"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-white flex items-center gap-1">
                        <span>{c.icon}</span>
                        <span>{c.label}</span>
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {c.tag}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Subject Filter Dropdown & Primary Action Buttons */}
          <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Subject Selector */}
            <div className="flex-1">
              <select
                value={createSubject}
                onChange={(e) => {
                  sound.playTap();
                  setCreateSubject(e.target.value);
                }}
                className="w-full px-3.5 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-xs font-bold text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all cursor-pointer"
              >
                {SUBJECT_OPTIONS.map((s) => (
                  <option key={s.id} value={s.id} className="bg-slate-900 text-white">
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Play vs AI Bot Button */}
            <button
              type="button"
              onClick={() => {
                sound.playTap();
                onStartBotMatch();
              }}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs shadow-xl shadow-blue-600/30 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
              title="Practice instantly against Dean's Lister AI Bot"
            >
              <Bot className="w-4 h-4 text-cyan-300" />
              <span>Quick Play vs AI</span>
            </button>

            {/* Host Public Match Button */}
            <button
              type="button"
              onClick={() => {
                sound.playTap();
                onOpenCreateRoom();
              }}
              disabled={!canAffordWager}
              className={`px-5 py-3 rounded-2xl font-black text-xs transition-all active:scale-95 flex items-center justify-center gap-2 shrink-0 cursor-pointer ${
                canAffordWager
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-xl shadow-amber-500/30"
                  : "bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed opacity-50"
              }`}
            >
              <Swords className="w-4 h-4 fill-current" />
              <span>Host Public Match</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TurntableDeckHeader;
