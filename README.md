# 🎓 BSCPE 4th Year Midterm Reviewer (1st Sem, 2026)

[![Vercel Deployment](https://img.shields.io/badge/Production-Vercel-black?style=for-the-badge&logo=vercel)](https://mt-reviewer2026.vercel.app)
[![React 19](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![GitHub Pages](https://img.shields.io/badge/Mirror-GitHub_Pages-222222?style=for-the-badge&logo=github)](https://amashing0411.github.io/MT-Reviewer1stSem-2026/)

> **Official Midterm Examination Platform for Dalubhasaan ng Lungsod ng San Pablo (DLSP)**  
> **College of Engineering — Bachelor of Science in Computer Engineering**  
> Serving all graduating cohorts: **BSCPE 4A (Rm 109)** • **BSCPE 4B (Rm 108)** • **BSCPE 4C (Rm 107)** • **BSCPE 4D (Rm 106)**  
> 
> 🔗 **Live Web App:** [https://mt-reviewer2026.vercel.app](https://mt-reviewer2026.vercel.app)

---

## 📌 Table of Contents
- [📅 Examination Timetable & Room Directory](#-examination-timetable--room-directory)
- [✨ Key Platform Features](#-key-platform-features)
- [🏆 Gamification & Cloud Leaderboard](#-gamification--cloud-leaderboard)
- [📚 Course Modules Covered](#-course-modules-covered)
- [⌨️ Keyboard Navigation Shortcuts](#️-keyboard-navigation-shortcuts)
- [🛠️ Tech Stack & Architecture](#️-tech-stack--architecture)
- [🚀 Local Development Setup](#-local-development-setup)
- [☁️ Cloud Leaderboard Setup (Vercel KV)](#️-cloud-leaderboard-setup-vercel-kv)
- [📄 License & Institutional Credits](#-license--institutional-credits)

---

## 📅 Examination Timetable & Room Directory

The platform features an interactive section switchable schedule mapping specific exam blocks, rooms, and assigned faculty proctors for each section:

### Day 1 — Monday (Oct 19, 2026)
| Time | Course Code | Course Description | Units | Section 4A (Rm 109) | Section 4B (Rm 108) | Section 4C (Rm 107) | Section 4D (Rm 106) |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **2:00 PM – 3:00 PM** | **CPE 414** | Digital Signal Processing | 3 | Joel Urriquia | Luisa Tubana | Rosebel Agapay | Lyka Magbuhos |
| **3:00 PM – 4:00 PM** | **CPE 411** | CpE Practice and Design 2 | 2 | Joel Urriquia | Luisa Tubana | Rosebel Agapay | Lyka Magbuhos |
| **4:00 PM – 5:00 PM** | **CPE 416** | CpE Laws & Ethics | 2 | Joel Urriquia | Luisa Tubana | Rosebel Agapay | Lyka Magbuhos |
| **5:00 PM – 6:00 PM** | **CPE 415** | Engineering Management | 3 | Joel Urriquia | Luisa Tubana | Rosebel Agapay | Lyka Magbuhos |

### Day 2 — Tuesday (Oct 20, 2026)
| Time | Course Code | Course Description | Units | Section 4A (Rm 109) | Section 4B (Rm 108) | Section 4C (Rm 107) | Section 4D (Rm 106) |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: |
| **2:00 PM – 3:00 PM** | **CPE 412** | Seminars & Fieldtrips | 1 | *No Exam* | Dr. Randal Pasco | Dr. Cartney Lagaya | Ferlene Rubin |
| **3:00 PM – 4:00 PM** | **ELECT 3** | Elective 3 (SysAdmin / Cloud) | 3 | *No Exam* | Dr. Randal Pasco | Dr. Cartney Lagaya | Ferlene Rubin |
| **4:00 PM – 5:00 PM** | **CPE 413** | Computer Architecture & Org | 3 | Jezreel Punto | Reymark Maolen | Czarina Banayo | Layzon Briones |
| **5:00 PM – 6:00 PM** | **ENGWORK** | English in the Workplace | 3 | Jezreel Punto | Reymark Maolen | Czarina Banayo | Layzon Briones |

---

## ✨ Key Platform Features

### 1. 📖 Zen Document & Printable Handout Mode (`Print to PDF`)
- **Distraction-Free Reading:** Continuous section numbering (§ 1, § 2...), textbook-grade typography, and clear exam trap callouts.
- **Institutional Mathematical Typesetting:** Embedded formulas rendered with KaTeX.
- **One-Click Print to PDF:** Formatted specifically for clean physical printing or digital PDF distribution.

### 2. 🗂️ Fluid 3D Flashcards with Hardware Acceleration
- **180+ Active Recall Cards** across all 4th-year subjects.
- **Spaced repetition cues:** Flip animations, mastery tracking, and shuffle functionality.

### 3. ⏱️ Gamified Mock Exams & Rapid Blitz
- **10-Question Rapid Blitz:** High-intensity speed drills with streak multipliers and celebratory animations.
- **60-Minute Realistic Midterm Simulation:** Full timed exam experience with jump palette, bookmarking/flagging, and instant answer reviews.
- **Synthesized Audio Engine:** Built using the native HTML5 Web Audio API for responsive sound effects without external audio assets.

### 4. ⚡ 10-Minute Hallway Cram Sheets
- Ultra-concise, high-yield bulleted cheat sheets designed for quick review right before stepping into the examination room.

---

## 🏆 Gamification & Cloud Leaderboard

- **Student Identity:** Choose or customize avatar icons, set student name, and select your graduating section (`BSCPE 4A`, `4B`, `4C`, `4D`).
- **10-Tier Leveling Progression:** Earn XP for reviewing notes, mastering flashcards, and finishing quizzes:
  - `Lvl 1 Novice Reviewer` $\rightarrow$ `Lvl 3 Gate Keeper` $\rightarrow$ `Lvl 7 Pipeline Architect` $\rightarrow$ `Lvl 10 Midterm Valkyrie`
- **Global & Section Leaderboards:** Real-time standings filterable by Overall or per-subject (`CPE411`, `CPE416`, `CPE415`, `CPE412`, `ELECT3`, `CPE413`, `ENGWORK`), sortable by XP, fastest blitz time, or highest score.
- **P2P Scorecard Import/Export:** Share encoded scorecard links directly with classmates to add scores locally even when offline.
- **Vercel KV Cloud Synchronization:** Synchronizes scores across mobile phones and desktop browsers in real time.

---

## 📚 Course Modules Covered

| Code | Subject Title | Module Highlights |
| :--- | :--- | :--- |
| **CPE 414** | **Digital Signal Processing** | Mathematical overview, frequency domain analysis, sampling theorems, and exam guidance. |
| **CPE 411** | **CpE Practice and Design 2** | Capstone methodologies, project lifecycle, hardware-software integration, IEEE testing standards. |
| **CPE 416** | **CpE Laws and Professional Ethics** | RA 9292, RA 8293 (IP Code), Cybercrime Prevention Act (RA 10175), Data Privacy (RA 10173). |
| **CPE 415** | **Engineering Management** | Planning, organizing, project scheduling (CPM/PERT), motivation theories, financial statements. |
| **CPE 412** | **Seminars and Fieldtrips** | Professional etiquette, industry seminars, technical symposium reports, career readiness. |
| **ELECT 3** | **Computer Engineering Elective 3** | Cloud infrastructure, Linux system administration, network virtualization, enterprise cybersecurity. |
| **CPE 413** | **Computer Architecture & Organization** | Instruction set architectures, pipelining hazards, cache memory mapping, superscalar execution. |
| **ENGWORK** | **English in the Workplace** | Technical memo drafting, executive summaries, cross-cultural professional communication. |

---

## ⌨️ Keyboard Navigation Shortcuts

| Key | Flashcard View | Mock Exam View |
| :---: | :--- | :--- |
| <kbd>Space</kbd> / <kbd>Enter</kbd> | Flip current flashcard | Confirm selection |
| <kbd>←</kbd> / <kbd>→</kbd> | Previous / Next card | Previous / Next question |
| <kbd>M</kbd> | Toggle Mastered state | — |
| <kbd>S</kbd> | Shuffle deck | — |
| <kbd>1</kbd> – <kbd>4</kbd> | — | Select Choice A / B / C / D |
| <kbd>F</kbd> | — | Flag question for review |

---

## 🛠️ Tech Stack & Architecture

- **UI Framework:** [React 19](https://react.dev/) + [Vite 8](https://vite.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with Doppelrand double-bezel design tokens
- **Typography & Equations:** [KaTeX](https://katex.org/)
- **Visuals & Effects:** [Lucide React](https://lucide.dev/), [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Audio:** Web Audio API (Synthesizer chimes & cues)
- **Storage & State:** `localStorage` for offline persistence + [Vercel KV](https://vercel.com/docs/storage/vercel-kv) (Redis) for real-time cloud leaderboards
- **Hosting:** [Vercel](https://vercel.com/) (Primary) + [GitHub Pages](https://pages.github.com/) (Mirror)

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js 18+ or 20+
- npm or pnpm

### Clone & Run
```bash
# 1. Clone the repository
git clone https://github.com/Amashing0411/MT-Reviewer1stSem-2026.git
cd MT-Reviewer1stSem-2026

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:5173` to explore the reviewer locally.

### Production Build
```bash
# Compile and bundle assets into /dist
npm run build

# Preview production build locally
npm run preview
```

---

## ☁️ Cloud Leaderboard Setup (Vercel KV)

To enable real-time cloud leaderboards across all devices:

1. In your **[Vercel Dashboard](https://vercel.com/)**, select your project (`MT-Reviewer2026`).
2. Navigate to the **Storage** tab $\rightarrow$ Click **Create Database** $\rightarrow$ Select **KV** (Redis).
3. Connect the KV database to your project. Vercel will automatically populate the required environment variables:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
4. Deploy or redeploy the project. The serverless route at [`/api/leaderboard.js`](./api/leaderboard.js) will automatically handle live score synchronization!

---

## 📄 License & Institutional Credits

Developed for the graduating students of the **Bachelor of Science in Computer Engineering (Class of 2026)** at **Dalubhasaan ng Lungsod ng San Pablo (DLSP)**.

Distributed for educational, collaborative, and non-commercial academic preparation.
