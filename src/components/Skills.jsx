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
      skills: ["Python", "C/C++", "TypeScript", "JavaScript", "HTML", "SQL", "VBA"]
    },
    {
      category: "Web Development",
      icon: "🌐",
      color: "bg-tech-purple",
      skills: ["Next.js", "Node.js", "Three.js", "React", "Tailwind CSS", "Shopify Development"]
    },
    {
      category: "Tools & Technologies",
      icon: "🛠️",
      color: "bg-tech-teal",
      skills: ["Git", "Linux", "AWS", "MySQL", "Google Cloud Platform", "Figma", "Miro", "Framer"]
    },
    {
      category: "Specialized Skills",
      icon: "⚡",
      color: "bg-tech-pink",
      skills: ["3D Graphics", "REST APIs", "Google Analytics", "Hugging Face", "Agile Development", "SEO Techniques"]
    }
  ];

  const topSkills = [
    { skill: "React.js", level: "Advanced", color: "bg-tech-blue text-white" },
    { skill: "Three.js", level: "Intermediate", color: "bg-tech-purple text-white" },
    { skill: "Node.js", level: "Advanced", color: "bg-tech-teal text-white" },
    { skill: "Python", level: "Expert", color: "bg-tech-pink text-white" },
    { skill: "TypeScript", level: "Advanced", color: "bg-tech-blue text-white" },
    { skill: "AWS", level: "Intermediate", color: "bg-tech-purple text-white" },
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
        I specialize in modern web technologies and frameworks, with expertise spanning from 
        frontend development with React and Three.js to backend systems with Node.js and cloud 
        platforms. My diverse skill set enables me to build comprehensive, scalable solutions.
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
