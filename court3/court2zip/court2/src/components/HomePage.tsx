import { useState, useEffect } from "react";
import { FileText, Clock, CheckCircle, AlertTriangle, Scale, Gavel } from "lucide-react";

const HomePage = () => {
  const [stats, setStats] = useState([
    { label: "Active Cases", value: "0", desc: "Currently under monitoring", color: "bg-blue-500", icon: FileText },
    { label: "Pending Cases", value: "0", desc: "Awaiting next hearing", color: "bg-orange-500", icon: Clock },
    { label: "Disposed Cases", value: "0", desc: "Successfully resolved", color: "bg-green-600", icon: CheckCircle },
    { label: "Delayed Cases", value: "0", desc: "Exceeding predicted timeline", color: "bg-red-500", icon: AlertTriangle },
  ]);

  const [todaysHearings, setTodaysHearings] = useState<any[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("monitoring_cases") || "[]");
    
    // Calculate stats
    const activeCases = saved.filter((c: any) => c.status !== "Disposed").length;
    const delayed = saved.filter((c: any) => c.status === "Delayed").length;
    const warning = saved.filter((c: any) => c.status === "Warning").length;
    const disposed = saved.filter((c: any) => c.status === "Disposed").length;
    
    setStats([
      { label: "Active Cases", value: activeCases.toLocaleString(), desc: "Total cases under monitoring", color: "bg-blue-500", icon: FileText },
      { label: "On Track", value: (activeCases - delayed - warning).toLocaleString(), desc: "Progressing as predicted", color: "bg-green-600", icon: CheckCircle },
      { label: "Disposed Cases", value: disposed.toLocaleString(), desc: "Successfully resolved", color: "bg-green-600", icon: CheckCircle },
      { label: "Delayed Cases", value: delayed.toLocaleString(), desc: "Significant timeline deviation", color: "bg-red-500", icon: AlertTriangle },
    ]);

    // Filter today's hearings
    const todayStr = new Date().toLocaleDateString("en-GB");
    const todayHearings: any[] = [];
    
    saved.forEach((c: any) => {
      c.hearings?.forEach((h: any) => {
        if (h.date === todayStr && h.status === "Upcoming") {
          todayHearings.push({
            id: c.id,
            type: c.type,
            court: c.court,
            time: h.time,
            stage: `Hearing ${h.number}`,
            status: h.status
          });
        }
      });
    });

    setTodaysHearings(todayHearings);
  }, []);

  const statusColor = (status: string) => {
    switch (status) {
      case "Upcoming": return "bg-green-100 text-green-700 border-green-200";
      case "Delayed": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((card) => (
          <div
            key={card.label}
            className="bg-card rounded-lg border border-border shadow-sm overflow-hidden"
          >
            <div className="flex items-start gap-4 p-5">
              <div className={`${card.color} rounded-lg p-3 text-white flex-shrink-0`}>
                <card.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="text-2xl font-bold text-foreground mt-0.5">{card.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{card.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Today's Hearings */}
      <div className="bg-card rounded-lg border border-border shadow-sm">
        <div className="p-5 border-b border-border flex items-center gap-2">
          <Gavel className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Today's Scheduled Hearings</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/60">
                <th className="text-left p-3 font-semibold text-muted-foreground">Case Number</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Case Type</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Hearing Time</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Stage</th>
                <th className="text-left p-3 font-semibold text-muted-foreground">Status</th>
                <th className="text-right p-3 font-semibold text-muted-foreground">Action</th>
              </tr>
            </thead>
            <tbody>
              {todaysHearings.length > 0 ? (
                todaysHearings.map((h, i) => (
                  <tr key={h.id} className={`border-t border-border ${i % 2 === 0 ? '' : 'bg-muted/30'} hover:bg-muted/50 transition-colors`}>
                    <td className="p-3 font-medium text-primary">{h.id}</td>
                    <td className="p-3">{h.type}</td>
                    <td className="p-3 font-mono">{h.time}</td>
                    <td className="p-3">{h.stage}</td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${statusColor(h.status)}`}>
                        {h.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button className="text-primary hover:underline font-bold text-xs">View</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground italic">
                    No hearings scheduled for today.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
