import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import LeadershipScene from "./canvas/LeadershipScene";

const LeadershipCard = ({ index, title, organization, description, type }) => (
  <motion.div
    variants={fadeIn("up", "spring", index * 0.3, 0.75)}
    className="bg-card-gradient p-6 rounded-2xl w-full shadow-tech-card mb-6 backdrop-blur-sm border border-tech-blue border-opacity-20"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex-1">
        <h3 className="text-tech-blue font-bold text-[20px]">{title}</h3>
        <p className="text-tech-purple text-[16px] font-semibold">{organization}</p>
      </div>
      <div className={`px-3 py-1 rounded-full text-[12px] font-semibold ${
        type === 'leadership' ? 'bg-tech-blue text-white' : 
        type === 'membership' ? 'bg-tech-teal text-white' : 
        'bg-tech-purple text-white'
      }`}>
        {type === 'leadership' ? 'Leadership' : 
         type === 'membership' ? 'Membership' : 
         'Participation'}
      </div>
    </div>
    
    <p className="text-white-100 text-[14px] leading-relaxed">{description}</p>
  </motion.div>
);

const Leadership = () => {
  const leadershipData = [
    {
      title: "Member",
      organization: "University of Waterloo Data Science Club",
      description: "Active member participating in data science workshops, networking events, and collaborative projects. Engaged in learning advanced data analysis techniques and machine learning applications.",
      type: "membership"
    },
    {
      title: "Participant",
      organization: "Google Cloud Hackathon",
      description: "Developed a financial risk analysis tool using Google Cloud services. Collaborated with a team to create innovative solutions for financial data processing and risk assessment algorithms.",
      type: "participation"
    }
  ];

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>Beyond academics</p>
        <h2 className={`${styles.sectionHeadText}`}>Leadership & Extracurricular.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-white text-[17px] max-w-3xl leading-[30px]"
      >
        My involvement in extracurricular activities and leadership roles has shaped my collaborative 
        skills and passion for technology. Through various clubs and competitions, I've gained valuable 
        experience in teamwork, innovation, and community engagement.
      </motion.p>

      <div className="mt-20 flex flex-col lg:flex-row gap-10">
        <div className="flex-1">
          {leadershipData.map((item, index) => (
            <LeadershipCard
              key={`leadership-${index}`}
              index={index}
              {...item}
            />
          ))}
          
          {/* Additional Skills Section */}
          <motion.div
            variants={fadeIn("up", "spring", 0.6, 0.75)}
            className="bg-tech-gradient p-6 rounded-2xl shadow-tech-card backdrop-blur-sm"
          >
            <h3 className="text-white font-bold text-[20px] mb-4">Leadership Skills Developed</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-white-100 text-[14px]">
                <span className="text-tech-teal font-semibold">•</span> Team Collaboration
              </div>
              <div className="text-white-100 text-[14px]">
                <span className="text-tech-teal font-semibold">•</span> Project Management
              </div>
              <div className="text-white-100 text-[14px]">
                <span className="text-tech-teal font-semibold">•</span> Innovation & Creativity
              </div>
              <div className="text-white-100 text-[14px]">
                <span className="text-tech-teal font-semibold">•</span> Problem Solving
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* 3D Leadership Scene */}
        <motion.div 
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="flex-1 h-[400px] lg:h-[500px]"
        >
          <LeadershipScene />
        </motion.div>
      </div>
    </>
  );
};

export default SectionWrapper(Leadership, "leadership");
