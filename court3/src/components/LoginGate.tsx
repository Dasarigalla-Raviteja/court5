import { useState } from "react";
import { AlertCircle, Shield } from "lucide-react";
import DashboardApp from "./DashboardApp";

const LoginGate = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsAuthenticating(true);

    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        setShowDashboard(true);
      } else {
        setError("Invalid credentials. Please enter valid Username and Password.");
        setIsAuthenticating(false);
      }
    }, 1000);
  };

  const handleExit = () => {
    setShowDashboard(false);
    setIsAuthenticating(false);
    setUsername("");
    setPassword("");
  };

  if (showDashboard) {
    return <DashboardApp onExit={handleExit} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="govt-header">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-foreground/20 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Judicial Case Monitoring System</h1>
              <p className="text-xs text-primary-foreground/80">Government of India | Department of Justice</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        <div className="max-w-md mx-auto mt-12">
          {/* Login Box */}
          <div className="govt-section">
            <h2 className="text-lg font-semibold text-foreground mb-2 pb-2 border-b border-border">
              User Login
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Authorized Judicial and Administrative Personnel Only
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="govt-label">Username / Official ID</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="govt-input"
                  placeholder="Enter your username"
                  disabled={isAuthenticating}
                />
              </div>

              <div>
                <label className="govt-label">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="govt-input"
                  placeholder="Enter your password"
                  disabled={isAuthenticating}
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-status-danger/10 border border-status-danger/30">
                  <AlertCircle className="w-4 h-4 text-status-danger mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-status-danger">{error}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isAuthenticating || !username || !password}
                  className="govt-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAuthenticating ? "Authenticating..." : "Login"}
                </button>
                <button
                  type="button"
                  className="govt-btn-secondary"
                  onClick={() => {
                    setUsername("");
                    setPassword("");
                    setError("");
                  }}
                >
                  Reset
                </button>
              </div>

              <div className="pt-2 text-sm">
                <a href="#" className="text-primary hover:underline">Forgot Password?</a>
              </div>
            </form>
          </div>

          {/* Security Notice */}
          <div className="govt-section mt-4">
            <h3 className="text-sm font-semibold text-foreground mb-2">Security Notice</h3>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc list-inside">
              <li>This is a restricted government portal for authorized users only.</li>
              <li>Unauthorized access is punishable under the IT Act, 2000.</li>
              <li>All activities on this portal are monitored and logged.</li>
              <li>Do not share your login credentials with anyone.</li>
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
};

export default LoginGate;
