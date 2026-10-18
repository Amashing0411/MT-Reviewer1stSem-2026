import React, { useState, useRef, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { AVATAR_FRAMES, NAME_EFFECTS, getAvatarFrame, getLevelInfo, LEVELS, normalizeAvatar, DEFAULT_AVATAR } from "../utils/gamification";
import { StudentAvatar } from "./StudentAvatar";
import { 
  MessageSquare, 
  Send, 
  X, 
  Sparkles, 
  Flame, 
  Clock, 
  ChevronDown, 
  Smile, 
  RefreshCw,
  Users,
  ShieldCheck
} from "lucide-react";
import { sound } from "../utils/sound";

const QUICK_REACTIONS = [
  "🔥 Laban 4th year!",
  "☕ Kape muna bago DSP",
  "💀 Design 2 pa more haha",
  "⚡ Road to PRC Top 1!",
  "⚖️ Kabado sa RA 9292",
  "📚 Review mode: ON"
];

const REACTION_EMOJIS = ["👍", "❤️", "🔥", "😂", "😮", "💀", "🎉"];

export function ClassShoutbox() {
  const { 
    profile, 
    feedMessages = [], 
    sendFeedMessage, 
    fetchFeedOnly,
    reactToMessage,
    isFeedOpen, 
    setIsFeedOpen, 
    setInspectedStudent,
    isCloudConnected,
    syncWithCloud,
    leaderboard
  } = useUser();

  const [inputVal, setInputVal] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isManualRefreshing, setIsManualRefreshing] = useState(false);
  const [activeReactionMsgId, setActiveReactionMsgId] = useState(null);
  const [viewingReactionsMsg, setViewingReactionsMsg] = useState(null);
  const [reactionFilterTab, setReactionFilterTab] = useState("all");
  const messagesEndRef = useRef(null);
  const lastMsgCountRef = useRef(feedMessages.length);

  // Helper to resolve student reactor info
  const getReactorInfo = (studentId, emoji, targetMsg) => {
    const detail = targetMsg?.userReactionDetails?.[studentId];
    if (detail && detail.name) {
      const live = Array.isArray(leaderboard)
        ? leaderboard.find((l) => l.id === studentId || (l.name && l.name.trim().toLowerCase() === String(detail.name).trim().toLowerCase()))
        : null;
      return {
        studentId,
        name: detail.name,
        avatar: live?.avatar || detail.avatar || "/avatars/bean-female-debugging.jpg",
        customPhoto: live?.customPhoto || detail.customPhoto || null,
        section: live?.section || detail.section || "BSCPE 4D",
        frame: live?.frame || detail.frame || "default",
        nameFx: live?.nameFx || detail.nameFx || "none",
        tagline: live?.tagline || detail.tagline || "",
        xp: live?.xp ?? 0,
        emoji: detail.emoji || emoji,
        isMe: Boolean(profile?.id && studentId === profile.id),
      };
    }
    if (profile?.id && studentId === profile.id) {
      return {
        studentId: profile.id,
        name: profile.name || "You",
        avatar: profile.avatar || "/avatars/bean-female-debugging.jpg",
        customPhoto: profile.customPhoto || null,
        section: profile.section || "BSCPE 4D",
        frame: profile.frame || "default",
        nameFx: profile.nameFx || "none",
        tagline: profile.tagline || "",
        xp: profile.xp || 0,
        emoji,
        isMe: true,
      };
    }
    const inLeaderboard = Array.isArray(leaderboard)
      ? leaderboard.find((l) => l.id === studentId || (l.name && l.name.trim().toLowerCase() === String(studentId).trim().toLowerCase()))
      : null;
    if (inLeaderboard) {
      return {
        studentId,
        name: inLeaderboard.name,
        avatar: inLeaderboard.avatar,
        customPhoto: inLeaderboard.customPhoto,
        section: inLeaderboard.section,
        frame: inLeaderboard.frame,
        nameFx: inLeaderboard.nameFx,
        tagline: inLeaderboard.tagline,
        xp: inLeaderboard.xp,
        emoji,
        isMe: false,
      };
    }
    const inFeed = Array.isArray(feedMessages)
      ? feedMessages.find((m) => m.studentId === studentId)
      : null;
    if (inFeed) {
      return {
        studentId,
        name: inFeed.studentName,
        avatar: inFeed.avatar,
        customPhoto: inFeed.customPhoto,
        section: inFeed.studentSection,
        frame: inFeed.frame,
        nameFx: inFeed.nameFx,
        tagline: inFeed.tagline,
        xp: inFeed.xp,
        emoji,
        isMe: false,
      };
    }
    return {
      studentId,
      name: "Classmate",
      avatar: "/avatars/bean-female-debugging.jpg",
      customPhoto: null,
      section: "BSCPE",
      emoji,
      isMe: false,
    };
  };

  // Dynamic Realtime Polling:
  // When chat window is open -> Poll every 3 seconds for instant realtime chat!
  // When chat window is closed -> Poll every 12 seconds to keep unread count live!
  useEffect(() => {
    if (isFeedOpen && fetchFeedOnly) {
      fetchFeedOnly();
    }

    const pollInterval = isFeedOpen ? 3000 : 12000;
    const interval = setInterval(() => {
      fetchFeedOnly?.();
    }, pollInterval);

    return () => clearInterval(interval);
  }, [isFeedOpen, fetchFeedOnly]);

  // Close reaction toolbar when clicking elsewhere
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (activeReactionMsgId && !e.target.closest(".reaction-container")) {
        setActiveReactionMsgId(null);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [activeReactionMsgId]);

  // Auto-scroll to latest message when open
  useEffect(() => {
    if (isFeedOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [feedMessages, isFeedOpen]);

  // Unread badge tracking when closed
  useEffect(() => {
    if (!isFeedOpen) {
      if (feedMessages.length > lastMsgCountRef.current) {
        setUnreadCount((c) => c + (feedMessages.length - lastMsgCountRef.current));
      }
    } else {
      setUnreadCount(0);
    }
    lastMsgCountRef.current = feedMessages.length;
  }, [feedMessages.length, isFeedOpen]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!inputVal.trim() || isSending) return;
    const text = inputVal.trim();
    setInputVal("");
    setIsSending(true);
    sound.playStreak();
    await sendFeedMessage(text);
    setIsSending(false);
  };

  const handleQuickReaction = (text) => {
    setInputVal(text);
  };

  const formatTime = (ts) => {
    if (!ts) return "";
    const diffSec = Math.floor((Date.now() - ts) / 1000);
    if (diffSec < 60) return "just now";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    return new Date(ts).toLocaleDateString([], { month: "short", day: "numeric" });
  };

  const handleInspectMessage = (msg) => {
    const isMe = Boolean(
      (msg.studentId && profile?.id && msg.studentId === profile.id) ||
      (msg.studentName && profile?.name && msg.studentName.trim().toLowerCase() === profile.name.trim().toLowerCase())
    );

    if (isMe) {
      setInspectedStudent({
        id: profile.id,
        name: profile.name,
        section: profile.section,
        avatar: profile.avatar,
        frame: profile.frame,
        nameFx: profile.nameFx,
        tagline: profile.tagline,
        customPhoto: profile.customPhoto,
        xp: profile.xp,
        fastestBlitz: profile.fastestBlitzSeconds,
        highestPercent: profile.highestScorePercent,
      });
      return;
    }

    const live = Array.isArray(leaderboard)
      ? leaderboard.find(
          (l) =>
            (msg.studentId && l.id === msg.studentId) ||
            (msg.studentName && l.name && l.name.trim().toLowerCase() === msg.studentName.trim().toLowerCase())
        )
      : null;

    if (live) {
      setInspectedStudent({
        id: live.id || msg.studentId,
        name: live.name || msg.studentName,
        section: live.section || msg.studentSection,
        avatar: normalizeAvatar(live.avatar || msg.avatar),
        frame: live.frame || msg.frame,
        nameFx: live.nameFx || msg.nameFx,
        tagline: live.tagline || msg.tagline,
        customPhoto: live.customPhoto || msg.customPhoto,
        xp: typeof live.xp === "number" ? live.xp : (typeof msg.xp === "number" ? msg.xp : 0),
        fastestBlitz: live.fastestBlitz ?? msg.fastestBlitz,
        highestPercent: live.highestPercent ?? msg.highestPercent,
      });
      return;
    }

    // Fallback XP: use msg.xp if present; if missing, look up minXp for msg.level, else 0
    const fallbackXp = typeof msg.xp === "number" 
      ? msg.xp 
      : (msg.level ? (LEVELS.find((l) => l.level === msg.level)?.minXp || 0) : 0);

    setInspectedStudent({
      id: msg.studentId,
      name: msg.studentName,
      section: msg.studentSection,
      avatar: normalizeAvatar(msg.avatar),
      frame: msg.frame,
      nameFx: msg.nameFx,
      tagline: msg.tagline,
      customPhoto: msg.customPhoto,
      xp: fallbackXp,
      fastestBlitz: msg.fastestBlitz || null,
      highestPercent: msg.highestPercent || 0,
    });
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      {!isFeedOpen && (
        <button
          onClick={() => {
            sound.playFlip();
            setIsFeedOpen(true);
            setUnreadCount(0);
          }}
          className="fixed bottom-[4.5rem] sm:bottom-6 right-3 sm:right-6 z-50 btn-haptic group flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-xl shadow-blue-900/30 border border-blue-400/40 cursor-pointer backdrop-blur-md transition-all duration-300 animate-popIn"
          title="Open Live 4th Year Class Feed"
          aria-label="Open 4th Year Class Feed"
        >
          <div className="relative">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            {unreadCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center border-2 border-white animate-pulse">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          </div>
          <span className="text-xs sm:text-sm font-extrabold tracking-tight">
            Class Feed
          </span>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
            Live
          </span>
        </button>
      )}

      {/* Floating Class Shoutbox Window */}
      {isFeedOpen && (
        <div className="fixed inset-x-2 bottom-[4.5rem] sm:bottom-6 sm:right-6 sm:left-auto sm:w-[410px] z-50 max-h-[calc(100dvh-5.5rem)] sm:max-h-[580px] h-[78dvh] sm:h-[580px] flex flex-col bg-white dark:bg-slate-900 shadow-2xl border border-slate-200/90 dark:border-slate-800 rounded-2xl sm:rounded-3xl animate-scaleIn overflow-hidden text-slate-900 dark:text-white">
          
          {/* Header */}
          <div className="p-3.5 sm:p-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-950 text-white flex items-center justify-between border-b border-blue-500/20 dark:border-white/10 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-white/20 dark:bg-blue-500/20 border border-white/25 dark:border-blue-400/30 flex items-center justify-center text-white dark:text-blue-300">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xs sm:text-sm tracking-tight text-white !text-white">
                    4th Year Study Shoutbox
                  </span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                </div>
                <div className="text-[10px] text-blue-100 dark:text-blue-200/80 flex items-center gap-1.5 font-medium">
                  <span>DLSP BSCPE Arena</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{isCloudConnected ? "Live (Auto 3s)" : "Local Mode"}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={async () => {
                  setIsManualRefreshing(true);
                  if (fetchFeedOnly) await fetchFeedOnly();
                  setIsManualRefreshing(false);
                }}
                className="btn-haptic p-1.5 text-blue-100 dark:text-blue-200 hover:text-white hover:bg-white/15 rounded-lg transition-all cursor-pointer"
                title="Refresh Feed Now"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-white ${isManualRefreshing ? "animate-spin" : ""}`} />
              </button>
              <button
                onClick={() => {
                  sound.playFlip();
                  setIsFeedOpen(false);
                }}
                className="btn-haptic p-1.5 text-blue-100 dark:text-blue-200 hover:text-white hover:bg-white/15 rounded-lg transition-all cursor-pointer"
                title="Close Feed"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 min-h-[220px] max-h-[360px] text-xs">
            {feedMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-2">
                <span className="text-3xl">💬</span>
                <p className="font-semibold text-xs">No messages yet. Be the first to shout out to your classmates!</p>
              </div>
            ) : (
              feedMessages.map((msg) => {
                const isMe = Boolean(
                  (msg.studentId && profile?.id && msg.studentId === profile.id) ||
                  (msg.studentName && profile?.name && msg.studentName.trim().toLowerCase() === profile.name.trim().toLowerCase())
                );

                const liveClassmate = !isMe && Array.isArray(leaderboard)
                  ? leaderboard.find(
                      (l) =>
                        (msg.studentId && l.id === msg.studentId) ||
                        (msg.studentName && l.name && l.name.trim().toLowerCase() === msg.studentName.trim().toLowerCase())
                    )
                  : null;

                const displayAvatar = isMe ? profile.avatar : normalizeAvatar(liveClassmate?.avatar || msg.avatar);
                const displayPhoto = isMe ? profile.customPhoto : (liveClassmate?.customPhoto || msg.customPhoto);
                const displayFrame = isMe ? profile.frame : (liveClassmate?.frame || msg.frame);
                const displayNameFx = isMe ? profile.nameFx : (liveClassmate?.nameFx || msg.nameFx);
                const displayTagline = isMe ? profile.tagline : (liveClassmate?.tagline || msg.tagline);
                const displaySection = isMe ? profile.section : (liveClassmate?.section || msg.studentSection || "4D");
                const displayXp = isMe ? (profile.xp || 0) : (typeof liveClassmate?.xp === "number" ? liveClassmate.xp : (typeof msg.xp === "number" ? msg.xp : 0));
                const displayLevel = isMe ? getLevelInfo(profile.xp || 0).level : (liveClassmate?.levelInfo?.level || msg.level || getLevelInfo(displayXp).level || 1);
                const nameFxClass = NAME_EFFECTS.find((fx) => fx.id === displayNameFx)?.cssClass || "";

                const reactionsMap = {};
                let myReaction = null;
                if (msg.userReactions && typeof msg.userReactions === "object") {
                  Object.entries(msg.userReactions).forEach(([studentId, emo]) => {
                    reactionsMap[emo] = (reactionsMap[emo] || 0) + 1;
                    if (studentId === profile.id) {
                      myReaction = emo;
                    }
                  });
                }
                const reactionEntries = Object.entries(reactionsMap);

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-1.5 sm:gap-2.5 transition-all ${isMe ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Clickable Avatar to Inspect Profile with Frame Buffer */}
                    <div className="shrink-0 p-1 mx-1 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => handleInspectMessage(msg)}
                        className="cursor-pointer transition-transform hover:scale-105"
                        title={`Inspect ${msg.studentName}'s Profile`}
                      >
                        <StudentAvatar
                          avatar={displayAvatar}
                          customPhoto={displayPhoto}
                          frameId={displayFrame}
                          size="sm"
                        />
                      </button>
                    </div>

                    {/* Message Bubble Card */}
                    <div className={`max-w-[76%] flex flex-col space-y-1 ${isMe ? "items-end pr-1.5 sm:pr-2.5" : "items-start pl-1.5 sm:pl-2.5"}`}>
                      {/* Name, Tagline & Section Banner */}
                      <div className={`flex items-center gap-1.5 flex-wrap text-[10px] ${isMe ? "justify-end" : "justify-start"}`}>
                        <button
                          type="button"
                          onClick={() => handleInspectMessage(msg)}
                          className={`font-black hover:underline cursor-pointer ${nameFxClass || "text-slate-900 dark:text-white"}`}
                        >
                          {msg.studentName}
                        </button>
                        <span className="text-[9px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-1.5 py-0.2 rounded border border-blue-200/60 dark:border-blue-800/40">
                          {displaySection}
                        </span>
                        {displayLevel && (
                          <span className="text-[9px] font-bold text-amber-500">
                            Lv.{displayLevel}
                          </span>
                        )}
                      </div>

                      {/* Vanity Tagline (if equipped) */}
                      {displayTagline && (
                        <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                          <span className="text-[9px] font-bold text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.2 rounded-full border border-amber-300/40 dark:border-amber-700/40 truncate max-w-[200px]">
                            {displayTagline}
                          </span>
                        </div>
                      )}

                      {/* Bubble Text & Messenger Reaction Trigger */}
                      <div className="relative group/msg reaction-container">
                        <div
                          className={`w-fit max-w-full px-3.5 py-2 rounded-2xl break-words leading-relaxed text-left relative ${
                            isMe
                              ? "bg-blue-600 text-white rounded-tr-xs shadow-xs"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200/70 dark:border-slate-700/70"
                          }`}
                        >
                          <p className="text-[11.5px] font-medium whitespace-pre-wrap">{msg.text}</p>
                        </div>

                        {/* Quick React Trigger Button */}
                        <button
                          type="button"
                          onClick={() => setActiveReactionMsgId(activeReactionMsgId === msg.id ? null : msg.id)}
                          className={`absolute top-1/2 -translate-y-1/2 p-1 rounded-full bg-white dark:bg-slate-800 shadow-xs border border-slate-200 dark:border-slate-700 hover:scale-115 transition-all cursor-pointer text-slate-400 hover:text-amber-500 z-10 ${
                            isMe ? "-left-7" : "-right-7"
                          } opacity-75 sm:opacity-0 group-hover/msg:opacity-100 focus:opacity-100`}
                          title="React to message"
                        >
                          <Smile className="w-3.5 h-3.5" />
                        </button>

                        {/* Messenger Floating Reaction Emoji Bar */}
                        {activeReactionMsgId === msg.id && (
                          <div 
                            className={`absolute z-30 -top-10 ${
                              isMe ? "right-0 max-w-[90vw]" : "left-0 max-w-[90vw]"
                            } flex items-center gap-1 p-1 bg-white dark:bg-slate-800 rounded-full shadow-xl border border-slate-200 dark:border-slate-700 animate-scaleIn`}
                          >
                            {REACTION_EMOJIS.map((emo) => {
                              const hasReacted = myReaction === emo;
                              return (
                                <button
                                  key={emo}
                                  type="button"
                                  onClick={() => {
                                    reactToMessage?.(msg.id, emo);
                                    setActiveReactionMsgId(null);
                                    try { sound?.playCorrect?.(); } catch (err) {}
                                  }}
                                  className={`p-1.5 text-base leading-none hover:scale-130 transition-transform cursor-pointer rounded-full ${
                                    hasReacted ? "bg-blue-100 dark:bg-blue-900/60 scale-110" : "hover:bg-slate-100 dark:hover:bg-slate-700"
                                  }`}
                                  title={`React with ${emo}`}
                                >
                                  {emo}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      {/* Reaction Count Badges / Pills under the Bubble */}
                      {reactionEntries.length > 0 && (
                        <div className={`flex items-center gap-1 flex-wrap mt-0.5 ${isMe ? "justify-end" : "justify-start"}`}>
                          {reactionEntries.map(([emo, count]) => {
                            const isMyReaction = myReaction === emo;
                            const reactorsForEmoji = Object.entries(msg.userReactions || {})
                              .filter(([_, reactionEmoji]) => reactionEmoji === emo)
                              .map(([studentId, reactionEmoji]) => getReactorInfo(studentId, reactionEmoji, msg));

                            const namesString = reactorsForEmoji.length === 1
                              ? (reactorsForEmoji[0].isMe ? "You" : reactorsForEmoji[0].name)
                              : reactorsForEmoji.length === 2
                              ? `${reactorsForEmoji[0].isMe ? "You" : reactorsForEmoji[0].name} and ${reactorsForEmoji[1].isMe ? "You" : reactorsForEmoji[1].name}`
                              : `${reactorsForEmoji.slice(0, 2).map((r) => r.isMe ? "You" : r.name).join(", ")} and ${reactorsForEmoji.length - 2} other${reactorsForEmoji.length - 2 > 1 ? "s" : ""}`;

                            return (
                              <button
                                key={emo}
                                type="button"
                                onClick={() => {
                                  reactToMessage?.(msg.id, emo);
                                  try { sound?.playCorrect?.(); } catch (err) {}
                                }}
                                className={`btn-haptic inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10.5px] font-bold border transition-all cursor-pointer ${
                                  isMyReaction
                                    ? "bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border-blue-400 dark:border-blue-600 shadow-2xs ring-1 ring-blue-500/20"
                                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750"
                                }`}
                                title={`${namesString} reacted with ${emo} • Tap 'Who reacted' to view all`}
                              >
                                <span>{emo}</span>
                                {count > 1 && <span className="font-mono text-[9px]">{count}</span>}
                              </button>
                            );
                          })}

                          {/* "Who reacted" view button */}
                          <button
                            type="button"
                            onClick={() => {
                              setViewingReactionsMsg(msg);
                              setReactionFilterTab("all");
                              try { sound?.playFlip?.(); } catch (err) {}
                            }}
                            className="btn-haptic inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 transition-all cursor-pointer"
                            title="See who reacted to this message"
                          >
                            <Users className="w-2.5 h-2.5" />
                            <span className="text-[9.5px]">Who reacted</span>
                          </button>
                        </div>
                      )}

                      {/* Timestamp */}
                      <div className={`text-[9px] text-slate-400 font-medium px-1 flex items-center gap-1 ${isMe ? "justify-end" : "justify-start"}`}>
                        <Clock className="w-2.5 h-2.5" />
                        <span>{formatTime(msg.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Reaction Bar */}
          <div className="px-3 py-1.5 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200/80 dark:border-slate-800 overflow-x-auto scrollbar-none flex items-center gap-1.5 shrink-0">
            {QUICK_REACTIONS.map((rx, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickReaction(rx)}
                className="btn-haptic px-2 py-0.5 rounded-lg text-[10px] font-semibold whitespace-nowrap bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 cursor-pointer"
              >
                {rx}
              </button>
            ))}
          </div>

          {/* Message Input Bar */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 shrink-0">
            <input
              type="text"
              maxLength={180}
              placeholder={`Shout as ${profile.name}...`}
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 focus:border-blue-600 dark:focus:border-blue-400 rounded-xl text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isSending}
              className="btn-haptic p-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white rounded-xl shadow-md shadow-blue-600/20 transition-all cursor-pointer shrink-0"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* WHO REACTED MODAL OVERLAY */}
          {viewingReactionsMsg && (
            <div 
              className="absolute inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex flex-col justify-end sm:justify-center p-2 sm:p-3 animate-fadeIn"
              onClick={() => setViewingReactionsMsg(null)}
            >
              <div 
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-3.5 flex flex-col max-h-[90%] w-full animate-scaleIn text-slate-900 dark:text-white"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-2.5 border-b border-slate-200 dark:border-slate-800 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🙌</span>
                    <h4 className="text-xs sm:text-sm font-extrabold tracking-tight">
                      Message Reactions
                    </h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/40 font-mono">
                      {Object.keys(viewingReactionsMsg.userReactions || {}).length}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setViewingReactionsMsg(null)}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Filter Tabs by Reaction Emoji */}
                {(() => {
                  const allReactors = Object.entries(viewingReactionsMsg.userReactions || {}).map(([sId, emo]) =>
                    getReactorInfo(sId, emo, viewingReactionsMsg)
                  );
                  
                  const emojiCounts = {};
                  allReactors.forEach((r) => {
                    emojiCounts[r.emoji] = (emojiCounts[r.emoji] || 0) + 1;
                  });

                  const filteredReactors = reactionFilterTab === "all"
                    ? allReactors
                    : allReactors.filter((r) => r.emoji === reactionFilterTab);

                  return (
                    <>
                      <div className="flex items-center gap-1.5 py-2 overflow-x-auto scrollbar-none border-b border-slate-100 dark:border-slate-800/80 shrink-0">
                        <button
                          type="button"
                          onClick={() => setReactionFilterTab("all")}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                            reactionFilterTab === "all"
                              ? "bg-blue-600 text-white shadow-xs"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750"
                          }`}
                        >
                          <span>All</span>
                          <span className="text-[9px] opacity-80 font-mono">({allReactors.length})</span>
                        </button>
                        {Object.entries(emojiCounts).map(([emo, cnt]) => (
                          <button
                            key={emo}
                            type="button"
                            onClick={() => setReactionFilterTab(emo)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer flex items-center gap-1 ${
                              reactionFilterTab === emo
                                ? "bg-blue-600 text-white shadow-xs"
                                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-750"
                            }`}
                          >
                            <span>{emo}</span>
                            <span className="text-[9px] opacity-80 font-mono">{cnt}</span>
                          </button>
                        ))}
                      </div>

                      {/* Reactors List */}
                      <div className="flex-1 overflow-y-auto py-2 space-y-2 min-h-[140px] max-h-[260px]">
                        {filteredReactors.length === 0 ? (
                          <div className="py-6 text-center text-xs text-slate-400">
                            No reactions in this category.
                          </div>
                        ) : (
                          filteredReactors.map((reactor, idx) => {
                            const nameFxClass = NAME_EFFECTS.find((fx) => fx.id === reactor.nameFx)?.cssClass || "";
                            return (
                              <div
                                key={reactor.studentId || idx}
                                onClick={() => {
                                  if (!reactor.isMe) {
                                    handleInspectMessage({
                                      studentId: reactor.studentId,
                                      studentName: reactor.name,
                                      studentSection: reactor.section,
                                      avatar: reactor.avatar,
                                      frame: reactor.frame,
                                      nameFx: reactor.nameFx,
                                      tagline: reactor.tagline,
                                      customPhoto: reactor.customPhoto,
                                      xp: reactor.xp,
                                    });
                                  }
                                }}
                                className={`flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 transition-all ${
                                  reactor.isMe ? "cursor-default" : "cursor-pointer group"
                                }`}
                              >
                                <div className="flex items-center gap-2.5 min-w-0">
                                  <StudentAvatar
                                    avatar={reactor.avatar}
                                    customPhoto={reactor.customPhoto}
                                    frameId={reactor.frame}
                                    size="sm"
                                  />
                                  <div className="text-left min-w-0">
                                    <div className="flex items-center gap-1.5 flex-wrap">
                                      <span className={`text-xs font-black truncate ${nameFxClass || "text-slate-900 dark:text-white"}`}>
                                        {reactor.name} {reactor.isMe ? "(You)" : ""}
                                      </span>
                                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                                        {reactor.section}
                                      </span>
                                    </div>
                                    {reactor.tagline && (
                                      <span className="text-[9px] text-amber-600 dark:text-amber-400 truncate block">
                                        {reactor.tagline}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="flex items-center gap-1.5 shrink-0 pl-2">
                                  <span className="text-lg leading-none">{reactor.emoji}</span>
                                </div>
                              </div>
                            );
                          })
                        )}
                      </div>
                    </>
                  );
                })()}

                {/* Footer hint */}
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[10px] text-slate-400 text-center font-medium shrink-0">
                  Tap any classmate to inspect their Cadet Profile 🎓
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </>
  );
}

export default ClassShoutbox;
