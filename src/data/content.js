// ─────────────────────────────────────────────────────────────────────────────
// CYBER MIND — single source of truth for portfolio content + scene layout
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Kanwal Boparai',
  fullName: 'Kanwal Gurnoor Boparai',
  title: 'Full-Stack Engineer & Founder',
  tagline: 'Computer Science @ Waterloo · CS ’27',
  location: 'Waterloo, Ontario, Canada',
  email: 'kgsbopar@uwaterloo.ca',
  personalEmail: 'kanwalgurnoorboparai@gmail.com',
  phone: '+1 437-477-1085',
  github: 'https://github.com/KanwalBoparai',
  linkedin: 'https://linkedin.com/in/kgsbopar',
  summary:
    'Full-stack engineer and founder shipping production AI products. Computer Science at Waterloo (CS ’27). Comfortable across TypeScript, Python, LLMs, and the modern web stack; bias toward ownership and zero-to-one builds.',
  resumeFile: 'resume.pdf', // drop your PDF at public/resume.pdf
}

// Section nodes — id, display, luxe accent, where the node floats (world units,
// head near origin), and where its wire emerges from behind the cranium.
// Wires rise from the open brain, curve around the head and flow downward.
export const SECTIONS = [
  {
    id: 'projects',
    label: 'PROJECTS',
    code: '01',
    sub: 'Explore my work',
    color: '#b08d3e',
    position: [-2.95, -0.25, 0.5],
    mobilePosition: [-1.5, 0.9, 0.5],
    anchor: [-0.3, 1.72, -0.5],
  },
  {
    id: 'resume',
    label: 'RESUME',
    code: '02',
    sub: 'My background',
    color: '#c08e7c',
    position: [2.95, 0.4, 0.5],
    mobilePosition: [1.5, 0.9, 0.5],
    anchor: [0.3, 1.74, -0.5],
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    code: '03',
    sub: 'My professional journey',
    color: '#b5764a',
    position: [-2.15, -1.85, 1.0],
    mobilePosition: [-1.5, -1.7, 0.9],
    anchor: [-0.55, 1.55, -0.58],
  },
  {
    id: 'skills',
    label: 'SKILLS',
    code: '04',
    sub: 'Technologies & tools',
    color: '#a8865c',
    position: [2.15, -1.5, 1.0],
    mobilePosition: [1.5, -1.7, 0.9],
    anchor: [0.55, 1.57, -0.58],
  },
  {
    id: 'contact',
    label: 'CONTACT',
    code: '05',
    sub: 'Let’s connect',
    color: '#998a6d',
    position: [0, -2.3, 0.8],
    mobilePosition: [0, -2.5, 0.8],
    anchor: [0, 1.85, -0.55],
  },
]

export const cards = [
  {
    id: 'projects',
    code: '01',
    title: 'Projects',
    blurb: 'A collection of my recent work — production AI products and interactive builds.',
    cta: 'View projects',
  },
  {
    id: 'resume',
    code: '02',
    title: 'Resume',
    blurb: 'My education, achievements and the full PDF résumé.',
    cta: 'View resume',
  },
  {
    id: 'experience',
    code: '03',
    title: 'Experience',
    blurb: 'Companies, roles, and impact over the years.',
    cta: 'View timeline',
  },
  {
    id: 'skills',
    code: '04',
    title: 'Skills',
    blurb: 'Technologies I work with and master — from TypeScript to LLM systems.',
    cta: 'View skills',
  },
  {
    id: 'contact',
    code: '05',
    title: 'Contact',
    blurb: 'Have a project in mind? Let’s build something amazing.',
    cta: 'Get in touch',
  },
  {
    id: 'about-experience',
    code: 'X',
    title: 'About this experience',
    blurb: 'Built with passion using cutting-edge web technologies for a truly immersive experience.',
    cta: 'Tech stack',
    tech: ['Three.js', 'React Three Fiber', 'GLSL Shaders', 'WebGL', 'Post-processing', 'Lenis', 'Framer Motion', 'Tailwind CSS'],
  },
]

