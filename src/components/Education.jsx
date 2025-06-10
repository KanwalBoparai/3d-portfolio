import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import EducationScene from "./canvas/EducationScene";

const EducationCard = ({ index, degree, institution, duration, details, achievements }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.5, 0.75)}
    className="bg-card-gradient p-6 rounded-2xl w-full shadow-tech-card backdrop-blur-sm border border-tech-blue border-opacity-20"
  >
    <div className="mb-4">
      <h3 className="text-aqua-glow font-bold text-[24px]">{degree}</h3>
      <p className="text-ocean-light text-[18px] font-semibold">{institution}</p>
      <p className="text-text-secondary text-[16px]">{duration}</p>
    </div>
    
    {achievements && (
      <div className="mb-4">
        <h4 className="text-sea-foam font-semibold text-[18px] mb-2">Academic Achievements</h4>
        <ul className="list-disc list-inside space-y-1">
          {achievements.map((achievement, idx) => (
            <li key={idx} className="text-pearl-white text-[14px]">{achievement}</li>
          ))}
        </ul>
      </div>
    )}
    
    {details && (
      <div>
        <h4 className="text-sea-foam font-semibold text-[18px] mb-2">Relevant Coursework</h4>
        <p className="text-pearl-white text-[14px] leading-relaxed">{details}</p>
      </div>
    )}
  </motion.div>
);

const Education = () => {
  const educationData = [
    {
      degree: "Bachelor of Mathematics-Computer Science",
      institution: "University of Waterloo",
      duration: "Jan 2023 - Current (Expected Graduation: 2027)",
      achievements: [
        "President's Scholarship of Distinction for academic excellence in University of Waterloo",
        "National Testing Agency (NTA) Certification - Secured a rank within top 15 percentile for JEE Main exam"
      ],
      details: "Algorithms, Data Structures, Linear Algebra, Machine Learning, Statistics, Computer Applications in Business: Database Systems"
    }
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My academic journey</p>
        <h2 className={`${styles.sectionHeadText}`}>Education.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-ocean-light text-[17px] max-w-3xl leading-[30px]"
      >
        My educational background in Computer Science and Mathematics provides a strong foundation 
        for software development and problem-solving. I'm currently pursuing my degree at the 
        University of Waterloo, one of Canada's leading institutions for technology and innovation.
      </motion.p>

      <div className="mt-20 flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          {educationData.map((education, index) => (
            <EducationCard
              key={`education-${index}`}
              index={index}
              {...education}
            />
          ))}
        </div>
        
        {/* 3D Education Scene */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex-1 h-[400px] lg:h-[500px]"
        >
          <EducationScene />
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Education, "education");
