import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const Footer = () => (
  <footer className="fixed bottom-0 left-0 right-0 bg-background border-t border-border py-4 px-6 text-center z-50">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest font-bold">
      <div className="space-y-1 md:text-left">
        <p>© Department of Justice, Government of India</p>
        <p className="text-[9px] opacity-70">Designed and Developed by National Informatics Centre (NIC)</p>
      </div>
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
        <a href="#" className="hover:text-primary transition-colors">Terms of Use</a>
        <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-primary transition-colors">Disclaimer</a>
        <a href="#" className="hover:text-primary transition-colors">Contact Us</a>
      </div>
    </div>
  </footer>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1 pb-24">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
