import React, { useState } from "react";
import { 
  BookOpen, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  MapPin, 
  User, 
  Copy, 
  Check, 
  Zap, 
  Info, 
  List,
  Sparkles,
  Printer,
  FileText,
  LayoutGrid,
  PenTool,
  CheckSquare,
  Square
} from "lucide-react";
import { MathView, FormattedText } from "./MathView";
import { useUser } from "../context/UserContext";
import { SECTIONS, normalizeSectionKey } from "../data/scheduleData";

export function ReviewerNotes({ subject, searchQuery }) {
  const { profile } = useUser();
  const userSecKey = normalizeSectionKey(profile?.section || "4D");
  const activeSection = SECTIONS[userSecKey] || SECTIONS["4D"];

  const [readingView, setReadingView] = useState("zen"); // "zen" (clean document/PDF) | "cards" (modular cards)
  const [expandedCards, setExpandedCards] = useState({});
  const [selectedUnit, setSelectedUnit] = useState("all");
  const [copiedId, setCopiedId] = useState(null);
  const [completedProblems, setCompletedProblems] = useState({});

  const toggleCard = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all = {};
    subject.topics.forEach((u) => {
      u.cards.forEach((c) => {
        all[c.id] = true;
      });
    });
    setExpandedCards(all);
  };

  const collapseAll = () => {
    setExpandedCards({});
  };

  const copyFormula = (formulaText, id) => {
    navigator.clipboard.writeText(formulaText);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const toggleProblem = (id) => {
    setCompletedProblems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Determine assigned proctor based on course schedule
  const isDay2Subject = ["cpe412", "elect3", "cpe413", "engwork"].includes(subject.id);
  const assignedProctor = isDay2Subject 
    ? (activeSection.proctorsDay2?.[subject.id] || activeSection.proctorDay2Summary)
    : activeSection.proctorDay1;

  const filteredTopics = subject.topics
    .filter((unit) => selectedUnit === "all" || unit.unitId === selectedUnit)
    .map((unit) => {
      const matchingCards = unit.cards.filter((card) => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (
          card.title.toLowerCase().includes(q) ||
          card.content.toLowerCase().includes(q) ||
          card.category.toLowerCase().includes(q) ||
          (card.keyPoints && card.keyPoints.some((kp) => kp.toLowerCase().includes(q))) ||
          (card.examTrap && card.examTrap.toLowerCase().includes(q))
        );
      });
      return {
        ...unit,
        cards: matchingCards,
      };
    })
    .filter((unit) => unit.cards.length > 0);

  const paperProblems = subject.paperProblems || [];
  const completedCount = Object.values(completedProblems).filter(Boolean).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Reading View Switcher & Action Controls */}
      <div className="no-print double-bezel-outer">
        <div className="double-bezel-inner p-2 sm:p-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setReadingView("zen")}
              className={`btn-haptic flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                readingView === "zen"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>Zen Reader</span>
            </button>
            <button
              onClick={() => setReadingView("cards")}
              className={`btn-haptic flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                readingView === "cards"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-indigo-600" />
              <span>Study Cards</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => window.print()}
              className="btn-haptic flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-all shrink-0"
              title="Print to PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Print to PDF</span>
            </button>

            {readingView === "cards" && (
              <div className="hidden sm:flex items-center gap-1">
                <button
                  onClick={expandAll}
                  className="btn-haptic px-2.5 py-1 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
                >
                  Expand
                </button>
                <button
                  onClick={collapseAll}
                  className="btn-haptic px-2.5 py-1 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
                >
                  Collapse
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subject Header Card */}
      <div className="double-bezel-outer">
        <div className="double-bezel-inner p-4 sm:p-8 space-y-3 sm:space-y-4">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 text-xs font-black tracking-wide text-white bg-blue-700 rounded-lg shadow-xs">
                {subject.code}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-blue-600" />
                {subject.schedule}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">
                <User className="w-3.5 h-3.5 text-amber-600" />
                Proctor: {assignedProctor}
              </span>
              {subject.instructor && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-indigo-800 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-lg">
                  Instructor: {subject.instructor}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                {activeSection.name} • {activeSection.room}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
              {subject.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              {subject.description}
            </p>

            {subject.examFormat && (
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600">
                <span className="font-bold text-slate-700">Exam Format:</span>
                {subject.examFormat.types.map((t, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-md font-medium border border-slate-200/80">
                    {t}
                  </span>
                ))}
                <span className="text-slate-400">•</span>
                <span className="text-blue-700 font-semibold">{subject.examFormat.coverage}</span>
              </div>
            )}
          </div>

          {/* Module Filter Pills */}
          {subject.topics.length > 1 && (
            <div className="no-print mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap shrink-0 flex items-center gap-1 mr-1">
                <List className="w-3.5 h-3.5" /> Jump to:
              </span>
              <button
                onClick={() => setSelectedUnit("all")}
                className={`btn-haptic px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                  selectedUnit === "all"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All Topics ({subject.topics.reduce((acc, u) => acc + u.cards.length, 0)})
              </button>
              {subject.topics.map((unit) => (
                <button
                  key={unit.unitId}
                  onClick={() => setSelectedUnit(unit.unitId)}
                  className={`btn-haptic px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                    selectedUnit === unit.unitId
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {unit.unitTitle.split(":")[0]}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* DSP GRAPH PRACTICE ADVISORY BANNER */}
      {subject.graphNotice && (
        <div className="double-bezel-outer bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-blue-500/10">
          <div className="double-bezel-inner p-5 sm:p-7 space-y-3">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/20 text-lg">
                <PenTool className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-md font-bold text-[10px] uppercase tracking-wider border border-amber-200">
                  Official Course Notice
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {subject.graphNotice.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <FormattedText text={subject.graphNotice.body} />
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ESSENTIAL GRAPH & PAPER PROBLEMS CHECKLIST (For Graph Subjects like DSP) */}
      {paperProblems.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 px-1">
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 flex items-center gap-2">
                <PenTool className="w-5 h-5 text-blue-600" />
                <span>The 6 Essential Paper Graph Problems</span>
              </h3>
              <p className="text-xs text-slate-500">
                Solve these by hand on engineering scratch paper using stem/needle plots before Monday.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                {completedCount} of {paperProblems.length} Practiced on Paper
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {paperProblems.map((prob) => {
              const isDone = !!completedProblems[prob.id];

              return (
                <div 
                  key={prob.id} 
                  className={`double-bezel-outer transition-all ${
                    isDone ? "opacity-80 ring-1 ring-emerald-500/30" : ""
                  }`}
                >
                  <div className="double-bezel-inner p-4 sm:p-6 space-y-4">
                    <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => toggleProblem(prob.id)}
                          className={`btn-haptic p-1 rounded-lg transition-colors cursor-pointer ${
                            isDone ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
                          }`}
                          title={isDone ? "Mark as unpracticed" : "Mark as solved on scratch paper"}
                        >
                          {isDone ? (
                            <CheckSquare className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <Square className="w-5 h-5" />
                          )}
                        </button>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/80">
                              Problem {prob.number}
                            </span>
                            <span className="text-xs font-semibold text-slate-500">
                              {prob.category}
                            </span>
                          </div>
                          <h4 className={`text-base font-bold text-slate-900 mt-1 ${isDone ? "line-through text-slate-500" : ""}`}>
                            {prob.title}
                          </h4>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 shrink-0">
                        {prob.difficulty}
                      </span>
                    </div>

                    {/* Problem Prompt */}
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-800 leading-relaxed">
                      <strong className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                        Pencil-and-Paper Prompt:
                      </strong>
                      <FormattedText text={prob.prompt} />
                    </div>

                    {/* Step-by-Step Method */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                        Step-by-Step Hand Solution Method:
                      </span>
                      <div className="space-y-1.5 pl-1">
                        {prob.method.map((step, sIdx) => (
                          <div key={sIdx} className="text-xs sm:text-sm text-slate-700 leading-relaxed flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                            <span className="flex-1">
                              <FormattedText text={step} />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Exam Tip */}
                    {prob.examTip && (
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/80 border border-blue-200/80 text-xs text-blue-900">
                        <Zap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">Instructor Sketching Tip: </strong>
                          <FormattedText text={prob.examTip} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW A: ZEN DOCUMENT / PDF TEXTBOOK VIEW (Clean, Linear, Zero-Clutter) */}
      {readingView === "zen" && (
        <div className="space-y-12">
          {filteredTopics.map((unit) => (
            <section key={unit.unitId} className="double-bezel-outer">
              <div className="double-bezel-inner p-4 sm:p-8 sm:p-12 space-y-6 sm:space-y-8">
                {/* Unit Section Title */}
                <div className="border-b border-slate-200/80 pb-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 tracking-tight">
                      {unit.unitTitle}
                    </h3>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full whitespace-nowrap shrink-0 border border-slate-200/80">
                      {unit.cards.length} {unit.cards.length === 1 ? "Section" : "Sections"}
                    </span>
                  </div>
                  {unit.summary && (
                    <p className="text-sm text-slate-600 mt-2 leading-relaxed italic">
                      {unit.summary}
                    </p>
                  )}
                </div>

                {/* Linear Document Flow */}
                <div className="space-y-10 divide-y divide-slate-100">
                  {unit.cards.map((card, idx) => (
                    <article key={card.id} className={idx > 0 ? "pt-10 space-y-4" : "space-y-4"}>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200/60">
                          § {idx + 1}
                        </span>
                        <h4 className="text-lg sm:text-xl font-bold text-slate-900">
                          {card.title}
                        </h4>
                      </div>

                      {/* Main Definition & Body Text */}
                      <div className="text-sm sm:text-base text-slate-700 leading-relaxed pl-1">
                        <FormattedText text={card.content} />
                      </div>

                      {/* Display LaTeX Formula If Present */}
                      {card.formula && (
                        <div className="my-4 p-4 rounded-xl bg-slate-50 border border-slate-200/80 relative group">
                          <MathView math={card.formula} display={true} />
                          <button
                            onClick={() => copyFormula(card.formula, card.id)}
                            className="btn-haptic absolute top-2 right-2 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 bg-white border border-slate-200 shadow-2xs opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Copy LaTeX"
                          >
                            {copiedId === card.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      )}

                      {/* Key Takeaways & Slide Points */}
                      {card.keyPoints && card.keyPoints.length > 0 && (
                        <div className="space-y-2 pt-2">
                          <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                            Key Core Principles
                          </h5>
                          <ul className="space-y-2.5">
                            {card.keyPoints.map((pt, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2.5 text-sm text-slate-700 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-2" />
                                <span>
                                  <FormattedText text={pt} />
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Exam Trap Alert Box */}
                      {card.examTrap && (
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-xs sm:text-sm text-amber-950 mt-4">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-bold block mb-0.5">Exam Trap / Common Mistake:</strong>
                            <FormattedText text={card.examTrap} />
                          </div>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ))}
        </div>
      )}

      {/* VIEW B: MODULAR STUDY CARDS VIEW */}
      {readingView === "cards" && (
        <div className="space-y-8">
          {filteredTopics.map((unit) => (
            <div key={unit.unitId} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-900 font-serif">
                  {unit.unitTitle}
                </h3>
                <span className="text-xs text-slate-500 font-semibold">
                  {unit.cards.length} cards
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {unit.cards.map((card) => {
                  const isExpanded = expandedCards[card.id] ?? false;

                  return (
                    <div key={card.id} className="double-bezel-outer">
                      <div className="double-bezel-inner p-4 sm:p-6 space-y-4">
                        <div 
                          className="flex items-start justify-between gap-4 cursor-pointer"
                          onClick={() => toggleCard(card.id)}
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded border border-blue-200/80">
                                {card.category}
                              </span>
                              {card.badge && (
                                <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80">
                                  {card.badge}
                                </span>
                              )}
                            </div>
                            <h4 className="text-base sm:text-lg font-bold text-slate-900">
                              {card.title}
                            </h4>
                          </div>

                          <button 
                            className="btn-haptic p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                            aria-label={isExpanded ? "Collapse" : "Expand"}
                          >
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </button>
                        </div>

                        {/* Collapsed Preview vs Expanded Content */}
                        {!isExpanded ? (
                          <div className="text-xs sm:text-sm text-slate-600 line-clamp-2">
                            <FormattedText text={card.content} />
                          </div>
                        ) : (
                          <div className="space-y-4 pt-2 border-t border-slate-100 animate-fadeIn">
                            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                              <FormattedText text={card.content} />
                            </div>

                            {card.formula && (
                              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 relative group">
                                <MathView math={card.formula} display={true} />
                                <button
                                  onClick={() => copyFormula(card.formula, card.id)}
                                  className="btn-haptic absolute top-2 right-2 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 bg-white border border-slate-200 shadow-2xs opacity-0 group-hover:opacity-100 transition-opacity"
                                  title="Copy LaTeX"
                                >
                                  {copiedId === card.id ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            )}

                            {card.keyPoints && card.keyPoints.length > 0 && (
                              <div className="space-y-2">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                                  Core Principles:
                                </span>
                                <ul className="space-y-2 pl-1">
                                  {card.keyPoints.map((pt, pIdx) => (
                                    <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                      <span className="leading-relaxed">
                                        <FormattedText text={pt} />
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {card.examTrap && (
                              <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/90 border border-amber-200 text-xs sm:text-sm text-amber-950">
                                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                <div>
                                  <strong className="font-bold text-amber-950 block mb-0.5">
                                    Exam Trap / Common Mistake:
                                  </strong>
                                  <span className="leading-relaxed text-amber-900">
                                    <FormattedText text={card.examTrap} />
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewerNotes;
