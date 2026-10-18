import React from "react";
import { SCHEDULE_DATA } from "../data/scheduleData";
import { X, Calendar, Clock, User, MapPin, ArrowRight } from "lucide-react";

export function ScheduleModal({ isOpen, onClose, onSelectSubject, activeSubjectId }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-fadeIn">
      <div 
        className="double-bezel-outer w-full max-w-4xl max-h-[92vh] overflow-y-auto animate-scaleIn text-slate-900"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="double-bezel-inner p-6 sm:p-9 relative">
          {/* Top DLSP Branding exactly matching official poster */}
          <div className="text-center pb-5 border-b border-slate-100">
            <div className="inline-flex items-center justify-center gap-2 mb-2 p-1 bg-slate-100/90 rounded-full border border-slate-200/80 shadow-2xs">
              <span className="w-6 h-6 rounded-full bg-blue-700 text-white flex items-center justify-center text-[9px] font-bold">DLSP</span>
              <span className="w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-[9px] font-bold">COE</span>
              <span className="w-6 h-6 rounded-full bg-cyan-700 text-white flex items-center justify-center text-[9px] font-bold">CPE</span>
              <span className="w-6 h-6 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[9px] font-bold">4D</span>
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

            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-900 border border-blue-200/80 rounded-full font-bold text-xs">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>BSCPE 4D — Room 106 Official Timetable</span>
            </div>

            <button
              onClick={onClose}
              className="btn-haptic absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Schedule Tables */}
          <div className="mt-6 space-y-8">
            {SCHEDULE_DATA.map((dayGroup, idx) => (
              <div key={idx} className="space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-serif flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                    {dayGroup.day} — <span className="text-blue-700">{dayGroup.date}</span>
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200/80">
                    Room 106
                  </span>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-2xs bg-white">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200/80 bg-slate-50/70 font-bold text-slate-600 text-[11px] uppercase tracking-wider">
                        <th className="py-3 px-4">Time</th>
                        <th className="py-3 px-4">Course Code</th>
                        <th className="py-3 px-4">Course Description</th>
                        <th className="py-3 px-4">Proctor</th>
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
                            <td className="py-3 px-4 font-black text-blue-700">
                              {exam.code}
                            </td>
                            <td className="py-3 px-4 text-slate-900 font-medium">
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
                                className={`btn-haptic px-3 py-1 rounded-xl text-xs font-bold transition-all ${
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
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
            <span>Official Midterm Examination Schedule AY 2026-2027</span>
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
