// Official DLSP College of Engineering Midterm Examination Schedule AY 2026-2027
// Full coverage for all 4th Year Sections: BSCPE 4A, 4B, 4C, 4D

export const SECTIONS = {
  "4A": {
    code: "4A",
    name: "BSCPE 4A",
    room: "Room 109",
    proctorDay1: "Joel Urriquia",
    proctorDay2: "Jezreel Punto",
    accentColor: "from-blue-600 to-indigo-600",
    badgeBg: "bg-blue-100 text-blue-900 border-blue-200",
  },
  "4B": {
    code: "4B",
    name: "BSCPE 4B",
    room: "Room 108",
    proctorDay1: "Luisa Tubana",
    proctorDay2: "Dr. Randal Pasco & Reymark Maolen",
    accentColor: "from-cyan-600 to-blue-600",
    badgeBg: "bg-cyan-100 text-cyan-900 border-cyan-200",
  },
  "4C": {
    code: "4C",
    name: "BSCPE 4C",
    room: "Room 107",
    proctorDay1: "Rosebel Agapay",
    proctorDay2: "Dr. Cartney Lagaya & Czarina Banayo",
    accentColor: "from-emerald-600 to-teal-600",
    badgeBg: "bg-emerald-100 text-emerald-900 border-emerald-200",
  },
  "4D": {
    code: "4D",
    name: "BSCPE 4D",
    room: "Room 106",
    proctorDay1: "Lyka Magbuhos",
    proctorDay2: "Ferlene Rubin & Layzon Briones",
    accentColor: "from-amber-600 to-orange-600",
    badgeBg: "bg-amber-100 text-amber-900 border-amber-200",
  },
};

export const MASTER_EXAM_TIMETABLE = [
  {
    day: "Day 1 - Monday Afternoon",
    date: "October 19, 2026",
    dayKey: "day1",
    exams: [
      {
        id: "cpe414",
        code: "CPE414",
        title: "Digital Signal Processing",
        time: "2:00 PM - 3:00 PM",
        icon: "Cpu",
        color: "from-blue-500 to-indigo-600",
        badge: "Mon 2:00 PM",
        units: 3,
        description: "Discrete-time signals, LTI systems, Z-Transforms, DFT/FFT, FIR/IIR filter design.",
      },
      {
        id: "cpe411",
        code: "CPE411",
        title: "CPE Practice and Design 2",
        time: "3:00 PM - 4:00 PM",
        icon: "Hammer",
        color: "from-emerald-500 to-teal-600",
        badge: "Mon 3:00 PM",
        units: 2,
        description: "Capstone project execution, prototyping, engineering standards, testing and defense documentation.",
      },
      {
        id: "cpe416",
        code: "CPE416",
        title: "CPE Laws and Professional Practice",
        time: "4:00 PM - 5:00 PM",
        icon: "Scale",
        color: "from-amber-500 to-orange-600",
        badge: "Mon 4:00 PM",
        units: 2,
        description: "RA 9292, Cybercrime Prevention Act (RA 10175), Data Privacy Act (RA 10173), Intellectual Property Code, Engineering Ethics.",
      },
      {
        id: "cpe415",
        code: "CPE415",
        title: "Engineering Management",
        time: "5:00 PM - 6:00 PM",
        icon: "Briefcase",
        color: "from-purple-500 to-pink-600",
        badge: "Mon 5:00 PM",
        units: 3,
        description: "Planning, organizing, leading, controlling, decision-making, financial analysis, project management (PERT/CPM).",
      },
    ],
  },
  {
    day: "Day 2 - Tuesday Afternoon",
    date: "October 20, 2026",
    dayKey: "day2",
    exams: [
      {
        id: "cpe412",
        code: "CPE412",
        title: "Seminars and Fieldtrips",
        time: "2:00 PM - 3:00 PM",
        icon: "Compass",
        color: "from-cyan-500 to-blue-600",
        badge: "Tue 2:00 PM",
        units: 1,
        description: "Applied engineering common sense, industrial workplace decorum, plant safety protocols, technical documentation.",
      },
      {
        id: "elect3",
        code: "ELECT3",
        title: "Elective 3",
        time: "3:00 PM - 4:00 PM",
        icon: "Zap",
        color: "from-rose-500 to-red-600",
        badge: "Tue 3:00 PM",
        units: 3,
        description: "Advanced specialization topic, practical implementations, system architecture, case studies.",
      },
      {
        id: "cpe413",
        code: "CPE413",
        title: "Computer Architecture and Organization",
        time: "4:00 PM - 5:00 PM",
        icon: "Layers",
        color: "from-violet-500 to-indigo-600",
        badge: "Tue 4:00 PM",
        units: 3,
        description: "Instruction Set Architecture (ISA), pipelining, hazards, memory hierarchy (cache, RAM), superscalar processing, I/O organization.",
      },
      {
        id: "engwork",
        code: "ENGWORK",
        title: "English in the Workplace",
        time: "5:00 PM - 6:00 PM",
        icon: "FileText",
        color: "from-teal-500 to-cyan-600",
        badge: "Tue 5:00 PM",
        units: 3,
        description: "Technical writing, business memos, RFPs, oral presentation skills, intercultural workplace communication, professional documentation.",
      },
    ],
  },
];

// Normalize section string to key: "4A", "4B", "4C", "4D"
export function normalizeSectionKey(rawSection = "") {
  const clean = String(rawSection).toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (clean.includes("4A")) return "4A";
  if (clean.includes("4B")) return "4B";
  if (clean.includes("4C")) return "4C";
  if (clean.includes("4D")) return "4D";
  return "4D"; // default
}

// Generate Schedule tailored to specific section (rooms and proctors)
export function getScheduleForSection(sectionCode = "4D") {
  const key = normalizeSectionKey(sectionCode);
  const sec = SECTIONS[key] || SECTIONS["4D"];

  return [
    {
      ...MASTER_EXAM_TIMETABLE[0],
      section: sec.name,
      room: sec.room,
      proctorDefault: sec.proctorDay1,
      exams: MASTER_EXAM_TIMETABLE[0].exams.map((exam) => ({
        ...exam,
        proctor: sec.proctorDay1,
        room: sec.room,
      })),
    },
    {
      ...MASTER_EXAM_TIMETABLE[1],
      section: sec.name,
      room: sec.room,
      proctorDefault: sec.proctorDay2,
      exams: MASTER_EXAM_TIMETABLE[1].exams.map((exam) => ({
        ...exam,
        proctor: sec.proctorDay2,
        room: sec.room,
      })),
    },
  ];
}

// Default export maintained for backwards compatibility
export const SCHEDULE_DATA = getScheduleForSection("4D");
