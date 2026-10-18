import { SUBJECTS_MAP } from "../data/subjects";

// Fisher-Yates shuffle
function shuffle(array, seed = null) {
  const arr = [...array];
  if (seed !== null) {
    // Simple pseudo-random generator with seed
    let s = Number(seed) || 12345;
    for (let i = arr.length - 1; i > 0; i--) {
      s = (s * 9301 + 49297) % 233280;
      const rnd = s / 233280;
      const j = Math.floor(rnd * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  } else {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  return arr;
}

// Prepare question pool for Battle Exam
export function getBattleQuestions(subjectId = "all", seed = null) {
  let pool = [];

  if (subjectId === "all" || !SUBJECTS_MAP[subjectId]) {
    // Combine questions from all 8 subjects
    Object.entries(SUBJECTS_MAP).forEach(([id, sub]) => {
      if (Array.isArray(sub.mockQuestions)) {
        sub.mockQuestions.forEach((q) => {
          pool.push({
            ...q,
            subjectId: id,
            subjectCode: sub.code || id.toUpperCase(),
            subjectTitle: sub.title || "",
          });
        });
      }
    });
  } else {
    const sub = SUBJECTS_MAP[subjectId];
    if (Array.isArray(sub.mockQuestions)) {
      sub.mockQuestions.forEach((q) => {
        pool.push({
          ...q,
          subjectId,
          subjectCode: sub.code || subjectId.toUpperCase(),
          subjectTitle: sub.title || "",
        });
      });
    }
  }

  // Fallback if empty
  if (pool.length === 0) {
    pool = [
      {
        id: "fallback-1",
        subjectCode: "BSCPE",
        subjectTitle: "Computer Engineering",
        question: "In computer systems, which bus connects the CPU directly to high-speed memory?",
        options: ["Front-Side Bus / System Bus", "USB Bus", "SATA Bus", "I2C Bus"],
        correctAnswer: 0,
        explanation: "The Front-Side Bus (or modern direct memory bus) provides high-bandwidth CPU-to-memory communication.",
      },
    ];
  }

  // Shuffle the questions order
  const shuffledQuestions = shuffle(pool, seed);

  // Return formatted questions with shuffled options
  return shuffledQuestions.map((q, idx) => {
    // Preserve option mapping
    const rawOpts = q.options.map((opt, i) => ({ text: opt, isCorrect: i === q.correctAnswer }));
    const shuffledOpts = shuffle(rawOpts, seed ? seed + idx : null);
    const newCorrectIdx = shuffledOpts.findIndex((o) => o.isCorrect);

    return {
      id: q.id || `q_${idx}`,
      subjectCode: q.subjectCode,
      subjectTitle: q.subjectTitle,
      question: q.question,
      options: shuffledOpts.map((o) => o.text),
      correctAnswer: newCorrectIdx,
      explanation: q.explanation || "",
      category: q.category || "General",
    };
  });
}
