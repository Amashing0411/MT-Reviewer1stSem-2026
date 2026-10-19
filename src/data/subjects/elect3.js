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
      id: "elect3-mq1",
      question: "A junior systems administrator logs in as `root` (UID 0) on an enterprise Red Hat Enterprise Linux server. The administrator attempts to execute a custom Python script that reads `/etc/shadow` directly to dump password hashes. Despite holding full root privileges, the kernel immediately terminates the operation with `Permission Denied` and generates an audit log entry in `/var/log/audit/audit.log` showing an SELinux denial.\n\nWhich access control model prevented the `root` superuser from accessing this file?",
      options: [
        "Discretionary Access Control (DAC)",
        "Mandatory Access Control (MAC)",
        "Role-Based Access Control (RBAC)",
        "Single Sign-On (SSO)"
      ],
      correctAnswer: 1,
      explanation: "**Security Architecture Analysis:**\n• **Mandatory Access Control (MAC):** Under MAC (implemented via SELinux / AppArmor), access rights are governed by centralized security policies and security labels (type enforcement), NOT by user identity.\n• Even the `root` superuser cannot bypass MAC rules if the executing process domain lacks the required security label attribute.\n• *Why other options fail:* Discretionary Access Control (DAC) grants the resource owner or root unrestricted bypass powers (`chmod 777`). RBAC maps roles to users, but standard Linux RBAC still permits root overrides.",
      category: "Access Control Models"
    },
    {
      id: "elect3-mq2",
      question: "A regional hospital's patient database server is infected by a zero-day ransomware strain at 3:00 PM on a Friday. The hospital's Business Continuity & Disaster Recovery (BCDR) policy mandates an **RPO (Recovery Point Objective) of 30 minutes** and an **RTO (Recovery Time Objective) of 4 hours**.\n\nThe IT incident response team halts the ransomware spread, restores clean database snapshots taken at 2:40 PM, tests database consistency, and restores production operations by 6:15 PM.\n\nDid the incident response team successfully satisfy the organization's BCDR Service Level Agreements (SLAs)?",
      options: [
        "Yes, both RPO and RTO SLAs were met (Data lost = 20 minutes $\\le$ 30 min RPO; Total downtime = 3 hours 15 minutes $\\le$ 4 hour RTO)",
        "No, the RTO SLA was violated because production was down for more than 3 hours",
        "No, the RPO SLA was violated because 40 minutes of transaction logs were permanently destroyed",
        "No, because Business Continuity prohibits using Disaster Recovery snapshots during ransomware"
      ],
      correctAnswer: 0,
      explanation: "**BCDR Metric Calculations:**\n• **RPO (Recovery Point Objective):** Measures maximum tolerable data loss in time. The attack occurred at 3:00 PM; the restore point was 2:40 PM $\\rightarrow$ Data loss = 20 minutes. Since $20\\text{ min} \\le 30\\text{ min RPO}$, RPO is **SATISFIED**.\n• **RTO (Recovery Time Objective):** Measures maximum tolerable downtime. Downtime spanned 3:00 PM to 6:15 PM = 3 hours 15 minutes. Since $3\\text{ hrs } 15\\text{ min} \\le 4\\text{ hrs RTO}$, RTO is **SATISFIED**.\n• Both objectives were met successfully under the enterprise BCDR policy.",
      category: "BCDR"
    },
    {
      id: "elect3-mq3",
      question: "A financial fintech institution is architecting a perimeter security defense for its core payment gateway. The network architect must deploy deep packet inspection to detect and actively terminate SQL injection and buffer overflow exploits in real time before packets reach web servers. However, the operations director insists that if the security appliance suffers complete hardware power failure, customer payment traffic must NOT be severed.\n\nWhich device and deployment architecture fulfills both requirements?",
      options: [
        "A passive Intrusion Detection System (IDS) connected to a switch SPAN mirror port",
        "An inline Intrusion Prevention System (IPS) equipped with a hardware fail-open (bypass) network tap",
        "A forward caching proxy server using Discretionary Access Control",
        "An isolated Personal Area Network (PAN) gateway"
      ],
      correctAnswer: 1,
      explanation: "**Network Security Engineering:**\n• **IPS (Intrusion Prevention System):** Must sit **inline** in the physical traffic path to actively drop malicious packets and terminate TCP sessions before they reach the web servers.\n• **Hardware Fail-Open (Bypass Tap):** Physical relay circuitry that automatically bridges the network connection if the IPS loses power or crashes, preventing the appliance from becoming a single point of network failure.\n• *Why other options fail:* An IDS is passive (out-of-band) and can only send alerts after packets have already reached the target. A proxy server does not perform inline deep packet threat inspection.",
      category: "Security Practices"
    },
    {
      id: "elect3-mq4",
      question: "A network administrator is carving out a new subnet for an automated manufacturing robotics cell using the assigned IP address block:\n`192.168.50.192/27`\n\nWhat are the Network Address, the Broadcast Address, and the maximum number of assignable client host IP addresses in this subnet?",
      options: [
        "Network: `192.168.50.192`, Broadcast: `192.168.50.255`, Usable Hosts: 62",
        "Network: `192.168.50.0`, Broadcast: `192.168.50.192`, Usable Hosts: 32",
        "Network: `192.168.50.192`, Broadcast: `192.168.50.223`, Usable Hosts: 30",
        "Network: `192.168.50.193`, Broadcast: `192.168.50.222`, Usable Hosts: 30"
      ],
      correctAnswer: 2,
      explanation: "**Subnetting Calculations:**\n• Prefix: `/27`. Host bits $h = 32 - 27 = 5$ bits.\n• Block Size $= 2^5 = 32$.\n• Total IP range for this block: `192.168.50.192` to `192.168.50.223` ($192 + 32 - 1 = 223$).\n• **Network Address:** `192.168.50.192` (first IP, identifies subnet).\n• **Broadcast Address:** `192.168.50.223` (last IP, reserved for broadcast).\n• **Usable Hosts:** $2^5 - 2 = 32 - 2 = 30$ assignable host IPs (`192.168.50.193` to `192.168.50.222`).",
      category: "Network Administration"
    },
    {
      id: "elect3-mq5",
      question: "A network technician plugs a newly imaged desktop into a wall Ethernet jack. The user reports that they cannot access the local intranet portal or the internet. The technician opens a command prompt and runs `ipconfig`, observing:\n• IPv4 Address: `169.254.104.55`\n• Subnet Mask: `255.255.0.0`\n• Default Gateway: *(blank)*\n\nWhat failure occurred in the DHCP 4-step DORA process, and why was this specific IP address assigned?",
      options: [
        "The client broadcasted a DHCP Discover, but received no DHCP Offer from a server; the OS automatically assigned an APIPA (Automatic Private IP Addressing) address",
        "The DHCP server successfully acknowledged the lease via DHCP Acknowledge, but the client rejected the DNS server address",
        "The client received an IP collision error during the DHCP Request stage and reverted to a Class A loopback address",
        "The switch port blocked the client because the desktop's MAC address is in Little-Endian format"
      ],
      correctAnswer: 0,
      explanation: "**DHCP Handshake Diagnostics:**\n• **DORA Steps:** Discover (broadcast) $\\rightarrow$ Offer (unicast/broadcast) $\\rightarrow$ Request $\\rightarrow$ Acknowledge.\n• When a client transmits a **DHCP Discover** packet and fails to receive any **DHCP Offer** (due to a disconnected cable, dead DHCP server, or unassigned VLAN), the operating system falls back to **APIPA** (Automatic Private IP Addressing) in the `169.254.0.0/16` range.\n• APIPA allows link-local communication but provides no default gateway, preventing routing to external networks.",
      category: "Network Administration"
    },
    {
      id: "elect3-mq6",
      question: "An automotive embedded engineering team is debating the choice of operating system for an Electronic Stability Control (ESC) braking computer. A software engineer suggests deploying a high-end 3.8 GHz 16-core desktop Linux distribution, claiming its raw CPU gigahertz will outperform a lightweight 200 MHz microcontroller running FreeRTOS.\n\nWhy does the fundamental rule from Module 1—**'In an RTOS, predictability is more important than raw speed'**—disqualify the general-purpose desktop Linux OS?",
      options: [
        "Desktop Linux cannot compile C++ applications or execute loop iterations",
        "General-purpose Linux is optimized for average throughput; non-deterministic thread preemption and variable interrupt latency mean a deadline could be missed by milliseconds, causing catastrophic vehicle crash",
        "FreeRTOS consumes 100x more battery power than desktop Linux, which stabilizes the alternator",
        "Real-Time Operating Systems do not have process schedulers or memory controllers"
      ],
      correctAnswer: 1,
      explanation: "**Real-Time OS Principles:**\n• **Hard Real-Time Systems:** In safety-critical embedded systems (automotive braking, pacemakers, flight flaps), computational correctness depends not just on the logical result, but on the **exact time** at which it is delivered. Missing a deadline by 2 milliseconds is a catastrophic failure.\n• General-purpose OS (Linux/Windows) prioritize **average throughput**, resulting in non-deterministic scheduling jitter and unpredictable interrupt handling. An RTOS provides bounded, deterministic task execution guarantees regardless of raw clock speed.",
      category: "Operating Systems"
    },
    {
      id: "elect3-mq7",
      question: "A company plans to migrate a legacy mission-critical banking application from an IBM AIX server to an open-source Ubuntu Server installation. A senior engineer asks the systems team to clarify the historical and architectural differences between **Unix** and **Linux**.\n\nWhich statement accurately describes the historical origin and licensing contrast presented in the slides?",
      options: [
        "Unix was created in 1991 by Linus Torvalds under the GPL license; Linux was developed in 1969 at Bell Labs as a proprietary commercial OS",
        "Unix and Linux are byte-for-byte identical operating systems created by the Free Software Foundation in 1980",
        "Unix was developed in 1969 at AT&T Bell Labs by Ken Thompson & Dennis Ritchie as a proprietary OS; Linux was created in 1991 by Linus Torvalds as a free, open-source Unix-like kernel",
        "Unix only runs on Personal Area Networks (PAN); Linux is restricted strictly to Wide Area Networks (WAN)"
      ],
      correctAnswer: 2,
      explanation: "**Verbatim Slide Comparison:**\n• **Unix:** Developed in **1969 at AT&T’s Bell Labs** by **Ken Thompson & Dennis Ritchie**. Proprietary commercial OS (IBM AIX, HP-UX, Solaris) tied to specific vendor hardware architectures.\n• **Linux:** Created in **1991 by Linus Torvalds** as a free, open-source alternative to Unix under the GPL license. Highly portable across almost all hardware architectures (x86, ARM, RISC-V).",
      category: "Unix vs Linux"
    },
    {
      id: "elect3-mq8",
      question: "A Linux system administrator notices that a hung child worker process (PID 5120) is consuming memory. The administrator executes `kill -9 5120` (`SIGKILL`). However, running `ps aux | grep 5120` shows the process is still listed with status `Z` (Defunct / Zombie).\n\nWhat is the underlying operating system cause of this Zombie process, and how should the administrator properly clear it from the process table?",
      options: [
        "The process is terminated, but its parent process has not called `wait()` to read its exit status; the administrator must signal or restart the parent process to reap it",
        "The `kill -9` signal was intercepted by the process's signal handler; the admin must run `kill -15` to force termination",
        "The process migrated to Level 4 optical storage and must be ejected manually",
        "The Linux kernel automatically converts all multi-threaded processes into permanent zombies"
      ],
      correctAnswer: 0,
      explanation: "**Process Lifecycle & Zombie Mechanics:**\n• When a process terminates in Unix/Linux (even via uncatchable `SIGKILL` 9), its entry remains in the process table until its **parent process** reads its exit status code via the `wait()` or `waitpid()` system call.\n• A **Zombie process** consumes no CPU or memory—only a process table PID slot. If the parent is deadlocked or poorly programmed, it fails to reap the child.\n• To clear the zombie, the administrator must either send a signal to the parent (`SIGHUP` or `SIGTERM`) or terminate the parent process, causing the `init` / `systemd` process (PID 1) to adopt and immediately reap the zombie.",
      category: "System Administration"
    },
    {
      id: "elect3-mq9",
      question: "Prior to launching a new online payment portal, an enterprise hires two cybersecurity consulting firms:\n• **Firm 1:** Deploys automated vulnerability scanners (OpenVAS/Nessus) to identify unpatched software packages, missing HTTP headers, and open firewall ports.\n• **Firm 2:** Ethical hackers manually craft custom payloads to exploit an authentication bypass flaw, gain unauthorized administrative shell access to the database, and prove that exfiltration of customer data is achievable.\n\nHow does the curriculum formally categorize the security assessments conducted by Firm 1 and Firm 2?",
      options: [
        "Firm 1 performed Disaster Recovery; Firm 2 performed Business Continuity",
        "Firm 1 conducted a Vulnerability Assessment; Firm 2 conducted a Penetration Test (Pen Test)",
        "Firm 1 executed Role-Based Access Control; Firm 2 executed Attribute-Based Access Control",
        "Firm 1 deployed an Inline IPS; Firm 2 deployed a Passive IDS"
      ],
      correctAnswer: 1,
      explanation: "**Security Assessment Definitions:**\n• **Vulnerability Assessment:** A systematic scan of network and system configurations to identify and catalog known security weaknesses, CVEs, and missing patches without attempting exploitation.\n• **Penetration Testing (Pen Test):** Authorized simulated cyberattacks where ethical security experts actively exploit vulnerabilities to evaluate the practical security posture and test defensive response capabilities.",
      category: "Security Practices"
    },
    {
      id: "elect3-mq10",
      question: "An aerospace enterprise implements an identity and access management system with the following rule:\n*\"An engineer may only download telemetry flight logs if: (1) their departmental role is 'Avionics', (2) the connection originates from inside the physical engineering hangar IP range, (3) the workstation has disk encryption active, and (4) the current local time is between 07:00 and 19:00.\"*\n\nWhich access control architecture is uniquely defined by evaluating dynamic combinations of subject, resource, action, and contextual environmental factors?",
      options: [
        "Discretionary Access Control (DAC)",
        "Mandatory Access Control (MAC)",
        "Attribute-Based Access Control (ABAC)",
        "Single-Factor Authentication (SFA)"
      ],
      correctAnswer: 2,
      explanation: "**Access Control Taxonomy:**\n• **Attribute-Based Access Control (ABAC):** Grants access by evaluating policies against dynamic attributes: subject attributes (department, clearance), resource attributes (classification, file type), action attributes (read, download), and environmental attributes (time of day, physical IP geolocation, device encryption status).\n• *Why other options fail:* DAC relies solely on resource owner discretion. MAC relies strictly on static security classification levels. RBAC assigns permissions based only on static job titles.",
      category: "Access Control Models"
    },
    {
      id: "elect3-mq11",
      question: "An engineer pairs their wireless fitness tracker and Bluetooth headset to their smartphone. The smartphone is connected to the office enterprise Wi-Fi access point (802.11ax). Meanwhile, the enterprise router routes database traffic across an undersea transpacific fiber-optic cable connecting the Manila headquarters to the Frankfurt cloud datacenter.\n\nClassify these three network segments from smallest to largest geographic scope:",
      options: [
        "PAN (Personal Area Network) $\\rightarrow$ LAN (Local Area Network) $\\rightarrow$ WAN (Wide Area Network)",
        "LAN $\\rightarrow$ PAN $\\rightarrow$ WAN",
        "WAN $\\rightarrow$ LAN $\\rightarrow$ PAN",
        "PAN $\\rightarrow$ WAN $\\rightarrow$ LAN"
      ],
      correctAnswer: 0,
      explanation: "**Geographical Network Taxonomy:**\n1. **PAN (~10 meters):** Personal devices (Bluetooth headset, smartwatch, fitness tracker).\n2. **LAN (Building/Room):** Local area coverage (office Wi-Fi, Ethernet laboratory).\n3. **WAN (Country/Global):** Intercontinental communication (the Internet, undersea fiber links connecting Manila to Frankfurt).",
      category: "Network Topologies"
    },
    {
      id: "elect3-mq12",
      question: "Users across an organization report that typing `portal.company.com` in their web browser redirects them to a fake banking login page at IP `198.51.100.99`. However, typing the direct internal IP `10.5.0.25` loads the genuine company portal. Investigation reveals that an attacker injected fraudulent records into the company's local caching DNS server.\n\nWhat specific DNS resource record was tampered with, and what security technology cryptographically validates DNS responses to prevent this attack?",
      options: [
        "MX (Mail Exchange) record; mitigated by DHCP Snooping",
        "A (Address) record; mitigated by DNSSEC (Domain Name System Security Extensions)",
        "PTR (Pointer) record; mitigated by Discretionary Access Control",
        "CNAME record; mitigated by Level 1 SRAM caching"
      ],
      correctAnswer: 1,
      explanation: "**DNS Protocols & Security:**\n• **'A' Record (Address Record):** Maps a human-readable hostname (`portal.company.com`) to a 32-bit IPv4 address.\n• **DNS Cache Poisoning / Spoofing:** Attackers trick a resolver into caching false IP mappings.\n• **DNSSEC:** Cryptographically signs DNS resource records with digital signatures, allowing resolvers to verify the authenticity and integrity of responses, preventing DNS spoofing.",
      category: "Network Administration"
    },
    {
      id: "elect3-mq13",
      question: "A network administrator is troubleshooting an outage between an office branch and a remote file server at `203.0.113.88`. Running `ping 203.0.113.88` results in `Request timed out` with 100% packet loss. The administrator then executes `traceroute 203.0.113.88`:\n• Hops 1 through 6 respond with latencies between 12 ms and 25 ms.\n• Hop 6 shows router IP `198.51.100.1`.\n• Hop 7 shows `* * *` (Request timed out), and all subsequent hops up to 30 time out.\n\nWhat critical diagnostic conclusion does `traceroute` provide that `ping` could not?",
      options: [
        "The destination file server's hard drive has crashed due to bad sectors",
        "The client workstation's Ethernet cable is completely disconnected",
        "Network packets are successfully reaching Hop 6, localizing the routing failure or firewall block specifically between Hop 6 and Hop 7",
        "The DNS server failed to resolve the hostname into a MAC address"
      ],
      correctAnswer: 2,
      explanation: "**Network Diagnostics Mechanics:**\n• `ping` only indicates end-to-end reachability (pass or fail).\n• `traceroute` leverages the **TTL (Time to Live)** field in IP packets, incrementing TTL by 1 at each probe to elicit `ICMP Time Exceeded` messages from each intermediate gateway.\n• Seeing Hops 1–6 respond cleanly proves the local LAN and initial upstream provider are healthy, localizing the failure precisely to the link between router `198.51.100.1` and the next router (Hop 7).",
      category: "Network Administration"
    },
    {
      id: "elect3-mq14",
      question: "A Linux system administrator creates an administrative backup shell script `/opt/scripts/backup.sh`. Security policy dictates that:\n• The owner (`root`) must have **read, write, and execute** permissions.\n• The group (`sysadmins`) must have **read and execute** permissions only.\n• Other users (world) must have **no permissions** whatsoever.\n\nWhich command applies these exact octal permissions?",
      options: [
        "`chmod 750 /opt/scripts/backup.sh`",
        "`chmod 777 /opt/scripts/backup.sh`",
        "`chmod 640 /opt/scripts/backup.sh`",
        "`chmod 755 /opt/scripts/backup.sh`"
      ],
      correctAnswer: 0,
      explanation: "**Linux Octal File Permissions:**\n• Read (r) = 4, Write (w) = 2, Execute (x) = 1.\n• Owner: $r + w + x = 4 + 2 + 1 = 7$.\n• Group: $r + x = 4 + 1 = 5$.\n• Others: none $= 0$.\n• Result: `chmod 750 /opt/scripts/backup.sh`.\n• *Why other options fail:* `777` grants full access to everyone (severe vulnerability). `640` lacks execute permission for owner and group. `755` grants read and execute to everyone in the world.",
      category: "System Administration"
    },
    {
      id: "elect3-mq15",
      question: "A corporate procurement officer approves an electronic purchase requisition for \$250,000 using their digital smart card and private cryptographic key. Two weeks later, after an audit questions the expense, the officer claims that an unknown hacker must have impersonated them.\n\nThe audit committee validates the cryptographic audit log containing the officer's digital signature and timestamp. Which fundamental security principle legally and technically prevents the officer from denying their action?",
      options: [
        "Confidentiality",
        "Accountability / Non-repudiation",
        "High Availability",
        "Virtualization"
      ],
      correctAnswer: 1,
      explanation: "**Security Principle Definition:**\n• **Accountability / Non-repudiation:** The principle ensuring that an entity cannot deny the authenticity of their signature or the origination of a transaction.\n• Implemented through digital signatures and PKI (Public Key Infrastructure), non-repudiation provides indisputable proof of the origin, integrity, and authorization of an action.",
      category: "Security Principles"
    },
    {
      id: "elect3-mq16",
      question: "A tech company moves away from the traditional perimeter-based security model ('Castle-and-Moat', which trusted all internal corporate LAN traffic once connected behind the VPN). In their new architecture, every employee request—whether made from the CEO's office Ethernet port or a remote worker's home Wi-Fi—must be mutually authenticated, authorized, micro-segmented, and continuously validated.\n\nWhich modern security architecture does this represent?",
      options: [
        "Zero Trust Architecture ('Never trust, always verify')",
        "Discretionary Access Control",
        "Single-User Operating System",
        "Uncontrolled Domain Routing"
      ],
      correctAnswer: 0,
      explanation: "**Zero Trust Architecture:**\n• Built on the core principle: **'Never trust, always verify.'**\n• Traditional security assumed that anything inside the corporate network was safe. Zero Trust treats all networks (even internal LANs) as hostile, enforcing least privilege, dynamic context-based access (ABAC), microsegmentation, and end-to-end encryption for every transaction.",
      category: "Access Control Models"
    },
    {
      id: "elect3-mq17",
      question: "A system administrator inspects a Linux crontab configuration file for scheduled maintenance tasks. They encounter the following line:\n`30 2 * * 1-5 /usr/local/bin/nightly_sync.sh`\n\nWhen will this script execute?",
      options: [
        "Every 2 minutes and 30 seconds on the first day of May",
        "At 2:30 AM every Monday through Friday (weekdays)",
        "At 1:05 AM on the 2nd and 30th day of every month",
        "Continuously in the background as an RTOS priority thread"
      ],
      correctAnswer: 1,
      explanation: "**Cron Syntax Breakdown:**\n• Fields: `minute` `hour` `day_of_month` `month` `day_of_week` `command`\n• `30`: Minute 30\n• `2`: Hour 2 (2:00 AM)\n• `*`: Every day of the month\n• `*`: Every month\n• `1-5`: Days of the week 1 through 5 (Monday to Friday)\n• Thus, the script runs at **2:30 AM every weekday (Mon-Fri)**.",
      category: "Automation & DevOps"
    },
    {
      id: "elect3-mq18",
      question: "A European Union citizen contacts a global cloud SaaS provider, demanding that all their stored account history, personal identifiable information (PII), and credit card records be permanently erased from all production databases and backups within 30 days under the 'Right to be Forgotten.'\n\nWhich international regulatory framework mandates strict penalties for failure to comply with this data privacy directive?",
      options: [
        "ITIL v4",
        "ISO 27001",
        "GDPR (General Data Protection Regulation)",
        "POSIX Standard 1003.1"
      ],
      correctAnswer: 2,
      explanation: "**Compliance & Regulatory Frameworks:**\n• **GDPR (General Data Protection Regulation):** The European Union regulation establishing stringent legal guidelines for the collection, handling, and erasure of personal data, including the explicit 'Right to Erasure / Right to be Forgotten.'\n• *Why other options fail:* ISO 27001 specifies requirements for an Information Security Management System (ISMS). ITIL governs IT service delivery workflows. POSIX is an operating system interface standard.",
      category: "Compliance & Standards"
    },
    {
      id: "elect3-mq19",
      question: "A DevOps engineer needs to configure 100 newly deployed Linux virtual machines with identical firewall rules, user accounts, and Nginx configurations. Rather than writing brittle imperative shell scripts with loops and SSH connections, the engineer writes declarative YAML files defining the desired state (`state: present`, `port: 443`) and runs an agentless automation engine over SSH.\n\nWhich modern configuration management tool is described?",
      options: [
        "Ansible",
        "Netstat",
        "Active Directory Group Policy (GPO)",
        "Cron Tab"
      ],
      correctAnswer: 0,
      explanation: "**DevOps & Automation:**\n• **Ansible:** An open-source, agentless configuration management and automation tool that uses declarative YAML **playbooks** to define the desired state of remote machines over standard SSH.\n• It is idempotent, meaning it only makes changes if the target system has drifted from the defined configuration.",
      category: "Automation & DevOps"
    },
    {
      id: "elect3-mq20",
      question: "A high-performance weather forecasting cluster consists of 256 independent server nodes interconnected via high-speed InfiniBand networking. When atmospheric scientists launch meteorological simulation models, the operating system transparently schedules compute threads and distributes memory access across all 256 physical machines, presenting them to the user as a single unified supercomputer.\n\nHow does Module 1 classify this type of operating system?",
      options: [
        "Single-User Single-Tasking OS",
        "Distributed Operating System",
        "Personal Area Network Controller",
        "Embedded MS-DOS System"
      ],
      correctAnswer: 1,
      explanation: "**Operating System Taxonomies:**\n• **Distributed Operating System:** Manages a collection of independent, networked computational nodes and presents them to users and applications as a single, coherent, unified computing system.\n• It handles cross-node process scheduling, inter-process communication, and distributed file systems transparently.",
      category: "Operating Systems"
    },
    {
      id: "elect3-mq21",
      question: "An organization's Chief Information Security Officer (CISO) publishes two documents:\n• **Document A:** *\"All employee passwords must be a minimum of 14 characters, require Multi-Factor Authentication (MFA), and must never be shared under any circumstances.\"*\n• **Document B:** *\"Step 1: Open the Okta Verify portal. Step 2: Scan the QR code with your mobile authenticator. Step 3: Enter the 6-digit one-time code to complete registration.\"*\n\nHow are Document A and Document B formally distinguished in security governance?",
      options: [
        "Document A is a Vulnerability Scan; Document B is a Penetration Test",
        "Document A is a Disaster Recovery Plan; Document B is Business Continuity",
        "Document A is a Security Policy (what must be done); Document B is a Security Procedure (how to do it)",
        "Document A is a MAC rule; Document B is a DAC rule"
      ],
      correctAnswer: 2,
      explanation: "**Security Governance Frameworks:**\n• **Policy:** A high-level, mandatory organizational statement that outlines **what** rules must be adhered to (strategic goals, security requirements).\n• **Procedure:** Detailed, step-by-step operational instructions that explain **how** personnel must carry out a specific policy in daily practice.",
      category: "Security Management"
    },
    {
      id: "elect3-mq22",
      question: "In a corporate Windows enterprise network, when an employee joins the company, the network administrator creates a single user account on the Domain Controller. The user can then authenticate at any workstation in the building, and their permissions to corporate shared folders and email services are validated automatically via Kerberos and directory queries.\n\nWhich centralized directory service and protocol enables this unified identity management?",
      options: [
        "Microsoft Active Directory using LDAP (Lightweight Directory Access Protocol) and Kerberos",
        "Static DNS hosts files stored in Level 1 SRAM cache",
        "DHCP Snooping over an ad-hoc Personal Area Network (PAN)",
        "Discretionary Access Control inside an unmanaged switch"
      ],
      correctAnswer: 0,
      explanation: "**Directory Services & Identity Management:**\n• **Active Directory (AD):** Microsoft's centralized directory service providing authentication, group policies, and access management across enterprise domains.\n• It relies on **LDAP** for querying directory objects (users, groups, computers) and **Kerberos** for secure, single-sign-on ticket-based authentication.",
      category: "Network Administration"
    },
    {
      id: "elect3-mq23",
      question: "A Linux storage administrator needs to add NVMe-over-Fabrics support to a running enterprise database server. Instead of recompiling the entire Linux monolithic kernel and scheduling a disruptive server reboot, the administrator runs `modprobe nvme_fabrics` to dynamically load the compiled driver directly into kernel memory.\n\nWhat architectural capability of modern Linux systems makes this dynamic expansion possible?",
      options: [
        "Virtualization Type 2 hypervisor bypass",
        "Loadable Kernel Modules (LKM)",
        "Discretionary Access Control (DAC)",
        "Automatic Private IP Addressing (APIPA)"
      ],
      correctAnswer: 1,
      explanation: "**Linux Kernel Architecture:**\n• Although Linux has a **monolithic kernel** (where the kernel runs in a single address space for maximum performance), it supports **Loadable Kernel Modules (LKMs)**.\n• LKMs allow the kernel to dynamically load and unload device drivers and filesystem protocols into running memory on-demand without recompilation or system reboots.",
      category: "System Administration"
    },
    {
      id: "elect3-mq24",
      question: "A remote software engineer connects to a coffee shop's open Wi-Fi network. An attacker on the same Wi-Fi performs ARP spoofing to intercept unencrypted traffic. However, the engineer initiates an encrypted tunnel to the corporate office gateway, encapsulating all traffic in IPsec and routing it securely.\n\nWhich network technology protects the engineer's data from eavesdropping and tampering over untrusted public networks?",
      options: [
        "A caching Proxy Server",
        "Quality of Service (QoS)",
        "A Virtual Private Network (VPN)",
        "A Distributed File System"
      ],
      correctAnswer: 2,
      explanation: "**Network Security:**\n• **Virtual Private Network (VPN):** Creates an encrypted, authenticated virtual tunnel between a client and a remote network across the public, untrusted internet.\n• Even if third parties sniff packets on public Wi-Fi, the payload remains undecipherable due to cryptographic protocols (such as IPsec, OpenVPN, or WireGuard).",
      category: "Network Administration"
    },
    {
      id: "elect3-mq25",
      question: "A managed Layer 2 Ethernet switch receives an incoming Ethernet frame on physical Port 4. To forward the frame strictly to the intended workstation connected to Port 12 without flooding all other switch ports, which address in the frame header does the switch inspect against its internal CAM table?",
      options: [
        "The destination IPv4 address (e.g. `192.168.1.50`)",
        "The destination Layer 2 MAC (Media Access Control) address",
        "The DNS domain name query string",
        "The TCP source port number"
      ],
      correctAnswer: 1,
      explanation: "**Layer 2 Switching Mechanics:**\n• Standard Ethernet switches operate at **Layer 2 (Data Link Layer)**.\n• They inspect the **Destination MAC Address** (48-bit physical address) and look it up in their **CAM (Content Addressable Memory) table** to forward the frame only out of the specific port associated with that MAC, isolating collision domains.",
      category: "Network Administration"
    },
    {
      id: "elect3-mq26",
      question: "In an enterprise corporate office, employee video conferences on Microsoft Teams and Zoom experience severe robotic audio, video stuttering, and dropped calls during afternoon hours because several workstations are downloading multi-gigabyte ISO disk images.\n\nWhat network administration traffic management technology should be implemented on the router/switch to prioritize latency-sensitive voice and video packets ahead of bulk data downloads?",
      options: [
        "Quality of Service (QoS)",
        "Discretionary Access Control (DAC)",
        "Dynamic Host Configuration Protocol (DHCP)",
        "SELinux Mandatory Access Control"
      ],
      correctAnswer: 0,
      explanation: "**Network Traffic Management:**\n• **Quality of Service (QoS):** A network mechanism that classifies and prioritizes network traffic based on sensitivity to delay and jitter.\n• QoS tags real-time traffic (VoIP, video conferencing) with higher priority queues (DSCP/CoS), ensuring audio and video packets are transmitted first while bulk downloads wait during periods of congestion.",
      category: "Network Administration"
    },
    {
      id: "elect3-mq27",
      question: "A user `charlie` creates a research document `/home/charlie/notes.txt`. By default, its permissions are `-rw-r--r--`. Charlie wants his collaborator `dana` to be able to edit the document, so Charlie executes `chmod 664 notes.txt` without needing approval from the system administrator.\n\nWhy does Charlie possess the authority to change permissions on this file?",
      options: [
        "Because the system uses Mandatory Access Control (MAC), which gives all users root privileges",
        "Because Charlie is logged in via a Personal Area Network (PAN)",
        "Because the operating system enforces Discretionary Access Control (DAC), where the creator/owner of a resource has full discretion over access permissions",
        "Because the file system uses FAT32 which does not support permissions"
      ],
      correctAnswer: 2,
      explanation: "**Access Control Concepts:**\n• **Discretionary Access Control (DAC):** The fundamental access model used in standard Unix/Linux and Windows file systems.\n• In DAC, the **owner** of an object (the user who created it) has the discretion to grant or revoke read, write, and execute permissions to other users and groups as they see fit.",
      category: "Access Control Models"
    },
    {
      id: "elect3-mq28",
      question: "A coordinated Distributed Denial of Service (DDoS) attack floods an online e-commerce website with 500 Gbps of SYN flood traffic, saturating perimeter internet bandwidth and crashing the web server load balancers. Legitimate customers attempting to purchase goods are met with HTTP 504 Gateway Timeout errors, but no customer passwords or payment data were modified or stolen.\n\nWhich pillar of the **CIA Triad** was primarily violated during this cyber incident?",
      options: [
        "Confidentiality",
        "Availability",
        "Integrity",
        "Non-repudiation"
      ],
      correctAnswer: 1,
      explanation: "**CIA Triad Analysis:**\n• **Availability:** Ensuring that authorized users have prompt, uninterrupted access to systems, services, and data when needed.\n• A DDoS attack does not breach confidentiality (data was not stolen) nor integrity (data was not altered or corrupted); it solely exhausts computing and network resources to deny **Availability** to legitimate users.",
      category: "Security Principles"
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
