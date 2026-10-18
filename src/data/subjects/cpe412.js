export const cpe412Data = {
  id: "cpe412",
  code: "CPE412",
  title: "Seminars and Fieldtrips",
  description: "Industry Seminars, Fieldtrip Technical Reports, Plant Visits, Professional Etiquette, and Academic Documentation.",
  room: "Room 106",
  schedule: "Tuesday, October 20, 2026 (2:00 PM - 3:00 PM)",
  proctor: "Ferlene Rubin / Layzon Briones",
  examFormat: {
    types: [
      "Official Notice",
      "Seminar Report Writing",
      "Industrial Plant Etiquette"
    ],
    coverage: "Official Course Status: As confirmed in Coverage.txt, 'No materials for this' were issued for written lecture coverage."
  },
  topics: [
    {
      unitId: "cpe412-u1",
      unitTitle: "Unit 1: Official Department Advisory",
      summary: "Official status of examination materials for CPE412 Seminars and Fieldtrips.",
      cards: [
        {
          id: "cpe412-c1",
          title: "Official Advisory: Examination Material Status",
          category: "Advisory",
          badge: "Official Record",
          content: "As documented in the official department course folder (`Coverage.txt`): **'No materials for this.'** No formal lecture slides or written examination problem sets were released by the instructors for CPE412.",
          keyPoints: [
            "**Official Document:** `materials_extracted/CPE412_Seminars_and_Fieldtrips/Coverage.txt`",
            "**Examination Schedule:** Tuesday, October 20, 2026 (2:00 PM – 3:00 PM) in Room 106.",
            "**Proctors:** Ferlene Rubin / Layzon Briones.",
            "**Instructional Focus:** Assessment in this course typically hinges on seminar attendance, speaker reaction papers, field trip compliance, and portfolio submission rather than traditional written problem solving."
          ]
        }
      ]
    },
    {
      unitId: "cpe412-u2",
      unitTitle: "Unit 2: Seminar Reporting & Industrial Etiquette",
      summary: "Standard technical reporting guidelines for seminars and industrial plant visit safety protocols for Computer Engineers.",
      cards: [
        {
          id: "cpe412-c2",
          title: "Technical Seminar Reaction Paper Architecture",
          category: "Seminar Guidelines",
          badge: "Best Practice",
          content: "Recommended structural framework for technical seminar documentation in Computer Engineering:",
          keyPoints: [
            "1. **Executive Summary:** Concise synopsis of the seminar topic, keynote speaker profile, and host organization.",
            "2. **Key Technological Insights:** In-depth discussion of technical concepts presented (e.g., AI microarchitectures, cybersecurity infrastructure, cloud native architectures).",
            "3. **Industry Relevance:** How the presented technology directly impacts modern engineering practice and Philippine industry.",
            "4. **Personal Learning & Engineering Reflections:** Critique of the presentation, key personal takeaways, and potential application to senior design capstone projects."
          ]
        },
        {
          id: "cpe412-c3",
          title: "Industrial Plant Visit Protocols & Safety Standards",
          category: "Fieldtrip Safety",
          badge: "Safety Protocols",
          content: "Standard operating procedures and safety compliance during manufacturing or data center plant tours:",
          keyPoints: [
            "• **Personal Protective Equipment (PPE):** Hard hats, safety glasses, high-visibility vests, and closed-toe steel-reinforced shoes where required.",
            "• **ESD (Electrostatic Discharge) Prevention:** Utilizing grounded wrist straps or ESD smocks in cleanroom/semiconductor fabrication facilities.",
            "• **Non-Disclosure Agreements (NDA):** Strict adherence to proprietary photography bans and trade secret protections.",
            "• **Emergency Evacuation Routes:** Identifying emergency exits, assembly points, and adhering strictly to designated plant visitor lanes."
          ]
        }
      ]
    }
  ],
  flashcards: [
    {
      id: "cpe412-fc1",
      question: "What does the official department record state regarding CPE412 exam materials?",
      answer: "The official Coverage.txt file states: 'No materials for this.' Assessment is primarily based on seminar attendance, portfolio submission, and field trip reports.",
      category: "Advisory"
    },
    {
      id: "cpe412-fc2",
      question: "What is the official examination schedule and venue for CPE412?",
      answer: "Tuesday, October 20, 2026 (2:00 PM - 3:00 PM) in Room 106, proctored by Ferlene Rubin and Layzon Briones.",
      category: "Schedule"
    },
    {
      id: "cpe412-fc3",
      question: "What are the four core sections of a technical seminar reaction paper?",
      answer: "1. Executive Summary\n2. Key Technological Insights\n3. Industry Relevance\n4. Personal Learning & Engineering Reflections",
      category: "Documentation"
    },
    {
      id: "cpe412-fc4",
      question: "What should be included in the 'Executive Summary' of a seminar reaction paper?",
      answer: "A concise synopsis of the seminar title, keynote speaker qualifications, host organization/company, and overall theme.",
      category: "Documentation"
    },
    {
      id: "cpe412-fc5",
      question: "What should be analyzed under the 'Key Technological Insights' section of a seminar report?",
      answer: "In-depth breakdown of engineering methodologies, system architectures, algorithms, protocols, or emerging hardware/software tools discussed by the speaker.",
      category: "Documentation"
    },
    {
      id: "cpe412-fc6",
      question: "What is the purpose of the 'Personal Learning & Engineering Reflections' section?",
      answer: "To evaluate how the technical lessons apply to the student's senior design capstone project, career objectives, and professional engineering practice.",
      category: "Documentation"
    },
    {
      id: "cpe412-fc7",
      question: "What does ESD stand for and why is it critical during electronics plant tours?",
      answer: "Electrostatic Discharge. It is critical because human static charges can irreversibly damage microscopic semiconductor gates and PCB components without visual evidence.",
      category: "Industrial Safety"
    },
    {
      id: "cpe412-fc8",
      question: "What PPE items are typically required during hardware manufacturing plant visits?",
      answer: "Hard hat, safety glasses with side shields, high-visibility vest, closed-toe steel-reinforced shoes, and ESD smocks/grounded heel straps in cleanrooms.",
      category: "Industrial Safety"
    },
    {
      id: "cpe412-fc9",
      question: "Why are Non-Disclosure Agreements (NDAs) enforced during high-tech facility visits?",
      answer: "To legally protect proprietary manufacturing processes, unreleased chip designs, network topology diagrams, and patented industrial secrets.",
      category: "Professional Ethics"
    },
    {
      id: "cpe412-fc10",
      question: "What is the primary instructional delivery model of CPE412 Seminars and Fieldtrips?",
      answer: "Experiential learning through industry guest lectures, industrial facility visits, professional networking, and written reflective technical portfolios.",
      category: "Curriculum"
    }
  ],
  mockQuestions: [
    {
      id: "cpe412-mq1",
      question: "According to official DLSP course documentation for CPE412, which materials were officially released for the midterm review?",
      options: [
        "A 50-page lecture module on field trip logistics",
        "No materials were issued ('No materials for this' per Coverage.txt)",
        "A handbook on industrial machinery",
        "A set of 100 solved problems on plant visits"
      ],
      correctAnswer: 1,
      explanation: "Coverage.txt confirms verbatim: 'No materials for this.' Assessment focuses on seminar portfolios and attendance.",
      category: "Advisory"
    },
    {
      id: "cpe412-mq2",
      question: "When touring a semiconductor fabrication cleanroom, which safety protocol is crucial to protect silicon wafers from static electricity?",
      options: [
        "Using Bluetooth headsets",
        "Wearing ESD-safe garments and grounded shoe covers",
        "Running high-speed internet benchmarks",
        "Increasing air temperature"
      ],
      correctAnswer: 1,
      explanation: "Electrostatic discharge (ESD) can destroy microscopic silicon circuitry, requiring grounded garments and straps in cleanrooms.",
      category: "Industrial Safety"
    },
    {
      id: "cpe412-mq3",
      question: "What is the scheduled exam time and room for CPE412 (Seminars and Fieldtrips)?",
      options: [
        "Monday, October 19 (3:00 PM - 4:00 PM), Room 106",
        "Tuesday, October 20 (2:00 PM - 3:00 PM), Room 106",
        "Tuesday, October 20 (4:00 PM - 5:00 PM), Room 106",
        "Wednesday, October 21 (1:00 PM - 2:00 PM), Room 106"
      ],
      correctAnswer: 1,
      explanation: "Per the official DLSP Room 106 schedule, CPE412 is scheduled for Tuesday, October 20, 2026, from 2:00 PM to 3:00 PM.",
      category: "Schedule"
    },
    {
      id: "cpe412-mq4",
      question: "In a formal engineering seminar reaction paper, which section provides the background of the speaker, host organization, and seminar theme?",
      options: [
        "Key Technological Insights",
        "Executive Summary",
        "Industry Relevance",
        "Personal Reflections"
      ],
      correctAnswer: 1,
      explanation: "The Executive Summary introduces the topic, keynote speaker profile, host company, and main objectives.",
      category: "Documentation"
    },
    {
      id: "cpe412-mq5",
      question: "Why is photography strictly restricted during field trips to advanced telecom or semiconductor facilities?",
      options: [
        "Camera flashes degrade fiber optic cables",
        "To protect proprietary intellectual property, trade secrets, and security infrastructure under NDAs",
        "It causes radio frequency interference with Wi-Fi",
        "University guidelines forbid capturing photos off-campus"
      ],
      correctAnswer: 1,
      explanation: "High-tech facilities enforce strict NDAs to guard trade secrets, assembly lines, and proprietary layouts from corporate espionage.",
      category: "Professional Ethics"
    },
    {
      id: "cpe412-mq6",
      question: "Connecting seminar concepts to the student's senior capstone design project belongs in which section of a technical report?",
      options: [
        "Executive Summary",
        "Financial Disclosures",
        "Personal Learning & Engineering Reflections",
        "List of Attendees"
      ],
      correctAnswer: 2,
      explanation: "The Personal Learning and Reflections section evaluates how insights connect to ongoing capstone research and career plans.",
      category: "Documentation"
    },
    {
      id: "cpe412-mq7",
      question: "Which of the following is standard PPE required when visiting an active industrial automation assembly floor?",
      options: [
        "Sandals and laboratory coat",
        "Hard hat, safety glasses, high-visibility vest, and closed-toe safety boots",
        "Woolen gloves and dark sunglasses",
        "Earbuds and casual sneakers"
      ],
      correctAnswer: 1,
      explanation: "Industrial safety standards mandate hard hats, eye protection, high-visibility vests, and reinforced closed-toe footwear.",
      category: "Industrial Safety"
    },
    {
      id: "cpe412-mq8",
      question: "Who are the assigned proctors for the CPE412 examination in Room 106?",
      options: [
        "Lyka Magbuhos",
        "Ferlene Rubin / Layzon Briones",
        "Engr. Joel C. Ananias",
        "Dean of Engineering"
      ],
      correctAnswer: 1,
      explanation: "The proctoring assignment on the official timetable lists Ferlene Rubin / Layzon Briones for the Tuesday afternoon sessions.",
      category: "Schedule"
    },
    {
      id: "cpe412-mq9",
      question: "What is the primary objective of technical seminars in the Computer Engineering curriculum?",
      options: [
        "To replace all textbook examinations with oral recitations",
        "To bridge academic theory with cutting-edge industry practices, emerging technologies, and professional networking",
        "To provide recreational off-campus travel",
        "To fulfill marketing requirements for sponsor companies"
      ],
      correctAnswer: 1,
      explanation: "Seminars expose students to industry standards, real-world engineering challenges, and emerging technology trends outside classroom theory.",
      category: "Curriculum"
    },
    {
      id: "cpe412-mq10",
      question: "In cleanroom standards, why must visitor movement be confined strictly to designated yellow or blue walkway lines?",
      options: [
        "To ensure the air conditioning remains balanced",
        "To prevent accidental contamination of sensitive manufacturing zones and avoid high-voltage equipment hazards",
        "To allow faster walking speeds",
        "To keep visitors grouped for group photography"
      ],
      correctAnswer: 1,
      explanation: "Designated walkways maintain cleanroom particulate boundaries and keep non-certified visitors away from hazardous equipment.",
      category: "Industrial Safety"
    }
  ],
  cramNotes: [
    "CPE412 Official Status: 'No materials for this' (per Coverage.txt).",
    "Schedule: Tuesday, October 20, 2026 (2:00 PM – 3:00 PM), Room 106.",
    "Proctors: Ferlene Rubin / Layzon Briones.",
    "Seminar Paper Structure: Executive Summary -> Tech Insights -> Industry Relevance -> Reflections.",
    "Plant Visit Safety: Mandatory PPE, ESD precautions in hardware labs, strict NDA compliance."
  ]
};
