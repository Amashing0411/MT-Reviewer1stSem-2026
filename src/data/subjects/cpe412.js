// CPE412: Seminars and Fieldtrips
// Official Status: Experiential Course framed around Applied Engineering Common Sense, Workplace Decorum, and Technical Reporting Standards.

export const cpe412Data = {
  id: "cpe412",
  code: "CPE412",
  title: "Seminars and Fieldtrips",
  description: "Applied Engineering Common Sense, Professional Workplace Decorum, Industrial Plant Safety Protocols, Technical Seminar Reaction Paper Architecture, and Field Observation Reporting.",
  schedule: "Tuesday, October 20, 2026 (2:00 PM - 3:00 PM)",
  units: 1,
  examFormat: {
    types: [
      "Applied Engineering Common Sense",
      "Workplace Decorum & Professional Etiquette",
      "Industrial Plant Safety Protocols",
      "Technical Seminar Reporting Standards"
    ],
    coverage: "Applied common-sense engineering principles, technical report structure, professional decorum, industrial facility safety (PPE/ESD), and ethical documentation."
  },
  topics: [
    {
      unitId: "cpe412-u1",
      unitTitle: "Unit 1: Applied Engineering Common Sense & Professional Mindset",
      summary: "Developing pragmatic engineering intuition, critical appraisal of emerging technologies, and exercising mature judgment in industrial settings.",
      cards: [
        {
          id: "cpe412-c1",
          title: "The Pragmatic Engineering Common Sense Framework",
          category: "Professional Practice",
          badge: "Core Engineering Principle",
          content: "In senior-level engineering practice, 'common sense' is not merely informal opinion—it is the disciplined application of sound physical principles, economic feasibility, safety first, and realistic trade-off analysis.",
          keyPoints: [
            "**1. Practical Feasibility over Buzzwords:** When evaluating industry seminar claims (e.g., AI hype, quantum computing, blockchain integration), an engineer critically assesses hardware constraints, latency, power draw, and return on investment (ROI) rather than accepting marketing claims unconditionally.",
            "**2. Safety as Non-Negotiable Baseline:** Whenever technical expediency conflicts with personnel or equipment safety during a plant visit, safety unconditionally takes priority.",
            "**3. Professional Communication Clarity:** Delivering concise, factual, and unambiguous information in both spoken inquiries and written incident/visit reports.",
            "**4. Cross-Disciplinary Awareness:** Recognizing how computer engineering solutions interact with civil infrastructure, mechanical thermal limits, electrical power grids, and corporate regulatory compliance."
          ]
        }
      ]
    },
    {
      unitId: "cpe412-u2",
      unitTitle: "Unit 2: Technical Seminar Reaction Paper Architecture",
      summary: "Standard technical reporting framework, objective analysis, and reflective synthesis for industry seminars.",
      cards: [
        {
          id: "cpe412-c2",
          title: "Executive Architecture of a Technical Reaction Paper",
          category: "Technical Writing",
          badge: "Documentation Standard",
          content: "A professional seminar reaction paper goes beyond mere chronological recitation; it synthesizes key technical concepts and maps them to engineering problems.",
          keyPoints: [
            "**1. Executive Summary:** A concise overview of the event, date, keynote speaker credentials, host organization, and primary technological thesis.",
            "**2. Key Technological Insights:** Structured analysis of the primary engineering concepts, architectures, frameworks, or methodologies introduced (e.g., edge-AI processing, RISC-V pipelining, distributed microservices).",
            "**3. Industry & Societal Relevance:** Examination of how the technology addresses real-world industrial bottlenecks, Philippine technological infrastructure, or UN Sustainable Development Goals (SDGs).",
            "**4. Critical Personal Engineering Reflection:** Thoughtful evaluation connecting the seminar's technical takeaways to the student's senior capstone design project, research interests, and professional career aspirations."
          ]
        }
      ]
    },
    {
      unitId: "cpe412-u3",
      unitTitle: "Unit 3: Industrial Workplace Decorum & Professional Etiquette",
      summary: "Behavioral standards, corporate decorum, active listening, and open forum participation during industrial interactions.",
      cards: [
        {
          id: "cpe412-c3",
          title: "Workplace Decorum & Open Forum Etiquette",
          category: "Professional Decorum",
          badge: "Workplace Standards",
          content: "Guidelines for conducting oneself professionally during company visits, technical conferences, and vendor presentations.",
          keyPoints: [
            "**1. Punctuality & Preparedness:** Arriving before scheduled sessions, reviewing the speaker's background beforehand, and having note-taking instruments ready.",
            "**2. Professional Attire & Presentation:** Adhering strictly to prescribed corporate or institutional dress codes (business casual, formal, or laboratory coat).",
            "**3. Active Listening & Digital Courtesy:** Silencing mobile devices, maintaining engaged eye contact, and refraining from unrelated multi-tasking during keynote presentations.",
            "**4. Constructive Inquiries in Open Forum:** Formulating succinct, technically grounded questions. State your name and institutional affiliation clearly before posing a well-scoped question that adds value for the entire audience."
          ]
        }
      ]
    },
    {
      unitId: "cpe412-u4",
      unitTitle: "Unit 4: Industrial Plant Safety & Cleanroom Protocols",
      summary: "Personal Protective Equipment (PPE), Electrostatic Discharge (ESD) prevention, and emergency adherence in manufacturing environments.",
      cards: [
        {
          id: "cpe412-c4",
          title: "Industrial Safety Compliance & Cleanroom Protocols",
          category: "Industrial Safety",
          badge: "Safety Standard",
          content: "Standard operating procedures enforced in modern electronics manufacturing plants, server data centers, and telecommunication facilities.",
          keyPoints: [
            "**1. Personal Protective Equipment (PPE):** Mandatory use of hard hats, safety glasses with side shields, high-visibility vests, and closed-toe steel-toe shoes in active industrial zones.",
            "**2. Electrostatic Discharge (ESD) Prevention:** In cleanrooms or semiconductor fabrication labs, wearing grounded heel straps, antistatic smocks, and conductive wristbands to prevent catastrophic microchip gate punctures from human body static.",
            "**3. Restricted Access & Walkway Compliance:** Strictly remaining within painted yellow visitor lanes, keeping clear of overhead cranes and automated guided vehicles (AGVs), and never touching unauthorized control panels or live circuitry.",
            "**4. Emergency Preparedness:** Identifying muster points, emergency exit routes, eyewash stations, and fire pull stations upon entering any industrial facility."
          ]
        }
      ]
    },
    {
      unitId: "cpe412-u5",
      unitTitle: "Unit 5: Confidentiality, NDAs & Documentation Integrity",
      summary: "Intellectual property protection, non-disclosure agreements, and academic honesty in technical reporting.",
      cards: [
        {
          id: "cpe412-c5",
          title: "Intellectual Property & Academic Integrity",
          category: "Ethics & Compliance",
          badge: "Legal & Ethical",
          content: "Legal and professional obligations when exposed to proprietary corporate processes and unpublished technical documentation.",
          keyPoints: [
            "**1. Non-Disclosure Agreement (NDA) Compliance:** Treating all proprietary production statistics, internal network architecture diagrams, and prototype hardware seen during facility visits as strictly confidential.",
            "**2. Photography & Recording Bans:** Respecting strict 'No Photography' zones in research labs and manufacturing floors; never sharing proprietary visuals on social media.",
            "**3. Academic Honesty in Reporting:** Synthesizing ideas in your own words with proper citation of speaker slide decks and technical whitepapers; never plagiarizing peer reaction papers or forging attendance sign-in sheets.",
            "**4. Engineering Reputation:** Recognizing that student conduct during off-campus visits directly impacts university-industry partnerships and future graduate hiring pipelines."
          ]
        }
      ]
    }
  ],
  flashcards: [
    {
      id: "cpe412-fc1",
      question: "What is the defining mark of applied engineering common sense in evaluating new technology?",
      answer: "Critically evaluating practical feasibility, real-world constraints, thermal/power limits, and economic viability rather than accepting promotional marketing claims at face value.",
      category: "Professional Practice"
    },
    {
      id: "cpe412-fc2",
      question: "What are the four essential pillars of a professional technical seminar reaction paper?",
      answer: "1. Executive Summary\n2. Key Technological Insights\n3. Industry & Societal Relevance\n4. Critical Personal Engineering Reflection",
      category: "Documentation"
    },
    {
      id: "cpe412-fc3",
      question: "Why is Electrostatic Discharge (ESD) protection strictly mandatory during electronics plant visits?",
      answer: "Because static charges carried on the human body (thousands of volts) can puncture microscopic transistor gate oxides on silicon wafers and PCBs without leaving visible external evidence.",
      category: "Industrial Safety"
    },
    {
      id: "cpe412-fc4",
      question: "What is the proper etiquette when asking a question during a technical seminar open forum?",
      answer: "Stand up, state your name and university affiliation clearly, keep the question concise and technically focused, and thank the speaker for their presentation.",
      category: "Decorum"
    },
    {
      id: "cpe412-fc5",
      question: "What basic PPE items are universally required inside industrial manufacturing facilities?",
      answer: "Safety helmet (hard hat), safety glasses with side shields, high-visibility vest, and closed-toe safety shoes (steel-toed).",
      category: "Industrial Safety"
    },
    {
      id: "cpe412-fc6",
      question: "Why do technology firms enforce Non-Disclosure Agreements (NDAs) during plant tours?",
      answer: "To legally safeguard proprietary manufacturing processes, custom chip layouts, trade secrets, and competitive commercial advantage against public disclosure.",
      category: "Ethics"
    },
    {
      id: "cpe412-fc7",
      question: "In technical documentation, what distinguishes an 'Executive Summary' from a 'Personal Reflection'?",
      answer: "An Executive Summary provides an objective, concise synthesis of event facts and topics for decision-makers, whereas a Personal Reflection critiques personal learning and applications to one's own capstone work.",
      category: "Documentation"
    },
    {
      id: "cpe412-fc8",
      question: "What is the primary common-sense protocol if you observe an unfamiliar or uninsulated wire during a plant visit?",
      answer: "Do not touch or approach it; immediately halt, alert the facility safety officer or tour guide, and warn nearby classmates.",
      category: "Industrial Safety"
    },
    {
      id: "cpe412-fc9",
      question: "How does adhering to high standards of decorum during field trips benefit the university and student body?",
      answer: "It establishes the institution's reputation for professionalism, reinforcing company trust, opening internship opportunities, and paving corporate hiring pipelines for future graduates.",
      category: "Professional Practice"
    },
    {
      id: "cpe412-fc10",
      question: "What constitutes ethical documentation when using a guest speaker's presentation slides in a report?",
      answer: "Paraphrasing insights in your own words while explicitly citing the speaker's name, presentation title, organization, and date.",
      category: "Ethics"
    }
  ],
  mockQuestions: [
    {
      id: "cpe412-mq1",
      question: "During an industrial facility plant tour, a student notices an interesting prototype module located just outside the yellow designated visitor lane. What is the correct, professional course of action?",
      options: [
        "Quickly step over the line to photograph the circuit board before anyone notices",
        "Remain strictly within the marked visitor lane and ask the facility engineer about the module during the designated discussion stop",
        "Pick up the module to inspect the microcontroller part number",
        "Ignore the tour group and explore the adjacent testing bench"
      ],
      correctAnswer: 1,
      explanation: "Industrial common sense and OSHA regulations mandate staying strictly within designated visitor walkways. Crossing lines without permission poses serious safety hazards and violates plant security protocols.",
      category: "Industrial Safety"
    },
    {
      id: "cpe412-mq2",
      question: "In a formal seminar reaction paper, which section is specifically intended for the student to connect keynote concepts to their own senior capstone design project?",
      options: [
        "Executive Summary",
        "Key Technological Insights",
        "Personal Learning & Engineering Reflections",
        "Appendix"
      ],
      correctAnswer: 2,
      explanation: "The 'Personal Learning & Engineering Reflections' section is specifically structured for students to synthesize how new industry methods relate to their own engineering growth and capstone design implementation.",
      category: "Documentation"
    },
    {
      id: "cpe412-mq3",
      question: "Which of the following demonstrates the best engineering common sense during a technical Q&A session?",
      options: [
        "Asking a 5-minute rambling question comparing the speaker's company unfavorably to a competitor",
        "Stating your name, university affiliation, and asking a concise question regarding the speaker's latency benchmarks in real-world deployments",
        "Asking what the starting salary is for entry-level applicants at the company",
        "Interrupting the speaker halfway through their final slide to challenge their statistics"
      ],
      correctAnswer: 1,
      explanation: "Professional open forum etiquette requires introducing oneself clearly, remaining succinct, and focusing on technical substance that benefits the broader audience.",
      category: "Decorum"
    },
    {
      id: "cpe412-mq4",
      question: "Why must visitors in semiconductor and surface-mount technology (SMT) cleanrooms wear grounded heel straps or ESD smocks?",
      options: [
        "To keep clothes from getting grease stains from industrial machinery",
        "To prevent electrostatic discharge from damaging sensitive microelectronic components that can fail at mere tens of volts",
        "To improve thermal insulation inside temperature-controlled rooms",
        "To allow radio frequency tracking of visitors by security guards"
      ],
      correctAnswer: 1,
      explanation: "Human bodies can accumulate thousands of volts of static charge. Even an imperceptible spark can punch microscopic dielectric breakdown through silicon gates, ruining integrated circuits.",
      category: "Industrial Safety"
    },
    {
      id: "cpe412-mq5",
      question: "A company hosting an engineering field trip requests all students to sign a Non-Disclosure Agreement (NDA) and forbids photography on the production floor. What is the fundamental legal and ethical rationale behind this?",
      options: [
        "The company is hiding sub-standard equipment from regulatory authorities",
        "To protect proprietary manufacturing techniques, trade secrets, and patented product lines from corporate espionage",
        "The lighting inside the plant damages smartphone camera sensors",
        "The company wants to force students to purchase official company photographs"
      ],
      correctAnswer: 1,
      explanation: "NDAs protect proprietary intellectual property and industrial competitive advantage. Breaching an NDA damages university partnerships and can incur legal liability.",
      category: "Ethics"
    },
    {
      id: "cpe412-mq6",
      question: "When writing a technical report on a seminar discussing 'Generative AI in Embedded Edge Devices', which approach demonstrates the strongest engineering critical thinking?",
      options: [
        "Uncritically repeating that AI will instantly solve every engineering design challenge with zero drawbacks",
        "Analyzing both the advantages of low-latency on-device inference and the real-world engineering trade-offs (e.g. thermal throttling, battery drain, memory footprint, quantization accuracy loss)",
        "Copying and pasting the promotional bullet points from the vendor's marketing brochure",
        "Ignoring technical specifications and writing only about the snack catering"
      ],
      correctAnswer: 1,
      explanation: "Engineering common sense requires evaluating real physical trade-offs: power consumption, memory footprint, compute limits, and accuracy rather than blind acceptance of promotional hype.",
      category: "Professional Practice"
    },
    {
      id: "cpe412-mq7",
      question: "Which personal protective equipment is essential when entering a loud power generation plant or transformer substation during an industrial visit?",
      options: [
        "Hearing protection (earplugs/earmuffs) and safety glasses with side shields",
        "Cotton wool gloves and open sandals",
        "Sunglasses and wireless earbuds",
        "Standard laboratory apron only"
      ],
      correctAnswer: 0,
      explanation: "Industrial environments with high decibel acoustic levels or electrical hazards require certified hearing protection, hard hats, safety glasses, and closed-toe footwear.",
      category: "Industrial Safety"
    },
    {
      id: "cpe412-mq8",
      question: "If an emergency evacuation alarm sounds during an industrial plant tour, what is the mandatory immediate action?",
      options: [
        "Gather personal belongings and search for souvenirs",
        "Immediately follow the facility guide along designated emergency egress routes to the assigned assembly muster point, remaining calm and accounted for",
        "Use the nearest elevator to exit the building quickly",
        "Run in different directions to locate the quickest individual exit"
      ],
      correctAnswer: 1,
      explanation: "In an industrial emergency, visitors must strictly follow their assigned escort along designated routes to the muster point to ensure an accurate headcount. Never use elevators during fire emergencies.",
      category: "Industrial Safety"
    },
    {
      id: "cpe412-mq9",
      question: "Which documentation practice constitutes academic dishonesty when compiling a field trip or seminar portfolio?",
      options: [
        "Synthesizing personal takeaways and citing the speaker's slides as a formal reference",
        "Submitting an attendance sign-off for a seminar session that the student did not attend in person",
        "Including an appendix of diagrams discussed during the lecture with full attribution",
        "Comparing the speaker's data with published IEEE journal articles"
      ],
      correctAnswer: 1,
      explanation: "Falsifying attendance or claiming credit for events not attended violates academic integrity and fundamental engineering ethics.",
      category: "Ethics"
    },
    {
      id: "cpe412-mq10",
      question: "What is the primary objective of technical seminars and industrial plant visits in an engineering curriculum?",
      options: [
        "To provide leisure outings away from university classrooms",
        "To bridge academic theory with real-world industrial practice, exposing students to enterprise-grade technologies, safety cultures, and professional career pathways",
        "To replace all textbook examinations with casual company visits",
        "To memorize manufacturing company mission statements verbatim"
      ],
      correctAnswer: 1,
      explanation: "Seminars and field trips provide experiential context, bridging lecture concepts with real industrial constraints, enterprise workflows, and corporate standards of excellence.",
      category: "Professional Practice"
    }
  ],
  cramNotes: [
    "CPE412 Focus: Applied Engineering Common Sense, Professional Decorum, and Technical Reporting.",
    "Reaction Paper Pillars: 1. Executive Summary, 2. Key Tech Insights, 3. Industrial Relevance, 4. Personal Reflection.",
    "Industrial Common Sense: Safety First > Technical Expediency > Convenience.",
    "Cleanroom Rule: ESD protection (wrist straps, conductive heel straps, smocks) protects chips from microscopic gate oxide puncture.",
    "Visitor Safety: Never leave painted yellow visitor lanes; observe all restricted machinery zones.",
    "Open Forum Etiquette: State name + university, ask concise technical questions, maintain professional courtesy.",
    "NDA & Confidentiality: Respect photo bans; protect corporate trade secrets and proprietary system architectures.",
    "Integrity: Accurately cite keynote slides and avoid unverified promotional marketing claims."
  ]
};
