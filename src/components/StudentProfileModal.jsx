import React from "react";
import { useUser } from "../context/UserContext";
import { AVATAR_FRAMES, NAME_EFFECTS, getLevelInfo, normalizeAvatar } from "../utils/gamification";
import { StudentAvatar } from "./StudentAvatar";
import { SECTIONS, normalizeSectionKey } from "../data/scheduleData";
import { 
  Trophy, 
  Sparkles, 
  Clock, 
  Award, 
  X, 
  GraduationCap, 
  MapPin, 
  Check, 
  Share2,
  Zap,
  Flame,
  Tag
} from "lucide-react";
import confetti from "canvas-confetti";

export function StudentProfileModal({ student, onClose }) {
  const { profile, leaderboard } = useUser();
  if (!student) return null;

  // Check if inspecting the current user (by ID or exact name)
  const isMe = Boolean(
    (profile?.id && student.id === profile.id) ||
    (profile?.name && student.name && profile.name.trim().toLowerCase() === student.name.trim().toLowerCase())
  );

  // If classmate, check if they exist in live leaderboard roster for latest stats
  const classmateMatch = !isMe && Array.isArray(leaderboard)
    ? leaderboard.find(
        (item) =>
          (student.id && item.id === student.id) ||
          (student.name && item.name && item.name.trim().toLowerCase() === student.name.trim().toLowerCase())
      )
    : null;

  const activeStudent = isMe
    ? {
        ...student,
        id: profile.id,
        name: profile.name,
        section: profile.section,
        avatar: normalizeAvatar(profile.avatar),
        frame: profile.frame,
        nameFx: profile.nameFx,
        tagline: profile.tagline,
        customPhoto: profile.customPhoto,
        xp: profile.xp,
        fastestBlitz: profile.fastestBlitzSeconds,
        highestPercent: profile.highestScorePercent,
      }
    : classmateMatch
    ? {
        ...student,
        id: classmateMatch.id || student.id,
        name: classmateMatch.name || student.name,
        section: classmateMatch.section || student.section,
        avatar: normalizeAvatar(classmateMatch.avatar || student.avatar),
        frame: classmateMatch.frame || student.frame,
        nameFx: classmateMatch.nameFx || student.nameFx,
        tagline: classmateMatch.tagline || student.tagline,
        customPhoto: classmateMatch.customPhoto || student.customPhoto,
        xp: classmateMatch.xp ?? student.xp,
        fastestBlitz: classmateMatch.fastestBlitz ?? student.fastestBlitz,
        highestPercent: classmateMatch.highestPercent ?? student.highestPercent,
      }
    : {
        ...student,
        avatar: normalizeAvatar(student.avatar),
      };

  const levelInfo = getLevelInfo(activeStudent.xp || 0);
  const secKey = normalizeSectionKey(activeStudent.section || "4D");
  const secDetails = SECTIONS[secKey] || SECTIONS["4D"];
  const frameObj = AVATAR_FRAMES.find((f) => f.id === activeStudent.frame) || AVATAR_FRAMES[0];
  const nameFxObj = NAME_EFFECTS.find((fx) => fx.id === activeStudent.nameFx);

  const handleShare = () => {
    const text = `🎓 BSCPE 4th Year Reviewer Profile\n` +
      `👤 Student: ${activeStudent.name} (${activeStudent.section || "BSCPE 4D"})\n` +
      `⭐ Rank: Level ${levelInfo.level} — ${levelInfo.title}\n` +
      `⚡ Total XP: ${(activeStudent.xp || 0).toLocaleString()} XP\n` +
      `🏷️ Vanity: ${activeStudent.tagline || "4th Year Candidate"}\n` +
      `⏱️ Fastest Blitz: ${activeStudent.fastestBlitz ? activeStudent.fastestBlitz + "s" : "N/A"}\n` +
      `Check standings: https://mt-reviewer2026.vercel.app`;
    navigator.clipboard.writeText(text);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/40 dark:bg-slate-950/80 backdrop-blur-sm dark:backdrop-blur-md animate-fadeIn">
      <div 
        className="double-bezel-outer w-full max-w-md max-h-[92vh] overflow-y-auto animate-scaleIn text-slate-900 dark:text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="double-bezel-inner p-5 sm:p-7 relative space-y-4 sm:space-y-5 text-center">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="btn-haptic absolute top-3.5 right-3.5 p-2 text-slate-400 hover:text-slate-800 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-xl transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Banner */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/50 rounded-full font-bold text-xs uppercase tracking-wider">
            <GraduationCap className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Classmate Digital Showcase</span>
          </div>

          {/* Big Avatar with Equipped Animated Game Frame */}
          <div className="flex flex-col items-center justify-center pt-1">
            <div className="relative flex items-center justify-center my-4 sm:my-6 p-4 sm:p-5">
              <StudentAvatar
                avatar={activeStudent.avatar}
                customPhoto={activeStudent.customPhoto}
                frameId={activeStudent.frame}
                size="xl"
              />
            </div>

            {/* Student Name with Animated Name FX */}
            <div className="space-y-1.5 pt-2 sm:pt-3">
              <h3 className={`text-xl sm:text-2xl font-black tracking-tight ${nameFxObj?.cssClass || "text-slate-900 dark:text-white"}`}>
                {activeStudent.name}
              </h3>
              
              <div className="flex items-center justify-center gap-1.5 flex-wrap">
                <span className="text-[10px] font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-700/50">
                  {activeStudent.section || "BSCPE 4D"} • {secDetails.room}
                </span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  Proctor: {secDetails.proctor}
                </span>
              </div>
            </div>

            {/* Vanity Tagline Badge */}
            {activeStudent.tagline && (
              <div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-black bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60 shadow-xs">
                  <Tag className="w-3 h-3 text-amber-500" />
                  <span>{activeStudent.tagline}</span>
                </span>
              </div>
            )}
          </div>

          {/* Level & Rank Showcase Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-blue-950 dark:via-indigo-950 dark:to-slate-950 text-white shadow-md shadow-blue-600/20 space-y-3 text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-300 block">Prestige Rank</span>
                <span className="text-sm sm:text-lg font-black text-amber-300">
                  Level {levelInfo.level} • {levelInfo.title}
                </span>
              </div>
              <div className="sm:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200/80 block">Total Experience</span>
                <span className="text-sm sm:text-lg font-black text-emerald-400 font-mono">
                  {(activeStudent.xp || 0).toLocaleString()} XP
                </span>
              </div>
            </div>

            {/* Equipped Frame & FX Summary */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-blue-200">
              <span className="flex items-center gap-1">
                <span>Border:</span>
                <strong className="text-white font-bold">{frameObj.name}</strong>
              </span>
              <span className="flex items-center gap-1">
                <span>FX:</span>
                <strong className="text-white font-bold">{nameFxObj ? nameFxObj.name : "Standard"}</strong>
              </span>
            </div>
          </div>

          {/* Exam Statistics Grid */}
          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-500" />
                <span>Fastest Blitz</span>
              </span>
              <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white block mt-0.5">
                {activeStudent.fastestBlitz ? `${activeStudent.fastestBlitz}s` : "No Record"}
              </span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Award className="w-3 h-3 text-emerald-500" />
                <span>Top Score %</span>
              </span>
              <span className="text-base sm:text-lg font-black text-slate-900 dark:text-white block mt-0.5">
                {activeStudent.highestPercent ? `${activeStudent.highestPercent}%` : "0%"}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 space-y-2">
            <button
              onClick={handleShare}
              className="btn-haptic w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Share Student Card</span>
            </button>
            <button
              onClick={onClose}
              className="btn-haptic w-full py-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default StudentProfileModal;
