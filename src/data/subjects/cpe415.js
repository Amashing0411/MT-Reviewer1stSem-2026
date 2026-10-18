export const cpe415Data = {
  id: "cpe415",
  code: "CPE415",
  title: "Engineering Management",
  description: "Systems Development Cycle (SDC), Software Development Life Cycles (SDLC), Program Management Life Cycle (PLC), PMI Governance Gates, ISO Compliance, Parametric Cost Models (COCOMO II), and Network Scheduling (CPM/PERT).",
  room: "Room 106",
  schedule: "Monday, October 19, 2026 (5:00 PM - 6:00 PM)",
  proctor: "Lyka Magbuhos",
  examFormat: {
    types: [
      "Multiple Choice",
      "Identification",
      "Process Sequencing & Analysis"
    ],
    coverage: "SDC 4 Phases, SDLC Models, PMI Program Standard, Conversion Strategies, Governance Gates, COCOMO II, and Situational Leadership"
  },
  topics: [
    {
      unitId: "cpe415-u1",
      unitTitle: "Unit 1: The Systems Development Cycle (SDC)",
      summary: "The 4 SDC phases (Nicholas & Steyn), requirements traceability hierarchy, and system conversion strategies.",
      cards: [
        {
          id: "cpe415-c1",
          title: "The Four-Phase Systems Development Cycle (SDC)",
          category: "SDC Lifecycle",
          badge: "Verbatim Slide",
          content: "According to Nicholas & Steyn (2021), every human-made engineering system follows a logical sequence called the Systems Development Cycle (SDC). The first three phases constitute the Project Life Cycle.",
          keyPoints: [
            "**Phase A: Conception (Initiation & Feasibility):**\n• *Initial Investigation:* 'Quick and dirty' assessment to verify if the problem aligns with organizational goals.\n• *Feasibility Study:* Rigorous evaluation of Technical, Economic (ROI), and Operational feasibility.\n• *RFP & Proposal:* Client publishes Request for Proposal (RFP) containing Statement of Work (SOW); contractors respond with technical/financial proposals.",
            "**Phase B: Definition (Front-End Loading):**\n• *Requirements Analysis:* Translating vague User Needs into functional System Requirements and measurable System Specifications.\n• *Requirements Traceability Matrix (RTM):* Maps every spec back to user requirements to eliminate 'scope creep'.\n• *Project Definition:* Baseline schedule, WBS, and final budget.",
            "**Phase C: Execution (Acquisition):**\n• *Detail Design:* Schematics, PCB layouts, software architecture, prototypes.\n• *Production / Build:* Fabrication or coding.\n• *System Implementation:* Physical cutover to operational environment.\n• *Closeout:* Post-Completion Project Review (Postmortem) documenting 'lessons learned'.",
            "**Phase D: Operation:**\n• End-user handover, ongoing maintenance, bug patches, and eventual system disposal."
          ],
          examTrap: "75% of a system's total life-cycle cost is LOCKED IN during Phases A (Conception) and B (Definition). Early architectural decisions have the greatest influence on long-term costs!"
        },
        {
          id: "cpe415-c2",
          title: "Requirements Traceability Chain & Environmental Fallacy",
          category: "Requirements Engineering",
          badge: "Core Engineering Rule",
          content: "The disciplined translation from user need to engineering specification, and guarding against contextual blind spots.",
          keyPoints: [
            "**The Traceability Chain:**\n1. *User Requirement (What):* 'The device needs to monitor my heart, last a long time, and call for help if I fall in the shower.'\n2. *System Requirement (Functional How):* 'Must continuously monitor heart rate, detect abnormal arrhythmia, operate 7 days, detect impact, and resist water.'\n3. *System Specification (Technical How):* 'Optical PPG sensor at 50Hz; 3.7V 300mAh Li-ion battery drawing $\\le 1.5\\text{mA}$; 3-axis MEMS accelerometer $>2.5G$ with 10s immobility; IP68 casing (1.5m for 30min).'",
            "**The Environmental Fallacy:**\n• The failure to account for the operational environment in which the system must live.\n• *Example:* Designing a high-performance server farm without verifying the building's electrical capacity or HVAC cooling. The error occurs in Phase A/B!"
          ]
        },
        {
          id: "cpe415-c3",
          title: "System Conversion (Cutover) Strategies",
          category: "Implementation",
          badge: "High Yield Comparison",
          content: "Three primary strategies for transitioning users from a legacy system to a newly built engineering system:",
          keyPoints: [
            "**1. Parallel Installation:**\n• The old and new systems run simultaneously side-by-side until the new system is fully proven.\n• *Cost:* Highest. *Risk:* Lowest (fallback to old system is instantaneous).",
            "**2. Pilot Operation:**\n• The new system is deployed to a small fractional group of users or single branch before full rollout.\n• *Cost:* Moderate. *Risk:* Moderate.",
            "**3. Cold Turkey (Big Bang):**\n• The old system is turned off completely and the new system is turned on immediately.\n• *Cost:* Lowest initial direct cost. *Risk:* Extremely HIGH failure risk (no fallback if critical bugs emerge!)."
          ],
          examTrap: "In safety-critical or enterprise environments (e.g., hospital patient records, air traffic control, nuclear monitoring), Cold Turkey is strictly UNACCEPTABLE!"
        }
      ]
    },
    {
      unitId: "cpe415-u2",
      unitTitle: "Unit 2: Program Management Life Cycle & Governance Gates",
      summary: "PMI Program Standard, Project vs Program distinctions, 3 PLC phases, and the 6 mandatory Decision Gates.",
      cards: [
        {
          id: "cpe415-c4",
          title: "Project vs. Program & The PMI Program Life Cycle",
          category: "Program Governance",
          badge: "PMI Standard",
          content: "Fundamental distinctions between project execution and program benefit governance.",
          keyPoints: [
            "**Project vs. Program Distinction:**\n• *Project:* A temporary endeavor undertaken to create a unique product, service, or result, bound by constraints of time, cost, and scope.\n• *Program:* A group of related projects, subsidiary programs, and activities managed in a coordinated manner to obtain benefits and control not available from managing them individually.",
            "**Three PLC Phases (PMI):**\n1. *Program Definition:* Subdivided into Program Formulation (charter, business case) and Program Planning (13 subsidiary plans, benefits roadmap).\n2. *Program Delivery:* Execution and integration of component projects to realize benefits.\n3. *Program Closure:* Transitioning sustained benefits to operational owners and releasing resources."
          ]
        },
        {
          id: "cpe415-c5",
          title: "The Six PMI Program Governance Gates",
          category: "Governance",
          badge: "Exact 6 Gates Table",
          content: "Decision gates enforced by governing bodies to approve, redirect, or terminate programs:",
          keyPoints: [
            "**Gate 1: Authorization (End of Formulation):** Assesses if there is a strong strategic business case. Deciding Authority: Sponsor & Portfolio Body.",
            "**Gate 2: Plan Approval (End of Planning):** Evaluates if the 13 subsidiary management plans are complete. Deciding Authority: Program Steering Committee.",
            "**Gate 3: Component Authorization (Prior to Execution):** Verifies that the component project directly links to a target benefit. Deciding Authority: Program Governance Board.",
            "**Gate 4: Segment Review (Periodic in Delivery):** Evaluates ongoing health: Continue, redirect, or terminate? Deciding Authority: Governance Participants.",
            "**Gate 5: Transition (End of Delivery):** Verifies named operational owner is ready to receive benefits. Deciding Authority: Sponsor & Steering Committee.",
            "**Gate 6: Closure Acceptance (End of Program):** Handover and post-audits completed. Deciding Authority: Steering Committee."
          ]
        }
      ]
    },
    {
      unitId: "cpe415-u3",
      unitTitle: "Unit 3: SDLC Methodologies & Engineering Cost Models",
      summary: "Waterfall, V-Model, Spiral, Rapid Prototyping, Agile Scrum, ISO Standards (12207, 26262), and COCOMO II parametric estimation.",
      cards: [
        {
          id: "cpe415-c6",
          title: "The 5 Plan-Driven & Adaptive SDLC Models",
          category: "SDLC Models",
          badge: "5 Foundational Models",
          content: "Taxonomy of Software Development Life Cycle architectures:",
          keyPoints: [
            "**1. Waterfall Model (Royce 1970; Benington 1956):** Linear sequential stages. Best for fixed, well-understood specs; worst for exploratory R&D.",
            "**2. V-Model (Paul Rook 1986; German V-Modell):** Verification and validation symmetry (every design phase has a matching testing phase). Mandated for ISO 26262 automotive (ASIL A–D), avionics, and medical devices.",
            "**3. Spiral Model (Barry Boehm 1986):** Risk-driven iterative cycles across 4 quadrants. Combines prototyping with Waterfall control. Best for massive defense and aerospace programs.",
            "**4. Rapid Prototyping (Fred Brooks 1975):** Quick interactive mockups to validate vague user requirements before production coding.",
            "**5. Agile Scrum (Takeuchi & Nonaka 1986; Schwaber & Sutherland 1995):** Time-boxed 1–4 week sprints delivering functional increments from a prioritized backlog."
          ]
        },
        {
          id: "cpe415-c7",
          title: "Parametric Cost Models (COCOMO II) & Leadership Styles",
          category: "Cost & Leadership",
          badge: "Formulas & Styles",
          content: "Empirical estimation of software engineering effort and situational management models.",
          formula: "\\text{Effort} = a \\cdot (\\text{KLOC})^b \\quad [\\text{Person-Months}]",
          keyPoints: [
            "**COCOMO II Modes (Barry Boehm):**\n• *Organic:* $a = 2.4, b = 1.05$ (small, familiar teams, relaxed constraints).\n• *Semidetached:* $a = 3.0, b = 1.12$ (medium teams, mixed experience).\n• *Embedded:* $a = 3.6, b = 1.20$ (tight hardware constraints, safety-critical aerospace/automotive).",
            "**Situational Leadership (Hersey & Blanchard):**\n• **S1: Directing:** High task, low relationship (for junior/untested engineers).\n• **S2: Coaching:** High task, high relationship (during early technical hurdles).\n• **S3: Supporting:** Low task, high relationship (builds confidence in experienced teams).\n• **S4: Delegating:** Low task, low relationship (autonomous Agile Scrum squads)."
          ]
        }
      ]
    }
  ],
  flashcards: [
    {
      id: "cpe415-fc1",
      question: "What percentage of a system's life cycle cost is typically committed during the early Conception and Definition phases?",
      answer: "Approximately 75% of total life-cycle costs are locked in during the early Conception and Definition phases, meaning early architectural decisions have the greatest financial impact.",
      category: "Cost Engineering"
    },
    {
      id: "cpe415-fc2",
      question: "What are the four distinct phases of the Systems Development Cycle (SDC) according to Nicholas & Steyn (2021)?",
      answer: "Phase A: Conception (Initiation & Feasibility), Phase B: Definition (Requirements & Specs), Phase C: Execution (Design, Build & Implementation), and Phase D: Operation. The first three phases constitute the Project Life Cycle.",
      category: "SDC Lifecycle"
    },
    {
      id: "cpe415-fc3",
      question: "Explain the three tiers of the Requirements Traceability hierarchy.",
      answer: "1. User Requirement: Vague operational need ('What').\n2. System Requirement: High-level functional target ('How' functionally).\n3. System Specification: Highly detailed, measurable technical criterion ('How' technically).",
      category: "Requirements"
    },
    {
      id: "cpe415-fc4",
      question: "What is the 'Environmental Fallacy' in engineering management?",
      answer: "The mistake of designing an engineering system in isolation without accounting for the physical, electrical, thermal, or operational environment in which it must operate (e.g., designing servers without checking room HVAC or power).",
      category: "Requirements"
    },
    {
      id: "cpe415-fc5",
      question: "Compare the three primary system conversion (cutover) strategies.",
      answer: "1. Parallel Installation: Old and new run side-by-side (Highest cost, lowest risk).\n2. Pilot Operation: Rolled out to a small fraction of users first (Moderate cost and risk).\n3. Cold Turkey (Big Bang): Old turned off and new turned on immediately (Lowest initial cost, extremely high failure risk).",
      category: "Implementation"
    },
    {
      id: "cpe415-fc6",
      question: "What is the fundamental distinction between a Project and a Program according to the PMI Standard?",
      answer: "A Project is a temporary endeavor with fixed scope, time, and budget producing unique deliverables. A Program coordinates multiple related projects to realize overarching strategic benefits not achievable individually.",
      category: "Program Governance"
    },
    {
      id: "cpe415-fc7",
      question: "What are the three primary phases of the Program Management Life Cycle (PLC)?",
      answer: "1. Program Definition (Formulation & Planning)\n2. Program Benefits Delivery (Component execution and integration)\n3. Program Closure (Transition of benefits to operations and handover)",
      category: "Program Governance"
    },
    {
      id: "cpe415-fc8",
      question: "What is PMI Governance Gate 1 (Authorization) and who is the deciding authority?",
      answer: "Occurs at the end of Program Formulation to assess if the business case aligns with strategic objectives and justifies chartering. Deciding authority: Sponsor & Portfolio Body.",
      category: "Governance Gates"
    },
    {
      id: "cpe415-fc9",
      question: "What is PMI Governance Gate 2 (Plan Approval) and who decides it?",
      answer: "Occurs at the end of Program Planning to evaluate whether the 13 subsidiary management plans are complete and delivery can commence. Deciding authority: Program Steering Committee.",
      category: "Governance Gates"
    },
    {
      id: "cpe415-fc10",
      question: "What is PMI Governance Gate 5 (Transition)?",
      answer: "Occurs at the end of Delivery to verify that benefits have been delivered and a named operational receiving owner is ready for handover. Deciding authority: Sponsor & Steering Committee.",
      category: "Governance Gates"
    },
    {
      id: "cpe415-fc11",
      question: "Why is the V-Model SDLC specifically mandated in ISO 26262 automotive safety environments?",
      answer: "Because it establishes bilateral symmetry: every stage of requirements/design decomposition on the left side is mapped directly to a corresponding verification and validation testing stage on the right side.",
      category: "SDLC Models"
    },
    {
      id: "cpe415-fc12",
      question: "What is the core defining characteristic of Barry Boehm's Spiral SDLC Model?",
      answer: "It is risk-driven. Each iterative cycle across the four quadrants continuously identifies, assesses, and resolves technical and project risks before proceeding to further development.",
      category: "SDLC Models"
    },
    {
      id: "cpe415-fc13",
      question: "What is Rapid Prototyping and what critical engineering error does it prevent?",
      answer: "Building rudimentary, interactive models early in definition to validate requirements with stakeholders. It prevents building a technically compliant system that fails to solve the user's actual real-world problem.",
      category: "SDLC Models"
    },
    {
      id: "cpe415-fc14",
      question: "Which organizational structure produces role conflict due to a dual chain of command?",
      answer: "The Matrix Organization, where an engineer simultaneously reports to a functional department manager (technical standards) and a project/program manager (schedule and delivery).",
      category: "Organization"
    },
    {
      id: "cpe415-fc15",
      question: "What are the four primary process groups in ISO/IEC/IEEE 12207:2026?",
      answer: "1. Agreement Processes (Acquisition & Supply)\n2. Organizational Project-Enabling Processes (HR, Quality, Portfolio)\n3. Technical Management Processes (Planning, Risk, Configuration)\n4. Technical Processes (Requirements, Architecture, Implementation, V&V, Maintenance)",
      category: "ISO Standards"
    },
    {
      id: "cpe415-fc16",
      question: "What does HARA stand for and what are the ASIL classifications in ISO 26262?",
      answer: "Hazard Analysis and Risk Assessment. Automotive Safety Integrity Levels range from ASIL A (lowest criticality) to ASIL D (highest criticality, life-threatening risk requiring highest testing rigor).",
      category: "ISO Standards"
    },
    {
      id: "cpe415-fc17",
      question: "What is a 'Safety Element out of Context' (SEooC) in ISO 26262?",
      answer: "A software or hardware module developed by a third-party supplier independently of a specific vehicle platform, with documented integration assumptions that the system integrator must validate.",
      category: "ISO Standards"
    },
    {
      id: "cpe415-fc18",
      question: "What are the Basic COCOMO effort and duration constants for Organic, Semidetached, and Embedded modes?",
      answer: "Organic: a=2.4, b=1.05, c=2.5, d=0.38\nSemidetached: a=3.0, b=1.12, c=2.5, d=0.35\nEmbedded: a=3.6, b=1.20, c=2.5, d=0.32\nEffort = a*(KLOC)^b; Duration = c*(Effort)^d.",
      category: "COCOMO II"
    },
    {
      id: "cpe415-fc19",
      question: "What are the 5 Scale Drivers in COCOMO II that replaced the fixed development modes of COCOMO 81?",
      answer: "1. Precedentedness (PREC)\n2. Development Flexibility (FLEX)\n3. Architecture / Risk Resolution (RESL)\n4. Team Cohesion (TEAM)\n5. Process Maturity (PMAT)",
      category: "COCOMO II"
    },
    {
      id: "cpe415-fc20",
      question: "Under standard COCOMO sizing rules, what counts as a Source Line of Code (SLOC)?",
      answer: "Counts: delivered logical source instructions and declarations written by project staff. Excluded: comments, blank lines, test harness code, and machine-generated code.",
      category: "COCOMO II"
    },
    {
      id: "cpe415-fc21",
      question: "What are the four primary size drivers utilized in the COSYSMO systems engineering cost model?",
      answer: "1. Number of System Requirements\n2. Number of Major Interfaces\n3. Number of Operational Scenarios\n4. Number of Critical Algorithms",
      category: "Cost Engineering"
    },
    {
      id: "cpe415-fc22",
      question: "Distinguish Feedforward, Concurrent, and Feedback controls in engineering management.",
      answer: "Feedforward: Preventive actions before execution (e.g., requirements analysis, COCOMO estimation).\nConcurrent: Real-time monitoring during work (e.g., daily standups, CI/CD, Gantt tracking).\nFeedback: Post-completion reviews (e.g., postmortems, final project audits).",
      category: "Management Control"
    },
    {
      id: "cpe415-fc23",
      question: "In Hersey & Blanchard's Situational Leadership Model, match S1 through S4 with their appropriate style.",
      answer: "S1: Directing (High task, low relationship - for enthusiastic novices)\nS2: Coaching (High task, high relationship - for struggling learners)\nS3: Supporting (Low task, high relationship - for capable but unconfident staff)\nS4: Delegating (Low task, low relationship - for mature, self-governing teams).",
      category: "Leadership"
    },
    {
      id: "cpe415-fc24",
      question: "What are the five classical bases of managerial power in an engineering organization?",
      answer: "1. Legitimate power (hierarchical authority)\n2. Reward power (bonuses, promotions)\n3. Coercive power (punishments, disciplinary action)\n4. Referent power (charisma, respect)\n5. Expert power (technical competence and specialized knowledge)",
      category: "Leadership"
    },
    {
      id: "cpe415-fc25",
      question: "What are the formulas for Current Ratio and Acid-Test (Quick) Ratio?",
      answer: "Current Ratio = Current Assets / Current Liabilities.\nAcid-Test (Quick) Ratio = (Current Assets - Inventory) / Current Liabilities.\nAcid-test measures immediate liquidity without relying on inventory liquidation.",
      category: "Financial Control"
    },
    {
      id: "cpe415-fc26",
      question: "What is the formula for the PERT expected activity duration ($T_e$) using three-point estimation?",
      answer: "Te = (a + 4m + b) / 6, where a is the optimistic duration, m is the most likely duration, and b is the pessimistic duration.",
      category: "Project Scheduling"
    }
  ],
  mockQuestions: [
    {
      id: "cpe415-mq1",
      question: "If an engineering team designs an AI GPU server cluster without assessing whether the client's building electrical substation can supply the required amperage, which flaw was committed?",
      options: [
        "Scope creep in Phase C",
        "The Environmental Fallacy in Phase A/B",
        "A Cold Turkey conversion error",
        "A Gate 6 Transition defect"
      ],
      correctAnswer: 1,
      explanation: "The Environmental Fallacy occurs when engineers design a system in isolation without accounting for the real-world operational constraints and environment of the client's facility.",
      category: "SDC Lifecycle"
    },
    {
      id: "cpe415-mq2",
      question: "Which PMI Program Governance Gate is evaluated at the end of Program Formulation to determine whether a program should be chartered and funded?",
      options: [
        "Gate 1: Authorization",
        "Gate 2: Plan Approval",
        "Gate 3: Component Authorization",
        "Gate 5: Transition"
      ],
      correctAnswer: 0,
      explanation: "Gate 1 (Authorization) occurs at the end of Formulation where the Sponsor & Portfolio Body assess if the program ties to a strategic objective.",
      category: "Governance Gates"
    },
    {
      id: "cpe415-mq3",
      question: "A bank migrating its core real-time transaction processing system decides to run both the legacy mainframe and the new cloud database simultaneously for 90 days. This is an example of:",
      options: [
        "Cold Turkey conversion",
        "Pilot Operation",
        "Parallel Installation",
        "Phased Big Bang"
      ],
      correctAnswer: 2,
      explanation: "Parallel Installation runs old and new systems simultaneously. While expensive, it minimizes risk by providing an immediate fallback if bugs occur.",
      category: "Implementation"
    },
    {
      id: "cpe415-mq4",
      question: "Which SDLC methodology is best suited for safety-critical automotive systems governed by ISO 26262 ASIL A–D requirements?",
      options: [
        "Rapid Prototyping",
        "Agile Scrum",
        "The V-Model",
        "Cold Turkey"
      ],
      correctAnswer: 2,
      explanation: "The V-Model enforces bidirectional traceability and pairs every development phase with a corresponding verification and validation testing level.",
      category: "SDLC Models"
    },
    {
      id: "cpe415-mq5",
      question: "According to the Basic COCOMO software cost estimation model, an 'Embedded' project with complex hardware integration has an effort multiplier and exponent of:",
      options: [
        "a = 2.4, b = 1.05",
        "a = 3.0, b = 1.12",
        "a = 3.6, b = 1.20",
        "a = 4.8, b = 1.50"
      ],
      correctAnswer: 2,
      explanation: "For Embedded systems in COCOMO, a = 3.6 and b = 1.20, reflecting higher diseconomies of scale and rigid interface constraints.",
      category: "COCOMO II"
    },
    {
      id: "cpe415-mq6",
      question: "Approximately what percentage of a product's total life-cycle costs are committed during the Conception and Definition phases?",
      options: [
        "25%",
        "50%",
        "75%",
        "95%"
      ],
      correctAnswer: 2,
      explanation: "Nicholas & Steyn emphasize that up to 75% of total life-cycle costs are locked in during the early Conception and Definition phases due to foundational architecture choices.",
      category: "Cost Engineering"
    },
    {
      id: "cpe415-mq7",
      question: "Which of the following represents a measurable 'System Specification' rather than a 'User Requirement'?",
      options: [
        "The device should be lightweight and easy to carry",
        "The drone must fly long enough to map a farm",
        "The battery must be a 3.7V 300mAh Li-ion cell drawing no more than 1.5mA in active state",
        "The system should not crash during peak hours"
      ],
      correctAnswer: 2,
      explanation: "System Specifications are highly detailed, measurable engineering parameters (voltages, tolerances, ratings), whereas user requirements are qualitative operational goals.",
      category: "Requirements"
    },
    {
      id: "cpe415-mq8",
      question: "Which conversion strategy has the lowest initial direct financial cost but the highest catastrophic operational risk?",
      options: [
        "Parallel Installation",
        "Pilot Operation",
        "Cold Turkey (Big Bang)",
        "Phased Rollout"
      ],
      correctAnswer: 2,
      explanation: "Cold Turkey completely terminates the legacy system on cutover day. It saves dual-run operational costs but carries extreme risk if unforeseen defects emerge.",
      category: "Implementation"
    },
    {
      id: "cpe415-mq9",
      question: "In PMI Program Governance, which decision body has the authority to approve Gate 2 (Plan Approval)?",
      options: [
        "Lead System Architect",
        "Scrum Master",
        "Program Steering Committee",
        "End-user focus group"
      ],
      correctAnswer: 2,
      explanation: "Gate 2 (Plan Approval) is approved by the Program Steering Committee after evaluating the 13 subsidiary management plans.",
      category: "Governance Gates"
    },
    {
      id: "cpe415-mq10",
      question: "A post-completion review conducted at the end of Phase C (Execution) to capture 'lessons learned' is known as:",
      options: [
        "Hazard Analysis and Risk Assessment",
        "Postmortem (Post-Completion Project Review)",
        "Precedentedness Audit",
        "Feedforward Gate"
      ],
      correctAnswer: 1,
      explanation: "A Postmortem or Post-Completion Project Review documents what went well and what failed to improve institutional knowledge for future projects.",
      category: "SDC Lifecycle"
    },
    {
      id: "cpe415-mq11",
      question: "Which SDLC methodology represents development as iterative loops where each cycle begins with objectives and ends with a risk evaluation?",
      options: [
        "Waterfall Model",
        "Spiral Model (Barry Boehm)",
        "V-Model (Paul Rook)",
        "Cold Turkey Model"
      ],
      correctAnswer: 1,
      explanation: "The Spiral Model was developed by Barry Boehm in 1986 and centers entirely on iterative risk analysis across four quadrants.",
      category: "SDLC Models"
    },
    {
      id: "cpe415-mq12",
      question: "Which ISO standard specifically establishes a comprehensive framework for Software Life Cycle Processes across 4 process groups?",
      options: [
        "ISO 9001",
        "ISO/IEC/IEEE 12207",
        "ISO 26262",
        "ISO 14001"
      ],
      correctAnswer: 1,
      explanation: "ISO/IEC/IEEE 12207 defines software life cycle processes grouped into Agreement, Organizational Project-Enabling, Technical Management, and Technical processes.",
      category: "ISO Standards"
    },
    {
      id: "cpe415-mq13",
      question: "In ISO 26262 functional safety, which Automotive Safety Integrity Level (ASIL) represents the highest degree of criticality and risk?",
      options: [
        "ASIL A",
        "ASIL B",
        "ASIL C",
        "ASIL D"
      ],
      correctAnswer: 3,
      explanation: "ASIL D corresponds to life-threatening risks and enforces the strictest engineering diligence, redundancy, and structural test coverage.",
      category: "ISO Standards"
    },
    {
      id: "cpe415-mq14",
      question: "What does SEooC stand for in automotive embedded systems engineering?",
      options: [
        "Safety Engineering out of Control",
        "Safety Element out of Context",
        "Standardized Electronic operating Circuit",
        "Synchronous Embedded output Controller"
      ],
      correctAnswer: 1,
      explanation: "SEooC stands for Safety Element out of Context—software or hardware developed independently of a specific vehicle platform based on assumed boundary conditions.",
      category: "ISO Standards"
    },
    {
      id: "cpe415-mq15",
      question: "Under COCOMO sizing definitions, which of the following lines of source text is counted in SLOC?",
      options: [
        "Inline programmer comments explaining a pointer algorithm",
        "Delivered variable declarations and data structure headers written by the team",
        "Automated mock classes generated by a GUI builder tool",
        "Temporary unit test harnesses that are not delivered to the customer"
      ],
      correctAnswer: 1,
      explanation: "In COCOMO, delivered declarations written by project staff count as SLOC. Comments, auto-generated code, and non-delivered test drivers are excluded.",
      category: "COCOMO II"
    },
    {
      id: "cpe415-mq16",
      question: "Which of the following is NOT one of the 5 Scale Drivers in the COCOMO II cost estimation model?",
      options: [
        "Precedentedness (PREC)",
        "Development Flexibility (FLEX)",
        "Architecture / Risk Resolution (RESL)",
        "Hardware Clock Frequency (HCLK)"
      ],
      correctAnswer: 3,
      explanation: "The 5 Scale Drivers in COCOMO II are PREC, FLEX, RESL, TEAM, and PMAT. Hardware clock frequency is not a scale driver.",
      category: "COCOMO II"
    },
    {
      id: "cpe415-mq17",
      question: "Which cost model was created specifically to estimate systems engineering effort (architectures, requirements, interfaces) rather than raw coding?",
      options: [
        "Basic COCOMO 81",
        "COSYSMO",
        "Function Point Analysis",
        "PERT"
      ],
      correctAnswer: 1,
      explanation: "COSYSMO (Constructive Systems Engineering Cost Model) was developed to estimate systems engineering effort based on requirements, interfaces, scenarios, and algorithms.",
      category: "Cost Engineering"
    },
    {
      id: "cpe415-mq18",
      question: "An organization where engineers report simultaneously to both a functional department manager and a product/project manager is structured as a:",
      options: [
        "Pure Functional Structure",
        "Product/Market Structure",
        "Matrix Organization",
        "Line-and-Staff Hierarchy"
      ],
      correctAnswer: 2,
      explanation: "A Matrix Organization uses dual reporting lines (functional manager for technical discipline and project manager for delivery milestones).",
      category: "Organization"
    },
    {
      id: "cpe415-mq19",
      question: "Which situational leadership style is most effective for an autonomous, highly experienced Agile Scrum engineering team?",
      options: [
        "S1: Directing",
        "S2: Coaching",
        "S3: Supporting",
        "S4: Delegating"
      ],
      correctAnswer: 3,
      explanation: "S4 Delegating (low task guidance, low relationship monitoring) is ideal for mature, highly competent and committed teams capable of self-direction.",
      category: "Leadership"
    },
    {
      id: "cpe415-mq20",
      question: "An engineering team employs Continuous Integration (CI) test runners and daily standup meetings. Which type of managerial control does this exemplify?",
      options: [
        "Feedforward Control",
        "Concurrent Control",
        "Feedback Control",
        "Steering Gate 1 Control"
      ],
      correctAnswer: 1,
      explanation: "Concurrent control occurs in real-time during execution to detect variances immediately as work is performed.",
      category: "Management Control"
    },
    {
      id: "cpe415-mq21",
      question: "Which financial liquidity ratio subtracts inventory from current assets before dividing by current liabilities?",
      options: [
        "Debt-to-Equity Ratio",
        "Current Ratio",
        "Acid-Test (Quick) Ratio",
        "Return on Assets"
      ],
      correctAnswer: 2,
      explanation: "Acid-Test Ratio = (Current Assets - Inventory) / Current Liabilities. It evaluates short-term solvency without assuming inventory can be liquidated quickly.",
      category: "Financial Control"
    },
    {
      id: "cpe415-mq22",
      question: "If an activity has an optimistic time of 4 days, most likely time of 7 days, and pessimistic time of 16 days, what is its PERT expected duration Te?",
      options: [
        "7.0 days",
        "8.0 days",
        "9.0 days",
        "10.5 days"
      ],
      correctAnswer: 1,
      explanation: "Te = (a + 4m + b) / 6 = (4 + 4(7) + 16) / 6 = (4 + 28 + 16) / 6 = 48 / 6 = 8.0 days.",
      category: "Project Scheduling"
    },
    {
      id: "cpe415-mq23",
      question: "What is the critical path in a project network diagram?",
      options: [
        "The sequence of activities with the highest direct financial cost",
        "The longest continuous path of dependent activities that dictates the minimum project duration",
        "The path containing tasks with the greatest amount of positive slack",
        "The shortest route through the Activity-on-Node graph"
      ],
      correctAnswer: 1,
      explanation: "The critical path is the longest duration path through the network diagram. Any delay in an activity on this path directly delays project completion.",
      category: "Project Scheduling"
    },
    {
      id: "cpe415-mq24",
      question: "Which base of power is derived from an engineering leader's specialized technical competence and knowledge?",
      options: [
        "Legitimate Power",
        "Referent Power",
        "Expert Power",
        "Coercive Power"
      ],
      correctAnswer: 2,
      explanation: "Expert power is rooted in possessing superior technical expertise, skills, or specialized domain knowledge that others respect and rely upon.",
      category: "Leadership"
    },
    {
      id: "cpe415-mq25",
      question: "Which document bridges user requirements to system specifications to prevent 'scope creep'?",
      options: [
        "Statement of Work (SOW)",
        "Request for Proposal (RFP)",
        "Requirements Traceability Matrix (RTM)",
        "Automotive Safety Integrity Level (ASIL)"
      ],
      correctAnswer: 2,
      explanation: "The Requirements Traceability Matrix (RTM) tracks every requirement from initial user need down to the verified technical specification.",
      category: "Requirements"
    }
  ],
  cramNotes: [
    "SDC 4 Phases: Conception (Feasibility & RFP), Definition (Traceability & Specs), Execution (Build & Conversion), Operation (Maintenance & Disposal).",
    "75% of Life Cycle Cost committed in early phases (Conception & Definition).",
    "Traceability: User Req ('What') -> System Req ('How functionally') -> System Spec ('How technically').",
    "Environmental Fallacy: Designing without considering operating environment (cooling, power, user skills).",
    "Conversion: Parallel (low risk, high cost), Pilot (moderate), Cold Turkey (highest risk, lowest cost).",
    "PMI PLC: Program Definition, Program Delivery, Program Closure.",
    "6 Governance Gates: 1 Auth, 2 Plan Approval, 3 Component Auth, 4 Segment Review, 5 Transition, 6 Closure.",
    "SDLC Models: Waterfall (Royce 1970), V-Model (Rook 1986, ISO 26262), Spiral (Boehm 1986, risk-driven), Prototyping (Brooks 1975), Scrum (1-4 wk sprints).",
    "COCOMO II: Organic (2.4, 1.05), Semidetached (3.0, 1.12), Embedded (3.6, 1.20). Effort = a*(KLOC)^b.",
    "COCOMO II 5 Scale Drivers: PREC, FLEX, RESL, TEAM, PMAT.",
    "COSYSMO: 4 Drivers (Requirements, Interfaces, Scenarios, Algorithms).",
    "ISO Standards: ISO 12207 (Software lifecycle processes: Agreement, Enabling, Tech Mgmt, Technical); ISO 26262 (Functional safety, HARA, ASIL A-D, SEooC).",
    "Controls: Feedforward (preventive), Concurrent (monitoring in flight), Feedback (post-run reviews).",
    "Situational Leadership: S1 Directing, S2 Coaching, S3 Supporting, S4 Delegating.",
    "Financial Ratios: Current = Assets/Liab; Acid-Test = (Assets - Inventory)/Liab.",
    "PERT Duration: Te = (a + 4m + b) / 6."
  ]
};
