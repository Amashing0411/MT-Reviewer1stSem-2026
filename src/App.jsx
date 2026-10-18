import React, { useState } from "react";
import { SUBJECTS_MAP } from "./data/subjects";
import { Navbar } from "./components/Navbar";
import { ReviewerNotes } from "./components/ReviewerNotes";
import { Flashcards } from "./components/Flashcards";
import { MockExam } from "./components/MockExam";
import { CramSheet } from "./components/CramSheet";
import { ScheduleModal } from "./components/ScheduleModal";
import { WelcomeModal } from "./components/WelcomeModal";
import { LeaderboardModal } from "./components/LeaderboardModal";
import { StudentPassCardModal } from "./components/StudentPassCardModal";
import { AuroraBackground } from "./components/ui/aurora-background";
import { ClassShoutbox } from "./components/ClassShoutbox";
import { StudentProfileModal } from "./components/StudentProfileModal";
import { BattleArena } from "./components/battle/BattleArena";
import { UserProvider, useUser } from "./context/UserContext";
import { StudentAvatar } from "./components/StudentAvatar";
import { AVATAR_FRAMES, NAME_EFFECTS } from "./utils/gamification";
import { 
  GraduationCap, 
  MapPin, 
  ChevronLeft, 
  ChevronRight, 
  Trophy, 
  Sparkles, 
  Clock, 
  Award,
  Share2,
  Check,
  BookOpen,
  Layers,
  CheckSquare,
  FileText,
  RefreshCw,
  Swords
} from "lucide-react";
import confetti from "canvas-confetti";
import { sound } from "./utils/sound";

