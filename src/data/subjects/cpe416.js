export const cpe416Data = {
  id: "cpe416",
  code: "CPE416",
  title: "CPE Laws and Professional Practice",
  description: "Philippine IT & Engineering Laws, professional practice ethics, Republic Acts, Section numbers, and criminal/administrative penalty schedules.",
  instructor: "Engr. Joel C. Ananias",
  room: "Room 106",
  schedule: "Monday, October 19, 2026 (4:00 PM - 5:00 PM)",
  proctor: "Lyka Magbuhos",
  examFormat: {
    types: [
      "Multiple Choice",
      "Identification",
      "Exact Penalties & RA Matching"
    ],
    coverage: "Philippine IT Laws (RA 9292, 10173, 10175, 8293, 8439, 8792, 10844, 9239) & Professional Ethics"
  },
  topics: [
    {
      unitId: "cpe416-u1",
      unitTitle: "Unit 1: Foundations of Law & Professional Practice",
      summary: "Definitions of law, professional practice, core values (Peaceful, Fair, Organized, Just), and ethical codes for Computer Engineers.",
      cards: [
        {
          id: "cpe416-c1",
          title: "Definition of Law & Professional Practice",
          category: "Foundations",
          badge: "Verbatim Slide",
          content: "The foundational principles and definitions governing the Computer Engineering profession in the Philippines.",
          keyPoints: [
            "**Law (Verbatim Definition):** A set of rules and principles created and enforced by the government or authority to maintain order, protect rights, and ensure justice in society. It tells people what they can and cannot do, and provides consequences or punishments for those who break the rules.",
            "**Four Pillars of Law:** Peaceful, Fair, Organized, Just.",
            "**Professional Practice (Verbatim Definition):** Refers to the application of knowledge, skills, ethics, and laws in performing one’s duties as a Computer Engineer. It includes project management, teamwork, communication, and adherence to engineering standards.",
            "**Core Creed:** 'Beyond codes and circuits — we are engineers of ethics, accountability, and innovation. As future Computer Engineers, we build not just systems, but trust and responsibility.'"
          ]
        },
        {
          id: "cpe416-c2",
          title: "The 6 Ethical Considerations for Computer Engineers",
          category: "Ethics",
          badge: "Verbatim Enumeration",
          content: "Ethical obligations every Computer Engineering professional must uphold:",
          keyPoints: [
            "1. **Privacy and Security:** Ensure that designed and implemented systems protect the privacy and security of individuals and organizations.",
            "2. **Intellectual Property:** Respect intellectual property rights (patents, trademarks, copyrights); never use proprietary information without proper authorization.",
            "3. **Transparency:** Be open about methods and practices, disclosing any potential conflicts of interest or biases that may influence work.",
            "4. **Accountability:** Take responsibility for actions, errors, or mistakes, and actively work to rectify them.",
            "5. **Social Responsibility:** Be aware of the societal impact of work; design beneficial systems and avoid technologies with negative consequences for society.",
            "6. **Professionalism:** Uphold high professional standards and act with integrity and honesty in all aspects of engineering practice."
          ]
        }
      ]
    },
    {
      unitId: "cpe416-u2",
      unitTitle: "Unit 2: RA 9292, RA 10173 & RA 10175",
      summary: "Electronics Engineering Law, Data Privacy Act of 2012 (Chapter VIII Penalties), and Cybercrime Prevention Act of 2012 with exact legal citations.",
      cards: [
        {
          id: "cpe416-c3",
          title: "RA 9292: Electronics Engineering Law of 2004",
          category: "Engineering Law",
          badge: "Section 35 Penalties",
          content: "Provides the comprehensive regulatory framework for the licensing and practice of Professional Electronics Engineers (PECE), Electronics Engineers (ECE), and Electronics Technicians (ECT).",
          keyPoints: [
            "**Foreign Ownership Restriction:** **40%** is the maximum allowable percentage of foreign ownership in electronics engineering practice in the Philippines.",
            "**Section 35 Penal Provision:**\n• Punishable by a **fine of not less than P100,000.00 nor more than P1,000,000.00**, OR\n• **Imprisonment of not less than six (6) months nor more than six (6) years**, or both.",
            "**Punishable Acts under Section 35:**\n(a) False/fraudulent statements to the Board to obtain a Certificate of Registration/PIC.\n(b) Using another's seal or Certificate/PIC, or lending one's own seal.\n(c) Using a revoked or suspended Certificate.\n(d) Practicing or appending PECE/ECE/ECT titles without valid registration.\n(e) Stamping/sealing documents after revocation or suspension.\n(f) Signing or sealing documents prepared under another PECE without clearly indicating the part actually performed.\n(g) Any unauthorized person signing for electronics engineering work not actually performed by them."
          ]
        },
        {
          id: "cpe416-c4",
          title: "RA 10173: Data Privacy Act of 2012 (Chapter VIII Penalties)",
          category: "Data Privacy",
          badge: "Exact Penalty Chart",
          content: "Protects individual privacy while ensuring the free flow of information; regulates all collection, storage, processing, and disposal of personal and sensitive data.",
          keyPoints: [
            "**Sec. 25: Unauthorized Processing:**\n• *Personal Info:* 1 to 3 years imprisonment + P500,000 to P2,000,000 fine.\n• *Sensitive Personal Info:* 3 to 6 years imprisonment + P500,000 to P4,000,000 fine.",
            "**Sec. 26: Accessing Due to Negligence:**\n• *Personal Info:* 1 to 3 years imprisonment + P500,000 to P2,000,000 fine.\n• *Sensitive Personal Info:* 3 to 6 years imprisonment + P500,000 to P4,000,000 fine.",
            "**Sec. 27: Improper Disposal:**\n• *Personal Info:* 6 months to 2 years imprisonment + P100,000 to P500,000 fine.\n• *Sensitive Personal Info:* 1 to 3 years imprisonment + P100,000 to P1,000,000 fine.",
            "**Sec. 28: Processing for Unauthorized Purposes:**\n• 1 year 6 months to 5 years imprisonment + P500,000 to P1,000,000 fine.",
            "**Sec. 29: Unauthorized Access or Intentional Breach:**\n• 1 to 3 years imprisonment + P500,000 to P2,000,000 fine."
          ],
          examTrap: "Notice the difference: In Sec 25 & 26, the maximum fine for Sensitive Personal Information doubles from P2M to P4,000,000, and prison jumps to 3-6 years!"
        },
        {
          id: "cpe416-c5",
          title: "RA 10175: Cybercrime Prevention Act of 2012",
          category: "Cybercrime",
          badge: "Penalties by Section",
          content: "Prevents and punishes crimes committed online or through computer systems, covering hacking, online fraud, identity theft, and cyber libel.",
          keyPoints: [
            "**Sec. 4(a) & 4(b) Offenses against System/Data Integrity:** Imprisonment of *prision mayor* OR fine of at least **P200,000.00** up to damage incurred, or both.",
            "**Sec. 4(a)(5) System Interference:** Imprisonment of *prision mayor* OR fine not exceeding **P500,000.00**, or both.",
            "**Critical Infrastructure Violation:** If Sec. 4(a) acts target critical infrastructure, penalty escalates to **reclusion temporal** OR fine of at least **P500,000.00** up to damage, or both.",
            "**Sec. 4(c)(1) Cybersex:** *Prision mayor* OR fine of at least **P200,000.00** to **P1,000,000.00**, or both.",
            "**Sec. 4(c)(2) Child Pornography:** Penalties under RA 9775, PROVIDED that penalty is **ONE (1) DEGREE HIGHER** if committed through a computer system.",
            "**Sec. 4(c)(3) Unsolicited Commercial Communications:** *Arresto mayor* OR fine of **P50,000.00** to **P250,000.00**, or both.",
            "**Sec. 5 Aiding, Abetting, or Attempting:** **ONE (1) DEGREE LOWER** than prescribed penalty OR fine of **P100,000.00** to **P500,000.00**, or both."
          ]
        }
      ]
    },
    {
      unitId: "cpe416-u3",
      unitTitle: "Unit 3: RA 8293, RA 8439, RA 8792, RA 10844 & RA 9239",
      summary: "Intellectual Property Code, Magna Carta for S&T, E-Commerce Law, DICT Act, and Optical Media Act statutory penalty schedules.",
      cards: [
        {
          id: "cpe416-c6",
          title: "RA 8293: Intellectual Property Code (Section 217 Penalties)",
          category: "Intellectual Property",
          badge: "3-Tier Escalation",
          content: "Protects patents, trademarks, copyrights, and industrial designs against infringement and unauthorized duplication.",
          keyPoints: [
            "**Section 217 Criminal Penalties for Copyright Infringement:**\n• **1st Offense:** Imprisonment of **1 to 3 years** + Fine of **P50,000.00 to P150,000.00**.\n• **2nd Offense:** Imprisonment of **3 years and 1 day to 6 years** + Fine of **P150,000.00 to P500,000.00**.\n• **3rd & Subsequent Offenses:** Imprisonment of **6 years and 1 day to 9 years** + Fine of **P500,000.00 to P1,500,000.00**.",
            "In all cases, **subsidiary imprisonment** applies in cases of insolvency."
          ]
        },
        {
          id: "cpe416-c7",
          title: "RA 8439: Magna Carta for Scientists & Engineers in Gov't",
          category: "Government S&T",
          badge: "S&T Protections",
          content: "Provides benefits, incentives, and employment rights to scientists, engineers, researchers, and S&T personnel in the Philippine government.",
          keyPoints: [
            "**Discrimination in Hiring, Promotion, or Benefits:** Fine not less than **P50,000.00** and imprisonment of **6 months to 1 year**.",
            "**Violation of Employment Rights & Benefits:** Fine not less than **P100,000.00** and imprisonment of **6 months to 3 years**.",
            "**Misuse of Allocated S&T Funds by Officials:** Fine not less than **P200,000.00** and imprisonment of **1 year to 5 years**.",
            "Repeat offenders face enhanced penalties."
          ]
        },
        {
          id: "cpe416-c8",
          title: "RA 8792: Electronic Commerce Act of 2000 (Section 33)",
          category: "E-Commerce",
          badge: "Cyber Penalties",
          content: "Recognizes the legal validity of electronic transactions, messages, and signatures, promoting ICT for nation-building.",
          keyPoints: [
            "**Hacking / Cracking:** Unauthorized access, alteration, destruction of data, or virus introduction: **Minimum fine of P100,000.00** (max commensurate to damage) AND **mandatory imprisonment of 6 months to 3 years**.",
            "**Piracy:** Unauthorized copying, reproduction, or distribution of copyrighted material over telecommunication networks/internet: **Minimum fine of P100,000.00** (max commensurate to damage) AND **mandatory imprisonment of 6 months to 3 years**.",
            "**Other Violations of the Act:** Maximum penalty of **P1,000,000.00** or **6 years imprisonment**."
          ]
        },
        {
          id: "cpe416-c9",
          title: "RA 10844 (DICT Act of 2015) & RA 9239 (Optical Media Act)",
          category: "ICT Regulation",
          badge: "Regulatory Mandates",
          content: "Creation of DICT as lead agency and the regulation of optical media production to prevent commercial piracy.",
          keyPoints: [
            "**RA 10844 (DICT Act of 2015 - Section 16 Penalties):**\n• *Unauthorized Access:* Fine min P100,000 + 6 months to 3 years.\n• *Data Protection Breach:* Fine min P200,000 + 1 to 5 years.\n• *Malware / Malicious Code Distribution:* Fine P100,000 to P1,000,000 + 1 to 6 years.\n• *Licensing Failure:* Fine P50,000 to P500,000 + 6 months to 1 year.",
            "**RA 9239 (Optical Media Act of 2003):**\n• Regulates manufacturing, mastering, and replication of optical media (CDs, DVDs).\n• Reorganized the Videogram Regulatory Board (VRB) into the Optical Media Board (OMB).\n• Criminalizes unauthorized burning and commercial duplication without license or owner credits."
          ]
        }
      ]
    }
  ],
  flashcards: [
    {
      id: "cpe416-fc1",
      question: "What is the verbatim definition of Law according to Engr. Joel Ananias's lecture?",
      answer: "Law is a set of rules and principles created and enforced by the government or authority to maintain order, protect rights, and ensure justice in society. It tells people what they can and cannot do, and provides consequences or punishments for those who break the rules.",
      category: "Foundations"
    },
    {
      id: "cpe416-fc2",
      question: "What are the four pillars of law highlighted in the lecture slides?",
      answer: "Peaceful, Fair, Organized, Just.",
      category: "Foundations"
    },
    {
      id: "cpe416-fc3",
      question: "What is the verbatim definition of Professional Practice for a Computer Engineer?",
      answer: "Refers to the application of knowledge, skills, ethics, and laws in performing one’s duties as a Computer Engineer. It includes project management, teamwork, communication, and adherence to engineering standards.",
      category: "Foundations"
    },
    {
      id: "cpe416-fc4",
      question: "What is the maximum allowable percentage of foreign ownership in electronics engineering practice under RA 9292?",
      answer: "40% is the maximum allowable foreign ownership percentage.",
      category: "RA 9292"
    },
    {
      id: "cpe416-fc5",
      question: "What are the criminal penalties under Section 35 of RA 9292?",
      answer: "A fine of not less than P100,000.00 nor more than P1,000,000.00, or imprisonment of not less than six (6) months nor more than six (6) years, or both.",
      category: "RA 9292"
    },
    {
      id: "cpe416-fc6",
      question: "Under RA 10173 Section 25, what is the penalty for unauthorized processing of PERSONAL information?",
      answer: "Imprisonment of 1 to 3 years and a fine of P500,000.00 to P2,000,000.00.",
      category: "RA 10173"
    },
    {
      id: "cpe416-fc7",
      question: "Under RA 10173 Section 25, what is the penalty for unauthorized processing of SENSITIVE personal information?",
      answer: "Imprisonment of 3 to 6 years and a fine of P500,000.00 to P4,000,000.00.",
      category: "RA 10173"
    },
    {
      id: "cpe416-fc8",
      question: "Under RA 10173 Section 26, what is the penalty for accessing personal information due to NEGLIGENCE?",
      answer: "Imprisonment of 1 to 3 years and a fine of P500,000.00 to P2,000,000.00.",
      category: "RA 10173"
    },
    {
      id: "cpe416-fc9",
      question: "Under RA 10173 Section 27, what is the penalty for IMPROPER DISPOSAL of personal information?",
      answer: "Imprisonment of 6 months to 2 years and a fine of P100,000.00 to P500,000.00.",
      category: "RA 10173"
    },
    {
      id: "cpe416-fc10",
      question: "Under RA 10173 Section 27, what is the penalty for IMPROPER DISPOSAL of SENSITIVE personal information?",
      answer: "Imprisonment of 1 to 3 years and a fine of P100,000.00 to P1,000,000.00.",
      category: "RA 10173"
    },
    {
      id: "cpe416-fc11",
      question: "Under RA 10173 Section 28, what is the penalty for processing personal information for UNAUTHORIZED PURPOSES?",
      answer: "Imprisonment of 1 year and 6 months to 5 years, and a fine of P500,000.00 to P1,000,000.00.",
      category: "RA 10173"
    },
    {
      id: "cpe416-fc12",
      question: "Under RA 10173 Section 29, what is the penalty for UNAUTHORIZED ACCESS OR INTENTIONAL BREACH?",
      answer: "Imprisonment of 1 to 3 years and a fine of P500,000.00 to P2,000,000.00.",
      category: "RA 10173"
    },
    {
      id: "cpe416-fc13",
      question: "Under RA 10175, what penalty is imposed if cybercrime acts in Section 4(a) are committed against CRITICAL INFRASTRUCTURE?",
      answer: "Reclusion temporal or a fine of at least P500,000.00 up to the maximum amount commensurate to damage incurred, or both.",
      category: "RA 10175"
    },
    {
      id: "cpe416-fc14",
      question: "What is the penalty rule for child pornography committed through a computer system under RA 10175?",
      answer: "The penalty prescribed in RA 9775 (Anti-Child Pornography Act) is increased by ONE (1) DEGREE HIGHER.",
      category: "RA 10175"
    },
    {
      id: "cpe416-fc15",
      question: "What is the penalty rule under RA 10175 Section 5 for aiding, abetting, or attempting cybercrime?",
      answer: "Imprisonment ONE (1) DEGREE LOWER than the prescribed offense penalty OR a fine of P100,000.00 to P500,000.00, or both.",
      category: "RA 10175"
    },
    {
      id: "cpe416-fc16",
      question: "What is the penalty under Section 217 of RA 8293 for a 1ST OFFENSE of copyright infringement?",
      answer: "Imprisonment of 1 to 3 years plus a fine of P50,000.00 to P150,000.00.",
      category: "RA 8293"
    },
    {
      id: "cpe416-fc17",
      question: "What is the penalty under Section 217 of RA 8293 for a 2ND OFFENSE of copyright infringement?",
      answer: "Imprisonment of 3 years and 1 day to 6 years plus a fine of P150,000.00 to P500,000.00.",
      category: "RA 8293"
    },
    {
      id: "cpe416-fc18",
      question: "What is the penalty under Section 217 of RA 8293 for 3RD AND SUBSEQUENT OFFENSES of copyright infringement?",
      answer: "Imprisonment of 6 years and 1 day to 9 years plus a fine of P500,000.00 to P1,500,000.00.",
      category: "RA 8293"
    },
    {
      id: "cpe416-fc19",
      question: "Under RA 8439, what is the penalty for government officials found guilty of MISUSING S&T FUNDS?",
      answer: "Fine of not less than P200,000.00 and imprisonment of 1 year to 5 years.",
      category: "RA 8439"
    },
    {
      id: "cpe416-fc20",
      question: "Under RA 8439, what is the penalty for DISCRIMINATING against scientists or engineers in hiring or promotion?",
      answer: "Fine of not less than P50,000.00 and imprisonment of 6 months to 1 year.",
      category: "RA 8439"
    },
    {
      id: "cpe416-fc21",
      question: "Under Section 33 of RA 8792 (E-Commerce Act), what is the mandatory penalty for HACKING OR CRACKING?",
      answer: "A minimum fine of P100,000.00 (up to damage incurred) and MANDATORY imprisonment of six (6) months to three (3) years.",
      category: "RA 8792"
    },
    {
      id: "cpe416-fc22",
      question: "Under Section 33 of RA 8792, what is the maximum penalty for general violations of the Act?",
      answer: "A maximum penalty of One million pesos (P1,000,000.00) or six (6) years imprisonment.",
      category: "RA 8792"
    },
    {
      id: "cpe416-fc23",
      question: "Under Section 16 of RA 10844 (DICT Act), what is the penalty for distributing malicious software or malware?",
      answer: "A fine ranging from P100,000.00 to P1,000,000.00 and imprisonment of 1 year to 6 years.",
      category: "RA 10844"
    },
    {
      id: "cpe416-fc24",
      question: "What regulatory board was reorganized by RA 9239 (Optical Media Act of 2003)?",
      answer: "The Videogram Regulatory Board (VRB) was reorganized into the Optical Media Board (OMB).",
      category: "RA 9239"
    },
    {
      id: "cpe416-fc25",
      question: "What are the 6 ethical considerations for Computer Engineers from the lecture slides?",
      answer: "1. Privacy and security, 2. Intellectual property, 3. Transparency, 4. Accountability, 5. Social responsibility, and 6. Professionalism.",
      category: "Ethics"
    }
  ],
  mockQuestions: [
    {
      id: "cpe416-mq1",
      question: "Under RA 9292 (Electronics Engineering Law of 2004), what is the maximum allowable foreign ownership percentage in engineering practice in the Philippines?",
      options: [
        "20%",
        "30%",
        "40%",
        "50%"
      ],
      correctAnswer: 2,
      explanation: "Slide 6 explicitly states: '40% is the maximum allowable percentage of foreign ownership in electronics engineering practice in the Philippines.'",
      category: "RA 9292"
    },
    {
      id: "cpe416-mq2",
      question: "Under Section 35 of RA 9292, practicing as an Electronics Engineer without a license or using a fraudulent certificate carries which criminal penalty?",
      options: [
        "Fine of P10,000 to P50,000 or 1 month imprisonment",
        "Fine of not less than P100,000 nor more than P1,000,000, or imprisonment of 6 months to 6 years, or both",
        "Fine of P500,000 to P2,000,000 or 1 to 3 years imprisonment",
        "Administrative probation only"
      ],
      correctAnswer: 1,
      explanation: "Section 35 of RA 9292 mandates a fine of not less than P100,000.00 nor more than P1,000,000.00, or imprisonment of 6 months to 6 years, or both.",
      category: "RA 9292"
    },
    {
      id: "cpe416-mq3",
      question: "A company database administrator processes clients' SENSITIVE personal health records without their consent. Under Section 25(b) of RA 10173, what penalty applies?",
      options: [
        "Imprisonment of 1 to 3 years and a fine of P500,000 to P2,000,000",
        "Imprisonment of 3 to 6 years and a fine of not less than P500,000 but not more than P4,000,000",
        "Imprisonment of 6 months to 2 years and a fine of P100,000 to P500,000",
        "Fine of P100,000 with no imprisonment"
      ],
      correctAnswer: 1,
      explanation: "Section 25(b) penalizes unauthorized processing of sensitive personal information with 3 to 6 years imprisonment and a fine of P500,000.00 to P4,000,000.00.",
      category: "RA 10173"
    },
    {
      id: "cpe416-mq4",
      question: "An IT clerk carelessly discards paper files containing regular personal information into an open street garbage bin. Under Section 27(a) of RA 10173 (Improper Disposal), the penalty is:",
      options: [
        "Imprisonment of 6 months to 2 years and a fine of P100,000 to P500,000",
        "Imprisonment of 1 to 3 years and a fine of P100,000 to P1,000,000",
        "Imprisonment of 3 to 6 years and a fine of P500,000 to P4,000,000",
        "A verbal warning from the National Privacy Commission"
      ],
      correctAnswer: 0,
      explanation: "Section 27(a) specifies 6 months to 2 years imprisonment and a fine of P100,000.00 to P500,000.00 for improper disposal of personal information.",
      category: "RA 10173"
    },
    {
      id: "cpe416-mq5",
      question: "Under Section 27(b) of RA 10173, what is the penalty if the improperly discarded files contain SENSITIVE personal information?",
      options: [
        "6 months to 2 years and P100,000 to P500,000",
        "1 year to 3 years and a fine of P100,000 to P1,000,000",
        "3 to 6 years and P500,000 to P4,000,000",
        "5 to 10 years and P2,000,000 to P5,000,000"
      ],
      correctAnswer: 1,
      explanation: "Section 27(b) penalizes improper disposal of sensitive personal information with 1 to 3 years imprisonment and a fine of P100,000.00 to P1,000,000.00.",
      category: "RA 10173"
    },
    {
      id: "cpe416-mq6",
      question: "Under RA 10173 Section 28, processing personal information for unauthorized purposes carries what prison term?",
      options: [
        "6 months to 1 year",
        "1 year to 3 years",
        "1 year and 6 months to 5 years",
        "6 years to 12 years"
      ],
      correctAnswer: 2,
      explanation: "Section 28 stipulates imprisonment ranging from 1 year and 6 months to 5 years and a fine of P500,000.00 to P1,000,000.00.",
      category: "RA 10173"
    },
    {
      id: "cpe416-mq7",
      question: "Under RA 10173 Section 29, breaking into a computer system where personal data is stored (intentional breach) carries a penalty of:",
      options: [
        "Imprisonment of 1 to 3 years and a fine of P500,000 to P2,000,000",
        "Imprisonment of 3 to 6 years and a fine of P1,000,000 to P5,000,000",
        "Imprisonment of 6 months to 1 year and a fine of P100,000 to P500,000",
        "Fine of P200,000 only"
      ],
      correctAnswer: 0,
      explanation: "Section 29 specifies imprisonment from 1 to 3 years and a fine of not less than P500,000.00 but not more than P2,000,000.00.",
      category: "RA 10173"
    },
    {
      id: "cpe416-mq8",
      question: "If a hacker executes a DDoS attack against the national power grid control servers (Critical Infrastructure), what penalty is imposed under RA 10175?",
      options: [
        "Arresto mayor or fine of P50,000",
        "Prision mayor or fine of P200,000",
        "Reclusion temporal or fine of at least P500,000 up to damage incurred, or both",
        "Reclusion perpetua with no bail"
      ],
      correctAnswer: 2,
      explanation: "Under RA 10175, punishable acts committed against critical infrastructure escalate to reclusion temporal or a fine of at least P500,000.00 up to damage incurred, or both.",
      category: "RA 10175"
    },
    {
      id: "cpe416-mq9",
      question: "Under RA 10175, what is the penalty enhancement when child pornography is committed through a computer system?",
      options: [
        "Same penalty as RA 9775",
        "One (1) degree lower than RA 9775",
        "One (1) degree higher than that provided in RA 9775",
        "Double the fine with no change in prison term"
      ],
      correctAnswer: 2,
      explanation: "Section 4(c)(2) mandates: 'Provided, That the penalty to be imposed shall be one (1) degree higher than that provided for in Republic Act No. 9775, if committed through a computer system.'",
      category: "RA 10175"
    },
    {
      id: "cpe416-mq10",
      question: "Under RA 10175 Section 5, what penalty applies to a person convicted of aiding or abetting a cybercrime?",
      options: [
        "Same penalty as the principal perpetrator",
        "Imprisonment one (1) degree lower than the prescribed offense penalty or a fine of P100,000 to P500,000, or both",
        "P50,000 fine and 30 days community service",
        "Life imprisonment"
      ],
      correctAnswer: 1,
      explanation: "Section 5 dictates imprisonment one (1) degree lower than that of the prescribed penalty or a fine of at least P100,000.00 but not exceeding P500,000.00, or both.",
      category: "RA 10175"
    },
    {
      id: "cpe416-mq11",
      question: "Under Section 217 of RA 8293, what is the penalty for a FIRST OFFENSE of copyright infringement?",
      options: [
        "Imprisonment of 1 to 3 years plus fine of P50,000 to P150,000",
        "Imprisonment of 3 years 1 day to 6 years plus fine of P150,000 to P500,000",
        "Imprisonment of 6 years 1 day to 9 years plus fine of P500,000 to P1,500,000",
        "Fine of P10,000 to P30,000"
      ],
      correctAnswer: 0,
      explanation: "Under Section 217, 1st offense carries 1 to 3 years imprisonment plus a fine ranging from P50,000 to P150,000.",
      category: "RA 8293"
    },
    {
      id: "cpe416-mq12",
      question: "For a THIRD OFFENSE of copyright infringement under Section 217 of RA 8293, the penalty escalates to:",
      options: [
        "1 to 3 years and P50,000 to P150,000",
        "3 years 1 day to 6 years and P150,000 to P500,000",
        "6 years 1 day to 9 years plus a fine ranging from P500,000 to P1,500,000",
        "10 to 20 years and P5,000,000"
      ],
      correctAnswer: 2,
      explanation: "Section 217 sets 3rd and subsequent offenses at 6 years and 1 day to 9 years imprisonment plus a fine ranging from P500,000 to P1,500,000.",
      category: "RA 8293"
    },
    {
      id: "cpe416-mq13",
      question: "Under RA 8439 (Magna Carta for S&T Personnel), what penalty is imposed on an official who discriminates against engineers in hiring, promotion, or benefits?",
      options: [
        "Fine of not less than P50,000 and imprisonment of 6 months to 1 year",
        "Fine of not less than P100,000 and imprisonment of 6 months to 3 years",
        "Fine of not less than P200,000 and imprisonment of 1 to 5 years",
        "Administrative suspension for 30 days"
      ],
      correctAnswer: 0,
      explanation: "RA 8439 establishes a fine of not less than P50,000.00 and imprisonment of 6 months to 1 year for discrimination.",
      category: "RA 8439"
    },
    {
      id: "cpe416-mq14",
      question: "What is the penalty for government officials found guilty of MISUSING funds allocated for scientific and technological activities under RA 8439?",
      options: [
        "Fine of min P50,000 and 6 months to 1 year",
        "Fine of not less than P200,000.00 and imprisonment of 1 year to 5 years",
        "Fine of P1,000,000 and dismissal from office",
        "Verbal reprimand"
      ],
      correctAnswer: 1,
      explanation: "RA 8439 punishes misuse of S&T funds with a fine of not less than P200,000.00 and imprisonment of 1 to 5 years.",
      category: "RA 8439"
    },
    {
      id: "cpe416-mq15",
      question: "Under Section 33 of RA 8792 (E-Commerce Act), what is the penalty for hacking, cracking, or introducing computer viruses that corrupt electronic documents?",
      options: [
        "Fine of P10,000 and 30 days imprisonment",
        "Minimum fine of P100,000.00 and mandatory imprisonment of 6 months to 3 years",
        "Fine of P500,000 and 10 years imprisonment",
        "Restitution of data with no criminal record"
      ],
      correctAnswer: 1,
      explanation: "Section 33 mandates a minimum fine of P100,000.00 (maximum commensurate to damage) and mandatory imprisonment of 6 months to 3 years.",
      category: "RA 8792"
    },
    {
      id: "cpe416-mq16",
      question: "Under Section 33 of RA 8792, what is the maximum penalty for other violations of the Electronic Commerce Act?",
      options: [
        "P500,000 or 3 years imprisonment",
        "P1,000,000.00 or six (6) years imprisonment",
        "P2,000,000 or 10 years imprisonment",
        "P5,000,000 or 12 years imprisonment"
      ],
      correctAnswer: 1,
      explanation: "Section 33 states that other violations shall be penalized with a maximum penalty of P1,000,000.00 or 6 years imprisonment.",
      category: "RA 8792"
    },
    {
      id: "cpe416-mq17",
      question: "Under Section 16 of RA 10844 (DICT Act of 2015), what penalty applies to distributing malicious software or code designed to harm computer systems?",
      options: [
        "Fine of P50,000 to P100,000 and 3 months",
        "Fine of P100,000.00 to P1,000,000.00 and imprisonment of 1 year to 6 years",
        "Fine of P2,000,000 and 10 years",
        "Permanent revocation of internet access"
      ],
      correctAnswer: 1,
      explanation: "Section 16 penalizes malware distribution with a fine from P100,000.00 to P1,000,000.00 and imprisonment of 1 to 6 years.",
      category: "RA 10844"
    },
    {
      id: "cpe416-mq18",
      question: "Which Philippine law reorganized the Videogram Regulatory Board (VRB) to regulate optical media replication and combat CD/DVD piracy?",
      options: [
        "RA 8293",
        "RA 9292",
        "RA 9239",
        "RA 10844"
      ],
      correctAnswer: 2,
      explanation: "Republic Act No. 9239 is the Optical Media Act of 2003, which reorganized the VRB into the Optical Media Board (OMB).",
      category: "RA 9239"
    },
    {
      id: "cpe416-mq19",
      question: "A Computer Engineer transparently discloses to their employer that their sibling owns the sensor supply vendor being evaluated for a project. This adheres to which ethical principle?",
      options: [
        "Accountability",
        "Transparency",
        "Privacy",
        "Intellectual Property"
      ],
      correctAnswer: 1,
      explanation: "Transparency requires professionals to disclose any potential conflicts of interest or biases that may influence their work.",
      category: "Ethics"
    },
    {
      id: "cpe416-mq20",
      question: "Taking responsibility for an algorithmic error in an automated medical dosage dispensing system and immediately patching the flaw exemplifies which ethical principle?",
      options: [
        "Accountability",
        "Social Responsibility",
        "Professionalism",
        "Transparency"
      ],
      correctAnswer: 0,
      explanation: "Accountability means taking responsibility for one's actions, errors, or mistakes and actively working to rectify them.",
      category: "Ethics"
    },
    {
      id: "cpe416-mq21",
      question: "Which Philippine law established the DICT as the primary government agency responsible for national ICT planning, internet access, and cybersecurity?",
      options: [
        "RA 8792",
        "RA 10175",
        "RA 10844",
        "RA 8439"
      ],
      correctAnswer: 2,
      explanation: "Republic Act No. 10844 is the Department of Information and Communications Technology Act of 2015.",
      category: "RA 10844"
    },
    {
      id: "cpe416-mq22",
      question: "Under RA 10175 Section 4(c)(3), transmitting unsolicited bulk commercial electronic messages (Spam) is penalized by:",
      options: [
        "Prision mayor or P200,000 fine",
        "Arresto mayor or a fine of at least P50,000.00 but not exceeding P250,000.00, or both",
        "Reclusion temporal",
        "Fine of P1,000,000"
      ],
      correctAnswer: 1,
      explanation: "Section 4(c)(3) penalizes unsolicited commercial communications with arresto mayor or a fine of P50,000.00 to P250,000.00, or both.",
      category: "RA 10175"
    },
    {
      id: "cpe416-mq23",
      question: "Under RA 9292, which credential designates the highest registration tier for electronics engineers authorized to sign and seal full system plans?",
      options: [
        "Electronics Technician (ECT)",
        "Electronics Engineer (ECE)",
        "Professional Electronics Engineer (PECE)",
        "Computer Systems Architect (CSA)"
      ],
      correctAnswer: 2,
      explanation: "Under RA 9292, the Professional Electronics Engineer (PECE) is the highest tier authorized to sign, stamp, and seal plans and technical descriptions.",
      category: "RA 9292"
    },
    {
      id: "cpe416-mq24",
      question: "Under RA 10844 Section 16, failure to comply with licensing requirements set forth in the Act results in:",
      options: [
        "Fine of P50,000 to P500,000 and imprisonment of 6 months to 1 year",
        "Fine of P200,000 to P1,000,000 and 3 years",
        "Verbal warning",
        "Permanent company shutdown"
      ],
      correctAnswer: 0,
      explanation: "Section 16 penalizes licensing non-compliance with a fine from P50,000.00 to P500,000.00 and imprisonment of 6 months to 1 year.",
      category: "RA 10844"
    },
    {
      id: "cpe416-mq25",
      question: "What are the four pillars of law highlighted in Engr. Joel Ananias's introductory slides?",
      options: [
        "Speed, Power, Memory, Cost",
        "Peaceful, Fair, Organized, Just",
        "Confidentiality, Integrity, Availability, Privacy",
        "Planning, Organizing, Leading, Controlling"
      ],
      correctAnswer: 1,
      explanation: "Slide 2 of CpE Laws Introduction highlights the four pillars of law: Peaceful, Fair, Organized, and Just.",
      category: "Foundations"
    }
  ],
  cramNotes: [
    "RA 9292 (ECE Law 2004) Sec 35: P100k - P1M fine, 6 mos - 6 yrs prison. Foreign ownership max 40%.",
    "RA 10173 (DPA 2012) Sec 25: Unauthorized Processing - Personal: 1-3 yrs, P500k-P2M; Sensitive: 3-6 yrs, P500k-P4M.",
    "RA 10173 Sec 26: Access Negligence - Personal: 1-3 yrs, P500k-P2M; Sensitive: 3-6 yrs, P500k-P4M.",
    "RA 10173 Sec 27: Improper Disposal - Personal: 6 mos-2 yrs, P100k-P500k; Sensitive: 1-3 yrs, P100k-P1M.",
    "RA 10173 Sec 28: Unauthorized Purpose: 1.5 - 5 yrs, P500k-P1M.",
    "RA 10173 Sec 29: System Breach: 1-3 yrs, P500k-P2M.",
    "RA 10175 (Cybercrime 2012): Critical infrastructure = Reclusion Temporal / min P500k. Child Pornography = +1 degree higher than RA 9775. Aiding/Attempt = -1 degree lower.",
    "RA 8293 (IP Code) Sec 217: 1st Offense: 1-3 yrs, P50k-P150k; 2nd: 3.01-6 yrs, P150k-P500k; 3rd: 6.01-9 yrs, P500k-P1.5M.",
    "RA 8439 (Magna Carta S&T): Discrimination: P50k, 6mo-1yr; Employment rights: P100k, 6mo-3yr; Fund misuse: P200k, 1-5yr.",
    "RA 8792 (E-Commerce 2000) Sec 33: Hacking/Cracking & Piracy = min P100k + mandatory 6 mos - 3 yrs.",
    "RA 10844 (DICT Act 2015) Sec 16: Unauthorized access: min P100k, 6mo-3yr; Data breach: min P200k, 1-5yr; Malware: P100k-P1M, 1-6yr.",
    "RA 9239 (Optical Media Act 2003): Regulates CDs/DVDs, reorganizes VRB into OMB.",
    "6 Ethical Principles: Privacy/Security, Intellectual Property, Transparency, Accountability, Social Responsibility, Professionalism."
  ]
};
