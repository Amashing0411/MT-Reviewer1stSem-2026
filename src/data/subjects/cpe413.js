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
      "Multiple Choice",
      "Identification",
      "Hierarchy & Generation Matching"
    ],
    coverage: "Module 1: History, Overview of Computer Architecture, Tools, Standards, and Engineering Constraints"
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
          examTrap: "Exam Question: 'Are visible registers part of Architecture or Organization?' Answer: Visible registers are part of ARCHITECTURE (visible to the assembly programmer). Hardware wiring and control signals are part of ORGANIZATION."
        },
        {
          id: "cpe413-c2",
          title: "Three Key Aspects: ISA, μ-ARCH, and MEM",
          category: "Architecture",
          badge: "Core Framework",
          content: "Three concepts that tie architecture and organization together:",
          keyPoints: [
            "1. **ISA (Instruction Set Architecture):** Defines the complete set of instructions the CPU can execute and how they are encoded into machine binary.",
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
            "• **Generation 0 (1642–1945):** *Mechanical Computers* (gears, wheels, punch cards).",
            "• **Generation 1 (1945–1955):** *Vacuum Tubes* (massive, power-hungry, high failure rates; e.g. ENIAC).",
            "• **Generation 2 (1955–1965):** *Transistors* (smaller, faster, more reliable semiconductor switches).",
            "• **Generation 3 (1965–1980):** *Integrated Circuits (ICs)* (multiple transistors etched on single silicon wafer; e.g. IBM System/360).",
            "• **Generation 4 (1980–?):** *Microprocessors* (entire CPU on a single chip; VLSI personal computing; Intel 4004 onwards).",
            "• **Generation 5 (Present):** *Artificial Intelligence & Quantum* (neuromorphic chips, self-learning architectures, quantum processors)."
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
            "**1837 - Babbage’s Analytical Engine:** Conceived by Charles Babbage; laid the foundational groundwork for programmable computing.",
            "**1945 - ENIAC:** First general-purpose electronic digital computer, constructed using thousands of vacuum tubes.",
            "**1945 - Stored-Program Concept (John von Neumann):** Instructions are stored in memory ALONGSIDE data in the same address space. Central foundation of the Von Neumann Architecture!",
            "**1964 - IBM System/360:** First family of software-compatible computers spanning multiple price/performance tiers using ICs.",
            "**1971 - Intel 4004:** First commercially available single-chip microprocessor."
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
            "**RISC vs. CISC:**\n• *RISC (Reduced Instruction Set Computer):* Simple, single-cycle, uniform fixed-length instructions.\n• *CISC (Complex Instruction Set Computer):* Rich instruction set with variable lengths performing multi-step operations.",
            "**Parallelism Types:**\n• *Instruction-Level Parallelism (ILP):* Simultaneous execution of sequential instructions (pipelining, superscalar execution).\n• *Processor-Level Parallelism:* Multiple CPU cores executing separate threads or programs simultaneously."
          ]
        },
        {
          id: "cpe413-c7",
          title: "The 5-Level Memory Hierarchy",
          category: "Memory",
          badge: "Hierarchy Pyramid",
          content: "Organized based on the principle of Locality of Reference to minimize CPU access latency while maximizing storage capacity at minimum cost:",
          keyPoints: [
            "• **Level 0 — CPU Registers:** Fastest speed, lowest latency (< 1ns), smallest capacity, highest cost per bit.",
            "• **Level 1 — Cache Memory (SRAM):** Very fast, small capacity, located on/close to CPU die.",
            "• **Level 2 — Main Memory (DRAM):** Fast, medium capacity, volatile (loses data on power loss).",
            "• **Level 3 — Magnetic Disk (HDD):** Slower, large capacity, non-volatile permanent magnetic storage.",
            "• **Level 4 — Optical Disk / Magnetic Tape:** Slowest access speed, massive archive capacity, lowest cost per bit.",
            "**Trade-off Rule:** Ascending from Level 4 to Level 0: $\\uparrow$ Speed & Cost per bit, $\\downarrow$ Storage Capacity."
          ]
        },
        {
          id: "cpe413-c8",
          title: "The 8 Engineering Constraints in Architecture Design",
          category: "Engineering Constraints",
          badge: "Verbatim Slide Enumeration",
          content: "Architecture is engineering design under real-world constraints. Eight factors that govern every CPU design decision:",
          keyPoints: [
            "1. **Functionality:** Does the design work and meet user needs (usability, satisfaction, efficiency, effectiveness)?",
            "2. **Cost:** Resources needed to conceive, design, produce, package, and maintain the product.",
            "3. **Performance:** Coordination of conditions producing desired results (IPC, clock frequency, throughput, latency, quality).",
            "4. **Size:** Physical die area and silicon footprint of the system solution.",
            "5. **Power & Energy:** Energy required to operate — often traded off against thermal throttling and cost (vital for mobile/IoT).",
            "6. **Time to Market:** Time from initial concept to commercial release / first unit sold.",
            "7. **Maintainability:** Probability that a failed component can be diagnosed, repaired, or updated within specified time.",
            "8. **Safety:** Embedding operational safety, fault-tolerance, and health considerations from the earliest architectural phase."
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
      answer: "The Analytical Engine, which laid the foundational concepts of modern programmable computing.",
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
      answer: "• Level 0: CPU Registers (Fastest, lowest capacity, highest cost)\n• Level 1: Cache Memory (SRAM)\n• Level 2: Main Memory (DRAM)\n• Level 3: Magnetic Disk (HDD)\n• Level 4: Optical Disk / Magnetic Tape (Slowest, highest capacity, lowest cost)",
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
      question: "Which of the following aspects belongs strictly to Computer Architecture rather than Computer Organization?",
      options: [
        "The physical wiring of the ALU adder circuits",
        "The Instruction Set Architecture (ISA) and visible registers",
        "The control signal voltage levels",
        "The memory clock timing generator"
      ],
      correctAnswer: 1,
      explanation: "Architecture encompasses the conceptual design, instruction set, addressing modes, and registers visible to the programmer. Physical wiring and timing belong to Organization.",
      category: "Architecture"
    },
    {
      id: "cpe413-mq2",
      question: "Which computing generation is characterized by the use of Integrated Circuits (ICs) between 1965 and 1980?",
      options: [
        "Generation 1",
        "Generation 2",
        "Generation 3",
        "Generation 4"
      ],
      correctAnswer: 2,
      explanation: "Generation 3 (1965–1980) introduced Integrated Circuits, exemplified by the IBM System/360 family.",
      category: "Generations"
    },
    {
      id: "cpe413-mq3",
      question: "Which memory level in the memory hierarchy is volatile, medium capacity, and constructed using DRAM?",
      options: [
        "Level 0 — CPU Registers",
        "Level 1 — SRAM Cache",
        "Level 2 — Main Memory",
        "Level 3 — Magnetic Disk"
      ],
      correctAnswer: 2,
      explanation: "Level 2 is Main Memory (DRAM), which is fast, medium capacity, and volatile.",
      category: "Memory"
    },
    {
      id: "cpe413-mq4",
      question: "What is the primary trade-off when moving upwards from Level 4 to Level 0 in the memory hierarchy?",
      options: [
        "Capacity increases while cost per bit decreases",
        "Access speed and cost per bit increase while storage capacity decreases",
        "Volatility decreases while size increases",
        "Latency increases while bandwidth decreases"
      ],
      correctAnswer: 1,
      explanation: "As you move up the hierarchy towards registers, speed and cost per bit rise significantly while capacity drops.",
      category: "Memory"
    },
    {
      id: "cpe413-mq5",
      question: "The probability that a failed hardware component can be restored to operational status within a specified time relates to which engineering constraint?",
      options: [
        "Functionality",
        "Maintainability",
        "Time to Market",
        "Performance"
      ],
      correctAnswer: 1,
      explanation: "Maintainability is defined as the probability that a failed component can be restored within a specified timeframe.",
      category: "Constraints"
    },
    {
      id: "cpe413-mq6",
      question: "Who formulated the Stored-Program Concept in 1945, establishing that instructions and data coexist in memory?",
      options: [
        "Blaise Pascal",
        "Charles Babbage",
        "John von Neumann",
        "Alan Turing"
      ],
      correctAnswer: 2,
      explanation: "John von Neumann introduced the Stored-Program Concept in 1945, the bedrock of modern general-purpose computing architectures.",
      category: "History"
    },
    {
      id: "cpe413-mq7",
      question: "Which of the following describes the first commercial single-chip microprocessor released in 1971?",
      options: [
        "ENIAC",
        "IBM System/360",
        "Intel 4004",
        "Motorola 68000"
      ],
      correctAnswer: 2,
      explanation: "The Intel 4004, launched in 1971, was the world's first commercially available microprocessor.",
      category: "History"
    },
    {
      id: "cpe413-mq8",
      question: "Which CPU subsystem coordinates sequential instruction execution and directs the flow of data between registers and the ALU?",
      options: [
        "Arithmetic Logic Unit (ALU)",
        "Control Unit (CU)",
        "Instruction Cache",
        "Program Counter"
      ],
      correctAnswer: 1,
      explanation: "The Control Unit (CU) interprets instructions and generates the electrical control signals that coordinate CPU datapath operations.",
      category: "CPU Datapath"
    },
    {
      id: "cpe413-mq9",
      question: "What is the defining characteristic of a RISC architecture compared to CISC?",
      options: [
        "Complex instructions executing over variable clock cycles",
        "A large instruction set with hardware-level polygon rendering",
        "A reduced set of simple, uniform, single-cycle instructions with a load/store model",
        "Complete absence of general-purpose registers"
      ],
      correctAnswer: 2,
      explanation: "RISC (Reduced Instruction Set Computer) focuses on simple, uniform-length instructions that typically execute in a single clock cycle.",
      category: "ISA Architecture"
    },
    {
      id: "cpe413-mq10",
      question: "In the memory hierarchy, which memory level resides at Level 0?",
      options: [
        "Level 1 Cache (SRAM)",
        "Main Memory (DRAM)",
        "CPU Registers",
        "Solid State Drive (Flash)"
      ],
      correctAnswer: 2,
      explanation: "Level 0 of the memory hierarchy consists of CPU Registers—the fastest, smallest, and highest-cost storage in the system.",
      category: "Memory Hierarchy"
    },
    {
      id: "cpe413-mq11",
      question: "In computer storage systems, RAID and SCSI belong to which category?",
      options: [
        "Magnetic Storage",
        "Optical Storage",
        "Flash Storage",
        "Cloud Storage"
      ],
      correctAnswer: 0,
      explanation: "The lecture categorizes Magnetic Storage as: Magnetic disk, Floppy disk, IDE, SCSI, and RAID.",
      category: "Storage"
    },
    {
      id: "cpe413-mq12",
      question: "Which of the following is NOT one of the 8 engineering design constraints identified in Module 1?",
      options: [
        "Functionality",
        "Time to Market",
        "Maintainability",
        "Instruction Encoding Entropy"
      ],
      correctAnswer: 3,
      explanation: "The 8 constraints are: Functionality, Cost, Performance, Size, Power & Energy, Time to Market, Maintainability, and Safety.",
      category: "Engineering Constraints"
    },
    {
      id: "cpe413-mq13",
      question: "What type of parallelism refers to the simultaneous execution of instructions within a single sequential program stream using pipelining?",
      options: [
        "Processor-Level Parallelism",
        "Instruction-Level Parallelism (ILP)",
        "Cloud Distributed Parallelism",
        "Thread-Level Parallelism"
      ],
      correctAnswer: 1,
      explanation: "Instruction-Level Parallelism (ILP) overlaps the execution of adjacent instructions within a single thread using techniques like pipelining.",
      category: "Parallelism"
    },
    {
      id: "cpe413-mq14",
      question: "Which generation of computing hardware relied on vacuum tubes between 1945 and 1955?",
      options: [
        "Generation 0",
        "Generation 1",
        "Generation 2",
        "Generation 3"
      ],
      correctAnswer: 1,
      explanation: "Generation 1 (1945–1955) utilized vacuum tubes for electronic calculation.",
      category: "Generations"
    },
    {
      id: "cpe413-mq15",
      question: "The duration from initial product concept formulation to the commercial sale of the first unit represents which constraint?",
      options: [
        "Cost",
        "Performance",
        "Time to Market",
        "Safety"
      ],
      correctAnswer: 2,
      explanation: "Time to Market specifically measures the elapsed time from project inception until commercial market launch.",
      category: "Engineering Constraints"
    },
    {
      id: "cpe413-mq16",
      question: "Which bus transmits memory addresses from the CPU to primary memory and I/O controllers?",
      options: [
        "Data Bus",
        "Control Bus",
        "Address Bus",
        "PCIe Bus"
      ],
      correctAnswer: 2,
      explanation: "The Address Bus is unidirectional from the CPU and specifies the physical memory address for read or write operations.",
      category: "Buses"
    },
    {
      id: "cpe413-mq17",
      question: "Which milestone in 1837 laid the architectural blueprint for modern general-purpose computing?",
      options: [
        "Blaise Pascal's Calculator",
        "Charles Babbage's Analytical Engine",
        "The Transistor at Bell Labs",
        "The Intel 8086"
      ],
      correctAnswer: 1,
      explanation: "Charles Babbage's Analytical Engine (1837) introduced concepts of memory (the store) and CPU (the mill), laying modern foundations.",
      category: "History"
    },
    {
      id: "cpe413-mq18",
      question: "Why is Main Memory (DRAM) categorized as volatile storage?",
      options: [
        "It can be overwritten by malicious viruses",
        "It loses all stored data when electrical power is removed",
        "It is physically fragile and subject to mechanical vibration",
        "Its capacity dynamically shrinks over time"
      ],
      correctAnswer: 1,
      explanation: "Volatile memory requires continuous electrical power to maintain its stored state; without power, data decays immediately.",
      category: "Memory"
    },
    {
      id: "cpe413-mq19",
      question: "Which of the four essential components in the input-process-output model represents programs that tell the hardware what to do?",
      options: [
        "Computer Hardware",
        "Computer Software",
        "Data",
        "Communication Component"
      ],
      correctAnswer: 1,
      explanation: "Computer Software comprises system programs (OS) and application programs that direct the hardware's execution.",
      category: "System Model"
    },
    {
      id: "cpe413-mq20",
      question: "In secondary storage classification, CD-ROM, DVD, and Blu-Ray belong to which storage group?",
      options: [
        "Magnetic Storage",
        "Optical Storage",
        "Flash Storage",
        "Cloud Storage"
      ],
      correctAnswer: 1,
      explanation: "CD-ROM, DVD, and Blu-Ray use laser optics to read reflective pits on discs, classifying them as Optical Storage.",
      category: "Storage"
    },
    {
      id: "cpe413-mq21",
      question: "If an architecture design must meet strict limits on die silicon area to fit inside a smartwatch, which constraint dominates?",
      options: [
        "Maintainability",
        "Size",
        "Time to Market",
        "Safety"
      ],
      correctAnswer: 1,
      explanation: "The Size constraint dictates the physical space and silicon die footprint allowable for the hardware solution.",
      category: "Engineering Constraints"
    },
    {
      id: "cpe413-mq22",
      question: "Which generation of computing spans from 1955 to 1965 and replaced vacuum tubes with solid-state switches?",
      options: [
        "Generation 1",
        "Generation 2",
        "Generation 3",
        "Generation 4"
      ],
      correctAnswer: 1,
      explanation: "Generation 2 (1955–1965) was defined by the introduction of solid-state semiconductor transistors.",
      category: "Generations"
    },
    {
      id: "cpe413-mq23",
      question: "What term describes the physical implementation of an Instruction Set Architecture (ISA), including pipelining and functional units?",
      options: [
        "Computer Architecture",
        "Microarchitecture (μ-ARCH)",
        "Memory Hierarchy (MEM)",
        "Bus Protocol"
      ],
      correctAnswer: 1,
      explanation: "Microarchitecture (μ-ARCH) is the specific hardware implementation of an ISA, encompassing execution units, caches, and pipeline depth.",
      category: "Architecture Framework"
    },
    {
      id: "cpe413-mq24",
      question: "Which of the following devices converts digital computer data into human-readable hardcopy output?",
      options: [
        "Digital Camera",
        "Keyboard",
        "Printer",
        "Headset"
      ],
      correctAnswer: 2,
      explanation: "Printers produce physical, human-readable paper copies of digital documents and data.",
      category: "Basic Components"
    },
    {
      id: "cpe413-mq25",
      question: "In a multiprocessor system where each processor executes an independent thread on shared or distinct data, what level of parallelism is achieved?",
      options: [
        "Instruction-Level Parallelism",
        "Processor-Level Parallelism",
        "Microcode Parallelism",
        "Bit-Level Parallelism"
      ],
      correctAnswer: 1,
      explanation: "Processor-Level Parallelism involves multiple discrete processor cores executing concurrent threads or tasks across the system.",
      category: "Parallelism"
    }
  ],
  cramNotes: [
    "Architecture ('What'): Conceptual design, ISA, visible registers, data types, addressing modes.",
    "Organization ('How'): Circuits, control signals, memory buses, and physical wiring.",
    "ISA + μ-ARCH + MEM tie architecture and organization together.",
    "5 Basic Components: CPU, Memory, Storage, I/O Systems, Bus Systems.",
    "6 Generations: 0 Mechanical, 1 Vacuum Tubes, 2 Transistors, 3 Integrated Circuits, 4 Microprocessors, 5 AI.",
    "Milestones: 1642 Pascal's Calculator, 1837 Analytical Engine, 1945 ENIAC, 1945 Stored-Program Concept (Von Neumann), 1964 IBM 360, 1971 Intel 4004.",
    "Memory Hierarchy: L0 Registers -> L1 Cache (SRAM) -> L2 Main (DRAM) -> L3 Magnetic -> L4 Optical/Tape.",
    "8 Constraints: Functionality, Cost, Performance, Size, Power/Energy, Time to Market, Maintainability, Safety."
  ]
};
