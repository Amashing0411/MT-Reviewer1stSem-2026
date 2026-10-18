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
  Check
} from "lucide-react";
import { SCHEDULE_DATA } from "../data/scheduleData";
import { sound } from "../utils/sound";

export function Navbar({
  activeSubject,
  onSelectSubject,
  currentMode,
  onSelectMode,
  searchQuery,
  onSearchChange,
  onOpenSchedule,
}) {
  const day1 = SCHEDULE_DATA[0];
  const day2 = SCHEDULE_DATA[1];
  const [isSoundOn, setIsSoundOn] = useState(sound.enabled);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dayFilter, setDayFilter] = useState("all"); // "all" | "day1" | "day2"

  const toggleAudio = () => {
    const newState = sound.toggleSound();
    setIsSoundOn(newState);
    if (newState) sound.playStreak();
  };

  const modes = [
    { id: "reviewer", label: "Study Notes", icon: BookOpen, desc: "Zen Textbook & Formulas" },
    { id: "flashcards", label: "Flashcards", icon: Layers, desc: "3D Active Recall" },
    { id: "mock", label: "Quiz Battle", icon: CheckSquare, desc: "Streaks, XP & Exam Mode" },
    { id: "cram", label: "Cram Sheet", icon: FileText, desc: "10-Min Hallway Scan" },
  ];

  const allSubjects = [
    ...day1.exams.map(e => ({ ...e, dayLabel: "Mon Oct 19" })), 
    ...day2.exams.map(e => ({ ...e, dayLabel: "Tue Oct 20" }))
  ];

  return (
    <header className="sticky top-3 z-40 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full transition-all">
      {/* Floating Island Navigation Container */}
      <div className="double-bezel-outer backdrop-blur-xl bg-white/95 shadow-md shadow-slate-200/50">
        <div className="double-bezel-inner p-3 sm:p-4 space-y-3">
          
          {/* Top Bar: Institution Header, Quick Subject Dropdown, Sound & Timetable */}
          <div className="flex items-center justify-between gap-3 pb-2.5 border-b border-slate-100">
            {/* Left: Branding & Active Subject Quick Dropdown */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white font-black text-xs shadow-md shadow-blue-600/20 shrink-0">
                4D
              </div>
              <div className="min-w-0 relative">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-blue-700 uppercase tracking-wider truncate">
                  <span>DLSP Engineering</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/60 font-mono">
                    Room 106
                  </span>
                </div>
                
                {/* Active Subject Selector Button */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-900 tracking-tight hover:text-blue-700 transition-colors text-left"
                  title="Click to switch subject from list"
                >
                  <span className="bg-blue-100/80 text-blue-800 px-1.5 py-0.5 rounded text-[11px] font-extrabold">
                    {activeSubject.code}
                  </span>
                  <span className="truncate max-w-[140px] sm:max-w-[260px] md:max-w-[340px]">
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
                    <div className="absolute left-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-3 z-50 animate-scaleIn">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 pb-2 border-b border-slate-100 flex items-center justify-between">
                        <span>Select Exam Subject (8 Total)</span>
                        <span className="text-blue-600 font-semibold">Room 106</span>
                      </div>

                      <div className="mt-2 space-y-3 max-h-[60vh] overflow-y-auto">
                        {/* Day 1 Section */}
                        <div>
                          <span className="text-[10px] font-extrabold text-blue-700 uppercase tracking-wider px-2 py-0.5 block bg-blue-50/60 rounded">
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
                                  className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                                    isCur ? "bg-blue-600 text-white font-bold" : "hover:bg-slate-100 text-slate-800"
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className={isCur ? "text-white" : "font-extrabold text-blue-700"}>{exam.code}</span>
                                      <span className={isCur ? "text-blue-100 text-[11px]" : "text-slate-500 text-[11px]"}>{exam.time}</span>
                                    </div>
                                    <div className={`text-[11px] truncate max-w-[240px] ${isCur ? "text-blue-100" : "text-slate-600"}`}>
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
                          <span className="text-[10px] font-extrabold text-indigo-700 uppercase tracking-wider px-2 py-0.5 block bg-indigo-50/60 rounded">
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
                                  className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between transition-colors ${
                                    isCur ? "bg-indigo-600 text-white font-bold" : "hover:bg-slate-100 text-slate-800"
                                  }`}
                                >
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <span className={isCur ? "text-white" : "font-extrabold text-indigo-700"}>{exam.code}</span>
                                      <span className={isCur ? "text-indigo-100 text-[11px]" : "text-slate-500 text-[11px]"}>{exam.time}</span>
                                    </div>
                                    <div className={`text-[11px] truncate max-w-[240px] ${isCur ? "text-indigo-100" : "text-slate-600"}`}>
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

            {/* Right: Audio Toggle & Timetable */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Sound FX Toggle Button */}
              <button
                onClick={toggleAudio}
                className={`btn-haptic flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  isSoundOn
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-slate-100 text-slate-500 border-slate-200"
                }`}
                title={isSoundOn ? "Sound Effects ON" : "Sound Effects MUTED"}
              >
                {isSoundOn ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="hidden sm:inline">Audio ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                    <span className="hidden sm:inline">Muted</span>
                  </>
                )}
              </button>

              {/* Timetable Button */}
              <button
                onClick={onOpenSchedule}
                className="btn-haptic group flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 rounded-xl transition-all"
              >
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Official Schedule</span>
              </button>
            </div>
          </div>

          {/* Subject Navigation: Day Filter Tabs + 100% Visible Subject Grid */}
          <div className="space-y-2 pt-0.5">
            {/* Filter Pills */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 sm:gap-1.5 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
                  Filter by Day:
                </span>
                <button
                  onClick={() => setDayFilter("all")}
                  className={`btn-haptic px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    dayFilter === "all"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  All 8 Subjects
                </button>
                <button
                  onClick={() => setDayFilter("day1")}
                  className={`btn-haptic px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    dayFilter === "day1"
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60"
                  }`}
                >
                  <span>Mon, Oct 19</span>
                  <span className="text-[10px] opacity-80">(4)</span>
                </button>
                <button
                  onClick={() => setDayFilter("day2")}
                  className={`btn-haptic px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                    dayFilter === "day2"
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/60"
                  }`}
                >
                  <span>Tue, Oct 20</span>
                  <span className="text-[10px] opacity-80">(4)</span>
                </button>
              </div>

              <div className="text-[11px] text-slate-400 font-medium hidden md:block">
                All 8 subjects visible • Click any to review
              </div>
            </div>

            {/* Subject Buttons Grouped by Day — No horizontal scrolling needed! */}
            <div className="space-y-1.5">
              {/* Day 1: Monday */}
              {(dayFilter === "all" || dayFilter === "day1") && (
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-1 rounded-lg shrink-0">
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
                        className={`btn-haptic px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-md shadow-blue-600/25 ring-2 ring-blue-500 scale-[1.02]"
                            : "bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/80"
                        }`}
                      >
                        <span>{exam.code}</span>
                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md ${
                          isSelected ? "bg-white/20 text-white" : "text-slate-500 bg-white"
                        }`}>
                          {exam.time.split("-")[0].trim()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Day 2: Tuesday */}
              {(dayFilter === "all" || dayFilter === "day2") && (
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span className="text-[9px] font-extrabold uppercase tracking-wider text-indigo-700 bg-indigo-50 border border-indigo-200/80 px-2 py-1 rounded-lg shrink-0">
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
                        className={`btn-haptic px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/25 ring-2 ring-indigo-500 scale-[1.02]"
                            : "bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/80"
                        }`}
                      >
                        <span>{exam.code}</span>
                        <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-md ${
                          isSelected ? "bg-white/20 text-white" : "text-slate-500 bg-white"
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

          {/* Mode Selector Pill Buttons & Search */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none flex-1">
              {modes.map((mode) => {
                const Icon = mode.icon;
                const isActive = currentMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    onClick={() => onSelectMode(mode.id)}
                    className={`btn-haptic group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                      isActive
                        ? "bg-slate-900 text-white shadow-sm ring-1 ring-slate-800"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-blue-400" : "text-slate-500"}`} />
                    <span>{mode.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick Filter Search */}
            <div className="relative w-40 sm:w-56 shrink-0 hidden md:block">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={`Search ${activeSubject.code}...`}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-8 pr-7 py-1.5 bg-slate-50 focus:bg-white border border-slate-200 focus:border-blue-500 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700"
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
