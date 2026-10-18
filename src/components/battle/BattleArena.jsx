import React, { useState, useEffect, useRef, useCallback } from "react";
import { useUser } from "../../context/UserContext";
import { SUBJECTS_MAP } from "../../data/subjects";
import { StudentAvatar } from "../StudentAvatar";
import { CoinTossModal } from "./CoinTossModal";
import { TwitchSpectatorChat } from "./TwitchSpectatorChat";
import { getBattleQuestions } from "../../utils/battleQuestions";
import { sound } from "../../utils/sound";
import confetti from "canvas-confetti";
import {
  Swords,
  Trophy,
  Users,
  Zap,
  Flame,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  FastForward,
  RotateCcw,
  PlusCircle,
  Eye,
  Bot,
  AlertTriangle,
  Award,
  ChevronRight,
  HelpCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const BOT_PLAYER = {
  id: "bot_deans_lister",
  name: "Dean's Lister AI 🤖",
  section: "BSCPE 4D • DLSP",
  avatar: "/avatars/bean-male-vr.jpg",
  customPhoto: null,
  level: 10,
  xp: 4500,
  frame: "godlike",
  isBot: true,
};

const WAGER_OPTIONS = [100, 250, 500, 1000];

export function BattleArena({ onBackToReviewer }) {
  const { profile, addXp, pushProfileToCloud, isCloudConnected } = useUser();

  // Arena Screen: "lobby" | "room_setup" | "playing" | "game_over"
  const [screen, setScreen] = useState("lobby");
  const [rooms, setRooms] = useState([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(false);
  const [activeRoom, setActiveRoom] = useState(null);
  const [isBotMatch, setIsBotMatch] = useState(false);

  // Room Creation Modal
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [createTitle, setCreateTitle] = useState("");
  const [createSubject, setCreateSubject] = useState("all");
  const [createWager, setCreateWager] = useState(250);

  // Match State
  const [questions, setQuestions] = useState([]);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [activePlayerId, setActivePlayerId] = useState(null);
  const [hostClock, setHostClock] = useState(60);
  const [guestClock, setGuestClock] = useState(60);
  const [haltUntil, setHaltUntil] = useState(0); // timestamp
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [answerFeedback, setAnswerFeedback] = useState(null); // { isCorrect, correctIndex }
  const [showCoinToss, setShowCoinToss] = useState(false);
  const [winnerInfo, setWinnerInfo] = useState(null);

  // Polling ref for cloud rooms
  const pollTimerRef = useRef(null);
  const clockIntervalRef = useRef(null);
  const botTurnTimeoutRef = useRef(null);

  // 1. Fetch Rooms from Upstash Redis
  const fetchRooms = useCallback(async () => {
    setIsLoadingRooms(true);
    try {
      const res = await fetch("/api/battle");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.rooms)) {
          setRooms(data.rooms);
        }
      }
    } catch (e) {
      // offline fallback
    } finally {
      setIsLoadingRooms(false);
    }
  }, []);

  useEffect(() => {
    fetchRooms();
    const interval = setInterval(fetchRooms, 4000);
    return () => clearInterval(interval);
  }, [fetchRooms]);

  // 2. Poll Active Room State if in a multiplayer room
  useEffect(() => {
    if (!activeRoom || isBotMatch || screen === "lobby") return;

    const pollActiveRoom = async () => {
      try {
        const res = await fetch(`/api/battle?roomId=${activeRoom.id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.room) {
            setActiveRoom(data.room);

            // Sync match status
            if (data.room.status === "in_battle" && screen === "room_setup") {
              setScreen("playing");
            } else if (data.room.status === "finished" && screen === "playing") {
              handleMatchEnd(data.room.gameState.winnerId, data.room);
            }

            // Sync clock
            if (data.room.gameState) {
              setHostClock(data.room.gameState.hostClock);
              setGuestClock(data.room.gameState.guestClock);
              setActivePlayerId(data.room.gameState.activePlayerId);
              setQuestionIdx(data.room.gameState.questionIndex);
            }
          }
        }
      } catch (e) {}
    };

    pollTimerRef.current = setInterval(pollActiveRoom, 1800);
    return () => clearInterval(pollTimerRef.current);
  }, [activeRoom?.id, isBotMatch, screen]);

  // 3. Clock Countdown Loop (100ms precision)
  useEffect(() => {
    if (screen !== "playing" || showCoinToss) return;

    clockIntervalRef.current = setInterval(() => {
      const now = Date.now();

      // Check halt penalty
      if (haltUntil > now) {
        return;
      }

      if (activePlayerId === activeRoom?.host?.id) {
        setHostClock((prev) => {
          const next = Math.max(0, +(prev - 0.1).toFixed(1));
          if (next <= 0) {
            handleTimeout(activeRoom.host.id);
          } else if (next <= 10 && Math.round(next * 10) % 10 === 0) {
            sound.playClockTick();
          }
          return next;
        });
      } else if (activePlayerId === activeRoom?.guest?.id) {
        setGuestClock((prev) => {
          const next = Math.max(0, +(prev - 0.1).toFixed(1));
          if (next <= 0) {
            handleTimeout(activeRoom.guest.id);
          } else if (next <= 10 && Math.round(next * 10) % 10 === 0) {
            sound.playClockTick();
          }
          return next;
        });
      }
    }, 100);

    return () => clearInterval(clockIntervalRef.current);
  }, [screen, showCoinToss, activePlayerId, haltUntil, activeRoom]);

  // 4. Bot Turn Simulation (when playing against AI bot)
  useEffect(() => {
    if (!isBotMatch || screen !== "playing" || showCoinToss) return;
    if (activePlayerId !== BOT_PLAYER.id) return;

    // AI bot responds after a random hesitation between 2.2s and 4.5s
    const botThinkTime = Math.floor(Math.random() * 2300) + 2200;

    botTurnTimeoutRef.current = setTimeout(() => {
      // 82% chance bot answers correctly, 10% chance wrong (3s penalty), 8% pass
      const roll = Math.random();
      const curQ = questions[questionIdx];

      if (roll < 0.82) {
        // Bot answers correct!
        sound.playCorrect();
        setAnswerFeedback({ isCorrect: true, correctIndex: curQ.correctAnswer });
        pushChatMessage({
          senderId: BOT_PLAYER.id,
          senderName: BOT_PLAYER.name,
          avatar: BOT_PLAYER.avatar,
          text: "Na-solve ko agad sa memory! Your turn, classmate! ⚡",
        });

        setTimeout(() => {
          setAnswerFeedback(null);
          setSelectedChoice(null);
          setQuestionIdx((i) => i + 1);
          setActivePlayerId(activeRoom.host.id);
        }, 1100);
      } else if (roll < 0.92) {
        // Bot picks wrong answer -> 3s halt penalty
        sound.playBuzzer();
        setHaltUntil(Date.now() + 3000);
        pushChatMessage({
          senderId: BOT_PLAYER.id,
          senderName: BOT_PLAYER.name,
          avatar: BOT_PLAYER.avatar,
          text: "Mali ako sa unit conversion! 3s halt aray! 😵",
        });

        // After 3s halt, bot retries
        setTimeout(() => {
          sound.playCorrect();
          setAnswerFeedback({ isCorrect: true, correctIndex: curQ.correctAnswer });
          setTimeout(() => {
            setAnswerFeedback(null);
            setSelectedChoice(null);
            setQuestionIdx((i) => i + 1);
            setActivePlayerId(activeRoom.host.id);
          }, 900);
        }, 3200);
      } else {
        // Bot passes -> 5s penalty
        sound.playPass();
        setGuestClock((c) => Math.max(0, +(c - 5).toFixed(1)));
        pushChatMessage({
          senderId: BOT_PLAYER.id,
          senderName: BOT_PLAYER.name,
          avatar: BOT_PLAYER.avatar,
          text: "Mahirap tong formula! Tactical PASS (-5s)! ⏩",
        });
        setAnswerFeedback({ isCorrect: false, correctIndex: curQ.correctAnswer });

        setTimeout(() => {
          setAnswerFeedback(null);
          setSelectedChoice(null);
          setQuestionIdx((i) => i + 1);
          setActivePlayerId(activeRoom.host.id);
        }, 1200);
      }
    }, botThinkTime);

    return () => clearTimeout(botTurnTimeoutRef.current);
  }, [isBotMatch, screen, showCoinToss, activePlayerId, questionIdx, questions]);

  // Timeout Handler (One player ran out of time)
  const handleTimeout = async (loserId) => {
    clearInterval(clockIntervalRef.current);
    sound.playBuzzer();

    const isHostLoser = activeRoom?.host?.id === loserId;
    const winner = isHostLoser ? activeRoom?.guest : activeRoom?.host;

    if (!isBotMatch) {
      try {
        await fetch("/api/battle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "time_expired",
            roomId: activeRoom.id,
            loserId,
          }),
        });
      } catch (e) {}
    }

    handleMatchEnd(winner?.id);
  };

  // Match Conclusion Handler
  const handleMatchEnd = (winnerId, latestRoom = null) => {
    const room = latestRoom || activeRoom;
    const isWinner = profile.id === winnerId;
    const wager = room?.wager || 250;

    setWinnerInfo({
      winnerId,
      winnerName: winnerId === room.host.id ? room.host.name : room.guest?.name,
      isCurrentUser: isWinner,
      wager,
      hostClock: Math.round(hostClock),
      guestClock: Math.round(guestClock),
    });

    setScreen("game_over");

    if (isWinner) {
      sound.playFanfare();
      confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
      addXp(wager * 2, `1v1 Battle Exam Victory (Won Pot!)`);
    } else {
      sound.playWomp();
      // Deduct wager XP (down to 0 min)
      const penalty = Math.min(profile.xp, wager);
      addXp(-penalty, `1v1 Battle Exam Defeat (Lost Wager)`);
    }
  };

  // 5. Start Practice vs Bot Match
  const handleStartBotMatch = () => {
    const pool = getBattleQuestions(createSubject);
    setQuestions(pool);
    setQuestionIdx(0);
    setIsBotMatch(true);

    const botRoom = {
      id: "bot_match_" + Date.now(),
      title: "Solo Practice vs Dean's Lister AI",
      subject: createSubject,
      wager: createWager,
      host: {
        id: profile.id,
        name: profile.name,
        avatar: profile.avatar,
        customPhoto: profile.customPhoto || null,
        section: profile.section,
        level: profile.level || 1,
        xp: profile.xp || 0,
      },
      guest: BOT_PLAYER,
      spectators: [
        { id: "spec1", name: "Audience Bot A", avatar: "/avatars/bean-female-laptop.jpg" },
        { id: "spec2", name: "Reviewer Fan", avatar: "/avatars/bean-female-graduate.jpg" },
      ],
      chat: [
        {
          id: "c_1",
          type: "event",
          text: "⚡ 1v1 Battle Exam: Player vs AI Dean's Lister initiated!",
          senderName: "Arena System",
          createdAt: Date.now(),
        },
      ],
      recentEmotes: [],
    };

    setActiveRoom(botRoom);
    setHostClock(60);
    setGuestClock(60);
    setScreen("room_setup");
    sound.playGameShowIntro();
  };

  // 6. Create Cloud Multiplayer Room
  const handleCreateRoom = async (e) => {
    e?.preventDefault();
    try {
      const res = await fetch("/api/battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_room",
          title: createTitle.trim() || `${profile.name}'s Showdown`,
          subject: createSubject,
          wager: createWager,
          host: {
            id: profile.id,
            name: profile.name,
            avatar: profile.avatar,
            customPhoto: profile.customPhoto || null,
            section: profile.section,
            level: profile.level || 1,
            xp: profile.xp || 0,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.room) {
          setActiveRoom(data.room);
          setIsBotMatch(false);
          setIsCreateOpen(false);
          setScreen("room_setup");
          sound.playGameShowIntro();
        }
      }
    } catch (e) {
      alert("Failed to create room. Starting practice match instead.");
      handleStartBotMatch();
    }
  };

  // 7. Join Existing Cloud Room
  const handleJoinRoom = async (room, asPlayer = false) => {
    try {
      const res = await fetch("/api/battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "join_room",
          roomId: room.id,
          asPlayer,
          student: {
            id: profile.id,
            name: profile.name,
            avatar: profile.avatar,
            customPhoto: profile.customPhoto || null,
            section: profile.section,
            level: profile.level || 1,
            xp: profile.xp || 0,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.room) {
          setActiveRoom(data.room);
          setIsBotMatch(false);
          const pool = getBattleQuestions(data.room.subject);
          setQuestions(pool);
          setScreen(data.room.status === "in_battle" ? "playing" : "room_setup");
          sound.playGameShowIntro();
        }
      }
    } catch (e) {
      alert("Unable to join room. Please try again.");
    }
  };

  // 8. Kick off Match: Trigger Coin Toss!
  const handleInitiateMatch = async () => {
    sound.playTap();

    if (isBotMatch) {
      // 50/50 toss between player and bot
      const winnerId = Math.random() < 0.5 ? activeRoom.host.id : activeRoom.guest.id;
      setActivePlayerId(winnerId);
      setShowCoinToss(true);
    } else {
      try {
        const res = await fetch("/api/battle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "start_match",
            roomId: activeRoom.id,
            studentId: profile.id,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.room) {
            setActiveRoom(data.room);
            setActivePlayerId(data.room.coinToss.winnerId);
            setShowCoinToss(true);
          }
        }
      } catch (e) {
        setShowCoinToss(true);
      }
    }
  };

  // 9. When Coin Toss Finishes -> Start Clock!
  const handleCoinTossComplete = async () => {
    setShowCoinToss(false);
    setScreen("playing");
    const pool = getBattleQuestions(activeRoom?.subject || "all");
    setQuestions(pool);
    setQuestionIdx(0);
    setHostClock(60);
    setGuestClock(60);

    if (!isBotMatch && activeRoom?.id) {
      fetch("/api/battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "finish_toss",
          roomId: activeRoom.id,
        }),
      }).catch(() => {});
    }
  };

  // 10. Player Selects an Answer
  const handleSelectAnswer = async (choiceIndex) => {
    if (showCoinToss || haltUntil > Date.now()) return;
    if (activePlayerId !== profile.id) return; // Not your turn!

    const currentQ = questions[questionIdx];
    if (!currentQ) return;

    setSelectedChoice(choiceIndex);
    const isCorrect = choiceIndex === currentQ.correctAnswer;
    const remainingClock = profile.id === activeRoom.host.id ? hostClock : guestClock;

    if (isCorrect) {
      sound.playCorrect();
      setAnswerFeedback({ isCorrect: true, correctIndex: currentQ.correctAnswer });

      if (isBotMatch) {
        setTimeout(() => {
          setAnswerFeedback(null);
          setSelectedChoice(null);
          setQuestionIdx((i) => i + 1);
          // Save clock & switch turn to Bot!
          setActivePlayerId(BOT_PLAYER.id);
        }, 850);
      } else {
        try {
          await fetch("/api/battle", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "submit_answer",
              roomId: activeRoom.id,
              studentId: profile.id,
              isCorrect: true,
              remainingClock,
            }),
          });
        } catch (e) {}

        setTimeout(() => {
          setAnswerFeedback(null);
          setSelectedChoice(null);
        }, 850);
      }
    } else {
      // WRONG ANSWER: 3-Second Penalty Halt!
      sound.playBuzzer();
      setHaltUntil(Date.now() + 3000);
      setAnswerFeedback({ isCorrect: false, correctIndex: currentQ.correctAnswer });

      if (!isBotMatch) {
        try {
          fetch("/api/battle", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "submit_answer",
              roomId: activeRoom.id,
              studentId: profile.id,
              isCorrect: false,
              remainingClock,
            }),
          }).catch(() => {});
        } catch (e) {}
      }

      setTimeout(() => {
        setAnswerFeedback(null);
        setSelectedChoice(null);
      }, 3000);
    }
  };

  // 11. Tactical PASS Button: 5-Second Penalty + Passes Turn
  const handlePassQuestion = async () => {
    if (showCoinToss || haltUntil > Date.now()) return;
    if (activePlayerId !== profile.id) return;

    const currentQ = questions[questionIdx];
    if (!currentQ) return;

    sound.playPass();
    const isHost = profile.id === activeRoom.host.id;
    const remainingClock = isHost ? hostClock : guestClock;
    const nextClock = Math.max(0, +(remainingClock - 5).toFixed(1));

    if (isHost) setHostClock(nextClock);
    else setGuestClock(nextClock);

    // Briefly flash correct answer
    setAnswerFeedback({ isCorrect: false, correctIndex: currentQ.correctAnswer });

    if (nextClock <= 0) {
      handleTimeout(profile.id);
      return;
    }

    if (isBotMatch) {
      setTimeout(() => {
        setAnswerFeedback(null);
        setSelectedChoice(null);
        setQuestionIdx((i) => i + 1);
        setActivePlayerId(BOT_PLAYER.id);
      }, 1200);
    } else {
      try {
        await fetch("/api/battle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "pass_question",
            roomId: activeRoom.id,
            studentId: profile.id,
            remainingClock: nextClock,
          }),
        });
      } catch (e) {}

      setTimeout(() => {
        setAnswerFeedback(null);
        setSelectedChoice(null);
      }, 1200);
    }
  };

  // Twitch Chat send helper
  const pushChatMessage = async (msg) => {
    if (!activeRoom) return;
    const newChat = [...(activeRoom.chat || []), { ...msg, id: "c_" + Date.now(), createdAt: Date.now() }];
    setActiveRoom((r) => ({ ...r, chat: newChat }));

    if (!isBotMatch) {
      try {
        await fetch("/api/battle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "send_chat",
            roomId: activeRoom.id,
            message: msg,
          }),
        });
      } catch (e) {}
    }
  };

  // Emote Reaction burst
  const handleBurstEmote = async (emoji) => {
    if (!activeRoom) return;
    const newEmote = { id: "em_" + Date.now(), emoji, senderName: profile.name, createdAt: Date.now() };
    setActiveRoom((r) => ({
      ...r,
      recentEmotes: [...(r.recentEmotes || []).slice(-15), newEmote],
    }));

    if (!isBotMatch) {
      try {
        fetch("/api/battle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "burst_emote",
            roomId: activeRoom.id,
            emoji,
            senderName: profile.name,
          }),
        }).catch(() => {});
      } catch (e) {}
    }
  };

  const isMyTurn = activePlayerId === profile.id;
  const isSpectating =
    screen === "playing" &&
    profile.id !== activeRoom?.host?.id &&
    profile.id !== activeRoom?.guest?.id;

  const currentQuestion = questions[questionIdx] || {
    question: "Preparing rapid midterm showdown question...",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: 0,
    subjectCode: "BSCPE",
  };

  // Render Sub-Views
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Coin Toss 3D Modal Overlay */}
      {showCoinToss && activeRoom && (
        <CoinTossModal
          host={activeRoom.host}
          guest={activeRoom.guest}
          winnerId={activePlayerId}
          onComplete={handleCoinTossComplete}
        />
      )}

      {/* SCREEN 1: LOBBY BROWSER */}
      {screen === "lobby" && (
        <div className="space-y-6">
          {/* Gameshow Hero Header */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-700/80 p-6 sm:p-8 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-black tracking-wider uppercase">
                  <Zap className="w-3.5 h-3.5 fill-amber-400" />
                  <span>Real-Time 1v1 Battle Exam Arena</span>
                  <Flame className="w-3.5 h-3.5 text-red-400" />
                </div>
                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                  Put Your XP on the Line. <br />
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent">
                    Double Your Wager or Walk Away Empty-Handed.
                  </span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Enter dynamic lobbies, challenge a classmate or battle the AI Dean's Lister. 
                  60-second chess clocks, animated coin toss, 3-second penalty halts, and live Twitch spectator chat!
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                <button
                  onClick={() => setIsCreateOpen(true)}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Host Public Match</span>
                </button>

                <button
                  onClick={handleStartBotMatch}
                  className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-white font-black text-xs sm:text-sm active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <Bot className="w-4 h-4 text-cyan-400" />
                  <span>Practice vs AI Bot</span>
                </button>
              </div>
            </div>
          </div>

          {/* Active Public Rooms Grid */}
          <div className="double-bezel-outer">
            <div className="double-bezel-inner p-5 sm:p-7 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Swords className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    Live Showdown Lobbies
                  </h2>
                </div>
                <button
                  onClick={fetchRooms}
                  disabled={isLoadingRooms}
                  className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isLoadingRooms ? "animate-spin" : ""}`} />
                  <span>Refresh Lobbies</span>
                </button>
              </div>

              {rooms.length === 0 ? (
                <div className="text-center py-12 px-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                  <Swords className="w-10 h-10 text-slate-400 mx-auto mb-3 opacity-60" />
                  <h4 className="text-sm font-black text-slate-800 dark:text-slate-200">
                    No active multiplayer rooms right now
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                    Be the first to open a public stage or jump into solo practice vs the AI bot!
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => setIsCreateOpen(true)}
                      className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500"
                    >
                      Host Match (+250 XP Pot)
                    </button>
                    <button
                      onClick={handleStartBotMatch}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      Play vs AI Bot
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rooms.map((room) => {
                    const isFull = !!room.guest;
                    const isMyRoom = room.host?.id === profile.id;
                    return (
                      <div
                        key={room.id}
                        className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:border-blue-500/50 transition-all flex flex-col justify-between gap-4 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400/80 shrink-0 bg-slate-900">
                              <StudentAvatar avatar={room.host?.avatar} className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-sm font-black text-slate-900 dark:text-white truncate">
                                {room.title}
                              </h4>
                              <p className="text-[11px] text-slate-500 font-medium">
                                Host: {room.host?.name} ({room.host?.section})
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-700 dark:text-amber-300 text-xs font-black">
                              <Zap className="w-3 h-3 fill-amber-400 text-amber-500" />
                              <span>{room.wager} XP</span>
                            </span>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                              {room.subject === "all" ? "All 8 Subjects" : room.subject.toUpperCase()}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                          <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                            <Users className="w-3.5 h-3.5 text-blue-500" />
                            <span>{isFull ? "2/2 (In Battle)" : "1/2 (Challenger Needed)"}</span>
                            <span className="text-slate-300">•</span>
                            <Eye className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{room.spectatorCount || 0} watching</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {isFull ? (
                              <button
                                onClick={() => handleJoinRoom(room, false)}
                                className="px-3 py-1.5 rounded-xl bg-slate-800 text-white font-bold text-xs hover:bg-slate-700 flex items-center gap-1"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Spectate</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => handleJoinRoom(room, !isMyRoom)}
                                className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs flex items-center gap-1 shadow-md shadow-blue-500/20 active:scale-95"
                              >
                                <Swords className="w-3.5 h-3.5" />
                                <span>{isMyRoom ? "Enter Arena" : "Accept Challenge"}</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 2: ROOM SETUP / MATCHMAKING */}
      {screen === "room_setup" && activeRoom && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="relative rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-700/80 p-6 sm:p-8 text-white text-center shadow-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-black uppercase mb-4">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Match Lobby #{activeRoom.id?.slice(-4)}</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-black mb-1">{activeRoom.title}</h2>
            <p className="text-xs sm:text-sm text-slate-400 mb-8">
              Subject: <span className="text-amber-400 font-bold">{activeRoom.subject === "all" ? "All 8 Subjects Mixed" : activeRoom.subject.toUpperCase()}</span> • Total Pot: <span className="text-emerald-400 font-bold">{activeRoom.wager * 2} XP</span>
            </p>

            {/* Versus Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative items-center max-w-xl mx-auto mb-8">
              {/* Host Card */}
              <div className="p-5 rounded-2xl bg-slate-800/80 border-2 border-amber-400/60 flex flex-col items-center gap-2 shadow-lg shadow-amber-500/10">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400 shadow-md bg-slate-900">
                  <StudentAvatar avatar={activeRoom.host.avatar} customPhoto={activeRoom.host.customPhoto} className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-black truncate max-w-[160px]">{activeRoom.host.name}</span>
                <span className="text-[10px] text-amber-400 font-bold bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/40">
                  HOST • {activeRoom.host.section}
                </span>
                <span className="text-xs font-mono text-slate-300">Wager: {activeRoom.wager} XP</span>
              </div>

              {/* VS Pill Center */}
              <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-red-600 items-center justify-center font-black text-xs text-white shadow-xl z-10 border-2 border-slate-900">
                VS
              </div>

              {/* Guest Card */}
              <div className="p-5 rounded-2xl bg-slate-800/80 border-2 border-indigo-400/60 flex flex-col items-center gap-2 shadow-lg shadow-indigo-500/10">
                {activeRoom.guest ? (
                  <>
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-400 shadow-md bg-slate-900">
                      <StudentAvatar avatar={activeRoom.guest.avatar} customPhoto={activeRoom.guest.customPhoto} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-black truncate max-w-[160px]">{activeRoom.guest.name}</span>
                    <span className="text-[10px] text-indigo-300 font-bold bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-500/40">
                      {activeRoom.guest.isBot ? "AI BOT" : "CHALLENGER"} • {activeRoom.guest.section}
                    </span>
                    <span className="text-xs font-mono text-slate-300">Wager: {activeRoom.wager} XP</span>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center py-6 text-slate-500">
                    <Users className="w-10 h-10 mb-2 animate-pulse text-indigo-400" />
                    <p className="text-xs font-bold text-slate-300">Waiting for Challenger...</p>
                    <p className="text-[10px] text-slate-500 mt-1">Share room link or invite a classmate!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Launch Button */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => setScreen("lobby")}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold"
              >
                Leave Lobby
              </button>

              <button
                onClick={handleInitiateMatch}
                disabled={!activeRoom.guest}
                className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 disabled:opacity-40 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 active:scale-95 transition-all flex items-center gap-2"
              >
                <Zap className="w-4 h-4 fill-slate-950" />
                <span>Toss Coin & Start Showdown</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 3: ACTIVE 60S BLITZ SHOWDOWN */}
      {screen === "playing" && activeRoom && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Main Battle Stage (2 Columns) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Top Game-Show Dual Chess Clock Deck */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Host Clock */}
              <div
                className={`p-3.5 sm:p-5 rounded-2xl border-2 transition-all relative overflow-hidden ${
                  activePlayerId === activeRoom.host.id
                    ? "bg-slate-900 border-amber-400 shadow-xl shadow-amber-500/20"
                    : "bg-slate-900/60 border-slate-800 opacity-70"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-amber-400 bg-slate-900 shrink-0">
                      <StudentAvatar avatar={activeRoom.host.avatar} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs sm:text-sm font-black text-white truncate">
                      {activeRoom.host.name}
                    </span>
                  </div>
                  {activePlayerId === activeRoom.host.id && (
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 animate-pulse bg-amber-950 px-2 py-0.5 rounded-full border border-amber-500/40">
                      ON CLOCK
                    </span>
                  )}
                </div>

                <div className="flex items-baseline justify-between">
                  <span
                    className={`text-2xl sm:text-4xl font-mono font-black ${
                      hostClock <= 10 ? "text-red-500 animate-ping" : "text-amber-400"
                    }`}
                  >
                    {Math.ceil(hostClock)}s
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    POT: {activeRoom.wager * 2} XP
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-100 ${
                      hostClock <= 10 ? "bg-red-500" : "bg-amber-400"
                    }`}
                    style={{ width: `${(hostClock / 60) * 100}%` }}
                  />
                </div>
              </div>

              {/* Guest Clock */}
              <div
                className={`p-3.5 sm:p-5 rounded-2xl border-2 transition-all relative overflow-hidden ${
                  activePlayerId === activeRoom.guest?.id
                    ? "bg-slate-900 border-indigo-400 shadow-xl shadow-indigo-500/20"
                    : "bg-slate-900/60 border-slate-800 opacity-70"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-indigo-400 bg-slate-900 shrink-0">
                      <StudentAvatar avatar={activeRoom.guest?.avatar} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs sm:text-sm font-black text-white truncate">
                      {activeRoom.guest?.name}
                    </span>
                  </div>
                  {activePlayerId === activeRoom.guest?.id && (
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400 animate-pulse bg-indigo-950 px-2 py-0.5 rounded-full border border-indigo-500/40">
                      ON CLOCK
                    </span>
                  )}
                </div>

                <div className="flex items-baseline justify-between">
                  <span
                    className={`text-2xl sm:text-4xl font-mono font-black ${
                      guestClock <= 10 ? "text-red-500 animate-ping" : "text-indigo-400"
                    }`}
                  >
                    {Math.ceil(guestClock)}s
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {activeRoom.guest?.isBot ? "AI BOT" : "RIVAL"}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-100 ${
                      guestClock <= 10 ? "bg-red-500" : "bg-indigo-400"
                    }`}
                    style={{ width: `${(guestClock / 60) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Question Card Arena */}
            <div className="relative rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-5 sm:p-7 shadow-xl overflow-hidden min-h-[360px] flex flex-col justify-between">
              {/* 3-Second Penalty Halt Lockout Overlay */}
              {haltUntil > Date.now() && (
                <div className="absolute inset-0 z-30 bg-red-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white animate-fadeIn">
                  <AlertTriangle className="w-12 h-12 text-red-400 mb-2 animate-bounce" />
                  <h3 className="text-xl sm:text-2xl font-black text-red-200">
                    INCORRECT CHOICE! 🛑
                  </h3>
                  <p className="text-xs text-red-300 font-semibold mt-1 mb-4">
                    Locked out for 3 seconds penalty! Hold your breath!
                  </p>
                  <span className="text-4xl font-mono font-black text-white animate-ping">
                    {Math.ceil((haltUntil - Date.now()) / 1000)}s
                  </span>
                </div>
              )}

              {/* Question Header & Subject Tag */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-[11px] font-black uppercase">
                    <span>{currentQuestion.subjectCode}</span>
                    <span className="text-slate-400">•</span>
                    <span>Q#{questionIdx + 1}</span>
                  </span>

                  <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                    {isMyTurn ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-black animate-pulse flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5 fill-current" />
                        YOUR TURN TO ANSWER!
                      </span>
                    ) : (
                      <span>Opponent is answering...</span>
                    )}
                  </div>
                </div>

                {/* Question Text */}
                <h3 className="text-sm sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed mb-6">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* 4 Choices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                {currentQuestion.options.map((opt, idx) => {
                  const letter = ["A", "B", "C", "D"][idx];
                  const isSelected = selectedChoice === idx;
                  const isCorrectAnswer = answerFeedback?.correctIndex === idx;

                  let btnStyle =
                    "bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100";

                  if (answerFeedback) {
                    if (isCorrectAnswer) {
                      btnStyle = "bg-emerald-600 border-emerald-500 text-white font-black";
                    } else if (isSelected && !answerFeedback.isCorrect) {
                      btnStyle = "bg-red-600 border-red-500 text-white font-black";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(idx)}
                      disabled={!isMyTurn || haltUntil > Date.now() || !!answerFeedback}
                      className={`p-3 sm:p-4 rounded-xl border-2 text-left text-xs sm:text-sm font-semibold transition-all flex items-start gap-3 active:scale-98 disabled:cursor-not-allowed ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-black/10 dark:bg-white/10 flex items-center justify-center text-xs font-black shrink-0">
                        {letter}
                      </span>
                      <span className="min-w-0 leading-tight">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tactical Action Bar: Pass Button */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[11px] text-slate-400 font-medium">
                  {isMyTurn ? "Correct answer saves clock and passes turn!" : "Waiting for response..."}
                </div>

                {isMyTurn && (
                  <button
                    onClick={handlePassQuestion}
                    disabled={haltUntil > Date.now() || !!answerFeedback}
                    className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-700 dark:text-amber-300 font-black text-xs flex items-center gap-1.5 transition-colors active:scale-95"
                    title="Skip this question, deduct 5 seconds from your clock, and pass turn to opponent"
                  >
                    <FastForward className="w-3.5 h-3.5" />
                    <span>Pass Question (-5s)</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Live Twitch Spectator Feed */}
          <div className="lg:col-span-1">
            <TwitchSpectatorChat
              roomId={activeRoom.id}
              currentUser={profile}
              chat={activeRoom.chat || []}
              spectatorCount={(activeRoom.spectators || []).length}
              recentEmotes={activeRoom.recentEmotes || []}
              onSendMessage={(text) =>
                pushChatMessage({
                  senderId: profile.id,
                  senderName: profile.name,
                  avatar: profile.avatar,
                  text,
                })
              }
              onBurstEmote={handleBurstEmote}
            />
          </div>
        </div>
      )}

      {/* SCREEN 4: GAME OVER / VICTORY PODIUM */}
      {screen === "game_over" && winnerInfo && (
        <div className="max-w-md mx-auto text-center space-y-6 animate-scaleIn">
          <div className="rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-400/80 p-6 sm:p-8 text-white shadow-2xl shadow-amber-500/20">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center mx-auto mb-4 text-slate-950 shadow-xl shadow-amber-400/30">
              <Trophy className="w-8 h-8 fill-slate-950" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black mb-1">
              {winnerInfo.isCurrentUser ? "VICTORY ROYALE! 🏆" : "DEFEAT! 💀"}
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 mb-6">
              {winnerInfo.isCurrentUser
                ? `You outlasted your opponent on the clock!`
                : `${winnerInfo.winnerName} claimed the crown!`}
            </p>

            {/* Wager Payout Banner */}
            <div
              className={`p-4 rounded-2xl mb-6 border ${
                winnerInfo.isCurrentUser
                  ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
                  : "bg-red-950/60 border-red-500/40 text-red-300"
              }`}
            >
              <div className="text-xs font-bold uppercase tracking-wider mb-1">Wager Payout</div>
              <div className="text-3xl font-black font-mono">
                {winnerInfo.isCurrentUser ? `+${winnerInfo.wager * 2} XP` : `-${winnerInfo.wager} XP`}
              </div>
              <div className="text-[11px] mt-1 opacity-80">
                {winnerInfo.isCurrentUser
                  ? "Double your wager collected from opponent!"
                  : "Wager transferred to match champion."}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setScreen("room_setup");
                  setHostClock(60);
                  setGuestClock(60);
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 active:scale-95 transition-all"
              >
                Rematch Showdown
              </button>

              <button
                onClick={() => setScreen("lobby")}
                className="w-full py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                Return to Arena Lobby
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE ROOM MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Swords className="w-4 h-4 text-amber-500" />
                <span>Host Public Showdown Arena</span>
              </h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRoom} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Arena Match Title
                </label>
                <input
                  type="text"
                  value={createTitle}
                  onChange={(e) => setCreateTitle(e.target.value)}
                  placeholder={`${profile.name}'s Showdown Arena`}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Subject Focus
                </label>
                <select
                  value={createSubject}
                  onChange={(e) => setCreateSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-amber-500"
                >
                  <option value="all">⚡ All 8 Subjects Mixed (Random Showdown)</option>
                  {Object.entries(SUBJECTS_MAP).map(([id, s]) => (
                    <option key={id} value={id}>
                      {s.code}: {s.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Wager Amount (Winner Takes All)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {WAGER_OPTIONS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setCreateWager(amt)}
                      className={`py-2 rounded-xl border text-xs font-black transition-all ${
                        createWager === amt
                          ? "bg-amber-500 border-amber-400 text-slate-950 shadow-md"
                          : "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {amt} XP
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 active:scale-95"
                >
                  Open Arena
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
