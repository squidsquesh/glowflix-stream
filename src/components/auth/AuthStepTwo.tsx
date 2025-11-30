import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import type { AuthMethod } from './AuthModal';

interface AuthStepTwoProps {
  authMethod: AuthMethod;
  identifier: string;
  onComplete: () => void;
  onBack: () => void;
}

export default function AuthStepTwo({ authMethod, identifier, onComplete, onBack }: AuthStepTwoProps) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast({
        title: 'Invalid OTP',
        description: 'Please enter the complete 6-digit code',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    
    // Simulate API call to verify OTP
    setTimeout(() => {
      setLoading(false);
      
      toast({
        title: 'Verified',
        description: 'OTP verified successfully',
      });
      
      onComplete();
    }, 1500);
  };

  const handleResend = () => {
    toast({
      title: 'OTP Resent',
      description: `A new verification code has been sent to your ${authMethod === 'email' ? 'email' : 'phone'}`,
    });
  };

  const maskIdentifier = (value: string) => {
    if (authMethod === 'email') {
      const [username, domain] = value.split('@');
      if (domain) {
        return `${username.slice(0, 2)}***@${domain}`;
      }
      return `${value.slice(0, 2)}***`;
    } else {
      return `***${value.slice(-4)}`;
    }
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
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
            {authMethod === 'email' ? (
              <Mail className="w-8 h-8 text-primary" />
            ) : (
              <Phone className="w-8 h-8 text-primary" />
            )}
          </div>
        </div>
        <h2 className="text-2xl font-bold">Verify Your Code</h2>
        <p className="text-muted-foreground">
          We've sent a 6-digit code to
        </p>
        <p className="text-sm font-medium">{maskIdentifier(identifier)}</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={setOtp}
            onComplete={handleVerify}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} className="w-12 h-14 text-lg bg-background/50 backdrop-blur border-white/10" />
              <InputOTPSlot index={1} className="w-12 h-14 text-lg bg-background/50 backdrop-blur border-white/10" />
              <InputOTPSlot index={2} className="w-12 h-14 text-lg bg-background/50 backdrop-blur border-white/10" />
              <InputOTPSlot index={3} className="w-12 h-14 text-lg bg-background/50 backdrop-blur border-white/10" />
              <InputOTPSlot index={4} className="w-12 h-14 text-lg bg-background/50 backdrop-blur border-white/10" />
              <InputOTPSlot index={5} className="w-12 h-14 text-lg bg-background/50 backdrop-blur border-white/10" />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="text-center">
          <button
            onClick={handleResend}
            className="text-sm text-primary hover:underline"
          >
            Didn't receive the code? Resend
          </button>
        </div>
      </div>

      <Button
        onClick={handleVerify}
        disabled={loading || otp.length !== 6}
        className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
        size="lg"
      >
        {loading ? 'Verifying...' : 'Verify & Continue'}
      </Button>
    </div>
  );
}
