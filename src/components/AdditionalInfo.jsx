import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import AquaticScene from "./canvas/AquaticScene";

const InfoCard = ({ index, title, items, icon, color }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.2, 0.75)}
    className="bg-card-gradient p-6 rounded-2xl w-full shadow-tech-card mb-6 backdrop-blur-sm border border-tech-blue border-opacity-20"
  >
    <div className="flex items-center mb-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 ${color}`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <h3 className="text-tech-blue font-bold text-[20px]">{title}</h3>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {items.map((item, idx) => (
        <div key={idx} className="flex items-center">
          <span className="text-tech-teal mr-2">•</span>
          <span className="text-white-100 text-[14px]">{item}</span>
        </div>
      ))}
    </div>
  </motion.div>
);

const SkillBadge = ({ skill, level, color }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-gradient-to-r from-tertiary to-black-200 p-4 rounded-xl shadow-tech-card"
  >
    <div className="flex justify-between items-center mb-2">
      <span className="text-white font-semibold text-[16px]">{skill}</span>
      <span className={`text-[12px] px-2 py-1 rounded-full ${color}`}>{level}</span>
    </div>
    <div className="w-full bg-black-100 rounded-full h-2">
      <div 
        className={`h-2 rounded-full ${color.replace('text-white', 'bg-tech-blue')}`}
        style={{ 
          width: level === 'Expert' ? '90%' : 
                 level === 'Advanced' ? '75%' : 
                 level === 'Intermediate' ? '60%' : '45%' 
        }}
      ></div>
    </div>
  </motion.div>
);

const AdditionalInfo = () => {
  const infoData = [
    {
      title: "Interests & Passions",
      icon: "🚀",
      color: "bg-tech-blue",
      items: [
        "Artificial Intelligence & Machine Learning",
        "Data Science & Analytics",
        "Software Architecture",
        "Cloud Computing",
        "Open Source Contributions",
        "Tech Innovation"
      ]
    },
    {
      title: "Core Strengths",
      icon: "💪",
      color: "bg-tech-purple",
      items: [
        "Strong Team Collaboration & Leadership",
        "Initiative & Problem-Solving",
        "Effective Communication & Presentation",
        "Adaptability & Quick Learning",
        "Excellent Time Management Skills",
        "Critical Thinking"
      ]
    }
  ];

  const skills = [
    { skill: "Problem Solving", level: "Expert", color: "bg-tech-blue text-white" },
    { skill: "Team Leadership", level: "Advanced", color: "bg-tech-purple text-white" },
    { skill: "Communication", level: "Advanced", color: "bg-tech-teal text-white" },
    { skill: "Adaptability", level: "Expert", color: "bg-tech-pink text-white" },
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>What drives me</p>
        <h2 className={`${styles.sectionHeadText}`}>Additional Information.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-white text-[17px] max-w-3xl leading-[30px]"
      >
        Beyond technical skills, I bring a passion for innovation and a commitment to continuous 
        learning. My interests in AI/ML and strong interpersonal skills enable me to bridge 
        technical complexity with practical solutions.
      </motion.p>

      <div className="mt-20 flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          {infoData.map((info, index) => (
            <InfoCard
              key={`info-${index}`}
              index={index}
              {...info}
            />
          ))}
          
          {/* Skills Section */}
          <motion.div
            variants={fadeIn("up", "spring", 0.4, 0.75)}
            className="bg-vibrant-gradient p-6 rounded-2xl shadow-tech-card backdrop-blur-sm"
          >
            <h3 className="text-white font-bold text-[20px] mb-6">Soft Skills Proficiency</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <SkillBadge key={index} {...skill} />
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* 3D Aquatic Scene */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex-1 h-[400px] lg:h-[500px]"
        >
          <AquaticScene />
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(AdditionalInfo, "additional");
