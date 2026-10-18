import React, { useState, useEffect } from "react";
import { 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle, 
  Shuffle, 
  HelpCircle,
  Sparkles
} from "lucide-react";
import confetti from "canvas-confetti";
import { FormattedText } from "./MathView";
import { sound } from "../utils/sound";
import { useUser } from "../context/UserContext";

export function Flashcards({ subject }) {
  const { addXp } = useUser();
  const rawCards = subject.flashcards || [];
  const [cards, setCards] = useState(rawCards);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState(new Set());

  useEffect(() => {
    setCards(subject.flashcards || []);
    setCurrentIndex(0);
    setIsFlipped(false);
    setMasteredIds(new Set());
  }, [subject.id]);

  if (cards.length === 0) {
    return (
      <div className="double-bezel-outer max-w-xl mx-auto">
        <div className="double-bezel-inner p-12 text-center">
          <p className="text-slate-600 text-sm font-medium">No flashcards loaded for {subject.code} yet.</p>
        </div>
      </div>
    );
  }

  const currentCard = cards[currentIndex] || cards[0];
  const isMastered = masteredIds.has(currentCard.id);
  const progressPercent = Math.round((masteredIds.size / cards.length) * 100);

  const handleFlip = () => {
    sound.playFlip();
    setIsFlipped((prev) => !prev);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % cards.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    }, 150);
  };

  const toggleMastered = (id) => {
    setMasteredIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        sound.playCorrect();
        addXp(25, `${subject.code} Flashcard Mastered`, subject.id);
        if (next.size === cards.length) {
          sound.playStreak();
          addXp(200, `100% Deck Mastery: ${subject.code}! 🎓`, subject.id);
          confetti({
            particleCount: 100,
            spread: 80,
            origin: { y: 0.6 },
          });
        }
      }
      return next;
    });
  };

  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.code === "Space" || e.key === " ") {
        e.preventDefault();
        handleFlip();
      } else if (e.code === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        handleNext();
      } else if (e.code === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "m" || e.key === "M") {
        e.preventDefault();
        if (currentCard) toggleMastered(currentCard.id);
      } else if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        handleShuffle();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [cards, currentIndex, isFlipped, currentCard]);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Controller Bar in Double Bezel */}
      <div className="double-bezel-outer">
        <div className="double-bezel-inner p-4 sm:p-5 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-blue-700 uppercase tracking-[0.18em] block">
              {subject.code} Rapid Drill
            </span>
            <span className="text-sm font-bold text-slate-800">
              Card {currentIndex + 1} of {cards.length}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Mastery Score</span>
              <span className="text-xs font-bold text-emerald-600">
                {masteredIds.size} / {cards.length} ({progressPercent}%)
              </span>
            </div>

            <button
              onClick={handleShuffle}
              className="btn-haptic group flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl"
              title="Shuffle Flashcards"
            >
              <Shuffle className="w-3.5 h-3.5 text-slate-500 group-hover:rotate-12 transition-transform" />
              <span>Shuffle</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200/80 rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-600 to-indigo-600 h-1.5 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
        />
      </div>

      {/* 3D Flip Card Area */}
      <div
        onClick={handleFlip}
        className="perspective-1000 min-h-[380px] sm:min-h-[420px] cursor-pointer select-none"
      >
        <div
          className={`w-full min-h-[380px] sm:min-h-[420px] relative transition-transform duration-500 transform-style-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {/* FRONT OF CARD (Question) */}
          <div className="double-bezel-outer absolute inset-0 backface-hidden">
            <div className="double-bezel-inner h-full p-5 sm:p-10 flex flex-col justify-between border border-blue-100/50">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] bg-blue-50 text-blue-700 border border-blue-200/70 rounded-full">
                  {currentCard.category || "Concept"}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <RotateCw className="w-3.5 h-3.5 text-blue-500" /> Click to flip
                </span>
              </div>

              <div className="py-6 my-auto text-center">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Question
                </div>
                <div className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed max-w-xl mx-auto">
                  <FormattedText text={currentCard.question} />
                </div>
              </div>

              <div className="text-center text-xs text-slate-400 font-medium">
                Tap anywhere to reveal solution & rationale
              </div>
            </div>
          </div>

          {/* BACK OF CARD (Answer) */}
          <div className="double-bezel-outer absolute inset-0 backface-hidden rotate-y-180">
            <div className="double-bezel-inner h-full p-5 sm:p-10 flex flex-col justify-between bg-emerald-50/20 border border-emerald-200/60">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full">
                  Answer & Rationale
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                  <RotateCw className="w-3.5 h-3.5 text-emerald-600" /> Click to flip back
                </span>
              </div>

              <div className="py-6 my-auto text-center">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3">
                  Core Solution
                </div>
                <div className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed max-w-xl mx-auto">
                  <FormattedText text={currentCard.answer} />
                </div>
              </div>

              <div className="text-center text-xs text-slate-400 font-medium">
                Review complete • Use buttons below to navigate
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Controls */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          onClick={handlePrev}
          className="btn-haptic group flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 text-xs font-bold rounded-2xl shadow-2xs"
        >
          <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center group-hover:-translate-x-0.5 transition-transform">
            <ChevronLeft className="w-3.5 h-3.5" />
          </div>
          <span>Previous</span>
        </button>

        <button
          onClick={() => toggleMastered(currentCard.id)}
          className={`btn-haptic flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-bold transition-all shadow-xs ${
            isMastered
              ? "bg-emerald-600 text-white shadow-emerald-600/20"
              : "bg-white hover:bg-emerald-50 text-emerald-700 border border-emerald-200"
          }`}
        >
          <CheckCircle className={`w-4 h-4 ${isMastered ? "text-white" : "text-emerald-600"}`} />
          <span>{isMastered ? "Mastered!" : "Mark as Mastered"}</span>
        </button>

        <button
          onClick={handleNext}
          className="btn-haptic group flex items-center gap-2 px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-700 text-xs font-bold rounded-2xl shadow-2xs"
        >
          <span>Next</span>
          <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>

      {/* Keyboard Shortcuts Hint Bar */}
      <div className="hidden sm:flex items-center justify-center gap-4 text-[11px] text-slate-400 font-medium pt-1">
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono font-bold text-slate-600">Space</kbd>
          Flip
        </span>
        <span className="text-slate-300">•</span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono font-bold text-slate-600">←</kbd>
          <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono font-bold text-slate-600">→</kbd>
          Navigate
        </span>
        <span className="text-slate-300">•</span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono font-bold text-slate-600">M</kbd>
          Master
        </span>
        <span className="text-slate-300">•</span>
        <span className="flex items-center gap-1.5">
          <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-300 rounded text-[10px] font-mono font-bold text-slate-600">S</kbd>
          Shuffle
        </span>
      </div>
    </div>
  );
}
