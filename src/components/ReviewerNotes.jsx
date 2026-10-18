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
  LayoutGrid
} from "lucide-react";
import { MathView, FormattedText } from "./MathView";

export function ReviewerNotes({ subject, searchQuery }) {
  const [readingView, setReadingView] = useState("zen"); // "zen" (clean document/PDF) | "cards" (modular cards)
  const [expandedCards, setExpandedCards] = useState({});
  const [selectedUnit, setSelectedUnit] = useState("all");
  const [copiedId, setCopiedId] = useState(null);

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

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Reading View Switcher & Action Controls */}
      <div className="no-print double-bezel-outer">
        <div className="double-bezel-inner p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1 hidden sm:inline">
              Layout Style:
            </span>
            <button
              onClick={() => setReadingView("zen")}
              className={`btn-haptic flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                readingView === "zen"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>Zen Document (PDF / Textbook)</span>
            </button>
            <button
              onClick={() => setReadingView("cards")}
              className={`btn-haptic flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                readingView === "cards"
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5 text-blue-200" />
              <span>Modular Study Cards</span>
            </button>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => window.print()}
              className="btn-haptic flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200/80 transition-all"
              title="Print to PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>Print to PDF</span>
            </button>

            {readingView === "cards" && (
              <>
                <button
                  onClick={expandAll}
                  className="btn-haptic px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                >
                  Expand All
                </button>
                <button
                  onClick={collapseAll}
                  className="btn-haptic px-3 py-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
                >
                  Collapse All
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Subject Header Card */}
      <div className="double-bezel-outer">
        <div className="double-bezel-inner p-6 sm:p-8">
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
                Proctor: {subject.proctor}
              </span>
              {subject.instructor && (
                <span className="flex items-center gap-1.5 text-xs font-semibold text-indigo-800 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-lg">
                  Instructor: {subject.instructor}
                </span>
              )}
              <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                Room 106
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

      {/* VIEW A: ZEN DOCUMENT / PDF TEXTBOOK VIEW (Clean, Linear, Zero-Clutter) */}
      {readingView === "zen" && (
        <div className="space-y-12">
          {filteredTopics.map((unit) => (
            <section key={unit.unitId} className="double-bezel-outer">
              <div className="double-bezel-inner p-8 sm:p-12 space-y-8">
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

                      {/* Formula Block in Document Flow */}
                      {card.formula && (
                        <div className="my-4 p-4 sm:p-5 bg-slate-50/80 rounded-2xl border border-slate-200/80">
                          <div className="flex items-center justify-between mb-2 text-xs font-bold text-blue-900 uppercase tracking-wider">
                            <span className="flex items-center gap-1.5">
                              <Zap className="w-3.5 h-3.5 text-amber-500" /> Formula & Derivation:
                            </span>
                            <button
                              onClick={() => copyFormula(card.formula, card.id)}
                              className="no-print btn-haptic flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold text-slate-600 bg-white border border-slate-200 shadow-2xs"
                            >
                              {copiedId === card.id ? (
                                <>
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span>Copied!</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3 h-3" />
                                  <span>Copy LaTeX</span>
                                </>
                              )}
                            </button>
                          </div>
                          <MathView math={card.formula} block={true} />
                        </div>
                      )}

                      {/* Key Takeaways Enumerations */}
                      {card.keyPoints && card.keyPoints.length > 0 && (
                        <div className="space-y-2.5 pt-2 pl-1">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                            Core Enumeration & Key Details:
                          </span>
                          <ul className="space-y-2">
                            {card.keyPoints.map((pt, i) => (
                              <li key={i} className="text-sm text-slate-700 flex items-start gap-3 bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                <span className="leading-relaxed">
                                  <FormattedText text={pt} />
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Exam Trap Callout */}
                      {card.examTrap && (
                        <div className="mt-4 flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-amber-50/90 border border-amber-200 text-sm text-amber-950">
                          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                          <div>
                            <strong className="font-bold text-amber-950 block mb-1">
                              ⚠️ Exam Trap / Crucial Distinction:
                            </strong>
                            <span className="leading-relaxed text-amber-900">
                              <FormattedText text={card.examTrap} />
                            </span>
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

      {/* VIEW B: MODULAR STUDY CARDS (Collapsible Boxes) */}
      {readingView === "cards" && (
        <div className="space-y-8">
          {filteredTopics.map((unit) => (
            <div key={unit.unitId} className="space-y-4">
              {/* Unit Header with Guaranteed No-Wrap Pill */}
              <div className="flex items-center justify-between px-2 gap-3">
                <div className="min-w-0">
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 flex items-center gap-2.5 truncate">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600 shrink-0"></span>
                    <span className="truncate">{unit.unitTitle}</span>
                  </h3>
                  {unit.summary && (
                    <p className="text-xs text-slate-500 mt-1 pl-5 truncate">{unit.summary}</p>
                  )}
                </div>
                <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200/80 shadow-2xs whitespace-nowrap shrink-0">
                  {unit.cards.length} {unit.cards.length === 1 ? "Concept" : "Concepts"}
                </span>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {unit.cards.map((card) => {
                  const isExpanded = expandedCards[card.id] ?? true;

                  return (
                    <div key={card.id} className="double-bezel-outer">
                      <div className="double-bezel-inner overflow-hidden">
                        {/* Card Title Header */}
                        <div
                          onClick={() => toggleCard(card.id)}
                          className="p-5 flex items-start justify-between gap-3 cursor-pointer select-none bg-slate-50/60 hover:bg-slate-100/60 transition-colors border-b border-slate-100"
                        >
                          <div className="space-y-1.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] rounded-md bg-blue-100/90 text-blue-800 border border-blue-200 whitespace-nowrap shrink-0">
                                {card.category}
                              </span>
                              {card.badge && (
                                <span className="px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] rounded-md bg-amber-100/90 text-amber-800 border border-amber-200 whitespace-nowrap shrink-0">
                                  {card.badge}
                                </span>
                              )}
                            </div>
                            <h4 className="text-base font-bold text-slate-900 leading-snug">
                              {card.title}
                            </h4>
                          </div>
                          <button className="text-slate-400 hover:text-slate-700 p-1 rounded-lg shrink-0">
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </button>
                        </div>

                        {/* Card Content Body */}
                        {isExpanded && (
                          <div className="p-5 space-y-4 bg-white">
                            <div className="text-sm text-slate-700 leading-relaxed font-normal">
                              <FormattedText text={card.content} />
                            </div>

                            {/* Block Math Display */}
                            {card.formula && (
                              <div className="relative group p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 shadow-2xs">
                                <div className="flex items-center justify-between mb-1 pb-1.5 border-b border-slate-200/60 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                                  <span className="flex items-center gap-1.5 text-blue-700">
                                    <Zap className="w-3.5 h-3.5 text-amber-500" /> Formula & Derivation:
                                  </span>
                                  <button
                                    onClick={() => copyFormula(card.formula, card.id)}
                                    className="btn-haptic flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600 hover:text-blue-700 bg-white border border-slate-200 shadow-2xs"
                                    title="Copy LaTeX Formula"
                                  >
                                    {copiedId === card.id ? (
                                      <>
                                        <Check className="w-3 h-3 text-emerald-600" />
                                        <span>Copied!</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="w-3 h-3" />
                                        <span>Copy LaTeX</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                                <MathView math={card.formula} block={true} />
                              </div>
                            )}

                            {/* Key Points */}
                            {card.keyPoints && card.keyPoints.length > 0 && (
                              <div className="space-y-2 pt-1">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.15em] block">
                                  Key Takeaways:
                                </span>
                                <ul className="space-y-1.5">
                                  {card.keyPoints.map((pt, i) => (
                                    <li key={i} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                                      <span className="leading-relaxed">
                                        <FormattedText text={pt} />
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Exam Trap Alert */}
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