export const projects = [
  {
    name: 'ApplyPilot',
    status: 'FLAGSHIP',
    description:
      'Full-stack AI job-application platform. OpenRouter (Meta Llama 3.1 8B) drives resume parsing, tailored outreach-email generation, and application tracking, with structured-prompting pipelines that keep LLM output schema-conformant. Next.js 14 App Router on Neon serverless PostgreSQL, deployed on Vercel.',
    tags: ['Next.js 14', 'TypeScript', 'Neon Postgres', 'OpenRouter LLM'],
    source: 'https://github.com/KanwalBoparai/ApplyPilot',
    live: null,
  },
  {
    name: 'Delegate AI',
    status: 'LIVE',
    description:
      'Embeddable AI chat assistant that mounts on any website with a single script tag. A dependency-free vanilla JS/HTML/CSS widget talks to an OpenRouter-backed Node server; ⌘K summons it, ⌘M takes voice input, and a one-line embed loader makes it portable to any page.',
    tags: ['JavaScript', 'Node.js', 'OpenRouter LLM', 'Embeddable Widget'],
    source: 'https://github.com/KanwalBoparai/delegate-ai-assistant',
    live: 'https://delegate-ai-assistant.vercel.app',
  },
  {
    name: 'Potion',
    status: 'MVP',
    description:
      'Proximity-based dating app for iOS + Android: see who is at the same venue right now, swap voice intros, and confirm “we met” IRL to unlock chat. A React Native + Expo monorepo over a Fastify / Prisma / PostgreSQL backend — Redis + Socket.io for realtime presence, BullMQ job queues, Twilio phone-OTP auth, S3 uploads, and RevenueCat billing.',
    tags: ['React Native', 'Fastify', 'PostgreSQL', 'Socket.io'],
    source: 'https://github.com/KanwalBoparai/Potion',
    live: null,
  },
  {
    name: '3D Portfolio',
    status: 'YOU ARE HERE',
    description:
      'This experience. A cinematic interactive 3D portfolio: a living robot avatar that tracks your cursor, breathes on idle, and pulses with cyan light on interaction, over a holographic particle field. React Three Fiber, GLSL shaders, Draco-compressed models, bloom post-processing, and smooth Lenis scroll — with a static fallback and reduced-motion path.',
    tags: ['React Three Fiber', 'Three.js', 'GLSL', 'Tailwind'],
    source: 'https://github.com/KanwalBoparai/3d-portfolio',
    live: 'https://kanwalboparai.github.io/3d-portfolio/',
  },
]

// Additional public repos — pulled from github.com/KanwalBoparai (June 2026)
export const githubRepos = [
  { name: 'Patient-Intake-Portal', language: 'TypeScript', year: '2026', note: 'Next.js · GraphQL · Supabase intake portal (deployed)', url: 'https://github.com/KanwalBoparai/Patient-Intake-Portal' },
  { name: 'carpet-voice-agent', language: 'Python', year: '2026', note: 'AI voice agent · Claude tool-use · Vapi telephony', url: 'https://github.com/KanwalBoparai/carpet-voice-agent' },
  { name: 'Recipe-website-2023', language: 'JavaScript', year: '2023', note: 'Early React web build', url: 'https://github.com/KanwalBoparai/Recipe-website-2023' },
  { name: 'Python-Game', language: 'Python', year: '2023', note: 'Early game build', url: 'https://github.com/KanwalBoparai/Python-Game' },
]

