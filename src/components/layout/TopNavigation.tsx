import { Button } from '@/components/ui/button';
import { LogIn, UserPlus, Home, Search, User, Film, Menu, Sparkles } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/movies', icon: Film, label: 'Movies' },
  { path: '/search', icon: Search, label: 'Search' },
  { path: '/dashboard', icon: Menu, label: 'Rooms' },
  { path: '/future', icon: Sparkles, label: 'Future' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function TopNavigation() {
  // Simulate authentication state - in real app this would come from auth context
  const isAuthenticated = false;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Hidden on mobile */}
          <Link to="/" className="hidden sm:flex items-center gap-2 flex-shrink-0">
            <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Cinema Together
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden xl:inline">{item.label}</span>
                </NavLink>
              );
            })}
            <Link to="/pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2">
              Pricing
            </Link>
          </div>

          {/* Mobile Menu Button - Always visible on mobile */}
          <div className="sm:hidden w-full flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>

          {/* Desktop Auth Buttons - Hidden on mobile */}
          {!isAuthenticated && (
            <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">
                  <LogIn className="w-4 h-4 mr-2" />
                  <span className="hidden md:inline">Sign In</span>
                </Link>
              </Button>
              
              <Button asChild variant="hero" size="sm">
                <Link to="/signup">
                  <UserPlus className="w-4 h-4 mr-2" />
                  <span className="hidden md:inline">Sign Up</span>
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border/50">
            <div className="flex flex-col gap-2 mt-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </NavLink>
                );
              })}
              <Link 
                to="/pricing" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 transition-colors"
              >
                Pricing
              </Link>
              
              {!isAuthenticated && (
                <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/50">
                  <Button asChild variant="ghost" size="sm" className="justify-start">
                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Link>
                  </Button>
                  
                  <Button asChild variant="hero" size="sm" className="justify-start">
                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Sign Up
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}