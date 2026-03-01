export interface MCQQuestion {
  id: number;
  question: string;
  options: string[];
  correct: number; // index of correct option
}

export interface ExamMeta {
  slug: string;
  name: string;
  duration: number; // minutes
  totalQ: number;
  description: string;
  rules: string[];
  icon: string;
  color: string; // tailwind color token
}

export const EXAM_META: ExamMeta[] = [
  {
    slug: "it-olympiad",
    name: "IT Olympiad",
    duration: 30,
    totalQ: 30,
    icon: "💻",
    color: "blue",
    description:
      "Test your knowledge of Information Technology — hardware, software, networking, programming concepts and more.",
    rules: [
      "30 multiple-choice questions — one correct answer each",
      "Time limit: 30 minutes",
      "You must NOT switch tabs or minimize the window",
      "Right-click, copy, paste and DevTools are disabled",
      "Exam automatically submits when the timer expires",
      "3 tab-switch violations will auto-submit your exam",
      "Fullscreen mode is enforced throughout the exam",
    ],
  },
  {
    slug: "gaming-quiz",
    name: "Gaming Quiz",
    duration: 30,
    totalQ: 30,
    icon: "🎮",
    color: "green",
    description:
      "How well do you know the gaming world? Answer 30 questions covering game titles, characters, history and culture.",
    rules: [
      "30 multiple-choice questions — one correct answer each",
      "Time limit: 30 minutes",
      "You must NOT switch tabs or minimize the window",
      "Right-click, copy, paste and DevTools are disabled",
      "Exam automatically submits when the timer expires",
      "3 tab-switch violations will auto-submit your exam",
      "Fullscreen mode is enforced throughout the exam",
    ],
  },
  {
    slug: "robothon-olympiad",
    name: "Robothon Olympiad",
    duration: 30,
    totalQ: 30,
    icon: "🤖",
    color: "orange",
    description:
      "Dive into Robotics and Cybersecurity with 30 questions covering sensors, circuits, programming, and digital safety.",
    rules: [
      "30 multiple-choice questions — one correct answer each",
      "Time limit: 30 minutes",
      "You must NOT switch tabs or minimize the window",
      "Right-click, copy, paste and DevTools are disabled",
      "Exam automatically submits when the timer expires",
      "3 tab-switch violations will auto-submit your exam",
      "Fullscreen mode is enforced throughout the exam",
    ],
  },
  {
    slug: "marvel-dc-quiz",
    name: "Marvel-DC Quiz",
    duration: 30,
    totalQ: 30,
    icon: "🦸",
    color: "red",
    description:
      "Prove your superhero knowledge! Questions cover Spider-Man, Iron Man, The Batman (2022) and Superman (2025).",
    rules: [
      "30 multiple-choice questions — one correct answer each",
      "Time limit: 30 minutes",
      "You must NOT switch tabs or minimize the window",
      "Right-click, copy, paste and DevTools are disabled",
      "Exam automatically submits when the timer expires",
      "3 tab-switch violations will auto-submit your exam",
      "Fullscreen mode is enforced throughout the exam",
    ],
  },
  {
    slug: "animelogia",
    name: "Animelogia",
    duration: 30,
    totalQ: 30,
    icon: "⚔️",
    color: "purple",
    description:
      "An anime quiz covering Attack on Titan, Demon Slayer, Chainsaw Man, Spy × Family and Jujutsu Kaisen.",
    rules: [
      "30 multiple-choice questions — one correct answer each",
      "Time limit: 30 minutes",
      "You must NOT switch tabs or minimize the window",
      "Right-click, copy, paste and DevTools are disabled",
      "Exam automatically submits when the timer expires",
      "3 tab-switch violations will auto-submit your exam",
      "Fullscreen mode is enforced throughout the exam",
    ],
  },
];

// ─── DEMO QUESTIONS (IT Olympiad style — 30 questions) ───────────────────────
// These will be replaced per-exam before launch.