function AppContent() {
  const subjectKeys = ["cpe414", "cpe411", "cpe416", "cpe415", "cpe412", "elect3", "cpe413", "engwork"];
  const [activeSubjectId, setActiveSubjectId] = useState("cpe414");
  const [currentMode, setCurrentMode] = useState("reviewer");
  const [searchQuery, setSearchQuery] = useState("");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isPassCardOpen, setIsPassCardOpen] = useState(false);

  const { 
    profile, 
    levelInfo, 
    leaderboard, 
    getLeaderboard,
    isWelcomeOpen, 
    setIsWelcomeOpen, 
    isLeaderboardOpen, 
    setIsLeaderboardOpen,
    isCloudConnected,
    isSyncing,
    syncWithCloud,
    inspectedStudent,
    setInspectedStudent
  } = useUser();

  const [leaderboardSubject, setLeaderboardSubject] = useState("all");
  const [leaderboardFilter, setLeaderboardFilter] = useState("xp");
  const [leaderboardSection, setLeaderboardSection] = useState("all"); // "all" | "4A" | "4B" | "4C" | "4D"
  const [copied, setCopied] = useState(false);

  const activeSubject = SUBJECTS_MAP[activeSubjectId] || SUBJECTS_MAP["cpe414"];
  const currentIndex = subjectKeys.indexOf(activeSubjectId);
  const prevSubject = currentIndex > 0 ? SUBJECTS_MAP[subjectKeys[currentIndex - 1]] : null;
  const nextSubject = currentIndex < subjectKeys.length - 1 ? SUBJECTS_MAP[subjectKeys[currentIndex + 1]] : null;

  const handleSelectSubject = (id) => {
    setActiveSubjectId(id);
    setLeaderboardSubject(id);
    setSearchQuery("");
  };

  const currentLeaderboardList = getLeaderboard ? getLeaderboard(leaderboardSubject) : leaderboard;

  const sectionFilteredLeaderboard = currentLeaderboardList.filter((item) => {
    if (leaderboardSection === "all") return true;
    const secStr = (item.section || "").toUpperCase();
    return secStr.includes(leaderboardSection.toUpperCase());
  });

  const sortedLeaderboard = [...sectionFilteredLeaderboard].sort((a, b) => {
    if (leaderboardFilter === "xp") return b.xp - a.xp;
    if (leaderboardFilter === "speed") return (a.fastestBlitz || 999) - (b.fastestBlitz || 999);
    if (leaderboardFilter === "score") return b.highestPercent - a.highestPercent;
    return b.xp - a.xp;
  });

  const currentUserItem = sortedLeaderboard.find((item) => item.isCurrentUser) || {};
  const currentUserRank = sortedLeaderboard.findIndex((item) => item.isCurrentUser) + 1;

  const handleShare = () => {
    const text = `🎓 BSCPE 4th Year Midterm Reviewer\n` +
      `👤 Student: ${profile.name} (${profile.section})\n` +
      `⭐ Level: ${levelInfo.level} — ${levelInfo.title}\n` +
      `⚡ Total XP: ${profile.xp.toLocaleString()} XP\n` +
      `⏱️ Fastest Blitz: ${profile.fastestBlitzSeconds ? profile.fastestBlitzSeconds + "s" : "N/A"}\n` +
      `🏆 Standings Rank: #${currentUserRank || 1}\n` +
      `Join the battle: https://mt-reviewer2026.vercel.app`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AuroraBackground>

      {/* Top Floating Island Header & Subject Navigation */}
      <Navbar
        activeSubject={activeSubject}
        onSelectSubject={handleSelectSubject}
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenSchedule={() => setIsScheduleOpen(true)}
        onOpenPassCard={() => setIsPassCardOpen(true)}
      />

      {/* Main Study Arena with Macro Whitespace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-8 pb-28 sm:pb-12">
        {currentMode === "reviewer" && (
          <ReviewerNotes 
            subject={activeSubject} 
            searchQuery={searchQuery} 
          />
        )}

        {currentMode === "flashcards" && (
          <Flashcards 
            subject={activeSubject} 
            onSelectMode={setCurrentMode}
          />
        )}

        {currentMode === "mock" && (
          <MockExam 
            subject={activeSubject} 
            onSelectMode={setCurrentMode}
          />
        )}

        {currentMode === "battle" && (
          <BattleArena 
            onBackToReviewer={() => setCurrentMode("reviewer")}
          />
        )}

        {currentMode === "cram" && (
          <CramSheet 
            subject={activeSubject} 
          />
        )}

        {/* Embedded Full-Page Leaderboard Mode */}
        {currentMode === "leaderboard" && (
          <div className="space-y-6 animate-fadeIn">
            <div className="double-bezel-outer">
              <div className="double-bezel-inner p-6 sm:p-8 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700">
                        Live 4th Year Standings
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                      Midterm Class Leaderboard 🏆
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={syncWithCloud}
                      disabled={isSyncing}
                      className="btn-haptic flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/80 rounded-xl text-xs font-bold transition-all"
                      title={isCloudConnected ? "Cloud Sync Active • Click to Refresh" : "Local Mode • Click to check Cloud"}
                    >
                      <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isSyncing ? "animate-spin" : ""}`} />
                      <span>{isSyncing ? "Syncing..." : isCloudConnected ? "Cloud Synced" : "Local Mode"}</span>
                    </button>

                    <button
                      onClick={handleShare}
                      className="btn-haptic flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                      <span>{copied ? "Copied to Clipboard!" : "Share My Scorecard"}</span>
                    </button>
                  </div>
                </div>

                {/* Current Student Highlight Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl shadow-blue-950/20 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
                  <div className="flex items-center gap-4 sm:gap-5 w-full sm:w-auto min-w-0">
                    <div className="p-1.5 sm:p-2 mx-0.5 shrink-0 flex items-center justify-center">
                      <StudentAvatar
                        avatar={profile.avatar}
                        customPhoto={profile.customPhoto}
                        frameId={profile.frame}
                        size="lg"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`font-extrabold text-base sm:text-lg truncate max-w-[150px] sm:max-w-none ${
                          NAME_EFFECTS.find((fx) => fx.id === profile.nameFx)?.cssClass || ""
                        }`}>{profile.name}</span>
                        <span className="text-[10px] font-bold bg-blue-500/30 text-blue-200 px-2.5 py-0.5 rounded-full border border-blue-400/30 shrink-0">
                          {profile.section}
                        </span>
                        {profile.tagline && (
                          <span className="text-[10px] font-bold text-amber-300 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/30 truncate max-w-[150px] sm:max-w-[200px]">
                            {profile.tagline}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-blue-200 flex items-center gap-1.5 mt-0.5">
                        <span>Level {levelInfo.level} • {levelInfo.title}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center sm:flex sm:items-center sm:gap-6 sm:text-right border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0 w-full sm:w-auto">
                    <div>
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold text-blue-300 block">
                        {leaderboardSubject === "all" ? "Class Rank" : "Subject Rank"}
                      </span>
                      <span className="text-xl sm:text-3xl font-black text-amber-400">#{currentUserRank}</span>
                    </div>
                    <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
                    <div>
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold text-blue-300 block truncate">
                        {leaderboardSubject === "all" ? "Total XP" : "Subject XP"}
                      </span>
                      <span className="text-xs sm:text-lg font-black text-emerald-400">+{(currentUserItem.xp || 0).toLocaleString()}</span>
                    </div>
                    <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
                    <div>
                      <span className="text-[9px] sm:text-[10px] uppercase font-bold text-blue-300 block truncate">Fastest</span>
                      <span className="text-xs sm:text-lg font-black text-cyan-300">
                        {currentUserItem.fastestBlitz ? `${currentUserItem.fastestBlitz}s` : "No Record"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Per-Subject Selector Ribbon */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400 px-0.5">
                    <span>Leaderboard Scope:</span>
                    <span className="text-blue-700 font-extrabold">
                      {leaderboardSubject === "all" ? "Overall (All 8 Subjects)" : SUBJECTS_MAP[leaderboardSubject]?.title || leaderboardSubject.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-1">
                    {[
                      { id: "all", label: "Overall (All 8)", icon: "🌐" },
                      { id: "cpe414", label: "CPE414 • DSP", icon: "📡" },
                      { id: "cpe411", label: "CPE411 • Design 2", icon: "🔨" },
                      { id: "cpe416", label: "CPE416 • Laws", icon: "⚖️" },
                      { id: "cpe415", label: "CPE415 • Eng Mgt", icon: "💼" },
                      { id: "cpe412", label: "CPE412 • Seminars", icon: "🧭" },
                      { id: "elect3", label: "ELECT3 • Elective 3", icon: "⚡" },
                      { id: "cpe413", label: "CPE413 • Comp Arch", icon: "💻" },
                      { id: "engwork", label: "ENGWORK • Workplace", icon: "📝" },
                    ].map((tab) => {
                      const isCur = leaderboardSubject === tab.id;
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setLeaderboardSubject(tab.id)}
                          className={`btn-haptic px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 ${
                            isCur
                              ? "bg-blue-600 text-white shadow-xs ring-2 ring-blue-500/30"
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
                      onClick={() => setLeaderboardSection(sec)}
                      className={`btn-haptic px-3 py-1 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                        leaderboardSection === sec
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200/80"
                      }`}
                    >
                      {sec === "all" ? "All 4th Year" : `BSCPE ${sec}`}
                    </button>
                  ))}
                </div>

                {/* Filter Selector */}
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3 overflow-x-auto scrollbar-none">
                  <button
                    onClick={() => setLeaderboardFilter("xp")}
                    className={`btn-haptic px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 ${
                      leaderboardFilter === "xp"
                        ? "bg-slate-900 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>Total XP & Level</span>
                  </button>
                  <button
                    onClick={() => setLeaderboardFilter("speed")}
                    className={`btn-haptic px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 ${
                      leaderboardFilter === "speed"
                        ? "bg-amber-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Fastest Speed</span>
                  </button>
                  <button
                    onClick={() => setLeaderboardFilter("score")}
                    className={`btn-haptic px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 ${
                      leaderboardFilter === "score"
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Top Score %</span>
                  </button>
                </div>

                {/* Standings Cards */}
                <div className="space-y-2.5">
                  {sortedLeaderboard.map((item, idx) => {
                    const rankNum = idx + 1;
                    const isMe = item.isCurrentUser;

                    let rankBadge = (
                      <span className="w-8 h-8 rounded-xl bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center shrink-0">
                        {rankNum}
                      </span>
                    );

                    if (rankNum === 1) {
                      rankBadge = (
                        <span className="w-8 h-8 rounded-xl bg-amber-400 text-amber-950 font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                          🥇
                        </span>
                      );
                    } else if (rankNum === 2) {
                      rankBadge = (
                        <span className="w-8 h-8 rounded-xl bg-slate-300 text-slate-800 font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                          🥈
                        </span>
                      );
                    } else if (rankNum === 3) {
                      rankBadge = (
                        <span className="w-8 h-8 rounded-xl bg-amber-600 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-xs">
                          🥉
                        </span>
                      );
                    }

                    return (
                      <div
                        key={item.id}
                        onClick={() => setInspectedStudent(item)}
                        className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer group hover:scale-[1.008] hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 ${
                          isMe
                            ? "bg-blue-50/90 dark:bg-blue-950/50 border-blue-400/90 dark:border-blue-600 shadow-xs ring-2 ring-blue-500/20"
                            : "bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-750 border-slate-200/80 dark:border-slate-700"
                        }`}
                        title="Click to view classmate profile card & vanity"
                      >
                        <div className="flex items-center gap-2 sm:gap-3.5 flex-1 min-w-0">
                          {rankBadge}

                          <div className="p-1 sm:p-1.5 mx-0.5 sm:mx-1 shrink-0 flex items-center justify-center">
                            <StudentAvatar
                              avatar={item.avatar}
                              customPhoto={item.customPhoto}
                              frameId={item.frame}
                              size="md"
                            />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className={`text-xs sm:text-sm font-bold truncate max-w-[130px] sm:max-w-[200px] md:max-w-none ${
                                NAME_EFFECTS.find((fx) => fx.id === item.nameFx)?.cssClass || (isMe ? "text-blue-900 dark:text-blue-300" : "text-slate-800 dark:text-slate-200")
                              }`}>
                                {item.name} {isMe && "(You)"}
                              </span>
                              <span className="text-[9px] sm:text-[10px] font-semibold bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 px-1.5 sm:px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 shrink-0">
                                {item.section}
                              </span>
                              {item.tagline && (
                                <span className="text-[9px] sm:text-[10px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.2 rounded border border-blue-200/50 dark:border-blue-800/40 truncate max-w-[110px] sm:max-w-[160px]">
                                  {item.tagline}
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate mt-0.5">
                              Level {item.levelInfo.level} • {item.levelInfo.title}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0 pl-2">
                          {leaderboardFilter === "xp" && (
                            <span className="font-extrabold text-xs sm:text-sm text-blue-700 dark:text-blue-400">
                              {item.xp.toLocaleString()} XP
                            </span>
                          )}
                          {leaderboardFilter === "speed" && (
                            <span className="font-extrabold text-xs sm:text-sm text-amber-700 dark:text-amber-400 flex items-center gap-1 justify-end">
                              <Clock className="w-3.5 h-3.5" />
                              {item.fastestBlitz ? `${item.fastestBlitz}s` : "—"}
                            </span>
                          )}
                          {leaderboardFilter === "score" && (
                            <span className="font-extrabold text-xs sm:text-sm text-emerald-700 dark:text-emerald-400">
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
        )}

        {/* Global Bottom Subject Navigator */}
        {currentMode !== "leaderboard" && (
          <div className="no-print mt-12 pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevSubject ? (
              <button
                onClick={() => {
                  handleSelectSubject(prevSubject.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="btn-haptic w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-2xl text-xs font-bold text-slate-700 shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4 text-blue-600" />
                <span>Previous Subject: {prevSubject.code}</span>
              </button>
            ) : (
              <div className="hidden sm:block" />
            )}

            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider text-center">
              Subject {currentIndex + 1} of {subjectKeys.length} • <span className="text-blue-700">{activeSubject.code}</span>
            </div>

            {nextSubject ? (
              <button
                onClick={() => {
                  handleSelectSubject(nextSubject.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="btn-haptic w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-xs font-bold shadow-md shadow-blue-600/20"
              >
                <span>Next Subject: {nextSubject.code}</span>
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            ) : (
              <div className="hidden sm:block" />
            )}
          </div>
        )}
      </main>

      {/* Welcome / Profile Setup Modal */}
      <WelcomeModal
        isOpen={isWelcomeOpen}
        onClose={() => setIsWelcomeOpen(false)}
        onSaved={() => setIsPassCardOpen(true)}
      />

      {/* BSCPE Standings Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        onOpenPassCard={() => setIsPassCardOpen(true)}
        defaultSubject="all"
      />

      {/* Digital Student Pass Card & Phone Sync Modal */}
      <StudentPassCardModal
        isOpen={isPassCardOpen}
        onClose={() => setIsPassCardOpen(false)}
      />

      {/* Examination Schedule Modal */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        activeSubjectId={activeSubjectId}
        onSelectSubject={(id) => handleSelectSubject(id)}
      />

      {/* Classmate Profile Showcase Card Modal */}
      <StudentProfileModal
        student={inspectedStudent}
        onClose={() => setInspectedStudent(null)}
      />

      {/* Live Campus Study Shoutbox Feed Widget */}
      <ClassShoutbox />

      {/* Institutional Footer */}
      <footer className="mt-auto border-t border-slate-200/70 dark:border-slate-800/80 bg-white/60 dark:bg-slate-950/60 backdrop-blur-md py-6 pb-24 md:pb-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="font-bold text-slate-700 dark:text-slate-200">Dalubhasaan ng Lungsod ng San Pablo (DLSP)</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>College of Engineering</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <span>Official Midterm Platform for</span>
            <strong className="text-blue-700 dark:text-blue-300 font-bold bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-md border border-blue-200/60 dark:border-blue-800/40">
              BSCPE 4th Year • Sections 4A - 4D
            </strong>
          </div>
        </div>
      </footer>

      {/* Mobile Floating Thumb Navigation Bar (Hidden on Desktop) */}
      <nav 
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/90 dark:border-slate-800 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.4)] px-2 pt-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom))]"
        aria-label="Mobile Navigation"
      >
        <div className="flex items-center justify-around max-w-md mx-auto">
          {[
            { id: "reviewer", label: "Notes", icon: BookOpen },
            { id: "flashcards", label: "Cards", icon: Layers },
            { id: "mock", label: "Solo", icon: CheckSquare },
            { id: "battle", label: "Battle ⚡", icon: Swords, isHot: true },
            { id: "cram", label: "Cram", icon: FileText },
            { id: "leaderboard", label: "Rank", icon: Trophy },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = currentMode === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sound.playFlip();
                  setCurrentMode(tab.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`btn-haptic flex flex-col items-center justify-center py-1 px-1.5 sm:px-3 rounded-xl transition-all relative min-w-0 flex-1 ${
                  isActive 
                    ? tab.isHot
                      ? "text-amber-600 dark:text-amber-400 font-black scale-105"
                      : "text-blue-700 dark:text-blue-400 font-extrabold scale-105" 
                    : tab.isHot
                    ? "text-amber-600/80 dark:text-amber-400/80 font-bold"
                    : "text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 font-medium"
                }`}
              >
                <Icon className={`w-4 h-4 sm:w-5 sm:h-5 mb-0.5 transition-transform ${
                  isActive 
                    ? tab.isHot ? "text-amber-500 fill-amber-500/30 stroke-[2.5]" : "text-blue-600 dark:text-blue-400 stroke-[2.5]" 
                    : tab.isHot ? "text-amber-500/80 stroke-[2]" : "stroke-[1.75]"
                }`} />
                <span className="text-[9px] sm:text-[10px] tracking-tight truncate max-w-full">{tab.label}</span>
                {isActive && (
                  <span className={`absolute bottom-0 w-1.5 h-1.5 rounded-full animate-pulse ${
                    tab.isHot ? "bg-amber-500" : "bg-blue-600 dark:bg-blue-400"
                  }`}></span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </AuroraBackground>
  );
}

export function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
