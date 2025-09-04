import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Search, User, Settings, Film, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/movies', icon: Film, label: 'Movies' },
  { path: '/search', icon: Search, label: 'Search' },
  { path: '/dashboard', icon: Menu, label: 'Rooms' },
  { path: '/profile', icon: User, label: 'Profile' },
];

export default function BottomNavigation() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-t border-border/50"
        >
          <div className="flex justify-around items-center px-4 py-3 max-w-lg mx-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className="relative flex flex-col items-center gap-1 p-2 rounded-xl smooth-transition hover:bg-muted/50"
                >
                  <div className={`p-2 rounded-xl smooth-transition ${
                    isActive 
                      ? 'bg-primary text-primary-foreground golden-glow' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <span className={`text-xs font-medium smooth-transition ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {item.label}
                  </span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -top-1 left-1/2 w-1 h-1 bg-primary rounded-full"
                      style={{ x: '-50%' }}
                    />
                  )}
                </NavLink>
              );
            })}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}