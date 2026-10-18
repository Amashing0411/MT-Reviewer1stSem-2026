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
import { UserProvider, useUser } from "./context/UserContext";
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
  Check
} from "lucide-react";
import confetti from "canvas-confetti";

function AppContent() {
  const subjectKeys = ["cpe414", "cpe411", "cpe416", "cpe415", "cpe412", "elect3", "cpe413", "engwork"];
  const [activeSubjectId, setActiveSubjectId] = useState("cpe414");
  const [currentMode, setCurrentMode] = useState("reviewer");
  const [searchQuery, setSearchQuery] = useState("");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const { 
    profile, 
    levelInfo, 
    leaderboard, 
    isWelcomeOpen, 
    setIsWelcomeOpen, 
    isLeaderboardOpen, 
    setIsLeaderboardOpen 
  } = useUser();

  const [leaderboardFilter, setLeaderboardFilter] = useState("xp");
  const [copied, setCopied] = useState(false);

  const activeSubject = SUBJECTS_MAP[activeSubjectId] || SUBJECTS_MAP["cpe414"];
  const currentIndex = subjectKeys.indexOf(activeSubjectId);
  const prevSubject = currentIndex > 0 ? SUBJECTS_MAP[subjectKeys[currentIndex - 1]] : null;
  const nextSubject = currentIndex < subjectKeys.length - 1 ? SUBJECTS_MAP[subjectKeys[currentIndex + 1]] : null;

  const handleSelectSubject = (id) => {
    setActiveSubjectId(id);
    setSearchQuery("");
  };

  const sortedLeaderboard = [...leaderboard].sort((a, b) => {
    if (leaderboardFilter === "xp") return b.xp - a.xp;
    if (leaderboardFilter === "speed") return (a.fastestBlitz || 999) - (b.fastestBlitz || 999);
    if (leaderboardFilter === "score") return b.highestPercent - a.highestPercent;
    return b.xp - a.xp;
  });

  const currentUserRank = sortedLeaderboard.findIndex((item) => item.isCurrentUser) + 1;

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
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Floating Island Header & Subject Navigation */}
      <Navbar
        activeSubject={activeSubject}
        onSelectSubject={handleSelectSubject}
        currentMode={currentMode}
        onSelectMode={setCurrentMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenSchedule={() => setIsScheduleOpen(true)}
      />

      {/* Main Study Arena with Macro Whitespace */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {currentMode === "reviewer" && (
          <ReviewerNotes 
            subject={activeSubject} 
            searchQuery={searchQuery} 
          />
        )}

        {currentMode === "flashcards" && (
          <Flashcards 
            subject={activeSubject} 
          />
        )}

        {currentMode === "mock" && (
          <MockExam 
            subject={activeSubject} 
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
                        Live Room 106 Standings
                      </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                      Midterm Class Leaderboard 🏆
                    </h2>
                  </div>

                  <button
                    onClick={handleShare}
                    className="btn-haptic flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-600/20"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />}
                    <span>{copied ? "Copied to Clipboard!" : "Share My Scorecard"}</span>
                  </button>
                </div>

                {/* Current Student Highlight Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl shadow-blue-950/20 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-3xl overflow-hidden shrink-0">
                      {profile.customPhoto ? (
                        <img src={profile.customPhoto} alt="Me" className="w-full h-full object-cover" />
                      ) : (
                        <span>{profile.avatar || "🤖"}</span>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-base sm:text-lg">{profile.name}</span>
                        <span className="text-[10px] font-bold bg-blue-500/30 text-blue-200 px-2.5 py-0.5 rounded-full border border-blue-400/30">
                          {profile.section}
                        </span>
                      </div>
                      <div className="text-xs text-blue-200 flex items-center gap-1.5 mt-0.5">
                        <span>Level {levelInfo.level} • {levelInfo.title}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-center sm:text-right border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0 w-full sm:w-auto justify-around sm:justify-end">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-300 block">Class Rank</span>
                      <span className="text-2xl sm:text-3xl font-black text-amber-400">#{currentUserRank}</span>
                    </div>
                    <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-300 block">Total Experience</span>
                      <span className="text-base sm:text-lg font-black text-emerald-400">+{profile.xp.toLocaleString()} XP</span>
                    </div>
                    <div className="w-px h-10 bg-white/10 hidden sm:block"></div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-300 block">Fastest Blitz</span>
                      <span className="text-base sm:text-lg font-black text-cyan-300">
                        {profile.fastestBlitzSeconds ? `${profile.fastestBlitzSeconds}s` : "No Record"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Filter Selector */}
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <button
                    onClick={() => setLeaderboardFilter("xp")}
                    className={`btn-haptic px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
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
                    className={`btn-haptic px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
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
                    className={`btn-haptic px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
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
                        className={`p-3.5 sm:p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                          isMe
                            ? "bg-blue-50/90 border-blue-400/90 shadow-xs ring-2 ring-blue-500/20"
                            : "bg-white hover:bg-slate-50 border-slate-200/80"
                        }`}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          {rankBadge}

                          <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200/80 flex items-center justify-center text-xl overflow-hidden shrink-0">
                            {item.customPhoto ? (
                              <img src={item.customPhoto} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <span>{item.avatar || "🤖"}</span>
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-xs sm:text-sm font-bold truncate ${isMe ? "text-blue-900" : "text-slate-800"}`}>
                                {item.name} {isMe && "(You)"}
                              </span>
                              <span className="text-[10px] font-semibold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md border border-slate-200 shrink-0">
                                {item.section}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 font-medium truncate">
                              Level {item.levelInfo.level} • {item.levelInfo.title}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          {leaderboardFilter === "xp" && (
                            <span className="font-extrabold text-xs sm:text-sm text-blue-700">
                              {item.xp.toLocaleString()} XP
                            </span>
                          )}
                          {leaderboardFilter === "speed" && (
                            <span className="font-extrabold text-xs sm:text-sm text-amber-700 flex items-center gap-1 justify-end">
                              <Clock className="w-3.5 h-3.5" />
                              {item.fastestBlitz ? `${item.fastestBlitz}s` : "—"}
                            </span>
                          )}
                          {leaderboardFilter === "score" && (
                            <span className="font-extrabold text-xs sm:text-sm text-emerald-700">
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
      />

      {/* Room 106 Standings Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
      />

      {/* Examination Schedule Modal */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        activeSubjectId={activeSubjectId}
        onSelectSubject={(id) => handleSelectSubject(id)}
      />

      {/* Institutional Footer */}
      <footer className="mt-auto border-t border-slate-200/70 bg-white/60 backdrop-blur-md py-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span className="font-bold text-slate-700">Dalubhasaan ng Lungsod ng San Pablo (DLSP)</span>
            <span className="text-slate-300">•</span>
            <span>College of Engineering</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <span>Official Midterm Platform for</span>
            <strong className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200/60">
              BSCPE 4D • Room 106
            </strong>
          </div>
        </div>
      </footer>
    </div>
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
