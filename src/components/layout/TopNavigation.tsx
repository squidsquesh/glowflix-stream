import { Button } from '@/components/ui/button';
import { LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TopNavigation() {
  // Simulate authentication state - in real app this would come from auth context
  const isAuthenticated = false;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Cinema Together
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Pricing
            </Link>
          </div>

          {/* Auth Buttons */}
          {!isAuthenticated && (
            <div className="flex items-center gap-3">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Link>
              </Button>
              
              <Button asChild variant="hero" size="sm">
                <Link to="/signup">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Sign Up
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}