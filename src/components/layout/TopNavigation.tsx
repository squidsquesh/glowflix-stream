import { Button } from '@/components/ui/button';
import { LogIn, UserPlus, Home, Search, User, Film, Menu, Sparkles, DollarSign } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/movies', icon: Film, label: 'Movies' },
  { path: '/search', icon: Search, label: 'Search' },
  { path: '/dashboard', icon: Menu, label: 'Rooms' },
  { path: '/pricing', icon: DollarSign, label: 'Pricing' },
  { path: '/future', icon: Sparkles, label: 'Future' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function TopNavigation({ onAuthClick }: { onAuthClick?: () => void }) {
  const isAuthenticated = false;
  const location = useLocation();
  const topNavRef = useRef<HTMLDivElement>(null);
  const floatingNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state - hide floating nav
      gsap.set(floatingNavRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.8,
      });

      // Create scroll trigger
      ScrollTrigger.create({
        start: 'top -80',
        end: 99999,
        onUpdate: (self) => {
          const progress = self.progress;
          
          if (self.direction === -1 && progress === 0) {
            // Scrolling up to top - show top nav, hide floating
            gsap.to(topNavRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: 'power3.out',
            });
            
            gsap.to(floatingNavRef.current, {
              y: 100,
              opacity: 0,
              scale: 0.8,
              duration: 0.4,
              ease: 'power3.in',
            });
          }
        },
        onEnter: () => {
          // Scrolled down - hide top nav, show floating
          gsap.to(topNavRef.current, {
            y: -100,
            opacity: 0,
            duration: 0.4,
            ease: 'power3.in',
          });
          
          gsap.to(floatingNavRef.current, {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            ease: 'power3.out',
          });
        },
        onLeaveBack: () => {
          // Scrolled back to top - show top nav, hide floating
          gsap.to(topNavRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
          });
          
          gsap.to(floatingNavRef.current, {
            y: 100,
            opacity: 0,
            scale: 0.8,
            duration: 0.4,
            ease: 'power3.in',
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* Top Navigation - Desktop (Default State) */}
      <nav 
        ref={topNavRef}
        className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-primary/20 rounded-b-3xl shadow-[0_8px_30px_-10px_rgba(0,0,0,0.5)] mx-4"
      >
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
                <Button onClick={onAuthClick} variant="hero" size="sm" className="bg-gradient-to-r from-primary to-primary-glow">
                  <LogIn className="w-4 h-4 mr-2" />
                  <span className="hidden md:inline">Sign In / Sign Up</span>
                  <span className="md:hidden">Auth</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Floating Bottom Navigation - Desktop (Scroll State) */}
      <nav 
        ref={floatingNavRef}
        className="hidden lg:flex fixed bottom-8 left-1/2 -translate-x-1/2 z-50 items-center gap-2 px-6 py-3 bg-card/98 backdrop-blur-xl rounded-full border border-border/80 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5),0_0_60px_-20px_hsl(var(--primary)/0.3)]"
        style={{ willChange: 'transform, opacity' }}
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                isActive 
                  ? 'bg-primary/20 text-primary scale-110' 
                  : 'text-muted-foreground hover:text-primary hover:bg-muted/50 hover:scale-105'
              }`}
            >
              <Icon className="w-5 h-5" />
            </NavLink>
          );
        })}
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card/98 backdrop-blur-xl border-t-2 border-primary/30 rounded-t-[2rem] shadow-[0_-8px_30px_-10px_rgba(0,0,0,0.5),0_-2px_20px_-5px_hsl(var(--primary)/0.5),0_-1px_8px_0px_hsl(var(--primary)/0.3)]">
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