export const experiences = [
  {
    title: 'IT Analyst',
    company: 'Würth Canada Limited',
    location: 'Guelph, ON',
    date: 'Jan 2026 – Apr 2026',
    points: [
      'Supporting MDM and Azure AD migration: redesigning device enrollment, compliance policies, and access workflows with RAG-style retrieval for internal IT documentation.',
      'Partnering with Würth Germany on an AI governance platform that restricts unauthorized AI usage and prevents company data leakage to non-approved models.',
      'Leading upgrade and stabilization of the Speedy mobile app for new iOS releases across MDM policies, API integrations, and backend services.',
    ],
  },
  {
    title: 'Software Engineering Intern',
    company: 'Modern Automotive Limited',
    location: 'Remote',
    date: 'Oct 2024 – Dec 2024',
    points: [
      'Built full-stack features for a hybrid-vehicle control dashboard in React (TypeScript) and Node.js, owning RESTful APIs, JWT auth, and third-party integrations for real-time data sync end-to-end.',
      'Authored automated tests with Jest and React Testing Library; designed a CI/CD pipeline with GitHub Actions that reduced deployment time by 40%.',
      'Shipped features in two-week Agile sprints with daily stand-ups, owning work from design through production deployment.',
    ],
  },
  {
    title: 'IT Support',
    company: 'CAA (Canadian Automobile Association)',
    location: 'Toronto, ON',
    date: 'Sep 2023 – Dec 2023',
    points: [
      'Built a Python + Hugging Face Speech2Text pipeline that converted call recordings into searchable transcripts; automated reporting pipelines, reducing manual effort by 30%.',
    ],
  },
  {
    title: 'Founder & Engineer',
    company: 'BAAJJ',
    location: 'Canada',
    date: 'Dec 2022 – Jun 2023',
    points: [
      'Founded and ran a drop-shipping e-commerce business solo, generating real revenue from day one before pausing to focus on university.',
      'Built the full storefront using Shopify Liquid, HTML/CSS, and JavaScript; designed prototypes and UI in Figma with focus on responsive layout, typography, and visual hierarchy.',
      'Drove growth using Google Analytics and Facebook Insights to optimize conversion; negotiated with suppliers and trained customer service team.',
    ],
  },
  {
    title: 'Web Developer (Freelance)',
    company: 'Crystal Hood System',
    location: 'Toronto, ON',
    date: 'Feb 2021 – Aug 2021',
    link: 'https://crystalhoodsystem.com/',
    points: [
      'Built and shipped a production marketing site with TypeScript and Next.js focused on responsive design and SEO; integrated Firebase, next-seo, and Google reCAPTCHA.',
    ],
  },
]

export const skillCategories = [
  {
    category: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Python', 'C/C++', 'SQL', 'HTML/CSS', 'Liquid'],
  },
  {
    category: 'Frontend',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Three.js / React Three Fiber', 'Framer Motion', 'Figma'],
  },
  {
    category: 'Backend & Data',
    skills: ['Node.js', 'FastAPI', 'RESTful APIs', 'JWT Auth', 'PostgreSQL', 'AWS', 'GCP', 'Vercel'],
  },
  {
    category: 'AI / LLMs',
    skills: [
      'OpenAI & Anthropic APIs', 'Claude Code', 'OpenRouter', 'Hugging Face', 'LangChain',
      'Prompt Engineering', 'Structured Outputs', 'Function Calling', 'RAG', 'AI Agents', 'Evals & Guardrails',
    ],
  },
  {
    category: 'DevOps & Tooling',
    skills: ['Git', 'GitHub Actions (CI/CD)', 'Codespaces', 'Jest', 'React Testing Library', 'Postman', 'Agile/Scrum'],
  },
]

export const proficiency = [
  { skill: 'Python', level: 92 },
  { skill: 'React / Next.js', level: 86 },
  { skill: 'TypeScript', level: 85 },
  { skill: 'LLMs & AI Agents', level: 83 },
  { skill: 'Node.js / FastAPI', level: 80 },
  { skill: 'RAG & Evals', level: 74 },
]

export const education = {
  degree: 'Bachelor of Computer Science',
  institution: 'University of Waterloo',
  duration: 'Jan 2023 – 2027',
  coursework:
    'Algorithms, Data Structures, Machine Learning, Statistics, Linear Algebra, Database Systems',
  achievements: [
    'President’s Scholarship of Distinction',
    'Top 15 percentile, JEE Main (NTA)',
  ],
}
