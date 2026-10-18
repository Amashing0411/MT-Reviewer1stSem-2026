// api/leaderboard.js
// Vercel Serverless Function supporting Vercel KV / Upstash Redis with Cross-Device Sync & PIN Security

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

  // Detect Upstash / Vercel KV REST Credentials
  const rawUrl =
    process.env.KV_REST_API_URL ||
    process.env.UPSTASH_REDIS_REST_URL ||
    process.env.REDIS_REST_API_URL;

  const kvToken =
    process.env.KV_REST_API_TOKEN ||
    process.env.UPSTASH_REDIS_REST_TOKEN ||
    process.env.REDIS_REST_API_TOKEN;

  const kvUrl = rawUrl ? rawUrl.replace(/\/$/, "") : null;

  // Fresh storage key for 4th year batch — wipes old test data
  const KEY = "bscpe4th_clean_leaderboard_2026";
  const FEED_KEY = "bscpe4th_campus_shoutbox_2026";

  // If KV is not configured yet in Vercel Dashboard
  if (!kvUrl || !kvToken) {
    const presentKeys = Object.keys(process.env).filter((k) =>
      k.includes("KV") || k.includes("REDIS") || k.includes("UPSTASH")
    );

    if (req.method === "GET") {
      return res.status(200).json({
        ok: false,
        isCloudConnected: false,
        detectedKeys: presentKeys,
        message: "Upstash Redis / Vercel KV environment variables not detected.",
        roster: []
      });
    }
    return res.status(200).json({
      ok: false,
      isCloudConnected: false,
      detectedKeys: presentKeys,
      message: "Upstash Redis not connected"
    });
  }

  // Helper to execute Upstash command via body array
  async function upstashCommand(commandArray) {
    const resp = await fetch(kvUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${kvToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(commandArray)
    });
    return await resp.json();
  }

  // Helper to fetch roster
  async function getRoster() {
    let data = await upstashCommand(["GET", KEY]);
    if (!data || data.error) {
      const pathResp = await fetch(`${kvUrl}/get/${KEY}`, {
        headers: { Authorization: `Bearer ${kvToken}` }
      });
      data = await pathResp.json();
    }

    let roster = [];
    if (data && data.result) {
      try {
        roster = typeof data.result === "string" ? JSON.parse(data.result) : data.result;
      } catch (e) {
        roster = [];
      }
    }
    return Array.isArray(roster) ? roster : [];
  }

  // Helper to fetch shoutbox feed
  async function getFeed() {
    let data = await upstashCommand(["GET", FEED_KEY]);
    if (!data || data.error) {
      try {
        const pathResp = await fetch(`${kvUrl}/get/${FEED_KEY}`, {
          headers: { Authorization: `Bearer ${kvToken}` }
        });
        data = await pathResp.json();
      } catch (e) {}
    }

    let feed = [];
    if (data && data.result) {
      try {
        feed = typeof data.result === "string" ? JSON.parse(data.result) : data.result;
      } catch (e) {
        feed = [];
      }
    }
    return Array.isArray(feed) ? feed : [];
  }

  try {
    // 1. GET: Fetch current class leaderboard & shoutbox feed (Strips PINs for privacy)
    if (req.method === "GET") {
      const roster = await getRoster();
      const feed = await getFeed();

      // Never expose student PINs to the public leaderboard
      const safeRoster = roster.map(({ pin, ...safe }) => safe);

      return res.status(200).json({
        ok: true,
        isCloudConnected: true,
        roster: safeRoster,
        feed
      });
    }

    // 2. POST: Submit / Update score, Restore profile, Post to shoutbox feed, or Admin flush
    if (req.method === "POST") {
      let body = req.body;
      if (typeof body === "string") {
        try {
          body = JSON.parse(body);
        } catch (e) {
          body = {};
        }
      }

      // Action A: Post to Campus Shoutbox / Study Feed
      if (body?.action === "post_feed") {
        const msgText = String(body.text || "").trim().slice(0, 200);
        if (!msgText) {
          return res.status(400).json({ ok: false, error: "Message cannot be empty." });
        }
        let feed = await getFeed();
        const newMsg = {
          id: "msg_" + Date.now().toString(36) + "_" + Math.random().toString(36).substr(2, 5),
          text: msgText,
          studentId: String(body.studentId || "").slice(0, 50),
          studentName: String(body.studentName || "Anonymous Student").slice(0, 40),
          studentSection: String(body.studentSection || "BSCPE 4D").slice(0, 20),
          avatar: String(body.avatar || "🤖").slice(0, 10),
          frame: String(body.frame || "default").slice(0, 30),
          nameFx: String(body.nameFx || "none").slice(0, 30),
          tagline: String(body.tagline || "").slice(0, 80),
          customPhoto: body.customPhoto && typeof body.customPhoto === "string" && body.customPhoto.startsWith("data:image") ? body.customPhoto : null,
          level: Number(body.level) || 1,
          createdAt: Date.now(),
        };
        feed.push(newMsg);
        // Keep most recent 50 messages
        if (feed.length > 50) feed = feed.slice(-50);
        await upstashCommand(["SET", FEED_KEY, JSON.stringify(feed)]);
        return res.status(200).json({ ok: true, feed });
      }

      // Action B: Fetch Shoutbox Feed only
      if (body?.action === "get_feed") {
        const feed = await getFeed();
        return res.status(200).json({ ok: true, feed });
      }

      // Action C: Force flush/clear DB for fresh start
      if (body?.action === "flush_clean_all") {
        await upstashCommand(["DEL", "room106_leaderboard_2026"]);
        await upstashCommand(["DEL", "bscpe_leaderboard_2026"]);
        await upstashCommand(["DEL", FEED_KEY]);
        await upstashCommand(["SET", KEY, JSON.stringify([])]);
        return res.status(200).json({
          ok: true,
          message: "Database successfully cleared. Fresh start active!",
          roster: [],
          feed: []
        });
      }

      // Action B: Restore profile by Name + 4-Digit PIN
      if (body?.action === "restore") {
        const queryName = String(body.name || "").trim().toLowerCase();
        const queryPin = String(body.pin || "").trim();

        if (!queryName) {
          return res.status(400).json({ ok: false, error: "Please enter your student name." });
        }

        const roster = await getRoster();
        const found = roster.find((item) => item.name && item.name.trim().toLowerCase() === queryName);

        if (!found) {
          return res.status(404).json({
            ok: false,
            error: `No existing student profile found with the name "${body.name}". Check your spelling or create a new profile.`
          });
        }

        // If existing profile has a PIN, verify it
        if (found.pin) {
          if (!queryPin || found.pin !== queryPin) {
            return res.status(403).json({
              ok: false,
              error: "Incorrect 4-digit PIN for this student. Please check your Reviewer Pass image or try again."
            });
          }
        }

        return res.status(200).json({
          ok: true,
          message: "Profile verified & restored!",
          profile: found
        });
      }

      // Action C: Normal Profile submission / update
      const student = body;
      if (!student || !student.id || !student.name) {
        return res.status(400).json({ ok: false, error: "Missing student data" });
      }

      // Guard: Reject unconfigured default ghost profiles (e.g. "Student #..." with 0 XP)
      if (
        String(student.name || "").startsWith("Student #") &&
        (!student.xp || Number(student.xp) === 0)
      ) {
        const currentRoster = await getRoster();
        const safeRoster = currentRoster.map(({ pin, ...safe }) => safe);
        return res.status(200).json({ ok: true, isCloudConnected: true, roster: safeRoster });
      }

      let roster = await getRoster();

      const cleanRecord = {
        id: String(student.id).slice(0, 50),
        name: String(student.name).slice(0, 40),
        section: String(student.section || "BSCPE 4D").slice(0, 20),
        avatar: String(student.avatar || "🤖").slice(0, 10),
        frame: String(student.frame || "default").slice(0, 30),
        tagline: String(student.tagline || "").slice(0, 80),
        nameFx: String(student.nameFx || "none").slice(0, 30),
        pin: student.pin ? String(student.pin).trim().slice(0, 8) : null,
        customPhoto:
          student.customPhoto &&
          typeof student.customPhoto === "string" &&
          student.customPhoto.startsWith("data:image") &&
          student.customPhoto.length < 300000
            ? student.customPhoto
            : null,
        xp: Number(student.xp) || 0,
        levelInfo: {
          level: Number(student.levelInfo?.level) || 1,
          title: String(student.levelInfo?.title || "Novice Trainee").slice(0, 40)
        },
        fastestBlitz: student.fastestBlitz ? Number(student.fastestBlitz) : null,
        highestPercent: Number(student.highestPercent) || 0,
        subjectStats: student.subjectStats && typeof student.subjectStats === "object" ? student.subjectStats : {},
        updatedAt: Date.now()
      };

      // Match existing profile by ID OR Name (case-insensitive)
      const existingIdx = roster.findIndex(
        (item) => item.id === cleanRecord.id || item.name.trim().toLowerCase() === cleanRecord.name.trim().toLowerCase()
      );

      if (existingIdx >= 0) {
        const existing = roster[existingIdx];

        // Security check: If existing profile has a PIN, ensure submitter has matching PIN or same ID
        if (existing.pin && cleanRecord.pin && existing.pin !== cleanRecord.pin && existing.id !== cleanRecord.id) {
          return res.status(403).json({
            ok: false,
            error: `The student name "${cleanRecord.name}" is claimed with a PIN. Please enter the correct PIN to update this profile.`
          });
        }

        // Merge subject stats
        const mergedSubjectStats = { ...(existing.subjectStats || {}) };
        if (cleanRecord.subjectStats) {
          Object.keys(cleanRecord.subjectStats).forEach((subKey) => {
            const prevSub = mergedSubjectStats[subKey] || {};
            const newSub = cleanRecord.subjectStats[subKey] || {};
            mergedSubjectStats[subKey] = {
              xp: Math.max(prevSub.xp || 0, newSub.xp || 0),
              highestPercent: Math.max(prevSub.highestPercent || 0, newSub.highestPercent || 0),
              fastestBlitz: newSub.fastestBlitz
                ? (prevSub.fastestBlitz ? Math.min(prevSub.fastestBlitz, newSub.fastestBlitz) : newSub.fastestBlitz)
                : prevSub.fastestBlitz,
              quizzesTaken: Math.max(prevSub.quizzesTaken || 0, newSub.quizzesTaken || 0)
            };
          });
        }

        roster[existingIdx] = {
          ...cleanRecord,
          id: existing.id || cleanRecord.id, // preserve primary ID
          pin: cleanRecord.pin || existing.pin || null, // preserve PIN
          xp: Math.max(existing.xp || 0, cleanRecord.xp),
          fastestBlitz: cleanRecord.fastestBlitz
            ? existing.fastestBlitz
              ? Math.min(existing.fastestBlitz, cleanRecord.fastestBlitz)
              : cleanRecord.fastestBlitz
            : existing.fastestBlitz,
          highestPercent: Math.max(existing.highestPercent || 0, cleanRecord.highestPercent),
          customPhoto: cleanRecord.customPhoto || existing.customPhoto || null,
          subjectStats: mergedSubjectStats
        };
      } else {
        roster.push(cleanRecord);
      }

      // Sort by XP descending and cap at 150 students
      roster.sort((a, b) => (b.xp || 0) - (a.xp || 0));
      if (roster.length > 150) roster = roster.slice(0, 150);

      // Save updated roster to Upstash Redis
      await upstashCommand(["SET", KEY, JSON.stringify(roster)]);

      // Safe roster without PINs for return
      const safeRoster = roster.map(({ pin, ...safe }) => safe);

      return res.status(200).json({
        ok: true,
        isCloudConnected: true,
        roster: safeRoster
      });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed" });
  } catch (err) {
    console.error("Leaderboard API Error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
