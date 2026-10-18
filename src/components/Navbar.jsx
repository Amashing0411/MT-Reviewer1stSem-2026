import React, { useState } from "react";
import { 
  BookOpen, 
  Layers, 
  CheckSquare, 
  FileText, 
  Calendar, 
  Clock, 
  MapPin, 
  Search,
  Sparkles,
  ArrowRight,
  GraduationCap,
  Volume2,
  VolumeX,
  ChevronDown,
  Check,
  Trophy,
  KeyRound,
  Sun,
  Moon
} from "lucide-react";
import { SCHEDULE_DATA, SECTIONS, getScheduleForSection, normalizeSectionKey } from "../data/scheduleData";
import { sound } from "../utils/sound";
import { useUser } from "../context/UserContext";
import { AVATAR_FRAMES, NAME_EFFECTS } from "../utils/gamification";
import { StudentAvatar } from "./StudentAvatar";

export function Navbar({
  activeSubject,
  onSelectSubject,
  currentMode,
  onSelectMode,
  searchQuery,
  onSearchChange,
  onOpenSchedule,
  onOpenPassCard,
}) {
  const { profile, levelInfo, setIsWelcomeOpen, setIsLeaderboardOpen, theme, toggleTheme } = useUser();
  const secKey = normalizeSectionKey(profile?.section || "4D");
  const currentSec = SECTIONS[secKey] || SECTIONS["4D"];
  const currentSchedule = getScheduleForSection(secKey);
  const day1 = currentSchedule[0];
  const day2 = currentSchedule[1];
  const [isSoundOn, setIsSoundOn] = useState(sound.enabled);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dayFilter, setDayFilter] = useState("all"); // "all" | "day1" | "day2"

  const activeFrame = AVATAR_FRAMES.find((f) => f.id === profile?.frame) || AVATAR_FRAMES[0];
  const frameClass = activeFrame?.cssClass || "avatar-frame-default";
  const activeNameFx = NAME_EFFECTS.find((fx) => fx.id === profile?.nameFx);
  const nameFxClass = activeNameFx?.cssClass || "";

  const toggleAudio = () => {
    const newState = sound.toggleSound();
    setIsSoundOn(newState);
    if (newState) sound.playStreak();
  };

  const modes = [
    { id: "reviewer", label: "Study Notes", icon: BookOpen },
    { id: "flashcards", label: "Flashcards", icon: Layers },
    { id: "mock", label: "Quiz Battle", icon: CheckSquare },
    { id: "cram", label: "Cram Sheet", icon: FileText },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  const allSubjects = [
    ...day1.exams.map(e => ({ ...e, dayLabel: "Mon Oct 19" })), 
    ...day2.exams.map(e => ({ ...e, dayLabel: "Tue Oct 20" }))
  ];

  return (
    <header className="sticky top-2 sm:top-3 z-40 px-2 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full transition-all">
      {/* Floating Island Navigation Container */}
      <div className="double-bezel-outer backdrop-blur-xl bg-white/95 dark:bg-slate-900/95 shadow-md shadow-slate-200/50 dark:shadow-none">
        <div className="double-bezel-inner p-2.5 sm:p-4 space-y-2 sm:space-y-3">
          
          {/* Top Bar: Institution Header, Quick Subject Switcher, Sound & Timetable */}
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
            {/* Left: Branding & Active Subject Switcher */}
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-md shadow-blue-600/20 shrink-0">
                {secKey}
              </div>

              <div className="min-w-0 relative">
                <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider truncate">
                  <span>DLSP BSCPE</span>
                  <span className="text-slate-300 dark:text-slate-600">•</span>
                  <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.2 rounded border border-emerald-200/60 dark:border-emerald-800/40 font-mono">
                    {currentSec.name} • {currentSec.room}
                  </span>
                </div>
                
                {/* Active Subject Selector Button */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1 text-xs sm:text-sm font-bold text-slate-900 dark:text-white tracking-tight hover:text-blue-700 dark:hover:text-blue-400 transition-colors text-left"
                  title="Click to switch subject from list"
                >
                  <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-1.5 py-0.5 rounded text-[11px] font-extrabold shrink-0 border border-blue-200/60 dark:border-blue-700/50">
                    {activeSubject.code}
                  </span>
                  <span className="truncate max-w-[80px] xs:max-w-[120px] sm:max-w-[200px] md:max-w-[320px]">
                    {activeSubject.title}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 shrink-0 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu listing all 8 subjects */}
                {isDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsDropdownOpen(false)}
                    />
                    <div className="absolute left-0 top-full mt-2 w-72 sm:w-88 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 z-50 animate-scaleIn">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 pb-2 border-b border-slate-100 flex items-center justify-between">
                        <span>Select Subject (8 Total)</span>
                        <span className="text-blue-600 font-semibold">{currentSec.room}</span>
                      </div>

                      <div className="mt-2 space-y-2.5 max-h-[55vh] overflow-y-auto">
                        {/* Day 1 Section */}
                        <div>
                          <span className="text-[9px] font-extrabold text-blue-700 uppercase tracking-wider px-2 py-0.5 block bg-blue-50/70 rounded">
                            Monday, Oct 19 (Day 1)
                          </span>
                          <div className="mt-1 space-y-1">
                            {day1.exams.map((exam) => {
                              const isCur = activeSubject.id === exam.id;
                              return (
                                <button
                                  key={exam.id}
                                  onClick={() => {
                                    onSelectSubject(exam.id);
                                    setIsDropdownOpen(false);
                                    sound.playFlip();
                                  }}
                                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                                    isCur ? "bg-blue-600 text-white font-bold" : "hover:bg-slate-100 text-slate-800"
                                  }`}
                                >
                                  <div className="min-w-0 pr-2">
                                    <div className="flex items-center gap-1.5">
                                      <span className={isCur ? "text-white" : "font-extrabold text-blue-700"}>{exam.code}</span>
                                      <span className={isCur ? "text-blue-100 text-[10px]" : "text-slate-500 text-[10px]"}>{exam.time.split("-")[0].trim()}</span>
                                    </div>
                                    <div className={`text-[11px] truncate ${isCur ? "text-blue-100" : "text-slate-600"}`}>
                                      {exam.title}
                                    </div>
                                  </div>
                                  {isCur && <Check className="w-4 h-4 text-white shrink-0" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Day 2 Section */}
                        <div>
                          <span className="text-[9px] font-extrabold text-indigo-700 uppercase tracking-wider px-2 py-0.5 block bg-indigo-50/70 rounded">
                            Tuesday, Oct 20 (Day 2)
                          </span>
                          <div className="mt-1 space-y-1">
                            {day2.exams.map((exam) => {
                              const isCur = activeSubject.id === exam.id;
                              return (
                                <button
                                  key={exam.id}
                                  onClick={() => {
                                    onSelectSubject(exam.id);
                                    setIsDropdownOpen(false);
                                    sound.playFlip();
                                  }}
                                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between transition-colors ${
                                    isCur ? "bg-indigo-600 text-white font-bold" : "hover:bg-slate-100 text-slate-800"
                                  }`}
                                >
                                  <div className="min-w-0 pr-2">
                                    <div className="flex items-center gap-1.5">
                                      <span className={isCur ? "text-white" : "font-extrabold text-indigo-700"}>{exam.code}</span>
                                      <span className={isCur ? "text-indigo-100 text-[10px]" : "text-slate-500 text-[10px]"}>{exam.time.split("-")[0].trim()}</span>
                                    </div>
                                    <div className={`text-[11px] truncate ${isCur ? "text-indigo-100" : "text-slate-600"}`}>
                                      {exam.title}
                                    </div>
                                  </div>
                                  {isCur && <Check className="w-4 h-4 text-white shrink-0" />}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right: Profile, Leaderboard, Theme, Audio & Schedule */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              {/* Student Profile Pill */}
              <button
                onClick={() => setIsWelcomeOpen(true)}
                className="btn-haptic flex items-center gap-1.5 p-1 sm:px-2 sm:py-1 bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-750 border border-slate-200/90 dark:border-slate-700 rounded-xl text-xs font-bold transition-all text-slate-800 dark:text-slate-100 cursor-pointer"
                title={`Profile: ${profile.name} • Lv. ${levelInfo.level} ${levelInfo.title} (${activeFrame.name})`}
              >
                <div className="p-0.5">
                  <StudentAvatar
                    avatar={profile.avatar}
                    customPhoto={profile.customPhoto}
                    frameId={profile.frame}
                    size="sm"
                  />
                </div>
                <div className="flex flex-col text-left leading-tight hidden lg:flex">
                  <span className={`text-[11px] font-bold truncate max-w-[85px] ${nameFxClass}`}>{profile.name}</span>
                  <span className="text-[9px] text-blue-600 dark:text-blue-400 font-extrabold flex items-center gap-0.5">
                    <span>Lv. {levelInfo.level}</span>
                    <span>{levelInfo.icon}</span>
                  </span>
                </div>
              </button>

              {/* Leaderboard Button */}
              <button
                onClick={() => setIsLeaderboardOpen(true)}
                className="btn-haptic flex items-center gap-1 p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-bold text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200/80 dark:border-amber-800/50 rounded-xl transition-all cursor-pointer"
                title={`${currentSec.name} Standings`}
              >
                <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="hidden sm:inline">Rank</span>
              </button>

              {/* Reviewer Pass & PIN Button */}
              {onOpenPassCard && (
                <button
                  onClick={onOpenPassCard}
                  className="btn-haptic hidden sm:flex items-center gap-1 p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-bold text-blue-900 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/80 dark:border-blue-800/50 rounded-xl transition-all cursor-pointer"
                  title="My Reviewer Pass & 4-Digit PIN"
                >
                  <KeyRound className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="hidden xl:inline">Pass & PIN</span>
                </button>
              )}

              {/* Dark / Light Mode Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="btn-haptic p-1.5 sm:px-2 sm:py-1.5 rounded-xl text-xs font-bold transition-all border bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-200/90 dark:border-slate-700 cursor-pointer"
                title={theme === "dark" ? "Switch to Light Mode (☀️)" : "Switch to Dark Mode (🌙)"}
              >
                {theme === "dark" ? (
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                )}
              </button>

              {/* Sound FX Toggle Button */}
              <button
                onClick={toggleAudio}
                className={`btn-haptic p-1.5 sm:px-2 sm:py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  isSoundOn
                    ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/50"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700"
                }`}
                title={isSoundOn ? "Audio ON" : "Muted"}
              >
                {isSoundOn ? (
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                ) : (
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                )}
              </button>

              {/* Schedule Button */}
              <button
                onClick={onOpenSchedule}
                className="btn-haptic p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 rounded-xl transition-all flex items-center gap-1 cursor-pointer"
                title="Schedule"
              >
                <Calendar className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span className="hidden md:inline">Schedule</span>
              </button>
            </div>
          </div>

          {/* MOBILE ONLY: Single-Line Horizontal Swipeable Ribbon (< 768px) */}
          <div className="flex md:hidden items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
            {allSubjects.map((exam) => {
              const isSelected = activeSubject.id === exam.id;
              return (
                <button
                  key={exam.id}
                  onClick={() => {
                    onSelectSubject(exam.id);
                    sound.playFlip();
                  }}
                  className={`btn-haptic px-2.5 py-1 rounded-xl text-[11px] font-bold whitespace-nowrap shrink-0 transition-all flex items-center gap-1 cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                  }`}
                >
                  <span>{exam.code}</span>
                  <span className={`text-[9px] font-semibold px-1 py-0.2 rounded ${
                    isSelected ? "bg-white/20 text-white" : "text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900"
                  }`}>
                    {exam.time.split("-")[0].trim()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* DESKTOP ONLY: Day Filter Tabs & 2-Row Day Matrix (>= 768px) */}
          <div className="hidden md:block space-y-2 pt-0.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 sm:gap-1.5 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">
                  Filter by Day:
                </span>
                <button
                  onClick={() => setDayFilter("all")}
                  className={`btn-haptic px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    dayFilter === "all"
                      ? "bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 shadow-xs"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  All 8 Subjects
                </button>
                <button
                  onClick={() => setDayFilter("day1")}
                  className={`btn-haptic px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    dayFilter === "day1"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200/60 dark:border-blue-800/40"
                  }`}
                >
                  <span>Mon, Oct 19</span>
                  <span className="text-[10px] opacity-80">(4)</span>
                </button>
                <button
                  onClick={() => setDayFilter("day2")}
                  className={`btn-haptic px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    dayFilter === "day2"
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200/60 dark:border-indigo-800/40"
                  }`}
                >
                  <span>Tue, Oct 20</span>
                  <span className="text-[10px] opacity-80">(4)</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-400 font-medium">
                All 8 subjects visible • Click any to review
              </div>
            </div>

            {/* Subject Buttons Grouped by Day */}
            <div className="space-y-1.5">
              {(dayFilter === "all" || dayFilter === "day1") && (
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/50 px-2 py-1 rounded-lg shrink-0">
                    Mon:
                  </span>
                  {day1.exams.map((exam) => {
                    const isSelected = activeSubject.id === exam.id;
                    return (
                      <button
                        key={exam.id}
                        onClick={() => {
                          onSelectSubject(exam.id);
                          sound.playFlip();
                        }}
                        className={`btn-haptic px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 ring-2 ring-blue-500 scale-[1.02]"
                            : "bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                        }`}
                      >
                        <span>{exam.code}</span>
                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md ${
                          isSelected ? "bg-white/20 text-white" : "text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900"
                        }`}>
                          {exam.time.split("-")[0].trim()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {(dayFilter === "all" || dayFilter === "day2") && (
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/50 px-2 py-1 rounded-lg shrink-0">
                    Tue:
                  </span>
                  {day2.exams.map((exam) => {
                    const isSelected = activeSubject.id === exam.id;
                    return (
                      <button
                        key={exam.id}
                        onClick={() => {
                          onSelectSubject(exam.id);
                          sound.playFlip();
                        }}
                        className={`btn-haptic px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          isSelected
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 ring-2 ring-indigo-500 scale-[1.02]"
                            : "bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700"
                        }`}
                      >
                        <span>{exam.code}</span>
                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md ${
                          isSelected ? "bg-white/20 text-white" : "text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900"
                        }`}>
                          {exam.time.split("-")[0].trim()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* DESKTOP ONLY: Mode Selector Pills (On mobile, moved to bottom nav) */}
          <div className="hidden md:flex pt-2 border-t border-slate-100 dark:border-slate-800 items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none flex-1">
              {modes.map((mode) => {
                const Icon = mode.icon;
                const isActive = currentMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => onSelectMode(mode.id)}
                    className={`btn-haptic group flex items-center gap-2 px-4 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                      isActive
                        ? "bg-slate-900 dark:bg-blue-600 text-white shadow-sm ring-1 ring-slate-800 dark:ring-blue-500"
                        : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-400 dark:text-white" : "text-slate-500 dark:text-slate-400"}`} />
                    <span>{mode.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Filter Search */}
            <div className="relative w-44 lg:w-56 shrink-0">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={`Search ${activeSubject.code}...`}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 bg-slate-50 dark:bg-slate-800/80 focus:bg-white dark:focus:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 rounded-xl text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 cursor-pointer"
                >
                  ×
                </button>
              )}
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}

export default Navbar;
