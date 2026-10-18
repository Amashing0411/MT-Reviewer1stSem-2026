// api/leaderboard.js
// Vercel Serverless Function supporting Vercel KV / Upstash Redis for Room 106 Leaderboard

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
        message:
          "Upstash Redis / Vercel KV environment variables not detected. Please trigger a redeploy in Vercel to load the newly connected database.",
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

  const KEY = "room106_leaderboard_2026";

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

  try {
    // 1. GET: Fetch the current class leaderboard
    if (req.method === "GET") {
      let data = await upstashCommand(["GET", KEY]);

      // Fallback to path-based GET if array format failed
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

      return res.status(200).json({
        ok: true,
        isCloudConnected: true,
        roster: Array.isArray(roster) ? roster : []
      });
    }

    // 2. POST: Submit / Update a student's score
    if (req.method === "POST") {
      let student = req.body;
      if (typeof student === "string") {
        try {
          student = JSON.parse(student);
        } catch (e) {
          student = {};
        }
      }

      if (!student || !student.id || !student.name) {
        return res.status(400).json({ ok: false, error: "Missing student data" });
      }

      // Fetch current roster
      let getData = await upstashCommand(["GET", KEY]);
      if (!getData || getData.error) {
        const pathResp = await fetch(`${kvUrl}/get/${KEY}`, {
          headers: { Authorization: `Bearer ${kvToken}` }
        });
        getData = await pathResp.json();
      }

      let roster = [];
      if (getData && getData.result) {
        try {
          roster = typeof getData.result === "string" ? JSON.parse(getData.result) : getData.result;
        } catch (e) {
          roster = [];
        }
      }
      if (!Array.isArray(roster)) roster = [];

      // Clean and sanitize student payload
      const cleanRecord = {
        id: String(student.id).slice(0, 50),
        name: String(student.name).slice(0, 40),
        section: String(student.section || "BSCPE 4D").slice(0, 20),
        avatar: String(student.avatar || "🤖").slice(0, 10),
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
          title: String(student.levelInfo?.title || "Engineering Recruit").slice(0, 40)
        },
        fastestBlitz: student.fastestBlitz ? Number(student.fastestBlitz) : null,
        highestPercent: Number(student.highestPercent) || 0,
        subjectStats: student.subjectStats && typeof student.subjectStats === "object" ? student.subjectStats : {},
        updatedAt: Date.now()
      };

      // Merge or update student in roster
      const existingIdx = roster.findIndex((item) => item.id === cleanRecord.id);
      if (existingIdx >= 0) {
        const existing = roster[existingIdx];

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

      // Save updated roster to Upstash Redis using array-based SET
      await upstashCommand(["SET", KEY, JSON.stringify(roster)]);

      return res.status(200).json({
        ok: true,
        isCloudConnected: true,
        roster
      });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed" });
  } catch (err) {
    console.error("Leaderboard API Error:", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}
