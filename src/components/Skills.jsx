import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import CarScene from "./canvas/CarScene";

const SkillCard = ({ index, category, skills, icon, color }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.2, 0.75)}
    whileHover={{ y: -5, transition: { duration: 0.3 } }}
    className="bg-card-gradient p-6 rounded-2xl shadow-tech-card mb-6 backdrop-blur-sm border border-tech-blue border-opacity-20"
  >
    <div className="flex items-center mb-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${color}`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-tech-blue font-bold text-[20px]">{category}</h3>
    </div>
    
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, idx) => (
        <motion.span
          key={idx}
          whileHover={{ scale: 1.05 }}
          className="bg-ocean-deep text-pearl-white px-3 py-1 rounded-full text-[12px] font-medium border border-aqua-glow border-opacity-30 hover:border-opacity-100 transition-all shadow-sm"
        >
          {skill}
        </motion.span>
      ))}
    </div>
  </motion.div>
);

const ProficiencyBar = ({ skill, level, color }) => {
  const getWidth = (level) => {
    switch(level) {
      case 'Expert': return '90%';
      case 'Advanced': return '75%';
      case 'Intermediate': return '60%';
      case 'Beginner': return '40%';
      default: return '50%';
    }
  };

  return (
    <motion.div
      variants={fadeIn("right", "spring", 0.1, 0.75)}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-pearl-white font-medium text-[14px]">{skill}</span>
        <span className={`text-[12px] px-2 py-1 rounded-full ${color}`}>{level}</span>
      </div>
      <div className="w-full bg-ocean-deep rounded-full h-2">
        <motion.div 
          className="h-2 rounded-full bg-gradient-to-r from-aqua-glow to-sea-foam"
          initial={{ width: 0 }}
          animate={{ width: getWidth(level) }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

const Skills = () => {
  const skillCategories = [
    {
      category: "Languages",
      icon: "💻",
      color: "bg-tech-blue",
      skills: ["TypeScript", "JavaScript", "Python", "C/C++", "SQL", "HTML/CSS", "Liquid"],
    },
    {
      category: "Frontend",
      icon: "🌐",
      color: "bg-tech-purple",
      skills: ["React", "Next.js", "Tailwind CSS", "Three.js", "React Three Fiber", "Framer Motion", "Figma"],
    },
    {
      category: "Backend & Data",
      icon: "🗄️",
      color: "bg-tech-teal",
      skills: ["Node.js", "FastAPI", "RESTful APIs", "JWT Auth", "PostgreSQL", "AWS", "GCP", "Vercel"],
    },
    {
      category: "AI / LLMs",
      icon: "🤖",
      color: "bg-tech-pink",
      skills: ["OpenAI API", "Anthropic API", "Claude Code", "OpenRouter", "Hugging Face", "LangChain", "Prompt Engineering", "Structured Outputs", "Function Calling", "RAG", "AI Agents", "Evals & Guardrails"],
    },
    {
      category: "DevOps & Tooling",
      icon: "⚙️",
      color: "bg-tech-blue",
      skills: ["Git", "GitHub Actions (CI/CD)", "Codespaces", "Jest", "React Testing Library", "Postman", "Agile/Scrum"],
    },
  ];

  const topSkills = [
    { skill: "React / Next.js", level: "Advanced", color: "bg-tech-blue text-white" },
    { skill: "TypeScript", level: "Advanced", color: "bg-tech-purple text-white" },
    { skill: "Python", level: "Expert", color: "bg-tech-teal text-white" },
    { skill: "Node.js / FastAPI", level: "Advanced", color: "bg-tech-pink text-white" },
    { skill: "LLMs & AI Agents", level: "Advanced", color: "bg-tech-blue text-white" },
    { skill: "RAG & Evals", level: "Intermediate", color: "bg-tech-purple text-white" },
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My technical expertise</p>
        <h2 className={`${styles.sectionHeadText}`}>Skills.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-ocean-light text-[17px] max-w-3xl leading-[30px]"
      >
        Full-stack engineer comfortable across TypeScript, Python, and the modern web stack —
        with a strong focus on AI/LLM systems: RAG pipelines, agent workflows, structured outputs,
        function calling, and evals. I build end-to-end from React frontends to FastAPI backends
        to production-grade LLM integrations.
      </motion.p>

      <div className="mt-20 flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          {/* Skill Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {skillCategories.map((category, index) => (
              <SkillCard
                key={`category-${index}`}
                index={index}
                {...category}
              />
            ))}
          </div>
          
          {/* Top Skills Proficiency */}
          <motion.div
            variants={fadeIn("up", "spring", 0.6, 0.75)}
            className="bg-vibrant-gradient p-6 rounded-2xl shadow-tech-card backdrop-blur-sm"
          >
            <h3 className="text-white font-bold text-[20px] mb-6">Proficiency Levels</h3>
            {topSkills.map((skill, index) => (
              <ProficiencyBar key={index} {...skill} />
            ))}
          </motion.div>
        </div>
        
        {/* 3D Car Scene */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex-1 h-[400px] lg:h-[600px]"
        >
          <CarScene />
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Skills, "skills");
