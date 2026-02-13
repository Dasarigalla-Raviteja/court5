import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, AlertCircle, CheckCircle2, Clock, Bell } from "lucide-react";

interface TimelineNode {
  id: number;
  date: string;
  type: string;
  status: "completed" | "warning" | "danger" | "upcoming";
  label: string;
}

const timelineData: TimelineNode[] = [
  { id: 1, date: "Jan 15", type: "Filing", status: "completed", label: "Case Filed" },
  { id: 2, date: "Feb 20", type: "Notice", status: "completed", label: "Notice Issued" },
  { id: 3, date: "Mar 10", type: "Hearing", status: "completed", label: "First Hearing" },
  { id: 4, date: "May 05", type: "Hearing", status: "warning", label: "Evidence Review" },
  { id: 5, date: "Jun 22", type: "Hearing", status: "danger", label: "Arguments" },
  { id: 6, date: "Aug 15", type: "Verdict", status: "upcoming", label: "Final Order" },
];

const SolutionSection = () => {
  const [activeNode, setActiveNode] = useState<number | null>(5);

  const getStatusColor = (status: TimelineNode["status"]) => {
    switch (status) {
      case "completed":
        return "bg-status-success border-status-success";
      case "warning":
        return "bg-status-warning border-status-warning";
      case "danger":
        return "bg-status-danger border-status-danger animate-pulse";
      case "upcoming":
        return "bg-muted border-muted-foreground/30";
    }
  };

  const getStatusIcon = (status: TimelineNode["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "warning":
        return <Clock className="w-4 h-4" />;
      case "danger":
        return <AlertCircle className="w-4 h-4" />;
      case "upcoming":
        return <Calendar className="w-4 h-4" />;
    }
  };

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
            The Living Timeline
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Every case now breathes. Each hearing visible. Each delay flagged.
            A timeline that doesn't just track—it <span className="text-primary">watches</span>.
          </p>
        </motion.div>

        {/* Interactive timeline */}
        <motion.div
          className="relative max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Timeline line */}
          <div className="absolute top-8 left-0 right-0 h-1 bg-border rounded-full" />
          
          {/* Progress line */}
          <motion.div
            className="absolute top-8 left-0 h-1 bg-gradient-to-r from-status-success via-status-warning to-status-danger rounded-full"
            initial={{ width: "0%" }}
            whileInView={{ width: "75%" }}
            transition={{ duration: 1.5, delay: 0.5 }}
            viewport={{ once: true }}
          />

          {/* Timeline nodes */}
          <div className="relative flex justify-between">
            {timelineData.map((node, index) => (
              <motion.div
                key={node.id}
                className="flex flex-col items-center cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                viewport={{ once: true }}
                onClick={() => setActiveNode(node.id)}
              >
                {/* Node */}
                <div
                  className={`relative w-8 h-8 rounded-full border-4 flex items-center justify-center transition-transform duration-300 ${getStatusColor(node.status)} ${
                    activeNode === node.id ? "scale-125 ring-4 ring-primary/30" : ""
                  } group-hover:scale-110`}
                >
                  {node.status === "danger" && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-status-danger/30"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <span className="text-background relative z-10">
                    {getStatusIcon(node.status)}
                  </span>
                </div>

                {/* Label */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">{node.date}</p>
                  <p className="text-sm font-medium text-foreground hidden md:block">{node.label}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Active node detail panel */}
          {activeNode && (
            <motion.div
              className="mt-16 glass-panel p-6 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {(() => {
                const node = timelineData.find((n) => n.id === activeNode);
                if (!node) return null;
                
                return (
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getStatusColor(node.status)}`}>
                        {getStatusIcon(node.status)}
                      </div>
                      <div>
                        <h4 className="text-lg font-serif text-foreground">{node.label}</h4>
                        <p className="text-muted-foreground text-sm">
                          {node.type} • {node.date}
                        </p>
                      </div>
                    </div>
                    
                    {node.status === "danger" && (
                      <div className="flex items-center gap-3 bg-status-danger/10 border border-status-danger/20 rounded-lg px-4 py-2">
                        <Bell className="w-5 h-5 text-status-danger" />
                        <span className="text-sm text-status-danger">
                          Delayed by 47 days • Alert sent to monitoring authority
                        </span>
                      </div>
                    )}
                    
                    {node.status === "warning" && (
                      <div className="flex items-center gap-3 bg-status-warning/10 border border-status-warning/20 rounded-lg px-4 py-2">
                        <Clock className="w-5 h-5 text-status-warning" />
                        <span className="text-sm text-status-warning">
                          Approaching deadline • 5 days remaining
                        </span>
                      </div>
                    )}
                  </div>
                );
              })()}
            </motion.div>
          )}
        </motion.div>

        {/* Status legend */}
        <motion.div
          className="flex flex-wrap justify-center gap-6 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          {[
            { status: "On Track", color: "bg-status-success" },
            { status: "Warning", color: "bg-status-warning" },
            { status: "Delayed", color: "bg-status-danger" },
            { status: "Upcoming", color: "bg-muted" },
          ].map((item) => (
            <div key={item.status} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-sm text-muted-foreground">{item.status}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SolutionSection;
