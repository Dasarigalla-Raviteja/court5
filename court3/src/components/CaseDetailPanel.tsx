import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, FileText, CheckCircle, CircleDot, ChevronRight } from "lucide-react";

interface CaseData {
  id: string;
  category: string;
  priority: string;
  status: "on-track" | "warning" | "delayed" | "disposed" | "paused";
  statusLabel: string;
  court: string;
  nextHearing: string;
  delayDays?: number;
  filingDate: string;
  parties: string;
  hearings: any[];
}

interface CaseDetailPanelProps {
  caseData: CaseData | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateProgress?: (caseId: string) => void;
  onManageTimeline?: (caseId: string) => void;
  isUpdateEnabled?: boolean;
}

const CaseDetailPanel = ({ caseData, isOpen, onClose, onUpdateProgress, onManageTimeline, isUpdateEnabled = true }: CaseDetailPanelProps) => {
  if (!caseData) return null;

  const timelineStages = caseData.hearings || [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-xl bg-card border-l border-border/50 z-50 overflow-hidden flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-border/30 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-xl text-foreground">{caseData.id}</h2>
                  <span className={`text-xs px-2 py-1 rounded ${
                    caseData.status === "on-track" ? "bg-status-success" : 
                    caseData.status === "warning" ? "bg-status-warning" : 
                    caseData.status === "disposed" ? "bg-green-600" :
                    caseData.status === "paused" ? "bg-amber-500" :
                    "bg-status-danger"
                  }/20 ${
                    caseData.status === "on-track" ? "text-status-success" : 
                    caseData.status === "warning" ? "text-status-warning" : 
                    caseData.status === "disposed" ? "text-green-600" :
                    caseData.status === "paused" ? "text-amber-500" :
                    "text-status-danger"
                  }`}>
                    {caseData.statusLabel}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{caseData.parties}</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {caseData.status === "paused" && (
                <div className="p-4 mb-4 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-amber-500">CASE PAUSED</p>
                    <p className="text-xs text-amber-500/80">Previous hearing was adjourned. Resume to continue.</p>
                  </div>
                  <button 
                    onClick={() => onUpdateProgress?.(caseData.id)}
                    className="bg-amber-500 text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-amber-600 transition-colors"
                  >
                    Resume Case
                  </button>
                </div>
              )}
              {/* Section 1: Case Overview */}
              <section>
                <h3 className="font-bold text-sm text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Case Overview
                </h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Case Number</p>
                    <p className="text-sm font-bold text-foreground">{caseData.id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Case Type</p>
                    <p className="text-sm font-bold text-foreground">{caseData.category}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Parties</p>
                    <p className="text-sm font-bold text-foreground">{caseData.parties}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Court</p>
                    <p className="text-sm font-bold text-foreground">{caseData.court}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Filing Date</p>
                    <p className="text-sm font-bold text-foreground">{caseData.filingDate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Hearings</p>
                    <p className="text-sm font-bold text-primary">{timelineStages.length}</p>
                  </div>
                </div>
              </section>

              {/* Section 2: Case Timeline */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-sm text-primary uppercase tracking-widest flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    TIMELINE HISTORY (MANAGE TIMELINE)
                  </h3>
                  <button 
                    onClick={() => onUpdateProgress?.(caseData.id)}
                    disabled={!isUpdateEnabled}
                    className="bg-primary text-primary-foreground px-4 py-1.5 rounded text-xs font-bold flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Update Progress <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
                
                <div className="relative pl-6 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
                  <div className="space-y-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {timelineStages.map((hearing: any, index: number) => (
                      <div key={index} className="relative flex items-start justify-between">
                        <div className={`absolute -left-[23px] top-1.5 w-3 h-3 rounded-full border-2 bg-background flex items-center justify-center overflow-hidden ${
                          hearing.status === "Completed" ? "border-status-success bg-status-success" :
                          hearing.status === "Adjourned" ? "border-status-warning bg-status-warning" :
                          hearing.status === "Delayed" ? "border-status-danger bg-status-danger" :
                          "border-primary"
                        }`}>
                          {hearing.status === "Completed" && (
                            <CheckCircle className="w-2 h-2 text-white" />
                          )}
                          {hearing.status === "Adjourned" && (
                            <div className="w-full h-full bg-status-warning" />
                          )}
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-foreground">Hearing {hearing.number}</p>
                          <p className="text-[10px] font-medium text-muted-foreground">{hearing.date} | {hearing.time}</p>
                        </div>

                        <span className={`text-[10px] font-bold uppercase tracking-widest ${
                          hearing.status === "Completed" ? "text-status-success" :
                          hearing.status === "Adjourned" ? "text-status-warning" :
                          hearing.status === "Delayed" ? "text-status-danger" :
                          "text-muted-foreground"
                        }`}>
                          {hearing.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            {/* Footer Buttons */}
            <div className="p-6 border-t border-border/30 bg-muted/20 flex flex-wrap gap-3 items-center">
              <button 
                onClick={() => onManageTimeline?.(caseData.id)}
                className="bg-background border border-primary text-primary px-6 py-2.5 rounded text-sm font-medium hover:bg-primary/5 transition-colors"
              >
                Manage Timeline
              </button>
              <button 
                onClick={onClose}
                className="ml-auto text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Close
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CaseDetailPanel;
