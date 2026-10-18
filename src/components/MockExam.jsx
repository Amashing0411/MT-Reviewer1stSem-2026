import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Flag, 
  RotateCcw, 
  Award, 
  HelpCircle,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Flame,
  Zap,
  Trophy,
  Shuffle
} from "lucide-react";
import confetti from "canvas-confetti";
import { FormattedText } from "./MathView";
import { sound } from "../utils/sound";
import { useUser } from "../context/UserContext";

export function MockExam({ subject }) {
  const { recordExamResult, setIsLeaderboardOpen, addXp } = useUser();
  const rawQuestions = subject.mockQuestions || [];

  const [gameMode, setGameMode] = useState("blitz"); // "blitz" (10 questions rapid fire) | "full" (all questions exam simulation)
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [flagged, setFlagged] = useState(new Set());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Gamification State
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [xp, setXp] = useState(0);
  const [streakBanner, setStreakBanner] = useState(null);

  // Initialize questions according to mode
  useEffect(() => {
    resetGame(gameMode);
  }, [subject.id, gameMode]);

  const resetGame = (mode) => {
    const pool = [...rawQuestions];
    let selected = pool;
    if (mode === "blitz") {
      selected = pool.sort(() => Math.random() - 0.5).slice(0, 10);
    }
    setQuestions(selected);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setFlagged(new Set());
    setIsSubmitted(false);
    setStreak(0);
    setMaxStreak(0);
    setXp(0);
    setStreakBanner(null);
    setTimeLeft(mode === "full" ? 60 * 60 : 10 * 60);
    setIsTimerRunning(mode === "full");
  };

  // Timer Effect
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timeLeft > 0 && !isSubmitted) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeLeft, isSubmitted]);

  if (rawQuestions.length === 0) {
    return (
      <div className="double-bezel-outer max-w-xl mx-auto">
        <div className="double-bezel-inner p-12 text-center">
          <p className="text-slate-600 text-sm font-medium">No quiz questions available for {subject.code}.</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex] || questions[0];
  const currentAnswer = selectedAnswers[currentQ?.id];
  const isFlagged = flagged.has(currentQ?.id);

  // Answer handler with immediate Gamification in Blitz / Neutral selection in Full Mode
  const handleSelectOption = (optionIndex) => {
    if (isSubmitted) return;

    // IN FULL EXAM SIMULATION MODE:
    if (gameMode === "full") {
      // Merely select/unselect choice without spoilers or streak spam
      sound.playFlip(); // Subtle neutral tactile click
      setSelectedAnswers((prev) => ({
        ...prev,
        [currentQ.id]: optionIndex,
      }));
      return;
    }

    // IN BLITZ MODE:
    // If already answered, ignore (lock choice, prevent spamming!)
    if (currentAnswer !== undefined) return;

    const isCorrect = optionIndex === currentQ.correctAnswer;

    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));

    if (isCorrect) {
      sound.playCorrect();
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);

      const addedXp = 100 + (newStreak > 1 ? newStreak * 25 : 0);
      setXp((prev) => prev + addedXp);

      // Streak celebration milestones
      if (newStreak === 3) {
        sound.playStreak();
        setStreakBanner("🔥 3 IN A ROW! COMBO ACTIVE!");
        setTimeout(() => setStreakBanner(null), 2500);
      } else if (newStreak === 5) {
        sound.playStreak();
        setStreakBanner("⚡ 5 STREAK! YOU'RE ON FIRE!");
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
        setTimeout(() => setStreakBanner(null), 2500);
      } else if (newStreak >= 8 && newStreak % 4 === 0) {
        sound.playStreak();
        setStreakBanner(`👑 ${newStreak} STREAK! TOPNOTCHER STATUS!`);
        confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
        setTimeout(() => setStreakBanner(null), 3000);
      }
    } else {
      sound.playWrong();
      setStreak(0);
    }
  };

  const toggleFlag = (id) => {
    setFlagged((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setIsTimerRunning(false);

    let finalScore = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) finalScore++;
    });

    const percent = questions.length > 0 ? Math.round((finalScore / questions.length) * 100) : 0;
    const timeTaken = gameMode === "full" ? (60 * 60 - timeLeft) : (10 * 60 - timeLeft);

    recordExamResult({
      subjectId: subject.id,
      score: finalScore,
      total: questions.length,
      timeSeconds: timeTaken,
      mode: gameMode,
    });

    if (percent >= 70) {
      sound.playStreak();
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 },
      });
    } else {
      sound.playWrong();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  let score = 0;
  questions.forEach((q) => {
    if (selectedAnswers[q.id] === q.correctAnswer) score++;
  });
  const percentScore = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  // Rank determination
  const getRank = (points) => {
    if (points >= 1200) return { title: "Room 106 Topnotcher 🏆", color: "text-amber-600 bg-amber-50 border-amber-200" };
    if (points >= 800) return { title: "Lead Systems Architect ⚡", color: "text-indigo-600 bg-indigo-50 border-indigo-200" };
    if (points >= 400) return { title: "Junior Specialist 🌟", color: "text-blue-600 bg-blue-50 border-blue-200" };
    return { title: "Novice Engineer 🛠️", color: "text-slate-600 bg-slate-100 border-slate-200" };
  };

  const rank = getRank(xp);

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Gamified Header: Streak, XP & Game Mode Switcher */}
      <div className="double-bezel-outer">
        <div className="double-bezel-inner p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Mode Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setGameMode("blitz");
              }}
              className={`btn-haptic flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                gameMode === "blitz"
                  ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>10-Q Rapid Blitz</span>
            </button>
            <button
              onClick={() => {
                setGameMode("full");
              }}
              className={`btn-haptic flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                gameMode === "full"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              <span>Full Midterm Sim (60m)</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="flex items-center gap-2.5 sm:gap-3 self-end md:self-auto flex-wrap">
            {gameMode === "blitz" ? (
              <>
                {/* Streak Counter */}
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                  streak > 0 
                    ? "bg-amber-50 text-amber-700 border-amber-300 shadow-2xs animate-pulseGlow" 
                    : "bg-slate-100 text-slate-400 border-slate-200"
                }`}>
                  <Flame className={`w-4 h-4 ${streak > 0 ? "text-amber-500 fill-amber-400" : "text-slate-400"}`} />
                  <span>{streak} Streak</span>
                </div>

                {/* XP Counter */}
                <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded-xl text-xs font-bold font-mono">
                  <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                  <span>+{xp} XP</span>
                </div>
              </>
            ) : (
              <>
                {/* Questions Answered */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-xl text-xs font-bold text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>{answeredCount}/{questions.length} Answered</span>
                </div>

                {/* Timer in Full Mode */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-xl text-xs font-mono font-bold text-amber-900">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>{formatTime(timeLeft)}</span>
                </div>

                {/* Quick Submit Button in Header if not yet submitted */}
                {!isSubmitted && (
                  <button
                    onClick={handleSubmit}
                    className="btn-haptic px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
                  >
                    Submit Exam
                  </button>
                )}
              </>
            )}

            {/* Reset / Reshuffle */}
            <button
              onClick={() => resetGame(gameMode)}
              className="btn-haptic p-1.5 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              title="Reshuffle & Restart"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Streak Alert Toast — Clean vibrant pill without white inner background */}
      {streakBanner && (
        <div className="py-2.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white font-black text-sm tracking-wide text-center shadow-lg shadow-amber-500/30 animate-popIn">
          {streakBanner}
        </div>
      )}

      {/* Main Question & Solution Card */}
      <div className="double-bezel-outer">
        <div className="double-bezel-inner p-6 sm:p-8 space-y-6">
          {/* Question Header & Flagging */}
          <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] bg-blue-100 text-blue-800 border border-blue-200 rounded-md">
                  {currentQ?.category || "Core Concept"}
                </span>
                <span className="text-xs font-bold text-slate-400">
                  Question {currentIndex + 1} of {questions.length}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                <FormattedText text={currentQ?.question || ""} />
              </h3>
            </div>

            <button
              onClick={() => toggleFlag(currentQ?.id)}
              className={`btn-haptic p-2.5 rounded-xl border transition-all ${
                isFlagged
                  ? "bg-amber-100 border-amber-300 text-amber-700"
                  : "bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600"
              }`}
              title="Flag for later review"
            >
              <Flag className={`w-4 h-4 ${isFlagged ? "fill-amber-500" : ""}`} />
            </button>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-3">
            {currentQ?.options?.map((opt, idx) => {
              const isSelected = currentAnswer === idx;
              const isCorrectAnswer = idx === currentQ.correctAnswer;
              const showResult = isSubmitted || (gameMode === "blitz" && currentAnswer !== undefined);

              let optionStyle = "bg-slate-50/80 hover:bg-slate-100/80 border-slate-200/90 text-slate-800";
              let badgeStyle = "bg-white border-slate-300 text-slate-700";

              if (showResult) {
                if (isCorrectAnswer) {
                  optionStyle = "bg-emerald-50/90 border-emerald-300 text-emerald-950 font-semibold ring-2 ring-emerald-500/40";
                  badgeStyle = "bg-emerald-600 text-white border-emerald-600";
                } else if (isSelected && !isCorrectAnswer) {
                  optionStyle = "bg-rose-50/90 border-rose-300 text-rose-950 ring-2 ring-rose-500/40";
                  badgeStyle = "bg-rose-600 text-white border-rose-600";
                } else {
                  optionStyle = "bg-slate-50/40 border-slate-200 text-slate-400 opacity-60";
                }
              } else if (isSelected) {
                optionStyle = "bg-blue-50 border-blue-500 text-blue-950 ring-2 ring-blue-500/30 font-semibold";
                badgeStyle = "bg-blue-600 text-white border-blue-600";
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`btn-haptic w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 select-none ${optionStyle}`}
                >
                  <span className={`w-6 h-6 rounded-lg border text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${badgeStyle}`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm sm:text-base leading-relaxed flex-1">
                    <FormattedText text={opt} />
                  </span>

                  {showResult && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {showResult && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Study Rationale (Revealed immediately in Blitz or on Submit) */}
          {(isSubmitted || (gameMode === "blitz" && currentAnswer !== undefined)) && (
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                  Step-by-Step Rationale & Reference:
                </span>
              </div>
              <p className="text-sm text-slate-800 leading-relaxed">
                <FormattedText text={currentQ?.explanation || ""} />
              </p>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="btn-haptic flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous</span>
            </button>

            <div className="flex items-center gap-2">
              {!isSubmitted && (
                <button
                  onClick={handleSubmit}
                  className="btn-haptic px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                >
                  Finish & Score
                </button>
              )}
            </div>

            <button
              onClick={() => setCurrentIndex((prev) => Math.min(questions.length - 1, prev + 1))}
              disabled={currentIndex === questions.length - 1}
              className="btn-haptic flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Next</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Question Jump Palette */}
      <div className="double-bezel-outer">
        <div className="double-bezel-inner p-5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Question Palette ({answeredCount} / {questions.length} Answered)
            </span>
            <div className="flex items-center gap-3 text-[11px] font-medium text-slate-500">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span> Current
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span> Answered
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span> Flagged
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {questions.map((q, idx) => {
              const isCurrent = idx === currentIndex;
              const isAnswered = selectedAnswers[q.id] !== undefined;
              const hasFlag = flagged.has(q.id);

              let pillStyle = "bg-slate-100 text-slate-600 hover:bg-slate-200";
              if (isCurrent) pillStyle = "bg-blue-600 text-white font-bold ring-2 ring-blue-500/40";
              else if (hasFlag) pillStyle = "bg-amber-100 text-amber-900 border border-amber-300 font-bold";
              else if (isAnswered) pillStyle = "bg-emerald-100 text-emerald-800 font-bold border border-emerald-200";

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`btn-haptic w-8 h-8 rounded-xl text-xs font-mono transition-all flex items-center justify-center ${pillStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Performance Score Summary (When Submitted) */}
      {isSubmitted && (
        <div className="double-bezel-outer animate-popIn">
          <div className="double-bezel-inner p-8 text-center space-y-5 bg-gradient-to-b from-white to-slate-50">
            <Award className="w-12 h-12 mx-auto text-amber-500" />
            <div className="space-y-1">
              <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full border ${rank.color}`}>
                {rank.title}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Score: {score} / {questions.length} ({percentScore}%)
              </h3>
              <p className="text-xs text-slate-500">
                Total Experience Earned: <strong className="text-blue-600">+{xp} XP</strong> • Max Streak: <strong className="text-amber-600">{maxStreak}</strong>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => resetGame(gameMode)}
                className="btn-haptic flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-600/20"
              >
                <Shuffle className="w-4 h-4" />
                <span>Play New Round</span>
              </button>

              <button
                onClick={() => setIsLeaderboardOpen(true)}
                className="btn-haptic flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-md shadow-amber-500/20"
              >
                <Trophy className="w-4 h-4" />
                <span>View Room 106 Standings</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
