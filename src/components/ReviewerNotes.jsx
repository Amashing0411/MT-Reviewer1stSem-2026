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
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900/90 p-1 rounded-xl border border-slate-200/60 dark:border-slate-800">
            <button
              onClick={() => setReadingView("zen")}
              className={`btn-haptic flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                readingView === "zen"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs dark:shadow-sm border border-slate-200/60 dark:border-slate-700"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <FileText className={`w-3.5 h-3.5 ${readingView === "zen" ? "text-blue-600 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"}`} />
              <span>Zen Reader</span>
            </button>
            <button
              onClick={() => setReadingView("cards")}
              className={`btn-haptic flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                readingView === "cards"
                  ? "bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs dark:shadow-sm border border-slate-200/60 dark:border-slate-700"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              <LayoutGrid className={`w-3.5 h-3.5 ${readingView === "cards" ? "text-indigo-600 dark:text-indigo-400" : "text-slate-500 dark:text-slate-400"}`} />
              <span>Study Cards</span>
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => window.print()}
              className="btn-haptic flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 transition-all shrink-0 cursor-pointer"
              title="Print to PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
              <span className="hidden sm:inline">Print to PDF</span>
            </button>

            {readingView === "cards" && (
              <div className="hidden sm:flex items-center gap-1">
                <button
                  onClick={expandAll}
                  className="btn-haptic px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 rounded-lg transition-all cursor-pointer"
                >
                  Expand
                </button>
                <button
                  onClick={collapseAll}
                  className="btn-haptic px-2.5 py-1 text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700 rounded-lg transition-all cursor-pointer"
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
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="px-2.5 sm:px-3 py-1 text-xs font-black tracking-wide text-white bg-blue-700 rounded-lg shadow-xs shrink-0">
                {subject.code}
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 sm:px-3 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                <span className="truncate max-w-[260px]">{subject.schedule}</span>
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 sm:px-3 py-1 rounded-lg">
                <User className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="truncate max-w-[200px]">Proctor: {assignedProctor}</span>
              </span>
              {subject.instructor && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-indigo-800 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 px-2.5 sm:px-3 py-1 rounded-lg">
                  <span className="truncate max-w-[200px]">Instructor: {subject.instructor}</span>
                </span>
              )}
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2.5 sm:px-3 py-1 rounded-lg shrink-0">
                <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{activeSection.name} • {activeSection.room}</span>
              </span>
            </div>

            <h2 className="text-xl sm:text-3xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
              {subject.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
              {subject.description}
            </p>

            {subject.examFormat && (
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 text-xs text-slate-600 dark:text-slate-400">
                <span className="font-bold text-slate-700 dark:text-slate-300 shrink-0">Exam Format:</span>
                {subject.examFormat.types.map((t, idx) => (
                  <span key={idx} className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md font-medium border border-slate-200/80 dark:border-slate-700 shrink-0">
                    {t}
                  </span>
                ))}
                <span className="hidden sm:inline text-slate-400">•</span>
                <span className="text-blue-700 dark:text-blue-400 font-semibold w-full sm:w-auto">{subject.examFormat.coverage}</span>
              </div>
            )}
          </div>

          {/* Module Filter Pills */}
          {subject.topics.length > 1 && (
            <div className="no-print mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap shrink-0 flex items-center gap-1 mr-1">
                <List className="w-3.5 h-3.5" /> Jump to:
              </span>
              <button
                onClick={() => setSelectedUnit("all")}
                className={`btn-haptic px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all ${
                  selectedUnit === "all"
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
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
                      : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
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
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 rounded-md font-bold text-[10px] uppercase tracking-wider border border-amber-200 dark:border-amber-800/60">
                  Official Course Notice
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  {subject.graphNotice.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
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
              <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <PenTool className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>The 6 Essential Paper Graph Problems</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Solve these by hand on engineering scratch paper using stem/needle plots before Monday.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
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
                    <div className="flex items-start justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div className="flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => toggleProblem(prob.id)}
                          className={`btn-haptic p-1 rounded-lg transition-colors cursor-pointer ${
                            isDone ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                          }`}
                          title={isDone ? "Mark as unpracticed" : "Mark as solved on scratch paper"}
                        >
                          {isDone ? (
                            <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                          ) : (
                            <Square className="w-5 h-5" />
                          )}
                        </button>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-black text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200/80 dark:border-blue-800/60">
                              Problem {prob.number}
                            </span>
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                              {prob.category}
                            </span>
                          </div>
                          <h4 className={`text-base font-bold text-slate-900 dark:text-white mt-1 ${isDone ? "line-through text-slate-400 dark:text-slate-500" : ""}`}>
                            {prob.title}
                          </h4>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800/60 shrink-0">
                        {prob.difficulty}
                      </span>
                    </div>

                    {/* Problem Prompt */}
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                      <strong className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                        Pencil-and-Paper Prompt:
                      </strong>
                      <FormattedText text={prob.prompt} />
                    </div>

                    {/* Step-by-Step Method */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200 block">
                        Step-by-Step Hand Solution Method:
                      </span>
                      <div className="space-y-1.5 pl-1">
                        {prob.method.map((step, sIdx) => (
                          <div key={sIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 mt-2" />
                            <span className="flex-1">
                              <FormattedText text={step} />
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Exam Tip */}
                    {prob.examTip && (
                      <div className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-800/60 text-xs text-blue-900 dark:text-blue-200">
                        <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold text-blue-900 dark:text-blue-100">Instructor Sketching Tip: </strong>
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
                <div className="border-b border-slate-200/80 dark:border-slate-800 pb-4">
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white tracking-tight">
                      {unit.unitTitle}
                    </h3>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full whitespace-nowrap shrink-0 border border-slate-200/80 dark:border-slate-700">
                      {unit.cards.length} {unit.cards.length === 1 ? "Section" : "Sections"}
                    </span>
                  </div>
                  {unit.summary && (
                    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed italic">
                      {unit.summary}
                    </p>
                  )}
                </div>

                {/* Linear Document Flow */}
                <div className="space-y-10 divide-y divide-slate-100 dark:divide-slate-800">
                  {unit.cards.map((card, idx) => (
                    <article key={card.id} className={idx > 0 ? "pt-10 space-y-4" : "space-y-4"}>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200/60 dark:border-blue-800/60 shrink-0">
                          § {idx + 1}
                        </span>
                        <h4 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                          {card.title}
                        </h4>
                      </div>

                      {/* Main Definition & Body Text */}
                      <div className="text-sm sm:text-base text-slate-700 dark:text-slate-200 leading-relaxed pl-1">
                        <FormattedText text={card.content} />
                      </div>

                      {/* Display LaTeX Formula If Present */}
                      {card.formula && (
                        <div className="my-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 relative group">
                          <MathView math={card.formula} display={true} />
                          <button
                            onClick={() => copyFormula(card.formula, card.id)}
                            className="btn-haptic absolute top-2 right-2 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            title="Copy LaTeX"
                          >
                            {copiedId === card.id ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      )}

                      {/* Key Takeaways & Slide Points */}
                      {card.keyPoints && card.keyPoints.length > 0 && (
                        <div className="space-y-2 pt-2">
                          <h5 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                            Key Core Principles
                          </h5>
                          <ul className="space-y-2.5">
                            {card.keyPoints.map((pt, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 shrink-0 mt-2" />
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
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs sm:text-sm text-amber-950 dark:text-amber-200 mt-4">
                          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-bold text-amber-950 dark:text-amber-100 block mb-0.5">Exam Trap / Common Mistake:</strong>
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
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
                  {unit.unitTitle}
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
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
                              <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200/80 dark:border-blue-800/60">
                                {card.category}
                              </span>
                              {card.badge && (
                                <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded border border-amber-200/80 dark:border-amber-800/60">
                                  {card.badge}
                                </span>
                              )}
                            </div>
                            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                              {card.title}
                            </h4>
                          </div>

                          <button 
                            className="btn-haptic p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            aria-label={isExpanded ? "Collapse" : "Expand"}
                          >
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </button>
                        </div>

                        {/* Collapsed Preview vs Expanded Content */}
                        {!isExpanded ? (
                          <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                            <FormattedText text={card.content} />
                          </div>
                        ) : (
                          <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800 animate-fadeIn">
                            <div className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
                              <FormattedText text={card.content} />
                            </div>

                            {card.formula && (
                              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 relative group">
                                <MathView math={card.formula} display={true} />
                                <button
                                  onClick={() => copyFormula(card.formula, card.id)}
                                  className="btn-haptic absolute top-2 right-2 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                                  title="Copy LaTeX"
                                >
                                  {copiedId === card.id ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                            )}

                            {card.keyPoints && card.keyPoints.length > 0 && (
                              <div className="space-y-2">
                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                                  Core Principles:
                                </span>
                                <ul className="space-y-2 pl-1">
                                  {card.keyPoints.map((pt, pIdx) => (
                                    <li key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                      <span className="leading-relaxed">
                                        <FormattedText text={pt} />
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {card.examTrap && (
                              <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs sm:text-sm text-amber-950 dark:text-amber-200">
                                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                <div>
                                  <strong className="font-bold text-amber-950 dark:text-amber-100 block mb-0.5">
                                    Exam Trap / Common Mistake:
                                  </strong>
                                  <span className="leading-relaxed text-amber-900 dark:text-amber-200">
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
