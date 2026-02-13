import { motion } from "framer-motion";
import { Clock, CheckCircle2 } from "lucide-react";

const FinalSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary/10 to-background py-32 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="judicial-container relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          {/* Restored clock icon */}
          <motion.div
            className="relative w-32 h-32 mx-auto mb-12"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
            
            {/* Clock */}
            <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="hsl(43 52% 59%)"
                strokeWidth="2"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="hsl(222 40% 10% / 0.8)"
              />
              {/* Hour markers */}
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i * 30 - 90) * (Math.PI / 180);
                const x1 = 50 + 32 * Math.cos(angle);
                const y1 = 50 + 32 * Math.sin(angle);
                const x2 = 50 + 38 * Math.cos(angle);
                const y2 = 50 + 38 * Math.sin(angle);
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="hsl(43 52% 59%)"
                    strokeWidth={i % 3 === 0 ? 2 : 1}
                  />
                );
              })}
              {/* Hour hand - at 12 */}
              <line
                x1="50"
                y1="50"
                x2="50"
                y2="25"
                stroke="hsl(43 52% 59%)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Minute hand - at 12 */}
              <line
                x1="50"
                y1="50"
                x2="50"
                y2="18"
                stroke="hsl(43 52% 59%)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              {/* Center */}
              <circle cx="50" cy="50" r="3" fill="hsl(43 52% 59%)" />
            </svg>

            {/* Success indicator */}
            <motion.div
              className="absolute -bottom-2 -right-2 w-8 h-8 bg-status-success rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              viewport={{ once: true }}
            >
              <CheckCircle2 className="w-5 h-5 text-background" />
            </motion.div>
          </motion.div>

          {/* Completed timeline */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex items-center gap-3">
                <motion.div
                  className="w-4 h-4 rounded-full bg-status-success"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + i * 0.1 }}
                  viewport={{ once: true }}
                />
                {i < 4 && (
                  <motion.div
                    className="w-12 md:w-20 h-1 bg-status-success rounded-full"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.3, delay: 0.85 + i * 0.1 }}
                    viewport={{ once: true }}
                  />
                )}
              </div>
            ))}
          </motion.div>

          {/* Final statement */}
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight mb-4">
              We don't deliver justice.
            </h2>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-primary leading-tight">
              We make sure justice is not delayed.
            </h2>
          </motion.div>

          {/* Platform name */}
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            viewport={{ once: true }}
          >
            <p className="text-sm tracking-[0.3em] text-muted-foreground uppercase mb-4">
              A National Judicial Monitoring Platform
            </p>
            <h3 className="text-2xl md:text-3xl font-serif text-gradient-gold">
              The Time of Justice
            </h3>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            viewport={{ once: true }}
          >
            <button className="px-8 py-4 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity">
              Request Institutional Access
            </button>
            <button className="px-8 py-4 border border-primary/30 text-foreground rounded-lg hover:bg-primary/5 transition-colors">
              View Documentation
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 py-6 border-t border-border/20">
        <div className="judicial-container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 The Time of Justice. A Government Initiative.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalSection;
