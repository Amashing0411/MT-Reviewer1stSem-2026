import React, { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { encodeScorecard } from "../utils/gamification";
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
  UserPlus,
  Users,
  RefreshCw,
  Cloud,
  Info,
  Smartphone
} from "lucide-react";
import confetti from "canvas-confetti";

const SUBJECT_TABS = [
  { id: "all", label: "Overall (All 8)", icon: "🌐" },
  { id: "cpe414", label: "CPE414 • DSP", icon: "📡" },
  { id: "cpe411", label: "CPE411 • Design 2", icon: "🔨" },
  { id: "cpe416", label: "CPE416 • Laws", icon: "⚖️" },
  { id: "cpe415", label: "CPE415 • Eng Mgt", icon: "💼" },
  { id: "cpe412", label: "CPE412 • Seminars", icon: "🧭" },
  { id: "elect3", label: "ELECT3 • Elective 3", icon: "⚡" },
  { id: "cpe413", label: "CPE413 • Comp Arch", icon: "💻" },
  { id: "engwork", label: "ENGWORK • Workplace", icon: "📝" },
];

export function LeaderboardModal({ isOpen, onClose, onOpenPassCard, defaultSubject = "all" }) {
  const { 
    profile, 
    levelInfo, 
    leaderboard = [],
    getLeaderboard,
    importScorecard,
    isCloudConnected,
    isSyncing,
    syncWithCloud
  } = useUser();
  const [selectedSubject, setSelectedSubject] = useState(defaultSubject || "all");

  useEffect(() => {
    if (isOpen && defaultSubject) {
      setSelectedSubject(defaultSubject);
    }
  }, [isOpen, defaultSubject]);

  const [filter, setFilter] = useState("xp"); // "xp" | "speed" | "score"
  const [copied, setCopied] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importCode, setImportCode] = useState("");
  const [importError, setImportError] = useState(null);
  const [showKvTip, setShowKvTip] = useState(false);
  const [selectedSection, setSelectedSection] = useState("all");

  if (!isOpen) return null;

  const currentRoster = getLeaderboard ? getLeaderboard(selectedSubject) : [];

  const sectionFilteredRoster = currentRoster.filter((item) => {
    if (selectedSection === "all") return true;
    const secStr = (item.section || "").toUpperCase();
    return secStr.includes(selectedSection.toUpperCase());
  });

  // Filter & sort leaderboard
  const sortedList = [...sectionFilteredRoster].sort((a, b) => {
    if (filter === "xp") return b.xp - a.xp;
    if (filter === "speed") {
      const aTime = a.fastestBlitz || 999;
      const bTime = b.fastestBlitz || 999;
      return aTime - bTime;
    }
    if (filter === "score") return b.highestPercent - a.highestPercent;
    return b.xp - a.xp;
  });

  const currentUserItem = sortedList.find((item) => item.isCurrentUser) || {};
  const currentUserRank = sortedList.findIndex((item) => item.isCurrentUser) + 1;

  // Share scorecard link
  const handleShare = async () => {
    try {
      const code = encodeScorecard(profile);
      if (!code) return;
      const link = `${window.location.origin}/?score=${code}`;
      const text = `🎓 BSCPE 4th Year Midterm Reviewer\n` +
        `👤 Student: ${profile.name || "Student"} (${profile.section || "BSCPE 4th Year"})\n` +
        `⭐ Level: ${levelInfo.level} — ${levelInfo.title}\n` +
        `⚡ Total XP: ${(profile.xp || 0).toLocaleString()} XP\n` +
        `⏱️ Fastest Blitz: ${profile.fastestBlitzSeconds ? profile.fastestBlitzSeconds + "s" : "N/A"}\n` +
        `🏆 Standings Rank: #${currentUserRank || 1}\n` +
        `Add my score to your leaderboard: ${link}`;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error("Failed to copy scorecard link:", err);
    }
  };

  const handleImportSubmit = (e) => {
    e.preventDefault();
    if (!importCode.trim()) return;
    const ok = importScorecard(importCode.trim());
    if (ok) {
      setImportCode("");
      setIsImportOpen(false);
      setImportError(null);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.5 } });
    } else {
      setImportError("Invalid scorecard code. Ask your classmate to share their link again.");
    }
  };

  const otherClassmatesCount = (currentRoster || leaderboard || []).filter((item) => !item.isCurrentUser).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-md animate-fadeIn">
      <div 
        className="double-bezel-outer w-full max-w-xl max-h-[90vh] overflow-y-auto animate-scaleIn text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="double-bezel-inner p-4 sm:p-7 relative space-y-5">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="btn-haptic absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header */}
          <div className="text-center space-y-2 pt-1">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-amber-50 text-amber-800 border border-amber-200/80 rounded-full font-bold text-[10px] uppercase tracking-wider">
                <Trophy className="w-3 h-3 text-amber-600" />
                <span>4th Year Standings</span>
              </div>

              {isCloudConnected ? (
                <button
                  onClick={syncWithCloud}
                  disabled={isSyncing}
                  className="btn-haptic inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 rounded-full font-bold text-[10px] uppercase tracking-wider hover:bg-emerald-100 transition-colors"
                  title="Click to sync cloud leaderboard"
                >
                  <RefreshCw className={`w-3 h-3 text-emerald-600 ${isSyncing ? "animate-spin" : ""}`} />
                  <span>Cloud Synced</span>
                </button>
              ) : (
                <button
                  onClick={syncWithCloud}
                  disabled={isSyncing}
                  className="btn-haptic inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 text-slate-700 border border-slate-200/80 rounded-full font-bold text-[10px] uppercase tracking-wider hover:bg-slate-200 transition-colors"
                  title="Click to check cloud sync"
                >
                  <RefreshCw className={`w-3 h-3 text-slate-500 ${isSyncing ? "animate-spin" : ""}`} />
                  <span>Local Mode</span>
                </button>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">
              Class Midterm Standings
            </h2>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Real student scores only. Take quizzes and master flashcards to level up your rank!
            </p>

            {/* Vercel KV Cross-Device Sync Helper Banner */}
            {!isCloudConnected && (
              <div className="pt-1">
                <button
                  onClick={() => setShowKvTip(!showKvTip)}
                  className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-700 bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200/70 px-3 py-1 rounded-xl transition-all text-left"
                >
                  <Cloud className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>How to sync laptop & phone automatically?</span>
                  <span className="text-[10px] font-bold text-blue-500 ml-1">{showKvTip ? "Hide ▲" : "View ▼"}</span>
                </button>

                {showKvTip && (
                  <div className="mt-2 p-3 text-left bg-blue-50/50 border border-blue-200 rounded-2xl text-[11px] text-slate-700 space-y-1.5 animate-fadeIn">
                    <p className="font-bold text-blue-900 flex items-center gap-1">
                      <Info className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      Automatic 1-Click Vercel KV Setup (Free):
                    </p>
                    <ol className="list-decimal pl-4 space-y-1 text-slate-600">
                      <li>Go to your project on <strong className="text-slate-900">vercel.com</strong></li>
                      <li>Click the <strong className="text-slate-900">Storage</strong> tab &gt; <strong className="text-slate-900">Create Database</strong> &gt; Choose <strong className="text-blue-700">KV</strong></li>
                      <li>Click <strong className="text-slate-900">Connect to Project</strong> (<code className="bg-white px-1 rounded border">mt-reviewer2026</code>)</li>
                    </ol>
                    <p className="text-[10px] text-slate-500 italic pt-1">
                      Once connected, every device in Room 106 syncs live automatically without sharing links!
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Current Student Highlight Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-lg shadow-blue-950/20 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-2xl overflow-hidden shrink-0">
                {profile.customPhoto ? (
                  <img src={profile.customPhoto} alt="Me" className="w-full h-full object-cover" />
                ) : (
                  <span>{profile.avatar || "🤖"}</span>
                )}
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm truncate">{profile.name}</span>
                  <span className="text-[9px] font-bold bg-blue-500/30 text-blue-200 px-2 py-0.2 rounded-full border border-blue-400/30 shrink-0">
                    {profile.section}
                  </span>
                </div>
                <div className="text-[11px] text-blue-200 flex items-center gap-1">
                  <span>Lv. {levelInfo.level} • {levelInfo.title}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-center sm:text-right border-t sm:border-t-0 border-white/10 pt-2.5 sm:pt-0 w-full sm:w-auto justify-around sm:justify-end">
              <div>
                <span className="text-[9px] uppercase font-bold text-blue-300 block">
                  {selectedSubject === "all" ? "Class Rank" : "Subject Rank"}
                </span>
                <span className="text-lg sm:text-xl font-black text-amber-400">#{currentUserRank}</span>
              </div>
              <div className="w-px h-7 bg-white/10"></div>
              <div>
                <span className="text-[9px] uppercase font-bold text-blue-300 block">
                  {selectedSubject === "all" ? "Total XP" : "Subject XP"}
                </span>
                <span className="text-xs sm:text-sm font-black text-emerald-400">+{(currentUserItem.xp || 0).toLocaleString()}</span>
              </div>
              <div className="w-px h-7 bg-white/10"></div>
              <div>
                <span className="text-[9px] uppercase font-bold text-blue-300 block">Fastest</span>
                <span className="text-xs sm:text-sm font-black text-cyan-300">
                  {currentUserItem.fastestBlitz ? `${currentUserItem.fastestBlitz}s` : "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Per-Subject Filter Ribbon */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 px-0.5">
              <span>View Leaderboard For:</span>
              <span className="text-blue-700 font-extrabold">
                {SUBJECT_TABS.find((t) => t.id === selectedSubject)?.label || "Overall"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
              {SUBJECT_TABS.map((tab) => {
                const isCur = selectedSubject === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedSubject(tab.id)}
                    className={`btn-haptic px-2.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all flex items-center gap-1 ${
                      isCur
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/70"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4th Year Section Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1 shrink-0">Section:</span>
            {["all", "4A", "4B", "4C", "4D"].map((sec) => (
              <button
                key={sec}
                type="button"
                onClick={() => setSelectedSection(sec)}
                className={`btn-haptic px-2.5 py-1 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedSection === sec
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/80"
                }`}
              >
                {sec === "all" ? "All 4th Year" : `BSCPE ${sec}`}
              </button>
            ))}
          </div>

          {/* Action Row: Filter Tabs & Share/Add Buttons */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setFilter("xp")}
                  className={`btn-haptic px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    filter === "xp"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  XP & Level
                </button>
                <button
                  onClick={() => setFilter("speed")}
                  className={`btn-haptic px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    filter === "speed"
                      ? "bg-amber-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Fastest Speed
                </button>
                <button
                  onClick={() => setFilter("score")}
                  className={`btn-haptic px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    filter === "score"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  Top Score %
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsImportOpen(!isImportOpen)}
                  className="btn-haptic flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all"
                  title="Import classmate scorecard code"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Add Friend</span>
                </button>

                <button
                  onClick={handleShare}
                  className="btn-haptic flex items-center gap-1.5 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 rounded-lg text-xs font-bold transition-all"
                  title="Share your scorecard link with classmates"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-blue-600" />}
                  <span>{copied ? "Link Copied!" : "Share Link"}</span>
                </button>

                {onOpenPassCard && (
                  <button
                    onClick={onOpenPassCard}
                    className="btn-haptic flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 rounded-lg text-xs font-bold transition-all"
                    title="View your Reviewer Pass & 4-Digit PIN to sync with phone"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-amber-600" />
                    <span className="hidden sm:inline">Sync to Phone</span>
                  </button>
                )}
              </div>
            </div>

            {/* Import Box Accordion */}
            {isImportOpen && (
              <form onSubmit={handleImportSubmit} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2 animate-fadeIn">
                <label className="text-[11px] font-bold text-slate-700 block">
                  Paste Friend's Scorecard Code or Link:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Paste scorecard code here..."
                    value={importCode}
                    onChange={(e) => setImportCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="btn-haptic px-3 py-1.5 bg-blue-600 text-white font-bold text-xs rounded-lg shadow-xs"
                  >
                    Add
                  </button>
                </div>
                {importError && (
                  <p className="text-[11px] text-rose-500">{importError}</p>
                )}
              </form>
            )}
          </div>

          {/* Standings List */}
          <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1">
            {sortedList.map((item, idx) => {
              const rankNum = idx + 1;
              const isMe = item.isCurrentUser;

              let rankBadge = (
                <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                  {rankNum}
                </span>
              );

              if (rankNum === 1) {
                rankBadge = (
                  <span className="w-6 h-6 rounded-lg bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                    🥇
                  </span>
                );
              } else if (rankNum === 2) {
                rankBadge = (
                  <span className="w-6 h-6 rounded-lg bg-slate-300 text-slate-800 font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                    🥈
                  </span>
                );
              } else if (rankNum === 3) {
                rankBadge = (
                  <span className="w-6 h-6 rounded-lg bg-amber-600 text-white font-black text-xs flex items-center justify-center shrink-0 shadow-xs">
                    🥉
                  </span>
                );
              }

              return (
                <div
                  key={item.id}
                  className={`p-2.5 sm:p-3 rounded-xl border transition-all flex items-center justify-between gap-2.5 ${
                    isMe
                      ? "bg-blue-50/90 border-blue-400 shadow-xs ring-1 ring-blue-500/20"
                      : "bg-white hover:bg-slate-50 border-slate-200/80"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {rankBadge}

                    <div className="w-8 h-8 rounded-lg bg-slate-100 border border-slate-200/80 flex items-center justify-center text-base overflow-hidden shrink-0">
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

          {/* Empty Roster Prompt (When only current user is present) */}
          {otherClassmatesCount === 0 && (
            <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-center space-y-1">
              <p className="text-xs font-bold text-slate-700">
                You are currently Rank #1 on this device! 🏆
              </p>
              <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                No fake bots here! Click <strong>"Share Link"</strong> to send your scorecard to BSCPE 4D classmates on Messenger or Discord to battle for the top spot.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default LeaderboardModal;
