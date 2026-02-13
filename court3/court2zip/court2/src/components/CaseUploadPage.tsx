import { useState, useRef, useEffect } from "react";
import { Upload, AlertCircle, CheckCircle, FileText, Calendar, Clock, ArrowRight, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Hearing {
  number: number;
  date: string;
  time: string;
  status: "Upcoming" | "Completed" | "Delayed" | "Adjourned";
}

interface UploadedCase {
  id: string;
  category: string;
  uploadDate: string;
  timelineGenerated: boolean;
}

const CaseUploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [category, setCategory] = useState("");
  const [timeline, setTimeline] = useState<Hearing[] | null>(null);
  const [recentCases, setRecentCases] = useState<UploadedCase[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file);
      setIsSubmitted(false);
      setTimeline(null);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (!selectedFile || !category) return;
    setIsSubmitted(true);
  };

  const handleGenerateTimeline = () => {
    const hearingCount = 14; // Fixed 14 hearings as per requirement
    const newTimeline: Hearing[] = Array.from({ length: hearingCount }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() + (i + 1) * 14);
      return {
        number: i + 1,
        date: date.toLocaleDateString("en-GB"),
        time: "10:30 AM",
        status: "Upcoming"
      };
    });
    setTimeline(newTimeline);
  };

  const handleAddCase = () => {
    const newCase: UploadedCase = {
      id: `CAS/${new Date().getFullYear()}/${Math.floor(Math.random() * 9000) + 1000}`,
      category: category,
      uploadDate: new Date().toLocaleDateString("en-GB"),
      timelineGenerated: !!timeline
    };
    
    // Save to localStorage for real data simulation
    const existingCases = JSON.parse(localStorage.getItem("uploaded_cases") || "[]");
    const updatedCases = [newCase, ...existingCases];
    localStorage.setItem("uploaded_cases", JSON.stringify(updatedCases));
    
    // Also add to monitoring system (ActiveCasesPage)
    const monitoringCases = JSON.parse(localStorage.getItem("monitoring_cases") || "[]");
    const newMonitoringCase = {
      id: newCase.id,
      type: category.split(' ')[0],
      parties: "Self vs State", // Default for uploaded
      court: "Pending Assignment",
      filingDate: newCase.uploadDate,
      nextHearing: timeline ? `${timeline[0].date} ${timeline[0].time}` : "TBD",
      status: "On Track",
      predictedHearings: timeline?.length || 0,
      hearings: timeline || []
    };
    localStorage.setItem("monitoring_cases", JSON.stringify([newMonitoringCase, ...monitoringCases]));

    setRecentCases(updatedCases.slice(0, 3));
    handleClear();
  };

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("uploaded_cases") || "[]");
      if (Array.isArray(saved)) {
        setRecentCases(saved.slice(0, 3));
      }
    } catch (e) {
      console.error("Error loading recent cases:", e);
    }
  }, []);


  const handleClear = () => {
    setSelectedFile(null);
    setCategory("");
    setIsSubmitted(false);
    setTimeline(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="pb-20">
      <Card className="p-6 mb-8 border-border shadow-md">
        <h2 className="text-xl font-bold text-primary mb-6 pb-2 border-b border-border flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Upload Case Documents
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-sm font-semibold text-foreground">Select Case Document (PDF only)</label>
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept=".pdf" className="hidden" />
            <div
              onClick={handleUploadClick}
              className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-all ${
                selectedFile ? "border-status-success bg-status-success/5" : "border-border hover:border-primary hover:bg-muted/50"
              }`}
            >
              {selectedFile ? (
                <div className="flex flex-col items-center gap-2">
                  <CheckCircle className="w-10 h-10 text-status-success" />
                  <span className="text-sm font-medium">{selectedFile.name}</span>
                  <span className="text-xs text-muted-foreground">PDF Document Ready</span>
                </div>
              ) : (
                <>
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium">Drag & Drop or Click to select PDF</p>
                  <p className="text-xs text-muted-foreground mt-2 italic">Official judicial filings only</p>
                </>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground">Select Case Category</label>
              <select 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                className="w-full h-10 px-3 py-2 bg-background border border-input rounded-md text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">-- Select Category --</option>
                <option value="Civil Dispute">Civil Dispute</option>
                <option value="Criminal Case">Criminal Case</option>
                <option value="Family Court">Family Court</option>
                <option value="Commercial Litigation">Commercial Litigation</option>
                <option value="Constitutional Matter">Constitutional Matter</option>
                <option value="Taxation">Taxation</option>
              </select>
            </div>

            <div className="p-4 bg-muted/30 rounded border border-border flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed text-muted-foreground italic">
                ML prediction will analyze the document to estimate hearing count and schedule based on historical precedents.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-border">
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedFile || !category || isSubmitted}
            className="min-w-[120px]"
          >
            Submit
          </Button>
          <Button 
            variant="outline"
            onClick={handleGenerateTimeline} 
            disabled={!isSubmitted || !!timeline}
            className="min-w-[180px] border-primary text-primary hover:bg-primary/5"
          >
            Generate Case Timeline
          </Button>
          <Button 
            variant="ghost" 
            onClick={handleClear}
            className="text-muted-foreground hover:text-destructive gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear Form
          </Button>
        </div>
      </Card>

      {timeline && (
        <Card className="p-6 mb-8 border-border shadow-lg animate-in fade-in slide-in-from-bottom-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-border">
            <h3 className="text-lg font-bold text-primary flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Predicted Case Timeline: {timeline.length} Hearings Required
            </h3>
            <Button 
              onClick={handleAddCase}
              className="bg-status-success hover:bg-status-success/90 text-white min-w-[220px]"
            >
              Add Case to Monitoring System
            </Button>
          </div>
          
          <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
            {timeline.map((hearing) => (
              <div key={hearing.number} className="relative flex items-start gap-6 group">
                <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary z-10 group-hover:scale-125 transition-transform" />
                <div className="flex-1 p-3 bg-muted/20 rounded border border-border/50 group-hover:border-primary/50 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-sm font-bold text-primary uppercase tracking-wider">Hearing {hearing.number}</span>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {hearing.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {hearing.time}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {hearing.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-border flex justify-center">
            <Button 
              onClick={handleAddCase}
              className="bg-status-success hover:bg-status-success/90 text-white min-w-[280px] py-6 text-lg shadow-lg hover:scale-105 transition-all"
            >
              Add Case to Monitoring System
            </Button>
          </div>
        </Card>
      )}

      <Card className="p-6 border-border shadow-md">
        <h2 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recently Uploaded
        </h2>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-bold">Case ID</TableHead>
                <TableHead className="font-bold">Case Category</TableHead>
                <TableHead className="font-bold">Upload Date</TableHead>
                <TableHead className="font-bold">Timeline Generated</TableHead>
                <TableHead className="font-bold text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCases.length > 0 ? (
                recentCases.map((c) => (
                  <TableRow key={c.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-medium text-primary">{c.id}</TableCell>
                    <TableCell>{c.category}</TableCell>
                    <TableCell>{c.uploadDate}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        c.timelineGenerated ? "bg-status-success/10 text-status-success" : "bg-muted text-muted-foreground"
                      }`}>
                        {c.timelineGenerated ? "Yes" : "No"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="link" className="text-primary hover:no-underline font-semibold flex items-center gap-1 ml-auto">
                        View <ArrowRight className="w-3 h-3" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground italic">
                    No recently uploaded cases found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default CaseUploadPage;
