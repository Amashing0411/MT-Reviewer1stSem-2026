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
      "Scenario-Based Multiple Choice",
      "Network Subnetting & Protocol Diagnostics",
      "Access Control Architecture Analysis",
      "SysAdmin Troubleshooting & Linux CLI Scenarios"
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
            "1. **DAC (Discretionary Access Control):** The owner of a resource (like a file) gets to decide who can access it and what permissions they have (standard Unix `chmod` / Windows NTFS ACLs).",
            "2. **MAC (Mandatory Access Control):** Access is strictly based on fixed security classification levels (Top Secret, Secret, Confidential) assigned by a central authority. SELinux enforces MAC; even root cannot violate MAC rules!",
            "3. **RBAC (Role-Based Access Control):** Access permissions are grouped by the job function or role of the user (e.g., 'Accountant', 'HR Manager', 'System Admin'), rather than individual identity.",
            "4. **ABAC (Attribute-Based Access Control):** Access is granted based on dynamic attributes of the user, resource, action, and environment (e.g., 'Allow access only if user is in HR and connection time is 9:00 AM to 5:00 PM within office IP').",
            "5. **Zero Trust:** Assumes NO user or device—inside or outside the network boundary—is trusted by default. Every single access attempt must be authenticated, authorized, and encrypted ('Never trust, always verify')."
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
            "• **Metrics:** *RTO (Recovery Time Objective)* = maximum acceptable downtime duration; *RPO (Recovery Point Objective)* = maximum acceptable data loss in elapsed time.",
            "• **IDS vs. IPS:** *Intrusion Detection System (IDS)* detects and alerts on attacks via passive tap/mirror port; *Intrusion Prevention System (IPS)* detects and automatically blocks attacks inline in real-time.",
            "• **Vulnerability Assessment vs. Penetration Testing:** *Vulnerability Assessment* scans for known flaws/CVEs; *Penetration Testing (Pen Test)* actively simulates real cyberattacks to exploit weaknesses."
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
          badge: "Classification",
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
            "• **IP Address:** Unique numerical identifier (IPv4: 32-bit `192.168.1.1`; IPv6: 128-bit `2001:db8::1`).",
            "• **Subnetting:** Dividing a physical network into smaller logical sub-networks; usable hosts = $2^{(32 - \\text{prefix})} - 2$.",
            "• **DNS (Domain Name System):** Resolves human-readable domain names (`google.com`) into routable IP addresses (A, AAAA, CNAME, MX, PTR).",
            "• **DHCP (Dynamic Host Configuration Protocol):** Automatically leases and assigns IP addresses via 4-step DORA handshake (Discover, Offer, Request, Acknowledge). If DHCP fails, OS assigns APIPA (`169.254.x.x`).",
            "• **MAC Address:** Hardware-level physical address burned into the Network Interface Card (NIC) at Layer 2.",
            "• **Diagnostic Commands:** `ping` (tests round-trip reachability using ICMP), `traceroute` / `tracert` (maps hop-by-hop packet path across routers to destination)."
          ]
        }
      ]
    },
    {
      unitId: "elect3-u3",
      unitTitle: "Unit 3: Operating System Types, SysAdmin, Unix vs. Linux & DevOps",
      summary: "Kernel and process management, file systems, superuser permissions, real-time operating systems, Unix vs Linux, and automation.",
      cards: [
        {
          id: "elect3-c6",
          title: "Operating System Architecture & Administration",
          category: "System Administration",
          badge: "SysAdmin Core",
          content: "Operating system internals and core administration concepts:",
          keyPoints: [
            "• **Kernel:** The foundational core of the OS that directly interacts with CPU hardware, memory, and device drivers (Monolithic vs Microkernel; LKMs allow dynamic driver loading without reboot).",
            "• **Process Management:** Handling active execution threads, CPU scheduling, prioritization, and signals (`SIGTERM` 15 graceful request vs `SIGKILL` 9 uncatchable kill; Zombie processes occur when parent fails to `wait()`).",
            "• **File Systems:** Storage structures organizing files on disk (Windows: **NTFS, FAT32**; Linux: **ext4, btrfs**; Octal permissions `chmod 750`).",
            "• **Root (Superuser):** The highest administrative privilege level (UID 0) in Unix/Linux with unrestricted access.",
            "• **Virtualization:** Abstracting physical server hardware into multiple isolated virtual machines using Type 1 (bare-metal) or Type 2 hypervisors."
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
        },
        {
          id: "elect3-c9",
          title: "DevOps, Automation & Compliance Standards",
          category: "DevOps & Standards",
          badge: "Industry Standards",
          content: "Automation utilities and global regulatory frameworks:",
          keyPoints: [
            "• **Cron Scheduling:** Time-based scheduler (`min hour day month weekday command`; e.g., `30 2 * * 1-5` = 2:30 AM Mon-Fri).",
            "• **Ansible:** Declarative, agentless configuration management automating server setups over SSH.",
            "• **ISO 27001:** Global standard specifying benchmark requirements for an Information Security Management System (ISMS).",
            "• **GDPR:** EU regulation protecting individual privacy rights (consent, 'Right to be Forgotten').",
            "• **SOC 2 & ITIL:** SOC 2 validates cloud service trust criteria (Security, Availability); ITIL governs IT service delivery."
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
      answer: "Access is strictly based on a fixed security classification level (e.g., Top Secret, Confidential) assigned by a central authority. SELinux enforces MAC; even root cannot violate it.",
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
      answer: "Access is granted based on dynamic attributes of user, resource, action, and environment (e.g., user is HR and time is 9am-5pm on internal IP).",
      category: "Access Control"
    },
    {
      id: "elect3-fc8",
      question: "What is the Zero Trust security model?",
      answer: "A security model that assumes no user or device, inside or outside the network, is trusted by default; every access attempt must be verified ('Never trust, always verify').",
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
      answer: "The highest privilege level in Unix/Linux systems (UID 0) that allows full, unrestricted administrative control over the entire system.",
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
      question: "What is the crucial rule governing Real-Time Operating Systems (RTOS)?",
      answer: "In an RTOS, predictability is more important than raw speed!",
      category: "Operating Systems"
    },
    {
      id: "elect3-fc19",
      question: "Compare the historical origin and licensing of Unix vs. Linux.",
      answer: "Unix: Developed in 1969 at Bell Labs by Ken Thompson & Dennis Ritchie; proprietary commercial OS. Linux: Created in 1991 by Linus Torvalds; open-source GPL license.",
      category: "Unix/Linux"
    },
    {
      id: "elect3-fc20",
      question: "What are RTO and RPO in Disaster Recovery?",
      answer: "• RTO (Recovery Time Objective): Maximum allowable duration of system downtime.\n• RPO (Recovery Point Objective): Maximum allowable age of data that can be lost in elapsed time.",
      category: "BCDR"
    }
  ],
  mockQuestions: [
      {
          "id": "elect3-mq1",
          "question": "True or False: In the CIA Triad, Integrity refers to ensuring that authorized users have timely and reliable access to systems and information whenever needed.",
          "options": [
              "True",
              "False"
          ],
          "correctAnswer": 1,
          "explanation": "**False.** That is the definition of Availability. Integrity ensures that data remains accurate, complete, and protected against unauthorized modification or deletion.",
          "category": "Security Principles"
      },
      {
          "id": "elect3-mq2",
          "question": "True or False: In Mandatory Access Control (MAC), access permissions are determined centrally based on fixed security classifications, and cannot be modified by the resource owner.",
          "options": [
              "True",
              "False"
          ],
          "correctAnswer": 0,
          "explanation": "**True.** In MAC (such as SELinux), security labels and classifications are centrally mandated. Resource owners cannot override or grant access contrary to central security policy.",
          "category": "Access Control"
      },
      {
          "id": "elect3-mq3",
          "question": "True or False: The Zero Trust security architecture operates under the core principle 'Never trust, always verify', treating all network traffic as untrusted by default.",
          "options": [
              "True",
              "False"
          ],
          "correctAnswer": 0,
          "explanation": "**True.** Zero Trust assumes threats exist both inside and outside the network perimeter. Every user, device, and request must be explicitly authenticated, authorized, and encrypted.",
          "category": "Access Control"
      },
      {
          "id": "elect3-mq4",
          "question": "True or False: A Personal Area Network (PAN) typically spans a radius of up to 10 kilometers using microwave radio links.",
          "options": [
              "True",
              "False"
          ],
          "correctAnswer": 1,
          "explanation": "**False.** A PAN typically operates within a personal workspace range of approximately 10 meters, commonly utilizing Bluetooth or Zigbee (e.g., smartwatches, wireless earphones).",
          "category": "Network Topologies"
      },
      {
          "id": "elect3-mq5",
          "question": "True or False: An Intrusion Prevention System (IPS) operates inline with network traffic and can actively drop malicious packets in real time.",
          "options": [
              "True",
              "False"
          ],
          "correctAnswer": 0,
          "explanation": "**True.** Unlike a passive IDS that only detects and alerts via a mirror port, an IPS sits inline in the traffic path to actively detect, block, and drop malicious traffic as it arrives.",
          "category": "Security Management"
      },
      {
          "id": "elect3-mq6",
          "question": "True or False: In Linux, process signal SIGKILL (signal 9) can be caught, handled, or ignored by an unprivileged user process.",
          "options": [
              "True",
              "False"
          ],
          "correctAnswer": 1,
          "explanation": "**False.** SIGKILL (9) and SIGSTOP (19) cannot be caught, blocked, or ignored by any process. Only SIGTERM (15) can be caught and handled gracefully.",
          "category": "System Administration"
      },
      {
          "id": "elect3-mq7",
          "question": "True or False: In a Real-Time Operating System (RTOS), predictability and deterministic timing are more critical than raw throughput speed.",
          "options": [
              "True",
              "False"
          ],
          "correctAnswer": 0,
          "explanation": "**True.** The defining hallmark of an RTOS is determinism. Executing tasks within strict, guaranteed deadlines is more vital than raw computing throughput.",
          "category": "OS Types"
      },
      {
          "id": "elect3-mq8",
          "question": "True or False: Linux was originally created in 1991 by Linus Torvalds as a free, open-source kernel licensed under the GNU General Public License (GPL).",
          "options": [
              "True",
              "False"
          ],
          "correctAnswer": 0,
          "explanation": "**True.** Linus Torvalds created the Linux kernel in 1991 at the University of Helsinki as an open-source, GPL-licensed Unix-like operating system kernel.",
          "category": "Unix/Linux"
      },
      {
          "id": "elect3-mq9",
          "question": "True or False: Recovery Point Objective (RPO) measures the maximum acceptable elapsed duration of system downtime before IT services must be restored.",
          "options": [
              "True",
              "False"
          ],
          "correctAnswer": 1,
          "explanation": "**False.** That is Recovery Time Objective (RTO). Recovery Point Objective (RPO) measures the maximum acceptable age of data lost in elapsed time during an outage.",
          "category": "Security Management"
      },
      {
          "id": "elect3-mq10",
          "question": "True or False: The Linux octal permission 'chmod 755' grants the file owner read, write, and execute permissions, while group members and others receive read and execute permissions.",
          "options": [
              "True",
              "False"
          ],
          "correctAnswer": 0,
          "explanation": "**True.** 7 = 4+2+1 (rwx) for owner; 5 = 4+0+1 (r-x) for group; 5 = 4+0+1 (r-x) for others.",
          "category": "System Administration"
      },
      {
          "id": "elect3-mq11",
          "question": "Which security principle ensures that an individual or entity cannot deny having performed a specific transaction or system action?",
          "options": [
              "Confidentiality",
              "Non-repudiation (Accountability)",
              "Availability",
              "Authorization"
          ],
          "correctAnswer": 1,
          "explanation": "**Non-repudiation** provides undeniable proof of the origin, authenticity, and delivery of a message or action, making it impossible for the initiator to deny it.",
          "category": "Security Principles"
      },
      {
          "id": "elect3-mq12",
          "question": "Which access control model assigns access permissions based on an employee's job function and organizational responsibilities?",
          "options": [
              "Discretionary Access Control (DAC)",
              "Mandatory Access Control (MAC)",
              "Role-Based Access Control (RBAC)",
              "Attribute-Based Access Control (ABAC)"
          ],
          "correctAnswer": 2,
          "explanation": "**Role-Based Access Control (RBAC)** groups permissions by job roles (e.g., Doctor, Nurse, Auditor) rather than managing individual user accounts separately.",
          "category": "Access Control"
      },
      {
          "id": "elect3-mq13",
          "question": "What protocol automatically assigns IP addresses, subnet masks, and default gateways to client devices via the DORA handshake process?",
          "options": [
              "Domain Name System (DNS)",
              "Dynamic Host Configuration Protocol (DHCP)",
              "Simple Network Management Protocol (SNMP)",
              "Border Gateway Protocol (BGP)"
          ],
          "correctAnswer": 1,
          "explanation": "**DHCP (Dynamic Host Configuration Protocol)** dynamically allocates IP configuration via the 4-step DORA (Discover, Offer, Request, Acknowledge) sequence.",
          "category": "Network Protocols"
      },
      {
          "id": "elect3-mq14",
          "question": "Which network diagnostic command uses ICMP echo requests to determine round-trip latency and verify reachability to an IP host?",
          "options": [
              "traceroute",
              "ping",
              "netstat",
              "arp"
          ],
          "correctAnswer": 1,
          "explanation": "**ping** uses ICMP Echo Request and Echo Reply messages to verify network layer connectivity and measure round-trip response time.",
          "category": "Network Protocols"
      },
      {
          "id": "elect3-mq15",
          "question": "In what year and location was the original Unix operating system created by Ken Thompson and Dennis Ritchie?",
          "options": [
              "1969 at AT&T Bell Labs",
              "1976 at Xerox PARC",
              "1983 at UC Berkeley",
              "1991 at University of Helsinki"
          ],
          "correctAnswer": 0,
          "explanation": "**Unix** was developed in **1969 at AT&T Bell Labs** by Ken Thompson, Dennis Ritchie, and their colleagues as a multi-user, multi-tasking operating system.",
          "category": "Unix/Linux"
      },
      {
          "id": "elect3-mq16",
          "question": "What is the standard numerical User ID (UID) of the root superuser account across Unix and Linux systems?",
          "options": [
              "UID -1",
              "UID 0",
              "UID 1",
              "UID 1000"
          ],
          "correctAnswer": 1,
          "explanation": "In Unix and Linux systems, **UID 0** is permanently reserved for the superuser account (`root`), granting full administrative kernel privileges.",
          "category": "System Administration"
      },
      {
          "id": "elect3-mq17",
          "question": "What category of network connects facilities across a large metropolitan area or city, spanning greater distances than a LAN but smaller than a global WAN?",
          "options": [
              "Personal Area Network (PAN)",
              "Local Area Network (LAN)",
              "Metropolitan Area Network (MAN)",
              "Storage Area Network (SAN)"
          ],
          "correctAnswer": 2,
          "explanation": "A **Metropolitan Area Network (MAN)** covers a municipal geographic area such as a city, school district, or regional university campus network.",
          "category": "Network Topologies"
      },
      {
          "id": "elect3-mq18",
          "question": "Which standard DNS resource record maps a human-readable domain name directly to an IPv4 address?",
          "options": [
              "A Record",
              "AAAA Record",
              "MX Record",
              "CNAME Record"
          ],
          "correctAnswer": 0,
          "explanation": "An **A Record** (Address Record) resolves a domain name directly to a 32-bit IPv4 address. (An AAAA record resolves to an IPv6 address).",
          "category": "Network Protocols"
      },
      {
          "id": "elect3-mq19",
          "question": "What is the term for a Linux process that has completed execution, but still occupies a process table slot because its parent has not yet executed wait()?",
          "options": [
              "Daemon process",
              "Zombie process (Defunct)",
              "Orphan process",
              "Suspended process"
          ],
          "correctAnswer": 1,
          "explanation": "A **Zombie (or Defunct) process** has completed execution but remains in the OS process table until its parent process reads its exit status using the `wait()` system call.",
          "category": "System Administration"
      },
      {
          "id": "elect3-mq20",
          "question": "Which standard cron schedule string executes a designated script every day at 2:30 AM?",
          "options": [
              "* 2 30 * *",
              "30 2 * * *",
              "2 30 * * *",
              "30 * 2 * *"
          ],
          "correctAnswer": 1,
          "explanation": "Cron format follows `minute hour day-of-month month day-of-week`. Thus, minute 30 and hour 2 is written as **30 2 * * * **.",
          "category": "DevOps & Standards"
      },
      {
          "id": "elect3-mq21",
          "question": "A client workstation fails to contact the network DHCP server and automatically configures its IP address to 169.254.88.14. What protocol generated this address?",
          "options": [
              "Static IP reservation",
              "Automatic Private IP Addressing (APIPA)",
              "DNS fallback routing",
              "Network Address Translation (NAT)"
          ],
          "correctAnswer": 1,
          "explanation": "**APIPA (Automatic Private IP Addressing)** automatically assigns a link-local IPv4 address in the 169.254.0.0/16 range when a DHCP server cannot be contacted.",
          "category": "Network Protocols"
      },
      {
          "id": "elect3-mq22",
          "question": "What is the maximum number of assignable client host IP addresses in an IPv4 subnet configured with a /26 subnet mask?",
          "options": [
              "30",
              "62",
              "126",
              "254"
          ],
          "correctAnswer": 1,
          "explanation": "A /26 subnet leaves $32 - 26 = 6$ host bits. Total usable addresses $= 2^6 - 2 = 64 - 2 = \\mathbf{62}$ host addresses.",
          "category": "Network Administration"
      },
      {
          "id": "elect3-mq23",
          "question": "A system administrator assigns file permissions using 'chmod 640 security.log'. What permissions are granted to the user, group, and others?",
          "options": [
              "User: read/write/execute, Group: read, Others: none",
              "User: read/write, Group: read, Others: none",
              "User: read/write, Group: write, Others: read",
              "User: read only, Group: read only, Others: read only"
          ],
          "correctAnswer": 1,
          "explanation": "Octal permissions: 6 = 4+2 (read and write) for Owner; 4 = read-only for Group; 0 = no permissions for Others.",
          "category": "System Administration"
      },
      {
          "id": "elect3-mq24",
          "question": "Which field in the IPv4 packet header does the 'traceroute' command incrementally increment to discover intermediate routers via ICMP Time Exceeded messages?",
          "options": [
              "Protocol field",
              "Time to Live (TTL)",
              "Type of Service (ToS)",
              "Header Checksum"
          ],
          "correctAnswer": 1,
          "explanation": "**traceroute** sends packets starting with a **TTL (Time to Live)** value of 1, incrementing by 1 for each hop. Each router decrements TTL, and when TTL reaches 0, the router discards the packet and returns an ICMP Time Exceeded message.",
          "category": "Network Protocols"
      },
      {
          "id": "elect3-mq25",
          "question": "Which type of hypervisor installs directly onto bare-metal server hardware without requiring an underlying host operating system?",
          "options": [
              "Type 1 Hypervisor (Bare-Metal)",
              "Type 2 Hypervisor (Hosted)",
              "Container Engine (Docker)",
              "Application Sandbox"
          ],
          "correctAnswer": 0,
          "explanation": "**Type 1 (Bare-Metal) Hypervisors** (e.g., VMware ESXi, Proxmox, Xen) run directly on physical server hardware, providing high efficiency, lower overhead, and enterprise isolation.",
          "category": "System Administration"
      },
      {
          "id": "elect3-mq26",
          "question": "Which access control model dynamically evaluates environmental contextual conditions—such as current time of day, client IP geolocation, and device encryption status—to grant access?",
          "options": [
              "Discretionary Access Control (DAC)",
              "Mandatory Access Control (MAC)",
              "Role-Based Access Control (RBAC)",
              "Attribute-Based Access Control (ABAC)"
          ],
          "correctAnswer": 3,
          "explanation": "**Attribute-Based Access Control (ABAC)** dynamically evaluates policies against attributes of the subject, resource, action, and environment (e.g., IP location, time of day).",
          "category": "Access Control"
      },
      {
          "id": "elect3-mq27",
          "question": "What is the primary operational difference between a vulnerability assessment and a penetration test?",
          "options": [
              "Vulnerability assessments exploit system bugs, while penetration tests only run port scans",
              "Vulnerability assessments identify and catalog known flaws, while penetration tests actively exploit vulnerabilities to measure exploitability",
              "Penetration tests only inspect physical locks, while vulnerability assessments inspect firewalls",
              "There is no difference; the two terms are synonymous"
          ],
          "correctAnswer": 1,
          "explanation": "A **vulnerability assessment** scans systems to identify and catalog potential weaknesses. A **penetration test (pen test)** actively simulates an authorized cyberattack to exploit weaknesses and evaluate defense depth.",
          "category": "Security Management"
      },
      {
          "id": "elect3-mq28",
          "question": "Which operating system kernel architecture incorporates process scheduling, memory management, and device drivers into a single privileged address space for high execution performance?",
          "options": [
              "Microkernel",
              "Monolithic Kernel",
              "Exokernel",
              "Nanokernel"
          ],
          "correctAnswer": 1,
          "explanation": "A **Monolithic Kernel** (such as Linux) runs all core operating system services in supervisor kernel space, maximizing execution speed by eliminating IPC context-switching overhead.",
          "category": "System Administration"
      },
      {
          "id": "elect3-mq29",
          "question": "Which declarative configuration management tool configures remote Linux servers agentlessly over standard SSH using YAML playbooks?",
          "options": [
              "Docker",
              "Ansible",
              "Kubernetes",
              "Nagios"
          ],
          "correctAnswer": 1,
          "explanation": "**Ansible** is a declarative, agentless automation and configuration management tool that executes tasks across remote nodes over standard SSH using YAML playbooks.",
          "category": "DevOps & Standards"
      },
      {
          "id": "elect3-mq30",
          "question": "An organization's Disaster Recovery policy mandates an RTO of 2 hours and an RPO of 15 minutes. What do these SLA constraints require following an unplanned system outage?",
          "options": [
              "The system must be fully restored within 2 hours, and data loss cannot exceed the last 15 minutes of transactions",
              "Backups must run for 2 hours, and servers must reboot every 15 minutes",
              "The system can tolerate 15 minutes of downtime and up to 2 hours of lost data",
              "The disaster recovery team has 15 minutes to declare an incident and 2 hours to notify customers"
          ],
          "correctAnswer": 0,
          "explanation": "**RTO (Recovery Time Objective)** = max downtime allowed (2 hours to restore service). **RPO (Recovery Point Objective)** = max data loss allowed (no more than 15 minutes of data loss).",
          "category": "Security Management"
      }
  ],
  cramNotes: [
    "CIA Triad: Confidentiality (secrecy/no unauthorized viewing), Integrity (accuracy/no improper modification), Availability (accessibility when needed).",
    "Security Principles: Authentication (verifying identity), Authorization (granting rights), Non-repudiation (proof of origin, cannot deny action), Privacy (control over personal data).",
    "Access Control: DAC (resource owner decides; Unix chmod), MAC (fixed security labels; SELinux overrides root), RBAC (job roles), ABAC (dynamic subject/resource/environment attributes), Zero Trust ('Never trust, always verify').",
    "Security Management: Policies (high-level WHAT) vs Procedures (step-by-step HOW).",
    "BCDR: Business Continuity keeps core business running; Disaster Recovery restores IT infrastructure. RTO (max allowable downtime); RPO (max allowable data loss in time).",
    "Testing: IDS alerts (passive tap); IPS blocks in real-time (inline with fail-open bypass). Vulnerability Assessment scans known CVEs; Pen Test simulates real attack to exploit flaws.",
    "Networks: PAN (~10m, Bluetooth, smartwatches), LAN (building, Ethernet/Wi-Fi), WAN (country/global, Internet, undersea cables).",
    "Protocols: DNS (names -> IP; 'A' record maps IPv4; DNSSEC prevents spoofing); DHCP (DORA handshake; failure yields APIPA 169.254.x.x); MAC (Layer 2 48-bit physical address).",
    "Subnetting Formula: Usable hosts = 2^(32 - prefix) - 2. (/27 = 30 usable hosts).",
    "Diagnostics: ping (ICMP reachability); traceroute (ICMP TTL increments to map hop-by-hop routers and pinpoint failure).",
    "OS Types: Single-user, Multi-user, Multitasking, Distributed (cluster appears as one supercomputer), RTOS ('In an RTOS, predictability is more important than raw speed!').",
    "Unix vs Linux: Unix (1969, Bell Labs, Ken Thompson & Dennis Ritchie, proprietary) vs Linux (1991, Linus Torvalds, open-source GPL, runs everywhere).",
    "Process Management: SIGTERM (15 graceful request) vs SIGKILL (9 uncatchable kill); Zombie process (PID remains until parent executes wait()).",
    "DevOps & Standards: Cron (min hour day month weekday command); Ansible (declarative agentless over SSH); ISO 27001 (ISMS benchmark); GDPR (EU privacy & Right to be Forgotten)."
  ]
};
