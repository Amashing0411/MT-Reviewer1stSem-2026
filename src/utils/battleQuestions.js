import { SUBJECTS_MAP } from "../data/subjects";

// Fisher-Yates shuffle
function shuffle(array, seed = null) {
  const arr = [...array];
  if (seed !== null) {
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

// DEDICATED RAPID-FIRE 1v1 BATTLE QUESTIONS (Short, punchy, 1-2 lines max from actual course modules)
export const RAPID_BATTLE_QUESTIONS = {
  // CPE413: Computer Architecture and Organization (Engr. Joel C. Ananias)
  cpe413: [
    {
      question: "Which term refers to attributes of a computer system visible to the programmer (ISA, registers, addressing modes)?",
      options: ["Computer Architecture", "Computer Organization", "Microarchitecture", "Operating System"],
      correctAnswer: 0,
      explanation: "Architecture defines programmer-visible attributes (ISA), while Organization refers to physical implementation.",
      category: "Architecture vs Organization",
    },
    {
      question: "What physical bottleneck occurs when instructions and data must share the same system bus between CPU and memory?",
      options: ["Von Neumann Bottleneck", "Harvard Hazard", "Amdahl Ceiling", "Bus Contention Trap"],
      correctAnswer: 0,
      explanation: "Sharing a single bus for both code and data creates the classic Von Neumann Bottleneck.",
      category: "Von Neumann Architecture",
    },
    {
      question: "Which type of memory uses a 6-transistor bistable latch per cell and requires NO periodic refresh cycles?",
      options: ["SRAM", "DRAM", "NAND Flash", "EEPROM"],
      correctAnswer: 0,
      explanation: "Static RAM (SRAM) uses 6 transistors to retain state without periodic refresh pulses.",
      category: "Memory Hierarchy",
    },
    {
      question: "In Little-Endian byte ordering, where is the Least Significant Byte (LSB) stored in memory?",
      options: ["At the lowest memory address", "At the highest memory address", "In the CPU status register", "In the parity bit"],
      correctAnswer: 0,
      explanation: "Little-Endian places the Least Significant Byte (LSB) at the lowest memory address.",
      category: "Data Integrity & Encoding",
    },
    {
      question: "How much physical memory can a CPU with a 32-bit address bus directly address?",
      options: ["4 Gigabytes (GB)", "8 Gigabytes (GB)", "16 Gigabytes (GB)", "64 Gigabytes (GB)"],
      correctAnswer: 0,
      explanation: "2^32 unique byte addresses = 4,294,967,296 bytes = exactly 4 GB.",
      category: "Bus Systems",
    },
    {
      question: "In 1837, Charles Babbage's Analytical Engine separated computation from memory using which two mechanical units?",
      options: ["The Mill and The Store", "The ALU and The Cache", "The Wheel and The Lever", "The Relay and The Drum"],
      correctAnswer: 0,
      explanation: "Babbage introduced 'The Mill' for arithmetic processing and 'The Store' for memory storage.",
      category: "Evolution & Milestones",
    },
    {
      question: "Which computer generation introduced Integrated Circuits (ICs), allowing multiple transistors on a single silicon chip?",
      options: ["Generation 3 (1965–1980)", "Generation 1 (1945–1955)", "Generation 2 (1955–1965)", "Generation 4 (1980–Present)"],
      correctAnswer: 0,
      explanation: "Gen 3 (1965–1980) replaced discrete transistors with Integrated Circuits (ICs).",
      category: "Evolution & Milestones",
    },
    {
      question: "What memory tier provides the lowest latency (<1 ns) and resides directly inside the CPU pipeline?",
      options: ["Level 0: CPU Registers", "Level 1: SRAM Cache", "Level 2: Main Memory DRAM", "Level 3: NVMe SSD"],
      correctAnswer: 0,
      explanation: "Level 0 internal CPU registers offer the fastest access time in the memory hierarchy.",
      category: "Memory Hierarchy",
    },
    {
      question: "Which error-correcting code can detect double-bit errors and automatically correct single-bit errors in RAM?",
      options: ["SECDED Hamming Code", "Simple Odd Parity", "Cyclic Redundancy Check (CRC)", "Checksum 16"],
      correctAnswer: 0,
      explanation: "SECDED (Single Error Correction, Double Error Detection) uses Hamming codes to correct 1 bit and detect 2.",
      category: "Data Integrity & Encoding",
    },
    {
      question: "Which memory principle states that if a memory location is accessed, nearby adjacent addresses will likely be accessed soon?",
      options: ["Spatial Locality", "Temporal Locality", "Sequential Locality", "Virtual Locality"],
      correctAnswer: 0,
      explanation: "Spatial locality dictates that adjacent contiguous words are likely to be accessed next.",
      category: "Memory Hierarchy",
    },
    {
      question: "What is recognized as the world's first commercial single-chip microprocessor, released by Intel in 1971?",
      options: ["Intel 4004", "Intel 8086", "Zilog Z80", "MOS 6502"],
      correctAnswer: 0,
      explanation: "The 4-bit Intel 4004 (1971) was the first commercial single-chip microprocessor, launching Gen 4.",
      category: "Evolution & Milestones",
    },
    {
      question: "What mechanism allows a high-speed peripheral controller to transfer data directly to DRAM without involving the CPU?",
      options: ["Direct Memory Access (DMA)", "Programmed I/O", "Polling Interrupt", "Instruction Snooping"],
      correctAnswer: 0,
      explanation: "DMA frees the CPU from byte-by-byte transfer by writing directly to and from main memory.",
      category: "Bus Systems",
    },
    {
      question: "In CMOS microprocessor circuit design, what happens to dynamic power dissipation if the operating voltage is halved?",
      options: ["Power drops by 75% (to 1/4)", "Power is halved (50%)", "Power stays constant", "Power drops by 10%"],
      correctAnswer: 0,
      explanation: "Because dynamic power P = C * V^2 * f, halving voltage (0.5V)^2 drops power to 0.25 (a 75% reduction).",
      category: "Engineering Constraints",
    },
    {
      question: "Which architecture solves the Von Neumann Bottleneck by using separate physical buses and memory for code and data?",
      options: ["Harvard Architecture", "Turing Architecture", "Princeton Architecture", "Single-Bus Architecture"],
      correctAnswer: 0,
      explanation: "Harvard architecture features separate memory pathways for instructions and data.",
      category: "Von Neumann Architecture",
    },
    {
      question: "What reliability metric measures the predicted average operational time elapsed between consecutive hardware failures?",
      options: ["Mean Time Between Failures (MTBF)", "Mean Time to Repair (MTTR)", "Total Cost of Ownership (TCO)", "Thermal Design Power (TDP)"],
      correctAnswer: 0,
      explanation: "MTBF quantifies the expected average elapsed operating duration between system failures.",
      category: "Engineering Constraints",
    },
  ],

  // ELECT3: System & Network Administration III & Security
  elect3: [
    {
      question: "In the CIA Triad, which pillar guarantees that sensitive data is kept secret from unauthorized eyes?",
      options: ["Confidentiality", "Integrity", "Availability", "Non-repudiation"],
      correctAnswer: 0,
      explanation: "Confidentiality ensures information is accessible only to authorized users.",
      category: "Security Principles",
    },
    {
      question: "Which access control model relies on central security labels (e.g., Top Secret) and CANNOT be overridden by resource owners?",
      options: ["Mandatory Access Control (MAC)", "Discretionary Access Control (DAC)", "Role-Based Access Control (RBAC)", "Rule-Based Access Control"],
      correctAnswer: 0,
      explanation: "Under MAC (like SELinux), centrally mandated security labels strictly govern access even against root.",
      category: "Access Control",
    },
    {
      question: "What is the core philosophical tenet of the Zero Trust security architecture?",
      options: ["Never trust, always verify", "Trust internal networks only", "Encrypt only external traffic", "Allow root bypass by default"],
      correctAnswer: 0,
      explanation: "Zero Trust assumes threats exist everywhere; every request must be authenticated, authorized, and encrypted.",
      category: "Access Control",
    },
    {
      question: "Which network category spans a typical range of about 10 meters via Bluetooth (e.g., smartwatches, wireless mice)?",
      options: ["Personal Area Network (PAN)", "Local Area Network (LAN)", "Metropolitan Area Network (MAN)", "Wide Area Network (WAN)"],
      correctAnswer: 0,
      explanation: "A PAN covers a personal workspace of approximately 10 meters using Bluetooth.",
      category: "Network Topologies",
    },
    {
      question: "What is the key difference between an IDS and an IPS in network security?",
      options: ["IDS passively alerts; IPS sits inline and actively blocks attacks", "IDS blocks traffic; IPS only scans logs", "IDS is hardware; IPS is only software", "There is no difference"],
      correctAnswer: 0,
      explanation: "An IDS detects and alerts passively; an IPS sits inline in the physical packet path to actively drop threats.",
      category: "Security Management",
    },
    {
      question: "In Linux, which process termination signal CANNOT be caught, blocked, or ignored by any process?",
      options: ["SIGKILL (9)", "SIGTERM (15)", "SIGHUP (1)", "SIGINT (2)"],
      correctAnswer: 0,
      explanation: "SIGKILL (9) is handled directly by the kernel and cannot be intercepted or ignored by any process.",
      category: "System Administration",
    },
    {
      question: "What is the golden rule regarding Real-Time Operating Systems (RTOS)?",
      options: ["Predictability is more important than raw speed!", "Throughput is always maximized over latency", "RTOS never uses priority scheduling", "RTOS requires distributed clusters"],
      correctAnswer: 0,
      explanation: "In an RTOS, deterministic predictability and guaranteed deadlines take priority over raw speed.",
      category: "OS Types",
    },
    {
      question: "Who created the Linux kernel in 1991 as an open-source, GPL-licensed Unix alternative?",
      options: ["Linus Torvalds", "Dennis Ritchie", "Ken Thompson", "Richard Stallman"],
      correctAnswer: 0,
      explanation: "Linus Torvalds released the Linux kernel in 1991 at the University of Helsinki under the GPL license.",
      category: "Unix/Linux",
    },
    {
      question: "What metric defines the maximum acceptable data loss measured in elapsed time during a disaster?",
      options: ["Recovery Point Objective (RPO)", "Recovery Time Objective (RTO)", "Mean Time to Recovery (MTTR)", "Service Level Agreement (SLA)"],
      correctAnswer: 0,
      explanation: "RPO measures maximum tolerable data loss in time (e.g., maximum 15 minutes of lost transactions).",
      category: "BCDR",
    },
    {
      question: "What permissions does 'chmod 755 filename' grant to Owner, Group, and Others?",
      options: ["Owner: rwx, Group: r-x, Others: r-x", "Owner: rwx, Group: rw-, Others: r--", "Owner: r-x, Group: r-x, Others: r-x", "Owner: rw-, Group: r--, Others: r--"],
      correctAnswer: 0,
      explanation: "7 = 4+2+1 (rwx) for owner; 5 = 4+0+1 (r-x) for group and others.",
      category: "System Administration",
    },
    {
      question: "When a client fails to reach a DHCP server, what 169.254.x.x link-local mechanism assigns an IP address?",
      options: ["APIPA (Automatic Private IP Addressing)", "NAT Overload", "DNS Round-Robin", "ARP Fallback"],
      correctAnswer: 0,
      explanation: "APIPA assigns an IPv4 address in the 169.254.0.0/16 range when no DHCP response is received.",
      category: "Network Protocols",
    },
    {
      question: "How many usable host IP addresses are available in a /26 IPv4 subnet?",
      options: ["62", "30", "126", "254"],
      correctAnswer: 0,
      explanation: "Host bits = 32 - 26 = 6. Usable hosts = 2^6 - 2 = 64 - 2 = 62 hosts.",
      category: "Network Administration",
    },
    {
      question: "Which IP packet header field does 'traceroute' increment hop-by-hop to map intermediate routers?",
      options: ["Time to Live (TTL)", "Protocol field", "Header Checksum", "Type of Service (ToS)"],
      correctAnswer: 0,
      explanation: "traceroute increments the TTL field by 1 for each hop, eliciting ICMP Time Exceeded messages.",
      category: "Network Protocols",
    },
    {
      question: "What is the User ID (UID) of the root superuser account in Unix and Linux operating systems?",
      options: ["UID 0", "UID 1", "UID 1000", "UID -1"],
      correctAnswer: 0,
      explanation: "UID 0 is permanently assigned to the root superuser account in Unix and Linux.",
      category: "System Administration",
    },
    {
      question: "What declarative, agentless automation tool configures remote Linux servers over standard SSH using YAML playbooks?",
      options: ["Ansible", "Docker", "Kubernetes", "Nagios"],
      correctAnswer: 0,
      explanation: "Ansible executes configuration playbooks over standard SSH without requiring client agents.",
      category: "DevOps & Standards",
    },
  ],

  // ENGWORK: English in the Workplace
  engwork: [
    {
      question: "What is the critical distinction between Hearing and Listening?",
      options: ["Hearing is involuntary and physical; Listening is an active, conscious cognitive process", "Hearing requires mental effort; Listening is biological", "Hearing involves interpreting; Listening only receives sound", "There is no difference"],
      correctAnswer: 0,
      explanation: "Hearing is passive biological reception of sound waves; Listening requires active cognitive concentration and comprehension.",
      category: "Listening Skills",
    },
    {
      question: "Which of the 7 Cs of Effective Communication requires directness, avoiding fluff and unnecessary wordiness?",
      options: ["Concise", "Concrete", "Clear", "Courteous"],
      correctAnswer: 0,
      explanation: "Concise communication gets straight to the point without redundant filler words.",
      category: "The 7 Cs",
    },
    {
      question: "Which of the 7 Cs mandates that messages are substantiated with specific, verifiable facts and figures?",
      options: ["Concrete", "Concise", "Coherent", "Courteous"],
      correctAnswer: 0,
      explanation: "Concrete communication provides solid, verifiable facts, figures, and examples.",
      category: "The 7 Cs",
    },
    {
      question: "In the 5-element communication process model, what element confirms that the receiver accurately understood the message?",
      options: ["Feedback", "Channel", "Encoding", "Noise"],
      correctAnswer: 0,
      explanation: "Feedback closes the communication loop by confirming whether the message was understood.",
      category: "Effective Communication",
    },
    {
      question: "Which listening barrier occurs when an individual tunes in only to details that support their existing biases while ignoring other facts?",
      options: ["Selective Listening", "Physical Distractions", "Information Overload", "Emotional State"],
      correctAnswer: 0,
      explanation: "Selective listening filters out conflicting facts and retains only what confirms prior beliefs.",
      category: "Listening Barriers",
    },
    {
      question: "In the 11-Stage Recruitment Lifecycle, what stage immediately follows 'Identify Vacancy' and precedes writing the Job Description?",
      options: ["Job Analysis", "Advertising the Job", "Screening Applications", "Interviews"],
      correctAnswer: 0,
      explanation: "Stage 2 is Job Analysis (investigating duties, skills, and competencies needed for the role).",
      category: "Recruitment",
    },
    {
      question: "What is the recommended 3-part formula for answering 'Tell Me About Yourself' in a job interview?",
      options: ["Present -> Past -> Future", "Weakness -> Action -> Result", "Situation -> Task -> Action", "Education -> Hobbies -> Goals"],
      correctAnswer: 0,
      explanation: "Present (current role/studies), Past (relevant projects/experience), and Future (aspirations and fit).",
      category: "Interview Mastery",
    },
    {
      question: "What does the STAR interview method stand for when responding to behavioral questions?",
      options: ["Situation, Task, Action, Result", "Strategy, Team, Analysis, Review", "Skill, Target, Achievement, Report", "Scenario, Timing, Assessment, Resolution"],
      correctAnswer: 0,
      explanation: "STAR stands for Situation (context), Task (challenge), Action (steps taken), and Result (outcome).",
      category: "Interview Mastery",
    },
    {
      question: "When answering 'What is your greatest weakness?', what professional formula should you follow?",
      options: ["Weakness -> Action -> Improvement", "Claim to have no weaknesses", "Mention a fatal job requirement deficiency", "Blame former coworkers"],
      correctAnswer: 0,
      explanation: "Name a real, manageable weakness, the proactive action taken to address it, and the resulting improvement.",
      category: "Interview Mastery",
    },
    {
      question: "Which type of communication relies on architectural diagrams, charts, and flowcharts to simplify complex technical data?",
      options: ["Visual Communication", "Nonverbal Communication", "Verbal Communication", "Informal Communication"],
      correctAnswer: 0,
      explanation: "Visual communication uses diagrams, charts, and graphics to convey technical information clearly.",
      category: "Communication Basics",
    },
    {
      question: "Which listening barrier occurs when an engineer cuts off a speaker before they can complete expressing their idea?",
      options: ["Interrupting", "Information Overload", "Physical Distraction", "Selective Listening"],
      correctAnswer: 0,
      explanation: "Interrupting disrupts the communicator's train of thought and prevents complete understanding.",
      category: "Listening Barriers",
    },
    {
      question: "Which of the 7 Cs ensures that ideas are logically sequenced and structurally interconnected throughout a document?",
      options: ["Coherent", "Concise", "Correct", "Courteous"],
      correctAnswer: 0,
      explanation: "Coherent communication flows logically with smooth transitions between ideas.",
      category: "The 7 Cs",
    },
    {
      question: "What is the final stage (Stage 11) of the recruitment lifecycle where a new hire is welcomed and integrated into the company?",
      options: ["Onboarding", "Job Offer", "Selection", "Assessment"],
      correctAnswer: 0,
      explanation: "Stage 11 is Onboarding, integrating the new employee into the company culture and workflow.",
      category: "Recruitment",
    },
    {
      question: "Which habit is universally practiced by active, effective listeners?",
      options: ["Paying undivided attention and asking clarifying questions", "Formulating a rebuttal while the speaker talks", "Interrupting to correct grammar", "Remaining completely unresponsive"],
      correctAnswer: 0,
      explanation: "Active listeners give full attention, avoid interrupting, ask clarifying questions, and give feedback.",
      category: "Listening Skills",
    },
    {
      question: "Why is communication formally recognized as the 'lifeline' of an organization?",
      options: ["It connects employees, managers, and departments to coordinate operations and achieve goals", "It is legally required by government telecommunications acts", "It replaces computerized databases", "It is only necessary during corporate crises"],
      correctAnswer: 0,
      explanation: "Communication connects personnel across all levels to enable collaboration, trust, and execution.",
      category: "Communication Basics",
    },
  ],

  // CPE416: CPE Laws and Professional Practice (Engr. Joel C. Ananias)
  cpe416: [
    {
      question: "What Republic Act is known as the Electronics Engineering Law of 2004?",
      options: ["RA 9292", "RA 10175", "RA 10173", "RA 8293"],
      correctAnswer: 0,
      explanation: "RA 9292 regulates the practice of Electronics Engineers, Professional ECEs, and Electronics Technicians.",
      category: "Engineering Laws",
    },
    {
      question: "What Republic Act is known as the Cybercrime Prevention Act of 2012?",
      options: ["RA 10175", "RA 10173", "RA 9292", "RA 8792"],
      correctAnswer: 0,
      explanation: "RA 10175 defines cybercrime offenses, illegal access, data interference, and penalties in the Philippines.",
      category: "Cybercrime Laws",
    },
    {
      question: "What Republic Act is known as the Data Privacy Act of 2012?",
      options: ["RA 10173", "RA 10175", "RA 8293", "RA 9292"],
      correctAnswer: 0,
      explanation: "RA 10173 protects individual personal information and created the National Privacy Commission (NPC).",
      category: "Data Privacy",
    },
    {
      question: "What Republic Act is known as the Intellectual Property Code of the Philippines?",
      options: ["RA 8293", "RA 8792", "RA 9292", "RA 10173"],
      correctAnswer: 0,
      explanation: "RA 8293 governs patents, trademarks, copyright, and industrial designs in the Philippines.",
      category: "Intellectual Property",
    },
    {
      question: "What Republic Act is known as the Electronic Commerce Act of 2000?",
      options: ["RA 8792", "RA 10175", "RA 9292", "RA 8293"],
      correctAnswer: 0,
      explanation: "RA 8792 legally recognizes electronic data messages, electronic documents, and electronic signatures.",
      category: "E-Commerce Law",
    },
    {
      question: "Under RA 10173, what government body is tasked with administering and enforcing data privacy compliance?",
      options: ["National Privacy Commission (NPC)", "Department of Information and Communications Technology (DICT)", "Cybercrime Investigation and Coordinating Center (CICC)", "National Telecommunications Commission (NTC)"],
      correctAnswer: 0,
      explanation: "The National Privacy Commission (NPC) is the regulatory body enforcing the Data Privacy Act.",
      category: "Data Privacy",
    },
    {
      question: "In engineering ethics, what is a professional engineer's paramount responsibility according to the Code of Ethics?",
      options: ["Safeguarding the safety, health, and welfare of the public", "Maximizing employer corporate profits", "Honoring contracts above human life", "Protecting company trade secrets at all costs"],
      correctAnswer: 0,
      explanation: "An engineer's primary duty is to hold paramount the safety, health, and welfare of the general public.",
      category: "Ethics",
    },
  ],

  // CPE415: Engineering Management
  cpe415: [
    {
      question: "What are the four sequential phases of the Systems Development Cycle (SDC)?",
      options: ["Conception, Definition, Acquisition, and Operation", "Planning, Coding, Testing, and Deployment", "Initiation, Execution, Monitoring, and Closing", "Design, Build, Maintain, and Retire"],
      correctAnswer: 0,
      explanation: "The 4 SDC phases are: (1) Conception, (2) Definition, (3) Acquisition, and (4) Operation.",
      category: "Systems Development Cycle",
    },
    {
      question: "In project network scheduling, what is the Critical Path in a CPM/PERT network diagram?",
      options: ["The longest sequence of dependent activities with zero slack/float", "The shortest path connecting start and finish", "The path with the highest financial budget", "The sequence with the most personnel assigned"],
      correctAnswer: 0,
      explanation: "The Critical Path is the longest path of dependent tasks; any delay on this path delays the entire project.",
      category: "Network Scheduling",
    },
    {
      question: "Which system conversion strategy immediately shuts down the old legacy system and switches entirely to the new system on a single cutover date?",
      options: ["Direct / Cutover Conversion (Cold Turkey)", "Parallel Conversion", "Phased Conversion", "Pilot Conversion"],
      correctAnswer: 0,
      explanation: "Direct conversion terminates the old system immediately as the new system goes live (highest risk).",
      category: "System Conversion",
    },
    {
      question: "Which conversion strategy runs both the old legacy system and the new system concurrently until the new system is proven reliable?",
      options: ["Parallel Conversion", "Direct Conversion", "Pilot Conversion", "Phased Conversion"],
      correctAnswer: 0,
      explanation: "Parallel conversion runs both systems side-by-side to minimize risk, but doubles operational overhead.",
      category: "System Conversion",
    },
    {
      question: "In software engineering estimation, what parametric cost estimation model was developed by Barry Boehm?",
      options: ["COCOMO II", "PERT Beta Distribution", "Function Point Analysis", "Earned Value Management"],
      correctAnswer: 0,
      explanation: "COCOMO (Constructive Cost Model) II estimates software project effort, cost, and schedule based on size.",
      category: "Cost Estimation",
    },
    {
      question: "In PMI Governance, what formal reviews serve as decision checkpoints between project phases to authorize continuation?",
      options: ["Governance Gates (Phase Gates / Tollgates)", "Daily Standups", "Sprint Retrospectives", "Code Reviews"],
      correctAnswer: 0,
      explanation: "Phase Gates (or Tollgates) evaluate whether business objectives are met before committing funds to the next phase.",
      category: "PMI Governance",
    },
  ],

  // CPE411: CPE Practice and Design 2 (Capstone Project)
  cpe411: [
    {
      question: "In Capstone Design feasibility studies, which dimension evaluates if the project can be built using available hardware, tools, and technical skills?",
      options: ["Technical Feasibility", "Operational Feasibility", "Economic Feasibility", "Schedule Feasibility"],
      correctAnswer: 0,
      explanation: "Technical Feasibility verifies that required hardware components and programming toolchains are achievable.",
      category: "Project Feasibility",
    },
    {
      question: "Which feasibility dimension examines whether end-users will successfully adopt, operate, and maintain the system in daily workflows?",
      options: ["Operational Feasibility", "Technical Feasibility", "Economic Feasibility", "Schedule Feasibility"],
      correctAnswer: 0,
      explanation: "Operational Feasibility evaluates user acceptance, workflow integration, and ergonomics.",
      category: "Project Feasibility",
    },
    {
      question: "In engineering project documentation, which chapter presents System Testing, Prototype Evaluation Results, and Project Benefits?",
      options: ["Chapter 4", "Chapter 3", "Chapter 5", "Chapter 1"],
      correctAnswer: 0,
      explanation: "Chapter 4 delivers empirical findings, prototype evaluation results, and project benefits.",
      category: "Thesis Documentation",
    },
    {
      question: "Which metric in Economic Feasibility calculates the time required for accumulated cash benefits to equal the initial capital investment?",
      options: ["Payback Period", "Return on Equity", "Depreciation Rate", "Internal Rate of Return (IRR)"],
      correctAnswer: 0,
      explanation: "Payback Period measures the exact duration needed to recoup the project's initial investment.",
      category: "Economic Analysis",
    },
    {
      question: "In Chapter 5, what section provides logical interpretations and direct answers to the specific research objectives stated in Chapter 1?",
      options: ["Conclusions", "Summary of Findings", "Recommendations", "Scope and Delimitation"],
      correctAnswer: 0,
      explanation: "Conclusions draw deductive answers to research problems based directly on the collected data.",
      category: "Thesis Documentation",
    },
    {
      question: "What is the crucial difference between 'Summary of Findings' and 'Conclusions' in engineering research?",
      options: ["Findings state factual raw numbers; Conclusions interpret what those numbers mean relative to objectives", "Findings are opinions; Conclusions are raw data", "Findings discuss future work; Conclusions discuss past work", "There is no difference; they are synonymous"],
      correctAnswer: 0,
      explanation: "Findings present verifiable empirical observations; Conclusions provide answers and implications.",
      category: "Research Methodology",
    },
    {
      question: "Which project management tool displays task durations, dependencies, and milestones across a calendar timeline?",
      options: ["Gantt Chart", "Pareto Chart", "Fishbone Diagram", "Scatter Plot"],
      correctAnswer: 0,
      explanation: "A Gantt Chart visualizes schedule feasibility, showing task sequences and milestones.",
      category: "Project Management",
    },
  ],
};

// Official Subject Metadata aligned with the real BSCPE curriculum
export const SUBJECT_INFO = {
  cpe413: { code: "CPE413", title: "Computer Architecture and Organization" },
  elect3: { code: "ELECT3", title: "System & Network Administration III & Security" },
  engwork: { code: "ENGWORK", title: "English in the Workplace" },
  cpe416: { code: "CPE416", title: "CPE Laws and Professional Practice" },
  cpe415: { code: "CPE415", title: "Engineering Management" },
  cpe411: { code: "CPE411", title: "CPE Practice and Design 2" },
  cpe414: { code: "CPE414", title: "Digital Signal Processing" },
  cpe412: { code: "CPE412", title: "Seminars and Field Trips" },
};

// Prepare rapid-fire question pool for 1v1 Battle Exam
export function getBattleQuestions(subjectId = "all", seed = null) {
  let pool = [];

  if (subjectId === "all" || !RAPID_BATTLE_QUESTIONS[subjectId]) {
    // Combine rapid-fire questions from all subjects
    Object.entries(RAPID_BATTLE_QUESTIONS).forEach(([subKey, questions]) => {
      const meta = SUBJECT_INFO[subKey] || { code: subKey.toUpperCase(), title: subKey.toUpperCase() };
      questions.forEach((q, idx) => {
        pool.push({
          ...q,
          id: `${subKey}_rapid_${idx}`,
          subjectId: subKey,
          subjectCode: meta.code,
          subjectTitle: meta.title,
        });
      });
    });
  } else {
    // Dedicated subject questions
    const meta = SUBJECT_INFO[subjectId] || { code: subjectId.toUpperCase(), title: subjectId.toUpperCase() };
    RAPID_BATTLE_QUESTIONS[subjectId].forEach((q, idx) => {
      pool.push({
        ...q,
        id: `${subjectId}_rapid_${idx}`,
        subjectId,
        subjectCode: meta.code,
        subjectTitle: meta.title,
      });
    });
  }

  // Fallback to concise extraction from mockQuestions if pool is small
  if (pool.length < 15) {
    Object.entries(SUBJECTS_MAP).forEach(([id, sub]) => {
      if (Array.isArray(sub.mockQuestions)) {
        sub.mockQuestions.forEach((q, idx) => {
          const rawQ = q.question || "";
          let shortQ = rawQ;
          if (rawQ.includes("\n\n")) {
            shortQ = rawQ.substring(rawQ.lastIndexOf("\n\n") + 2).trim();
          }

          pool.push({
            id: `fallback_${id}_${idx}`,
            subjectId: id,
            subjectCode: sub.code || id.toUpperCase(),
            subjectTitle: sub.title || "",
            question: shortQ,
            options: q.options,
            correctAnswer: q.correctAnswer ?? 0,
            explanation: q.explanation || "",
            category: q.category || "Core Concepts",
          });
        });
      }
    });
  }

  // Shuffle the questions order and cap at 30 questions per battle match
  const shuffledQuestions = shuffle(pool, seed).slice(0, 30);

  // Return formatted questions with shuffled options
  return shuffledQuestions.map((q, idx) => {
    const rawOpts = q.options.map((opt, i) => ({ text: opt, isCorrect: i === q.correctAnswer }));
    const shuffledOpts = shuffle(rawOpts, seed ? seed + idx : null);
    const newCorrectIdx = shuffledOpts.findIndex((o) => o.isCorrect);

    const cleanPrompt = q.prompt || q.question;

    return {
      id: q.id || `q_${idx}`,
      subjectCode: q.subjectCode,
      subjectTitle: q.subjectTitle,
      question: cleanPrompt,
      scenario: null, // Purposely null in 1v1 battle so players read in 2-3s!
      prompt: cleanPrompt,
      options: shuffledOpts.map((o) => o.text),
      correctAnswer: newCorrectIdx,
      explanation: q.explanation || "",
      category: q.category || "General",
    };
  });
}
