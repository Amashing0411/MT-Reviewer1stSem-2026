import React from "react";
import { AVATAR_FRAMES, NAME_EFFECTS } from "../utils/gamification";
import { Sparkles, Trophy, Award, Check, Zap, Flame, X } from "lucide-react";
import confetti from "canvas-confetti";

export function LevelUpModal({ rewardData, profile, onEquipAll, onClose }) {
  if (!rewardData) return null;

  const {
    level,
    title,
    icon,
    rewardTitle,
    rewardDesc,
    unlockedFrame,
    unlockedTagline,
    unlockedNameFx,
  } = rewardData;

  const frameObj = AVATAR_FRAMES.find((f) => f.id === unlockedFrame);
  const nameFxObj = NAME_EFFECTS.find((fx) => fx.id === unlockedNameFx);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="double-bezel-outer w-full max-w-md max-h-[92vh] overflow-y-auto animate-scaleIn text-slate-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="double-bezel-inner p-5 sm:p-7 relative space-y-4 sm:space-y-5 text-center">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="btn-haptic absolute top-3.5 right-3.5 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-xl transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Level Up Banner */}
          <div className="space-y-1.5 pt-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 text-amber-500 dark:text-amber-300 border border-amber-400/30 rounded-full font-black text-[11px] uppercase tracking-widest animate-pulse">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
              <span>PRESTIGE RANK UNLOCKED</span>
            </div>

            <div className="py-2">
              <div className="text-4xl sm:text-5xl animate-bounce mb-1">
                {icon || "🏆"}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                LEVEL UP! <span className="text-amber-500 dark:text-amber-400">LVL {level}</span>
              </h2>
              <p className="text-sm sm:text-base font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
                {title}
              </p>
            </div>
          </div>

          {/* Unlocked Rewards Showcase */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-left">
            <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Unlocked Rewards</span>
              <span className="text-emerald-500 font-bold">Claimable</span>
            </div>

            {/* Unlocked Avatar Frame */}
            {frameObj && (
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-2xs">
                <div className={`relative w-11 h-11 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center text-lg shrink-0 overflow-hidden ${frameObj.cssClass}`}>
                  {profile.customPhoto ? (
                    <img src={profile.customPhoto} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span>{profile.avatar || "🤖"}</span>
                  )}
                  {frameObj.assetUrl && (
                    <img 
                      src={frameObj.assetUrl} 
                      alt="" 
                      className="absolute -inset-1 w-[calc(100%+8px)] h-[calc(100%+8px)] max-w-none pointer-events-none object-contain z-10" 
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {frameObj.name}
                    </span>
                    <span className="text-[9px] font-extrabold text-amber-500 bg-amber-500/10 px-1.5 py-0.2 rounded border border-amber-500/20">
                      {frameObj.tier} Frame
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                    {frameObj.desc}
                  </p>
                </div>
              </div>
            )}

            {/* Unlocked Vanity Tagline */}
            {unlockedTagline && (
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-lg shrink-0">
                  <Award className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Vanity Tagline</span>
                  <span className="text-xs font-black text-slate-900 dark:text-white truncate block">
                    {unlockedTagline}
                  </span>
                </div>
              </div>
            )}

            {/* Unlocked Animated Name FX */}
            {nameFxObj && (
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-2xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center text-lg shrink-0">
                  <Flame className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Name Animation Effect</span>
                  <div className={`text-xs font-black truncate ${nameFxObj.cssClass}`}>
                    {profile.name} (Preview FX)
                  </div>
                </div>
              </div>
            )}

            {/* General Reward Description if no specific items */}
            {!frameObj && !nameFxObj && (
              <div className="p-2.5 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <strong className="text-slate-900 dark:text-white block font-bold mb-0.5">{rewardTitle}</strong>
                <span>{rewardDesc}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            <button
              onClick={() => {
                onEquipAll({
                  frame: frameObj ? frameObj.id : undefined,
                  tagline: unlockedTagline || undefined,
                  nameFx: nameFxObj ? nameFxObj.id : undefined,
                });
                try { sound?.playCorrect?.(); } catch (e) {}
                confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
                if (onClose) onClose();
              }}
              className="btn-haptic w-full py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Equip Unlocked Rewards & Continue</span>
            </button>

            <button
              onClick={onClose}
              className="btn-haptic w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Keep Current Setup
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
