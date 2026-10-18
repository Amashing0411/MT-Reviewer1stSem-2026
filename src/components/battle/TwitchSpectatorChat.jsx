import React, { useState, useEffect, useRef } from "react";
import { StudentAvatar } from "../StudentAvatar";
import { Send, Eye, MessageSquare, Zap, Flame, Sparkles } from "lucide-react";
import { sound } from "../../utils/sound";

const REACTION_EMOJIS = ["🔥", "💀", "⚡", "🍿", "👏", "😱", "🎯", "🧠"];

export function TwitchSpectatorChat({
  roomId,
  currentUser,
  chat = [],
  spectatorCount = 0,
  recentEmotes = [],
  onSendMessage,
  onBurstEmote,
}) {
  const [inputText, setInputText] = useState("");
  const [floatingBubbles, setFloatingBubbles] = useState([]);
  const messagesEndRef = useRef(null);

  // Auto-scroll chat to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  // When new recent emotes arrive, spawn floating animations
  useEffect(() => {
    if (recentEmotes && recentEmotes.length > 0) {
      const latest = recentEmotes[recentEmotes.length - 1];
      if (latest) {
        spawnBubble(latest.emoji);
      }
    }
  }, [recentEmotes?.length]);

  const spawnBubble = (emoji) => {
    const id = Date.now() + "_" + Math.random().toString(36).substr(2, 4);
    const randomLeft = Math.floor(Math.random() * 70) + 15; // 15% to 85%
    const newBubble = { id, emoji, left: randomLeft };

    setFloatingBubbles((prev) => [...prev.slice(-15), newBubble]);

    setTimeout(() => {
      setFloatingBubbles((prev) => prev.filter((b) => b.id !== id));
    }, 2400);
  };

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText("");
    sound.playTap();
  };

  const handleEmojiClick = (emoji) => {
    onBurstEmote(emoji);
    spawnBubble(emoji);
    sound.playPop();
  };

  return (
    <div className="relative flex flex-col h-[420px] sm:h-[580px] w-full rounded-2xl bg-slate-900/90 dark:bg-slate-950/95 border border-slate-700/80 shadow-xl overflow-hidden backdrop-blur-md">
      {/* Floating Spectator Reactions Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
        {floatingBubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute bottom-16 text-3xl sm:text-4xl animate-floatUp select-none filter drop-shadow-md"
            style={{ left: `${bubble.left}%` }}
          >
            {bubble.emoji}
          </div>
        ))}
      </div>

      {/* Top Header: Twitch Live Bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-800/80 border-b border-slate-700/80 text-white shrink-0">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping absolute" />
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 relative" />
          </div>
          <span className="text-xs font-black tracking-wider uppercase bg-gradient-to-r from-red-400 to-amber-300 bg-clip-text text-transparent">
            Twitch Arena Feed
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-slate-900/80 border border-slate-700 text-[11px] font-mono font-bold text-slate-300">
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          <span>{spectatorCount} Watching</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs font-sans scrollbar-thin scrollbar-thumb-slate-700">
        {chat.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 p-4">
            <MessageSquare className="w-8 h-8 mb-2 opacity-40 text-blue-400" />
            <p className="text-xs font-semibold">Spectator Chat is Live!</p>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Send comments and tap emoji reactions to cheer your classmates!
            </p>
          </div>
        ) : (
          chat.map((msg) => {
            if (msg.type === "event") {
              return (
                <div
                  key={msg.id}
                  className="px-2.5 py-1.5 rounded-lg bg-blue-950/40 border border-blue-500/30 text-blue-200 text-[11px] font-medium leading-relaxed"
                >
                  <span className="font-bold text-blue-400 mr-1.5">⚡ ARENA:</span>
                  {msg.text}
                </div>
              );
            }

            const isMe = msg.senderId === currentUser?.id;

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2 ${
                  isMe ? "bg-slate-800/40" : ""
                } p-1.5 rounded-lg transition-colors`}
              >
                <div className="w-6 h-6 rounded-full overflow-hidden shrink-0 mt-0.5 border border-slate-600 bg-slate-800">
                  <StudentAvatar avatar={msg.avatar} className="w-full h-full object-cover" />
                </div>

                <div className="min-w-0 flex-1 leading-snug">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`font-black text-[11px] truncate ${
                        isMe ? "text-amber-400" : "text-indigo-300"
                      }`}
                    >
                      {msg.senderName}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </div>
                  <p className="text-slate-200 text-xs break-words mt-0.5">{msg.text}</p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Emoji Reaction Dock */}
      <div className="px-2 py-1.5 bg-slate-950/80 border-t border-slate-800/80 flex items-center justify-between gap-1 overflow-x-auto shrink-0">
        {REACTION_EMOJIS.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleEmojiClick(emoji)}
            className="p-1 hover:scale-125 active:scale-95 text-base sm:text-lg transition-transform duration-150 focus:outline-none"
            title={`Cheer with ${emoji}`}
          >
            {emoji}
          </button>
        ))}
      </div>

      {/* Chat Input Form */}
      <form
        onSubmit={handleSend}
        className="p-2.5 bg-slate-900 border-t border-slate-800 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Send spectator message..."
          maxLength={140}
          className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-3 py-2 text-base sm:text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        />
        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white font-bold transition-all shrink-0 active:scale-95 shadow-md shadow-blue-600/30"
          title="Send message"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
