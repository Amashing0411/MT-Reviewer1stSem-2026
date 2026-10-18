// api/battle.js
// Vercel Serverless Function supporting Real-Time 1v1 Battle Exam Arenas, 5s Ready Countdown, Synchronized Coin Toss, & Live Twitch Spectator Mode via Upstash Redis

// Silence cosmetic Node.js DEP0169 warning emitted by Vercel runtime's legacy bridge
if (typeof process !== "undefined") {
  if (typeof process.emitWarning === "function") {
    const _origEmitWarning = process.emitWarning;
    process.emitWarning = (warning, ...args) => {
      if (typeof warning === "string" && (warning.includes("url.parse()") || warning.includes("DEP0169"))) return;
      if (typeof warning === "object" && (warning?.code === "DEP0169" || String(warning?.message || "").includes("url.parse()"))) return;
      return _origEmitWarning.call(process, warning, ...args);
    };
  }
  if (process.stderr && typeof process.stderr.write === "function") {
    const _origStderrWrite = process.stderr.write;
    process.stderr.write = function (chunk, ...args) {
      if (typeof chunk === "string" && (chunk.includes("DEP0169") || chunk.includes("url.parse()"))) {
        return true;
      }
      return _origStderrWrite.call(process.stderr, chunk, ...args);
    };
  }
}

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const rawUrl =
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.REDIS_REST_API_URL;

  const kvToken =
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.REDIS_REST_API_TOKEN;

  const kvUrl = rawUrl ? rawUrl.replace(/\/$/, "") : null;
  const BATTLE_ROOMS_KEY = "bscpe4th_battle_rooms_2026";

  if (!kvUrl || !kvToken) {
    if (req.method === "GET") {
      return res.status(200).json({
        ok: true,
        isCloudConnected: false,
        rooms: [],
        message: "Upstash Redis not configured, local bot battle ready.",
      });
    }
    return res.status(200).json({
      ok: true,
      isCloudConnected: false,
      message: "Upstash Redis not configured, running local battle simulation.",
    });
  }

  // Upstash command executor
  async function upstashCommand(commandArray) {
    try {
      const resp = await fetch(kvUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commandArray),
      });
      return await resp.json();
    } catch (e) {
      return { error: e.message };
    }
  }

  // Fetch all active rooms
  async function getRooms() {
    let data = await upstashCommand(["GET", BATTLE_ROOMS_KEY]);
    if (!data || data.error) {
      try {
        const pathResp = await fetch(`${kvUrl}/get/${BATTLE_ROOMS_KEY}`, {
          headers: { Authorization: `Bearer ${kvToken}` },
        });
        data = await pathResp.json();
      } catch (e) {
        data = null;
      }
    }

    let rooms = [];
    if (data && data.result) {
      try {
        rooms = typeof data.result === "string" ? JSON.parse(data.result) : data.result;
      } catch (e) {
        rooms = [];
      }
    }

    if (!Array.isArray(rooms)) rooms = [];

    // Filter out inactive rooms older than 2 hours
    const now = Date.now();
    return rooms.filter((r) => now - (r.updatedAt || r.createdAt || 0) < 1000 * 60 * 120);
  }

  // Save rooms back to Upstash
  async function saveRooms(rooms) {
    await upstashCommand(["SET", BATTLE_ROOMS_KEY, JSON.stringify(rooms)]);
  }

  // GET: Return room list or single room details (with live clock sync)
  if (req.method === "GET") {
    try {
      let roomId = req.query?.roomId;
      if (!roomId && req.url) {
        try {
          const parsed = new URL(req.url, "http://localhost");
          roomId = parsed.searchParams.get("roomId");
        } catch (e) {}
      }
      const rooms = await getRooms();
      const now = Date.now();

      if (roomId) {
        const room = rooms.find((r) => r.id === roomId);
        if (!room) {
          return res.status(404).json({ ok: false, error: "Room not found" });
        }

        let hasRoomChanged = false;

        // Auto-advance countdown -> tossing_coin
        if (room.status === "countdown" && room.countdownEnd && now >= room.countdownEnd) {
          const isHost = Math.random() < 0.5;
          const winnerId = isHost ? room.host.id : room.guest.id;
          const winnerName = isHost ? room.host.name : room.guest.name;

          room.status = "tossing_coin";
          room.coinToss = {
            winnerId,
            flippedAt: now,
            sideLand: isHost ? "host" : "guest",
            flipDuration: 4200,
          };
          room.gameState.activePlayerId = winnerId;
          room.gameState.hostClock = 60;
          room.gameState.guestClock = 60;
          room.gameState.turnStartedAt = now + 4200;
          room.updatedAt = now;

          room.chat.push({
            id: "c_" + now,
            type: "event",
            text: `🪙 Coin Toss: Lands on ${winnerName}! ${winnerName} takes Question 1!`,
            senderName: "Coin Toss Referee",
            createdAt: now,
          });
          hasRoomChanged = true;
        }

        // Auto-advance tossing_coin -> in_battle
        if (
          room.status === "tossing_coin" &&
          room.coinToss?.flippedAt &&
          now >= room.coinToss.flippedAt + 4200
        ) {
          room.status = "in_battle";
          room.gameState.turnStartedAt = now;
          room.updatedAt = now;
          hasRoomChanged = true;
        }

        // Authoritative server-side clock evaluation in active match
        if (room.status === "in_battle" && !room.gameState.winnerId) {
          const elapsed = (now - (room.gameState.turnStartedAt || now)) / 1000;

          if (room.gameState.activePlayerId === room.host.id) {
            const currentHost = Math.max(0, +(room.gameState.hostClock - elapsed).toFixed(1));
            if (currentHost <= 0) {
              room.status = "finished";
              room.gameState.winnerId = room.guest?.id;
              room.gameState.finishReason = "timeout";
              room.gameState.hostClock = 0;
              room.chat.push({
                id: "c_" + now,
                type: "event",
                text: `⏱️ BUZZER! ${room.host.name}'s clock ran out! ${room.guest?.name} WINS!`,
                senderName: "Victory Announcer",
                createdAt: now,
              });
              hasRoomChanged = true;
            }
          } else if (room.gameState.activePlayerId === room.guest?.id) {
            const currentGuest = Math.max(0, +(room.gameState.guestClock - elapsed).toFixed(1));
            if (currentGuest <= 0) {
              room.status = "finished";
              room.gameState.winnerId = room.host.id;
              room.gameState.finishReason = "timeout";
              room.gameState.guestClock = 0;
              room.chat.push({
                id: "c_" + now,
                type: "event",
                text: `⏱️ BUZZER! ${room.guest?.name}'s clock ran out! ${room.host.name} WINS!`,
                senderName: "Victory Announcer",
                createdAt: now,
              });
              hasRoomChanged = true;
            }
          }
        }

        if (hasRoomChanged) {
          await saveRooms(rooms);
        }

        return res.status(200).json({ ok: true, isCloudConnected: true, room, serverTime: now });
      }

      return res.status(200).json({
        ok: true,
        isCloudConnected: true,
        rooms: rooms.map((r) => ({
          id: r.id,
          title: r.title,
          subject: r.subject,
          wager: r.wager,
          status: r.status,
          host: r.host,
          guest: r.guest,
          hostReady: r.hostReady || false,
          guestReady: r.guestReady || false,
          spectatorCount: (r.spectators || []).length,
          createdAt: r.createdAt,
        })),
        serverTime: now,
      });
    } catch (err) {
      return res.status(500).json({ ok: false, error: err.message });
    }
  }

  // POST: Room mutations & Game Actions
  if (req.method === "POST") {
    try {
      const body = req.body || {};
      const { action } = body;
      const rooms = await getRooms();
      const now = Date.now();

      // 1. CREATE ROOM (Stores host details & synchronized question bank)
      if (action === "create_room") {
        const { title, subject = "all", wager = 250, host, questions = [] } = body;
        if (!host || !host.id || !host.name) {
          return res.status(400).json({ ok: false, error: "Missing host details" });
        }

        const newRoom = {
          id: "room_" + Math.random().toString(36).substring(2, 8),
          title: title || `${host.name}'s Showdown Arena`,
          subject: subject || "all",
          wager: Math.max(50, Math.min(2500, Number(wager) || 250)),
          status: "waiting", // "waiting" | "countdown" | "tossing_coin" | "in_battle" | "finished"
          createdAt: now,
          updatedAt: now,
          host: {
            id: host.id,
            name: host.name,
            avatar: host.avatar,
            customPhoto: host.customPhoto || null,
            section: host.section || "BSCPE 4D",
            level: host.level || 1,
            xp: host.xp || 0,
            frame: host.frame || "default",
          },
          guest: null,
          hostReady: false,
          guestReady: false,
          countdownEnd: null,
          spectators: [],
          questions: Array.isArray(questions) ? questions : [],
          coinToss: {
            winnerId: null,
            flippedAt: null,
            sideLand: null,
          },
          gameState: {
            activePlayerId: null,
            questionIndex: 0,
            hostClock: 60,
            guestClock: 60,
            turnStartedAt: null,
            haltUntil: 0,
            winnerId: null,
            finishReason: null,
            lastAnswer: null, // Broadcasts choice made so spectators see live highlight
          },
          chat: [
            {
              id: "c_" + Date.now(),
              type: "event",
              text: `🎮 Room opened! Wager set to ${wager} XP. Waiting for a challenger to enter...`,
              senderName: "Arena System",
              createdAt: now,
            },
          ],
          recentEmotes: [],
        };

        const updatedRooms = [newRoom, ...rooms].slice(0, 30);
        await saveRooms(updatedRooms);
        return res.status(200).json({ ok: true, room: newRoom });
      }

      // 2. JOIN ROOM (As Challenger Player or Spectator)
      if (action === "join_room") {
        const { roomId, student, asPlayer } = body;
        const roomIdx = rooms.findIndex((r) => r.id === roomId);
        if (roomIdx === -1) {
          return res.status(404).json({ ok: false, error: "Room not found" });
        }

        const room = rooms[roomIdx];
        room.updatedAt = now;

        const playerInfo = {
          id: student.id,
          name: student.name,
          avatar: student.avatar,
          customPhoto: student.customPhoto || null,
          section: student.section || "BSCPE 4D",
          level: student.level || 1,
          xp: student.xp || 0,
          frame: student.frame || "default",
        };

        if (asPlayer && room.status === "waiting" && (!room.guest || room.guest.id === student.id) && room.host.id !== student.id) {
          room.guest = playerInfo;
          room.guestReady = room.guestReady || false;
          room.chat.push({
            id: "c_" + now,
            type: "event",
            text: `⚔️ ${playerInfo.name} entered as Challenger! Both players press READY to start 5s countdown!`,
            senderName: "Arena System",
            createdAt: now,
          });
        } else if (room.host.id === student.id) {
          // Host reconnecting/refreshing
          room.host = playerInfo;
        } else {
          // Join as spectator
          room.spectators = (room.spectators || []).filter((s) => s.id !== student.id);
          room.spectators.push(playerInfo);
          room.chat.push({
            id: "c_" + now,
            type: "event",
            text: `👀 ${playerInfo.name} joined as a live spectator.`,
            senderName: "Audience Feed",
            createdAt: now,
          });
        }

        rooms[roomIdx] = room;
        await saveRooms(rooms);
        return res.status(200).json({ ok: true, room });
      }

      // 3. TOGGLE READY (Both players must press ready -> triggers 5s countdown)
      if (action === "toggle_ready") {
        const { roomId, studentId } = body;
        const room = rooms.find((r) => r.id === roomId);
        if (!room) return res.status(404).json({ ok: false, error: "Room not found" });

        const isHost = room.host.id === studentId;
        const isGuest = room.guest?.id === studentId;

        if (!isHost && !isGuest) {
          return res.status(200).json({ ok: false, ignored: true, message: "Spectators cannot toggle ready.", room });
        }

        if (isHost) {
          room.hostReady = !room.hostReady;
        } else if (isGuest) {
          room.guestReady = !room.guestReady;
        }

        // Check if BOTH are ready
        if (room.hostReady && room.guestReady && room.status === "waiting") {
          room.status = "countdown";
          room.countdownEnd = now + 5000; // 5-second synchronized countdown
          room.chat.push({
            id: "c_" + now,
            type: "event",
            text: `🔥 BOTH PLAYERS READY! Coin toss begins in 5 seconds!`,
            senderName: "Arena Referee",
            createdAt: now,
          });
        } else if (room.status === "countdown" && (!room.hostReady || !room.guestReady)) {
          // One player cancelled ready
          room.status = "waiting";
          room.countdownEnd = null;
        }

        room.updatedAt = now;
        await saveRooms(rooms);
        return res.status(200).json({ ok: true, room });
      }

      // 4. TRIGGER COIN TOSS (Invoked when 5s countdown completes)
      if (action === "start_coin_toss") {
        const { roomId } = body;
        const room = rooms.find((r) => r.id === roomId);
        if (!room || !room.guest) return res.status(400).json({ ok: false, error: "Missing players" });

        if (room.status !== "tossing_coin") {
          const isHost = Math.random() < 0.5;
          const winnerId = isHost ? room.host.id : room.guest.id;
          const winnerName = isHost ? room.host.name : room.guest.name;

          room.status = "tossing_coin";
          room.coinToss = {
            winnerId,
            flippedAt: now,
            sideLand: isHost ? "host" : "guest",
            flipDuration: 4200,
          };
          room.gameState.activePlayerId = winnerId;
          room.gameState.hostClock = 60;
          room.gameState.guestClock = 60;
          room.gameState.turnStartedAt = now + 4200;
          room.updatedAt = now;

          room.chat.push({
            id: "c_" + now,
            type: "event",
            text: `🪙 Coin Toss: Lands on ${winnerName}! ${winnerName} takes Question 1!`,
            senderName: "Coin Toss Referee",
            createdAt: now,
          });

          await saveRooms(rooms);
        }

        return res.status(200).json({ ok: true, room });
      }

      // 5. SUBMIT ANSWER (Authoritative timer deduction + turn pass + spectator broadcast)
      if (action === "submit_answer") {
        const { roomId, studentId, isCorrect, choiceIndex } = body;
        const room = rooms.find((r) => r.id === roomId);
        if (!room || room.status !== "in_battle") {
          return res.status(200).json({ ok: false, ignored: true, message: "Match not active", room });
        }

        // Only active player can answer! If turn passed or spectator, ignore safely with latest room state
        if (room.gameState.activePlayerId !== studentId) {
          return res.status(200).json({ ok: false, ignored: true, message: "Not your turn or spectator.", room });
        }

        const isHost = room.host.id === studentId;
        const playerName = isHost ? room.host.name : room.guest?.name;
        const opponentId = isHost ? room.guest?.id : room.host.id;
        const opponentName = isHost ? room.guest?.name : room.host.name;

        // Calculate exact elapsed seconds during this turn
        const elapsed = Math.max(0, (now - (room.gameState.turnStartedAt || now)) / 1000);

        if (isCorrect) {
          // Deduct elapsed time from player's clock and FREEZE it
          if (isHost) {
            room.gameState.hostClock = Math.max(1, +(room.gameState.hostClock - elapsed).toFixed(1));
          } else {
            room.gameState.guestClock = Math.max(1, +(room.gameState.guestClock - elapsed).toFixed(1));
          }

          // Broadcast answer choice to spectators
          room.gameState.lastAnswer = {
            playerId: studentId,
            choiceIndex,
            isCorrect: true,
            timestamp: now,
          };

          // Switch turn immediately to opponent
          room.gameState.activePlayerId = opponentId;
          room.gameState.questionIndex += 1;
          room.gameState.turnStartedAt = now;
          room.gameState.haltUntil = 0;

          const savedClock = isHost ? room.gameState.hostClock : room.gameState.guestClock;
          room.chat.push({
            id: "c_" + now,
            type: "event",
            text: `⚡ ${playerName} answered CORRECTLY! Timer frozen at ${savedClock}s. Turn passed to ${opponentName}!`,
            senderName: "Arena Referee",
            createdAt: now,
          });
        } else {
          // WRONG ANSWER: 3-Second lockout penalty
          room.gameState.haltUntil = now + 3000;
          room.gameState.lastAnswer = {
            playerId: studentId,
            choiceIndex,
            isCorrect: false,
            timestamp: now,
          };

          room.chat.push({
            id: "c_" + now,
            type: "event",
            text: `❌ WRONG CHOICE by ${playerName}! 3-second penalty lockout applied!`,
            senderName: "Penalty Box",
            createdAt: now,
          });
        }

        room.updatedAt = now;
        await saveRooms(rooms);
        return res.status(200).json({ ok: true, room });
      }

      // 6. PASS QUESTION (5s penalty + pass turn)
      if (action === "pass_question") {
        const { roomId, studentId } = body;
        const room = rooms.find((r) => r.id === roomId);
        if (!room || room.status !== "in_battle") {
          return res.status(200).json({ ok: false, ignored: true, message: "Match not active", room });
        }

        if (room.gameState.activePlayerId !== studentId) {
          return res.status(200).json({ ok: false, ignored: true, message: "Not your turn or spectator.", room });
        }

        const isHost = room.host.id === studentId;
        const playerName = isHost ? room.host.name : room.guest?.name;
        const opponentId = isHost ? room.guest?.id : room.host.id;
        const opponentName = isHost ? room.guest?.name : room.host.name;

        // Calculate elapsed + 5s penalty
        const elapsed = Math.max(0, (now - (room.gameState.turnStartedAt || now)) / 1000);
        const currentClock = isHost ? room.gameState.hostClock : room.gameState.guestClock;
        const penalizedTime = Math.max(0, +(currentClock - elapsed - 5).toFixed(1));

        if (isHost) room.gameState.hostClock = penalizedTime;
        else room.gameState.guestClock = penalizedTime;

        if (penalizedTime <= 0) {
          room.status = "finished";
          room.gameState.winnerId = opponentId;
          room.gameState.finishReason = "penalty_timeout";
          room.chat.push({
            id: "c_" + now,
            type: "event",
            text: `💀 ${playerName} passed but had less than 5s left! Timer expired! ${opponentName} WINS!`,
            senderName: "Victory Announcer",
            createdAt: now,
          });
        } else {
          room.gameState.activePlayerId = opponentId;
          room.gameState.questionIndex += 1;
          room.gameState.turnStartedAt = now;
          room.gameState.haltUntil = 0;
          room.chat.push({
            id: "c_" + now,
            type: "event",
            text: `⏩ ${playerName} PASSED (-5s penalty). Turn passed to ${opponentName}!`,
            senderName: "Arena Referee",
            createdAt: now,
          });
        }

        room.updatedAt = now;
        await saveRooms(rooms);
        return res.status(200).json({ ok: true, room });
      }

      // 7. SEND TWITCH CHAT
      if (action === "send_chat") {
        const { roomId, message } = body;
        const room = rooms.find((r) => r.id === roomId);
        if (!room) return res.status(404).json({ ok: false, error: "Room not found" });

        const newMsg = {
          id: "c_" + now + "_" + Math.random().toString(36).substr(2, 4),
          type: "chat",
          senderId: message.senderId,
          senderName: message.senderName || "Spectator",
          avatar: message.avatar || "/avatars/bean-female-debugging.jpg",
          text: (message.text || "").slice(0, 150),
          createdAt: now,
        };

        room.chat = [...(room.chat || []).slice(-40), newMsg];
        room.updatedAt = now;
        await saveRooms(rooms);
        return res.status(200).json({ ok: true, message: newMsg });
      }

      // 8. BURST EMOTE REACTION
      if (action === "burst_emote") {
        const { roomId, emoji, senderName, emoteId } = body;
        const room = rooms.find((r) => r.id === roomId);
        if (!room) return res.status(404).json({ ok: false, error: "Room not found" });

        const emoteObj = {
          id: emoteId || ("em_" + now + "_" + Math.random().toString(36).substr(2, 4)),
          emoji: emoji || "🔥",
          senderName: senderName || "Audience",
          createdAt: now,
        };

        room.recentEmotes = [...(room.recentEmotes || []).slice(-30), emoteObj];
        room.updatedAt = now;
        await saveRooms(rooms);
        return res.status(200).json({ ok: true, emote: emoteObj });
      }

      // 9. LEAVE ROOM
      if (action === "leave_room") {
        const { roomId, studentId } = body;
        const roomIdx = rooms.findIndex((r) => r.id === roomId);
        if (roomIdx !== -1) {
          const room = rooms[roomIdx];
          room.spectators = (room.spectators || []).filter((s) => s.id !== studentId);

          if (room.status === "in_battle") {
            if (room.host.id === studentId || room.guest?.id === studentId) {
              const winner = room.host.id === studentId ? room.guest : room.host;
              room.status = "finished";
              room.gameState.winnerId = winner?.id;
              room.gameState.finishReason = "surrender";
              room.chat.push({
                id: "c_" + now,
                type: "event",
                text: `🏳️ Player disconnected/forfeited. ${winner?.name} takes victory!`,
                senderName: "Arena System",
                createdAt: now,
              });
            }
          } else if (room.status === "waiting" || room.status === "countdown") {
            if (room.host.id === studentId) {
              if (room.guest) {
                room.host = room.guest;
                room.guest = null;
                room.hostReady = false;
                room.guestReady = false;
                room.status = "waiting";
              } else {
                rooms.splice(roomIdx, 1);
                await saveRooms(rooms);
                return res.status(200).json({ ok: true, deleted: true });
              }
            } else if (room.guest?.id === studentId) {
              room.guest = null;
              room.guestReady = false;
              room.status = "waiting";
            }
          }

          room.updatedAt = now;
          await saveRooms(rooms);
          return res.status(200).json({ ok: true, room });
        }
        return res.status(200).json({ ok: true });
      }

      return res.status(400).json({ ok: false, error: "Invalid action" });
    } catch (err) {
      return res.status(500).json({ ok: false, error: err.message });
    }
  }
}
