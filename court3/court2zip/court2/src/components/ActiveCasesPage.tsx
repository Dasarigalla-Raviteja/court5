import { useState, useEffect } from "react";
import { Search, Filter, Eye, X, Calendar, Download, FileText, ChevronRight, Clock, Gavel } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Hearing {
  number: number;
  date: string;
  time: string;
  status: "Upcoming" | "Completed" | "Delayed" | "Adjourned";
  actualDate?: string;
}

interface Case {
  id: string;
  type: string;
  parties: string;
  court: string;
  filingDate: string;
  nextHearing: string;
  status: "On Track" | "Warning" | "Delayed" | "Disposed";
  predictedHearings: number;
  hearings: Hearing[];
  category?: string;
  priority?: string;
  statusLabel?: string;
}

import CaseDetailPanel from "./CaseDetailPanel";

const ActiveCasesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);
  const [cases, setCases] = useState<Case[]>([]);
  const [password, setPassword] = useState("");
  const [showPasswordPrompt, setShowPasswordPrompt] = useState<{ hearingIndex: number; status: "Completed" | "Adjourned" | "Delayed" } | null>(null);
  const [showUpdateProgress, setShowUpdateProgress] = useState<Case | null>(null);

  useEffect(() => {
    const generateHearings = (count: number, startDate: string): Hearing[] => {
      const hearings: Hearing[] = [];
      const start = new Date(startDate.split('-').reverse().join('-'));
      for (let i = 1; i <= count; i++) {
        const d = new Date(start);
        d.setDate(d.getDate() + i * 14);
        hearings.push({
          number: i,
          date: d.toLocaleDateString("en-GB"),
          time: "10:30 AM",
          status: "Upcoming"
        });
      }
      return hearings;
    };

    const defaultCases: Case[] = [];

    try {
      const saved = JSON.parse(localStorage.getItem("monitoring_cases") || "[]");
      let combined = Array.isArray(saved) ? [...saved] : [];
      
      // Auto-mark delayed if date passed
      const today = new Date();
      combined = combined.map(c => ({
        ...c,
        hearings: c.hearings?.map((h: Hearing, idx: number) => {
          const hDate = new Date(h.date.split('/').reverse().join('-'));
          if (h.status === "Upcoming" && hDate < today) {
            // Check if previous completed
            const prevCompleted = idx === 0 || c.hearings[idx-1].status !== "Upcoming";
            if (prevCompleted) {
              return { ...h, status: "Delayed" };
            }
          }
          return h;
        })
      }));

      setCases(combined);
      localStorage.setItem("monitoring_cases", JSON.stringify(combined));
    } catch (e) {
      console.error("Error loading cases:", e);
      setCases([]);
    }
  }, []);

  const handleUpdateStatus = (hearingIndex: number, newStatus: "Completed" | "Adjourned" | "Delayed") => {
    setShowPasswordPrompt({ hearingIndex, status: newStatus });
  };

  const isAnyHearingEligible = (c: Case) => {
    return c.hearings.some((h, idx) => {
      const prevDone = idx === 0 || c.hearings[idx - 1].status !== "Upcoming";
      return h.status === "Upcoming" && prevDone;
    });
  };

  const confirmStatusUpdate = () => {
    if (password !== "admin") {
      alert("Invalid password");
      return;
    }

    if (showPasswordPrompt && (selectedCase || showUpdateProgress)) {
      const targetCase = selectedCase || showUpdateProgress;
      const updatedCases = cases.map(c => {
        if (c.id === targetCase?.id) {
          const updatedHearings = [...(c.hearings || [])];
          updatedHearings[showPasswordPrompt.hearingIndex] = {
            ...updatedHearings[showPasswordPrompt.hearingIndex],
            status: showPasswordPrompt.status,
            actualDate: new Date().toLocaleDateString("en-GB")
          };
          
          // Update next hearing in case object
          const nextIdx = showPasswordPrompt.hearingIndex + 1;
          const nextH = updatedHearings[nextIdx];
          
          let nextCaseStatus: "On Track" | "Warning" | "Delayed" | "Disposed" = c.status as any;
          
          const allCompleted = updatedHearings.every(h => h.status === "Completed" || h.status === "Adjourned");
          
          if (allCompleted) {
            nextCaseStatus = "Disposed";
          } else {
            // Logic for status calculation:
            // Warning: some adjournments/delays but still under predicted count
            // Delayed: excessive adjournments, missed updates, or auto-marked delayed
            const adjournments = updatedHearings.filter(h => h.status === "Adjourned").length;
            const delayedHearings = updatedHearings.filter(h => h.status === "Delayed").length;
            
            if (delayedHearings > 0 || adjournments >= 4) {
              nextCaseStatus = "Delayed";
            } else if (adjournments > 0) {
              nextCaseStatus = "Warning";
            } else {
              nextCaseStatus = "On Track";
            }
          }

          return {
            ...c,
            hearings: updatedHearings,
            nextHearing: nextH ? `${nextH.date} ${nextH.time}` : "Completed",
            status: nextCaseStatus
          };
        }
        return c;
      });

      setCases(updatedCases);
      localStorage.setItem("monitoring_cases", JSON.stringify(updatedCases));
      
      const newCaseState = updatedCases.find(c => c.id === targetCase?.id) || null;
      if (selectedCase) setSelectedCase(newCaseState);
      if (showUpdateProgress) setShowUpdateProgress(newCaseState);
      
      setShowPasswordPrompt(null);
      setPassword("");
    }
  };

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         c.parties.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !categoryFilter || c.type.toLowerCase() === categoryFilter.toLowerCase();
    const matchesStatus = !statusFilter || c.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="pb-20">
      <Card className="p-6 mb-6 border-border shadow-md">
        <h2 className="text-xl font-bold text-primary mb-6 pb-2 border-b border-border flex items-center gap-2">
          <Search className="w-5 h-5" />
          Search and Filter Cases
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-foreground">Search by Case ID / Party Name</label>
            <div className="relative">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10"
                placeholder="Enter Case Number or Parties..."
              />
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Case Category</label>
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm"
            >
              <option value="">All Categories</option>
              <option value="civil">Civil</option>
              <option value="criminal">Criminal</option>
              <option value="family">Family</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground">Monitoring Status</label>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm"
            >
              <option value="">All Status</option>
              <option value="On Track">On Track</option>
              <option value="Warning">Warning</option>
              <option value="Delayed">Delayed</option>
            </select>
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-foreground">Filing Date Range</label>
            <Input 
              type="date"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="h-10"
            />
          </div>
        </div>

        <div className="flex gap-3 mt-6 pt-6 border-t border-border">
          <Button className="flex items-center gap-2 px-6">
            <Filter className="w-4 h-4" />
            Apply Filters
          </Button>
          <Button 
            variant="ghost"
            onClick={() => {
              setSearchQuery("");
              setCategoryFilter("");
              setStatusFilter("");
              setDateRange("");
            }}
            className="text-muted-foreground"
          >
            Clear All
          </Button>
        </div>
      </Card>

      <Card className="p-0 border-border shadow-lg overflow-hidden">
        <div className="p-6 bg-muted/50 border-b border-border flex justify-between items-center">
          <h2 className="text-lg font-bold text-primary">
            Case Monitoring Table ({filteredCases.length} records)
          </h2>
          <Button variant="outline" size="sm" className="gap-2 text-primary border-primary hover:bg-primary/5">
            <Download className="w-4 h-4" />
            Export to Excel
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Case Number</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Case Type</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Parties</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Hearing Time</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider">Stage</th>
                <th className="px-6 py-4 text-left font-bold uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-right font-bold uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredCases.map((c) => (
                <tr key={c.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4 font-bold text-primary">{c.id}</td>
                  <td className="px-6 py-4">{c.type}</td>
                  <td className="px-6 py-4 font-medium">{c.parties}</td>
                  <td className="px-6 py-4 font-semibold text-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {c.nextHearing !== "Completed" ? c.nextHearing.split(' ').slice(1).join(' ') : "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {c.hearings?.filter(h => h.status !== "Upcoming").length || 0} / {c.hearings?.length || 0} Hearings
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${
                      c.status === "On Track" 
                        ? "text-status-success" 
                        : c.status === "Warning"
                        ? "text-status-warning"
                        : c.status === "Disposed"
                        ? "text-green-600"
                        : "text-status-danger"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        // Transform case to match CaseData interface if needed
                        setSelectedCase(c);
                      }}
                      className="text-primary hover:text-primary hover:bg-primary/5 font-bold gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <CaseDetailPanel 
        caseData={selectedCase ? {
          ...selectedCase,
          category: selectedCase.type,
          priority: selectedCase.priority || "Medium",
          status: selectedCase.status.toLowerCase().replace(' ', '-') as any,
          statusLabel: selectedCase.status
        } : null}
        isOpen={!!selectedCase}
        onClose={() => setSelectedCase(null)}
        onUpdateProgress={(id) => {
          setShowUpdateProgress(selectedCase);
          setSelectedCase(null);
        }}
        isUpdateEnabled={selectedCase ? isAnyHearingEligible(selectedCase) : false}
      />

      <Dialog open={!!showPasswordPrompt} onOpenChange={() => setShowPasswordPrompt(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Authentication Required</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Please enter admin password to mark Hearing {showPasswordPrompt ? showPasswordPrompt.hearingIndex + 1 : ""} as {showPasswordPrompt?.status}.
            </p>
            <Input 
              type="password" 
              placeholder="Enter password..." 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && confirmStatusUpdate()}
            />
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowPasswordPrompt(null)}>Cancel</Button>
              <Button onClick={confirmStatusUpdate}>Confirm</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={!!showUpdateProgress} onOpenChange={() => setShowUpdateProgress(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col p-0 overflow-hidden">
          <DialogHeader className="p-6 border-b">
            <DialogTitle className="text-xl font-bold text-primary flex items-center gap-2">
              <Gavel className="w-5 h-5" />
              Update Progress: {showUpdateProgress?.id}
            </DialogTitle>
          </DialogHeader>
          
          {showUpdateProgress && (
            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              <div className="p-4 bg-muted/30 rounded-lg border border-border">
                <p className="text-sm font-bold text-primary mb-2 uppercase tracking-widest">Master Hearing Plan</p>
                <p className="text-xs text-muted-foreground italic">Strict sequential update required. Only the current eligible hearing is editable.</p>
              </div>

              <div className="space-y-6">
                {showUpdateProgress.hearings.map((h, idx) => {
                  const prevDone = idx === 0 || showUpdateProgress.hearings[idx-1].status !== "Upcoming";
                  const isCurrent = h.status === "Upcoming" && prevDone;
                  
                  return (
                    <div key={idx} className={`p-4 rounded-lg border transition-all ${isCurrent ? "border-primary bg-primary/5 shadow-md" : "border-border bg-muted/20 opacity-60"}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-foreground">Hearing {h.number}</p>
                          <p className="text-[10px] text-muted-foreground">{h.date} | {h.time}</p>
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${
                          h.status === "Completed" ? "text-status-success" :
                          h.status === "Adjourned" ? "text-status-warning" :
                          h.status === "Delayed" ? "text-status-danger" :
                          "text-muted-foreground"
                        }`}>
                          {h.status}
                        </span>
                      </div>
                      
                      {isCurrent && (
                        <div className="flex gap-3 pt-3 border-t border-primary/20">
                          <Button 
                            size="sm" 
                            className="bg-status-success hover:bg-status-success/90"
                            onClick={() => handleUpdateStatus(idx, "Completed")}
                          >
                            Mark Completed
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-status-warning border-status-warning hover:bg-status-warning/5"
                            onClick={() => handleUpdateStatus(idx, "Adjourned")}
                          >
                            Mark Adjourned
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-status-danger border-status-danger hover:bg-status-danger/5"
                            onClick={() => handleUpdateStatus(idx, "Delayed")}
                          >
                            Mark Delayed
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          <div className="p-6 border-t bg-muted/20 flex gap-3">
            <Button variant="ghost" onClick={() => setShowUpdateProgress(null)} className="flex-1">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!showPasswordPrompt} onOpenChange={() => setShowPasswordPrompt(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Authentication Required</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              Please enter admin password to mark Hearing {showPasswordPrompt ? showPasswordPrompt.hearingIndex + 1 : ""} as {showPasswordPrompt?.status}.
            </p>
            <Input 
              type="password" 
              placeholder="Enter password..." 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && confirmStatusUpdate()}
            />
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowPasswordPrompt(null)}>Cancel</Button>
              <Button onClick={confirmStatusUpdate}>Confirm</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActiveCasesPage;
