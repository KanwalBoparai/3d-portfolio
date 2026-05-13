import {
    mobile,
    backend,
    creator,
    web,
    javascript,
    typescript,
    html,
    css,
    reactjs,
    redux,
    tailwind,
    nodejs,
    mongodb,
    git,
    figma,
    docker,
    caa,
    baajj,
    carrent,
    jobit,
    tripguide,
    threejs,
  } from "../assets";
  
  export const navLinks = [
    {
      id: "about",
      title: "About",
    },
    {
      id: "education",
      title: "Education",
    },
    {
      id: "work",
      title: "Work",
    },
    {
      id: "skills",
      title: "Skills",
    },
    {
      id: "leadership",
      title: "Leadership",
    },
    {
      id: "projects",
      title: "Projects",
    },
    {
      id: "additional",
      title: "Additional",
    },
    {
      id: "contact",
      title: "Contact",
    },
  ];
  
  const services = [
    {
      title: "Full-Stack Engineer",
      icon: web,
    },
    {
      title: "AI / LLM Developer",
      icon: creator,
    },
    {
      title: "Founder & Builder",
      icon: mobile,
    },
    {
      title: "3D / Frontend Specialist",
      icon: backend,
    },
  ];
  
  const technologies = [
    {
      name: "HTML 5",
      icon: html,
    },
    {
      name: "CSS 3",
      icon: css,
    },
    {
      name: "JavaScript",
      icon: javascript,
    },
    {
      name: "TypeScript",
      icon: typescript,
    },
    {
      name: "React JS",
      icon: reactjs,
    },
    {
      name: "Redux Toolkit",
      icon: redux,
    },
    {
      name: "Tailwind CSS",
      icon: tailwind,
    },
    {
      name: "Node JS",
      icon: nodejs,
    },
    {
      name: "MongoDB",
      icon: mongodb,
    },
    {
      name: "Three JS",
      icon: threejs,
    },
    {
      name: "git",
      icon: git,
    },
    {
      name: "figma",
      icon: figma,
    },
    {
      name: "docker",
      icon: docker,
    },
  ];
  
  const experiences = [
    {
      title: "IT Analyst",
      company_name: "Wurth Canada Limited",
      icon: creator,
      iconBg: "#ffffff",
      date: "Jan 2027 – Apr 2027",
      points: [
        "Supporting MDM and Azure AD migration: redesigning device enrollment, compliance policies, and access workflows with RAG-style retrieval for internal IT documentation.",
        "Partnering with Würth Germany on an AI governance platform that restricts unauthorized AI usage and prevents company data leakage to non-approved models.",
        "Leading upgrade and stabilization of the Speedy mobile app for new iOS releases across MDM policies, API integrations, and backend services.",
      ],
    },
    {
      title: "Software Engineering Intern",
      company_name: "Modern Automotive Limited",
      icon: web,
      iconBg: "#ffffff",
      date: "Oct 2024 – Dec 2024",
      points: [
        "Built full-stack features for a hybrid-vehicle control dashboard in React (TypeScript) and Node.js, owning RESTful APIs, JWT auth, and third-party integrations for real-time data sync end-to-end.",
        "Authored automated tests with Jest and React Testing Library; designed a CI/CD pipeline with GitHub Actions that reduced deployment time by 40%.",
        "Shipped features in two-week Agile sprints with daily stand-ups, owning work from design through production deployment.",
      ],
    },
    {
      title: "IT Support",
      company_name: "CAA (Canadian Automobile Association)",
      icon: caa,
      iconBg: "#E6DEDD",
      date: "Sep 2023 – Dec 2023",
      points: [
        "Built a Python + Hugging Face Speech2Text pipeline that converted call recordings into searchable transcripts; automated reporting pipelines, reducing manual effort by 30%.",
      ],
    },
    {
      title: "Founder & Engineer",
      company_name: "BAAJJ",
      icon: baajj,
      iconBg: "#000000",
      date: "Dec 2022 – Jun 2023",
      points: [
        "Founded and ran a drop-shipping e-commerce business solo, generating real revenue from day one before pausing to focus on university.",
        "Built the full storefront using Shopify Liquid, HTML/CSS, and JavaScript; designed prototypes and UI in Figma with focus on responsive layout, typography, and visual hierarchy.",
        "Drove growth using Google Analytics and Facebook Insights to optimize conversion; negotiated with suppliers and trained customer service team.",
      ],
    },
    {
      title: "Web Developer (Freelance)",
      company_name: "Crystal Hood System",
      icon: backend,
      iconBg: "#ffffff",
      date: "Feb 2021 – Aug 2021",
      link: "https://crystalhoodsystem.com/",
      points: [
        "Built and shipped a production marketing site with TypeScript and Next.js focused on responsive design and SEO; integrated Firebase, next-seo, and Google reCAPTCHA.",
      ],
    },
  ];
  
  const testimonials = [
    {
      testimonial:
        "I thought it was impossible to make a website as beautiful as our product, but Kanwal proved me wrong.",
      name: "Sara Lee",
      designation: "CFO",
      company: "Acme Co",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    {
      testimonial:
        "I've never met a web developer who truly cares about their clients' success like Rick does.",
      name: "Chris Brown",
      designation: "COO",
      company: "DEF Corp",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    {
      testimonial:
        "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
      name: "Lisa Wang",
      designation: "CTO",
      company: "456 Enterprises",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
    },
  ];
  
  const projects = [
    {
      name: "Delegate-AI",
      description:
        "Voice-controlled Chrome extension that translates natural language into multi-step browser actions across any site using LLM-powered agent workflows. Architected the full-stack agent system with embeddings-based retrieval, structured prompting, and function calling; built RAG pipelines, guardrails, and an eval framework to reduce hallucinations and ensure safe, low-latency execution.",
      tags: [
        {
          name: "react",
          color: "blue-text-gradient",
        },
        {
          name: "typescript",
          color: "green-text-gradient",
        },
        {
          name: "fastapi",
          color: "pink-text-gradient",
        },
        {
          name: "llms",
          color: "orange-text-gradient",
        },
      ],
      image: carrent,
      source_code_link: "https://github.com/KanwalBoparai",
      live_demo_link: "https://delegate-ai-assistant.onrender.com/",
    },
    {
      name: "ApplyPilot",
      description:
        "Full-stack AI job application platform with LLMs via OpenRouter (Llama 3.1) powering resume parsing, outreach email generation, and job tracking. Shipped a Chrome extension that scrapes job postings from any page and syncs in real time; structured-prompting pipelines for schema-conformant LLM outputs. Deployed serverlessly on Vercel.",
      tags: [
        {
          name: "next.js",
          color: "blue-text-gradient",
        },
        {
          name: "typescript",
          color: "green-text-gradient",
        },
        {
          name: "postgresql",
          color: "pink-text-gradient",
        },
        {
          name: "llms",
          color: "orange-text-gradient",
        },
      ],
      image: jobit,
      source_code_link: "https://github.com/KanwalBoparai",
    },
    {
      name: "3D Portfolio",
      description:
        "Fully interactive 3D portfolio with canvas geometry, Framer Motion animations, and a modular component architecture; designed every layout and transition by hand.",
      tags: [
        {
          name: "three.js",
          color: "blue-text-gradient",
        },
        {
          name: "react",
          color: "green-text-gradient",
        },
        {
          name: "react-three-fiber",
          color: "pink-text-gradient",
        },
        {
          name: "tailwind",
          color: "orange-text-gradient",
        },
      ],
      image: tripguide,
      source_code_link: "https://github.com/KanwalBoparai/kanwal-3d-portfolio",
      live_demo_link: "https://3d-portfolio-git-main-kanwalboparais-projects.vercel.app/",
    },
  ];

  export { services, technologies, experiences, testimonials ,projects};
