import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import SkillsScene from "./canvas/SkillsScene";

const Tech = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText}`}>My technical expertise</p>
        <h2 className={`${styles.sectionHeadText}`}>Skills.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-dark-blue text-[17px] max-w-3xl leading-[30px]"
      >
        I specialize in modern web technologies and frameworks, with a focus on creating
        responsive, interactive, and visually appealing applications. My technical skills
        include front-end and back-end development, with expertise in React, Node.js,
        TypeScript, and Three.js.
      </motion.p>

      <div className="mt-20 h-[60vh]">
        <SkillsScene />
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "skills");
