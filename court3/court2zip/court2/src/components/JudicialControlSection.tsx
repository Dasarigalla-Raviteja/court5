import { motion } from "framer-motion";
import { Scale, Clock, FileCheck, Calendar, MessageSquare, Shield, User } from "lucide-react";

const JudicialControlSection = () => {
  return (
    <section className="narrative-section bg-gradient-to-b from-secondary/10 via-background to-background py-32">
      <div className="judicial-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Scale className="w-12 h-12 text-primary mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground mb-6">
            Human Judgment, Always
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            The platform monitors. It alerts. It tracks.
            But every decision remains with the judge.
          </p>
          <motion.p
            className="text-xl md:text-2xl text-primary font-serif italic"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          >
            "The system never decides. The judge always does."
          </motion.p>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          className="relative max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Dashboard frame */}
          <div className="glass-panel p-6 md:p-8 rounded-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Judicial Dashboard</p>
                  <p className="text-foreground font-medium">Hon'ble Justice Panel</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-status-success animate-pulse" />
                <span className="text-sm text-muted-foreground">Live</span>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-secondary/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <FileCheck className="w-4 h-4 text-status-success" />
                  <span className="text-xs text-muted-foreground">On Track</span>
                </div>
                <p className="text-2xl font-serif text-foreground">142</p>
              </div>
              <div className="bg-secondary/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-status-warning" />
                  <span className="text-xs text-muted-foreground">Need Attention</span>
                </div>
                <p className="text-2xl font-serif text-foreground">28</p>
              </div>
              <div className="bg-secondary/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Today's Hearings</span>
                </div>
                <p className="text-2xl font-serif text-foreground">7</p>
              </div>
            </div>

            {/* Action panel */}
            <div className="bg-status-warning/5 border border-status-warning/20 rounded-lg p-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-status-warning/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-status-warning" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-1">Case #45821 - Extension Request</p>
                    <p className="text-sm text-muted-foreground">
                      Hearing scheduled for Mar 15 requires rescheduling
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm hover:bg-secondary/80 transition-colors">
                    Deny
                  </button>
                  <button className="px-4 py-2 bg-status-warning text-background rounded-lg text-sm hover:opacity-90 transition-opacity">
                    Review & Approve
                  </button>
                </div>
              </div>

              {/* Reason input */}
              <div className="mt-4 pt-4 border-t border-status-warning/20">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Reason for decision (mandatory)</span>
                </div>
                <div className="bg-background/50 border border-border/50 rounded-lg p-3 text-sm text-muted-foreground/60">
                  Enter justification for approval or denial...
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -top-4 -right-4 w-24 h-24 border border-primary/10 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Trust badges */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 md:gap-12 mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {[
            { icon: User, text: "Human-in-the-loop" },
            { icon: Shield, text: "Full audit trail" },
            { icon: Scale, text: "Complete accountability" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 text-muted-foreground">
              <item.icon className="w-5 h-5 text-primary" />
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default JudicialControlSection;
