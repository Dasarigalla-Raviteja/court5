import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { TrendingDown, Clock, Eye, CheckCircle } from "lucide-react";

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
}

const AnimatedCounter = ({ from, to, duration = 2, suffix = "" }: AnimatedCounterProps) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(count, to, { duration });
    return controls.stop;
  }, [count, to, duration]);

  return (
    <motion.span ref={ref}>
      {rounded.get()}{suffix}
    </motion.span>
  );
};

const ImpactSection = () => {
  return (
    <section className="narrative-section bg-gradient-to-b from-background to-secondary/10 py-32">
      <div className="judicial-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
            When Time is Watched
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            No exaggerated claims. Only measurable, institutional improvements
            that restore faith in the system.
          </p>
        </motion.div>

        {/* Impact metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: TrendingDown,
              metric: "40",
              suffix: "%",
              label: "Reduction in case pendency",
              description: "Fewer cases stuck in the system",
            },
            {
              icon: Clock,
              metric: "2.3",
              suffix: "x",
              label: "Faster resolution",
              description: "Especially for smaller cases",
            },
            {
              icon: Eye,
              metric: "100",
              suffix: "%",
              label: "Timeline visibility",
              description: "Every case tracked continuously",
            },
            {
              icon: CheckCircle,
              metric: "85",
              suffix: "%",
              label: "On-time hearings",
              description: "Scheduled proceedings kept",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="glass-panel p-6 text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <item.icon className="w-8 h-8 text-primary mx-auto mb-4" />
              <div className="text-4xl md:text-5xl font-serif text-foreground mb-2">
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {item.metric}{item.suffix}
                </motion.span>
              </div>
              <p className="text-foreground font-medium mb-1">{item.label}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Visual progress representation */}
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="glass-panel p-8">
            <h3 className="text-xl font-serif text-foreground mb-6 text-center">
              Case Flow Transformation
            </h3>
            
            {/* Before/After visualization */}
            <div className="space-y-8">
              {/* Before */}
              <div>
                <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-status-danger" />
                  Before monitoring
                </p>
                <div className="flex items-center gap-2">
                  {[90, 75, 60, 45, 30, 15].map((width, i) => (
                    <motion.div
                      key={i}
                      className="h-8 bg-status-danger/30 rounded"
                      style={{ width: `${width}%` }}
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Cases fragmenting, progress stalling
                </p>
              </div>

              {/* After */}
              <div>
                <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-status-success" />
                  With monitoring
                </p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 8 }, (_, i) => (
                    <motion.div
                      key={i}
                      className="h-8 flex-1 bg-gradient-to-r from-status-success/60 to-status-success/80 rounded"
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                      viewport={{ once: true }}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Consistent flow, visible progress
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
