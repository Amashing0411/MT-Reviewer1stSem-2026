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

// DEDICATED RAPID-FIRE 1v1 BATTLE QUESTIONS (Short, punchy, 1-2 lines max from slides)
export const RAPID_BATTLE_QUESTIONS = {
  cpe413: [
    {
      question: "Which GoF design pattern defines a one-to-many dependency so that when one object changes state, all dependents are notified automatically?",
      options: ["Observer Pattern", "Singleton Pattern", "Decorator Pattern", "Facade Pattern"],
      correctAnswer: 0,
      explanation: "Observer establishes a publish-subscribe dependency between subject and listeners.",
      category: "Design Patterns",
    },
    {
      question: "Which behavioral pattern encapsulates a request as an object, enabling parameterization of clients, queues, and undo operations?",
      options: ["Command Pattern", "Strategy Pattern", "Template Method", "State Pattern"],
      correctAnswer: 0,
      explanation: "Command wraps a request with receiver, action, and arguments into a discrete object.",
      category: "Design Patterns",
    },
    {
      question: "In structural design patterns, which pattern dynamically adds responsibilities to an object without modifying its underlying class?",
      options: ["Decorator", "Adapter", "Bridge", "Proxy"],
      correctAnswer: 0,
      explanation: "Decorator wraps an existing class to provide extended features dynamically.",
      category: "Design Patterns",
    },
    {
      question: "Which pattern provides a unified, simplified high-level interface to a complex subsystem of classes?",
      options: ["Facade", "Adapter", "Composite", "Flyweight"],
      correctAnswer: 0,
      explanation: "Facade defines a simple front door to a complicated multi-class subsystem.",
      category: "Design Patterns",
    },
    {
      question: "Which creational pattern guarantees a class has only one instance and provides a global point of access to it?",
      options: ["Singleton", "Factory Method", "Prototype", "Builder"],
      correctAnswer: 0,
      explanation: "Singleton ensures a single shared instance throughout the application lifecycle.",
      category: "Design Patterns",
    },
    {
      question: "In object-oriented design, what is the ideal relationship between coupling and cohesion?",
      options: ["High cohesion and loose (low) coupling", "Low cohesion and tight coupling", "High cohesion and tight coupling", "Low cohesion and low coupling"],
      correctAnswer: 0,
      explanation: "Ideal software exhibits high cohesion (focused duties) and low coupling (minimal dependencies).",
      category: "Architecture",
    },
    {
      question: "In Agile Scrum, what is the ceremony called where the team reflects on the past sprint to improve processes for the next iteration?",
      options: ["Sprint Retrospective", "Sprint Planning", "Daily Standup", "Sprint Review"],
      correctAnswer: 0,
      explanation: "Sprint Retrospective focuses on team process improvements and team dynamics.",
      category: "Agile Development",
    },
    {
      question: "What is the formula for McCabe's Cyclomatic Complexity (M) where E is edges, N is nodes, and P is connected components?",
      options: ["M = E - N + 2P", "M = E + N - P", "M = 2E - N + P", "M = N - E + 2P"],
      correctAnswer: 0,
      explanation: "Cyclomatic complexity is calculated as M = E - N + 2P, representing linearly independent paths.",
      category: "Testing & Metrics",
    },
    {
      question: "In automated unit testing, what is a test double that records calls and verifies whether expected interactions occurred?",
      options: ["Mock", "Stub", "Dummy", "Fake"],
      correctAnswer: 0,
      explanation: "Mocks are pre-programmed with expectations regarding calls and verify method invocations.",
      category: "Software Testing",
    },
    {
      question: "What term describes disciplined code restructuring that improves internal structure without altering external observable behavior?",
      options: ["Refactoring", "Re-engineering", "Optimization", "Debugging"],
      correctAnswer: 0,
      explanation: "Refactoring cleans and reorganizes code structure while keeping all external behaviors identical.",
      category: "Code Quality",
    },
    {
      question: "Which creational pattern is best suited for constructing complex composite objects step-by-step with differing representations?",
      options: ["Builder", "Singleton", "Adapter", "Abstract Factory"],
      correctAnswer: 0,
      explanation: "Builder separates complex object construction from its representation.",
      category: "Design Patterns",
    },
    {
      question: "In UML Class Diagrams, what does an unfilled open arrowhead on a dashed line represent?",
      options: ["Realization / Implementation", "Generalization / Inheritance", "Aggregation", "Composition"],
      correctAnswer: 0,
      explanation: "A dashed line with an unfilled triangle arrow signifies interface realization/implementation.",
      category: "UML Modeling",
    },
    {
      question: "Which architectural pattern cleanly separates an application into Presentation, Business Logic, and Data Persistence layers?",
      options: ["N-Tier / Layered Architecture", "Microkernel", "Event-Driven", "Pipe-and-Filter"],
      correctAnswer: 0,
      explanation: "Layered/N-Tier isolates concerns across presentation, business, and persistence tiers.",
      category: "Architecture",
    },
    {
      question: "In Extreme Programming (XP) and Test-Driven Development (TDD), what is the correct sequence of the TDD cycle?",
      options: ["Red -> Green -> Refactor", "Green -> Red -> Refactor", "Refactor -> Red -> Green", "Design -> Code -> Test"],
      correctAnswer: 0,
      explanation: "TDD strictly executes: Write failing test (Red), pass it (Green), improve code (Refactor).",
      category: "Agile Development",
    },
    {
      question: "Which testing technique derives test cases from equivalence partitions and boundary values without looking at source code?",
      options: ["Black-Box Testing", "White-Box Testing", "Mutation Testing", "Static Analysis"],
      correctAnswer: 0,
      explanation: "Black-box testing focuses purely on inputs and expected outputs without internal code knowledge.",
      category: "Software Testing",
    },
  ],

  elect3: [
    {
      question: "In the Android Activity Lifecycle, which callback is invoked immediately before the Activity becomes visible to the user?",
      options: ["onStart()", "onResume()", "onCreate()", "onRestart()"],
      correctAnswer: 0,
      explanation: "onStart() makes the activity visible, while onResume() brings it to the interactive foreground.",
      category: "Android Lifecycle",
    },
    {
      question: "Which Android Architecture Component survives configuration changes (such as device screen rotation) without losing data?",
      options: ["ViewModel", "Activity", "Fragment", "BroadcastReceiver"],
      correctAnswer: 0,
      explanation: "ViewModel is retained across configuration changes until its host Activity is permanently finished.",
      category: "Jetpack Architecture",
    },
    {
      question: "In Kotlin Coroutines, which Dispatcher is specifically optimized for disk file I/O, database access, and network requests?",
      options: ["Dispatchers.IO", "Dispatchers.Main", "Dispatchers.Default", "Dispatchers.Unconfined"],
      correctAnswer: 0,
      explanation: "Dispatchers.IO uses a shared pool of on-demand threads tailored for blocking I/O operations.",
      category: "Kotlin Coroutines",
    },
    {
      question: "What system error occurs when an Android application executes heavy blocking computations on the UI thread for longer than 5 seconds?",
      options: ["Application Not Responding (ANR)", "OutOfMemoryError (OOM)", "NullPointerException (NPE)", "NetworkOnMainThreadException"],
      correctAnswer: 0,
      explanation: "Android OS triggers an ANR dialog if the main UI thread remains unresponsive for 5 seconds.",
      category: "Android Performance",
    },
    {
      question: "Which lifecycle callback is the first to be called when an Activity loses foreground focus and is partially obscured by a dialog?",
      options: ["onPause()", "onStop()", "onDestroy()", "onSaveInstanceState()"],
      correctAnswer: 0,
      explanation: "onPause() indicates the activity is no longer in the foreground focus, though it may still be visible.",
      category: "Android Lifecycle",
    },
    {
      question: "In Jetpack Compose, which function is used to remember an observable state value across UI recompositions?",
      options: ["remember { mutableStateOf(...) }", "rememberCoroutineScope()", "mutableListOf()", "LaunchedEffect()"],
      correctAnswer: 0,
      explanation: "remember { mutableStateOf() } stores a mutable state and triggers recomposition on value changes.",
      category: "Jetpack Compose",
    },
    {
      question: "Which Android component is an abstract representation of an operation to be performed, used to launch Activities or send broadcasts?",
      options: ["Intent", "Bundle", "Service", "ContentProvider"],
      correctAnswer: 0,
      explanation: "An Intent is a messaging object used to request an action from another app component.",
      category: "Core Components",
    },
    {
      question: "In Android Room Persistence Library, what annotation marks a Kotlin data class as a SQLite database table?",
      options: ["@Entity", "@Database", "@Dao", "@ColumnInfo"],
      correctAnswer: 0,
      explanation: "@Entity marks the data class as a persistent database table in Room.",
      category: "Data Storage",
    },
    {
      question: "Which Intent type specifies the exact target component class name to be launched by the Android system?",
      options: ["Explicit Intent", "Implicit Intent", "Broadcast Intent", "Pending Intent"],
      correctAnswer: 0,
      explanation: "Explicit Intents specify the exact Java/Kotlin class name of the target activity or service.",
      category: "Core Components",
    },
    {
      question: "In Kotlin, what keyword creates a coroutine that blocks the current thread until its inner execution completes?",
      options: ["runBlocking", "launch", "async", "withContext"],
      correctAnswer: 0,
      explanation: "runBlocking bridges non-coroutine and coroutine worlds by blocking the current execution thread.",
      category: "Kotlin Coroutines",
    },
    {
      question: "Which Android Jetpack component provides a cold, asynchronous data stream that emits multiple values sequentially over time?",
      options: ["Flow", "LiveData", "SingleLiveEvent", "BroadcastChannel"],
      correctAnswer: 0,
      explanation: "Kotlin Flow is a cold asynchronous data stream that computes and emits values on demand.",
      category: "Reactive Programming",
    },
    {
      question: "What Jetpack Compose side-effect API safely launches a coroutine tied to a specific key's lifecycle?",
      options: ["LaunchedEffect", "DisposableEffect", "SideEffect", "rememberUpdatedState"],
      correctAnswer: 0,
      explanation: "LaunchedEffect launches a coroutine block whenever the composable enters composition or its key changes.",
      category: "Jetpack Compose",
    },
    {
      question: "Which manifest permission is required for an Android application to send HTTP/HTTPS requests to remote web APIs?",
      options: ["android.permission.INTERNET", "android.permission.ACCESS_NETWORK_STATE", "android.permission.WAKE_LOCK", "android.permission.RECEIVE_BOOT_COMPLETED"],
      correctAnswer: 0,
      explanation: "android.permission.INTERNET is mandatory in AndroidManifest.xml to open network sockets.",
      category: "Android Security",
    },
  ],

  engwork: [
    {
      question: "Under Philippine law, which landmark legislation is known as the 'Act Strengthening Compliance with Occupational Safety and Health Standards'?",
      options: ["Republic Act No. 11058", "Republic Act No. 9514", "Republic Act No. 7920", "Republic Act No. 9292"],
      correctAnswer: 0,
      explanation: "RA 11058 governs Occupational Safety and Health Standards (OSHS) in the Philippines.",
      category: "OSH Legislation",
    },
    {
      question: "In the OSH Hierarchy of Controls, which method is universally recognized as the MOST EFFECTIVE way to control workplace hazards?",
      options: ["Elimination", "Substitution", "Engineering Controls", "Personal Protective Equipment (PPE)"],
      correctAnswer: 0,
      explanation: "Elimination physically removes the hazard completely, making it the most effective control.",
      category: "Hazard Management",
    },
    {
      question: "In the OSH Hierarchy of Controls, which control level is considered the LEAST EFFECTIVE and acts as the last line of defense?",
      options: ["Personal Protective Equipment (PPE)", "Administrative Controls", "Engineering Controls", "Substitution"],
      correctAnswer: 0,
      explanation: "PPE is the lowest tier because it only protects the individual worker if worn correctly.",
      category: "Hazard Management",
    },
    {
      question: "Which fire classification under the Philippine Fire Code (RA 9514) involves energized electrical equipment such as server racks and motors?",
      options: ["Class C Fire", "Class A Fire", "Class B Fire", "Class D Fire"],
      correctAnswer: 0,
      explanation: "Class C fires involve live electrical equipment where non-conductive extinguishing agents must be used.",
      category: "Fire Safety",
    },
    {
      question: "What type of fire extinguisher agent must NEVER be used on energized electrical equipment (Class C fires) due to shock hazard?",
      options: ["Water / Water Stream", "Carbon Dioxide (CO2)", "Dry Chemical Powder", "Clean Agent / Halon alternative"],
      correctAnswer: 0,
      explanation: "Water conducts electricity and creates a lethal electrocution hazard on energized equipment.",
      category: "Fire Safety",
    },
    {
      question: "What safety protocol ensures that electrical machinery is completely de-energized, locked, and tagged before maintenance begins?",
      options: ["Lockout / Tagout (LOTO)", "Job Hazard Analysis (JHA)", "Hot Work Permit", "Permit to Work (PTW)"],
      correctAnswer: 0,
      explanation: "LOTO ensures machinery is powered down and cannot be inadvertently re-energized during repair.",
      category: "Electrical Safety",
    },
    {
      question: "Under DOLE guidelines, what is an unplanned event that did NOT cause injury or equipment damage, but had the clear potential to do so?",
      options: ["Near Miss", "First Aid Case", "Lost Time Accident", "Disabling Injury"],
      correctAnswer: 0,
      explanation: "A Near Miss is an incident with potential for injury or loss where no actual harm occurred.",
      category: "Incident Reporting",
    },
    {
      question: "Which government department in the Philippines is the primary executive agency tasked with enforcing workplace OSH regulations?",
      options: ["DOLE (Department of Labor and Employment)", "DENR", "DILG", "DTI"],
      correctAnswer: 0,
      explanation: "DOLE enforces labor standards, workplace health, and safety compliance under RA 11058.",
      category: "OSH Legislation",
    },
    {
      question: "In an electrical circuit, what device is specifically engineered to protect personnel from electric shock caused by ground faults?",
      options: ["Ground Fault Circuit Interrupter (GFCI)", "Thermal Overload Relay", "Slow-Blow Cartridge Fuse", "Surge Protector"],
      correctAnswer: 0,
      explanation: "A GFCI monitors current balance between hot and neutral and trips within milliseconds upon ground leak.",
      category: "Electrical Safety",
    },
    {
      question: "Class B fires involve which of the following combustible materials?",
      options: ["Flammable liquids and combustible gases (gasoline, paint)", "Ordinary combustibles (wood, paper)", "Combustible metals (magnesium, sodium)", "Commercial cooking oils and fats"],
      correctAnswer: 0,
      explanation: "Class B fires involve flammable liquids, oils, petroleum greases, tars, and flammable gases.",
      category: "Fire Safety",
    },
    {
      question: "Under the DOLE OSH framework, what document systematically breaks down a work task to identify hazards and determine controls?",
      options: ["Job Hazard Analysis (JHA)", "Material Safety Data Sheet (MSDS)", "Incident Investigation Report", "Bill of Materials"],
      correctAnswer: 0,
      explanation: "JHA (or JSA) analyzes task steps, hazards, and preventive controls before work execution.",
      category: "Risk Assessment",
    },
    {
      question: "What is the minimum safe working distance from uninsulated overhead power lines carrying up to 50 kV according to OSHA standards?",
      options: ["10 feet (approx. 3 meters)", "3 feet", "20 feet", "1 foot"],
      correctAnswer: 0,
      explanation: "OSHA mandates a minimum 10-foot clearance from energized lines up to 50 kV to prevent arcing.",
      category: "Electrical Safety",
    },
  ],

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
      question: "In engineering project documentation, which chapter presents the System Testing, Evaluation Results, and Project Benefits?",
      options: ["Chapter 4", "Chapter 3", "Chapter 5", "Chapter 1"],
      correctAnswer: 0,
      explanation: "Chapter 4 delivers the empirical findings, prototype evaluation results, and project benefits.",
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
      question: "To whom should the 'Recommendations' section in Chapter 5 be primarily directed?",
      options: ["Future researchers, end-users, and institutions", "The thesis defense panel only", "Component hardware vendors", "The student researchers exclusively"],
      correctAnswer: 0,
      explanation: "Recommendations provide practical actions for future researchers, target communities, and institutions.",
      category: "Thesis Documentation",
    },
    {
      question: "Which project management tool displays task durations, dependencies, and milestones across a calendar timeline?",
      options: ["Gantt Chart", "Pareto Chart", "Fishbone Diagram", "Scatter Plot"],
      correctAnswer: 0,
      explanation: "A Gantt Chart visualizes schedule feasibility, showing task sequences and milestones.",
      category: "Project Management",
    },
  ],

  cpe416: [
    {
      question: "In the classic 5-stage MIPS RISC pipeline, what is the correct order of the execution stages?",
      options: ["IF -> ID -> EX -> MEM -> WB", "ID -> IF -> EX -> WB -> MEM", "IF -> EX -> ID -> MEM -> WB", "IF -> ID -> MEM -> EX -> WB"],
      correctAnswer: 0,
      explanation: "Classic RISC: Instruction Fetch (IF), Decode (ID), Execute (EX), Memory (MEM), Write-Back (WB).",
      category: "Pipelining",
    },
    {
      question: "Which pipeline hazard occurs when hardware cannot support all possible combinations of instructions in the same clock cycle?",
      options: ["Structural Hazard", "Data Hazard", "Control Hazard", "Branch Hazard"],
      correctAnswer: 0,
      explanation: "Structural hazards arise from hardware resource conflicts (e.g., shared single memory port).",
      category: "Pipelining",
    },
    {
      question: "What hardware optimization forwards ALU calculation results directly to waiting pipeline stages without waiting for Write-Back?",
      options: ["Forwarding / Bypassing", "Branch Delay Slot", "Out-of-Order Execution", "Dynamic Prediction"],
      correctAnswer: 0,
      explanation: "Forwarding routes results directly from EX/MEM or MEM/WB registers back to the ALU input.",
      category: "Pipeline Hazards",
    },
    {
      question: "Which principle of memory locality states that items with addresses near a recently accessed address are likely to be accessed soon?",
      options: ["Spatial Locality", "Temporal Locality", "Associative Locality", "Virtual Locality"],
      correctAnswer: 0,
      explanation: "Spatial locality dictates that nearby contiguous memory words are likely to be referenced next.",
      category: "Memory Hierarchy",
    },
    {
      question: "What type of data hazard occurs when instruction J attempts to read a register before instruction I writes to it?",
      options: ["RAW (Read After Write)", "WAR (Write After Read)", "WAW (Write After Write)", "RAR (Read After Read)"],
      correctAnswer: 0,
      explanation: "RAW represents true data dependency: an instruction depends on a result not yet written.",
      category: "Pipeline Hazards",
    },
    {
      question: "According to Amdahl's Law, what limits the maximum speedup achievable from parallel processors?",
      options: ["The fraction of the program that is strictly sequential", "The total clock frequency of the CPU", "The number of cache levels", "The memory bus width"],
      correctAnswer: 0,
      explanation: "Amdahl's law proves the sequential portion limits maximum overall acceleration.",
      category: "System Performance",
    },
    {
      question: "In a cache memory system, what write policy updates main memory immediately whenever a cache block is modified?",
      options: ["Write-Through", "Write-Back", "Write-Allocate", "No-Write-Allocate"],
      correctAnswer: 0,
      explanation: "Write-Through immediately writes modified data to lower-level memory on every store operation.",
      category: "Memory Hierarchy",
    },
  ],

  cpe415: [
    {
      question: "In Verilog HDL, which assignment operator must be used inside clocked sequential edge-triggered always blocks (@(posedge clk))?",
      options: ["<= (Non-blocking)", "= (Blocking)", "== (Equality)", ":= (Direct)"],
      correctAnswer: 0,
      explanation: "Non-blocking assignments (<=) prevent race conditions in sequential flip-flop modeling.",
      category: "Verilog HDL",
    },
    {
      question: "In Finite State Machines (FSM), which architecture produces outputs that depend ONLY on the current state, free from input glitches?",
      options: ["Moore Machine", "Mealy Machine", "Turing Machine", "Asynchronous Machine"],
      correctAnswer: 0,
      explanation: "A Moore machine's outputs are strictly functions of the current state register.",
      category: "Digital Logic",
    },
    {
      question: "What is the minimum amount of time that input data must remain stable BEFORE the active clock edge of a flip-flop?",
      options: ["Setup Time (tsu)", "Hold Time (th)", "Propagation Delay (tpd)", "Contamination Delay (tcd)"],
      correctAnswer: 0,
      explanation: "Setup time is the required stable window prior to the active clock transition.",
      category: "Timing Analysis",
    },
    {
      question: "What dangerous hardware condition occurs when setup or hold times are violated, causing a flip-flop to oscillate between 0 and 1?",
      options: ["Metastability", "Ground Bounce", "Clock Skew", "Cross-Talk"],
      correctAnswer: 0,
      explanation: "Metastability leaves the bistable element in an indeterminate state for an unpredictable duration.",
      category: "Timing Analysis",
    },
    {
      question: "What fundamental reconfigurable logic element inside an FPGA implements arbitrary Boolean truth tables using SRAM cells?",
      options: ["Look-Up Table (LUT)", "Digital Signal Processor (DSP)", "Block RAM (BRAM)", "Phase-Locked Loop (PLL)"],
      correctAnswer: 0,
      explanation: "LUTs act as small truth-table memories implementing custom combinational logic functions.",
      category: "FPGA Architecture",
    },
    {
      question: "Which timing path in a digital synchronous circuit determines the absolute maximum operating clock frequency (fmax)?",
      options: ["Critical Path", "False Path", "Reset Path", "Asynchronous Path"],
      correctAnswer: 0,
      explanation: "The critical path is the longest delay path between sequential registers and bounds clock speed.",
      category: "Static Timing",
    },
  ],

  cpe414: [
    {
      question: "According to the Nyquist-Shannon sampling theorem, what is the minimum sampling frequency required to avoid aliasing for a signal with bandwidth B?",
      options: ["fs >= 2B", "fs >= B", "fs >= 4B", "fs = B / 2"],
      correctAnswer: 0,
      explanation: "Sampling rate must be at least twice the highest frequency component (Nyquist rate = 2B).",
      category: "DSP Theory",
    },
    {
      question: "What analog filter must be inserted BEFORE the Analog-to-Digital Converter (ADC) to prevent frequency aliasing?",
      options: ["Anti-Aliasing Low-Pass Filter", "High-Pass Filter", "Band-Stop Notch Filter", "Comb Filter"],
      correctAnswer: 0,
      explanation: "An anti-aliasing low-pass filter eliminates frequencies above fs/2 before sampling.",
      category: "Signal Conditioning",
    },
    {
      question: "Which digital filter type has an impulse response that settles to zero in finite time and is inherently unconditionally stable?",
      options: ["FIR (Finite Impulse Response)", "IIR (Infinite Impulse Response)", "Chebyshev Filter", "Butterworth Filter"],
      correctAnswer: 0,
      explanation: "FIR filters have poles strictly at the origin (z=0), making them inherently stable.",
      category: "Digital Filters",
    },
    {
      question: "What algorithm reduces the computational complexity of computing an N-point Discrete Fourier Transform (DFT) from O(N^2) to O(N log N)?",
      options: ["Fast Fourier Transform (FFT)", "Levinson-Durbin Algorithm", "Goertzel Algorithm", "Viterbi Algorithm"],
      correctAnswer: 0,
      explanation: "The Cooley-Tukey FFT decomposes DFT calculation into O(N log N) butterfly operations.",
      category: "Spectral Analysis",
    },
  ],
};

