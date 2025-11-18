import { Button } from '@/components/ui/button';
import { LogIn, UserPlus, Home, Search, User, Film, Menu, Sparkles, DollarSign } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/movies', icon: Film, label: 'Movies' },
  { path: '/search', icon: Search, label: 'Search' },
  { path: '/dashboard', icon: Menu, label: 'Rooms' },
  { path: '/pricing', icon: DollarSign, label: 'Pricing' },
  { path: '/future', icon: Sparkles, label: 'Future' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function TopNavigation() {
  // Simulate authentication state - in real app this would come from auth context
  const isAuthenticated = false;
  const location = useLocation();

  return (
    <>
      {/* Top Navigation - Desktop */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Cinema Together
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <div className="flex items-center gap-6">
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
            </div>

            {/* Desktop Auth Buttons */}
            {!isAuthenticated && (
              <div className="flex items-center gap-3 flex-shrink-0">
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
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border/50">
        <div className="flex items-center justify-around px-2 py-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all relative group"
              >
                <Icon 
                  className={`w-6 h-6 transition-all ${
                    isActive 
                      ? 'text-primary drop-shadow-[0_0_8px_hsl(var(--primary))] scale-110' 
                      : 'text-muted-foreground group-hover:text-primary'
                  }`} 
                />
                <span className={`text-[10px] font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}