export const DEMO_QUESTIONS: MCQQuestion[] = [
  { id: 1,  question: "What does CPU stand for?", options: ["Central Processing Unit", "Core Processing Unit", "Central Program Utility", "Compute Power Unit"], correct: 0 },
  { id: 2,  question: "Which generation of computers used transistors?", options: ["First", "Second", "Third", "Fourth"], correct: 1 },
  { id: 3,  question: "What is the full form of RAM?", options: ["Read Access Memory", "Random Access Memory", "Rapid Access Module", "Read Analogue Memory"], correct: 1 },
  { id: 4,  question: "Which of the following is an operating system?", options: ["Oracle", "Python", "Ubuntu", "Chrome"], correct: 2 },
  { id: 5,  question: "How many bits make one byte?", options: ["4", "16", "8", "2"], correct: 2 },
  { id: 6,  question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Transfer Markup Language", "Hyper Terminal Machine Language", "Hyper Text Machine Logic"], correct: 0 },
  { id: 7,  question: "Which protocol is used to send email?", options: ["FTP", "HTTP", "SMTP", "TCP"], correct: 2 },
  { id: 8,  question: "What is the binary representation of decimal 10?", options: ["1010", "1100", "1001", "0110"], correct: 0 },
  { id: 9,  question: "Which company developed the Java programming language?", options: ["Microsoft", "Apple", "Sun Microsystems", "IBM"], correct: 2 },
  { id: 10, question: "What does URL stand for?", options: ["Universal Resource Locator", "Uniform Resource Locator", "Unified Remote Link", "Universal Remote Link"], correct: 1 },
  { id: 11, question: "Which layer of the OSI model handles IP addressing?", options: ["Data Link", "Transport", "Network", "Session"], correct: 2 },
  { id: 12, question: "What is the purpose of DNS?", options: ["Encrypt data", "Translate domain names to IP addresses", "Assign IP addresses dynamically", "Route packets"], correct: 1 },
  { id: 13, question: "Which data structure uses LIFO order?", options: ["Queue", "Stack", "Array", "Linked List"], correct: 1 },
  { id: 14, question: "What does CSS stand for?", options: ["Computer Style Sheet", "Creative Style Syntax", "Cascading Style Sheets", "Coded Style System"], correct: 2 },
  { id: 15, question: "What is the time complexity of binary search?", options: ["O(n)", "O(n²)", "O(log n)", "O(1)"], correct: 2 },
  { id: 16, question: "Which device connects multiple computers in a network?", options: ["Router", "Modem", "Hub", "Switch"], correct: 3 },
  { id: 17, question: "Which of the following is NOT a programming language?", options: ["Swift", "Kotlin", "Hadoop", "Rust"], correct: 2 },
  { id: 18, question: "What does GUI stand for?", options: ["Graphical User Interface", "General Utility Interface", "Global User Input", "Graphical Utility Input"], correct: 0 },
  { id: 19, question: "Which storage type is faster — HDD or SSD?", options: ["HDD", "SSD", "Both are equal", "Depends on the file size"], correct: 1 },
  { id: 20, question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Logic", "Sequential Query Language", "Structured Question Logic"], correct: 0 },
  { id: 21, question: "In Python, which keyword is used to define a function?", options: ["func", "def", "function", "fn"], correct: 1 },
  { id: 22, question: "Which HTTP status code means 'Not Found'?", options: ["200", "301", "403", "404"], correct: 3 },
  { id: 23, question: "What is a firewall used for?", options: ["Speed up the network", "Protect a network by filtering traffic", "Encrypt files", "Compress data"], correct: 1 },
  { id: 24, question: "What does IoT stand for?", options: ["Internet of Things", "Intranet of Technology", "Integrated Online Tools", "Input Output Transfer"], correct: 0 },
  { id: 25, question: "Which of the following is an example of cloud storage?", options: ["RAM", "SSD", "Google Drive", "CPU Cache"], correct: 2 },
  { id: 26, question: "Which algorithm is used in asymmetric encryption?", options: ["AES", "DES", "RSA", "SHA-256"], correct: 2 },
  { id: 27, question: "What is the default port number for HTTPS?", options: ["80", "443", "21", "22"], correct: 1 },
  { id: 28, question: "Which of the following is a NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"], correct: 2 },
  { id: 29, question: "What does API stand for?", options: ["Application Programming Interface", "Advanced Program Integration", "Applied Protocol Interface", "Automated Program Index"], correct: 0 },
  { id: 30, question: "Which technology is the backbone of blockchain?", options: ["Cloud Computing", "Cryptographic Hashing", "Artificial Intelligence", "Relational Databases"], correct: 1 },
];
