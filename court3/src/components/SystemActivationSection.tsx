import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Eye, Activity, Shield } from "lucide-react";
import BrokenClock from "./BrokenClock";

const SystemActivationSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const clockRepair = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const glowIntensity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="narrative-section bg-gradient-to-b from-background via-secondary/10 to-background py-32 relative overflow-hidden"
    >
      {/* Activation glow effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: `radial-gradient(circle, hsl(43 52% 59% / ${glowIntensity.get() * 0.15}) 0%, transparent 60%)`,
        }}
      />

      <div className="judicial-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Repairing clock */}
          <motion.div
            className="flex justify-center order-2 lg:order-1"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <BrokenClock scrollProgress={clockRepair.get()} />
              
              {/* Activation rings */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              >
                {[1, 2, 3].map((ring) => (
                  <motion.div
                    key={ring}
                    className="absolute border border-primary/20 rounded-full"
                    style={{
                      width: `${100 + ring * 30}%`,
                      height: `${100 + ring * 30}%`,
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.3, 0.1, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      delay: ring * 0.3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="text-center lg:text-left order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 justify-center lg:justify-start mb-6">
              <Activity className="w-6 h-6 text-status-success" />
              <span className="text-status-success text-sm tracking-[0.2em] uppercase">
                System Activating
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-serif text-foreground mb-6">
              Time Begins to Move
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              When monitoring begins, the clock starts again. Not to rush justice—
              but to ensure it is not forgotten. Every case tracked. Every delay visible.
              Every action accountable.
            </p>

            {/* Feature highlights */}
            <div className="space-y-4">
              {[
                { icon: Eye, text: "Continuous case monitoring" },
                { icon: Activity, text: "Real-time timeline tracking" },
                { icon: Shield, text: "Judicial accountability framework" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 glass-panel p-4"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <item.icon className="w-5 h-5 text-primary" />
                  <span className="text-foreground">{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SystemActivationSection;