// Subject mapping metadata
const SUBJECT_INFO = {
  cpe413: { code: "CPE413", title: "Software Engineering & Architecture" },
  elect3: { code: "ELECT3", title: "Mobile Computing & Android" },
  engwork: { code: "ENGWORK", title: "Occupational Safety & Health (OSH)" },
  cpe411: { code: "CPE411", title: "CPE Practice & Design 2" },
  cpe416: { code: "CPE416", title: "Computer Architecture & Pipelining" },
  cpe415: { code: "CPE415", title: "Digital Systems Design & Verilog" },
  cpe414: { code: "CPE414", title: "Digital Signal Processing (DSP)" },
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
    // Specific subject rapid questions
    const questions = RAPID_BATTLE_QUESTIONS[subjectId] || [];
    const meta = SUBJECT_INFO[subjectId] || { code: subjectId.toUpperCase(), title: subjectId.toUpperCase() };
    questions.forEach((q, idx) => {
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
          // Extract only the direct question line, skipping any long scenario blocks!
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
    // Preserve option mapping while randomizing positions
    const rawOpts = q.options.map((opt, i) => ({ text: opt, isCorrect: i === q.correctAnswer }));
    const shuffledOpts = shuffle(rawOpts, seed ? seed + idx : null);
    const newCorrectIdx = shuffledOpts.findIndex((o) => o.isCorrect);

    // Keep questions short & clean for 1v1 speed duels
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
