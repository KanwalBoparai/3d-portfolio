// ─────────────────────────────────────────────────────────────────────────────
// NEURAL//LINK — single source of truth for portfolio content + scene layout
// ─────────────────────────────────────────────────────────────────────────────

export const profile = {
  name: 'Kanwal Boparai',
  fullName: 'Kanwal Gurnoor Boparai',
  title: 'Full-Stack & AI/LLM Engineer',
  tagline: 'Math-CS @ University of Waterloo',
  location: 'Waterloo, Ontario, Canada',
  email: 'kanwalgurnoorboparai@gmail.com',
  schoolEmail: 'kgsbopar@uwaterloo.ca',
  github: 'https://github.com/KanwalBoparai',
  linkedin: 'https://linkedin.com/in/kanwalboparai',
  bio: 'Full-stack engineer building at the intersection of web craft and applied AI. I ship end-to-end — React/Next.js frontends, Node/FastAPI backends, and production-grade LLM systems: RAG pipelines, agent workflows, structured outputs and evals. Currently studying Mathematics–Computer Science at the University of Waterloo.',
}

// Section nodes — id, display, accent color, where the holo-node floats (world
// units, head at origin), and where its cable plugs into the skull.
export const SECTIONS = [
  {
    id: 'projects',
    label: 'PROJECTS',
    code: 'SECTOR 01',
    sub: '03 BUILDS',
    color: '#00e5ff',
    position: [-3.5, 1.9, 0.4],
    mobilePosition: [-1.45, 2.7, 0.5],
    anchor: [-0.55, 1.3, 0.62],
  },
  {
    id: 'experience',
    label: 'EXPERIENCE',
    code: 'SECTOR 02',
    sub: '05 DEPLOYMENTS',
    color: '#ffb300',
    position: [3.5, 2.0, 0.3],
    mobilePosition: [1.45, 2.7, 0.5],
    anchor: [0.55, 1.32, 0.6],
  },
  {
    id: 'skills',
    label: 'SKILLS',
    code: 'SECTOR 03',
    sub: '05 STACKS',
    color: '#9d6bff',
    position: [-3.8, -0.75, 0.7],
    mobilePosition: [-1.55, -1.75, 0.8],
    anchor: [-1.05, 0.6, 0.05],
  },
  {
    id: 'resume',
    label: 'RESUME',
    code: 'SECTOR 04',
    sub: 'DOSSIER',
    color: '#00ff9d',
    position: [3.8, -0.65, 0.7],
    mobilePosition: [1.55, -1.75, 0.8],
    anchor: [1.05, 0.62, 0.02],
  },
  {
    id: 'contact',
    label: 'CONTACT',
    code: 'SECTOR 05',
    sub: 'OPEN CHANNEL',
    color: '#ff2e88',
    position: [0, 3.45, -0.5],
    mobilePosition: [0, 3.7, -0.2],
    anchor: [0, 1.62, -0.1],
  },
]

export const projects = [
  {
    name: 'Delegate-AI',
    status: 'LIVE',
    description:
      'Voice-controlled Chrome extension that translates natural language into multi-step browser actions across any site using LLM-powered agent workflows. Full-stack agent system with embeddings-based retrieval, structured prompting and function calling — plus RAG pipelines, guardrails and an eval framework for safe, low-latency execution.',
    tags: ['React', 'TypeScript', 'FastAPI', 'LLM Agents', 'RAG'],
    source: 'https://github.com/KanwalBoparai',
    live: 'https://delegate-ai-assistant.onrender.com/',
  },
  {
    name: 'ApplyPilot',
    status: 'SHIPPED',
    description:
      'Full-stack AI job application platform — LLMs via OpenRouter (Llama 3.1) power resume parsing, outreach email generation and job tracking. Includes a Chrome extension that scrapes job postings from any page and syncs in real time, with structured-prompting pipelines for schema-conformant outputs. Deployed serverlessly on Vercel.',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'LLMs', 'Vercel'],
    source: 'https://github.com/KanwalBoparai',
    live: null,
  },
  {
    name: 'NEURAL//LINK Portfolio',
    status: 'YOU ARE HERE',
    description:
      'This experience. A cinematic interactive 3D portfolio: a cybernetic head whose eyes track your cursor, neural cables wired to holographic section nodes, camera fly-throughs along the wires, custom GLSL shaders, volumetric light and full post-processing — hand-built, no template.',
    tags: ['Three.js', 'React Three Fiber', 'GLSL', 'Post-processing', 'GSAP-grade motion'],
    source: 'https://github.com/KanwalBoparai/3d-portfolio',
    live: null,
  },
]

