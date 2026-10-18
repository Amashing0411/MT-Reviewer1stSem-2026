import React, { useState, useEffect } from "react";
import { StudentAvatar } from "../StudentAvatar";
import { sound } from "../../utils/sound";
import confetti from "canvas-confetti";
import { Sparkles, Swords, Zap } from "lucide-react";

export function CoinTossModal({ host, guest, winnerId, onComplete }) {
  const [phase, setPhase] = useState("intro"); // "intro" | "flipping" | "landed" | "countdown"
  const [countdown, setCountdown] = useState(3);
  const isHostWinner = winnerId === host.id;
  const winner = isHostWinner ? host : guest;

  useEffect(() => {
    // 1. Intro pause (800ms)
    const t1 = setTimeout(() => {
      setPhase("flipping");
      sound.playCoinToss();
    }, 900);

    // 2. Coin lands (after 3.2s of spinning)
    const t2 = setTimeout(() => {
      setPhase("landed");
      sound.playCoinLand();
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    }, 4000);

    // 3. Countdown to start match
    const t3 = setTimeout(() => {
      setPhase("countdown");
    }, 5400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [winnerId, host.id]);

  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown > 1) {
      const timer = setTimeout(() => {
        setCountdown((c) => c - 1);
        sound.playClockTick();
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        sound.playStreak();
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, countdown, onComplete]);

  // Target rotation: even number of turns for host (heads), odd for guest (tails)
  // E.g. host: 1800deg (5 full rotations = face 1), guest: 1980deg (5.5 rotations = face 2)
  const finalRotation = isHostWinner ? 1800 : 1980;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      {/* Background Spotlight FX */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-blue-600/30 via-indigo-600/20 to-transparent rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/80 rounded-3xl p-5 sm:p-8 text-center shadow-2xl shadow-blue-500/10 text-white max-h-[92vh] overflow-y-auto">
        
        {/* Header Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs font-black tracking-wider uppercase mb-3 sm:mb-5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Coin Toss Protocol</span>
          <Zap className="w-3.5 h-3.5 text-amber-400" />
        </div>

        <h3 className="text-lg sm:text-2xl font-black tracking-tight text-white mb-1.5 sm:mb-2">
          {phase === "intro" && "Preparing The Coin..."}
          {phase === "flipping" && "Tossing in the Air! 🪙"}
          {phase === "landed" && `${winner?.name} Lands First!`}
          {phase === "countdown" && "Match Commencing In..."}
        </h3>

        <p className="text-xs sm:text-sm text-slate-400 mb-4 sm:mb-8 max-w-xs mx-auto">
          {phase !== "landed" && phase !== "countdown"
            ? "Each face carries a player avatar. The side that lands faces the 60-second hot seat first!"
            : `${winner?.name} won the coin flip and takes Question 1!`}
        </p>

        {/* 3D Coin Flip Arena */}
        <div className="flex items-center justify-center h-44 sm:h-52 my-1 sm:my-2 [perspective:1000px]">
          <div
            className="relative w-32 h-32 sm:w-40 sm:h-40 transition-transform [transform-style:preserve-3d]"
            style={{
              WebkitTransformStyle: "preserve-3d",
              transitionDuration: phase === "flipping" ? "3.2s" : "0.4s",
              transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
              transform:
                phase === "intro"
                  ? "rotateY(0deg) scale(0.9)"
                  : phase === "flipping"
                  ? `rotateY(${finalRotation}deg) scale(1.15) translateY(-20px)`
                  : `rotateY(${finalRotation}deg) scale(1.05)`,
            }}
          >
            {/* Front Side: Host Avatar */}
            <div 
              className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 p-2 shadow-2xl shadow-amber-500/40 border-4 border-amber-300 flex flex-col items-center justify-center [backface-visibility:hidden]"
              style={{ WebkitBackfaceVisibility: "hidden" }}
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white shadow-inner mb-0.5 sm:mb-1 bg-slate-900">
                <StudentAvatar
                  avatar={host.avatar}
                  customPhoto={host.customPhoto}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[11px] font-black tracking-tight text-slate-950 uppercase truncate max-w-[110px] bg-amber-200/90 px-2 py-0.5 rounded-full">
                {host.name}
              </span>
              <span className="text-[8px] font-bold text-amber-950 tracking-wider uppercase mt-0.5">
                HEADS • HOST
              </span>
            </div>

            {/* Back Side: Guest Avatar */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-800 p-2 shadow-2xl shadow-purple-500/40 border-4 border-indigo-300 flex flex-col items-center justify-center [backface-visibility:hidden]"
              style={{ transform: "rotateY(180deg)", WebkitBackfaceVisibility: "hidden" }}
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white shadow-inner mb-0.5 sm:mb-1 bg-slate-900">
                <StudentAvatar
                  avatar={guest.avatar}
                  customPhoto={guest.customPhoto}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[11px] font-black tracking-tight text-white uppercase truncate max-w-[110px] bg-purple-900/90 px-2 py-0.5 rounded-full border border-purple-400/40">
                {guest.name}
              </span>
              <span className="text-[8px] font-bold text-indigo-200 tracking-wider uppercase mt-0.5">
                TAILS • GUEST
              </span>
            </div>
          </div>
        </div>

        {/* Status / Countdown */}
        <div className="mt-6 min-h-[44px] flex items-center justify-center">
          {phase === "countdown" ? (
            <div className="inline-flex items-center gap-3">
              <span className="text-3xl sm:text-4xl font-black text-amber-400 animate-ping">
                {countdown}
              </span>
              <span className="text-sm font-bold text-slate-300">
                Starting 60s Blitz Clock...
              </span>
            </div>
          ) : phase === "landed" ? (
            <div className="inline-flex items-center gap-2 text-emerald-400 font-extrabold text-sm sm:text-base animate-bounce">
              <Sparkles className="w-4 h-4" />
              <span>{winner?.name} has first turn!</span>
            </div>
          ) : (
            <div className="text-xs text-slate-500 font-mono flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Spinning physics active...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
