export const cpe413Data = {
  id: "cpe413",
  code: "CPE413",
  title: "Computer Architecture and Organization",
  description: "Computer Architecture vs. Organization, Instruction Set Architecture (ISA), Microarchitecture, 6 Generations of Computing, Von Neumann Stored-Program Concept, Memory Hierarchy, and 8 Engineering Constraints.",
  instructor: "Engr. Joel C. Ananias",
  room: "Room 106",
  schedule: "Tuesday, October 20, 2026 (4:00 PM - 5:00 PM)",
  proctor: "Ferlene Rubin / Layzon Briones",
  examFormat: {
    types: [
      "Scenario-Based Multiple Choice",
      "Architectural Trade-Off Analysis",
      "Datapath & Timing Diagnostics",
      "Hierarchy & Generation Matching"
    ],
    coverage: "Module 1: History, Overview of Computer Architecture, Tools, Standards, and Engineering Constraints (Engr. Joel C. Ananias)"
  },
  topics: [
    {
      unitId: "cpe413-u1",
      unitTitle: "Unit 1: Architecture vs. Organization & Basic Components",
      summary: "Conceptual design ('what') versus physical implementation ('how'), ISA, microarchitecture, and 5 basic computer components.",
      cards: [
        {
          id: "cpe413-c1",
          title: "Two Sides of the Same Machine: Architecture vs. Organization",
          category: "Fundamentals",
          badge: "Verbatim Slide",
          content: "Architecture is the 'what' — Organization is the 'how'.",
          keyPoints: [
            "**Computer Architecture ('The What'):**\n• The conceptual design and fundamental operational structure of a computer system.\n• Deals with the high-level design of hardware components and their interactions.\n• *Includes:* Instruction set (ISA), data types, addressing modes, and visible registers.",
            "**Computer Organization ('The How'):**\n• The operational structure and physical implementation of computer systems.\n• Focuses on how hardware components are connected and interact to execute instructions.\n• *Includes:* How circuits, control signals, memory interfaces, and physical hardware are actually wired together."
          ],
          examTrap: "Exam Question: 'Are visible registers part of Architecture or Organization?' Answer: Visible registers are part of ARCHITECTURE (visible to the assembly programmer). Hardware wiring, control signal generation, and ALU adder topologies are part of ORGANIZATION."
        },
        {
          id: "cpe413-c2",
          title: "Three Key Aspects: ISA, μ-ARCH, and MEM",
          category: "Architecture",
          badge: "Core Framework",
          content: "Three concepts that tie architecture and organization together:",
          keyPoints: [
            "1. **ISA (Instruction Set Architecture):** Defines the complete set of instructions the CPU can execute and how they are encoded into machine binary (programmer's contract).",
            "2. **μ-ARCH (Microarchitecture):** The physical implementation of the ISA — including CPU pipeline depth, register files, and parallel arithmetic units.",
            "3. **MEM (Memory Hierarchy):** The structural organization of different memory types to optimize access latency, bandwidth, and cost per bit."
          ]
        },
        {
          id: "cpe413-c3",
          title: "Five Basic System Components",
          category: "Hardware Components",
          badge: "5 Components",
          content: "The physical mechanisms required to implement a computerized input-process-output model:",
          keyPoints: [
            "1. **CPU (Central Processing Unit):** Fetches program instructions, performs arithmetic/logical operations, and coordinates data flow.",
            "2. **Memory (RAM):** Random Access Memory — holds currently running programs, operating system routines, and active data.",
            "3. **Storage:** Retains programs and data permanently, even when the system is powered off (non-volatile).",
            "4. **I/O Systems:** Connects the system to the outside world for input (converting data to digital) and output (converting digital data to human/machine usable forms).",
            "5. **Bus Systems:** Pathways carrying address, data, and control signals between components."
          ]
        }
      ]
    },
    {
      unitId: "cpe413-u2",
      unitTitle: "Unit 2: History & The Six Computing Generations",
      summary: "Evolution of computers from 1642 to modern AI, key historical milestones, and John von Neumann's stored-program architecture.",
      cards: [
        {
          id: "cpe413-c4",
          title: "The Six Generations of Computing",
          category: "History",
          badge: "Exact Generations",
          content: "Technological evolution of computer hardware across 6 distinct eras:",
          keyPoints: [
            "• **Generation 0 (1642–1945):** *Mechanical Computers* (gears, wheels, punch cards; Pascaline, Babbage Analytical Engine).",
            "• **Generation 1 (1945–1955):** *Vacuum Tubes* (massive, 150 kW power-hungry, high thermal dissipation, filament failure every few days; e.g. ENIAC).",
            "• **Generation 2 (1955–1965):** *Transistors* (smaller, solid-state semiconductor switches replacing vacuum tubes; faster, lower power, higher MTBF).",
            "• **Generation 3 (1965–1980):** *Integrated Circuits (ICs)* (multiple transistors etched on single silicon wafer; e.g. IBM System/360 introducing family software compatibility).",
            "• **Generation 4 (1980–?):** *Microprocessors* (entire CPU on a single silicon chip; VLSI personal computing; Intel 4004 onwards).",
            "• **Generation 5 (Present):** *Artificial Intelligence & Quantum* (neuromorphic chips, TPUs, non-Von Neumann architectures, quantum annealers)."
          ]
        },
        {
          id: "cpe413-c5",
          title: "Historical Milestones & Stored-Program Concept",
          category: "History",
          badge: "Milestones",
          content: "Pivotal achievements that shaped modern computing architecture:",
          keyPoints: [
            "**1642 - Pascal’s Calculator:** One of the first mechanical calculators, created by Blaise Pascal.",
            "**1837 - Babbage’s Analytical Engine:** Conceived by Charles Babbage; introduced the 'Store' (memory) and the 'Mill' (ALU/processor), laying modern blueprints.",
            "**1945 - ENIAC:** First general-purpose electronic digital computer, constructed using ~18,000 vacuum tubes.",
            "**1945 - Stored-Program Concept (John von Neumann):** Instructions are stored in memory ALONGSIDE data in the same address space. Central bedrock of the Von Neumann Architecture!",
            "**1964 - IBM System/360:** First family of software-compatible computers spanning multiple price/performance tiers using ICs.",
            "**1971 - Intel 4004:** First commercially available single-chip microprocessor (4-bit, 2300 transistors)."
          ]
        }
      ]
    },
    {
      unitId: "cpe413-u3",
      unitTitle: "Unit 3: CPU Datapath, Memory Hierarchy & 8 Constraints",
      summary: "Fetch-decode-execute cycle, 5 levels of the memory hierarchy, and 8 engineering constraints in processor design.",
      cards: [
        {
          id: "cpe413-c6",
          title: "Inside the CPU: Datapath, Cycles & Parallelism",
          category: "CPU Architecture",
          badge: "Datapath",
          content: "The operational machinery of the central processor:",
          keyPoints: [
            "**CPU Structure:** Arithmetic & Logic Unit (ALU), Control Unit (CU), and Registers connected via internal datapath buses.",
            "**Instruction Execution Cycle:** Every instruction runs through the continuous **Fetch–Decode–Execute** cycle.",
            "**RISC vs. CISC:**\n• *RISC (Reduced Instruction Set Computer):* Simple, single-cycle, uniform fixed-length instructions, load/store architecture, hardwired CU.\n• *CISC (Complex Instruction Set Computer):* Rich instruction set with variable lengths performing multi-step operations directly in memory, microcode CU.",
            "**Parallelism Types:**\n• *Instruction-Level Parallelism (ILP):* Simultaneous execution of sequential instructions (pipelining, superscalar execution). Hazards: Structural, Data (RAW, WAR, WAW), Control.\n• *Processor-Level Parallelism:* Multiple CPU cores executing separate threads or programs simultaneously (Symmetric Multiprocessing)."
          ]
        },
        {
          id: "cpe413-c7",
          title: "The 5-Level Memory Hierarchy & Locality",
          category: "Memory",
          badge: "Hierarchy Pyramid",
          content: "Organized based on the principle of Locality of Reference to minimize CPU access latency while maximizing storage capacity at minimum cost:",
          keyPoints: [
            "• **Level 0 — CPU Registers:** Fastest speed (< 1ns), lowest latency, smallest capacity, highest cost per bit.",
            "• **Level 1 — Cache Memory (SRAM):** Very fast (1-3ns), 6T latch cells (no refresh), on/near CPU die.",
            "• **Level 2 — Main Memory (DRAM):** Fast (50-70ns), 1T-1C cells, volatile (requires periodic refresh), medium capacity.",
            "• **Level 3 — Magnetic Disk (HDD) / Flash (SSD):** Non-volatile secondary storage (IDE, SCSI, RAID, NVMe).",
            "• **Level 4 — Optical Disk / Magnetic Tape:** Slowest access speed, massive archive capacity, lowest cost per bit (CD, DVD, Blu-Ray, Tape).",
            "**Locality of Reference:**\n• *Temporal Locality:* Recently accessed memory locations are likely to be accessed again soon.\n• *Spatial Locality:* Locations adjacent to recently accessed addresses are likely to be accessed soon."
          ]
        },
        {
          id: "cpe413-c8",
          title: "Bus Systems, Endianness & Error Detection",
          category: "Bus & Data Formats",
          badge: "Hardware Interfaces",
          content: "Physical pathways, data representation, and data integrity mechanisms:",
          keyPoints: [
            "**Bus Types:**\n• *Address Bus:* Unidirectional; width determines max addressable memory ($2^{\\text{width}}$ bytes; 32-bit = 4 GB).\n• *Data Bus:* Bidirectional; width determines word transfer size per bus cycle.\n• *Control Bus:* Directs operational timing and command signals (Read/Write, Clock, Interrupt, Bus Request/Grant arbitration).",
            "**Endianness (Byte Ordering):**\n• *Big-Endian:* Most Significant Byte (MSB) stored at lowest memory address (TCP/IP Network Byte Order).\n• *Little-Endian:* Least Significant Byte (LSB) stored at lowest memory address (x86 architecture).",
            "**Parity vs. ECC (Error-Correcting Code):**\n• *Parity:* Single extra bit detects odd-bit errors, but cannot pinpoint bit position or correct data.\n• *SECDED ECC (Hamming Code):* Automatically detects and corrects single-bit memory flips and detects double-bit errors."
          ]
        },
        {
          id: "cpe413-c9",
          title: "The 8 Engineering Constraints in Architecture Design",
          category: "Engineering Constraints",
          badge: "Verbatim Slide Enumeration",
          content: "Architecture is engineering design under real-world constraints. Eight factors that govern every CPU design decision:",
          keyPoints: [
            "1. **Functionality:** Does the design work and meet user needs (usability, satisfaction, efficiency, effectiveness)?",
            "2. **Cost:** Resources needed to conceive, design, produce, package, and maintain the product.",
            "3. **Performance:** Coordination of conditions producing desired results (IPC, clock frequency, throughput, latency, quality).",
            "4. **Size:** Physical die area and silicon footprint of the system solution.",
            "5. **Power & Energy:** Energy required to operate ($P = C \\cdot V^2 \\cdot f$) — traded off against thermal dissipation and battery life.",
            "6. **Time to Market:** Time from initial concept to commercial release / first unit sold.",
            "7. **Maintainability:** Probability that a failed component can be diagnosed, repaired, or updated within specified time (MTTR/MTBF).",
            "8. **Safety:** Embedding operational safety, fault-tolerance, watchdog timers, and fail-safe logic from the earliest architectural phase."
          ]
        }
      ]
    }
  ],
  flashcards: [
    {
      id: "cpe413-fc1",
      question: "What is the core distinction between Computer Architecture and Computer Organization?",
      answer: "Architecture is the 'what' (conceptual design, visible registers, ISA, data types, addressing modes). Organization is the 'how' (circuits, control signals, physical wiring, and memory buses).",
      category: "Architecture vs Organization"
    },
    {
      id: "cpe413-fc2",
      question: "Are user-visible registers part of Computer Architecture or Computer Organization?",
      answer: "Computer Architecture! Visible registers are part of the programmer's conceptual model, whereas internal non-visible registers and wiring belong to Organization.",
      category: "Architecture vs Organization"
    },
    {
      id: "cpe413-fc3",
      question: "What are the three key aspects that tie architecture and organization together?",
      answer: "1. ISA (Instruction Set Architecture): Defines instructions and encoding.\n2. μ-ARCH (Microarchitecture): Implementation of the ISA (pipeline, ALU, datapath).\n3. MEM (Memory Hierarchy): Structure optimizing access time, bandwidth, and cost.",
      category: "Architecture Framework"
    },
    {
      id: "cpe413-fc4",
      question: "What are the five basic components of a computer system?",
      answer: "1. CPU (executes instructions)\n2. Memory / RAM (holds active programs/data)\n3. Storage (permanent non-volatile retention)\n4. I/O Systems (connects to outside world)\n5. Bus Systems (carries address, data, and control signals)",
      category: "Basic Components"
    },
    {
      id: "cpe413-fc5",
      question: "What are the three individual buses that constitute the system bus?",
      answer: "1. Address Bus (transmits target memory/device locations)\n2. Data Bus (bidirectional transfer of information)\n3. Control Bus (coordinates timing and command signals like read/write)",
      category: "Buses"
    },
    {
      id: "cpe413-fc6",
      question: "What are the 6 generations of computing hardware and their date ranges?",
      answer: "• Gen 0: Mechanical Computers (1642–1945)\n• Gen 1: Vacuum Tubes (1945–1955)\n• Gen 2: Transistors (1955–1965)\n• Gen 3: Integrated Circuits (1965–1980)\n• Gen 4: Microprocessors (1980–?)\n• Gen 5: Artificial Intelligence & Quantum (Present)",
      category: "Generations"
    },
    {
      id: "cpe413-fc7",
      question: "Who invented the mechanical calculator in 1642?",
      answer: "Blaise Pascal (Pascal's Calculator or Pascaline).",
      category: "History"
    },
    {
      id: "cpe413-fc8",
      question: "What was Charles Babbage's 1837 contribution to computer history?",
      answer: "The Analytical Engine, which laid the foundational concepts of modern programmable computing with the 'Store' (memory) and 'Mill' (ALU).",
      category: "History"
    },
    {
      id: "cpe413-fc9",
      question: "What was the significance of ENIAC in 1945?",
      answer: "It was the first general-purpose electronic digital computer, constructed using approximately 18,000 vacuum tubes.",
      category: "History"
    },
    {
      id: "cpe413-fc10",
      question: "What was John von Neumann's revolutionary 'Stored-Program Concept' (1945)?",
      answer: "The architectural principle that program instructions and data are stored together in the same read-write memory address space.",
      category: "History"
    },
    {
      id: "cpe413-fc11",
      question: "What historical significance did the IBM System/360 (1964) represent?",
      answer: "It was the first family of computers sharing a common architecture across multiple price/performance tiers using Integrated Circuits.",
      category: "History"
    },
    {
      id: "cpe413-fc12",
      question: "What was the Intel 4004 (1971)?",
      answer: "The world's first commercially available single-chip microprocessor, paving the way for personal computers.",
      category: "History"
    },
    {
      id: "cpe413-fc13",
      question: "What is the three-step cycle that the CPU performs for every instruction?",
      answer: "The Fetch–Decode–Execute cycle.",
      category: "CPU Datapath"
    },
    {
      id: "cpe413-fc14",
      question: "Distinguish between the ALU and the Control Unit (CU) inside the CPU.",
      answer: "• ALU (Arithmetic & Logic Unit): Performs mathematical computations (+, -, *, /) and logical evaluations (AND, OR, NOT).\n• CU (Control Unit): Controls sequential instruction execution and coordinates the flow of data across the datapath.",
      category: "CPU Datapath"
    },
    {
      id: "cpe413-fc15",
      question: "What is the difference between RISC and CISC architectures?",
      answer: "• RISC (Reduced Instruction Set Computer): Small set of simple, uniform, single-cycle instructions with load-store architecture.\n• CISC (Complex Instruction Set Computer): Broad set of complex, multi-cycle instructions that can perform memory operations directly.",
      category: "ISA Architecture"
    },
    {
      id: "cpe413-fc16",
      question: "Distinguish Instruction-Level Parallelism (ILP) from Processor-Level Parallelism.",
      answer: "• ILP: Overlapping or parallel execution of individual instructions within a single instruction stream (pipelining, superscalar).\n• Processor-Level: Multiple CPU cores/processors executing different threads or independent processes simultaneously.",
      category: "Parallelism"
    },
    {
      id: "cpe413-fc17",
      question: "What are the 5 levels of the Memory Hierarchy from Level 0 to Level 4?",
      answer: "• Level 0: CPU Registers (Fastest, lowest capacity, highest cost)\n• Level 1: Cache Memory (SRAM)\n• Level 2: Main Memory (DRAM)\n• Level 3: Magnetic Disk (HDD) / Flash (SSD)\n• Level 4: Optical Disk / Magnetic Tape (Slowest, highest capacity, lowest cost)",
      category: "Memory Hierarchy"
    },
    {
      id: "cpe413-fc18",
      question: "What fundamental principle justifies the design of the memory hierarchy?",
      answer: "Locality of Reference (Temporal Locality: recently accessed items are likely to be accessed again; Spatial Locality: adjacent items are likely to be accessed soon).",
      category: "Memory Hierarchy"
    },
    {
      id: "cpe413-fc19",
      question: "What is 'Byte Ordering' (Endianness) in primary memory?",
      answer: "The order in which bytes within a multi-byte word are stored in memory. Big-Endian stores the most significant byte at the lowest address; Little-Endian stores the least significant byte at the lowest address.",
      category: "Memory"
    },
    {
      id: "cpe413-fc20",
      question: "What are the four categories of secondary storage listed in the lecture?",
      answer: "1. Magnetic Storage (HDD, Floppy, IDE, SCSI, RAID)\n2. Optical Storage (CD-ROM, DVD, Blu-Ray)\n3. Flash Storage (USB Flash Drive, SSD)\n4. Cloud Storage (Dropbox, Google Drive, OneDrive, iCloud, Box)",
      category: "Storage"
    },
    {
      id: "cpe413-fc21",
      question: "What are the four essential components required to implement a computerized input-process-output model?",
      answer: "1. Computer Hardware (physical mechanisms)\n2. Computer Software (system and application programs)\n3. Data (information represented in digital form)\n4. Communication Component (networks transporting data)",
      category: "System Model"
    },
    {
      id: "cpe413-fc22",
      question: "What are the 8 engineering design constraints that govern computer architecture decisions?",
      answer: "1. Functionality\n2. Cost\n3. Performance\n4. Size\n5. Power & Energy\n6. Time to Market\n7. Maintainability\n8. Safety",
      category: "Engineering Constraints"
    },
    {
      id: "cpe413-fc23",
      question: "How is the 'Maintainability' engineering constraint defined in computer design?",
      answer: "The probability that a failed component or system can be diagnosed and restored to operational service within a specified period of time.",
      category: "Engineering Constraints"
    },
    {
      id: "cpe413-fc24",
      question: "How is the 'Time to Market' constraint defined in computer architecture?",
      answer: "The total elapsed duration from initial architectural conception until the commercial release or sale of the first production unit.",
      category: "Engineering Constraints"
    },
    {
      id: "cpe413-fc25",
      question: "Why is SRAM used for Level 1 Cache while DRAM is used for Level 2 Main Memory?",
      answer: "SRAM (flip-flop based) does not need periodic electrical refresh, making it much faster but physically larger and more costly. DRAM (capacitor based) is denser and cheaper but requires continuous refreshing.",
      category: "Memory Hierarchy"
    },
    {
      id: "cpe413-fc26",
      question: "What is the primary trade-off regarding the 'Power & Energy' constraint in mobile and embedded processor design?",
      answer: "Power/energy consumption must be balanced against clock speed, performance throughput, thermal dissipation limits, and battery life.",
      category: "Engineering Constraints"
    }
  ],
  mockQuestions: [
    {
      id: "cpe413-mq1",
      question: "An embedded systems engineer is running the same compiled x86 binary on both an Intel Core i7 processor and an AMD Ryzen processor. Both chips execute the machine code identically, but the internal instruction pipelines, ALU adder circuits, branch prediction topologies, and cache hierarchy latencies are vastly different.\n\nWhich architectural principle explains why the software runs identically despite these hardware differences?",
      options: [
        "The chips share the same Computer Organization but differ in Computer Architecture",
        "The chips share the same Computer Architecture (ISA) but differ in Computer Organization (Microarchitecture)",
        "The chips bypass the ISA and rely solely on Level 0 register hardware emulation",
        "Both processors share an identical physical microarchitecture layout defined by Generation 3 standards"
      ],
      correctAnswer: 1,
      explanation: "**Engineering Analysis:**\n• **Computer Architecture (ISA):** The conceptual contract visible to the programmer/compiler (instruction set, data types, visible registers, addressing modes). Both CPUs implement the x86-64 ISA, guaranteeing binary execution compatibility.\n• **Computer Organization (μ-ARCH):** The underlying physical hardware realization (wiring, pipeline depth, circuit topology, control signal timing). AMD and Intel implement completely different microarchitectures to execute the same ISA.\n• *Why other options fail:* Option A reverses the definitions. Option C is false because CPUs execute ISA directly. Option D is incorrect because AMD and Intel proprietary microarchitectures are physically distinct.",
      category: "Architecture vs Organization"
    },
    {
      id: "cpe413-mq2",
      question: "A high-performance computing simulation on a single-core CPU spends over 70% of its execution cycles stalled waiting for data and instruction transfers over a single shared system bus connecting the processor to DRAM. Even when the CPU clock is boosted from 3.0 GHz to 4.5 GHz, the application's overall completion time barely improves.\n\nWhat architectural phenomenon does this scenario illustrate, and what fundamental architectural concept causes it?",
      options: [
        "The Von Neumann Bottleneck, caused by instructions and data sharing the same physical bus and memory address space",
        "A Harvard Architecture hazard, caused by separate instruction and data caches",
        "Instruction-Level Parallelism starvation caused by RISC load-store overhead",
        "A Generation 2 transistor saturation breakdown caused by dynamic power dissipation"
      ],
      correctAnswer: 0,
      explanation: "**Engineering Analysis:**\n• The **Von Neumann Bottleneck** occurs because CPU execution speed scales much faster than memory bus throughput. In a classical Von Neumann architecture, both program instructions and data must traverse the same shared physical memory bus, choking the processor.\n• *Harvard Architecture* mitigates this by utilizing physically separate memory buses for instructions and data, allowing simultaneous fetch and operand read.\n• *Why other options fail:* Option B contradicts the prompt (Harvard uses separate buses, which eliminates this shared contention). Option C confuses bus saturation with pipeline stalls. Option D cites an irrelevant semiconductor physics term.",
      category: "Von Neumann Architecture"
    },
    {
      id: "cpe413-mq3",
      question: "A programmer benchmarks two C algorithms that iterate over a 2048 x 2048 matrix of 32-bit integers. Algorithm A traverses row-by-row (`matrix[row][col]`), finishing in 4.2 milliseconds. Algorithm B traverses column-by-column (`matrix[col][row]`), finishing in 68.5 milliseconds—over 16 times slower!\n\nGiven that C stores multidimensional arrays in contiguous memory using row-major order, which memory hierarchy principle explains this performance disparity?",
      options: [
        "Algorithm A maximizes Temporal Locality by repeatedly reading the exact same memory word",
        "Algorithm A maximizes Spatial Locality, allowing adjacent elements in a cache line to produce cache hits",
        "Algorithm B suffers from Instruction-Level Parallelism stalls in the Arithmetic Logic Unit",
        "Algorithm B forces the CPU to switch from SRAM Level 1 cache directly to Level 4 Magnetic Tape"
      ],
      correctAnswer: 1,
      explanation: "**Engineering Analysis:**\n• **Spatial Locality:** When a memory location is accessed, nearby memory locations are likely to be accessed soon. In row-major order, row elements reside in contiguous memory bytes. When `matrix[0][0]` is loaded, the entire 64-byte cache line containing the next 15 integers is brought into Level 1 SRAM cache, resulting in 15 consecutive cache hits.\n• In column-major traversal, every subsequent element is 2048 words (8 KB) away, exceeding cache line boundaries and triggering an expensive Level 2 DRAM cache miss on almost every access.\n• *Why other options fail:* Temporal locality refers to reusing the *same* address over time. ALU pipelining and Level 4 tape are completely irrelevant to CPU cache line misses.",
      category: "Memory Hierarchy"
    },
    {
      id: "cpe413-mq4",
      question: "An embedded systems telemetry sensor running on an x86 microcontroller (Little-Endian) reads a 32-bit unsigned integer hexadecimal value `0xA1B2C3D4`. The device must transmit this value over an industrial Ethernet network using TCP/IP, which mandates Network Byte Order (Big-Endian).\n\nIf the data is placed into a byte array starting at base memory address `0x2000`, what byte must be stored at address `0x2000` to conform to Big-Endian Network Byte Order?",
      options: [
        "`0xD4`",
        "`0xA1`",
        "`0xB2`",
        "`0xC3`"
      ],
      correctAnswer: 1,
      explanation: "**Engineering Analysis:**\n• **Big-Endian Ordering:** The Most Significant Byte (MSB) is stored at the lowest (initial) memory address.\n• In the 32-bit hex word `0xA1B2C3D4`:\n  - Byte 3 (MSB) = `0xA1`\n  - Byte 2 = `0xB2`\n  - Byte 1 = `0xC3`\n  - Byte 0 (LSB) = `0xD4`\n• Under Big-Endian: Address `0x2000` = `0xA1`, `0x2001` = `0xB2`, `0x2002` = `0xC3`, `0x2003` = `0xD4`.\n• *Little-Endian (x86 default)* would store `0xD4` at `0x2000`. Therefore, network transmission requires converting to Big-Endian where `0xA1` resides at the first address.",
      category: "Byte Ordering & Endianness"
    },
    {
      id: "cpe413-mq5",
      question: "A design team is engineering an ultra-low-power biomedical pacemaker SoC that must operate continuously for 10 years on an internal battery. The CMOS processor's dynamic power dissipation is governed by the formula:\n$$P = C \\cdot V^2 \\cdot f$$\n\nIf the team implements Dynamic Voltage and Frequency Scaling (DVFS), halving the clock frequency ($f_2 = 0.5 f_1$) and reducing the supply voltage from 1.2V to 0.6V ($V_2 = 0.5 V_1$), by what factor is the dynamic power consumption reduced, and which of the 8 design constraints governed this optimization?",
      options: [
        "Reduced by a factor of 4; Maintainability constraint",
        "Reduced by a factor of 8; Power and Energy constraint",
        "Reduced by a factor of 2; Size constraint",
        "Reduced by a factor of 16; Time to Market constraint"
      ],
      correctAnswer: 1,
      explanation: "**Engineering Calculation & Rationale:**\n• Dynamic power formula: $P = C \\cdot V^2 \\cdot f$.\n• $P_2 = C \\cdot (0.5 V_1)^2 \\cdot (0.5 f_1) = C \\cdot (0.25 V_1^2) \\cdot (0.5 f_1) = 0.125 \\cdot P_1$.\n• $1 / 0.125 = 8$. The power consumption drops by a factor of 8 (87.5% reduction)!\n• The constraint is explicitly **Power & Energy**, which directly determines battery longevity in embedded/biomedical hardware.\n• *Why other options fail:* Linear scaling assumptions miss the quadratic relationship with voltage ($V^2$), and the other constraints (Maintainability, Size, Time to Market) do not dictate battery operational physics.",
      category: "Engineering Constraints"
    },
    {
      id: "cpe413-mq6",
      question: "A telecommunications data center deploys high-availability edge routers. The hardware specifications mandate that if a redundant power supply or network interface card fails, a field technician must be able to diagnose the failure via automated LED indicators and hot-swap the module in under 3 minutes without interrupting router uptime.\n\nAccording to Module 1, which of the 8 engineering design constraints does this specification directly optimize?",
      options: [
        "Time to Market",
        "Maintainability",
        "Performance",
        "Functionality"
      ],
      correctAnswer: 1,
      explanation: "**Engineering Definition:**\n• **Maintainability:** Defined in Module 1 as 'the probability that a failed component or system can be diagnosed, repaired, or updated within a specified period of time.' Hot-swappable modules and rapid diagnostic indicators directly reduce Mean Time To Repair (MTTR).\n• *Why other options fail:* Time to Market measures time from concept to first commercial sale. Performance measures IPC/throughput. Functionality determines whether baseline operational requirements are met.",
      category: "Engineering Constraints"
    },
    {
      id: "cpe413-mq7",
      question: "A junior hardware engineer proposes upgrading an industrial robotic controller from 4 GB of RAM to 16 GB of DDR4 RAM to prevent out-of-memory buffer overruns. However, the existing microprocessor architecture features a 32-bit physical Address Bus ($A_0 - A_{31}$).\n\nWhy will the senior computer architect immediately reject this proposal without additional banking or paging hardware?",
      options: [
        "A 32-bit address bus can directly reference at most $2^{32}$ discrete bytes (4,294,967,296 bytes = 4 GB)",
        "The control bus cannot assert Read and Write signals on memory modules larger than 2 GB",
        "A 32-bit data bus cannot transfer 64-bit floating point instructions from Level 2 DRAM",
        "DDR4 RAM requires an optical storage interface that is incompatible with Generation 4 microprocessors"
      ],
      correctAnswer: 0,
      explanation: "**Architectural Physics:**\n• The width of the **Address Bus** dictates the maximum physical address space: Maximum Addresses $= 2^n$, where $n$ is the number of address lines.\n• For a 32-bit address bus: $2^{32} = 4,294,967,296$ memory addresses. Assuming standard byte-addressable memory (1 address = 1 byte), the physical ceiling is exactly 4 GB.\n• Any memory installed beyond 4 GB is unreachable because the CPU lacks the physical address pins to generate addresses $> \\text{0xFFFFFFFF}$.\n• *Why other options fail:* Control bus R/W lines are independent of memory size. Data bus width affects transfer chunk size, not total addressable space.",
      category: "Bus Systems"
    },
    {
      id: "cpe413-mq8",
      question: "During the instruction execution cycle of a Von Neumann CPU, the Program Counter (PC) currently holds the memory address `0x0080`. The CPU initiates the **Fetch Stage**.\n\nWhich of the following represents the exact, correct micro-operation sequence across internal registers before instruction decoding begins?",
      options: [
        "1. IR $\\leftarrow$ PC; 2. ALU executes opcode; 3. PC $\\leftarrow$ PC + 4; 4. MAR $\\leftarrow$ IR",
        "1. MDR $\\leftarrow$ PC; 2. MAR $\\leftarrow$ Memory; 3. IR $\\leftarrow$ MDR; 4. PC $\\leftarrow$ PC + 1",
        "1. MAR $\\leftarrow$ PC; 2. Memory Read into MDR; 3. PC $\\leftarrow$ PC + 4; 4. IR $\\leftarrow$ MDR",
        "1. Control Unit $\\leftarrow$ PC; 2. ALU $\\leftarrow$ MAR; 3. MDR $\\leftarrow$ IR; 4. Memory Write"
      ],
      correctAnswer: 2,
      explanation: "**Detailed Datapath Micro-Operations:**\n1. **MAR $\\leftarrow$ PC:** The address of the next instruction stored in the Program Counter is loaded into the Memory Address Register (MAR).\n2. **Memory Read $\\rightarrow$ MDR:** The Control Unit asserts the read signal on the bus; the instruction machine code at that address is retrieved from memory and placed into the Memory Data Register (MDR / MBR).\n3. **PC $\\leftarrow$ PC + 4:** The Program Counter is incremented to point to the next instruction in sequence.\n4. **IR $\\leftarrow$ MDR:** The fetched instruction is copied from MDR to the Instruction Register (IR), ready for the Decode Stage.",
      category: "CPU Datapath"
    },
    {
      id: "cpe413-mq9",
      question: "A defense avionics system requires deterministic, hardwired instruction decoding with single-cycle execution for mission-critical flight stability. The architects select a RISC (Reduced Instruction Set Computer) architecture over CISC.\n\nWhat microarchitectural characteristic justifies this choice, and what trade-off must the software engineering team accept?",
      options: [
        "RISC uses microcode ROM to execute multi-cycle complex instructions; trade-off is reduced pipeline throughput",
        "RISC uses a load/store model with hardwired control logic for uniform single-cycle execution; trade-off is larger binary code size",
        "RISC allows arithmetic operations directly on DRAM operands; trade-off is excessive register spill",
        "RISC eliminates the Program Counter; trade-off is inability to execute conditional branches"
      ],
      correctAnswer: 1,
      explanation: "**RISC vs CISC Engineering Trade-offs:**\n• **RISC Characteristics:** Simple, uniform fixed-length instructions, load/store architecture (only `LOAD` and `STORE` access memory; arithmetic operates strictly between registers), and hardwired control logic that executes most instructions in a single clock cycle.\n• **The Trade-Off:** Because complex operations (like polynomial evaluation or direct memory arithmetic) cannot be done in a single instruction, compilers must emit sequences of simple instructions, resulting in lower code density and larger compiled binary sizes.\n• *Why other options fail:* CISC uses microcode ROM, not RISC. CISC allows memory-operand arithmetic, not RISC. Eliminating the PC is nonsensical.",
      category: "ISA Architecture"
    },
    {
      id: "cpe413-mq10",
      question: "Prior to 1964, upgrading an enterprise computing system meant completely discarding existing software, retraining programmers, and rewriting programs from scratch because every computer model had distinct instruction sets and wiring.\n\nIn 1964, IBM introduced the **System/360** (Generation 3, Integrated Circuits). What monumental computer architecture paradigm did the System/360 introduce?",
      options: [
        "The concept of a computer family sharing a common Instruction Set Architecture (ISA) across different performance and price tiers",
        "The first single-chip microprocessor containing an ALU and registers on one silicon die",
        "The elimination of operating systems in favor of direct vacuum tube arithmetic logic",
        "The invention of the Stored-Program concept and the separation of RAM from magnetic tape"
      ],
      correctAnswer: 0,
      explanation: "**Historical Milestone Analysis:**\n• In 1964, IBM revolutionized computing with the **System/360** family. For the first time, an enterprise could buy a small, inexpensive Model 30 and later upgrade to a high-performance Model 75, running the exact same binary software without recompilation.\n• This introduced the concept of decoupling **Architecture (ISA)** from **Organization (Microarchitecture)**.\n• *Why other options fail:* The single-chip microprocessor was the Intel 4004 (1971, Gen 4). Stored-program concept was John von Neumann (1945). System/360 pioneered advanced operating systems (OS/360).",
      category: "History & Milestones"
    },
    {
      id: "cpe413-mq11",
      question: "A microprocessor memory subsystem has the following performance metrics:\n• Level 1 Cache Access Time: 2 nanoseconds\n• Level 2 DRAM Main Memory Access Time: 80 nanoseconds\n• Level 1 Cache Hit Rate: 90% (Miss Rate = 10%)\n\nWhat is the Average Memory Access Time (AMAT) of this system, and what memory hierarchy principle does it demonstrate?",
      options: [
        "AMAT = 8.2 ns; Locality of reference allows fast cache to mask the high latency of main memory",
        "AMAT = 10.0 ns; Locality of reference eliminates the need for Level 0 CPU registers",
        "AMAT = 74.0 ns; Cache hierarchy increases latency compared to direct DRAM access",
        "AMAT = 2.0 ns; Cache hits completely prevent DRAM refresh cycles"
      ],
      correctAnswer: 1,
      explanation: "**Calculation & Principle:**\n• Formula: $\\text{AMAT} = \\text{Hit Time}_{L1} + (\\text{Miss Rate}_{L1} \\times \\text{Miss Penalty}_{L2})$\n• $\\text{AMAT} = 2\\text{ ns} + (0.10 \\times 80\\text{ ns}) = 2\\text{ ns} + 8\\text{ ns} = 10.0\\text{ ns}$.\n• Despite DRAM taking 80 ns, the 90% hit rate keeps average memory access down to only 10 ns!\n• This quantitatively validates the **Memory Hierarchy**: small, fast SRAM caches exploit locality of reference to provide high average speed at low cost per bit.",
      category: "Memory Hierarchy"
    },
    {
      id: "cpe413-mq12",
      question: "In an enterprise financial server, ionizing cosmic radiation causes an electrical charge in a DRAM capacitor to leak, flipping a single bit from `0` to `1` in a stored bank transaction balance.\n\nCompare how a system using **Parity Checking** versus a system using **SECDED ECC (Error-Correcting Code)** responds to this single-bit event:",
      options: [
        "Parity detects the error and automatically corrects it; ECC triggers a hardware kernel panic",
        "Parity detects the odd bit flip but cannot correct it (halting system); SECDED ECC detects and automatically corrects the single-bit flip on-the-fly",
        "Both systems ignore single-bit flips and only trigger on double-bit parity errors",
        "Parity encrypts the flipped bit; SECDED ECC flushes Level 1 cache to secondary tape storage"
      ],
      correctAnswer: 1,
      explanation: "**Data Integrity Mechanisms:**\n• **Parity Checking:** Appends a single parity bit (even or odd). It detects single-bit errors (because parity flips), but cannot identify *which* bit flipped, so it cannot correct the error. The system must trigger an unrecoverable parity check error (blue screen / kernel panic).\n• **SECDED ECC (Single Error Correction, Double Error Detection):** Uses Hamming code check bits. It identifies the exact bit position of a single-bit flip and mathematically corrects it in hardware without interrupting execution, while alerting administrators.",
      category: "Memory & Data Integrity"
    },
    {
      id: "cpe413-mq13",
      question: "Consider a classic 5-stage RISC instruction pipeline: Fetch (IF), Decode (ID), Execute (EX), Memory (MEM), and Write-Back (WB). The processor executes the following two sequential instructions:\n1. `ADD R1, R2, R3`  (R1 = R2 + R3; written back to register in WB stage)\n2. `SUB R4, R1, R5`  (R4 = R1 - R5; reads R1 in ID stage)\n\nIf the hardware pipeline has NO data forwarding (bypassing) circuitry, what type of pipeline hazard occurs, and how many clock cycle stalls (bubbles) must the control unit insert?",
      options: [
        "Read-After-Write (RAW) Data Hazard; requires 2 stall cycles until R1 is written in WB stage",
        "Write-After-Read (WAR) Structural Hazard; requires 4 stall cycles to reload Level 1 cache",
        "Control Branch Hazard; requires flushing all 5 stages of the pipeline",
        "Bus Contention Hazard; requires switching execution to Level 3 Magnetic Storage"
      ],
      correctAnswer: 0,
      explanation: "**Pipeline Hazard Analysis:**\n• **RAW (Read-After-Write) Hazard:** Instruction 2 needs the operand `R1` in its ID stage (Cycle 3), but Instruction 1 does not write the computed value of `R1` into the register file until its WB stage (Cycle 5).\n• Without forwarding, the pipeline must stall for **2 clock cycles** (cycles 3 and 4) so that `SUB` does not read stale data from `R1`.\n• *Why other options fail:* WAR hazard is impossible in simple in-order pipelines. There is no branch instruction (eliminating control hazards). Magnetic storage is secondary storage, completely unrelated to CPU pipelines.",
      category: "Instruction-Level Parallelism"
    },
    {
      id: "cpe413-mq14",
      question: "A tech startup is designing an AI smart-ring wearable. The engineering team can either:\n1. Design a custom neuromorphic silicon ASIC (taking 18 months to tape out, but delivering 40% higher efficiency), OR\n2. Integrate an off-the-shelf ARM Cortex-M0+ SoC (ready in 3 months, hitting the Q4 holiday sales window before competitors launch).\n\nThe CEO mandates Option 2. Which of the 8 engineering design constraints from Module 1 was the decisive factor?",
      options: [
        "Performance",
        "Time to Market",
        "Maintainability",
        "Safety"
      ],
      correctAnswer: 1,
      explanation: "**Engineering Constraint Analysis:**\n• **Time to Market:** Explicitly defined in Module 1 as 'the elapsed time from initial product concept formulation to the commercial release or sale of the first unit.'\n• Missing a critical commercial market window (like the holiday season or beating a competitor) can bankrupt a product regardless of superior performance. Option 2 prioritized Time to Market over peak architectural efficiency.",
      category: "Engineering Constraints"
    },
    {
      id: "cpe413-mq15",
      question: "In 1837, Charles Babbage formulated the blueprint for the **Analytical Engine**. His design separated computing into two mechanical sections: the **'Store'** and the **'Mill'**.\n\nIn modern computer architecture, what do Babbage's 'Store' and 'Mill' correspond to, respectively?",
      options: [
        "Store = Memory (RAM / Registers); Mill = Central Processing Unit (ALU / Datapath)",
        "Store = Hard Disk Drive; Mill = Optical Disc Reader",
        "Store = System Bus; Mill = Operating System Kernel",
        "Store = Instruction Register; Mill = Power Supply Unit"
      ],
      correctAnswer: 0,
      explanation: "**Historical Blueprint Mapping:**\n• **The Store:** Babbage's mechanical storage where numbers and intermediate quantities were held on columns of geared wheels $\\rightarrow$ corresponds directly to modern **Memory (RAM and Registers)**.\n• **The Mill:** The mechanical section that performed mathematical operations upon the numbers retrieved from the Store $\\rightarrow$ corresponds directly to the modern **Central Processing Unit / Arithmetic Logic Unit (ALU)**.",
      category: "History & Milestones"
    },
    {
      id: "cpe413-mq16",
      question: "The ENIAC computer (1945, Generation 1) occupied 1,800 square feet, utilized 17,468 vacuum tubes, consumed 150 kW of electrical power, and suffered tube burnouts approximately every two days, requiring hours of manual tracing.\n\nWhat fundamental semiconductor advancement in **Generation 2 (1955–1965)** overcame these critical physical limitations?",
      options: [
        "The invention of the single-chip microprocessor (Intel 4004)",
        "The replacement of fragile, hot incandescent vacuum tubes with solid-state semiconductor transistors",
        "The introduction of optical laser storage (CD-ROM)",
        "The creation of quantum superconducting qubits"
      ],
      correctAnswer: 1,
      explanation: "**Generational Evolution:**\n• **Generation 1 (1945–1955):** Characterized by vacuum tubes, which relied on heated physical filaments. They generated massive heat, consumed tremendous wattage, and had high failure rates (low MTBF).\n• **Generation 2 (1955–1965):** Introduced solid-state **Transistors** (invented at Bell Labs). Transistors required no filament heating, consumed a fraction of the power, were physically microscopic in comparison, and operated with vastly superior reliability.",
      category: "Generations of Computing"
    },
    {
      id: "cpe413-mq17",
      question: "A high-end CAD rendering workstation is equipped with an AMD Threadripper processor featuring 64 physical cores. During rendering, 64 distinct execution threads concurrently process different raster tiles while accessing the same 128 GB pool of shared DDR5 RAM through a unified memory bus.\n\nWhich classification of parallelism does this workstation architecture exhibit?",
      options: [
        "Instruction-Level Parallelism (ILP)",
        "Processor-Level Parallelism (Symmetric Multiprocessing)",
        "Microcode Emulation Parallelism",
        "Single-Cycle Stored-Program Parallelism"
      ],
      correctAnswer: 1,
      explanation: "**Parallelism Taxonomy:**\n• **Processor-Level Parallelism:** Multiple discrete CPU cores or physical processors executing independent threads or processes concurrently, typically sharing memory in a Symmetric Multiprocessing (SMP) configuration.\n• *Instruction-Level Parallelism (ILP):* Exploiting concurrency within a *single* sequential instruction stream (via pipelining, out-of-order execution, or superscalar issue).",
      category: "Parallelism"
    },
    {
      id: "cpe413-mq18",
      question: "When the CPU executes a memory write instruction (`STORE [0x1000], R1`), it places the address `0x1000` onto the Address Bus and the contents of `R1` onto the Data Bus.\n\nWhat role does the **Control Bus** perform during this exact bus cycle?",
      options: [
        "It converts the 32-bit data word from Little-Endian to Big-Endian",
        "It asserts the Memory Write (`MEMW`) control line and provides timing synchronization signals so the memory controller latches the data",
        "It routes the instruction through Level 4 Optical Storage for non-volatile backup",
        "It increments the Program Counter to bypass the Decode Stage"
      ],
      correctAnswer: 1,
      explanation: "**Bus Functions:**\n• **Address Bus:** Carries the destination memory address (`0x1000`) unidirectional from CPU.\n• **Data Bus:** Carries the payload bits bidirectional.\n• **Control Bus:** Transmits command, timing, and status signals. In a write cycle, it asserts the `MEMW` (Memory Write) signal and clock strobe so the DRAM controller knows when the data bus is stable and ready to be latched into memory cells.",
      category: "Bus Systems"
    },
    {
      id: "cpe413-mq19",
      question: "Why do modern computer architectures use **SRAM (Static RAM)** for on-chip Level 1/2 caches, but utilize **DRAM (Dynamic RAM)** for primary system memory, rather than using SRAM for all system memory?",
      options: [
        "SRAM is non-volatile and retains data without power, whereas DRAM is volatile",
        "SRAM uses a 6-transistor latch per bit which is extremely fast but has low density and high cost; DRAM uses a 1-transistor 1-capacitor cell which is far denser and cheaper despite needing refresh cycles",
        "DRAM executes instructions directly without needing an Arithmetic Logic Unit",
        "SRAM can only store optical data words, making it incompatible with motherboard memory slots"
      ],
      correctAnswer: 1,
      explanation: "**Circuit-Level Memory Trade-Off:**\n• **SRAM (Static RAM):** Built from 6 transistors (6T flip-flop latch) per bit. It retains its state continuously without refresh and achieves sub-nanosecond access times. However, 6 transistors per bit consume significant silicon die area, making it expensive and low-density $\\rightarrow$ ideal for small L1/L2 caches.\n• **DRAM (Dynamic RAM):** Built from only 1 transistor and 1 tiny capacitor (1T-1C) per bit. It achieves massive capacity and low cost per bit, but charge leaks from the capacitor, requiring periodic electrical refresh cycles (hence 'dynamic') and higher latency $\\rightarrow$ ideal for multi-gigabyte main memory.",
      category: "Memory Hierarchy"
    },
    {
      id: "cpe413-mq20",
      question: "In 1971, Busicom contracted Intel to design 12 custom application-specific integrated circuits for a desktop calculator. Instead, an Intel engineering team led by Marcian 'Ted' Hoff and Federico Faggin designed a single general-purpose 4-bit chip: the **Intel 4004**.\n\nWhy does history designate the Intel 4004 as the catalyst for **Generation 4 Computing**?",
      options: [
        "It was the first computer built using solid-state discrete transistors instead of vacuum tubes",
        "It was the first machine to implement John von Neumann's Stored-Program Concept",
        "It integrated the entire CPU datapath (ALU, registers, control logic) onto a single silicon chip (the microprocessor)",
        "It introduced quantum artificial intelligence algorithms to consumer calculators"
      ],
      correctAnswer: 2,
      explanation: "**Historical Milestone Analysis:**\n• **Generation 4 (1980–Present)** is defined by the **Microprocessor**.\n• The Intel 4004 (1971) was the world's first commercially available single-chip microprocessor. By integrating the ALU, general registers, instruction fetch, and control logic onto a single chip containing 2,300 transistors, it made general-purpose microcomputing economically viable and spawned the personal computer revolution.",
      category: "History & Milestones"
    },
    {
      id: "cpe413-mq21",
      question: "An embedded avionics flight control computer incorporates a hardware **Watchdog Timer** that must be periodically reset by the flight control software loop. If software freezes due to an unexpected thread deadlock, the watchdog expires, triggering a hardware interrupt that reverts control flaps to a passive, fail-safe aerodynamic glide configuration.\n\nWhich of the 8 engineering design constraints directly mandates this fail-safe architecture?",
      options: [
        "Functionality",
        "Time to Market",
        "Cost",
        "Safety"
      ],
      correctAnswer: 3,
      explanation: "**Engineering Constraint Analysis:**\n• **Safety:** Explicitly defined in Module 1 as 'incorporating operational safety, fault tolerance, and fail-safe mechanisms from the earliest architectural phase.'\n• Watchdog timers, redundant buses, and fail-safe hardware states are standard engineering implementations required to guarantee system safety in critical physical environments (aerospace, medical, automotive).",
      category: "Engineering Constraints"
    },
    {
      id: "cpe413-mq22",
      question: "A systems administrator is designing a tiered data storage and backup infrastructure. According to the secondary and tertiary storage classifications presented in Module 1, which of the following groupings is strictly correct?",
      options: [
        "Magnetic Storage: RAID, SCSI, IDE, Floppy, Tape; Optical Storage: CD-ROM, DVD, Blu-Ray; Flash Storage: SSD, USB Flash Drive",
        "Magnetic Storage: DVD, Blu-Ray; Optical Storage: RAID, SCSI; Flash Storage: Floppy Disk",
        "Magnetic Storage: SSD, NVMe; Optical Storage: USB Thumb Drive; Flash Storage: Magnetic Tape",
        "Magnetic Storage: CD-ROM; Optical Storage: IDE, SCSI; Flash Storage: Level 1 SRAM Cache"
      ],
      correctAnswer: 0,
      explanation: "**Verbatim Slide Categorization:**\n• **Magnetic Storage:** Magnetic tape, Magnetic disk, Floppy disk, IDE, SCSI, RAID.\n• **Optical Storage:** CD-ROM, DVD, Blu-Ray (uses laser reflection on physical pits).\n• **Flash Storage:** USB flash drives, Memory cards, Solid State Drives (SSDs).\n• **Cloud Storage:** Remote distributed storage (Google Drive, OneDrive, Dropbox).",
      category: "Storage Classification"
    },
    {
      id: "cpe413-mq23",
      question: "A computer engineering student is using an FPGA logic analyzer to inspect CPU registers during the execution of a branch instruction located at memory address `0x0040` (`JMP 0x0090`).\n\nImmediately after the **Fetch Stage** completes (before the Decode and Execute stages alter program flow), what are the contents of the **Instruction Register (IR)** and the **Program Counter (PC)**?",
      options: [
        "IR contains `0x0090`; PC contains `0x0040`",
        "IR contains the binary machine code of `JMP 0x0090`; PC contains `0x0044` (the address of the sequential next instruction)",
        "IR contains `0x0000`; PC contains `0x0090`",
        "Both IR and PC are reset to Level 0 CPU registers"
      ],
      correctAnswer: 1,
      explanation: "**Datapath State Mechanics:**\n• During the Fetch stage:\n  1. The instruction at the address currently in the PC (`0x0040`) is retrieved from memory and latched into the **Instruction Register (IR)**. Thus, IR contains the machine code for `JMP 0x0090`.\n  2. The **Program Counter (PC)** is automatically incremented by the instruction word length (e.g. +4 bytes $\\rightarrow$ `0x0044`) to point to the next sequential instruction.\n• The PC does NOT update to the jump destination (`0x0090`) until the instruction is decoded and executed in subsequent stages!",
      category: "CPU Datapath"
    },
    {
      id: "cpe413-mq24",
      question: "Modern hyperscale datacenters deploy Google TPU (Tensor Processing Unit) clusters and quantum annealing coprocessors alongside standard microprocessors to train deep learning models.\n\nWhy does Module 1 classify these technologies as **Generation 5 Computing** rather than Generation 4?",
      options: [
        "Because they revert to vacuum tube filament heating to increase thermal entropy",
        "Because they abandon Integrated Circuits in favor of mechanical gear wheels",
        "Because they represent Artificial Intelligence and Quantum Computing architectures designed for parallel neural matrix computation and non-Von Neumann paradigms",
        "Because they operate strictly at Level 4 of the memory hierarchy without using primary RAM"
      ],
      correctAnswer: 2,
      explanation: "**Generational Taxonomy:**\n• **Generation 4 (1980–Present):** Defined by traditional Von Neumann microprocessors (VLSI single-chip CPUs).\n• **Generation 5 (Present & Future):** Defined by **Artificial Intelligence and Quantum Computing**. These encompass neuromorphic chips, systolic array TPUs for tensor calculations, and quantum processors that transcend classical sequential Von Neumann execution.",
      category: "Generations of Computing"
    },
    {
      id: "cpe413-mq25",
      question: "A computerized industrial SCADA system monitors pipeline pressure. Pressure transducers sample analog voltages, analog-to-digital converters convert them to 32-bit floats, an embedded Linux controller filters out pump noise, and a Modbus TCP/IP gateway transmits real-time telemetry packets over fiber-optic lines to a central monitoring facility.\n\nIn the 4-component computerized Input-Process-Output model described in Module 1, which component does the Modbus TCP/IP gateway and fiber-optic link represent?",
      options: [
        "Computer Hardware",
        "Computer Software",
        "Data",
        "Communication Component"
      ],
      correctAnswer: 3,
      explanation: "**IPO Model Components:**\n• Module 1 outlines 4 essential components required to implement a computerized IPO model:\n  1. **Computer Hardware:** Physical mechanisms (sensors, processor, memory).\n  2. **Computer Software:** System & application programs (embedded Linux, filtering algorithms).\n  3. **Data:** Digital values (32-bit floating point pressure readings).\n  4. **Communication Component:** Telecommunications networks, protocols, and transmission media (Modbus TCP/IP over fiber optics) that transport data between computer systems.",
      category: "IPO Model"
    },
    {
      id: "cpe413-mq26",
      question: "A smartphone chip designer faces a dilemma: cramming an 8-core CPU, 12-core GPU, and neural NPU onto a silicon die smaller than $100\\text{ mm}^2$ causes the chip to consume 15 Watts under maximum load. In a sealed 7mm-thin smartphone chassis without cooling fans, surface temperatures quickly exceed $65^\\circ\\text{C}$, triggering severe thermal throttling that drops performance by 50%.\n\nWhich two engineering design constraints are in direct conflict in this scenario?",
      options: [
        "Size (physical silicon/chassis footprint) and Power & Energy (thermal dissipation limits)",
        "Time to Market and Level 4 Tape Storage",
        "Functionality and Parity Error Correction",
        "Maintainability and Network Byte Order"
      ],
      correctAnswer: 0,
      explanation: "**Engineering Trade-Off Analysis:**\n• The **Size** constraint requires the chip and device to remain ultra-compact to fit inside a pocket.\n• The **Power & Energy** constraint limits how many watts of power the chip can consume before thermal dissipation exceeds what the phone's passive cooling can reject ($P = C \\cdot V^2 \\cdot f$).\n• Designing an ultra-dense, ultra-fast chip inside an ultra-thin form factor represents the classic engineering tension between Size and Power/Thermal constraints.",
      category: "Engineering Constraints"
    },
    {
      id: "cpe413-mq27",
      question: "An assembly language programmer writes a routine that compares two 64-bit numbers using `CMP RAX, RBX`, followed by a conditional branch instruction `JE target_label` (Jump if Equal), which checks whether the Zero Flag (ZF) in the CPU Status Register is set to 1.\n\nAre the condition code status flags (Zero Flag, Carry Flag, Overflow Flag) considered part of **Computer Architecture** or **Computer Organization**?",
      options: [
        "Computer Organization, because flags are implemented using physical flip-flop transistors inside the ALU",
        "Computer Architecture, because status flags are part of the programmer-visible state and directly alter instruction set control flow",
        "Neither; status flags belong exclusively to the operating system file system",
        "Computer Organization, because flags are only accessible to Level 3 magnetic storage controllers"
      ],
      correctAnswer: 1,
      explanation: "**Architecture vs Organization Rule:**\n• The fundamental dividing line:\n  - **Computer Architecture:** Attributes of a system visible to the programmer (assembly instructions, data types, visible registers, addressing modes, and condition code status flags).\n  - **Computer Organization:** The underlying physical implementation details transparent to the programmer (clock distribution, transistor logic gates, adder circuit topologies).\n• Because the programmer checks and branches on `ZF` and `CF`, they are explicitly part of **Computer Architecture**.",
      category: "Architecture vs Organization"
    },
    {
      id: "cpe413-mq28",
      question: "In an industrial embedded controller, three independent hardware devices—a CPU core, a Direct Memory Access (DMA) controller, and an Ethernet packet processor—all share a common system memory bus. If both the DMA controller and CPU attempt to drive addresses onto the bus simultaneously, electrical bus contention would destroy data signals.\n\nWhich bus subsystem and mechanism prevents this collision?",
      options: [
        "The Data Bus executes byte-swapping using Little-Endian logic",
        "The Address Bus increases its width from 32 bits to 64 bits dynamically",
        "The Control Bus coordinates bus arbitration using Bus Request (BR) and Bus Grant (BG) handshake signals",
        "The Level 4 Optical Storage drive halts all clock cycles"
      ],
      correctAnswer: 2,
      explanation: "**Bus Arbitration Mechanics:**\n• When multiple bus masters exist, **Bus Arbitration** is required.\n• The **Control Bus** carries arbitration signals (such as Bus Request `BR` and Bus Grant `BG`). A bus master must assert `BR` and wait for the arbiter to assert `BG` before driving the address and data buses, guaranteeing that only one master controls the bus at any given instant.",
      category: "Bus Systems"
    }
  ],
  cramNotes: [
    "Architecture ('The What'): Conceptual design, ISA, visible registers, status flags, addressing modes, data types.",
    "Organization ('The How'): Physical implementation, circuits, control signals, memory interfaces, wiring.",
    "ISA + μ-ARCH + MEM tie architecture and organization together.",
    "5 Basic Components: CPU, Memory (RAM), Storage, I/O Systems, Bus Systems.",
    "4 IPO Model Components: Computer Hardware, Computer Software, Data, Communication Component.",
    "6 Generations: Gen 0 Mechanical (1642–1945), Gen 1 Vacuum Tubes (1945–1955), Gen 2 Transistors (1955–1965), Gen 3 ICs (1965–1980), Gen 4 Microprocessors (1980–?), Gen 5 AI & Quantum (Present).",
    "Pivotal Milestones: 1642 Pascal's Calculator, 1837 Babbage's Analytical Engine (Store & Mill), 1945 ENIAC (18k tubes), 1945 Stored-Program Concept (Von Neumann), 1964 IBM System/360 (first computer family / ISA compatibility), 1971 Intel 4004 (first single-chip microprocessor).",
    "Von Neumann Bottleneck: Shared memory bus between CPU and DRAM limits throughput; Harvard uses separate instruction and data buses.",
    "Memory Hierarchy (L0 to L4): L0 Registers (<1ns) -> L1 Cache (SRAM, 6T, no refresh) -> L2 Main (DRAM, 1T-1C, needs refresh) -> L3 Secondary (HDD/SSD/RAID) -> L4 Tertiary (Optical/Tape).",
    "Locality of Reference: Temporal Locality (reuse recently accessed address) & Spatial Locality (access nearby addresses in cache lines).",
    "Byte Ordering: Big-Endian (MSB at lowest address / Network Byte Order) vs Little-Endian (LSB at lowest address / x86 default).",
    "Data Integrity: Parity detects odd-bit errors only; SECDED ECC (Hamming Code) detects and automatically corrects single-bit errors.",
    "Bus Width Rule: 32-bit address bus can directly reference at most 2^32 = 4 GB of RAM.",
    "8 Engineering Constraints: Functionality, Cost, Performance, Size, Power/Energy (P = C * V^2 * f), Time to Market, Maintainability (MTTR/MTBF), Safety (watchdog timers & fail-safe mechanisms)."
  ]
};
