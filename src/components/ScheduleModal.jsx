import React, { useState } from "react";
import { SECTIONS, getScheduleForSection, normalizeSectionKey } from "../data/scheduleData";
import { useUser } from "../context/UserContext";
import { X, Calendar, Clock, User, MapPin, ArrowRight, ShieldCheck } from "lucide-react";

export function ScheduleModal({ isOpen, onClose, onSelectSubject, activeSubjectId }) {
  const { profile } = useUser();
  const userSectionKey = normalizeSectionKey(profile?.section || "4D");
  const [activeSectionKey, setActiveSectionKey] = useState(userSectionKey);

  if (!isOpen) return null;

  const currentSection = SECTIONS[activeSectionKey] || SECTIONS["4D"];
  const scheduleData = getScheduleForSection(activeSectionKey);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm dark:backdrop-blur-md animate-fadeIn">
      <div 
        className="double-bezel-outer w-full max-w-4xl max-h-[92vh] overflow-y-auto animate-scaleIn text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="double-bezel-inner p-5 sm:p-8 relative">
          {/* Top DLSP Branding exactly matching official poster */}
          <div className="text-center pb-5 border-b border-slate-100">
            <div className="inline-flex items-center justify-center gap-2 mb-2 p-1 bg-slate-100/90 rounded-full border border-slate-200/80 shadow-2xs">
              <span className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center text-[9px] font-bold">DLSP</span>
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-[9px] font-bold">COE</span>
              <span className="w-6 h-6 rounded-full bg-cyan-700 text-white flex items-center justify-center text-[9px] font-bold">CPE</span>
              <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[9px] font-bold">4th</span>
            </div>

            <div className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
              Dalubhasaan ng Lungsod ng San Pablo
            </div>
            <div className="text-[9px] font-semibold tracking-wider text-slate-400 uppercase mt-0.5">
              College of Engineering Student Council
            </div>

            <h2 className="mt-2 text-2xl sm:text-3xl font-serif font-bold text-blue-900 tracking-tight">
              Bachelor of Science in Computer Engineering
            </h2>

            {/* Interactive Section Switcher Tabs */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {Object.keys(SECTIONS).map((key) => {
                const sec = SECTIONS[key];
                const isSelected = activeSectionKey === key;
                const isUserSection = userSectionKey === key;

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveSectionKey(key)}
                    className={`btn-haptic px-3 sm:px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-blue-700 text-white shadow-md shadow-blue-700/25 scale-102"
                        : "bg-slate-100 hover:bg-slate-200/80 text-slate-700 border border-slate-200/70"
                    }`}
                  >
                    <span>{sec.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                      isSelected ? "bg-white/20 text-white" : "bg-white text-slate-600 border border-slate-200"
                    }`}>
                      {sec.room}
                    </span>
                    {isUserSection && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Your Profile Section" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-900 border border-blue-200/80 rounded-full font-bold text-xs">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>{currentSection.name} • {currentSection.room} Official Timetable</span>
            </div>

            <button
              onClick={onClose}
              className="btn-haptic absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Schedule Tables */}
          <div className="mt-6 space-y-7">
            {scheduleData.map((dayGroup, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 pb-1">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    {dayGroup.day} — <span className="text-blue-700">{dayGroup.date}</span>
                  </h3>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200/80">
                      {currentSection.room}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/80">
                      Proctor: {dayGroup.proctorDefault}
                    </span>
                  </div>
                </div>

                {/* Desktop Table View (>= 640px) */}
                <div className="hidden sm:block overflow-x-auto rounded-2xl border border-slate-200/90 shadow-2xs bg-white">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200/80 bg-slate-50/70 font-bold text-slate-600 text-[11px] uppercase tracking-wider">
                        <th className="py-3 px-4">Time</th>
                        <th className="py-3 px-4">Course Code</th>
                        <th className="py-3 px-4">Course Description</th>
                        <th className="py-3 px-4">Assigned Proctor</th>
                        <th className="py-3 px-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {dayGroup.exams.map((exam) => {
                        const isCurrent = activeSubjectId === exam.id;
                        return (
                          <tr 
                            key={exam.id}
                            className={`transition-colors ${
                              isCurrent ? "bg-blue-50/80 font-semibold" : "hover:bg-slate-50/60"
                            }`}
                          >
                            <td className="py-3 px-4 text-slate-700 whitespace-nowrap font-medium text-xs">
                              <span className="inline-flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5 text-blue-600" />
                                {exam.time}
                              </span>
                            </td>
                            <td className="py-3 px-4 font-black text-blue-700 whitespace-nowrap">
                              {exam.code}
                            </td>
                            <td className="py-3 px-4 text-slate-900 font-medium min-w-[200px]">
                              {exam.title}
                            </td>
                            <td className="py-3 px-4 text-slate-600 text-xs whitespace-nowrap">
                              <span className="inline-flex items-center gap-1">
                                <User className="w-3.5 h-3.5 text-amber-600" />
                                {exam.proctor}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() => {
                                  onSelectSubject(exam.id);
                                  onClose();
                                }}
                                className={`btn-haptic px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                  isCurrent
                                    ? "bg-blue-700 text-white"
                                    : "bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200/60"
                                }`}
                              >
                                {isCurrent ? "Active" : "Open"}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View (< 640px) */}
                <div className="sm:hidden space-y-2.5">
                  {dayGroup.exams.map((exam) => {
                    const isCurrent = activeSubjectId === exam.id;
                    return (
                      <div 
                        key={exam.id} 
                        className={`p-3 rounded-2xl border transition-all ${
                          isCurrent 
                            ? "bg-blue-50/90 border-blue-400 shadow-xs ring-1 ring-blue-500/20" 
                            : "bg-white border-slate-200"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="font-mono font-black text-xs text-blue-700 bg-blue-100/70 px-2 py-0.5 rounded">
                              {exam.code}
                            </span>
                            <h5 className="font-bold text-xs text-slate-900 mt-1 leading-snug">
                              {exam.title}
                            </h5>
                          </div>
                          <button
                            onClick={() => {
                              onSelectSubject(exam.id);
                              onClose();
                            }}
                            className={`btn-haptic px-3 py-1 rounded-xl text-xs font-bold shrink-0 cursor-pointer ${
                              isCurrent
                                ? "bg-blue-700 text-white"
                                : "bg-slate-100 text-slate-700 border border-slate-200"
                            }`}
                          >
                            {isCurrent ? "Active" : "Open"}
                          </button>
                        </div>
                        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                          <span className="flex items-center gap-1 text-slate-700">
                            <Clock className="w-3 h-3 text-blue-600" />
                            {exam.time}
                          </span>
                          <span className="flex items-center gap-1 text-slate-600">
                            <User className="w-3 h-3 text-amber-600" />
                            {exam.proctor}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Official Midterm Examination Schedule AY 2026-2027 • DLSP COE
            </span>
            <button
              onClick={onClose}
              className="btn-haptic px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleModal;
