import React, { useState, useRef, useEffect } from "react";
import { useUser } from "../context/UserContext";
import { AVATAR_FRAMES, NAME_EFFECTS, getAvatarFrame } from "../utils/gamification";
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

export function ClassShoutbox() {
  const { 
    profile, 
    feedMessages = [], 
    sendFeedMessage, 
    isFeedOpen, 
    setIsFeedOpen, 
    setInspectedStudent,
    isCloudConnected,
    syncWithCloud
  } = useUser();

  const [inputVal, setInputVal] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const lastMsgCountRef = useRef(feedMessages.length);

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
          className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-40 btn-haptic group flex items-center gap-2 px-3.5 py-2.5 sm:px-4 sm:py-3 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white rounded-full shadow-xl shadow-blue-900/30 border border-blue-400/40 cursor-pointer backdrop-blur-md transition-all duration-300 animate-popIn"
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
          <span className="text-xs sm:text-sm font-extrabold tracking-tight hidden xs:inline">
            Class Feed
          </span>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
            Live
          </span>
        </button>
      )}

      {/* Floating Class Shoutbox Window */}
      {isFeedOpen && (
        <div className="fixed bottom-20 sm:bottom-6 right-2 sm:right-6 z-50 w-[calc(100vw-1rem)] xs:w-[380px] sm:w-[410px] max-h-[82vh] sm:max-h-[580px] flex flex-col bg-white dark:bg-slate-900 shadow-2xl border border-slate-200/90 dark:border-slate-800 rounded-3xl animate-scaleIn overflow-hidden text-slate-900 dark:text-white">
          
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
                <div className="text-[10px] text-blue-100 dark:text-blue-200/80 flex items-center gap-1 font-medium">
                  <span>DLSP BSCPE Arena</span>
                  <span>•</span>
                  <span>{isCloudConnected ? "Cloud Live" : "Local Sync"}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => syncWithCloud()}
                className="btn-haptic p-1.5 text-blue-100 dark:text-blue-200 hover:text-white hover:bg-white/15 rounded-lg transition-all cursor-pointer"
                title="Refresh Feed from Cloud"
              >
                <RefreshCw className="w-3.5 h-3.5 text-white" />
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
                  (msg.studentName && profile?.name && msg.studentName === profile.name)
                );
                const frameObj = getAvatarFrame(msg.frame);
                const frameClass = frameObj?.cssClass || "avatar-frame-default";
                const nameFxClass = NAME_EFFECTS.find((fx) => fx.id === msg.nameFx)?.cssClass || "";

                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 transition-all ${isMe ? "flex-row-reverse" : "flex-row"}`}
                  >
                    {/* Clickable Avatar to Inspect Profile */}
                    <button
                      type="button"
                      onClick={() => setInspectedStudent({
                        id: msg.studentId,
                        name: msg.studentName,
                        section: msg.studentSection,
                        avatar: msg.avatar,
                        frame: msg.frame,
                        nameFx: msg.nameFx,
                        tagline: msg.tagline,
                        customPhoto: msg.customPhoto,
                        level: msg.level,
                        xp: msg.xp || (msg.level ? msg.level * 800 : 0),
                      })}
                      className={`relative w-8 h-8 rounded-xl bg-white flex items-center justify-center text-sm shrink-0 cursor-pointer transition-transform hover:scale-110 shadow-xs ${frameClass}`}
                      title={`Inspect ${msg.studentName}'s Profile`}
                    >
                      <div className="w-full h-full rounded-xl overflow-hidden flex items-center justify-center">
                        {msg.customPhoto ? (
                          <img src={msg.customPhoto} alt={msg.studentName} className="w-full h-full object-cover" />
                        ) : (
                          <span>{msg.avatar || "🤖"}</span>
                        )}
                      </div>
                      {frameObj?.assetUrl && (
                        <img 
                          src={frameObj.assetUrl} 
                          alt="" 
                          className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] max-w-none pointer-events-none object-contain z-10" 
                        />
                      )}
                    </button>

                    {/* Message Bubble Card */}
                    <div className={`max-w-[78%] flex flex-col space-y-1 ${isMe ? "items-end" : "items-start"}`}>
                      {/* Name, Tagline & Section Banner */}
                      <div className={`flex items-center gap-1.5 flex-wrap text-[10px] ${isMe ? "justify-end" : "justify-start"}`}>
                        <button
                          type="button"
                          onClick={() => setInspectedStudent({
                            id: msg.studentId,
                            name: msg.studentName,
                            section: msg.studentSection,
                            avatar: msg.avatar,
                            frame: msg.frame,
                            nameFx: msg.nameFx,
                            tagline: msg.tagline,
                            customPhoto: msg.customPhoto,
                            level: msg.level,
                            xp: msg.xp || (msg.level ? msg.level * 800 : 0),
                          })}
                          className={`font-black hover:underline cursor-pointer ${nameFxClass || "text-slate-900 dark:text-white"}`}
                        >
                          {msg.studentName}
                        </button>
                        <span className="text-[9px] font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-1.5 py-0.2 rounded border border-blue-200/60 dark:border-blue-800/40">
                          {msg.studentSection || "4D"}
                        </span>
                        {msg.level && (
                          <span className="text-[9px] font-bold text-amber-500">
                            Lv.{msg.level}
                          </span>
                        )}
                      </div>

                      {/* Vanity Tagline (if equipped) */}
                      {msg.tagline && (
                        <div className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                          <span className="text-[9px] font-bold text-amber-600 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.2 rounded-full border border-amber-300/40 dark:border-amber-700/40 truncate max-w-[200px]">
                            {msg.tagline}
                          </span>
                        </div>
                      )}

                      {/* Bubble Text */}
                      <div
                        className={`w-fit max-w-full px-3.5 py-2 rounded-2xl break-words leading-relaxed text-left ${
                          isMe
                            ? "bg-blue-600 text-white rounded-tr-xs shadow-xs"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-xs border border-slate-200/70 dark:border-slate-700/70"
                        }`}
                      >
                        <p className="text-[11.5px] font-medium whitespace-pre-wrap">{msg.text}</p>
                      </div>

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
