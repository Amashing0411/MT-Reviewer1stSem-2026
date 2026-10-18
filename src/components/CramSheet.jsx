import React from "react";
import { Printer, Zap, FileText, CheckCircle2 } from "lucide-react";
import { FormattedText } from "./MathView";
import { useUser } from "../context/UserContext";
import { SECTIONS, normalizeSectionKey } from "../data/scheduleData";

export function CramSheet({ subject }) {
  const { profile } = useUser();
  const secKey = normalizeSectionKey(profile?.section || "4D");
  const currentSec = SECTIONS[secKey] || SECTIONS["4D"];
  const cramNotes = subject.cramNotes || [];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      {/* Header Bar with Double-Bezel */}
      <div className="double-bezel-outer">
        <div className="double-bezel-inner p-4 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                10-Minute Hallway Scan
              </span>
              <span className="text-xs font-bold text-slate-500">{subject.code}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              {subject.title} • Ultra High-Yield Sheet
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Core formulas, definitions, and rules designed for last-minute review right before entering {currentSec.room}.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="btn-haptic group flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer"
          >
            <span>Print / Save PDF</span>
            <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-blue-300 group-hover:scale-105 transition-transform">
              <Printer className="w-3 h-3" />
            </div>
          </button>
        </div>
      </div>

      {/* High Yield Bullet Points in Double Bezel Container */}
      <div className="double-bezel-outer">
        <div className="double-bezel-inner p-4 sm:p-8 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Essential Exam Facts & Formulas
            </h4>
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
              {cramNotes.length} Items
            </span>
          </div>

          {cramNotes.length === 0 ? (
            <p className="text-xs text-slate-500">No cram notes yet for {subject.code}.</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {cramNotes.map((note, idx) => (
                <div key={idx} className="py-3.5 flex items-start gap-3.5 text-sm text-slate-800">
                  <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed font-medium">
                    <FormattedText text={note} />
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footnote */}
      <div className="text-center text-xs text-slate-500 pt-2 font-medium">
        <p>Dalubhasaan ng Lungsod ng San Pablo • College of Engineering • BSCPE 4th Year ({currentSec.name} • {currentSec.room})</p>
      </div>
    </div>
  );
}

export default CramSheet;
