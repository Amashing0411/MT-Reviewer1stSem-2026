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
- [💬 Live Study Shoutbox & Profile Showcase](#-live-study-shoutbox--profile-showcase)
- [🏆 Gamification & Cloud Leaderboard](#-gamification--cloud-leaderboard)
- [🎨 Gemini & Argon Prompt Guide (Avatar Frames & Badges)](#-gemini--argon-prompt-guide-avatar-frames--badges)
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

### 5. 🌌 Aceternity Aurora Background Engine & Dual Theme Contrast Architecture
- **Aceternity UI Aurora Engine:** Powered by overlapping linear-gradient color sweeps (`blue-500`, `indigo-300`, `blue-300`, `violet-200`, `blue-400`) with smooth active CSS keyframe animation (`animate-aurora`) and radial ellipse masks.
- **Hardware-Accelerated Calm Fluid Motion:** Uses dedicated CSS keyframes with `background-attachment: scroll !important` on animated pseudo-elements to prevent browser rendering freeze, providing a gentle, non-distracting 75s–95s slow ambient wave drift with `mix-blend-mode: difference` and tuned 35%-40% opacity.
- **shadcn/ui & TypeScript Structure:** Component placed under `@/components/ui/aurora-background.tsx` and `@/components/ui/demo.tsx`, powered by `@/lib/utils` with `cn()` helper and `framer-motion`.
- **Dual-Theme High Contrast Typography:** Explicit cascading contrast guards (`html:not(.dark)` and `html.dark`) prevent washed-out text or invisible dark-on-dark glyphs, guaranteeing razor-sharp readability for all 8 subjects in both Day (Light) and Night (Dark) modes.
- **Translucent Double-Bezel Glassmorphism:** Features `bg-zinc-50` for Day / Light Mode and deep `bg-zinc-900` (`rgba(24, 24, 27, 0.88)`) for Night / Dark Mode, allowing ambient light refraction without pitch-black `#000000` overrides.
- **Zero White-Flash Reloading:** Pre-mount `<head>` detection checks `localStorage` and system preference before rendering, guaranteeing clean light mode default on initial load with persistent dark mode when toggled.

---

## 💬 Live Study Shoutbox & Profile Showcase

To make student customizations truly visible across all sections, the platform includes a real-time study feed and interactive digital showcase:

### 1. 📢 4th Year Campus Study Shoutbox (Bottom-Right Widget)
- **Docked Floating Widget:** Positioned at `bottom-20 sm:bottom-6 right-3 sm:right-6` to guarantee zero overlap with the mobile bottom thumb navigation bar.
- **Classmate Banter & Motivation:** Post quick review tips, study encouragement, and exam banter across sections (`BSCPE 4A`, `4B`, `4C`, `4D`).
- **Full Customization in Every Message:** Each chat message displays the sender's avatar inside their moving animated game frame, animated name typography FX, section badge, and vanity tagline.
- **One-Tap Quick Reactions:** Pre-built Filipino engineering expressions (`🔥 Laban 4th year!`, `☕ Kape muna bago DSP`, `💀 Design 2 pa more`, `⚡ Road to PRC Top 1!`).
- **Cloud Real-Time Sync:** Backed by Upstash Redis / Vercel KV with instant optimistic local rendering.

### 2. 🪪 Classmate Digital Profile Showcase Modal
- **Inspect Anyone in 1-Click:** Clicking any classmate's name or avatar in the **Standings Leaderboard** or the **Live Shoutbox** immediately opens their high-resolution digital showcase modal.
- **Displayed Statistics & Customization:**
  - Large avatar with equipped moving animated frame.
  - Animated typography name FX.
  - Cohort section, assigned exam room, and faculty proctor.
  - Active vanity tagline badge (e.g., `🎖️ Room 106 Dean's Lister`, `📡 DSP Fourier Master`).
  - Prestige Level & Rank Title.
  - Lifetime total experience (XP).
  - Fastest 10-Question Blitz time record.
  - Top Midterm simulation score percentage.
  - **1-Tap Share Card Button:** Copies clean, formatted profile bragging rights to clipboard for Messenger or Discord.

---

## 🏆 Game-Grade Gamification, Prestige & Cloud Leaderboard

- **Student Identity & 4-Digit Restore PIN:** Choose codenames, avatar icons, or custom photo uploads, select 4th-year cohort section (`BSCPE 4A`, `4B`, `4C`, `4D`), and secure your profile with an encrypted **4-Digit PIN**.
- **🎖️ 12-Tier Prestige Level Progression:** Earn XP for reviewing notes, mastering flashcards, rapid blitz sprints, and midterm simulations:
  - `Lvl 1 Novice Trainee` $\rightarrow$ `Lvl 2 Junior Circuit Hacker` $\rightarrow$ `Lvl 3 System Architect` $\rightarrow$ `Lvl 4 Logic Gate Wizard` $\rightarrow$ `Lvl 5 Kernel Commander` $\rightarrow$ `Lvl 6 DSP Frequency Master` $\rightarrow$ `Lvl 7 Cloud Security Architect` $\rightarrow$ `Lvl 8 Room 106 Dean's Lister` $\rightarrow$ `Lvl 9 National Topnotcher Candidate` $\rightarrow$ `Lvl 10 Legendary PRC Board Top 1 🏆` $\rightarrow$ `Lvl 11 Midterm Valkyrie (Ascended) ✨` $\rightarrow$ `Lvl 12 Eternal DLSP Engineering Deity ⚡`
- **🎉 Level-Up Victory Modal:**
  - Whenever a student earns enough XP to advance, a celebratory game victory modal triggers with fanfare audio, confetti blasts, and a showcase of newly unlocked frames, taglines, and name FX with an **"Equip All & Continue"** 1-tap action.
- **🔥 Animated Custom Avatar Frames (High-Precision GIF & CSS Effects):**
  - **Bronze Circuit** (Lv. 2): Pulsating copper energy traces (`.avatar-frame-bronze`).
  - **Silver Chrome** (Lv. 3): Liquid metallic chrome sweeping shine (`.avatar-frame-silver`).
  - **Cyberpunk Glitch & Hologram** (Lv. 4): RGB chromatic aberration with twitching scanlines (`/frames/cyberpunk.gif`, `.avatar-frame-neon`).
  - **High-Voltage Lightning Arc** (Lv. 7): Crackling electric lightning arcs and blue spark bursts (`/frames/lightning.gif`, `.avatar-frame-sapphire`).
  - **Inferno Overclock 🔥** (Lv. 8): Roaring animated hellfire flame borders (`/frames/inferno.gif`, `.avatar-frame-ruby`).
  - **DSP Fourier Frequency Master** (Lv. 9): Streaming frequency harmonics & glowing emerald waveform (`/frames/dsp-fourier.gif`, `.avatar-frame-emerald`).
  - **Room 106 Dean's Lister Crest 🎖️** (Lv. 10): Official academic honor crest for Room 106 top students (`/frames/deans-lister.gif`, `.avatar-frame-honor`).
  - **Prismatic Valkyrie Bifrost Halo 🌈** (Lv. 10): Shifting aurora crystal bifrost halo (`/frames/valkyrie.gif`, `.avatar-frame-prismatic`).
  - **Eternal Deity Solar Corona ⚡** (Lv. 12): Blinding solar flare god-rays with pulsating gold corona (`/frames/solar-corona.gif`, `.avatar-frame-gold`).
- **✨ Animated Name Typography Effects:**
  - Equip custom animated CSS typography to stand out in the class standings:
  - **Glitch RGB** (Lv. 4) • **Matrix Phosphor** (Lv. 5) • **Lightning Arc Zap** (Lv. 7) • **Inferno Flame** (Lv. 8) • **Rainbow Aurora** (Lv. 10) • **Golden Deity Radiance** (Lv. 12).
- **🏷️ Earned Vanity Taglines & Level-Locking:**
  - Vanity taglines are **earned**, not given free! Progression unlocks specific badges like `⚡ Circuit Overclocker` (Lv. 2), `🛡️ Cyber Defense Commander` (Lv. 5), `🎖️ Room 106 Dean's Lister` (Lv. 8), and `🎯 PRC Board Top 1 Aspirant` (Lv. 10).
  - Custom Tagline Creation unlocks exclusively at **Level 6 (DSP Frequency Master)**.
- **🔥 Multi-Tier Streak Fanfare & Witty Broken-Streak Quotes:**
  - Dynamic combo multipliers (3x, 5x, 8x, 10x, 15x GODLIKE) with celebratory sound effects.
  - Comical broken-streak quotes with Filipino engineering humor and post-exam diagnostic review recommendations.
- **📲 Seamless Cross-Device Sync (PC $\leftrightarrow$ Phone):**
  - **Restore via Name + PIN:** Open the reviewer on your mobile browser, click **"Restore Account"**, and enter your Name + 4-Digit PIN to reload your exact Level, XP, flashcards, and exam statistics.
  - **1-Tap Device Link:** Copy your personal sync URL from your PC and open it on your phone for zero-typing automatic login.
- **💳 Digital Student Reviewer Pass (.PNG Download):**
  - Generates a sleek, high-resolution digital student ID card directly on HTML5 Canvas with your equipped prestige frame, tagline, and prominent 4-Digit PIN.
- **🛡️ Anti-Looping & Anti-Impersonation Protection:**
  - Default guest visits (`Student #...` with 0 XP) are never pushed to the cloud database, preventing phantom user spam.
  - Prevents classmates from claiming someone else's registered name without the matching PIN.
- **Global & Section Leaderboards:** Real-time standings filterable by Overall or per-subject (`CPE414`, `CPE411`, `CPE416`, `CPE415`, `CPE412`, `ELECT3`, `CPE413`, `ENGWORK`), sortable by XP, fastest blitz time, or highest score.
---

## 🎨 Gemini & Argon Prompt Guide (Avatar Frames & Badges)

If you want to generate high-resolution game-grade asset overlays (borders, badges, or animated GIF/APNG frames) using Google Gemini Web (`gemini.google.com` with Imagen 3), Argon, Leonardo, or Midjourney, use the tested prompt formulas below.

### 🖼️ Master Avatar Frame Prompt Formula
> **Key requirement:** Ensure the center of the frame is transparent or clean solid black/white so it can be masked or set as a PNG/GIF overlay.

#### 1. 🔥 Level 8 Inferno Hellfire Avatar Frame
```text
A high-end RPG video game avatar portrait frame border, squircle shape with rounded corners, centered composition on a pure solid black background. The frame consists of roaring, licking hellfire flames, glowing incandescent red, bright molten orange, and yellow fire embers rising upwards. Intricate metallic dark iron filigree border engulfed in heat distortion and dynamic burning plasma. Clean cutout center for a profile picture, 8k resolution, Unreal Engine 5 UI asset, game UI art, high detail, symmetrical design.
```

#### 2. ⚡ Level 7 High-Voltage Lightning Arc Frame
```text
A futuristic esport gamer avatar border frame, rounded square shape, centered composition on a pure solid black background. Violent electric lightning arcs crackling around the perimeter, electric blue, vibrant cyan, and ultraviolet spark bursts. High-voltage energy coils, glowing neon circuit conduits, intense glow emission. Transparent circular cutout area in the exact center, cinematic lighting, League of Legends prestige tier UI icon, symmetrical, photorealistic game asset.
```

#### 3. 🤖 Level 4 Cyberpunk Glitch & Hologram Frame
```text
Cyberpunk holographic avatar profile frame, rounded squircle shape, centered on a clean black background. Glitched digital neon border with chromatic aberration, cyan and magenta color splits, glowing binary code streams, and futuristic tech HUD brackets on corners. Clean center opening, vector UI style, Valorant aesthetic, high sharpness, game UI asset.
```

#### 4. 🌈 Level 10 Prismatic Valkyrie Bifrost Halo
```text
A legendary divine fantasy RPG avatar frame, rounded squircle border, centered on solid black background. Shifting rainbow aurora borealis energy, iridescent crystalline prism edges, floating light motes and ethereal stardust. Polished platinum trim with sacred geometry engraving, soft prismatic specular flares, Genshin Impact / Final Fantasy XIV prestige UI artifact.
```

#### 5. 👑 Level 12 Eternal Deity Solar Corona Frame
```text
An ultra-rare celestial god-tier avatar portrait border, centered on dark void background. Blinding golden solar corona with radiating divine god-rays, floating sacred golden solar runes, pulsating halo of pure solar light and molten gold. Symmetrical, monumental prestige achievement border, 8k, masterwork game UI asset.
```

---

### 🏷️ Vanity Rank Badges & Crests Prompt Formula

#### 1. 🎖️ Room 106 Dean's Lister Academic Crest
```text
An elite academic honor crest badge, vector game insignia, metallic navy blue and gold trim, featuring an engraved microchip intertwined with an open engineering blueprint book, subtle laurel wreath, DLSP shield emblem style, glossy finish, flat dark background, modern mobile game achievement badge.
```

#### 2. 📡 DSP Fourier Frequency Master Badge
```text
A sci-fi cybernetic medal badge, glowing frequency waveform sinusoidal ripples, glowing sapphire blue and neon emerald, radar grid overlay, high-tech engineering honor badge, isolated on black background, game UI icon.
```

---

### 🛠️ How to Integrate Generated Assets into the Reviewer:
1. **Generate Image:** Paste any prompt above into **Gemini** (`gemini.google.com` using "Create an image of...") or **Argon**.
2. **Remove Background:** Use [remove.bg](https://www.remove.bg/) or Photoshop/Figma to make the center and outer background 100% transparent PNG.
3. **Save to Repo:** Place the image in `/public/frames/` (e.g. `/public/frames/inferno-animated.gif` or `.png`).
4. **Register in Gamification Engine:** Add the file path to `AVATAR_FRAMES` in [`src/utils/gamification.js`](./src/utils/gamification.js):
   ```javascript
   {
     id: "inferno-custom",
     name: "Inferno Overclock (Animated)",
     minLevel: 8,
     assetUrl: "/frames/inferno.gif",
     cssClass: "avatar-frame-ruby",
   }
   ```

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
