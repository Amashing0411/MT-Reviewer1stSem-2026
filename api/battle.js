// api/battle.js
// Vercel Serverless Function supporting Real-Time 1v1 Battle Exam Arenas & Twitch Spectator Chat via Upstash Redis

// Silence cosmetic Node.js DEP0169 warning emitted by Vercel runtime's legacy bridge
if (typeof process !== "undefined" && typeof process.emitWarning === "function") {
  const _origEmitWarning = process.emitWarning;
  process.emitWarning = (warning, ...args) => {
    if (typeof warning === "string" && warning.includes("url.parse()")) return;
    if (typeof warning === "object" && (warning?.code === "DEP0169" || String(warning?.message || "").includes("url.parse()"))) return;
    return _origEmitWarning.call(process, warning, ...args);
  };
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

  // Check KV availability
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
    const activeRooms = rooms.filter((r) => now - (r.updatedAt || r.createdAt || 0) < 1000 * 60 * 120);

    return activeRooms;
  }

  // Save rooms back to Upstash
  async function saveRooms(rooms) {
    await upstashCommand(["SET", BATTLE_ROOMS_KEY, JSON.stringify(rooms)]);
  }

  // GET: Return room list or single room details
  if (req.method === "GET") {
    try {
      const { roomId } = req.query;
      const rooms = await getRooms();

      if (roomId) {
        const room = rooms.find((r) => r.id === roomId);
        if (!room) {
          return res.status(404).json({ ok: false, error: "Room not found" });
        }
        return res.status(200).json({ ok: true, isCloudConnected: true, room });
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
          spectatorCount: (r.spectators || []).length,
          createdAt: r.createdAt,
        })),
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

      // 1. CREATE ROOM
      if (action === "create_room") {
        const { title, subject = "all", wager = 250, host } = body;
        if (!host || !host.id || !host.name) {
          return res.status(400).json({ ok: false, error: "Missing host details" });
        }

        const newRoom = {
          id: "room_" + Math.random().toString(36).substring(2, 8),
          title: title || `${host.name}'s Showdown Arena`,
          subject: subject || "all",
          wager: Math.max(50, Math.min(2500, Number(wager) || 250)),
          status: "waiting", // "waiting", "tossing_coin", "in_battle", "finished"
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
          spectators: [],
          coinToss: {
            winnerId: null,
            flippedAt: null,
            sideLand: null, // "host" or "guest"
          },
          gameState: {
            activePlayerId: null,
            questionIndex: 0,
            seed: Math.floor(Math.random() * 900000) + 100000,
            hostClock: 60,
            guestClock: 60,
            lastClockTick: null,
            turnStartedAt: null,
            haltUntil: 0,
            winnerId: null,
            finishReason: null,
          },
          chat: [
            {
              id: "c_" + Date.now(),
              type: "event",
              text: `🎮 Room opened! Wager set to ${wager} XP. Waiting for a challenger...`,
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

      // 2. JOIN ROOM
      if (action === "join_room") {
        const { roomId, student, asPlayer } = body;
        const roomIdx = rooms.findIndex((r) => r.id === roomId);
        if (roomIdx === -1) {
          return res.status(404).json({ ok: false, error: "Room not found" });
        }

        const room = rooms[roomIdx];
        room.updatedAt = now;

        // Clean student info
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

        if (asPlayer && room.status === "waiting" && !room.guest && room.host.id !== student.id) {
          room.guest = playerInfo;
          room.chat.push({
            id: "c_" + now,
            type: "event",
            text: `⚔️ ${playerInfo.name} entered as Player 2! Ready to toss coin!`,
            senderName: "Arena System",
            createdAt: now,
          });
        } else {
          // Join as spectator
          room.spectators = room.spectators.filter((s) => s.id !== student.id);
          room.spectators.push(playerInfo);
          room.chat.push({
            id: "c_" + now,
            type: "event",
            text: `👀 ${playerInfo.name} joined the audience.`,
            senderName: "Twitch Chat",
            createdAt: now,
          });
        }

        rooms[roomIdx] = room;
        await saveRooms(rooms);
        return res.status(200).json({ ok: true, room });
      }

      // 3. START MATCH / COIN TOSS
      if (action === "start_match") {
        const { roomId, studentId } = body;
        const room = rooms.find((r) => r.id === roomId);
        if (!room || !room.guest) {
          return res.status(400).json({ ok: false, error: "Room needs 2 players to start" });
        }

        if (room.host.id !== studentId && room.guest.id !== studentId) {
          return res.status(403).json({ ok: false, error: "Only players can initiate match" });
        }

        // Toss coin: 50/50 chance
        const isHost = Math.random() < 0.5;
        const winnerId = isHost ? room.host.id : room.guest.id;
        const winnerName = isHost ? room.host.name : room.guest.name;

        room.status = "tossing_coin";
        room.updatedAt = now;
        room.coinToss = {
          winnerId,
          flippedAt: now,
          sideLand: isHost ? "host" : "guest",
        };
        room.gameState.activePlayerId = winnerId;
        room.gameState.turnStartedAt = now + 4200; // starts right after coin flip animation (4.2s)
        room.gameState.hostClock = 60;
        room.gameState.guestClock = 60;

        room.chat.push({
          id: "c_" + now,
          type: "event",
          text: `🪙 Coin Toss: Lands on ${winnerName}! ${winnerName} answers first!`,
          senderName: "Coin Toss Referee",
          createdAt: now,
        });

        await saveRooms(rooms);
        return res.status(200).json({ ok: true, room });
      }

      // 4. FINISH TOSS ANIMATION (Transition to in_battle)
      if (action === "finish_toss") {
        const { roomId } = body;
        const room = rooms.find((r) => r.id === roomId);
        if (room && room.status === "tossing_coin") {
          room.status = "in_battle";
          room.updatedAt = now;
          room.gameState.turnStartedAt = now;
          await saveRooms(rooms);
        }
        return res.status(200).json({ ok: true, room });
      }

      // 5. SUBMIT ANSWER (Correct saves timer & passes turn; Incorrect halts 3s)
      if (action === "submit_answer") {
        const { roomId, studentId, isCorrect, remainingClock } = body;
        const room = rooms.find((r) => r.id === roomId);
        if (!room || room.status !== "in_battle") {
          return res.status(400).json({ ok: false, error: "Match not active" });
        }

        const isHost = room.host.id === studentId;
        const playerName = isHost ? room.host.name : room.guest?.name;
        const opponentId = isHost ? room.guest?.id : room.host.id;
        const opponentName = isHost ? room.guest?.name : room.host.name;

        room.updatedAt = now;

        if (isCorrect) {
          // Update clock for player who answered correctly
          if (isHost) {
            room.gameState.hostClock = Math.max(1, Number(remainingClock) || room.gameState.hostClock);
          } else {
            room.gameState.guestClock = Math.max(1, Number(remainingClock) || room.gameState.guestClock);
          }

          // Switch turn immediately to opponent
          room.gameState.activePlayerId = opponentId;
          room.gameState.questionIndex += 1;
          room.gameState.turnStartedAt = now;
          room.gameState.haltUntil = 0;

          room.chat.push({
            id: "c_" + now,
            type: "event",
            text: `⚡ ${playerName} answered CORRECTLY! Timer frozen at ${Math.round(remainingClock)}s. Turn passed to ${opponentName}!`,
            senderName: "Arena Referee",
            createdAt: now,
          });
        } else {
          // Incorrect: 3-second penalty halt
          room.gameState.haltUntil = now + 3000;
          room.chat.push({
            id: "c_" + now,
            type: "event",
            text: `❌ WRONG CHOICE by ${playerName}! 3-second lockout penalty applied!`,
            senderName: "Penalty Box",
            createdAt: now,
          });
        }

        await saveRooms(rooms);
        return res.status(200).json({ ok: true, room });
      }

      // 6. PASS QUESTION (5s penalty + reveals correct answer + passes turn)
      if (action === "pass_question") {
        const { roomId, studentId, remainingClock } = body;
        const room = rooms.find((r) => r.id === roomId);
        if (!room || room.status !== "in_battle") {
          return res.status(400).json({ ok: false, error: "Match not active" });
        }

        const isHost = room.host.id === studentId;
        const playerName = isHost ? room.host.name : room.guest?.name;
        const opponentId = isHost ? room.guest?.id : room.host.id;
        const opponentName = isHost ? room.guest?.name : room.host.name;

        // Apply 5-second penalty
        const penalizedTime = Math.max(0, (Number(remainingClock) || 60) - 5);
        if (isHost) {
          room.gameState.hostClock = penalizedTime;
        } else {
          room.gameState.guestClock = penalizedTime;
        }

        // Check if penalty caused timeout
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
          // Switch turn to opponent
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

      // 7. TIME EXPIRED
      if (action === "time_expired") {
        const { roomId, loserId } = body;
        const room = rooms.find((r) => r.id === roomId);
        if (room && room.status === "in_battle") {
          const isHostLoser = room.host.id === loserId;
          const winner = isHostLoser ? room.guest : room.host;
          const loser = isHostLoser ? room.host : room.guest;

          room.status = "finished";
          room.updatedAt = now;
          room.gameState.winnerId = winner ? winner.id : null;
          room.gameState.finishReason = "timeout";

          if (isHostLoser) {
            room.gameState.hostClock = 0;
          } else {
            room.gameState.guestClock = 0;
          }

          room.chat.push({
            id: "c_" + now,
            type: "event",
            text: `🏆 BUZZER! ${loser?.name}'s clock ran out! ${winner?.name} is the BATTLE EXAM CHAMPION (+${room.wager * 2} XP pot)!`,
            senderName: "Victory Announcer",
            createdAt: now,
          });

          await saveRooms(rooms);
        }
        return res.status(200).json({ ok: true, room });
      }

      // 8. SEND TWITCH CHAT MESSAGE
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

      // 9. BURST EMOTE REACTION
      if (action === "burst_emote") {
        const { roomId, emoji, senderName } = body;
        const room = rooms.find((r) => r.id === roomId);
        if (!room) return res.status(404).json({ ok: false, error: "Room not found" });

        const emoteObj = {
          id: "em_" + now + "_" + Math.random().toString(36).substr(2, 4),
          emoji: emoji || "🔥",
          senderName: senderName || "Audience",
          createdAt: now,
        };

        room.recentEmotes = [...(room.recentEmotes || []).slice(-20), emoteObj];
        room.updatedAt = now;
        await saveRooms(rooms);
        return res.status(200).json({ ok: true, emote: emoteObj });
      }

      // 10. LEAVE ROOM
      if (action === "leave_room") {
        const { roomId, studentId } = body;
        const roomIdx = rooms.findIndex((r) => r.id === roomId);
        if (roomIdx !== -1) {
          const room = rooms[roomIdx];
          // Remove from spectators
          room.spectators = (room.spectators || []).filter((s) => s.id !== studentId);

          if (room.status === "in_battle") {
            // Surrender
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
          } else if (room.status === "waiting") {
            if (room.host.id === studentId) {
              if (room.guest) {
                // Transfer host to guest
                room.host = room.guest;
                room.guest = null;
              } else {
                // Delete empty room
                rooms.splice(roomIdx, 1);
                await saveRooms(rooms);
                return res.status(200).json({ ok: true, deleted: true });
              }
            } else if (room.guest?.id === studentId) {
              room.guest = null;
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
