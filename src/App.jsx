import React, { useState } from "react";
import { SUBJECTS_MAP } from "./data/subjects";
import { Navbar } from "./components/Navbar";
import { ReviewerNotes } from "./components/ReviewerNotes";
import { Flashcards } from "./components/Flashcards";
import { MockExam } from "./components/MockExam";
import { CramSheet } from "./components/CramSheet";
import { ScheduleModal } from "./components/ScheduleModal";
import { GraduationCap, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

export function App() {
  const subjectKeys = ["cpe414", "cpe411", "cpe416", "cpe415", "cpe412", "elect3", "cpe413", "engwork"];
  const [activeSubjectId, setActiveSubjectId] = useState("cpe414");
  const [currentMode, setCurrentMode] = useState("reviewer");
  const [searchQuery, setSearchQuery] = useState("");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);

  const activeSubject = SUBJECTS_MAP[activeSubjectId] || SUBJECTS_MAP["cpe414"];
  const currentIndex = subjectKeys.indexOf(activeSubjectId);
  const prevSubject = currentIndex > 0 ? SUBJECTS_MAP[subjectKeys[currentIndex - 1]] : null;
  const nextSubject = currentIndex < subjectKeys.length - 1 ? SUBJECTS_MAP[subjectKeys[currentIndex + 1]] : null;

  const handleSelectSubject = (id) => {
    setActiveSubjectId(id);
    setSearchQuery("");
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

        {/* Global Bottom Subject Navigator */}
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
      </main>

      {/* Examination Schedule Modal */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        activeSubjectId={activeSubjectId}
        onSelectSubject={(id) => handleSelectSubject(id)}
      />

      {/* Agency-Grade Institutional Footer */}
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

export default App;
