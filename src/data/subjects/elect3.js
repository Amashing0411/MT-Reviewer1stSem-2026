export const elect3Data = {
  id: "elect3",
  code: "ELECT3",
  title: "Elective 3: System & Network Administration III & Security",
  description: "Principles of Security (CIA Triad, Access Control Models, Zero Trust), System Administration, Network Administration, Linux/Unix Architecture, Network Topologies (PAN/LAN/WAN), and DevOps Automation.",
  room: "Room 106",
  schedule: "Tuesday, October 20, 2026 (3:00 PM - 4:00 PM)",
  proctor: "Ferlene Rubin / Layzon Briones",
  examFormat: {
    types: [
      "Multiple Choice",
      "Identification",
      "Network Classification & Drag-Drop Sorting"
    ],
    coverage: "Security Principles, Access Control Models, Network Architectures (PAN/LAN/WAN), SysAdmin & NetAdmin Core Tools, and Unix vs. Linux"
  },
  topics: [
    {
      unitId: "elect3-u1",
      unitTitle: "Unit 1: Principles of Security & Access Control Models",
      summary: "CIA Triad, Authentication, Authorization, Non-repudiation, Privacy, and Access Control architectures (DAC, MAC, RBAC, ABAC, Zero Trust).",
      cards: [
        {
          id: "elect3-c1",
          title: "The Core Security Principles & The CIA Triad",
          category: "Security Principles",
          badge: "Verbatim Definitions",
          content: "The fundamental pillars of cybersecurity:",
          keyPoints: [
            "• **Confidentiality:** The principle of keeping data secret and protecting it from being viewed by unauthorized individuals.",
            "• **Integrity:** The principle of ensuring data is accurate, complete, and has not been improperly modified or destroyed.",
            "• **Availability:** The principle of ensuring that authorized users can access systems and data whenever they are needed.",
            "• **Authentication:** The process of verifying the identity of a user or system (e.g., checking a password, biometric, or MFA token).",
            "• **Authorization:** The process of granting specific permissions or access rights to an authenticated user for a resource.",
            "• **Accountability / Non-repudiation:** Ensuring that all actions taken within a system can be traced back to a specific entity, making denial impossible.",
            "• **Privacy:** The right of individuals to control how their personal and sensitive information is collected, used, and shared."
          ]
        },
        {
          id: "elect3-c2",
          title: "Access Control Models: DAC, MAC, RBAC, ABAC & Zero Trust",
          category: "Access Control",
          badge: "Core Framework",
          content: "Rule sets enforcing authorization across operating systems and enterprise networks:",
          keyPoints: [
            "1. **DAC (Discretionary Access Control):** The owner of a resource (like a file) gets to decide who can access it and what permissions they have (standard Unix/Windows file permissions).",
            "2. **MAC (Mandatory Access Control):** Access is strictly based on fixed security classification levels (e.g., Top Secret, Secret, Confidential) assigned by a central authority.",
            "3. **RBAC (Role-Based Access Control):** Access permissions are grouped by the job function or role of the user (e.g., 'Accountant', 'HR Manager', 'System Admin'), rather than individual identity.",
            "4. **ABAC (Attribute-Based Access Control):** Access is granted based on dynamic attributes of the user, resource, action, and environment (e.g., 'Allow access only if user is in HR and connection time is 9:00 AM to 5:00 PM within office IP').",
            "5. **Zero Trust:** Assumes NO user or device—inside or outside the network boundary—is trusted by default. Every single access attempt must be authenticated, authorized, and encrypted."
          ]
        },
        {
          id: "elect3-c3",
          title: "Security Frameworks, BCDR & Operational Practices",
          category: "Security Management",
          badge: "Best Practices",
          content: "Policies, incident response, disaster recovery, and operational testing tools:",
          keyPoints: [
            "• **Policies vs. Procedures:** *Policies* are high-level rules defining what must be done; *Procedures* are detailed step-by-step instructions on how to do it.",
            "• **BCDR (Business Continuity & Disaster Recovery):** *Business Continuity (BC)* keeps core business operations functioning during a crisis; *Disaster Recovery (DR)* focuses on fully restoring IT infrastructure after a major disaster.",
            "• **IDS vs. IPS:** *Intrusion Detection System (IDS)* detects and alerts on attacks; *Intrusion Prevention System (IPS)* detects and automatically blocks attacks in real-time.",
            "• **Vulnerability Assessment vs. Penetration Testing:** *Vulnerability Assessment* scans for known flaws; *Penetration Testing (Pen Test)* actively simulates real cyberattacks to exploit weaknesses."
          ]
        }
      ]
    },
    {
      unitId: "elect3-u2",
      unitTitle: "Unit 2: Network Topologies & Network Administration",
      summary: "PAN vs. LAN vs. WAN classifications, networking trade-offs, IP addressing, subnetting, DNS, DHCP, and traffic diagnostics.",
      cards: [
        {
          id: "elect3-c4",
          title: "Network Categories: PAN vs. LAN vs. WAN",
          category: "Network Topologies",
          badge: "Drag-and-Drop Classification",
          content: "Classification of networks by geographic scale:",
          keyPoints: [
            "**PAN (Personal Area Network):**\n• Used within a very small area (usually on a person or vehicle) with typical range of ~10 meters via Bluetooth.\n• *Examples:* Smartwatches, wireless headphones, wireless mice/keyboards, in-car entertainment systems.",
            "**LAN (Local Area Network):**\n• Used within a small geographical area, typically limited to a single building or room, using Ethernet or Wi-Fi.\n• *Examples:* Home Wi-Fi networks, school and university computer laboratories, office business networks.",
            "**WAN (Wide Area Network):**\n• Spread across a large geographical area, often an entire country, continent, or globally via undersea fiber cables.\n• *Examples:* The Internet, national mobile cellular networks (4G/5G), global banking networks (SWIFT)."
          ]
        },
        {
          id: "elect3-c5",
          title: "Network Administration Protocols & Diagnostic Utilities",
          category: "Network Protocols",
          badge: "NetAdmin Arsenal",
          content: "Protocols and diagnostic tools essential for network administration:",
          keyPoints: [
            "• **IP Address:** Unique numerical identifier (IPv4: 32-bit `192.168.1.1`; IPv6: 128-bit `::1`).",
            "• **Subnetting:** Dividing a physical network into smaller logical sub-networks to improve performance and traffic isolation.",
            "• **DNS (Domain Name System):** Resolves human-readable domain names (`google.com`) into routable IP addresses.",
            "• **DHCP (Dynamic Host Configuration Protocol):** Automatically leases and assigns IP addresses, subnet masks, and gateways to network clients.",
            "• **MAC Address:** Hardware-level physical address burned into the Network Interface Card (NIC).",
            "• **Diagnostic Commands:** `ping` (tests round-trip reachability using ICMP), `traceroute` / `tracert` (maps the hop-by-hop packet path across routers to destination)."
          ]
        }
      ]
    },
    {
      unitId: "elect3-u3",
      unitTitle: "Unit 3: Operating System Types, SysAdmin & Unix vs. Linux",
      summary: "Kernel and process management, file systems, superuser permissions, real-time operating systems, and historical Unix vs Linux comparison.",
      cards: [
        {
          id: "elect3-c6",
          title: "Operating System Architecture & Administration",
          category: "System Administration",
          badge: "SysAdmin Core",
          content: "Operating system internals and core administration concepts:",
          keyPoints: [
            "• **Kernel:** The foundational core of the OS that directly interacts with CPU hardware, memory, and device drivers.",
            "• **Process Management:** Handling active execution threads, CPU scheduling, prioritization, and time-slicing.",
            "• **File Systems:** Storage structures organizing files on disk (e.g., Windows: **NTFS, FAT32**; Linux: **ext4, btrfs**).",
            "• **Root (Superuser):** The highest administrative privilege level in Unix/Linux with unrestricted access to all system files and commands.",
            "• **Virtualization:** Abstracting physical server hardware into multiple isolated virtual machines using hypervisors (VMware, Hyper-V, KVM)."
          ]
        },
        {
          id: "elect3-c7",
          title: "Types of Operating Systems & RTOS",
          category: "OS Types",
          badge: "Taxonomy",
          content: "The 5 primary operating system operational modes:",
          keyPoints: [
            "1. **Single-User OS:** Supports only one user at a time with no concurrent account isolation.",
            "2. **Multi-User OS:** Allows multiple simultaneous or remote users via time-sharing and strict permission boundaries.",
            "3. **Multitasking OS:** Concurrently executes multiple active programs using CPU time-slicing.",
            "4. **Distributed OS:** Manages a cluster of independent networked machines, presenting them as a single unified system.",
            "5. **Real-Time OS (RTOS):** Operates under strict, deterministic time constraints. In an RTOS, **predictability is more important than raw speed!**"
          ],
          examTrap: "Remember the verbatim rule for RTOS: 'Predictability is more important than raw speed!'"
        },
        {
          id: "elect3-c8",
          title: "Unix vs. Linux: History & Architectural Comparison",
          category: "Unix/Linux",
          badge: "Verbatim Slide Comparison",
          content: "Complete breakdown of origins, licensing, and usage between Unix and Linux:",
          keyPoints: [
            "**Unix:**\n• *Origin:* Developed in **1969 at AT&T’s Bell Labs** by **Ken Thompson & Dennis Ritchie**.\n• *Licensing:* **Proprietary** (commercial distributions owned by IBM [AIX], HP [HP-UX], Oracle [Solaris]).\n• *Usage:* Large financial enterprises, telecommunications backbones, and legacy research institutions.\n• *Hardware:* Built for specialized, proprietary server architectures (IBM, HP machines).",
            "**Linux:**\n• *Origin:* Created in **1991 by Linus Torvalds** as a free alternative to Unix.\n• *Licensing:* **Open-source** and community-driven (GPL license).\n• *Usage:* Ubiquitous — cloud servers, personal desktops, Android mobile devices, supercomputers, IoT.\n• *Hardware:* Highly portable; runs on almost any hardware architecture (x86, ARM, RISC-V, Raspberry Pi)."
          ]
        }
      ]
    }
  ],
  flashcards: [
    {
      id: "elect3-fc1",
      question: "What are the verbatim definitions of the CIA Triad principles?",
      answer: "• Confidentiality: Keeping data secret and protecting it from unauthorized viewing.\n• Integrity: Ensuring data is accurate, complete, and not improperly modified or destroyed.\n• Availability: Ensuring authorized users can access systems and data whenever needed.",
      category: "Security Principles"
    },
    {
      id: "elect3-fc2",
      question: "Distinguish between Authentication and Authorization.",
      answer: "Authentication verifies the identity of a user or system (e.g., passwords, biometrics, MFA). Authorization grants specific permissions or access rights to an authenticated user for a resource.",
      category: "Security Principles"
    },
    {
      id: "elect3-fc3",
      question: "What is Accountability / Non-repudiation?",
      answer: "Ensuring that all actions taken within a system can be traced back to a specific entity, making denial of the action impossible.",
      category: "Security Principles"
    },
    {
      id: "elect3-fc4",
      question: "What is the core premise of DAC (Discretionary Access Control)?",
      answer: "The owner of a resource (like a file) gets to decide who can access it and what permissions they have.",
      category: "Access Control"
    },
    {
      id: "elect3-fc5",
      question: "What is MAC (Mandatory Access Control)?",
      answer: "Access is strictly based on a fixed security classification level (e.g., Top Secret, Confidential) assigned by a central authority.",
      category: "Access Control"
    },
    {
      id: "elect3-fc6",
      question: "What is RBAC (Role-Based Access Control)?",
      answer: "Access permissions are grouped by the job function or role of the user (e.g., 'Accountant', 'HR Manager'), rather than individual identity.",
      category: "Access Control"
    },
    {
      id: "elect3-fc7",
      question: "What is ABAC (Attribute-Based Access Control)?",
      answer: "Access is granted based on a combination of characteristics (attributes) regarding the user, the resource, and the environment (e.g., user is HR and time is 9am-5pm on internal IP).",
      category: "Access Control"
    },
    {
      id: "elect3-fc8",
      question: "What is the Zero Trust security model?",
      answer: "A security model that assumes no user or device, inside or outside the network, is trusted by default; every access attempt must be verified.",
      category: "Access Control"
    },
    {
      id: "elect3-fc9",
      question: "What is the difference between Security Policies and Security Procedures?",
      answer: "Policies are high-level rules defining WHAT must be done; Procedures are detailed, step-by-step instructions for HOW to do it.",
      category: "Policies & Standards"
    },
    {
      id: "elect3-fc10",
      question: "What is the distinction between Business Continuity (BC) and Disaster Recovery (DR)?",
      answer: "Business Continuity keeps core business functions running during an active crisis; Disaster Recovery focuses on fully restoring IT systems and data after a major disaster.",
      category: "BCDR"
    },
    {
      id: "elect3-fc11",
      question: "Distinguish between Vulnerability Assessment and Penetration Testing.",
      answer: "Vulnerability Assessment scans systems to identify flaws/weaknesses. Penetration Testing involves authorized security experts actively simulating a real cyberattack to exploit weaknesses.",
      category: "Security Practices"
    },
    {
      id: "elect3-fc12",
      question: "What is the difference between an IDS and an IPS?",
      answer: "An Intrusion Detection System (IDS) alerts administrators when a potential attack occurs; an Intrusion Prevention System (IPS) automatically blocks the attack in real-time.",
      category: "Security Practices"
    },
    {
      id: "elect3-fc13",
      question: "What are the range, connection type, and examples of a PAN (Personal Area Network)?",
      answer: "Range: ~10 meters using Bluetooth on a person or vehicle. Examples: smartwatches, wireless headphones, wireless mice/keyboards, and in-car systems.",
      category: "Networks"
    },
    {
      id: "elect3-fc14",
      question: "What are the scope and examples of a LAN and a WAN?",
      answer: "• LAN: Small geographical area limited to one building (home networks, schools, offices; Ethernet/Wi-Fi).\n• WAN: Large geographical area across a country or globally (the Internet, mobile cellular networks, banking SWIFT).",
      category: "Networks"
    },
    {
      id: "elect3-fc15",
      question: "In System Administration, what is the Kernel?",
      answer: "The core component of an operating system that interacts directly with physical hardware.",
      category: "System Administration"
    },
    {
      id: "elect3-fc16",
      question: "What is Root (Superuser) in Unix/Linux systems?",
      answer: "The highest privilege level in Unix/Linux systems that allows full, unrestricted administrative control over the entire system.",
      category: "System Administration"
    },
    {
      id: "elect3-fc17",
      question: "Distinguish DNS and DHCP in network administration.",
      answer: "DNS (Domain Name System) translates domain names (e.g., google.com) into IP addresses. DHCP (Dynamic Host Configuration Protocol) automatically leases and assigns IP addresses to network devices.",
      category: "Network Administration"
    },
    {
      id: "elect3-fc18",
      question: "What is a MAC Address?",
      answer: "Media Access Control Address—a unique hardware identifier permanently assigned to a Network Interface Card (NIC).",
      category: "Network Administration"
    },
    {
      id: "elect3-fc19",
      question: "What is the function of Ping and Traceroute?",
      answer: "• Ping: Checks network connectivity and latency between devices using ICMP echo.\n• Traceroute: Maps the hop-by-hop router path that data packets take to reach a destination.",
      category: "Network Administration"
    },
    {
      id: "elect3-fc20",
      question: "What is the core principle of a Real-Time Operating System (RTOS)?",
      answer: "An RTOS processes data and responds within strict time constraints. In an RTOS, PREDICTABILITY is more important than raw speed!",
      category: "Operating Systems"
    },
    {
      id: "elect3-fc21",
      question: "What are the historical origins and developers of Unix and Linux?",
      answer: "• Unix: Developed in 1969 at AT&T's Bell Labs by Ken Thompson & Dennis Ritchie (Proprietary).\n• Linux: Created in 1991 by Linus Torvalds as a free, open-source alternative.",
      category: "Unix/Linux"
    },
    {
      id: "elect3-fc22",
      question: "Compare the hardware support and usage of Unix vs. Linux.",
      answer: "• Unix: Proprietary, built for specific enterprise hardware (IBM, HP), used in banking, telecom, and research.\n• Linux: Open-source, runs on virtually any hardware (PCs, Raspberry Pi, cloud servers, Android, supercomputers).",
      category: "Unix/Linux"
    },
    {
      id: "elect3-fc23",
      question: "What is a Cron Job in Unix/Linux environments?",
      answer: "A scheduled background task that executes commands or scripts automatically at specified intervals.",
      category: "Automation"
    },
    {
      id: "elect3-fc24",
      question: "What are ISO 27001 and GDPR in IT compliance standards?",
      answer: "• ISO 27001: A global standard for Information Security Management Systems (ISMS).\n• GDPR: A European Union regulation protecting personal data and privacy.",
      category: "Compliance & Standards"
    },
    {
      id: "elect3-fc25",
      question: "What is the function of a Proxy Server and a VPN?",
      answer: "• Proxy Server: An intermediary between users and the internet that enhances security and anonymity.\n• VPN (Virtual Private Network): A secure connection that encrypts internet traffic across untrusted networks to protect privacy.",
      category: "Network Administration"
    },
    {
      id: "elect3-fc26",
      question: "What are the 5 types of Operating Systems discussed in Module 3?",
      answer: "1. Single-user OS\n2. Multi-user OS\n3. Multitasking OS\n4. Distributed OS\n5. Real-time OS (RTOS)",
      category: "Operating Systems"
    }
  ],
  mockQuestions: [
    {
      id: "elect3-mq1",
      question: "A company grants access to payroll databases based on the rule: 'Allow access only if the user is in Accounting and accessing during business hours from an office IP'. This is an example of:",
      options: [
        "DAC (Discretionary Access Control)",
        "MAC (Mandatory Access Control)",
        "ABAC (Attribute-Based Access Control)",
        "Single-User Access"
      ],
      correctAnswer: 2,
      explanation: "ABAC grants access based on dynamic attributes of the user, resource, action, and environment (time, department, location).",
      category: "Access Control"
    },
    {
      id: "elect3-mq2",
      question: "Which network type connects devices across a person or vehicle within a range of approximately 10 meters using Bluetooth?",
      options: [
        "LAN",
        "PAN",
        "WAN",
        "MAN"
      ],
      correctAnswer: 1,
      explanation: "A Personal Area Network (PAN) operates within a small personal zone (e.g., smartwatches, wireless headsets).",
      category: "Networks"
    },
    {
      id: "elect3-mq3",
      question: "What is the primary operational distinction between Unix and Linux?",
      options: [
        "Unix is open-source while Linux is proprietary.",
        "Unix was developed in 1969 as a proprietary system; Linux was created in 1991 by Linus Torvalds as a free, open-source OS.",
        "Unix only runs on microcontrollers; Linux only runs on mainframes.",
        "There is no difference; they are identical kernels."
      ],
      correctAnswer: 1,
      explanation: "Unix was developed in 1969 at Bell Labs and became proprietary. Linux was created in 1991 as an open-source alternative running on universal hardware.",
      category: "Unix/Linux"
    },
    {
      id: "elect3-mq4",
      question: "Which of the following describes Business Continuity (BC) as opposed to Disaster Recovery (DR)?",
      options: [
        "BC restores database backups from tape drives after hardware failure.",
        "BC keeps core business operations running during an active crisis; DR focuses on restoring IT systems after a disaster.",
        "BC is an IDS tool; DR is an IPS tool.",
        "BC is restricted to hardware testing."
      ],
      correctAnswer: 1,
      explanation: "Business Continuity ensures vital business operations continue uninterrupted during a disruption; Disaster Recovery restores data and IT systems post-event.",
      category: "BCDR"
    },
    {
      id: "elect3-mq5",
      question: "Which network diagnostic command uses ICMP echo requests to verify round-trip connectivity between two devices?",
      options: [
        "Traceroute",
        "Ping",
        "DNS",
        "DHCP"
      ],
      correctAnswer: 1,
      explanation: "Ping sends ICMP echo requests to verify end-to-end network connectivity and measure round-trip latency.",
      category: "NetAdmin"
    },
    {
      id: "elect3-mq6",
      question: "The security principle ensuring that data is accurate, complete, and protected against improper modification is:",
      options: [
        "Confidentiality",
        "Integrity",
        "Availability",
        "Non-repudiation"
      ],
      correctAnswer: 1,
      explanation: "Integrity guarantees that data has not been altered, tampered with, or corrupted in transit or storage.",
      category: "Security Principles"
    },
    {
      id: "elect3-mq7",
      question: "Which access control model relies on a central authority assigning fixed security labels such as 'Top Secret' and 'Confidential'?",
      options: [
        "DAC (Discretionary Access Control)",
        "MAC (Mandatory Access Control)",
        "RBAC (Role-Based Access Control)",
        "Zero Trust"
      ],
      correctAnswer: 1,
      explanation: "Mandatory Access Control (MAC) enforces access based on strict classification levels set by a central administrator.",
      category: "Access Control"
    },
    {
      id: "elect3-mq8",
      question: "What security concept assumes that no entity inside or outside the network is inherently safe, requiring every request to be verified?",
      options: [
        "Single Sign-On",
        "Zero Trust",
        "Discretionary Access",
        "Distributed Computing"
      ],
      correctAnswer: 1,
      explanation: "Zero Trust operates on the principle of 'never trust, always verify', inspecting every transaction regardless of network location.",
      category: "Access Control"
    },
    {
      id: "elect3-mq9",
      question: "Which system administration component serves as the foundational core of the OS that directly communicates with hardware?",
      options: [
        "Shell",
        "Kernel",
        "Virtualization Layer",
        "Process Scheduler"
      ],
      correctAnswer: 1,
      explanation: "The Kernel is the heart of an operating system, interfacing directly with hardware components and device controllers.",
      category: "System Administration"
    },
    {
      id: "elect3-mq10",
      question: "What is the highest privilege account level in Unix and Linux systems with full administrative access?",
      options: [
        "Administrator",
        "Wheel",
        "Root (Superuser)",
        "Supervisor"
      ],
      correctAnswer: 2,
      explanation: "Root is the superuser account possessing unrestricted permissions across Unix/Linux systems.",
      category: "System Administration"
    },
    {
      id: "elect3-mq11",
      question: "Which protocol translates human-readable domain names like 'dlsp.edu.ph' into routable IP addresses?",
      options: [
        "DHCP",
        "DNS",
        "LDAP",
        "SSL/TLS"
      ],
      correctAnswer: 1,
      explanation: "DNS (Domain Name System) resolves alphanumeric web domain names into IP addresses.",
      category: "Network Administration"
    },
    {
      id: "elect3-mq12",
      question: "Which protocol automatically leases and configures IP addresses and default gateways for client devices on a local network?",
      options: [
        "DNS",
        "DHCP",
        "SNMP",
        "BGP"
      ],
      correctAnswer: 1,
      explanation: "DHCP (Dynamic Host Configuration Protocol) assigns dynamic IP configurations automatically.",
      category: "Network Administration"
    },
    {
      id: "elect3-mq13",
      question: "In Real-Time Operating Systems (RTOS), what is considered more critical than raw throughput speed?",
      options: [
        "Cost reduction",
        "Predictability",
        "User interface richness",
        "Virtualization support"
      ],
      correctAnswer: 1,
      explanation: "The slide explicitly highlights: 'In an RTOS, predictability is more important than raw speed.'",
      category: "Operating Systems"
    },
    {
      id: "elect3-mq14",
      question: "In Unix/Linux, who were the original creators of Unix at AT&T Bell Labs in 1969?",
      options: [
        "Linus Torvalds & Richard Stallman",
        "Ken Thompson & Dennis Ritchie",
        "Steve Wozniak & Bill Gates",
        "Ada Lovelace & Charles Babbage"
      ],
      correctAnswer: 1,
      explanation: "Ken Thompson and Dennis Ritchie developed Unix at AT&T's Bell Labs in 1969.",
      category: "Unix/Linux"
    },
    {
      id: "elect3-mq15",
      question: "Which of the following is a scheduled background task utility in Unix/Linux systems?",
      options: [
        "Ansible",
        "Cron Job",
        "PowerShell",
        "Active Directory"
      ],
      correctAnswer: 1,
      explanation: "Cron is the time-based job scheduler in Unix-like operating systems that runs tasks at specified times.",
      category: "Automation"
    },
    {
      id: "elect3-mq16",
      question: "What is the key functional difference between an IDS and an IPS?",
      options: [
        "IDS blocks attacks while IPS only logs alerts",
        "IDS alerts on suspicious traffic; IPS automatically blocks the attack in real-time",
        "IDS operates on hardware; IPS only operates in the cloud",
        "IDS is for PAN; IPS is for WAN"
      ],
      correctAnswer: 1,
      explanation: "An IDS detects and notifies; an IPS detects and actively blocks malicious traffic inline.",
      category: "Security Practices"
    },
    {
      id: "elect3-mq17",
      question: "Which of the following security practices actively simulates real-world cyberattacks by authorized experts to exploit vulnerabilities?",
      options: [
        "Vulnerability Assessment",
        "Patch Management",
        "Penetration Testing (Pen Test)",
        "Security Awareness Training"
      ],
      correctAnswer: 2,
      explanation: "Penetration Testing actively attempts to compromise systems to expose exploitable flaws.",
      category: "Security Practices"
    },
    {
      id: "elect3-mq18",
      question: "What global standard defines the benchmark framework for Information Security Management Systems (ISMS)?",
      options: [
        "ITIL",
        "ISO 27001",
        "GDPR",
        "SOC 2"
      ],
      correctAnswer: 1,
      explanation: "ISO 27001 is the international standard specifying requirements for establishing an ISMS.",
      category: "Compliance & Standards"
    },
    {
      id: "elect3-mq19",
      question: "Which network diagnostic utility maps the complete path of intermediate routers that data packets traverse to reach a remote server?",
      options: [
        "Ping",
        "Traceroute",
        "Netstat",
        "Arp"
      ],
      correctAnswer: 1,
      explanation: "Traceroute displays each router hop and latency along the path to the destination.",
      category: "Network Administration"
    },
    {
      id: "elect3-mq20",
      question: "Which type of operating system manages a group of independent computers and presents them to users as a single unified system?",
      options: [
        "Single-user OS",
        "Multi-user OS",
        "Distributed OS",
        "Real-Time OS"
      ],
      correctAnswer: 2,
      explanation: "A Distributed OS aggregates resources across independent network nodes to appear as a single computing entity.",
      category: "Operating Systems"
    },
    {
      id: "elect3-mq21",
      question: "Which security principle guarantees that a user cannot deny having performed an action or transaction on a system?",
      options: [
        "Accountability / Non-repudiation",
        "Confidentiality",
        "Authorization",
        "Privacy"
      ],
      correctAnswer: 0,
      explanation: "Non-repudiation provides indisputable cryptographic or audit trail proof of the origin and integrity of actions.",
      category: "Security Principles"
    },
    {
      id: "elect3-mq22",
      question: "Under the lecture classification, smartwatches, wireless mice, and in-car Bluetooth systems belong to which network category?",
      options: [
        "WAN",
        "LAN",
        "PAN",
        "MAN"
      ],
      correctAnswer: 2,
      explanation: "Personal Area Networks (PAN) cover personal-range devices within approximately 10 meters via Bluetooth.",
      category: "Networks"
    },
    {
      id: "elect3-mq23",
      question: "In access control, assigning permissions to all employees in the 'Accounting Department' rather than individuals is an example of:",
      options: [
        "DAC",
        "MAC",
        "RBAC",
        "ABAC"
      ],
      correctAnswer: 2,
      explanation: "Role-Based Access Control (RBAC) groups permissions by organizational job function or role.",
      category: "Access Control"
    },
    {
      id: "elect3-mq24",
      question: "Which of the following is a European Union regulatory framework governing user data protection and privacy?",
      options: [
        "ISO 27001",
        "ITIL",
        "GDPR",
        "NIST"
      ],
      correctAnswer: 2,
      explanation: "GDPR (General Data Protection Regulation) is the EU regulation protecting individual privacy rights.",
      category: "Compliance & Standards"
    },
    {
      id: "elect3-mq25",
      question: "Which tool encrypts all internet traffic to provide private, secure communication over untrusted public networks?",
      options: [
        "Proxy Server",
        "VPN (Virtual Private Network)",
        "DNS",
        "DHCP"
      ],
      correctAnswer: 1,
      explanation: "A Virtual Private Network (VPN) creates an encrypted tunnel to protect data privacy over public networks.",
      category: "Network Administration"
    }
  ],
  cramNotes: [
    "CIA Triad: Confidentiality (secrecy), Integrity (accuracy), Availability (accessibility).",
    "Access Control: DAC (owner decides), MAC (classification labels), RBAC (job roles), ABAC (attributes), Zero Trust (never trust, always verify).",
    "Security: IDS alerts; IPS blocks. Pen Test simulates real attack; Vuln Scan checks known CVEs.",
    "BCDR: BC keeps core business running; DR restores IT infrastructure.",
    "Networks: PAN (~10m, Bluetooth, smartwatches), LAN (building, Ethernet), WAN (country/global, Internet).",
    "Protocols: DNS (names -> IP), DHCP (auto-assigns IP), MAC (physical NIC address).",
    "Diagnostic: ping (reachability test), traceroute (packet path mapping).",
    "OS Types: Single-user, Multi-user, Multitasking, Distributed, RTOS (predictability > speed).",
    "Unix (1969, Bell Labs, Ken Thompson & Dennis Ritchie, proprietary) vs Linux (1991, Linus Torvalds, open-source, universal)."
  ]
};
