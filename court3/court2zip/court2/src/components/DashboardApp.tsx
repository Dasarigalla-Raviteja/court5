import { useState, useEffect } from "react";
import { Clock, LogOut } from "lucide-react";
import ActiveCasesPage from "./ActiveCasesPage";
import HomePage from "./HomePage";
import CaseUploadPage from "./CaseUploadPage";

interface DashboardAppProps {
  onExit?: () => void;
}

const DashboardApp = ({ onExit }: DashboardAppProps) => {
  const [activeTab, setActiveTab] = useState("home");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  };

  const navItems = [
    { id: "home", label: "Home" },
    { id: "upload", label: "Case Upload" },
    { id: "cases", label: "Case Status" },
    { id: "reports", label: "Reports" },
    { id: "users", label: "Users" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Government Header */}
      <header className="govt-header">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-foreground/20 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Judicial Case Monitoring System</h1>
                <p className="text-xs text-primary-foreground/80">Government of India | Department of Justice</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-primary-foreground/80">
              <span>{formatDate(currentTime)}</span>
              <span className="font-mono">{formatTime(currentTime)}</span>
              <span>Welcome, Administrator</span>
              <button 
                onClick={onExit}
                className="flex items-center gap-1 hover:text-primary-foreground"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto">
          <ul className="flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 text-sm border-b-2 transition-colors ${
                    activeTab === item.id
                      ? "border-primary text-primary font-medium bg-background"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-background/50"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        {activeTab === "home" && <HomePage />}
        {activeTab === "upload" && <CaseUploadPage />}
        {activeTab === "cases" && <ActiveCasesPage />}
      </main>
    </div>
  );
};

export default DashboardApp;
