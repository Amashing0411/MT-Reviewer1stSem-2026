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
          "id": "cpe413-mq1",
          "question": "True or False: Computer Architecture refers to the operational units and their interconnections that realize the architectural specifications, while Computer Organization refers to attributes visible to the programmer.",
          "options": [
              "True",
              "False"
          ],
          "correctAnswer": 1,
          "explanation": "**False.** The definitions are reversed. Computer Architecture defines programmer-visible attributes (ISA, registers, addressing modes, data types), whereas Computer Organization refers to the physical operational units and interconnections (circuits, control signals, adder designs) that implement the architecture.",
          "category": "Architecture vs Organization"
      },
      {
          "id": "cpe413-mq2",
          "question": "True or False: The Von Neumann architecture stores both instructions and data in the same physical memory space over a shared system bus.",
          "options": [
              "True",
              "False"
          ],
          "correctAnswer": 0,
          "explanation": "**True.** In a pure Von Neumann architecture, code and data reside in a shared memory space and travel across a single shared system bus, which leads to the Von Neumann Bottleneck.",
          "category": "Von Neumann Architecture"
      },
      {
          "id": "cpe413-mq3",
          "question": "True or False: SRAM uses 6 transistors per cell to hold charge without needing periodic refresh cycles, making it faster and more expensive than DRAM.",
          "options": [
              "True",
              "False"
          ],
          "correctAnswer": 0,
          "explanation": "**True.** Static RAM (SRAM) uses a 6-transistor bistable latch per cell that retains data as long as power is applied without refresh cycles. DRAM uses a 1T-1C structure that discharges and requires constant refreshing.",
          "category": "Memory Hierarchy"
      },
      {
          "id": "cpe413-mq4",
          "question": "True or False: In a Little-Endian system, the least significant byte (LSB) of a multi-byte word is stored at the lowest memory address.",
          "options": [
              "True",
              "False"
          ],
          "correctAnswer": 0,
          "explanation": "**True.** Little-Endian places the Least Significant Byte (LSB) at the lowest memory address (standard in x86 architectures), while Big-Endian places the Most Significant Byte (MSB) at the lowest memory address.",
          "category": "Data Integrity & Encoding"
      },
      {
          "id": "cpe413-mq5",
          "question": "True or False: A processor with a 32-bit address bus can directly address up to 8 Gigabytes (GB) of physical memory.",
          "options": [
              "True",
              "False"
          ],
          "correctAnswer": 1,
          "explanation": "**False.** A 32-bit address bus can address at most 2^32 unique memory locations = 4,294,967,296 bytes = exactly 4 GB, not 8 GB.",
          "category": "Bus Systems"
      },
      {
          "id": "cpe413-mq6",
          "question": "True or False: The Control Bus is responsible for carrying raw arithmetic operand data and memory words between the CPU and memory.",
          "options": [
              "True",
              "False"
          ],
          "correctAnswer": 1,
          "explanation": "**False.** The Data Bus carries raw operands, memory words, and instructions. The Control Bus transmits timing and command signals (Read, Write, Interrupt, Bus Grant) to coordinate system operations.",
          "category": "Bus Systems"
      },
      {
          "id": "cpe413-mq7",
          "question": "True or False: Charles Babbage's Analytical Engine in 1837 anticipated modern computer design by separating computational processing ('The Mill') from memory storage ('The Store').",
          "options": [
              "True",
              "False"
          ],
          "correctAnswer": 0,
          "explanation": "**True.** Babbage's mechanical Analytical Engine pioneered the fundamental conceptual separation between the arithmetic/processing unit ('The Mill') and memory storage ('The Store').",
          "category": "Evolution & Milestones"
      },
      {
          "id": "cpe413-mq8",
          "question": "True or False: Single-bit parity checking can detect both single-bit errors and automatically correct them without retransmission.",
          "options": [
              "True",
              "False"
          ],
          "correctAnswer": 1,
          "explanation": "**False.** Simple parity bits can only detect an odd number of bit errors; they cannot determine which bit flipped or correct any error. Single-Error Correction Double-Error Detection (SECDED Hamming Code) is required for error correction.",
          "category": "Data Integrity & Encoding"
      },
      {
          "id": "cpe413-mq9",
          "question": "True or False: Temporal locality states that if a memory location is referenced once, nearby adjacent memory locations will likely be referenced soon.",
          "options": [
              "True",
              "False"
          ],
          "correctAnswer": 1,
          "explanation": "**False.** That describes Spatial Locality. Temporal Locality states that the SAME memory location referenced recently is likely to be referenced again soon (e.g., loop counters, stack pointers).",
          "category": "Memory Hierarchy"
      },
      {
          "id": "cpe413-mq10",
          "question": "True or False: The Intel 4004, introduced in 1971, is recognized as the world's first single-chip commercial microprocessor, marking the start of Generation 4.",
          "options": [
              "True",
              "False"
          ],
          "correctAnswer": 0,
          "explanation": "**True.** The 4-bit Intel 4004 (1971) was the first commercial single-chip microprocessor, marking the beginning of Generation 4 (Microprocessors).",
          "category": "Evolution & Milestones"
      },
      {
          "id": "cpe413-mq11",
          "question": "Which computer generation introduced Integrated Circuits (ICs), allowing hundreds of transistors on a single silicon chip?",
          "options": [
              "Generation 1 (1945–1955)",
              "Generation 2 (1955–1965)",
              "Generation 3 (1965–1980)",
              "Generation 4 (1980–Present)"
          ],
          "correctAnswer": 2,
          "explanation": "**Generation 3 (1965–1980)** replaced discrete transistor logic boards with Integrated Circuits (ICs), vastly increasing computing speed, density, and reliability (e.g., IBM System/360).",
          "category": "Evolution & Milestones"
      },
      {
          "id": "cpe413-mq12",
          "question": "What are the five basic physical hardware units of a general-purpose digital computer?",
          "options": [
              "Monitor, Keyboard, Mouse, CPU, Power Supply",
              "Central Processing Unit (CPU), Memory, Storage, I/O Systems, Bus Systems",
              "ALU, Register File, Program Counter, Cache, Multiplexer",
              "Hardware, Software, Firmware, Middleware, Operating System"
          ],
          "correctAnswer": 1,
          "explanation": "The 5 basic physical components of a computer system are: (1) CPU, (2) Main Memory, (3) Secondary Storage, (4) Input/Output (I/O) Systems, and (5) Bus Systems.",
          "category": "Computer Fundamentals"
      },
      {
          "id": "cpe413-mq13",
          "question": "Which of the following is an attribute of Computer Architecture rather than Computer Organization?",
          "options": [
              "Transistor gate propagation delay",
              "Instruction Set Architecture (ISA) and visible registers",
              "Control signal clock routing layout",
              "Memory bus copper trace impedance"
          ],
          "correctAnswer": 1,
          "explanation": "Attributes visible to the machine language programmer—such as the Instruction Set Architecture (ISA), addressable registers, condition code flags, and addressing modes—belong to Computer Architecture.",
          "category": "Architecture vs Organization"
      },
      {
          "id": "cpe413-mq14",
          "question": "What primary hardware limitation defines the 'Von Neumann Bottleneck'?",
          "options": [
              "Magnetic disk rotational latency during cold boots",
              "Throughput limitation caused by sharing a single memory bus for both instructions and data",
              "Register bit-width mismatch between 32-bit and 64-bit ALUs",
              "Capacitor charge leakage in dynamic RAM chips"
          ],
          "correctAnswer": 1,
          "explanation": "The Von Neumann Bottleneck occurs because instructions and data must compete for access across the same shared system memory bus, leaving the high-speed CPU starved for data.",
          "category": "Von Neumann Architecture"
      },
      {
          "id": "cpe413-mq15",
          "question": "Which landmark computer system introduced in 1964 established the concept of family architecture and software backward compatibility?",
          "options": [
              "ENIAC",
              "UNIVAC I",
              "IBM System/360",
              "DEC PDP-11"
          ],
          "correctAnswer": 2,
          "explanation": "Gene Amdahl and IBM introduced the **IBM System/360** in 1964, establishing the first family of computers sharing a single architecture across different price and performance points.",
          "category": "Evolution & Milestones"
      },
      {
          "id": "cpe413-mq16",
          "question": "Which level in the computer memory hierarchy possesses the fastest access time and lowest latency?",
          "options": [
              "Level 0: CPU Internal Registers",
              "Level 1: SRAM Cache",
              "Level 2: Main Memory (DRAM)",
              "Level 3: Solid State Drive (NVMe)"
          ],
          "correctAnswer": 0,
          "explanation": "**Level 0 (CPU Registers)** provides sub-nanosecond access speeds (<1 ns) directly inside the processor pipeline, making it the fastest memory tier.",
          "category": "Memory Hierarchy"
      },
      {
          "id": "cpe413-mq17",
          "question": "Which system bus lines determine the source or destination location for data being read or written?",
          "options": [
              "Data Bus",
              "Address Bus",
              "Control Bus",
              "Power Bus"
          ],
          "correctAnswer": 1,
          "explanation": "The **Address Bus** carries memory addresses or I/O port numbers to select the exact source or target location for the upcoming transfer.",
          "category": "Bus Systems"
      },
      {
          "id": "cpe413-mq18",
          "question": "In the Input-Processing-Output (IPO) model, what are the four foundational components of a computer system?",
          "options": [
              "Hardware, Software, Data, and Communication",
              "ALU, Control Unit, Registers, and Cache",
              "Client, Server, Router, and Switch",
              "Motherboard, Processor, RAM, and Storage"
          ],
          "correctAnswer": 0,
          "explanation": "The four components under the extended IPO model are: (1) Hardware, (2) Software, (3) Data, and (4) Communication.",
          "category": "Computer Fundamentals"
      },
      {
          "id": "cpe413-mq19",
          "question": "Which memory technology uses a single transistor and one capacitor (1T-1C) per cell, requiring periodic refresh cycles?",
          "options": [
              "Static RAM (SRAM)",
              "Dynamic RAM (DRAM)",
              "NOR Flash",
              "Mask ROM"
          ],
          "correctAnswer": 1,
          "explanation": "**DRAM (Dynamic RAM)** uses a 1T-1C architecture. Because the capacitor loses charge over time, DRAM requires constant periodic refresh operations to prevent data loss.",
          "category": "Memory Hierarchy"
      },
      {
          "id": "cpe413-mq20",
          "question": "Which byte-ordering convention stores the most significant byte (MSB) at the lowest memory address and is used in Network Byte Order?",
          "options": [
              "Little-Endian",
              "Big-Endian",
              "Bi-Endian",
              "Middle-Endian"
          ],
          "correctAnswer": 1,
          "explanation": "**Big-Endian** stores the Most Significant Byte (MSB) at the lowest memory address. It is the mandatory standard for IP internet protocols (known as Network Byte Order).",
          "category": "Data Integrity & Encoding"
      },
      {
          "id": "cpe413-mq21",
          "question": "If the 32-bit hexadecimal value 0x12345678 is stored in memory starting at address 0x2000 on a Little-Endian processor, what byte value is located at address 0x2000?",
          "options": [
              "0x12",
              "0x34",
              "0x56",
              "0x78"
          ],
          "correctAnswer": 3,
          "explanation": "In Little-Endian byte ordering, the Least Significant Byte (LSB, which is 0x78) is stored at the lowest base address (0x2000). The subsequent bytes follow: 0x2001: 0x56, 0x2002: 0x34, 0x2003: 0x12.",
          "category": "Data Integrity & Encoding"
      },
      {
          "id": "cpe413-mq22",
          "question": "A microcomputer processor features a 36-bit physical address bus. What is the maximum amount of physical RAM this processor can directly address?",
          "options": [
              "16 GB",
              "32 GB",
              "64 GB",
              "128 GB"
          ],
          "correctAnswer": 2,
          "explanation": "A 36-bit address bus can address 2^36 unique byte locations. 2^36 = (2^6) * (2^30) bytes = 64 * 1 GB = **64 GB**.",
          "category": "Bus Systems"
      },
      {
          "id": "cpe413-mq23",
          "question": "A program iterates linearly through a 10,000-element integer array stored in contiguous memory addresses. Which caching principle primarily boosts this loop's performance?",
          "options": [
              "Spatial Locality",
              "Temporal Locality",
              "Branch Prediction",
              "Dynamic Paging"
          ],
          "correctAnswer": 0,
          "explanation": "**Spatial Locality** states that memory locations near recently accessed addresses will likely be accessed soon. When the CPU fetches an array element, the entire cache line is brought into cache, ensuring subsequent contiguous elements hit the cache.",
          "category": "Memory Hierarchy"
      },
      {
          "id": "cpe413-mq24",
          "question": "When both the CPU and a Direct Memory Access (DMA) controller attempt to access the system bus simultaneously, which mechanism prevents bus collision?",
          "options": [
              "Dynamic Frequency Scaling",
              "Bus Arbitration via Bus Request (BR) and Bus Grant (BG) control signals",
              "Hardware Watchdog Timer Reset",
              "Static Parity Verification"
          ],
          "correctAnswer": 1,
          "explanation": "**Bus Arbitration** coordinates access among multiple bus masters. Devices assert Bus Request (BR), and the arbiter asserts Bus Grant (BG) to designate exactly one active bus master at any given cycle.",
          "category": "Bus Systems"
      },
      {
          "id": "cpe413-mq25",
          "question": "In CMOS microprocessor circuit design, which formula governs dynamic switching power dissipation?",
          "options": [
              "P = V / I",
              "P = C * V^2 * f",
              "P = I^2 * R * t",
              "P = C / (V * f)"
          ],
          "correctAnswer": 1,
          "explanation": "Dynamic power dissipation in CMOS processors is given by **P = C * V^2 * f**, where C is load capacitance, V is supply voltage, and f is clock frequency. Because voltage is squared, reducing voltage yields quadratic power savings.",
          "category": "Engineering Constraints"
      },
      {
          "id": "cpe413-mq26",
          "question": "An 8-bit data byte 10110010 is transmitted across a system bus configured with even parity. What must the value of the parity bit be?",
          "options": [
              "0",
              "1",
              "High-Z (floating)",
              "Inverted"
          ],
          "correctAnswer": 0,
          "explanation": "Count the number of 1s in the data byte 10110010: there are four 1s (an even number). For even parity, the total number of 1s including the parity bit must remain even; therefore, the parity bit must be **0**.",
          "category": "Data Integrity & Encoding"
      },
      {
          "id": "cpe413-mq27",
          "question": "Why are condition code status flags (such as ZF, CF, and OF in the EFLAGS register) classified as Computer Architecture rather than Computer Organization?",
          "options": [
              "Because they are physically etched onto the copper motherboard layers",
              "Because they are directly visible to the programmer and dictate conditional branch instruction execution",
              "Because they operate only at 5V transistor logic levels",
              "Because they are managed exclusively by the power supply regulation circuits"
          ],
          "correctAnswer": 1,
          "explanation": "Condition code flags indicate ALU outcomes (Zero, Carry, Overflow) and are directly testable by assembly instructions (e.g., JZ, JC). Because they are visible to the programmer and compiler, they are part of **Computer Architecture**.",
          "category": "Architecture vs Organization"
      },
      {
          "id": "cpe413-mq28",
          "question": "Which I/O data transfer technique frees the CPU from byte-by-byte transfer cycles by allowing the peripheral controller to write directly into DRAM?",
          "options": [
              "Programmed I/O (Polled I/O)",
              "Direct Memory Access (DMA)",
              "Software Trap Emulation",
              "Instruction Cache Snooping"
          ],
          "correctAnswer": 1,
          "explanation": "**Direct Memory Access (DMA)** enables high-speed peripheral devices (disks, NICs) to transfer data blocks directly to and from main memory without tying up CPU execution cycles.",
          "category": "Bus Systems"
      },
      {
          "id": "cpe413-mq29",
          "question": "Which fundamental computer architecture eliminates the Von Neumann Bottleneck by using physically separate memory spaces and buses for instructions and data?",
          "options": [
              "Harvard Architecture",
              "Turing Architecture",
              "Princeton Architecture",
              "RISC Single-Bus Architecture"
          ],
          "correctAnswer": 0,
          "explanation": "The **Harvard Architecture** uses physically separate storage and signal pathways for instructions and data, allowing simultaneous instruction fetch and data read/write.",
          "category": "Von Neumann Architecture"
      },
      {
          "id": "cpe413-mq30",
          "question": "In mission-critical embedded systems, what reliability metric specifies the expected average operating time between consecutive hardware or system failures?",
          "options": [
              "Mean Time to Repair (MTTR)",
              "Mean Time Between Failures (MTBF)",
              "Total Cost of Ownership (TCO)",
              "Thermal Design Power (TDP)"
          ],
          "correctAnswer": 1,
          "explanation": "**Mean Time Between Failures (MTBF)** measures the predicted elapsed operational time between inherent system failures, quantifying hardware reliability.",
          "category": "Engineering Constraints"
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
