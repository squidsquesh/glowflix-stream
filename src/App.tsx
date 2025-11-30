import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext, useContext } from "react";

import TopNavigation from "@/components/layout/TopNavigation";
import AuthModal from "@/components/auth/AuthModal";
import Index from "./pages/Index";
import Movies from "./pages/Movies";
import Room from "./pages/Room";
import WatchAlone from "./pages/WatchAlone";
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Pricing from "./pages/Pricing";
import Future from "./pages/Future";
import NotFound from "./pages/NotFound";

// Auth Context
interface AuthContextType {
  isAuthenticated: boolean;
  openAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  openAuthModal: () => {},
})

export const useAuth = () => useContext(AuthContext);

const queryClient = new QueryClient();

const App = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isAuthenticated] = useState(false); // TODO: Replace with actual auth state

  const authContextValue: AuthContextType = {
    isAuthenticated,
    openAuthModal: () => setAuthModalOpen(true),
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthContext.Provider value={authContextValue}>
            <div className="relative min-h-screen bg-background">
              <TopNavigation />
              <div className="min-h-screen lg:pt-16 pb-20 lg:pb-0">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route path="/room/:roomId" element={<Room />} />
                  <Route path="/watch-alone/:movieId" element={<WatchAlone />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/pricing" element={<Pricing />} />
                  <Route path="/future" element={<Future />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
            </div>
          </AuthContext.Provider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