export const experiences = [
  {
    title: 'IT Analyst',
    company: 'Würth Canada Limited',
    date: 'Jan 2027 – Apr 2027',
    status: 'QUEUED',
    points: [
      'Supporting MDM and Azure AD migration: redesigning device enrollment, compliance policies, and access workflows with RAG-style retrieval for internal IT documentation.',
      'Partnering with Würth Germany on an AI governance platform that restricts unauthorized AI usage and prevents company data leakage to non-approved models.',
      'Leading upgrade and stabilization of the Speedy mobile app for new iOS releases across MDM policies, API integrations, and backend services.',
    ],
  },
  {
    title: 'Software Engineering Intern',
    company: 'Modern Automotive Limited',
    date: 'Oct 2024 – Dec 2024',
    status: 'COMPLETE',
    points: [
      'Built full-stack features for a hybrid-vehicle control dashboard in React (TypeScript) and Node.js, owning RESTful APIs, JWT auth, and third-party integrations for real-time data sync end-to-end.',
      'Authored automated tests with Jest and React Testing Library; designed a CI/CD pipeline with GitHub Actions that reduced deployment time by 40%.',
      'Shipped features in two-week Agile sprints with daily stand-ups, owning work from design through production deployment.',
    ],
  },
  {
    title: 'IT Support',
    company: 'CAA (Canadian Automobile Association)',
    date: 'Sep 2023 – Dec 2023',
    status: 'COMPLETE',
    points: [
      'Built a Python + Hugging Face Speech2Text pipeline that converted call recordings into searchable transcripts; automated reporting pipelines, reducing manual effort by 30%.',
    ],
  },
  {
    title: 'Founder & Engineer',
    company: 'BAAJJ',
    date: 'Dec 2022 – Jun 2023',
    status: 'COMPLETE',
    points: [
      'Founded and ran a drop-shipping e-commerce business solo, generating real revenue from day one before pausing to focus on university.',
      'Built the full storefront using Shopify Liquid, HTML/CSS, and JavaScript; designed prototypes and UI in Figma with focus on responsive layout, typography, and visual hierarchy.',
      'Drove growth using Google Analytics and Facebook Insights to optimize conversion; negotiated with suppliers and trained customer service team.',
    ],
  },
  {
    title: 'Web Developer (Freelance)',
    company: 'Crystal Hood System',
    date: 'Feb 2021 – Aug 2021',
    status: 'COMPLETE',
    link: 'https://crystalhoodsystem.com/',
    points: [
      'Built and shipped a production marketing site with TypeScript and Next.js focused on responsive design and SEO; integrated Firebase, next-seo, and Google reCAPTCHA.',
    ],
  },
]

export const skillCategories = [
  {
    category: 'Languages',
    code: 'LANG',
    skills: ['TypeScript', 'JavaScript', 'Python', 'C/C++', 'SQL', 'HTML/CSS', 'Liquid'],
  },
  {
    category: 'Frontend',
    code: 'FE',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'Three.js', 'React Three Fiber', 'Framer Motion', 'Figma'],
  },
  {
    category: 'Backend & Data',
    code: 'BE',
    skills: ['Node.js', 'FastAPI', 'RESTful APIs', 'JWT Auth', 'PostgreSQL', 'AWS', 'GCP', 'Vercel'],
  },
  {
    category: 'AI / LLMs',
    code: 'AI',
    skills: [
      'OpenAI API', 'Anthropic API', 'Claude Code', 'OpenRouter', 'Hugging Face', 'LangChain',
      'Prompt Engineering', 'Structured Outputs', 'Function Calling', 'RAG', 'AI Agents', 'Evals & Guardrails',
    ],
  },
  {
    category: 'DevOps & Tooling',
    code: 'OPS',
    skills: ['Git', 'GitHub Actions (CI/CD)', 'Codespaces', 'Jest', 'React Testing Library', 'Postman', 'Agile/Scrum'],
  },
]

export const proficiency = [
  { skill: 'Python', level: 92 },
  { skill: 'React / Next.js', level: 85 },
  { skill: 'TypeScript', level: 84 },
  { skill: 'LLMs & AI Agents', level: 82 },
  { skill: 'Node.js / FastAPI', level: 80 },
  { skill: 'RAG & Evals', level: 72 },
]

export const education = {
  degree: 'Bachelor of Mathematics — Computer Science',
  institution: 'University of Waterloo',
  duration: 'Jan 2023 – Present · Expected graduation 2027',
  coursework:
    'Algorithms, Data Structures, Linear Algebra, Machine Learning, Statistics, Database Systems',
  achievements: [
    "President's Scholarship of Distinction — University of Waterloo",
    'NTA Certification — top 15th percentile rank, JEE Main exam',
  ],
}

export const leadership = [
  {
    title: 'Member — Data Science Club',
    org: 'University of Waterloo',
    detail:
      'Workshops, networking events and collaborative projects in advanced data analysis and applied machine learning.',
  },
  {
    title: 'Participant — Google Cloud Hackathon',
    org: 'Google Cloud',
    detail:
      'Built a financial risk analysis tool on Google Cloud services with a team — data processing and risk assessment algorithms.',
  },
]

export const interests = [
  'Artificial Intelligence & ML',
  'Interactive 3D / WebGL',
  'Software Architecture',
  'Cloud Computing',
  'Open Source',
]
