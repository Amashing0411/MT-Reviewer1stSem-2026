import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { 
  Trophy, 
  Flame, 
  Zap, 
  Sparkles, 
  Clock, 
  Award, 
  Share2, 
  Check, 
  X,
  User,
  ShieldCheck
} from "lucide-react";
import confetti from "canvas-confetti";

export function LeaderboardModal({ isOpen, onClose }) {
  const { profile, levelInfo, leaderboard } = useUser();
  const [filter, setFilter] = useState("xp"); // "xp" | "speed" | "score"
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Sort leaderboard according to selected tab
  const sortedList = [...leaderboard].sort((a, b) => {
    if (filter === "xp") return b.xp - a.xp;
    if (filter === "speed") {
      const aTime = a.fastestBlitz || 999;
      const bTime = b.fastestBlitz || 999;
      return aTime - bTime;
    }
    if (filter === "score") return b.highestPercent - a.highestPercent;
    return b.xp - a.xp;
  });

  const currentUserRank = sortedList.findIndex((item) => item.isCurrentUser) + 1;

  // Copy shareable scorecard
  const handleShare = () => {
    const text = `🎓 BSCPE 4D Midterm Reviewer • Room 106\n` +
      `👤 Student: ${profile.name} (${profile.section})\n` +
      `⭐ Level: ${levelInfo.level} — ${levelInfo.title}\n` +
      `⚡ Total XP: ${profile.xp.toLocaleString()} XP\n` +
      `⏱️ Fastest Blitz: ${profile.fastestBlitzSeconds ? profile.fastestBlitzSeconds + "s" : "N/A"}\n` +
      `🏆 Room 106 Rank: #${currentUserRank || 1}\n` +
      `Join the battle: https://mt-reviewer2026.vercel.app`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div 
        className="double-bezel-outer w-full max-w-2xl max-h-[92vh] overflow-y-auto animate-scaleIn text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="double-bezel-inner p-6 sm:p-8 relative space-y-6">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="btn-haptic absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200/80 rounded-full font-bold text-xs uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>BSCPE 4D • Official Room 106 Standings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              Midterm Class Leaderboard
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
              Real-time standings based on completed study modules, flashcard mastery, fastest blitz speed, and midterm quiz scores.
            </p>
          </div>

          {/* Current Student Highlight Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl shadow-blue-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl overflow-hidden shrink-0">
                {profile.customPhoto ? (
                  <img src={profile.customPhoto} alt="Me" className="w-full h-full object-cover" />
                ) : (
                  <span>{profile.avatar || "🤖"}</span>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm sm:text-base">{profile.name}</span>
                  <span className="text-[10px] font-bold bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full border border-blue-400/30">
                    {profile.section}
                  </span>
                </div>
                <div className="text-xs text-blue-200 flex items-center gap-1.5 mt-0.5">
                  <span>Level {levelInfo.level} • {levelInfo.title}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-center sm:text-right border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0 w-full sm:w-auto justify-around sm:justify-end">
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-300 block">Rank</span>
                <span className="text-xl sm:text-2xl font-black text-amber-400">#{currentUserRank}</span>
              </div>
              <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-300 block">Total XP</span>
                <span className="text-sm sm:text-base font-black text-emerald-400">+{profile.xp.toLocaleString()}</span>
              </div>
              <div className="w-px h-8 bg-white/10 hidden sm:block"></div>
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-300 block">Fastest</span>
                <span className="text-sm sm:text-base font-black text-cyan-300">
                  {profile.fastestBlitzSeconds ? `${profile.fastestBlitzSeconds}s` : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setFilter("xp")}
                className={`btn-haptic px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  filter === "xp"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>Overall XP & Level</span>
              </button>
              <button
                onClick={() => setFilter("speed")}
                className={`btn-haptic px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  filter === "speed"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Fastest Speed</span>
              </button>
              <button
                onClick={() => setFilter("score")}
                className={`btn-haptic px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  filter === "score"
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <Award className="w-3.5 h-3.5 text-emerald-500" />
                <span>Top Score %</span>
              </button>
            </div>

            <button
              onClick={handleShare}
              className="btn-haptic flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 rounded-xl text-xs font-bold transition-all shrink-0"
              title="Copy scorecard to challenge friends"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-blue-600" />}
              <span>{copied ? "Copied!" : "Share Scorecard"}</span>
            </button>
          </div>

          {/* Standings List */}
          <div className="space-y-2 max-h-[45vh] overflow-y-auto pr-1">
            {sortedList.map((item, idx) => {
              const rankNum = idx + 1;
              const isMe = item.isCurrentUser;

              let rankBadge = (
                <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                  {rankNum}
                </span>
              );

              if (rankNum === 1) {
                rankBadge = (
                  <span className="w-7 h-7 rounded-lg bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                    🥇
                  </span>
                );
              } else if (rankNum === 2) {
                rankBadge = (
                  <span className="w-7 h-7 rounded-lg bg-slate-300 text-slate-800 font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                    🥈
                  </span>
                );
              } else if (rankNum === 3) {
                rankBadge = (
                  <span className="w-7 h-7 rounded-lg bg-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                    🥉
                  </span>
                );
              }

              return (
                <div
                  key={item.id}
                  className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                    isMe
                      ? "bg-blue-50/90 border-blue-400/90 shadow-xs ring-2 ring-blue-500/20"
                      : "bg-white hover:bg-slate-50 border-slate-200/80"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {rankBadge}

                    <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-lg overflow-hidden shrink-0">
                      {item.customPhoto ? (
                        <img src={item.customPhoto} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <span>{item.avatar || "🤖"}</span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className={`text-xs font-bold truncate ${isMe ? "text-blue-900" : "text-slate-800"}`}>
                          {item.name} {isMe && "(You)"}
                        </span>
                        <span className="text-[9px] font-semibold bg-slate-100 text-slate-500 px-1.5 py-0.2 rounded border border-slate-200 shrink-0">
                          {item.section}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-medium truncate">
                        Lv. {item.levelInfo.level} • {item.levelInfo.title}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {filter === "xp" && (
                      <span className="font-extrabold text-xs text-blue-700">
                        {item.xp.toLocaleString()} XP
                      </span>
                    )}
                    {filter === "speed" && (
                      <span className="font-extrabold text-xs text-amber-700 flex items-center gap-1 justify-end">
                        <Clock className="w-3 h-3" />
                        {item.fastestBlitz ? `${item.fastestBlitz}s` : "No Record"}
                      </span>
                    )}
                    {filter === "score" && (
                      <span className="font-extrabold text-xs text-emerald-700">
                        {item.highestPercent}% Score
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </div>
  );
}

export default LeaderboardModal;
