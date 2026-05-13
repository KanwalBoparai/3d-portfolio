import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 30 });

  const handleMouse = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const ProjectCard = ({ index, name, description, tags, image, source_code_link, live_demo_link }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.15, 0.6)}
      className="w-full"
    >
      <TiltCard className="h-full">
        <div
          className="glass-card rounded-2xl overflow-hidden h-full flex flex-col group"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Project image */}
          <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Image overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-300"
              style={{
                background: "linear-gradient(to bottom, transparent 30%, rgba(5, 10, 21, 0.85) 100%)",
                opacity: hovered ? 1 : 0.4,
              }}
            />

            {/* Action buttons */}
            <div className="absolute top-3 right-3 flex gap-2">
              {live_demo_link && (
                <motion.a
                  href={live_demo_link}
                  target="_blank"
                  rel="noreferrer"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -6 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-semibold glass border border-white/15 hover:border-[#4A9EFF]/40 transition-colors"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <span>Live</span>
                  <span>↗</span>
                </motion.a>
              )}
              <motion.a
                href={source_code_link}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-white text-xs font-semibold glass border border-white/15 hover:border-[#4A9EFF]/40 transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                <img src={github} alt="GitHub" className="w-3.5 h-3.5 object-contain" />
                <span>Code</span>
              </motion.a>
            </div>
          </div>

          {/* Card content */}
          <div className="p-5 flex-1 flex flex-col">
            <h3
              className="font-display font-bold text-[18px] text-[#0A0908] mb-2 leading-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              {name}
            </h3>
            <p
              className="text-[#6B6258] text-[13px] leading-relaxed flex-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {tags.map((tag) => (
                <span
                  key={tag.name}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono border border-white/8 bg-white/4 ${tag.color}`}
                >
                  #{tag.name}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom accent line that animates on hover */}
          <div
            className="h-[2px] transition-all duration-500"
            style={{
              background: "linear-gradient(90deg, #4A9EFF, #8B5CF6, #00D4AA)",
              opacity: hovered ? 1 : 0,
              transform: `scaleX(${hovered ? 1 : 0})`,
              transformOrigin: "left",
            }}
          />
        </div>
      </TiltCard>
    </motion.div>
  );
};

const Projects = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className="section-num mb-2">03 / WORK</p>
        <h2
          className="font-display font-bold text-[#E8F4FD] mb-4"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            letterSpacing: "-0.02em",
          }}
        >
          Selected Projects.
        </h2>
      </motion.div>

      <div className="w-full">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-[#94A3B8] text-[15px] max-w-2xl leading-[1.75]"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Real-world software built with care — from full-stack applications to interactive 3D experiences.
          Each reflects my ability to deliver clean, scalable solutions across different domains.
        </motion.p>
      </div>

      {/* Bento grid */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Projects, "projects");
