import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, User, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface AuthStepThreeProps {
  onComplete: () => void;
  onBack: () => void;
}

export default function AuthStepThree({ onComplete, onBack }: AuthStepThreeProps) {
  const [username, setUsername] = useState('');
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const checkUsername = async (value: string) => {
    if (value.length < 3) {
      setAvailable(null);
      return;
    }

    setChecking(true);
    
    // Simulate API call to check username availability
    setTimeout(() => {
      setChecking(false);
      // Randomly mark as available for demo
      setAvailable(Math.random() > 0.3);
    }, 800);
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    setAvailable(null);
    
    if (value.length >= 3) {
      checkUsername(value);
    }
  };

  const handleComplete = async () => {
    if (!username.trim() || username.length < 3) {
      toast({
        title: 'Invalid username',
        description: 'Username must be at least 3 characters long',
        variant: 'destructive',
      });
      return;
    }

    if (available === false) {
      toast({
        title: 'Username unavailable',
        description: 'Please choose a different username',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call to create account
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: 'Welcome!',
        description: 'Your account has been created successfully',
      });
      
      onComplete();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={onBack}
        className="hover:bg-background/50"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      <div className="text-center space-y-2">
        <div className="flex justify-center mb-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center"
          >
            <User className="w-8 h-8 text-white" />
          </motion.div>
        </div>
        <h2 className="text-2xl font-bold">Choose Your Username</h2>
        <p className="text-muted-foreground">
          Pick a unique username for your account
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Username</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 z-10" />
            <Input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)}
              className="pl-10 pr-10 bg-background/50 backdrop-blur border-white/10"
              onKeyDown={(e) => e.key === 'Enter' && handleComplete()}
            />
            {username.length >= 3 && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                {checking ? (
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                ) : available === true ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : available === false ? (
                  <XCircle className="w-5 h-5 text-destructive" />
                ) : null}
              </div>
            )}
          </div>
          {username.length > 0 && username.length < 3 && (
            <p className="text-xs text-muted-foreground">Username must be at least 3 characters</p>
          )}
          {available === true && (
            <p className="text-xs text-green-500">Username is available!</p>
          )}
          {available === false && (
            <p className="text-xs text-destructive">Username is already taken</p>
          )}
        </div>

        <div className="bg-muted/50 backdrop-blur rounded-lg p-4 space-y-2">
          <p className="text-xs font-medium">Username guidelines:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• At least 3 characters long</li>
            <li>• Only letters, numbers, and underscores</li>
            <li>• Must be unique</li>
          </ul>
        </div>
      </div>

      <Button
        onClick={handleComplete}
        disabled={loading || !username || username.length < 3 || available !== true}
        className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
        size="lg"
      >
        {loading ? 'Creating Account...' : 'Complete Registration'}
      </Button>
    </div>
  );
}
