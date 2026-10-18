import React, { useState, useRef, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { AVATAR_FRAMES, NAME_EFFECTS, getAvatarFrame, getLevelInfo } from "../utils/gamification";
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
  const messagesEndRef = useRef(null);
  const lastMsgCountRef = useRef(feedMessages.length);

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
        avatar: live.avatar || msg.avatar,
        frame: live.frame || msg.frame,
        nameFx: live.nameFx || msg.nameFx,
        tagline: live.tagline || msg.tagline,
        customPhoto: live.customPhoto || msg.customPhoto,
        xp: live.xp ?? msg.xp,
        fastestBlitz: live.fastestBlitz ?? msg.fastestBlitz,
        highestPercent: live.highestPercent ?? msg.highestPercent,
      });
      return;
    }

    setInspectedStudent({
      id: msg.studentId,
      name: msg.studentName,
      section: msg.studentSection,
      avatar: msg.avatar,
      frame: msg.frame,
      nameFx: msg.nameFx,
      tagline: msg.tagline,
      customPhoto: msg.customPhoto,
      xp: msg.xp || (msg.level ? msg.level * 800 : 0),
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

                const displayAvatar = isMe ? profile.avatar : (liveClassmate?.avatar || msg.avatar);
                const displayPhoto = isMe ? profile.customPhoto : (liveClassmate?.customPhoto || msg.customPhoto);
                const displayFrame = isMe ? profile.frame : (liveClassmate?.frame || msg.frame);
                const displayNameFx = isMe ? profile.nameFx : (liveClassmate?.nameFx || msg.nameFx);
                const displayTagline = isMe ? profile.tagline : (liveClassmate?.tagline || msg.tagline);
                const displaySection = isMe ? profile.section : (liveClassmate?.section || msg.studentSection || "4D");
                const displayLevel = isMe ? getLevelInfo(profile.xp || 0).level : (liveClassmate?.levelInfo?.level || msg.level || 1);
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
                    className={`flex items-start gap-2.5 transition-all ${isMe ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Clickable Avatar to Inspect Profile */}
                    <button
                      type="button"
                      onClick={() => handleInspectMessage(msg)}
                      className="cursor-pointer transition-transform hover:scale-110 shrink-0"
                      title={`Inspect ${msg.studentName}'s Profile`}
                    >
                      <StudentAvatar
                        avatar={displayAvatar}
                        customPhoto={displayPhoto}
                        frameId={displayFrame}
                        size="sm"
                      />
                    </button>

                    {/* Message Bubble Card */}
                    <div className={`max-w-[78%] flex flex-col space-y-1 ${isMe ? "items-end" : "items-start"}`}>
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
                                title={isMyReaction ? `You reacted ${emo} (Click to remove)` : `Click to react ${emo}`}
                              >
                                <span>{emo}</span>
                                {count > 1 && <span className="font-mono text-[9px]">{count}</span>}
                              </button>
                            );
                          })}
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

        </div>
      )}
    </>
  );
}

export default ClassShoutbox;
