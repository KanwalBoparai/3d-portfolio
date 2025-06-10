import { motion } from "framer-motion";
import { styles } from "../styles";
import { RobotCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto`}>
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-col lg:flex-row items-start gap-5`}
      >
        <div className='flex lg:flex-row flex-col items-start gap-5 w-full'>
          <div className='flex flex-col justify-center items-center mt-5'>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className='w-5 h-5 rounded-full bg-tech-blue'
            />
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "80px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className='w-1 sm:h-80 h-40 bg-gradient-to-b from-tech-blue to-tech-purple'
            />
          </div>

          <div className='flex-1 lg:max-w-[50%]'>
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`${styles.heroHeadText} text-white`}
            >
              Hi, I'm <span className='text-tech-blue'>Kanwal</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className={`${styles.heroSubText} mt-2 text-white-100`}
            >
              Building Innovative Software Solutions while Studying at the <br className='sm:block hidden' />
              University of Waterloo.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="py-3 px-8 bg-tech-blue text-white rounded-full font-bold shadow-lg hover:bg-opacity-90 transition-all"
                onClick={() => {
                  const projectsSection = document.getElementById('projects');
                  if (projectsSection) {
                    projectsSection.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
              >
                View My Work
              </motion.button>
            </motion.div>
          </div>

          {/* 3D Robot Section */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className='flex-1 lg:max-w-[50%] h-[400px] lg:h-[500px] xl:h-[600px] w-full'
          >
            <RobotCanvas />
          </motion.div>
        </div>
      </div>

      <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-tech-blue flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-tech-blue mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
