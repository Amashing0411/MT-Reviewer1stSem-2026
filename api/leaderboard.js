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

  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  // If KV is not configured yet in Vercel Dashboard
  if (!kvUrl || !kvToken) {
    if (req.method === "GET") {
      return res.status(200).json({
        ok: false,
        isCloudConnected: false,
        message: "Vercel KV not connected yet. Add KV database in Vercel Storage tab to sync across devices.",
        roster: []
      });
    }
    return res.status(200).json({
      ok: false,
      isCloudConnected: false,
      message: "Vercel KV not connected"
    });
  }

  const KEY = "room106_leaderboard_2026";

  try {
    // 1. GET: Fetch the current class leaderboard
    if (req.method === "GET") {
      const resp = await fetch(`${kvUrl}/get/${KEY}`, {
        headers: { Authorization: `Bearer ${kvToken}` }
      });
      const data = await resp.json();

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
      const getResp = await fetch(`${kvUrl}/get/${KEY}`, {
        headers: { Authorization: `Bearer ${kvToken}` }
      });
      const getData = await getResp.json();
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
        updatedAt: Date.now()
      };

      // Merge or update student in roster
      const existingIdx = roster.findIndex((item) => item.id === cleanRecord.id);
      if (existingIdx >= 0) {
        const existing = roster[existingIdx];
        roster[existingIdx] = {
          ...cleanRecord,
          xp: Math.max(existing.xp || 0, cleanRecord.xp),
          fastestBlitz: cleanRecord.fastestBlitz
            ? existing.fastestBlitz
              ? Math.min(existing.fastestBlitz, cleanRecord.fastestBlitz)
              : cleanRecord.fastestBlitz
            : existing.fastestBlitz,
          highestPercent: Math.max(existing.highestPercent || 0, cleanRecord.highestPercent),
          customPhoto: cleanRecord.customPhoto || existing.customPhoto || null
        };
      } else {
        roster.push(cleanRecord);
      }

      // Sort by XP descending and cap at 150 students
      roster.sort((a, b) => (b.xp || 0) - (a.xp || 0));
      if (roster.length > 150) roster = roster.slice(0, 150);

      // Save updated roster to KV
      await fetch(`${kvUrl}/set/${KEY}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(JSON.stringify(roster))
      });

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
