import { Button } from '@/components/ui/button';
import { LogIn, UserPlus, Home, Search, User, Film, Menu, Sparkles, DollarSign } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

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
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const authRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const shouldFloat = scrollY > 100;

      if (shouldFloat !== isFloating) {
        setIsFloating(shouldFloat);

        if (shouldFloat) {
          // Animate to floating bottom state
          const tl = gsap.timeline();
          
          tl.to(navRef.current, {
            top: 'auto',
            bottom: '2rem',
            left: '50%',
            right: 'auto',
            transform: 'translateX(-50%)',
            width: 'auto',
            maxWidth: '600px',
            borderRadius: '9999px',
            padding: '0.75rem 1.5rem',
            boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5), 0 0 60px -20px hsl(var(--primary) / 0.3)',
            background: 'hsl(var(--card) / 0.98)',
            border: '1px solid hsl(var(--border) / 0.8)',
            duration: 0.6,
            ease: 'power3.out',
          })
          .to([logoRef.current, authRef.current], {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: 'power2.in',
          }, 0)
          .to(labelRefs.current, {
            opacity: 0,
            x: -10,
            duration: 0.3,
            ease: 'power2.in',
            stagger: 0.02,
          }, 0);
        } else {
          // Animate back to top state
          const tl = gsap.timeline();
          
          tl.to(navRef.current, {
            top: '0',
            bottom: 'auto',
            left: '0',
            right: '0',
            transform: 'none',
            width: '100%',
            maxWidth: '100%',
            borderRadius: '0',
            padding: '0',
            boxShadow: 'none',
            background: 'hsl(var(--card) / 0.95)',
            border: 'none',
            borderBottom: '1px solid hsl(var(--border) / 0.5)',
            duration: 0.6,
            ease: 'power3.out',
          })
          .to([logoRef.current, authRef.current], {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power2.out',
          }, 0.2)
          .to(labelRefs.current, {
            opacity: 1,
            x: 0,
            duration: 0.4,
            ease: 'power2.out',
            stagger: 0.02,
          }, 0.3);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFloating]);

  return (
    <>
      {/* Top Navigation - Desktop */}
      <nav 
        ref={navRef}
        className="hidden lg:block fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border/50"
      >
        <div className={`${isFloating ? '' : 'container mx-auto px-4 sm:px-6 py-4'}`}>
          <div className={`flex items-center ${isFloating ? 'justify-center gap-3' : 'justify-between'}`}>
            {/* Logo */}
            <div ref={logoRef} className={`flex items-center gap-2 flex-shrink-0 ${isFloating ? 'hidden' : ''}`}>
              <Link to="/">
                <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  Cinema Together
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className={`flex items-center ${isFloating ? 'gap-2' : 'gap-6'}`}>
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2 rounded-lg text-sm font-medium transition-colors ${
                      isFloating ? 'px-3 py-2' : 'px-3 py-2'
                    } ${
                      isActive 
                        ? 'bg-primary/10 text-primary' 
                        : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span 
                      ref={(el) => { labelRefs.current[index] = el; }}
                      className={isFloating ? 'hidden' : 'hidden xl:inline'}
                    >
                      {item.label}
                    </span>
                  </NavLink>
                );
              })}
            </div>

            {/* Desktop Auth Buttons */}
            {!isAuthenticated && (
              <div ref={authRef} className={`flex items-center gap-3 flex-shrink-0 ${isFloating ? 'hidden' : ''}`}>
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