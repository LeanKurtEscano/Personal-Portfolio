import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import puge2 from "../assets/puge2.jpg";

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, 
    threshold: 0.1,
  });

  return (
    <section className="flex pr-[80px] md:pr-[0px] bg-darkbg items-center justify-center py-12 px-6">
      <div className="flex items-center max-w-4xl mx-auto space-x-8">
        
      
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -100 }} 
          animate={{
            opacity: inView ? 1 : 0,
            x: inView ? 0 : -100,
          }}
          transition={{ duration: 0.8 }}
          className="w-1/3"
        >
          <img
            src={puge2}
            alt="About Me"
            className="w-full h-auto hidden md:block rounded-lg shadow-lg"
          />
        </motion.div>

      
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: 100 }} 
          animate={{
            opacity: inView ? 1 : 0,
            x: inView ? 0 : 100,
          }}
          transition={{ duration: 0.8 }}
          className="md:w-2/3 pl-16 text-gray-800"
        >
          <h2 className="bg-gradient-to-br text-3xl from-cyan-400 to-blue-600 bg-clip-text text-transparent font-bold mb-4">
            About Me
          </h2>

          <p className="md:text-lg text-darktext3 mb-4">
            Hello! I have skills in Full Stack development with a particular focus on backend development. I enjoy solving complex
            problems and creating APIs that power seamless user experiences. I'm always eager to learn and explore new
            tools, frameworks, and best practices to improve my skills and stay up to date with the ever-evolving tech landscape.
          </p>
          <p className="md:text-lg text-darktext3 mb-4">
            I am particularly focused on building projects that challenge my skills and help me grow as a developer. My goal is to
            continue developing my expertise in backend development while working on impactful applications. I aspire to become a
            software engineer someday, contributing to innovative solutions and making a positive impact in the tech industry.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
