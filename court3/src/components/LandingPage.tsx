import { useState } from "react";
import { Scale, Shield, FileText, Clock, ArrowRight } from "lucide-react";
import LoginGate from "./LoginGate";
import HeroLanding from "./HeroLanding";
import justiceScalesImg from "@/assets/justice-scales.png";

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showHero, setShowHero] = useState(true);

  if (showHero) {
    return <HeroLanding onEnter={() => setShowHero(false)} />;
  }

  if (showLogin) {
    return <LoginGate />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="govt-header">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-foreground/20 flex items-center justify-center">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-lg font-semibold">Judicial Case Monitoring System</h1>
                <p className="text-xs text-primary-foreground/80">Government of India | Department of Justice</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-2">
              <a href="#" className="govt-nav-link">Home</a>
              <a href="#" className="govt-nav-link">About</a>
              <a href="#" className="govt-nav-link">Services</a>
              <a href="#" className="govt-nav-link">Help</a>
              <a href="#" className="govt-nav-link">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        {/* Welcome Banner */}
        <div className="govt-section mb-6">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-foreground mb-3">
                Welcome to Judicial Case Monitoring System
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                An initiative by the Department of Justice, Government of India, to monitor and track 
                judicial case timelines across courts. This system enables authorized judicial officers 
                and administrative staff to upload case documents, monitor case progress, and generate 
                timeline reports.
              </p>
              <button 
                onClick={() => setShowLogin(true)}
                className="govt-btn-primary flex items-center gap-2"
              >
                Login to Portal
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="hidden md:block w-48 h-32 bg-muted border border-border overflow-hidden">
              <img 
                src={justiceScalesImg} 
                alt="Scales of Justice" 
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="govt-section">
            <div className="flex items-start gap-3">
              <FileText className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Case Document Upload</h3>
                <p className="text-xs text-muted-foreground">
                  Upload official case documents for timeline monitoring and tracking.
                </p>
              </div>
            </div>
          </div>
          <div className="govt-section">
            <div className="flex items-start gap-3">
              <Clock className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Timeline Monitoring</h3>
                <p className="text-xs text-muted-foreground">
                  Track case progress and receive alerts for pending deadlines.
                </p>
              </div>
            </div>
          </div>
          <div className="govt-section">
            <div className="flex items-start gap-3">
              <Shield className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Secure Access</h3>
                <p className="text-xs text-muted-foreground">
                  Role-based access control for judicial officers and staff.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Statistics */}
        <div className="govt-section mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 pb-2 border-b border-border">
            Portal Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-muted">
              <p className="text-2xl font-bold text-primary">7,368</p>
              <p className="text-xs text-muted-foreground mt-1">Total Cases Registered</p>
            </div>
            <div className="text-center p-4 bg-muted">
              <p className="text-2xl font-bold text-foreground">2,847</p>
              <p className="text-xs text-muted-foreground mt-1">Active Cases</p>
            </div>
            <div className="text-center p-4 bg-muted">
              <p className="text-2xl font-bold text-status-success">4,521</p>
              <p className="text-xs text-muted-foreground mt-1">Disposed Cases</p>
            </div>
            <div className="text-center p-4 bg-muted">
              <p className="text-2xl font-bold text-foreground">156</p>
              <p className="text-xs text-muted-foreground mt-1">Registered Courts</p>
            </div>
          </div>
        </div>

        {/* Important Links and Notice */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="govt-section">
            <h2 className="text-lg font-semibold text-foreground mb-3 pb-2 border-b border-border">
              Important Links
            </h2>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-primary hover:underline">eCourts Services</a></li>
              <li><a href="#" className="text-primary hover:underline">Supreme Court of India</a></li>
              <li><a href="#" className="text-primary hover:underline">High Courts Portal</a></li>
              <li><a href="#" className="text-primary hover:underline">Department of Justice</a></li>
              <li><a href="#" className="text-primary hover:underline">National Judicial Data Grid</a></li>
            </ul>
          </div>
          <div className="govt-section">
            <h2 className="text-lg font-semibold text-foreground mb-3 pb-2 border-b border-border">
              Important Notice
            </h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex gap-2">
                <span className="text-status-danger font-bold">NEW</span>
                System maintenance scheduled for 20-01-2024 (10:00 PM - 2:00 AM)
              </p>
              <p className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                All users are advised to update their passwords every 90 days
              </p>
              <p className="flex gap-2">
                <span className="text-primary font-bold">•</span>
                For technical issues, contact NIC Helpdesk: 1800-111-555
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
