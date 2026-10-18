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
  Check,
  Flag,
} from "lucide-react";

const SESSION_ROOM_KEY = "bscpe_active_battle_room_id";

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
  const { profile, addXp } = useUser();

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
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [answerFeedback, setAnswerFeedback] = useState(null); // { isCorrect, correctIndex }
  const [winnerInfo, setWinnerInfo] = useState(null);
  const [mobileMatchTab, setMobileMatchTab] = useState("stage"); // "stage" | "chat" on mobile
  const [liveClocks, setLiveClocks] = useState({ host: 60, guest: 60 });
  const [countdownSeconds, setCountdownSeconds] = useState(5);
  const [floatingReactions, setFloatingReactions] = useState([]);
  const [isSurrenderConfirmOpen, setIsSurrenderConfirmOpen] = useState(false);
  const [isSurrendering, setIsSurrendering] = useState(false);
  const seenEmoteIdsRef = useRef(new Set());

  // Polling ref for cloud rooms
  const pollTimerRef = useRef(null);
  const clockIntervalRef = useRef(null);
  const botTurnTimeoutRef = useRef(null);

  // Auto-reconnect across page refresh if player was in an active battle match
  useEffect(() => {
    let isCancelled = false;
    try {
      const savedRoomId = sessionStorage.getItem(SESSION_ROOM_KEY);
      if (savedRoomId && !activeRoom && screen === "lobby") {
        fetch(`/api/battle?roomId=${savedRoomId}`)
          .then((res) => res.json())
          .then((data) => {
            if (isCancelled) return;
            if (data.ok && data.room) {
              const r = data.room;
              if (r.status !== "finished") {
                setActiveRoom(r);
                setIsBotMatch(false);
                if (r.status === "in_battle") {
                  setScreen("playing");
                } else {
                  setScreen("room_setup");
                }
              } else {
                sessionStorage.removeItem(SESSION_ROOM_KEY);
              }
            } else {
              sessionStorage.removeItem(SESSION_ROOM_KEY);
            }
          })
          .catch(() => {
            if (!isCancelled) sessionStorage.removeItem(SESSION_ROOM_KEY);
          });
      }
    } catch (e) {}
    return () => {
      isCancelled = true;
    };
  }, []);

  // Synchronize active room session with sessionStorage
  useEffect(() => {
    try {
      if (activeRoom?.id && !isBotMatch && activeRoom.status !== "finished" && screen !== "game_over" && screen !== "lobby") {
        sessionStorage.setItem(SESSION_ROOM_KEY, activeRoom.id);
      } else if (screen === "lobby" || screen === "game_over" || activeRoom?.status === "finished") {
        sessionStorage.removeItem(SESSION_ROOM_KEY);
      }
    } catch (e) {}
  }, [activeRoom?.id, activeRoom?.status, isBotMatch, screen]);

  // Spawn floating reactions on the global arena overlay
  const spawnFloatingReaction = useCallback((emoji, senderName) => {
    const id = "bubble_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5);
    const randomLeft = Math.floor(Math.random() * 75) + 12; // 12% to 87%
    const newBubble = { id, emoji, senderName, left: randomLeft };

    setFloatingReactions((prev) => [...prev.slice(-25), newBubble]);

    setTimeout(() => {
      setFloatingReactions((prev) => prev.filter((b) => b.id !== id));
    }, 2400);
  }, []);

  // Helper roles
  const isHost = activeRoom?.host?.id === profile.id;
  const isGuest = activeRoom?.guest?.id === profile.id;
  const isPlayer = isHost || isGuest;
  const isSpectator = !isPlayer;

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
    const interval = setInterval(fetchRooms, 3500);
    return () => clearInterval(interval);
  }, [fetchRooms]);

  // 2. Poll Active Room State with Synchronized Transitions
  useEffect(() => {
    if (!activeRoom || isBotMatch || screen === "lobby") return;

    const pollActiveRoom = async () => {
      try {
        const res = await fetch(`/api/battle?roomId=${activeRoom.id}`);
        if (res.ok) {
          const data = await res.json();
          if (data.room) {
            const r = data.room;
            setActiveRoom(r);

            // Synchronized screen transitions:
            if (r.status === "in_battle" && screen !== "playing" && screen !== "game_over") {
              setScreen("playing");
            } else if (r.status === "finished" && screen !== "game_over") {
              handleMatchEnd(r.gameState.winnerId, r);
            }
          }
        }
      } catch (e) {}
    };

    pollTimerRef.current = setInterval(pollActiveRoom, 1400);
    return () => clearInterval(pollTimerRef.current);
  }, [activeRoom?.id, isBotMatch, screen]);

  // 3. Authoritative Live Clock Evaluation (Derives from turnStartedAt so timer NEVER refills!)
  useEffect(() => {
    if (screen !== "playing" || !activeRoom?.gameState) return;

    const updateClocks = () => {
      const gs = activeRoom.gameState;
      const now = Date.now();

      if (activeRoom.status !== "in_battle" || !gs.turnStartedAt) {
        setLiveClocks({ host: gs.hostClock ?? 60, guest: gs.guestClock ?? 60 });
        return;
      }

      // If active player is currently in 3s penalty halt
      const elapsed = Math.max(0, (now - gs.turnStartedAt) / 1000);
      const isHostTurn = gs.activePlayerId === activeRoom.host.id;
      const isGuestTurn = gs.activePlayerId === activeRoom.guest?.id;

      const currentHost = isHostTurn
        ? Math.max(0, +(gs.hostClock - elapsed).toFixed(1))
        : (gs.hostClock ?? 60);

      const currentGuest = isGuestTurn
        ? Math.max(0, +(gs.guestClock - elapsed).toFixed(1))
        : (gs.guestClock ?? 60);

      setLiveClocks({ host: currentHost, guest: currentGuest });

      // Audio ticks when active player clock < 10s
      const activeClock = isHostTurn ? currentHost : currentGuest;
      if (activeClock <= 10 && activeClock > 0 && Math.round(activeClock * 10) % 10 === 0) {
        sound.playClockTick();
      }

      // Timeout check (only trigger once by active player or host)
      if (activeClock <= 0 && !gs.winnerId) {
        const loserId = isHostTurn ? activeRoom.host.id : activeRoom.guest?.id;
        handleTimeout(loserId);
      }
    };

    updateClocks();
    clockIntervalRef.current = setInterval(updateClocks, 100);
    return () => clearInterval(clockIntervalRef.current);
  }, [screen, activeRoom]);

  // 4. Synchronized 5-Second Countdown Logic
  useEffect(() => {
    if (activeRoom?.status !== "countdown" || !activeRoom.countdownEnd) return;

    const updateCountdown = () => {
      const remaining = Math.max(0, Math.ceil((activeRoom.countdownEnd - Date.now()) / 1000));
      setCountdownSeconds(remaining);

      if (remaining > 0) {
        sound.playClockTick();
      } else if (remaining === 0) {
        // Trigger coin toss
        if (isHost || isBotMatch) {
          triggerCoinToss();
        }
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [activeRoom?.status, activeRoom?.countdownEnd, isHost, isBotMatch]);

  // 5. Synchronized Floating Emotes from all peers & spectators across all screens
  useEffect(() => {
    if (!activeRoom?.recentEmotes || activeRoom.recentEmotes.length === 0) return;

    const now = Date.now();
    activeRoom.recentEmotes.forEach((em) => {
      if (!em || !em.id) return;

      if (!seenEmoteIdsRef.current.has(em.id)) {
        seenEmoteIdsRef.current.add(em.id);
        // Only trigger float animation if emitted within the last 7 seconds
        if (now - (em.createdAt || now) < 7000) {
          spawnFloatingReaction(em.emoji, em.senderName);
          sound.playPop();
        }
      }
    });

    if (seenEmoteIdsRef.current.size > 200) {
      const arr = Array.from(seenEmoteIdsRef.current);
      seenEmoteIdsRef.current = new Set(arr.slice(-100));
    }
  }, [activeRoom?.recentEmotes, spawnFloatingReaction]);

  // 6. Bot Match Simulation Loop
  useEffect(() => {
    if (!isBotMatch || screen !== "playing") return;
    if (activeRoom?.gameState?.activePlayerId !== BOT_PLAYER.id) return;

    const botThinkTime = Math.floor(Math.random() * 2200) + 2000;
    const curQ = activeRoom.questions?.[activeRoom.gameState.questionIndex] || {};

    botTurnTimeoutRef.current = setTimeout(() => {
      const roll = Math.random();

      if (roll < 0.82) {
        // Correct answer!
        sound.playCorrect();
        const elapsed = (Date.now() - activeRoom.gameState.turnStartedAt) / 1000;
        const newGuestClock = Math.max(1, +(activeRoom.gameState.guestClock - elapsed).toFixed(1));

        setActiveRoom((prev) => ({
          ...prev,
          gameState: {
            ...prev.gameState,
            guestClock: newGuestClock,
            activePlayerId: prev.host.id,
            questionIndex: prev.gameState.questionIndex + 1,
            turnStartedAt: Date.now(),
            haltUntil: 0,
            lastAnswer: {
              playerId: BOT_PLAYER.id,
              choiceIndex: curQ.correctAnswer,
              isCorrect: true,
              timestamp: Date.now(),
            },
          },
        }));

        pushChatMessage({
          senderId: BOT_PLAYER.id,
          senderName: BOT_PLAYER.name,
          avatar: BOT_PLAYER.avatar,
          text: "Na-solve ko agad sa memory! Your turn classmate! ⚡",
        });
      } else if (roll < 0.92) {
        // Wrong answer -> 3s penalty
        sound.playBuzzer();
        setActiveRoom((prev) => ({
          ...prev,
          gameState: {
            ...prev.gameState,
            haltUntil: Date.now() + 3000,
            lastAnswer: {
              playerId: BOT_PLAYER.id,
              choiceIndex: (curQ.correctAnswer + 1) % 4,
              isCorrect: false,
              timestamp: Date.now(),
            },
          },
        }));

        pushChatMessage({
          senderId: BOT_PLAYER.id,
          senderName: BOT_PLAYER.name,
          avatar: BOT_PLAYER.avatar,
          text: "Mali ako sa conversion! 3s halt penalty aray! 😵",
        });

        // After 3s halt, bot corrects it
        setTimeout(() => {
          sound.playCorrect();
          setActiveRoom((prev) => ({
            ...prev,
            gameState: {
              ...prev.gameState,
              activePlayerId: prev.host.id,
              questionIndex: prev.gameState.questionIndex + 1,
              turnStartedAt: Date.now(),
              haltUntil: 0,
            },
          }));
        }, 3100);
      } else {
        // Bot passes -> 5s penalty
        sound.playPass();
        const elapsed = (Date.now() - activeRoom.gameState.turnStartedAt) / 1000;
        const penalizedTime = Math.max(0, +(activeRoom.gameState.guestClock - elapsed - 5).toFixed(1));

        setActiveRoom((prev) => ({
          ...prev,
          gameState: {
            ...prev.gameState,
            guestClock: penalizedTime,
            activePlayerId: prev.host.id,
            questionIndex: prev.gameState.questionIndex + 1,
            turnStartedAt: Date.now(),
            haltUntil: 0,
          },
        }));

        pushChatMessage({
          senderId: BOT_PLAYER.id,
          senderName: BOT_PLAYER.name,
          avatar: BOT_PLAYER.avatar,
          text: "Nalito ako sa formula! Tactical PASS (-5s)! ⏩",
        });
      }
    }, botThinkTime);

    return () => clearTimeout(botTurnTimeoutRef.current);
  }, [isBotMatch, screen, activeRoom]);

  // Timeout Handler
  const handleTimeout = async (loserId) => {
    sound.playBuzzer();
    const isHostLoser = activeRoom?.host?.id === loserId;
    const winner = isHostLoser ? activeRoom?.guest : activeRoom?.host;

    if (!isBotMatch && activeRoom?.id) {
      try {
        await fetch("/api/battle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "leave_room",
            roomId: activeRoom.id,
            studentId: loserId,
          }),
        });
      } catch (e) {}
    }

    handleMatchEnd(winner?.id);
  };

  // Match End Handler
  const handleMatchEnd = (winnerId, latestRoom = null) => {
    try {
      sessionStorage.removeItem(SESSION_ROOM_KEY);
    } catch (e) {}

    const room = latestRoom || activeRoom;
    if (!room) return;

    const isWinner = profile.id === winnerId;
    const wager = room.wager || 250;

    setWinnerInfo({
      winnerId,
      winnerName: winnerId === room.host.id ? room.host.name : room.guest?.name,
      isCurrentUser: isWinner,
      wager,
    });

    setScreen("game_over");

    if (isPlayer) {
      if (isWinner) {
        sound.playFanfare();
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
        addXp(wager * 2, `1v1 Battle Exam Victory (Won Pot!)`);
      } else {
        sound.playWomp();
        const penalty = Math.min(profile.xp, wager);
        addXp(-penalty, `1v1 Battle Exam Defeat (Lost Wager)`);
      }
    }
  };

  // Forfeit / Surrender Match Handler
  const handleSurrender = async () => {
    if (!isPlayer || !activeRoom) return;
    setIsSurrendering(true);
    sound.playWomp();

    try {
      sessionStorage.removeItem(SESSION_ROOM_KEY);
    } catch (e) {}

    if (isBotMatch) {
      setIsSurrenderConfirmOpen(false);
      setIsSurrendering(false);
      handleMatchEnd(BOT_PLAYER.id);
      return;
    }

    try {
      const res = await fetch("/api/battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "surrender",
          roomId: activeRoom.id,
          studentId: profile.id,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setIsSurrenderConfirmOpen(false);
        if (data.room) {
          setActiveRoom(data.room);
          handleMatchEnd(data.room.gameState?.winnerId, data.room);
        }
      }
    } catch (e) {
      alert("Failed to submit forfeit. Please check your connection.");
    } finally {
      setIsSurrendering(false);
    }
  };

  // Leave Match Lobby Handler (Waiting / Countdown room)
  const handleLeaveLobby = async () => {
    try {
      sessionStorage.removeItem(SESSION_ROOM_KEY);
    } catch (e) {}

    if (isBotMatch) {
      setActiveRoom(null);
      setIsBotMatch(false);
      setScreen("lobby");
      return;
    }

    if (activeRoom?.id) {
      try {
        await fetch("/api/battle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "leave_room",
            roomId: activeRoom.id,
            studentId: profile.id,
          }),
        });
      } catch (e) {}
    }

    setActiveRoom(null);
    setScreen("lobby");
    fetchRooms();
  };

  // Leave Spectator Feed Handler
  const handleLeaveSpectator = async () => {
    try {
      sessionStorage.removeItem(SESSION_ROOM_KEY);
    } catch (e) {}

    if (activeRoom?.id && !isBotMatch) {
      try {
        await fetch("/api/battle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "leave_room",
            roomId: activeRoom.id,
            studentId: profile.id,
          }),
        });
      } catch (e) {}
    }

    setActiveRoom(null);
    setScreen("lobby");
    fetchRooms();
  };

  // 6. Start Practice vs Bot Match
  const handleStartBotMatch = () => {
    const questions = getBattleQuestions(createSubject);
    setIsBotMatch(true);

    const botRoom = {
      id: "bot_match_" + Date.now(),
      title: "Solo Practice vs Dean's Lister AI",
      subject: createSubject,
      wager: createWager,
      status: "waiting",
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
      hostReady: false,
      guestReady: true, // Bot is always ready!
      countdownEnd: null,
      spectators: [
        { id: "spec1", name: "Audience Bot A", avatar: "/avatars/bean-female-laptop.jpg" },
        { id: "spec2", name: "Reviewer Fan", avatar: "/avatars/bean-female-graduate.jpg" },
      ],
      questions,
      coinToss: { winnerId: null, flippedAt: null, sideLand: null },
      gameState: {
        activePlayerId: null,
        questionIndex: 0,
        hostClock: 60,
        guestClock: 60,
        turnStartedAt: null,
        haltUntil: 0,
        winnerId: null,
        lastAnswer: null,
      },
      chat: [
        {
          id: "c_1",
          type: "event",
          text: "⚡ 1v1 Battle Exam: Player vs AI Dean's Lister initialized! Press READY to start countdown!",
          senderName: "Arena System",
          createdAt: Date.now(),
        },
      ],
      recentEmotes: [],
    };

    setActiveRoom(botRoom);
    setScreen("room_setup");
    sound.playGameShowIntro();
  };

  // 7. Create Public Multiplayer Room
  const handleCreateRoom = async (e) => {
    e?.preventDefault();
    const questions = getBattleQuestions(createSubject);

    try {
      const res = await fetch("/api/battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_room",
          title: createTitle.trim() || `${profile.name}'s Showdown`,
          subject: createSubject,
          wager: createWager,
          questions,
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

  // 8. Join Existing Room (as Challenger or Spectator)
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
          setScreen(data.room.status === "in_battle" ? "playing" : "room_setup");
          sound.playGameShowIntro();
        }
      }
    } catch (e) {
      alert("Unable to join room. Please try again.");
    }
  };

  // 9. Toggle Ready Status
  const handleToggleReady = async () => {
    if (!isPlayer) return;
    sound.playTap();

    if (isBotMatch) {
      const nextHostReady = !activeRoom.hostReady;
      if (nextHostReady) {
        // Trigger 5-second countdown!
        setActiveRoom((prev) => ({
          ...prev,
          hostReady: true,
          status: "countdown",
          countdownEnd: Date.now() + 5000,
        }));
      } else {
        setActiveRoom((prev) => ({
          ...prev,
          hostReady: false,
          status: "waiting",
          countdownEnd: null,
        }));
      }
      return;
    }

    try {
      const res = await fetch("/api/battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggle_ready",
          roomId: activeRoom.id,
          studentId: profile.id,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.room) {
          setActiveRoom(data.room);
        }
      }
    } catch (e) {}
  };

  // 10. Trigger Coin Toss after 5s Countdown
  const triggerCoinToss = async () => {
    if (isBotMatch) {
      const isHostWinner = Math.random() < 0.5;
      const winnerId = isHostWinner ? activeRoom.host.id : activeRoom.guest.id;
      setActiveRoom((prev) => ({
        ...prev,
        status: "tossing_coin",
        coinToss: {
          winnerId,
          flippedAt: Date.now(),
          sideLand: isHostWinner ? "host" : "guest",
        },
        gameState: {
          ...prev.gameState,
          activePlayerId: winnerId,
          turnStartedAt: Date.now() + 4200,
        },
      }));
      return;
    }

    try {
      const res = await fetch("/api/battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "start_coin_toss",
          roomId: activeRoom.id,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.room) setActiveRoom(data.room);
      }
    } catch (e) {}
  };

  // 11. When Coin Toss Animation Finishes -> Enter Battle!
  const handleCoinTossComplete = () => {
    setScreen("playing");
    sound.playStreak();
  };

  // 12. Submit Answer
  const handleSelectAnswer = async (choiceIndex) => {
    if (!isPlayer) return; // Spectators cannot answer!
    const gs = activeRoom?.gameState;
    if (gs?.activePlayerId !== profile.id) return; // Not your turn!
    if (gs?.haltUntil && gs.haltUntil > Date.now()) return; // Locked out!

    const currentQ = activeRoom?.questions?.[gs?.questionIndex || 0];
    if (!currentQ) return;

    setSelectedChoice(choiceIndex);
    const isCorrect = choiceIndex === currentQ.correctAnswer;

    if (isCorrect) {
      sound.playCorrect();
      setAnswerFeedback({ isCorrect: true, correctIndex: currentQ.correctAnswer });
    } else {
      sound.playBuzzer();
      setAnswerFeedback({ isCorrect: false, correctIndex: currentQ.correctAnswer });
    }

    if (isBotMatch) {
      const elapsed = (Date.now() - gs.turnStartedAt) / 1000;
      if (isCorrect) {
        const newHostClock = Math.max(1, +(gs.hostClock - elapsed).toFixed(1));
        setTimeout(() => {
          setAnswerFeedback(null);
          setSelectedChoice(null);
          setActiveRoom((prev) => ({
            ...prev,
            gameState: {
              ...prev.gameState,
              hostClock: newHostClock,
              activePlayerId: BOT_PLAYER.id,
              questionIndex: prev.gameState.questionIndex + 1,
              turnStartedAt: Date.now(),
              haltUntil: 0,
            },
          }));
        }, 850);
      } else {
        setActiveRoom((prev) => ({
          ...prev,
          gameState: {
            ...prev.gameState,
            haltUntil: Date.now() + 3000,
          },
        }));
        setTimeout(() => {
          setAnswerFeedback(null);
          setSelectedChoice(null);
        }, 3000);
      }
      return;
    }

    // Multiplayer Cloud Action
    try {
      const res = await fetch("/api/battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit_answer",
          roomId: activeRoom.id,
          studentId: profile.id,
          isCorrect,
          choiceIndex,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.room) setActiveRoom(data.room);
      }
    } catch (e) {}

    setTimeout(() => {
      setAnswerFeedback(null);
      setSelectedChoice(null);
    }, isCorrect ? 850 : 3000);
  };

  // 13. Tactical Pass Question (-5s Penalty + Pass Turn)
  const handlePassQuestion = async () => {
    if (!isPlayer) return;
    const gs = activeRoom?.gameState;
    if (gs?.activePlayerId !== profile.id) return;
    if (gs?.haltUntil && gs.haltUntil > Date.now()) return;

    const currentQ = activeRoom?.questions?.[gs?.questionIndex || 0];
    if (!currentQ) return;

    sound.playPass();
    setAnswerFeedback({ isCorrect: false, correctIndex: currentQ.correctAnswer });

    if (isBotMatch) {
      const elapsed = (Date.now() - gs.turnStartedAt) / 1000;
      const penalized = Math.max(0, +(gs.hostClock - elapsed - 5).toFixed(1));

      if (penalized <= 0) {
        handleTimeout(profile.id);
        return;
      }

      setTimeout(() => {
        setAnswerFeedback(null);
        setSelectedChoice(null);
        setActiveRoom((prev) => ({
          ...prev,
          gameState: {
            ...prev.gameState,
            hostClock: penalized,
            activePlayerId: BOT_PLAYER.id,
            questionIndex: prev.gameState.questionIndex + 1,
            turnStartedAt: Date.now(),
            haltUntil: 0,
          },
        }));
      }, 1100);
      return;
    }

    try {
      const res = await fetch("/api/battle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "pass_question",
          roomId: activeRoom.id,
          studentId: profile.id,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.room) setActiveRoom(data.room);
      }
    } catch (e) {}

    setTimeout(() => {
      setAnswerFeedback(null);
      setSelectedChoice(null);
    }, 1100);
  };

  // 14. Twitch Chat Helper
  const pushChatMessage = async (msg) => {
    if (!activeRoom) return;
    const newChat = [...(activeRoom.chat || []), { ...msg, id: "c_" + Date.now(), createdAt: Date.now() }];
    setActiveRoom((r) => ({ ...r, chat: newChat }));

    if (!isBotMatch && activeRoom?.id) {
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

  // 15. Burst Reaction Emotes (Instant local preview + server sync to all participants)
  const handleBurstEmote = async (emoji) => {
    if (!activeRoom) return;

    const emoteId = "em_" + Date.now() + "_" + Math.random().toString(36).substr(2, 5);
    const senderName = profile.name || "Contender";
    const newEmote = { id: emoteId, emoji, senderName, createdAt: Date.now() };

    // Register locally immediately so incoming poll doesn't duplicate it
    seenEmoteIdsRef.current.add(emoteId);
    spawnFloatingReaction(emoji, senderName);
    sound.playPop();

    // Optimistically update local activeRoom
    setActiveRoom((r) => ({
      ...r,
      recentEmotes: [...(r.recentEmotes || []).slice(-25), newEmote],
    }));

    // If bot match, simulated bot or audience response
    if (isBotMatch) {
      if (Math.random() < 0.45) {
        setTimeout(() => {
          const botEmotes = ["🔥", "⚡", "🤖", "👏", "😱"];
          const botPick = botEmotes[Math.floor(Math.random() * botEmotes.length)];
          spawnFloatingReaction(botPick, BOT_PLAYER.name);
          sound.playPop();
        }, 800 + Math.random() * 1200);
      }
      return;
    }

    if (activeRoom?.id) {
      try {
        fetch("/api/battle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "burst_emote",
            roomId: activeRoom.id,
            emoji,
            senderName,
            emoteId,
          }),
        }).catch(() => {});
      } catch (e) {}
    }
  };

  // Current Question Object
  const currentQuestionIdx = activeRoom?.gameState?.questionIndex || 0;
  const currentQuestion = activeRoom?.questions?.[currentQuestionIdx] || {
    question: "Synchronizing midterm battle question from arena server...",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: 0,
    subjectCode: "BSCPE",
  };

  const isMyTurn = isPlayer && activeRoom?.gameState?.activePlayerId === profile.id;
  const isHalted = activeRoom?.gameState?.haltUntil && activeRoom.gameState.haltUntil > Date.now();
  const haltRemaining = Math.max(0, Math.ceil(((activeRoom?.gameState?.haltUntil || 0) - Date.now()) / 1000));

  // Determine readiness for current user
  const amIReady = isHost ? activeRoom?.hostReady : isGuest ? activeRoom?.guestReady : false;

  return (
    <div className="space-y-6 animate-fadeIn relative">
      {/* GLOBAL SYNCHRONIZED FLOATING REACTIONS OVERLAY (Visible across ALL participants & spectators) */}
      <div className="fixed inset-0 pointer-events-none z-[60] overflow-hidden">
        {floatingReactions.map((reaction) => (
          <div
            key={reaction.id}
            className="absolute bottom-16 sm:bottom-20 flex flex-col items-center animate-floatUp select-none filter drop-shadow-2xl"
            style={{ left: `${reaction.left}%` }}
          >
            <span className="text-4xl sm:text-5xl filter drop-shadow-md">
              {reaction.emoji}
            </span>
            {reaction.senderName && (
              <span className="mt-1 px-2.5 py-0.5 rounded-full bg-white/95 dark:bg-slate-900/95 border border-amber-400/60 dark:border-amber-500/50 text-[10px] sm:text-xs font-black text-slate-900 dark:text-amber-300 tracking-wide shadow-xl whitespace-nowrap backdrop-blur-md">
                {reaction.senderName}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* 5-SECOND SYNCHRONIZED COUNTDOWN OVERLAY (Both Players & Spectators see this) */}
      {activeRoom?.status === "countdown" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 dark:bg-slate-950/90 backdrop-blur-md animate-fadeIn">
          <div className="text-center space-y-4 max-w-sm p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-700 dark:text-amber-300 text-xs font-black uppercase animate-pulse">
              <Flame className="w-4 h-4 fill-amber-400 text-amber-500" />
              <span>Both Players Ready!</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Tossing Coin In...
            </h2>
            <div className="text-7xl sm:text-8xl font-black font-mono text-amber-500 dark:text-amber-400 animate-ping">
              {countdownSeconds}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {isSpectator ? "👀 Spectator View: Get ready to watch the 3D coin toss!" : "Who will face Question 1? Coin spinning shortly!"}
            </p>
          </div>
        </div>
      )}

      {/* SYNCHRONIZED 3D COIN TOSS MODAL (Visible to Host, Challenger, & Spectators) */}
      {activeRoom?.status === "tossing_coin" && (
        <CoinTossModal
          host={activeRoom.host}
          guest={activeRoom.guest}
          winnerId={activeRoom.coinToss?.winnerId}
          onComplete={handleCoinTossComplete}
        />
      )}

      {/* SCREEN 1: LOBBY BROWSER */}
      {screen === "lobby" && (
        <div className="space-y-6">
          {/* Hero Banner */}
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
                  Enter dynamic public showdown lobbies, ready up with your opponent, watch the 3D coin toss, 
                  and battle on synchronized 60-second chess clocks with live Twitch spectator chat!
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
                    const isMyGuest = room.guest?.id === profile.id;
                    const isParticipant = isMyRoom || isMyGuest;
                    const isRoomInBattle = room.status === "in_battle" || room.status === "tossing_coin";

                    return (
                      <div
                        key={room.id}
                        className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 hover:border-blue-500/50 transition-all flex flex-col justify-between gap-4 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-amber-400/80 shrink-0 bg-slate-100 dark:bg-slate-900">
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
                            <span>{isRoomInBattle ? "🔴 In Battle" : isFull ? "2/2 (Readying)" : "1/2 (Challenger Needed)"}</span>
                            <span className="text-slate-300">•</span>
                            <Eye className="w-3.5 h-3.5 text-emerald-500" />
                            <span>{room.spectatorCount || 0} watching</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {isParticipant && (isRoomInBattle || room.status === "countdown") ? (
                              <button
                                onClick={() => handleJoinRoom(room, isMyGuest)}
                                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 animate-pulse"
                              >
                                <Swords className="w-3.5 h-3.5" />
                                <span>Rejoin Battle ⚔️</span>
                              </button>
                            ) : isParticipant && !isRoomInBattle ? (
                              <button
                                onClick={() => handleJoinRoom(room, isMyGuest)}
                                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs flex items-center gap-1 shadow-md shadow-blue-500/20 active:scale-95"
                              >
                                <Swords className="w-3.5 h-3.5" />
                                <span>{isMyRoom ? "Enter Arena" : "Rejoin Lobby"}</span>
                              </button>
                            ) : isRoomInBattle || (isFull && !isParticipant) ? (
                              <button
                                onClick={() => handleJoinRoom(room, false)}
                                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm active:scale-95"
                              >
                                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Spectate Live</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => handleJoinRoom(room, true)}
                                className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs flex items-center gap-1 shadow-md shadow-blue-500/20 active:scale-95"
                              >
                                <Swords className="w-3.5 h-3.5" />
                                <span>Accept Challenge</span>
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

      {/* SCREEN 2: ROOM SETUP / MATCHMAKING (With Synchronized Ready Protocol) */}
      {screen === "room_setup" && activeRoom && (
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="relative rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-slate-900 dark:text-white text-center shadow-xl">
            {/* Header Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-400/30 text-blue-800 dark:text-blue-300 text-xs font-black uppercase">
                <Zap className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>Match Lobby #{activeRoom.id?.slice(-4)}</span>
              </span>

              {isSpectator && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-200 dark:border-emerald-400/30 text-emerald-800 dark:text-emerald-300 text-xs font-black uppercase">
                  <Eye className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                  <span>Live Audience Spectator Mode</span>
                </span>
              )}
            </div>

            <h2 className="text-xl sm:text-3xl font-black mb-1 text-slate-900 dark:text-white">{activeRoom.title}</h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-8">
              Subject: <span className="text-amber-600 dark:text-amber-400 font-bold">{activeRoom.subject === "all" ? "All 8 Subjects Mixed" : activeRoom.subject.toUpperCase()}</span> • Total Pot: <span className="text-emerald-600 dark:text-emerald-400 font-bold">{activeRoom.wager * 2} XP</span>
            </p>

            {/* Versus Cards with Clear Ready Status Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative items-center max-w-xl mx-auto mb-8">
              {/* Host Card */}
              <div className={`p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border-2 transition-all flex flex-col items-center gap-2 shadow-sm dark:shadow-lg ${
                activeRoom.hostReady ? "border-emerald-500 shadow-emerald-500/20" : "border-amber-400/60 shadow-amber-500/10"
              }`}>
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-amber-400 shadow-md bg-slate-100 dark:bg-slate-900">
                  <StudentAvatar avatar={activeRoom.host.avatar} customPhoto={activeRoom.host.customPhoto} className="w-full h-full object-cover" />
                </div>
                <span className="text-sm font-black truncate max-w-[160px] text-slate-900 dark:text-white">{activeRoom.host.name}</span>
                <span className="text-[10px] text-amber-800 dark:text-amber-400 font-bold bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-500/40">
                  HOST • {activeRoom.host.section}
                </span>

                {/* Readiness Indicator */}
                <div className="mt-1">
                  {activeRoom.hostReady ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-500/40">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>READY!</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold text-slate-600 dark:text-amber-300/80 bg-slate-200/80 dark:bg-amber-950/50 px-3 py-1 rounded-full border border-slate-300 dark:border-amber-500/30">
                      Waiting to Ready...
                    </span>
                  )}
                </div>
              </div>

              {/* VS Pill Center */}
              <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-red-600 items-center justify-center font-black text-xs text-white shadow-xl z-10 border-2 border-white dark:border-slate-900">
                VS
              </div>

              {/* Guest / Challenger Card */}
              <div className={`p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border-2 transition-all flex flex-col items-center gap-2 shadow-sm dark:shadow-lg ${
                activeRoom.guestReady ? "border-emerald-500 shadow-emerald-500/20" : "border-indigo-400/60 shadow-indigo-500/10"
              }`}>
                {activeRoom.guest ? (
                  <>
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-400 shadow-md bg-slate-100 dark:bg-slate-900">
                      <StudentAvatar avatar={activeRoom.guest.avatar} customPhoto={activeRoom.guest.customPhoto} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-sm font-black truncate max-w-[160px] text-slate-900 dark:text-white">{activeRoom.guest.name}</span>
                    <span className="text-[10px] text-indigo-800 dark:text-indigo-300 font-bold bg-indigo-100 dark:bg-indigo-950/80 px-2 py-0.5 rounded-full border border-indigo-300 dark:border-indigo-500/40">
                      {activeRoom.guest.isBot ? "AI BOT" : "CHALLENGER"} • {activeRoom.guest.section}
                    </span>

                    {/* Readiness Indicator */}
                    <div className="mt-1">
                      {activeRoom.guestReady ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-300 dark:border-emerald-500/40">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>READY!</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-bold text-slate-600 dark:text-indigo-300/80 bg-slate-200/80 dark:bg-indigo-950/50 px-3 py-1 rounded-full border border-slate-300 dark:border-indigo-500/30">
                          Waiting to Ready...
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center py-6 text-slate-500 dark:text-slate-400">
                    <Users className="w-10 h-10 mb-2 animate-pulse text-indigo-500 dark:text-indigo-400" />
                    <p className="text-xs font-bold text-slate-700 dark:text-slate-300">Waiting for Challenger...</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Classmates can join from the lobby!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Action Bar (Players get READY button, Spectators get live status) */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={handleLeaveLobby}
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                Leave Lobby
              </button>

              {isPlayer ? (
                <button
                  onClick={handleToggleReady}
                  disabled={!activeRoom.guest}
                  className={`px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-all flex items-center gap-2 ${
                    amIReady
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 ring-2 ring-emerald-400"
                      : "bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-amber-500/25 disabled:opacity-40"
                  }`}
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>{amIReady ? "✓ You are Ready! (Tap to Cancel)" : "Ready for Battle ⚡"}</span>
                </button>
              ) : (
                <div className="px-6 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-xs font-black text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                  <span>Waiting for {activeRoom.host.name} & {activeRoom.guest?.name || "Challenger"} to press Ready...</span>
                </div>
              )}
            </div>

            {/* Quick Cheer Reaction Dock in Match Lobby */}
            <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-center gap-2">
              <span className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5 mr-1">
                <Flame className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>Cheer & Hype:</span>
              </span>
              {["🔥", "💀", "⚡", "🍿", "👏", "😱", "🎯", "🧠"].map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => handleBurstEmote(emoji)}
                  className="p-1.5 hover:scale-125 active:scale-90 text-xl transition-transform focus:outline-none"
                  title={`Cheer with ${emoji}`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SCREEN 3: ACTIVE 60S BLITZ SHOWDOWN (Synchronized Clocks, Questions, & Spectator View) */}
      {screen === "playing" && activeRoom && (
        <div className="space-y-4">
          {/* Top Active Match Control Bar */}
          <div className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0" />
              <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate">
                {activeRoom.title}
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-500/30 shrink-0">
                <Zap className="w-3 h-3 fill-amber-400" />
                <span>{activeRoom.wager * 2} XP Pot</span>
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {isPlayer ? (
                <button
                  onClick={() => setIsSurrenderConfirmOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/60 dark:hover:bg-red-900/60 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs font-black flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs cursor-pointer"
                  title="Concede and forfeit this match"
                >
                  <Flag className="w-3.5 h-3.5 text-red-500 stroke-[2.5]" />
                  <span>Surrender Match</span>
                </button>
              ) : (
                <button
                  onClick={handleLeaveSpectator}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-bold transition-all active:scale-95 cursor-pointer"
                >
                  Exit Spectator
                </button>
              )}
            </div>
          </div>

          {/* Spectator Mode Top Notice Bar */}
          {isSpectator && (
            <div className="px-4 py-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 text-emerald-900 dark:text-emerald-200 text-xs font-bold flex items-center justify-between shadow-sm dark:shadow-lg">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
                <span>👀 Spectator Mode Active • Watching {activeRoom.host.name} vs {activeRoom.guest?.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 uppercase tracking-wider font-mono">
                  {activeRoom.spectators?.length || 1} Watching
                </span>
                <button
                  onClick={handleLeaveSpectator}
                  className="px-2.5 py-0.5 rounded-lg bg-emerald-200/80 hover:bg-emerald-300 dark:bg-emerald-900/60 dark:hover:bg-emerald-800 text-emerald-900 dark:text-emerald-200 text-[10px] font-black uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Leave
                </button>
              </div>
            </div>
          )}

          {/* Mobile Tab Switcher (< lg) */}
          <div className="lg:hidden flex items-center justify-center p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-lg">
            <button
              onClick={() => setMobileMatchTab("stage")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                mobileMatchTab === "stage"
                  ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <Swords className="w-3.5 h-3.5" />
              <span>Showdown Stage</span>
            </button>
            <button
              onClick={() => setMobileMatchTab("chat")}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                mobileMatchTab === "chat"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span>Audience Chat ({(activeRoom.spectators || []).length})</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            {/* Main Battle Stage */}
            <div className={`lg:col-span-2 space-y-4 ${mobileMatchTab === "chat" ? "hidden lg:block" : "block"}`}>
              {/* Dual Chess Clocks (Authoritative & Smooth) */}
              <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                {/* Host Clock */}
                <div
                  className={`p-3 sm:p-5 rounded-2xl border-2 transition-all relative overflow-hidden ${
                    activeRoom.gameState?.activePlayerId === activeRoom.host.id
                      ? "bg-amber-50/80 dark:bg-slate-900 border-amber-400 shadow-md dark:shadow-xl dark:shadow-amber-500/20"
                      : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-80 dark:opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1.5 mb-1.5 sm:mb-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-amber-400 bg-slate-100 dark:bg-slate-900 shrink-0">
                        <StudentAvatar avatar={activeRoom.host.avatar} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate max-w-[70px] sm:max-w-none">
                        {activeRoom.host.name}
                      </span>
                    </div>
                    {activeRoom.gameState?.activePlayerId === activeRoom.host.id && (
                      <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-400 animate-pulse bg-amber-100 dark:bg-amber-950 px-1.5 sm:px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-500/40 shrink-0">
                        ON CLOCK
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span
                      className={`text-2xl sm:text-4xl font-mono font-black ${
                        liveClocks.host <= 10 ? "text-red-500 animate-ping" : "text-amber-600 dark:text-amber-400"
                      }`}
                    >
                      {Math.ceil(liveClocks.host)}s
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      POT: {activeRoom.wager * 2} XP
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-100 ${
                        liveClocks.host <= 10 ? "bg-red-500" : "bg-amber-500 dark:bg-amber-400"
                      }`}
                      style={{ width: `${(liveClocks.host / 60) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Guest Clock */}
                <div
                  className={`p-3 sm:p-5 rounded-2xl border-2 transition-all relative overflow-hidden ${
                    activeRoom.gameState?.activePlayerId === activeRoom.guest?.id
                      ? "bg-indigo-50/80 dark:bg-slate-900 border-indigo-400 shadow-md dark:shadow-xl dark:shadow-indigo-500/20"
                      : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 opacity-80 dark:opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between gap-1.5 mb-1.5 sm:mb-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-indigo-400 bg-slate-100 dark:bg-slate-900 shrink-0">
                        <StudentAvatar avatar={activeRoom.guest?.avatar} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-xs sm:text-sm font-black text-slate-900 dark:text-white truncate max-w-[70px] sm:max-w-none">
                        {activeRoom.guest?.name}
                      </span>
                    </div>
                    {activeRoom.gameState?.activePlayerId === activeRoom.guest?.id && (
                      <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-indigo-800 dark:text-indigo-400 animate-pulse bg-indigo-100 dark:bg-indigo-950 px-1.5 sm:px-2 py-0.5 rounded-full border border-indigo-300 dark:border-indigo-500/40 shrink-0">
                        ON CLOCK
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline justify-between">
                    <span
                      className={`text-2xl sm:text-4xl font-mono font-black ${
                        liveClocks.guest <= 10 ? "text-red-500 animate-ping" : "text-indigo-600 dark:text-indigo-400"
                      }`}
                    >
                      {Math.ceil(liveClocks.guest)}s
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                      {activeRoom.guest?.isBot ? "AI BOT" : "RIVAL"}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-100 ${
                        liveClocks.guest <= 10 ? "bg-red-500" : "bg-indigo-500 dark:bg-indigo-400"
                      }`}
                      style={{ width: `${(liveClocks.guest / 60) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Synchronized Question Card Arena */}
              <div className="relative rounded-3xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-4 sm:p-7 shadow-xl overflow-hidden min-h-[340px] flex flex-col justify-between">
                {/* 3-Second Penalty Halt Lockout Overlay */}
                {isHalted && (
                  <div className="absolute inset-0 z-30 bg-red-950/90 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center text-white animate-fadeIn">
                    <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-red-400 mb-2 animate-bounce" />
                    <h3 className="text-lg sm:text-2xl font-black text-red-200">
                      INCORRECT CHOICE! 🛑
                    </h3>
                    <p className="text-xs text-red-300 font-semibold mt-1 mb-4">
                      Locked out for 3 seconds penalty!
                    </p>
                    <span className="text-3xl sm:text-4xl font-mono font-black text-white animate-ping">
                      {haltRemaining}s
                    </span>
                  </div>
                )}

                {/* Question Header & Subject Tag */}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-[10.5px] sm:text-[11px] font-black uppercase">
                      <span>{currentQuestion.subjectCode}</span>
                      <span className="text-slate-400">•</span>
                      <span>Q#{currentQuestionIdx + 1}</span>
                    </span>

                    <div className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      {isPlayer ? (
                        isMyTurn ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-black animate-pulse flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5 fill-current" />
                            YOUR TURN TO ANSWER!
                          </span>
                        ) : (
                          <span>Opponent's turn to answer...</span>
                        )
                      ) : (
                        <span className="text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Spectating {activeRoom.gameState?.activePlayerId === activeRoom.host.id ? activeRoom.host.name : activeRoom.guest?.name}'s Turn</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Question Text */}
                  <h3 className="text-xs sm:text-base md:text-lg font-bold text-slate-900 dark:text-white leading-relaxed mb-4 sm:mb-6">
                    {currentQuestion.question}
                  </h3>
                </div>

                {/* 4 Choices */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 mb-4 sm:mb-6">
                  {currentQuestion.options.map((opt, idx) => {
                    const letter = ["A", "B", "C", "D"][idx];
                    const isSelected = selectedChoice === idx;
                    const isCorrectAnswer = answerFeedback?.correctIndex === idx;

                    // Spectator sees lastAnswer broadcast from server
                    const lastAns = activeRoom.gameState?.lastAnswer;
                    const isBroadcastChoice = lastAns && lastAns.choiceIndex === idx && (Date.now() - (lastAns.timestamp || 0) < 1400);

                    let btnStyle =
                      "bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700/80 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100";

                    if (answerFeedback) {
                      if (isCorrectAnswer) {
                        btnStyle = "bg-emerald-600 border-emerald-500 text-white font-black";
                      } else if (isSelected && !answerFeedback.isCorrect) {
                        btnStyle = "bg-red-600 border-red-500 text-white font-black";
                      }
                    } else if (isSpectator && isBroadcastChoice) {
                      btnStyle = lastAns.isCorrect
                        ? "bg-emerald-600 border-emerald-500 text-white font-black"
                        : "bg-red-600 border-red-500 text-white font-black";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectAnswer(idx)}
                        disabled={!isMyTurn || isHalted || !!answerFeedback || isSpectator}
                        className={`p-3 sm:p-4 rounded-xl border-2 text-left text-xs sm:text-sm font-semibold transition-all flex items-start gap-2.5 sm:gap-3 active:scale-98 disabled:cursor-not-allowed min-h-[48px] sm:min-h-[52px] touch-manipulation ${
                          isSpectator ? "cursor-default opacity-90" : ""
                        } ${btnStyle}`}
                      >
                        <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-black/10 dark:bg-white/10 flex items-center justify-center text-[11px] sm:text-xs font-black shrink-0 mt-0.5">
                          {letter}
                        </span>
                        <span className="min-w-0 leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tactical Action Bar: Pass Button & Surrender */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {isSpectator
                      ? "👀 Spectators cannot click choices. Cheer in the live Twitch feed!"
                      : isMyTurn
                      ? "Correct answer freezes your timer and passes turn!"
                      : "Waiting for opponent..."}
                  </div>

                  <div className="flex items-center gap-2">
                    {isPlayer && (
                      <button
                        onClick={() => setIsSurrenderConfirmOpen(true)}
                        className="text-[11px] text-red-500 hover:text-red-700 dark:hover:text-red-400 font-bold px-2 py-1 transition-colors cursor-pointer"
                        title="Surrender and concede this match"
                      >
                        Surrender
                      </button>
                    )}

                    {isMyTurn && (
                      <button
                        onClick={handlePassQuestion}
                        disabled={isHalted || !!answerFeedback}
                        className="px-3.5 py-2 sm:px-4 sm:py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-700 dark:text-amber-300 font-black text-xs flex items-center gap-1.5 transition-colors active:scale-95"
                        title="Skip this question, deduct 5 seconds from your clock, and pass turn to opponent"
                      >
                        <FastForward className="w-3.5 h-3.5" />
                        <span>Pass (-5s)</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Emote Reaction Bar */}
              <div className="p-2 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-1 overflow-x-auto shadow-sm dark:shadow-md">
                <span className="text-[10px] font-black text-slate-600 dark:text-slate-400 shrink-0 uppercase tracking-wider pl-1.5 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-500 dark:text-amber-400" />
                  <span>Cheer:</span>
                </span>
                {["🔥", "💀", "⚡", "🍿", "👏", "😱", "🎯", "🧠"].map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleBurstEmote(emoji)}
                    className="p-1 hover:scale-125 active:scale-90 text-lg transition-transform focus:outline-none"
                    title={`Cheer with ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Live Twitch Spectator Feed */}
            <div className={`lg:col-span-1 ${mobileMatchTab === "stage" ? "hidden lg:block" : "block"}`}>
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
        </div>
      )}

      {/* SCREEN 4: GAME OVER / VICTORY PODIUM */}
      {screen === "game_over" && winnerInfo && (
        <div className="max-w-md mx-auto text-center space-y-6 animate-scaleIn">
          <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border-2 border-amber-400/80 p-6 sm:p-8 text-slate-900 dark:text-white shadow-2xl shadow-amber-500/10 dark:shadow-amber-500/20">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center mx-auto mb-4 text-slate-950 shadow-xl shadow-amber-400/30">
              <Trophy className="w-8 h-8 fill-slate-950" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-black mb-1">
              {winnerInfo.isCurrentUser ? "VICTORY ROYALE! 🏆" : "MATCH CONCLUDED! ⚔️"}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-6">
              {winnerInfo.isCurrentUser
                ? `You outlasted your opponent on the clock!`
                : `${winnerInfo.winnerName} claimed the match crown!`}
            </p>

            {/* Wager Payout Banner */}
            {isPlayer && (
              <div
                className={`p-4 rounded-2xl mb-6 border ${
                  winnerInfo.isCurrentUser
                    ? "bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300"
                    : "bg-red-50 dark:bg-red-950/60 border-red-300 dark:border-red-500/40 text-red-800 dark:text-red-300"
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
            )}

            {/* Actions */}
            <div className="flex flex-col gap-2.5">
              {isPlayer && (
                <button
                  onClick={() => {
                    setScreen("room_setup");
                    setActiveRoom((prev) => ({
                      ...prev,
                      status: "waiting",
                      hostReady: false,
                      guestReady: false,
                      gameState: {
                        ...prev.gameState,
                        hostClock: 60,
                        guestClock: 60,
                        winnerId: null,
                      },
                    }));
                  }}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm shadow-lg shadow-amber-500/25 active:scale-95 transition-all"
                >
                  Rematch Showdown
                </button>
              )}

              <button
                onClick={() => {
                  setScreen("lobby");
                  setActiveRoom(null);
                }}
                className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-bold text-xs transition-colors"
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
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 max-h-[92vh] overflow-y-auto">
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

      {/* SURRENDER / FORFEIT CONFIRMATION MODAL */}
      {isSurrenderConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 dark:bg-slate-950/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-sm rounded-3xl bg-white dark:bg-slate-900 border-2 border-red-500/40 p-6 text-center space-y-4 shadow-2xl animate-scaleIn">
            <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/80 border border-red-300 dark:border-red-500/40 flex items-center justify-center mx-auto text-red-600 dark:text-red-400 shadow-md">
              <Flag className="w-7 h-7 stroke-[2.5]" />
            </div>

            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Forfeit & Concede Match? 🏳️
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">
                Are you sure you want to surrender? If you concede, your opponent will immediately win the showdown and your <span className="text-red-600 dark:text-red-400 font-bold font-mono">{activeRoom?.wager || 250} XP</span> wager will be transferred to them.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleSurrender}
                disabled={isSurrendering}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-xs shadow-md shadow-red-600/30 active:scale-95 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 cursor-pointer"
              >
                <Flag className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>{isSurrendering ? "Surrendering..." : "Yes, Forfeit Match"}</span>
              </button>

              <button
                onClick={() => setIsSurrenderConfirmOpen(false)}
                disabled={isSurrendering}
                className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors cursor-pointer"
              >
                No, Keep Fighting! ⚔️
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
