import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FileText, Clock, AlertTriangle } from "lucide-react";

const floatingCases = [
  { id: 1, x: "10%", y: "20%", rotation: -15, delay: 0 },
  { id: 2, x: "75%", y: "15%", rotation: 12, delay: 0.2 },
  { id: 3, x: "20%", y: "60%", rotation: -8, delay: 0.4 },
  { id: 4, x: "80%", y: "55%", rotation: 20, delay: 0.6 },
  { id: 5, x: "50%", y: "75%", rotation: -5, delay: 0.8 },
  { id: 6, x: "30%", y: "35%", rotation: 10, delay: 1 },
];

const ProblemSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  return (
    <section
      ref={containerRef}
      className="narrative-section bg-gradient-to-b from-secondary/20 to-background py-32"
    >
      {/* Floating scattered case files */}
      {floatingCases.map((caseFile) => (
        <motion.div
          key={caseFile.id}
          className="absolute glass-panel p-4 w-32 md:w-40 opacity-30"
          style={{
            left: caseFile.x,
            top: caseFile.y,
            rotate: caseFile.rotation,
          }}
          animate={{
            y: [-10, 10, -10],
            rotate: [caseFile.rotation - 2, caseFile.rotation + 2, caseFile.rotation - 2],
          }}
          transition={{
            duration: 6,
            delay: caseFile.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <FileText className="w-6 h-6 text-primary/40 mb-2" />
          <div className="h-1 w-full bg-primary/20 rounded mb-1" />
          <div className="h-1 w-3/4 bg-primary/10 rounded mb-1" />
          <div className="h-1 w-1/2 bg-primary/10 rounded" />
        </motion.div>
      ))}

      {/* Main content */}
      <motion.div
        className="relative z-10 judicial-container text-center"
        style={{ opacity, y }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <AlertTriangle className="w-12 h-12 text-status-danger mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
            The Weight of Time
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            In courts across the nation, time moves differently. Cases pile up.
            Hearings are postponed. Justice waits in silence.
          </p>
        </motion.div>

        {/* Statistics */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="glass-panel p-8">
            <Clock className="w-8 h-8 text-status-warning mx-auto mb-4" />
            <div className="text-4xl md:text-5xl font-serif text-primary mb-2">45M+</div>
            <p className="text-muted-foreground">Cases pending across courts</p>
          </div>
          <div className="glass-panel p-8">
            <div className="text-4xl md:text-5xl font-serif text-primary mb-2">7+ Years</div>
            <p className="text-muted-foreground">Average time for case resolution</p>
          </div>
          <div className="glass-panel p-8">
            <div className="text-4xl md:text-5xl font-serif text-primary mb-2">∞</div>
            <p className="text-muted-foreground">Lives left in uncertainty</p>
          </div>
        </motion.div>

        {/* Broken timeline visualization */}
        <motion.div
          className="mt-20 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-center gap-4 md:gap-8">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-center gap-4 md:gap-8">
                <div 
                  className={`timeline-node ${
                    i === 2 ? 'timeline-node-danger scale-125' : 
                    i > 2 ? 'bg-muted border-muted' : 'timeline-node-success'
                  }`}
                />
                {i < 4 && (
                  <div 
                    className={`h-0.5 w-8 md:w-16 ${
                      i >= 2 ? 'bg-muted' : 'bg-status-success'
                    } ${i === 2 ? 'opacity-30' : ''}`}
                  />
                )}
              </div>
            ))}
          </div>
          <p className="text-status-danger/80 text-sm mt-6 tracking-wider">
            TIMELINE FRAGMENTED • PROGRESS STALLED • JUSTICE DELAYED
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProblemSection;
