import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FileText, Eye, EyeOff } from "lucide-react";

const LostCaseSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const cardX = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 50, 200]);
  const cardOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [1, 0.6, 0.1]);
  const cardRotate = useTransform(scrollYProgress, [0.2, 0.8], [0, 15]);

  return (
    <section
      ref={containerRef}
      className="narrative-section bg-background py-32 relative"
    >
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80 pointer-events-none" />

      <div className="judicial-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center lg:text-left"
          >
            <EyeOff className="w-10 h-10 text-muted-foreground mb-6 mx-auto lg:mx-0" />
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6">
              Small Cases,
              <span className="block text-muted-foreground">Invisible Lives</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              A property dispute in a rural court. A consumer complaint waiting for years.
              A simple contract case lost in the system. These aren't headline stories—
              they are millions of citizens whose access to justice remains invisible.
            </p>
            <p className="text-primary/80 italic font-serif text-xl">
              "Not because the system forgot them.
              <span className="block">But because no one was watching."</span>
            </p>
          </motion.div>

          {/* Drifting case card */}
          <div className="relative h-80 flex items-center justify-center">
            <motion.div
              className="absolute glass-panel p-6 w-64 md:w-72"
              style={{
                x: cardX,
                opacity: cardOpacity,
                rotate: cardRotate,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <FileText className="w-8 h-8 text-primary/50" />
                <span className="text-xs text-status-warning uppercase tracking-wider">
                  Pending
                </span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-2 w-full bg-primary/20 rounded" />
                <div className="h-2 w-3/4 bg-primary/15 rounded" />
                <div className="h-2 w-1/2 bg-primary/10 rounded" />
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-xs">
                <span>Case #47829</span>
                <span>•</span>
                <span>Filed: 2019</span>
              </div>
              <div className="mt-4 pt-4 border-t border-border/30">
                <p className="text-sm text-muted-foreground/70">
                  Last hearing: <span className="text-status-warning">1,247 days ago</span>
                </p>
              </div>
            </motion.div>

            {/* Ghost outline showing where it should be */}
            <motion.div
              className="absolute border border-dashed border-primary/20 rounded-lg w-64 md:w-72 h-44"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LostCaseSection;
