export const cpe411Data = {
  id: "cpe411",
  code: "CPE411",
  title: "CPE Practice and Design 2",
  description: "Senior design capstone project documentation: Chapter 4 (Project Feasibility, Testing, Evaluation Results, Project Benefits) and Chapter 5 (Summary of Findings, Conclusions, Recommendations).",
  room: "Room 106",
  schedule: "Monday, October 19, 2026 (3:00 PM - 4:00 PM)",
  proctor: "Lyka Magbuhos",
  examFormat: {
    types: [
      "Enumeration",
      "Identification",
      "Analysis & Case Application"
    ],
    coverage: "Chapter 4 (Design 2: Feasibility, Testing, Benefits) & Chapter 5 (Findings, Conclusions, Recommendations)"
  },
  topics: [
    {
      unitId: "cpe411-u1",
      unitTitle: "Chapter 4: Project Feasibility Dimensions",
      summary: "Comprehensive assessment of project feasibility across technical, operational, economic, and schedule dimensions.",
      cards: [
        {
          id: "cpe411-c1",
          title: "1. Project Technical Feasibility",
          category: "Feasibility Analysis",
          badge: "Verbatim Slide",
          content: "Assesses whether the project can be executed with the available technology, tools, and technical expertise.",
          keyPoints: [
            "**Definition:** Assesses whether the project can be executed with the available technology, tools, and technical expertise.",
            "**Example:** In designing a smart irrigation system, checking if the sensors and microcontrollers (like Arduino or Raspberry Pi) can handle soil moisture detection and automated water flow.",
            "**Use in Research:** Ensures the proposed design is technically achievable and not beyond current capabilities.",
            "**Key Considerations:** Hardware compatibility, software toolchains, sensor calibration accuracy, and processing bandwidth."
          ],
          examTrap: "Do not confuse Technical Feasibility with Operational Feasibility: Technical asks 'CAN we build it with current hardware and software?', while Operational asks 'WILL users be able and willing to operate it in daily practice?'"
        },
        {
          id: "cpe411-c2",
          title: "2. Project Operational Feasibility",
          category: "Feasibility Analysis",
          badge: "Verbatim Slide",
          content: "Examines if the proposed system will work smoothly in real-world operations and if users can easily adopt it.",
          keyPoints: [
            "**Definition:** Examines if the proposed system will work smoothly in real-world operations and if users can easily adopt it.",
            "**Example:** Testing if farmers can easily operate the mobile app for the irrigation system without advanced technical knowledge.",
            "**Use in Research:** Confirms that the system is user-friendly and sustainable in daily use.",
            "**Key Considerations:** Human-computer interaction (HCI), UI ergonomics, operator training requirements, and operational workflows."
          ]
        },
        {
          id: "cpe411-c3",
          title: "5. Project Economic Feasibility",
          category: "Feasibility Analysis",
          badge: "Verbatim Slide",
          content: "Assesses whether the project is financially viable by comparing costs versus benefits.",
          keyPoints: [
            "**Definition:** Assesses whether the project is financially viable by comparing costs versus benefits.",
            "**Example:** Calculating if the cost of sensors, controllers, and installation can be recovered by the savings in water bills and increased harvest revenue within 2 years.",
            "**Use in Research:** Ensures stakeholders that the project is cost-effective.",
            "**Key Metrics:** Return on Investment (ROI), payback period, initial capital expenditure (CapEx) vs operational expenditure (OpEx)."
          ]
        },
        {
          id: "cpe411-c4",
          title: "6. Project Schedule Feasibility",
          category: "Feasibility Analysis",
          badge: "Verbatim Slide",
          content: "Determines if the project can be completed within the planned timeline.",
          keyPoints: [
            "**Definition:** Determines if the project can be completed within the planned timeline.",
            "**Example:** Checking if the irrigation system prototype can be built, tested, and deployed within 6 months.",
            "**Use in Research:** Aligns project goals with realistic timeframes to avoid delays and resource waste.",
            "**Key Tools:** Gantt charts, milestone tracking, buffer management, and critical path analysis."
          ]
        }
      ]
    },
    {
      unitId: "cpe411-u2",
      unitTitle: "Chapter 4: Testing, Evaluation & Project Benefits",
      summary: "Verification and validation processes, four core software/hardware quality attributes, and stakeholder value justification.",
      cards: [
        {
          id: "cpe411-c5",
          title: "3. Testing, Evaluation Results, and Analysis",
          category: "Verification & Validation",
          badge: "Verbatim Slide",
          content: "Process of verifying and validating the design against requirements, then analyzing the outcomes.",
          keyPoints: [
            "**Definition:** Process of verifying and validating the design against requirements, then analyzing the outcomes.",
            "**Example:** Running performance tests on the irrigation system to measure water efficiency, then analyzing data to compare with traditional irrigation methods.",
            "**Use in Research:** Provides evidence that the project meets its objectives and identifies strengths/weaknesses.",
            "**Four Fundamental Evaluation Attributes (Slide 14):**\n1. **Reliability:** Consistent and error-free operation over extended durations under normal and peak loads.\n2. **Security:** Resistance to unauthorized access, tampering, data interception, and physical disruption.\n3. **Maintainability:** Ease with which hardware components can be repaired or replaced and software code can be updated or debugged.\n4. **Portability:** Ability of the system software or hardware modules to adapt across different environments, hardware platforms, or operating systems."
          ],
          examTrap: "Memorize the four attributes on Slide 14 verbatim: Reliability, Security, Maintainability, Portability!"
        },
        {
          id: "cpe411-c6",
          title: "4. Project Benefits",
          category: "Value Justification",
          badge: "Verbatim Slide",
          content: "The advantages or value the project will bring to stakeholders (economic, social, environmental, or technical).",
          keyPoints: [
            "**Definition:** The advantages or value the project will bring to stakeholders (economic, social, environmental, or technical).",
            "**Example:** The irrigation system reduces water consumption by 30%, saves costs, and improves crop yield.",
            "**Use in Research:** Demonstrates the project’s contribution and justifies why it should be implemented.",
            "**Stakeholder Dimensions:**\n• *Economic:* Direct cost savings, resource conservation, increased revenue.\n• *Environmental:* Reduced water footprint, eco-friendly sensor deployments.\n• *Social & Technical:* Improved livelihood for farm workers, technological advancement."
          ]
        }
      ]
    },
    {
      unitId: "cpe411-u3",
      unitTitle: "Chapter 5: Findings, Conclusions, and Recommendations",
      summary: "The triad of Chapter 5: synthesizing empirical research evidence, formulating objective conclusions, and proposing actionable future work.",
      cards: [
        {
          id: "cpe411-c7",
          title: "7. Summary of Findings",
          category: "Chapter 5 Synthesis",
          badge: "Verbatim Slide",
          content: "A concise recap of results obtained from tests, feasibility studies, and analyses.",
          keyPoints: [
            "**Definition:** A concise recap of results obtained from tests, feasibility studies, and analyses.",
            "**Example:** 'The irrigation system achieved a 30% water savings, was technically stable, and had high user acceptance among farmers.'",
            "**Use in Research:** Summarizes evidence to support conclusions.",
            "**Structure:** Must strictly stem from actual empirical data collected in Chapter 4 tests without introducing unverified assumptions."
          ]
        },
        {
          id: "cpe411-c8",
          title: "8. Conclusions",
          category: "Chapter 5 Synthesis",
          badge: "Verbatim Slide",
          content: "Final interpretation of research results, showing whether objectives were achieved.",
          keyPoints: [
            "**Definition:** Final interpretation of research results, showing whether objectives were achieved.",
            "**Example:** 'The smart irrigation system is technically and economically feasible, and it can significantly improve farming efficiency.'",
            "**Use in Research:** Demonstrates the project’s overall success and relevance.",
            "**Core Criterion:** Directly answers the specific objectives stated in Chapter 1 of the capstone document."
          ]
        },
        {
          id: "cpe411-c9",
          title: "9. Recommendations",
          category: "Chapter 5 Synthesis",
          badge: "Verbatim Slide",
          content: "Suggestions for improvement, future research, or wider application of the project.",
          keyPoints: [
            "**Definition:** Suggestions for improvement, future research, or wider application of the project.",
            "**Example:** 'Future work should integrate solar panels for energy independence and expand the system for large-scale farming.'",
            "**Use in Research:** Guides stakeholders, researchers, or future developers on how to build upon the project.",
            "**Target Audiences:** Future student researchers, end-user industry partners, and system developers."
          ]
        }
      ]
    }
  ],
  flashcards: [
    {
      id: "cpe411-fc1",
      question: "What is the verbatim definition of Project Technical Feasibility?",
      answer: "Assesses whether the project can be executed with the available technology, tools, and technical expertise.",
      category: "Feasibility Analysis"
    },
    {
      id: "cpe411-fc2",
      question: "Give the verbatim slide example for Project Technical Feasibility.",
      answer: "In designing a smart irrigation system, checking if the sensors and microcontrollers (like Arduino or Raspberry Pi) can handle soil moisture detection and automated water flow.",
      category: "Feasibility Analysis"
    },
    {
      id: "cpe411-fc3",
      question: "What is the verbatim definition of Project Operational Feasibility?",
      answer: "Examines if the proposed system will work smoothly in real-world operations and if users can easily adopt it.",
      category: "Feasibility Analysis"
    },
    {
      id: "cpe411-fc4",
      question: "Give the verbatim slide example for Project Operational Feasibility.",
      answer: "Testing if farmers can easily operate the mobile app for the irrigation system without advanced technical knowledge.",
      category: "Feasibility Analysis"
    },
    {
      id: "cpe411-fc5",
      question: "What is the verbatim definition of Testing, Evaluation Results, and Analysis?",
      answer: "Process of verifying and validating the design against requirements, then analyzing the outcomes.",
      category: "Testing & Evaluation"
    },
    {
      id: "cpe411-fc6",
      question: "Give the verbatim slide example for Testing, Evaluation Results, and Analysis.",
      answer: "Running performance tests on the irrigation system to measure water efficiency, then analyzing data to compare with traditional irrigation methods.",
      category: "Testing & Evaluation"
    },
    {
      id: "cpe411-fc7",
      question: "What are the four fundamental evaluation attributes listed on Slide 14?",
      answer: "1. Reliability\n2. Security\n3. Maintainability\n4. Portability",
      category: "Testing & Evaluation"
    },
    {
      id: "cpe411-fc8",
      question: "How does Slide 14's 'Reliability' apply to an engineering design project?",
      answer: "Ensuring consistent, error-free operation over extended durations under normal and peak operating conditions without unexpected system crashes.",
      category: "Testing & Evaluation"
    },
    {
      id: "cpe411-fc9",
      question: "How does Slide 14's 'Portability' apply to an engineering design project?",
      answer: "The ability of the system software or hardware modules to operate across diverse environments, operating systems, or hardware architectures with minimal reconfiguration.",
      category: "Testing & Evaluation"
    },
    {
      id: "cpe411-fc10",
      question: "What is the verbatim definition of Project Benefits?",
      answer: "The advantages or value the project will bring to stakeholders (economic, social, environmental, or technical).",
      category: "Value Justification"
    },
    {
      id: "cpe411-fc11",
      question: "Give the verbatim slide example for Project Benefits.",
      answer: "The irrigation system reduces water consumption by 30%, saves costs, and improves crop yield.",
      category: "Value Justification"
    },
    {
      id: "cpe411-fc12",
      question: "What is the verbatim definition of Project Economic Feasibility?",
      answer: "Assesses whether the project is financially viable by comparing costs versus benefits.",
      category: "Feasibility Analysis"
    },
    {
      id: "cpe411-fc13",
      question: "Give the verbatim slide example for Project Economic Feasibility.",
      answer: "Calculating if the cost of sensors, controllers, and installation can be recovered by the savings in water bills and increased harvest revenue within 2 years.",
      category: "Feasibility Analysis"
    },
    {
      id: "cpe411-fc14",
      question: "What is the verbatim definition of Project Schedule Feasibility?",
      answer: "Determines if the project can be completed within the planned timeline.",
      category: "Feasibility Analysis"
    },
    {
      id: "cpe411-fc15",
      question: "Give the verbatim slide example for Project Schedule Feasibility.",
      answer: "Checking if the irrigation system prototype can be built, tested, and deployed within 6 months.",
      category: "Feasibility Analysis"
    },
    {
      id: "cpe411-fc16",
      question: "What is the verbatim definition of Summary of Findings in Chapter 5?",
      answer: "A concise recap of results obtained from tests, feasibility studies, and analyses.",
      category: "Chapter 5 Synthesis"
    },
    {
      id: "cpe411-fc17",
      question: "Give the verbatim slide example for Summary of Findings.",
      answer: "'The irrigation system achieved a 30% water savings, was technically stable, and had high user acceptance among farmers.'",
      category: "Chapter 5 Synthesis"
    },
    {
      id: "cpe411-fc18",
      question: "What is the verbatim definition of Conclusions in Chapter 5?",
      answer: "Final interpretation of research results, showing whether objectives were achieved.",
      category: "Chapter 5 Synthesis"
    },
    {
      id: "cpe411-fc19",
      question: "Give the verbatim slide example for Conclusions in Chapter 5.",
      answer: "'The smart irrigation system is technically and economically feasible, and it can significantly improve farming efficiency.'",
      category: "Chapter 5 Synthesis"
    },
    {
      id: "cpe411-fc20",
      question: "What is the verbatim definition of Recommendations in Chapter 5 and its slide example?",
      answer: "Definition: Suggestions for improvement, future research, or wider application of the project.\nExample: 'Future work should integrate solar panels for energy independence and expand the system for large-scale farming.'",
      category: "Chapter 5 Synthesis"
    }
  ],
  mockQuestions: [
    {
      id: "cpe411-mq1",
      question: "Testing whether farmers can navigate a mobile app without advanced technical knowledge evaluates which feasibility dimension?",
      options: [
        "Project Technical Feasibility",
        "Project Operational Feasibility",
        "Project Schedule Feasibility",
        "Project Economic Feasibility"
      ],
      correctAnswer: 1,
      explanation: "Operational feasibility examines if the proposed system will work smoothly in real-world operations and if users can easily adopt it.",
      category: "Feasibility Analysis"
    },
    {
      id: "cpe411-mq2",
      question: "Which of the following is NOT one of the four key testing and evaluation attributes listed on Slide 14?",
      options: [
        "Reliability",
        "Security",
        "Maintainability",
        "Marketability"
      ],
      correctAnswer: 3,
      explanation: "Slide 14 specifically enumerates: Reliability, Security, Maintainability, and Portability.",
      category: "Testing & Evaluation"
    },
    {
      id: "cpe411-mq3",
      question: "In the smart irrigation project example, calculating if sensor costs can be recovered through water bill savings within 2 years assesses:",
      options: [
        "Project Technical Feasibility",
        "Project Operational Feasibility",
        "Project Economic Feasibility",
        "Project Schedule Feasibility"
      ],
      correctAnswer: 2,
      explanation: "Project Economic Feasibility assesses whether the project is financially viable by comparing costs versus benefits.",
      category: "Feasibility Analysis"
    },
    {
      id: "cpe411-mq4",
      question: "'Future work should integrate solar panels for energy independence and expand the system for large-scale farming' belongs in which section?",
      options: [
        "Summary of Findings",
        "Conclusions",
        "Recommendations",
        "Technical Feasibility"
      ],
      correctAnswer: 2,
      explanation: "Recommendations provide suggestions for improvement, future research, or wider application of the project.",
      category: "Chapter 5 Synthesis"
    },
    {
      id: "cpe411-mq5",
      question: "Which Chapter 5 component provides a concise recap of results obtained from tests, feasibility studies, and analyses to support conclusions?",
      options: [
        "Recommendations",
        "Conclusions",
        "Summary of Findings",
        "Operational Feasibility"
      ],
      correctAnswer: 2,
      explanation: "Summary of Findings is defined verbatim as a concise recap of results obtained from tests, feasibility studies, and analyses.",
      category: "Chapter 5 Synthesis"
    },
    {
      id: "cpe411-mq6",
      question: "Checking whether an Arduino or Raspberry Pi can handle soil moisture detection and automated water flow is an evaluation of:",
      options: [
        "Project Technical Feasibility",
        "Project Operational Feasibility",
        "Project Economic Feasibility",
        "Project Schedule Feasibility"
      ],
      correctAnswer: 0,
      explanation: "Technical feasibility evaluates if the project can be executed with available technology, tools, and technical expertise.",
      category: "Feasibility Analysis"
    },
    {
      id: "cpe411-mq7",
      question: "Determining whether a functional hardware prototype can be completely built, tested, and deployed within a 6-month timeframe is called:",
      options: [
        "Operational Feasibility",
        "Project Schedule Feasibility",
        "Economic Feasibility",
        "Traceability Matrix Feasibility"
      ],
      correctAnswer: 1,
      explanation: "Schedule Feasibility determines if the project can be completed within the planned timeline to prevent resource waste.",
      category: "Feasibility Analysis"
    },
    {
      id: "cpe411-mq8",
      question: "Which section in Chapter 4 defines advantages or value brought to stakeholders across economic, social, environmental, or technical dimensions?",
      options: [
        "Testing and Evaluation Results",
        "Project Benefits",
        "Schedule Feasibility",
        "Summary of Findings"
      ],
      correctAnswer: 1,
      explanation: "Project Benefits define the advantages or value the project will bring to stakeholders (economic, social, environmental, or technical).",
      category: "Value Justification"
    },
    {
      id: "cpe411-mq9",
      question: "In the lecture materials, what specific percentage of water savings was cited as the project benefit of the smart irrigation system?",
      options: [
        "15%",
        "30%",
        "50%",
        "75%"
      ],
      correctAnswer: 1,
      explanation: "The slide explicitly states: 'The irrigation system reduces water consumption by 30%, saves costs, and improves crop yield.'",
      category: "Value Justification"
    },
    {
      id: "cpe411-mq10",
      question: "Which of the four evaluation attributes on Slide 14 addresses how easily hardware components can be repaired or replaced and code can be debugged?",
      options: [
        "Reliability",
        "Security",
        "Maintainability",
        "Portability"
      ],
      correctAnswer: 2,
      explanation: "Maintainability measures the ease with which components can be maintained, repaired, replaced, or debugged.",
      category: "Testing & Evaluation"
    },
    {
      id: "cpe411-mq11",
      question: "Which of the four evaluation attributes on Slide 14 measures resistance to unauthorized access, tampering, and malicious data disruption?",
      options: [
        "Reliability",
        "Security",
        "Maintainability",
        "Portability"
      ],
      correctAnswer: 1,
      explanation: "Security evaluates protection against unauthorized intrusion, physical tampering, and data interception.",
      category: "Testing & Evaluation"
    },
    {
      id: "cpe411-mq12",
      question: "What is the primary use of 'Testing, Evaluation Results, and Analysis' in research writing?",
      options: [
        "To establish budget allocations for marketing",
        "To provide evidence that the project meets its objectives and identify strengths/weaknesses",
        "To replace the need for Chapter 5 Recommendations",
        "To guarantee 100% economic return on investment"
      ],
      correctAnswer: 1,
      explanation: "The slide specifies: 'Use in Research: Provides evidence that the project meets its objectives and identifies strengths/weaknesses.'",
      category: "Testing & Evaluation"
    },
    {
      id: "cpe411-mq13",
      question: "The statement: 'The smart irrigation system is technically and economically feasible, and it can significantly improve farming efficiency' represents:",
      options: [
        "A Summary of Finding",
        "A Conclusion",
        "A Recommendation",
        "A Feasibility Constraint"
      ],
      correctAnswer: 1,
      explanation: "Conclusions provide the final interpretation of research results, showing whether objectives were successfully achieved.",
      category: "Chapter 5 Synthesis"
    },
    {
      id: "cpe411-mq14",
      question: "What is the primary function of Chapter 5 Recommendations in a thesis or capstone project?",
      options: [
        "To summarize the statistical standard deviations of the hardware test trials",
        "To guide stakeholders, researchers, or future developers on how to build upon the project",
        "To list the cost breakdown of components purchased from suppliers",
        "To restate the theoretical background from Chapter 2"
      ],
      correctAnswer: 1,
      explanation: "Recommendations guide stakeholders, researchers, or future developers on how to build upon the project through improvements and future research.",
      category: "Chapter 5 Synthesis"
    },
    {
      id: "cpe411-mq15",
      question: "If an automated pill dispenser is technically functional but too complicated for elderly patients to set up, which feasibility failed?",
      options: [
        "Project Technical Feasibility",
        "Project Operational Feasibility",
        "Project Schedule Feasibility",
        "Project Economic Feasibility"
      ],
      correctAnswer: 1,
      explanation: "Operational feasibility evaluates real-world workflow and whether intended end-users can successfully adopt and operate the system.",
      category: "Feasibility Analysis"
    },
    {
      id: "cpe411-mq16",
      question: "The ability of an IoT sensor software application to run across Raspberry Pi OS, Linux Ubuntu, and Windows with minimal modification assesses:",
      options: [
        "Reliability",
        "Security",
        "Maintainability",
        "Portability"
      ],
      correctAnswer: 3,
      explanation: "Portability assesses the ease with which software or hardware designs can be transferred or adapted across diverse platforms and operating environments.",
      category: "Testing & Evaluation"
    },
    {
      id: "cpe411-mq17",
      question: "Which section of a capstone report directly demonstrates the project's societal or practical contribution and justifies its implementation?",
      options: [
        "Project Benefits",
        "Operational Feasibility",
        "Schedule Feasibility",
        "Gantt Chart"
      ],
      correctAnswer: 0,
      explanation: "Project Benefits demonstrate the project's contribution and justify why it should be implemented.",
      category: "Value Justification"
    },
    {
      id: "cpe411-mq18",
      question: "A student researcher writes: 'Sensor reading delay was 1.2s under dry soil and 0.4s under saturated soil.' This statement belongs in:",
      options: [
        "Project Economic Feasibility",
        "Testing, Evaluation Results, and Analysis",
        "Recommendations",
        "Project Schedule Feasibility"
      ],
      correctAnswer: 1,
      explanation: "Empirical performance data from test executions belongs in Testing, Evaluation Results, and Analysis.",
      category: "Testing & Evaluation"
    },
    {
      id: "cpe411-mq19",
      question: "Why must Summary of Findings strictly precede Conclusions in Chapter 5?",
      options: [
        "Conclusions must be drawn directly from summarized empirical evidence rather than speculation",
        "University formatting requires alphabetical chapter headings",
        "Summary of Findings only contains financial receipts",
        "Recommendations cannot be written without consulting the proctor"
      ],
      correctAnswer: 0,
      explanation: "The Summary of Findings provides the factual, empirical recap of evidence that justifies and supports the broader interpretive Conclusions.",
      category: "Chapter 5 Synthesis"
    },
    {
      id: "cpe411-mq20",
      question: "Which feasibility dimension directly assesses Return on Investment (ROI) and cost-recovery payback periods?",
      options: [
        "Technical Feasibility",
        "Operational Feasibility",
        "Project Economic Feasibility",
        "Project Schedule Feasibility"
      ],
      correctAnswer: 2,
      explanation: "Economic feasibility assesses financial viability by weighing project costs against tangible and intangible economic returns.",
      category: "Feasibility Analysis"
    }
  ],
  cramNotes: [
    "Technical Feasibility: Can the project be executed with available technology, tools, and expertise?",
    "Operational Feasibility: Will it work smoothly in real-world operations and can users adopt it easily?",
    "Economic Feasibility: Is it financially viable? Cost vs. benefit analysis (e.g. 2-year ROI).",
    "Schedule Feasibility: Can the project be completed within the planned timeline (e.g. 6 months)?",
    "Slide 14 Evaluation Attributes: Reliability, Security, Maintainability, Portability.",
    "Project Benefits: Advantages/value to stakeholders (economic, social, environmental, technical).",
    "Summary of Findings: Concise recap of results from tests, feasibility studies, and analyses.",
    "Conclusions: Final interpretation of research results, showing whether objectives were achieved.",
    "Recommendations: Suggestions for improvement, future research, or wider applications."
  ]
};
