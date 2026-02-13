import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import BrokenClock from "./BrokenClock";
import DustParticles from "./DustParticles";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const clockProgress = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[150vh] flex flex-col items-center justify-start pt-[20vh] overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-secondary/20" />
      
      {/* Ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <DustParticles />

      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        {/* Small caps intro */}
        <motion.p
          className="text-primary/70 text-sm tracking-[0.3em] uppercase mb-8 font-sans"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          A Judicial Monitoring Platform
        </motion.p>

        {/* Main headline */}
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Justice is waiting.
        </motion.h1>

        {/* Sub headline */}
        <motion.p
          className="text-2xl md:text-3xl lg:text-4xl font-serif text-primary mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          Time is not.
        </motion.p>

        {/* The broken clock */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
        >
          <BrokenClock scrollProgress={clockProgress.get()} />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <span className="text-muted-foreground text-sm tracking-wider uppercase">
            Scroll to witness
          </span>
          <motion.div
            className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center pt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-3 bg-primary/60 rounded-full"
              animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
