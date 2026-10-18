# BSCPE 4D Midterm Reviewer (1st Sem, 2026) 🎓

> **Official Midterm Examination Platform for Bachelor of Science in Computer Engineering (BSCPE 4D)**  
> **Dalubhasaan ng Lungsod ng San Pablo (DLSP) • College of Engineering • Room 106**  
> **Production Deployment:** [https://mt-reviewer2026.vercel.app](https://mt-reviewer2026.vercel.app)

---

## 📅 Official Examination Timetable

| Day | Time | Course Code | Course Description | Units | Proctor / Faculty |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **Day 1 (Mon)** | 2:00 PM – 3:00 PM | **CPE 414** | Digital Signal Processing | 3 | Lyka Magbuhos |
| **Day 1 (Mon)** | 3:00 PM – 4:00 PM | **CPE 411** | CpE Practice and Design 2 | 2 | Lyka Magbuhos |
| **Day 1 (Mon)** | 4:00 PM – 5:00 PM | **CPE 416** | CpE Laws and Professional Practice | 2 | Lyka Magbuhos |
| **Day 1 (Mon)** | 5:00 PM – 6:00 PM | **CPE 415** | Engineering Management | 3 | Lyka Magbuhos |
| **Day 2 (Tue)** | 2:00 PM – 3:00 PM | **CPE 412** | Seminars and Fieldtrips | 1 | Ferlene Rubin & Layzon Briones |
| **Day 2 (Tue)** | 3:00 PM – 4:00 PM | **ELECT 3** | Elective 3 (SysAdmin, NetAdmin, Security) | 3 | Ferlene Rubin & Layzon Briones |
| **Day 2 (Tue)** | 4:00 PM – 5:00 PM | **CPE 413** | Computer Architecture and Organization | 3 | Ferlene Rubin & Layzon Briones |
| **Day 2 (Tue)** | 5:00 PM – 6:00 PM | **ENGWORK** | English in the Workplace | 3 | Ferlene Rubin & Layzon Briones |

---

## ⚡ Core Platform Capabilities

1. **Zen Document & PDF Handout View (`Print to PDF`)**
   - Clean, linear textbook-grade editorial prose without visual noise.
   - Continuous section numbering (§ 1, § 2...), unboxed KaTeX mathematical proofs, and callouts for common exam traps.
   - 1-Click institutional **Print to PDF** functionality styled specifically for physical printing and digital PDF distribution.

2. **Fluid 3D Flashcards with Desktop Acceleration**
   - 187 active recall cards across all 8 subjects.
   - Full keyboard navigation:
     - `Space` / `Enter` : Flip card
     - `←` / `→` : Navigate previous / next
     - `M` : Mark as Mastered
     - `S` : Shuffle deck

3. **Gamified Mock Exam & Quiz Battle**
   - **10-Q Rapid Blitz**: Instant active-recall drills with streak multiplier combos and milestone fanfare.
   - **Full Midterm Sim (60 Min)**: Realistic 60-minute examination simulation with question jump palette, flagging, and zero spoilers until final submission.
   - **Synthesized Web Audio Engine**: Zero-external-dependency audio chimes, buzzers, and fanfares using native browser Web Audio API.

4. **10-Minute Hallway Cram Sheets**
   - High-yield summary cards with quick bullet points for last-minute review right before entering Room 106.

5. **Day-Grouped Navigation Bar**
   - Day 1 (Monday) and Day 2 (Tuesday) tabs with all 8 subjects visible at all times.
   - Active subject quick dropdown in the header and smooth Previous/Next navigation at the bottom of every page.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite 8
- **Styling**: Tailwind CSS v4 + Doppelrand Double-Bezel Design Tokens
- **Typography & Math**: KaTeX (LaTeX typesetting)
- **Audio**: Web Audio API (Synthesizer Engine)
- **Icons & FX**: Lucide React, Canvas Confetti
- **Deployment**: Vercel (`MT-Reviewer2026.vercel.app`)

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/Amashing0411/MT-Reviewer1stSem-2026.git
cd MT-Reviewer1stSem-2026

# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build
```

---

## 🌐 1-Click Vercel Deployment

1. Go to [Vercel Dashboard](https://vercel.com/new).
2. Import repository `Amashing0411/MT-Reviewer1stSem-2026`.
3. Set project name to `MT-Reviewer2026`.
4. Deploy! Your reviewer will be live at `https://MT-Reviewer2026.vercel.app`.
