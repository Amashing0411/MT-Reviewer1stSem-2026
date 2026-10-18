// CPE414: Digital Signal Processing
// Official Status: Paper & Graph Practice Subject
// Midterm exams at DLSP COE are graph-driven (discrete sequences, graphical convolution, Z-plane ROC, pole-zero constellations).

export const cpe414Data = {
  id: "cpe414",
  code: "CPE414",
  title: "Digital Signal Processing",
  description: "Signals & Systems, Signal Transformations, Even/Odd Decomposition, Energy and Power Signals, Periodicity, Discrete Fourier Transform (DFT), and Graphical Convolution.",
  instructor: "Engr. Ronel D. Braga, REE",
  schedule: "Monday, October 19, 2026 (2:00 PM - 3:00 PM)",
  units: 3,
  isGraphSubject: true,
  hasStandardReviewer: false,
  examFormat: {
    types: [
      "Manual Graph & Waveform Sketching",
      "Step-by-Step Problem Solving",
      "Discrete Signal Transformations",
      "Enumeration & Core Definitions"
    ],
    coverage: "From Introduction to Signals & Systems through Elementary Transformations, Even/Odd Decomposition, Energy vs. Power, Periodicity, and 4-point DFT."
  },
  graphNotice: {
    title: "Official Advisory: DSP Midterms are Graph & Computation Driven",
    headline: "Why There is No Multiple-Choice Reviewer for DSP",
    body: "Digital Signal Processing (CPE414) is fundamentally a manual graphical and derivation course. The midterm examination primarily tests your ability to sketch discrete waveforms by hand (e.g. flipping and shifting $x[-n+2]$, graphical convolution sliding strips, and sketching pole-zero constellations with ROC circles on the complex Z-plane). Multiple-choice drills create a false sense of security because they cannot test pencil-and-paper drawing. Practice the 6 Essential Graph Problems below on engineering paper using your lecture figures!"
  },
  paperProblems: [
    {
      id: "gp-1",
      number: 1,
      title: "Discrete Signal Transformations Sketch",
      category: "Waveform Sketching",
      difficulty: "High Yield Exam Question",
      prompt: "Given a discrete-time sequence $x[n] = \\{1, 2, 3, 2, 1\\}$ with origin $n=0$ located at $x[0] = 3$, sketch the following by hand on graph paper:\n(a) $y_1[n] = x[n - 2]$ (Time Delay / Shift Right)\n(b) $y_2[n] = x[-n]$ (Time Reversal / Reflection)\n(c) $y_3[n] = x[-n + 2]$ (Reflect first, then shift RIGHT by 2)\n(d) $y_4[n] = x[2n]$ (Decimation / Downsampling by factor of 2)",
      method: [
        "1. Write down table of original values: $n = \\{-2, -1, 0, 1, 2\\} \\rightarrow x[n] = \\{1, 2, 3, 2, 1\\}$.",
        "2. For $x[n-2]$: Shift the entire waveform 2 units to the right ($n = \\{0, 1, 2, 3, 4\\}$).",
        "3. For $x[-n]$: Flip the waveform horizontally across the vertical axis $n = 0$.",
        "4. For $x[-n+2] = x[-(n-2)]$: First reflect $x[n]$ to get $x[-n]$, then shift the reflected signal RIGHT by 2 units.",
        "5. For $x[2n]$: Retain only even index samples ($n = -2, 0, 2$) and discard odd indices. The new indices become $-1, 0, 1$ with amplitudes $1, 3, 1$."
      ],
      examTip: "Always draw clearly defined discrete needles/stems with distinct dots at the top. Do not draw a continuous smooth curve for discrete signals!"
    },
    {
      id: "gp-2",
      number: 2,
      title: "Even and Odd Signal Decomposition",
      category: "Signal Decomposition",
      difficulty: "Guaranteed Problem Solving",
      prompt: "Given the causal discrete step sequence $x[n] = u[n]$ (or a finite pulse $x[n] = \\{2, 4, 6\\}$ for $n = 0, 1, 2$):\n(a) Calculate and sketch the even component $x_e[n]$.\n(b) Calculate and sketch the odd component $x_o[n]$.\n(c) Verify that $x_e[n] + x_o[n] = x[n]$ and that $\\sum_{n=-\\infty}^\\infty x_o[n] = 0$.",
      method: [
        "1. Recall fundamental decomposition formulas:\n   $$x_e[n] = \\frac{x[n] + x[-n]}{2}, \\quad x_o[n] = \\frac{x[n] - x[-n]}{2}$$",
        "2. Find time-reversed sequence $x[-n]$ by reflecting values about $n=0$.",
        "3. Add corresponding samples index-by-index and divide by 2 for $x_e[n]$. Note that $x_e[n] = x_e[-n]$ (symmetric about vertical axis).",
        "4. Subtract $x[-n]$ from $x[n]$ and divide by 2 for $x_o[n]$. Note that $x_o[0] = \\frac{x[0]-x[0]}{2} = 0$, and $x_o[-n] = -x_o[n]$ (antisymmetric about origin)."
      ],
      examTip: "Check your work: $x_o[0]$ MUST always equal zero. If your odd component at origin is non-zero, you made an arithmetic error!"
    },
    {
      id: "gp-3",
      number: 3,
      title: "1D Graphical Discrete Convolution by Hand",
      category: "Convolution",
      difficulty: "Core Computation Problem",
      prompt: "Compute the linear convolution $y[n] = x[n] * h[n]$ by hand using the graphical sliding-tape method or tabular matrix method for:\n$$x[n] = \\{1, 2, 1\\} \\quad \\text{for } n = 0, 1, 2$$\n$$h[n] = \\{1, 1, 1\\} \\quad \\text{for } n = 0, 1, 2$$",
      method: [
        "1. Determine total length of convolved output:\n   $$L_y = L_x + L_h - 1 = 3 + 3 - 1 = 5 \\text{ samples} \\quad (n = 0, 1, 2, 3, 4)$$",
        "2. Step 1 (Time-reversal & shift): Represent signals in dummy index $k$: plot $x[k]$ stationary, and fold $h[k] \\rightarrow h[-k]$.",
        "3. Step 2 (Slide & multiply for each $n$):\n   • $n = 0: y[0] = x[0]h[0] = 1 \\times 1 = 1$\n   • $n = 1: y[1] = x[0]h[1] + x[1]h[0] = 1(1) + 2(1) = 3$\n   • $n = 2: y[2] = x[0]h[2] + x[1]h[1] + x[2]h[0] = 1(1) + 2(1) + 1(1) = 4$\n   • $n = 3: y[3] = x[1]h[2] + x[2]h[1] = 2(1) + 1(1) = 3$\n   • $n = 4: y[4] = x[2]h[2] = 1 \\times 1 = 1$",
        "4. Output sequence: $y[n] = \\{1, 3, 4, 3, 1\\}$. Sketch this discrete waveform."
      ],
      examTip: "Use the grid/matrix multiplication method on scratch paper as a quick cross-check to make sure no arithmetic mistakes occurred during sliding."
    },
    {
      id: "gp-4",
      number: 4,
      title: "Discrete-Time Periodicity Test & Rationality Check",
      category: "Analytical Derivation",
      difficulty: "High Yield Exam Question",
      prompt: "Determine whether the following discrete-time signals are periodic or aperiodic. If periodic, compute the fundamental period $N$:\n(a) $x_1[n] = \\cos\\left(\\frac{3\\pi}{7} n\\right)$\n(b) $x_2[n] = \\sin(3 n)$\n(c) $x_3[n] = \\cos\\left(\\frac{\\pi}{4} n\\right) + \\sin\\left(\\frac{\\pi}{3} n\\right)$",
      method: [
        "1. Fundamental Rule for DTS: A discrete sinusoid $\\cos(\\omega_0 n)$ is periodic IF AND ONLY IF $\\frac{\\omega_0}{2\\pi}$ is a rational number $\\frac{k}{N} \\in \\mathbb{Q}$.",
        "2. For (a): $\\frac{\\omega_0}{2\\pi} = \\frac{3\\pi / 7}{2\\pi} = \\frac{3}{14}$. Since $3/14$ is rational, it is PERIODIC with fundamental period $N = 14$ samples (for $k=3$).",
        "3. For (b): $\\frac{\\omega_0}{2\\pi} = \\frac{3}{2\\pi}$. Because $\\pi$ is irrational, $\\frac{3}{2\\pi}$ is NOT rational. Therefore $x_2[n]$ is APERIODIC (non-periodic) despite being a sine wave!",
        "4. For (c): $N_1 = \\frac{2\\pi}{\\pi/4} = 8$, $N_2 = \\frac{2\\pi}{\\pi/3} = 6$. Fundamental period $N = \\text{LCM}(8, 6) = 24$ samples."
      ],
      examTip: "Remember: Continuous sinusoids $\\sin(\\Omega_0 t)$ are ALWAYS periodic for any non-zero $\\Omega_0$, but Discrete sinusoids $\\sin(\\omega_0 n)$ are ONLY periodic if $\\omega_0 / 2\\pi$ is rational!"
    },
    {
      id: "gp-5",
      number: 5,
      title: "Energy vs. Power Signal Summation Classification",
      category: "Classification & Derivation",
      difficulty: "Problem Solving",
      prompt: "Classify the following signals as Energy, Power, or Neither, and compute their total energy $E$ or average power $P$:\n(a) $x_1[n] = \\left(\\frac{1}{2}\\right)^n u[n]$\n(b) $x_2[n] = (-1)^n$\n(c) $x_3[n] = n \\cdot u[n]$ (Unit ramp)",
      method: [
        "1. Energy Formula: $E = \\sum_{n=-\\infty}^\\infty |x[n]|^2$\n2. Average Power Formula: $P = \\lim_{N\\to\\infty} \\frac{1}{2N+1} \\sum_{n=-N}^N |x[n]|^2$",
        "3. For (a): $E = \\sum_{n=0}^\\infty (1/4)^n = \\frac{1}{1 - 1/4} = \\frac{4}{3} < \\infty$. Total energy is finite and non-zero; thus $x_1[n]$ is an **ENERGY SIGNAL** (with $P = 0$).",
        "4. For (b): The sequence is periodic with values alternating between $+1$ and $-1$. $|x_2[n]|^2 = 1$ for all $n$. $E = \\infty$, but $P = 1 < \\infty$. Thus $x_2[n]$ is a **POWER SIGNAL**.",
        "5. For (c): Both $E = \\infty$ and $P = \\infty$. This signal grows indefinitely and is **NEITHER Energy NOR Power** ('Cat on the wall')."
      ],
      examTip: "Rules of thumb: Decaying / squarely summable sequences = Energy signals. Periodic sequences (sinusoids, square waves) = Power signals. Growing ramps / exponentials = Neither."
    },
    {
      id: "gp-6",
      number: 6,
      title: "4-point Discrete Fourier Transform (DFT) Hand Calculation",
      category: "Transform Computations",
      difficulty: "Advanced Hand Derivation",
      prompt: "Given a 4-point discrete sequence $x[n] = \\{1, -1, 2, -2\\}$ for $n = 0, 1, 2, 3$, compute the Discrete Fourier Transform $X[k]$ by hand for $k = 0, 1, 2, 3$ using the definition:\n$$X[k] = \\sum_{n=0}^{N-1} x[n] W_N^{kn}, \\quad \\text{where } W_N = e^{-j \\frac{2\\pi}{N}}$$",
      method: [
        "1. For $N = 4$, $W_4 = e^{-j \\pi/2} = -j$. Powers of $W_4$: $W_4^0 = 1, W_4^1 = -j, W_4^2 = -1, W_4^3 = j$.",
        "2. For $k = 0$ (DC component):\n   $$X[0] = \\sum_{n=0}^3 x[n] = 1 + (-1) + 2 + (-2) = 0$$",
        "3. For $k = 1$:\n   $$X[1] = 1(1) + (-1)(-j) + 2(-1) + (-2)(j) = 1 + j - 2 - 2j = -1 - j$$",
        "4. For $k = 2$:\n   $$X[2] = 1(1) + (-1)(-1) + 2(1) + (-2)(-1) = 1 + 1 + 2 + 2 = 6$$",
        "5. For $k = 3$ (Complex conjugate of $X[1]$ for real input):\n   $$X[3] = X^*[1] = -1 + j$$",
        "6. Final DFT Vector: $X[k] = \\{0, -1 - j, 6, -1 + j\\}$."
      ],
      examTip: "For real-valued sequences, verify symmetry: $X[N - k] = X^*[k]$. Here $X[3] = X^*[1] = -1 + j$, confirming calculation correctness!"
    }
  ],
  topics: [
    {
      unitId: "u1",
      unitTitle: "Unit 1: Signals & System Classifications & Domain Matrix",
      summary: "Signal definitions, continuous vs. discrete amplitude and time domains, and DSP vs. ASP trade-offs.",
      cards: [
        {
          id: "cpe414-c1",
          title: "Signal Classifications & Domain Matrix",
          category: "Fundamentals",
          badge: "Core Concept",
          content: "A signal is a function that conveys information about the state or behavior of a physical system. Classified along two orthogonal axes: Time Domain (Continuous vs. Discrete) and Amplitude Domain (Continuous/Analog vs. Discrete/Quantized).",
          keyPoints: [
            "**Continuous-Time Analog:** Both time $t$ and amplitude $A$ can assume any real value (e.g. acoustic speech sound waves).",
            "**Discrete-Time Analog:** Sampled at discrete times $n T_s$, but amplitude is unquantized (e.g. PAM signals).",
            "**Continuous-Time Digital:** Continuous in time, but amplitude exists only in discrete states (e.g. square wave logic switching between 0V and 5V).",
            "**Discrete-Time Digital (DSP Domain):** Discrete in time and quantized in amplitude (e.g. 16-bit 44.1kHz audio files)."
          ]
        },
        {
          id: "cpe414-c2",
          title: "DSP vs. ASP Architectural Trade-offs",
          category: "Enumeration",
          badge: "High Yield Enumeration",
          content: "Comparison between Analog Signal Processing (resistors, inductors, op-amps) and Digital Signal Processing (microprocessors, FPGAs, MAC units).",
          keyPoints: [
            "**Advantages of DSP:** High precision, reproducibility, complete immunity from component aging/thermal drift, flexibility via software reconfiguration, and simple cascading without impedance loading problems.",
            "**Disadvantages of DSP:** Requires Anti-Aliasing Filter (AAF) prior to ADC and Reconstruction Filter after DAC; higher power dissipation due to clock switching; finite word-length quantization error."
          ]
        }
      ]
    },
    {
      unitId: "u2",
      unitTitle: "Unit 2: Elementary Operations & Transformations",
      summary: "Shifting, reflection, scaling, and combination operations on discrete sequences.",
      cards: [
        {
          id: "cpe414-c3",
          title: "Discrete Time-Domain Operations Rules",
          category: "Transform Rules",
          badge: "Sketching Rules",
          content: "Key rules for manipulating independent variable $n$ in discrete sequences $x[n]$:",
          keyPoints: [
            "**Time Shifting:** $x[n - k]$ shifts the signal RIGHT by $k$ units (Delay). $x[n + k]$ shifts LEFT by $k$ units (Advance).",
            "**Time Reversal / Folding:** $x[-n]$ reflects the signal across the vertical axis $n = 0$.",
            "**Combined Operation $x[-n + k]$:** Step 1: Reflect $x[n] \\rightarrow x[-n]$. Step 2: Shift the reflected sequence RIGHT by $k$ units.",
            "**Decimation / Downsampling:** $x[M n]$ where $M > 1$ retains every $M$-th sample and discards the rest.",
            "**Interpolation / Upsampling:** Inserts $L - 1$ zeros between adjacent original samples."
          ]
        }
      ]
    },
    {
      unitId: "u3",
      unitTitle: "Unit 3: Even/Odd, Energy/Power, and Periodicity Theorems",
      summary: "Decomposition theorems, signal classification metrics, and discrete rationality tests.",
      cards: [
        {
          id: "cpe414-c4",
          title: "Even/Odd & Energy/Power Master Theorems",
          category: "Theorems",
          badge: "Must Know",
          content: "Mathematical rules for symmetry, power, and periodicity:",
          keyPoints: [
            "**Even Signal:** $x[n] = x[-n]$. Symmetric about y-axis. Area = $2 \\times \\text{half area}$.",
            "**Odd Signal:** $x[-n] = -x[n]$. Antisymmetric about origin. $x[0] = 0$. Net sum $\\sum x_o[n] = 0$.",
            "**Energy vs Power:** Energy signal has $0 < E < \\infty$ and $P = 0$. Power signal has $0 < P < \\infty$ and $E = \\infty$. A signal cannot be both.",
            "**Periodicity Test:** Discrete sinusoid $\\cos(\\omega_0 n)$ is periodic iff $\\frac{\\omega_0}{2\\pi} = \\frac{k}{N} \\in \\mathbb{Q}$ (rational ratio). Otherwise it is APERIODIC."
          ]
        }
      ]
    }
  ],
  flashcards: [], // No flashcards — replaced with Paper Problems
  mockQuestions: [], // No standard MCQ quiz for DSP as instructed
  cramNotes: [
    "DSP Midterm is Graph-Driven: Practice sketching on engineering paper using the 6 Essential Graph Problems.",
    "Discrete needles/stems MUST have distinct dots on top and exact axis indices labeled.",
    "Time Shift: $x[n-k]$ = Shift RIGHT (Delay); $x[n+k]$ = Shift LEFT (Advance).",
    "Time Reflection + Shift: $x[-n+k]$ = Reflect across $n=0$, then shift RIGHT by $k$.",
    "Even Decomposition: $x_e[n] = \\frac{x[n] + x[-n]}{2}$ (symmetric about $n=0$).",
    "Odd Decomposition: $x_o[n] = \\frac{x[n] - x[-n]}{2}$ ($x_o[0] = 0$ always).",
    "Discrete Periodicity Condition: $\\frac{\\omega_0}{2\\pi} = \\frac{k}{N} \\in \\mathbb{Q}$ (must be a rational fraction).",
    "Energy Signal: $0 < E < \\infty, P = 0$. (Squarely summable decaying pulses).",
    "Power Signal: $0 < P < \\infty, E = \\infty$. (Periodic waves, square pulses).",
    "Linear Convolution: $L_y = L_x + L_h - 1$. Output of length 3 convolved with length 3 is length 5.",
    "4-point DFT: $X[k] = \\sum_{n=0}^3 x[n] e^{-j 2\\pi k n / 4}$. For real $x[n]$, $X[3] = X^*[1]$."
  ]
};
