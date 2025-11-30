import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';
import AuthStepOne from './AuthStepOne';
import AuthStepTwo from './AuthStepTwo';
import AuthStepThree from './AuthStepThree';

export type AuthMethod = 'email' | 'phone';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [authMethod, setAuthMethod] = useState<AuthMethod>('email');
  const [identifier, setIdentifier] = useState(''); // email/username or phone
  const [isNewUser, setIsNewUser] = useState(false);

  const handleStepOneComplete = (method: AuthMethod, value: string, newUser: boolean) => {
    setAuthMethod(method);
    setIdentifier(value);
    setIsNewUser(newUser);
    setStep(2);
  };

  const handleStepTwoComplete = () => {
    if (isNewUser) {
      setStep(3);
    } else {
      // Login successful
      onOpenChange(false);
      resetModal();
    }
  };

  const handleStepThreeComplete = () => {
    // Registration successful
    onOpenChange(false);
    resetModal();
  };

  const resetModal = () => {
    setStep(1);
    setAuthMethod('email');
    setIdentifier('');
    setIsNewUser(false);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as 1 | 2);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden border-0 bg-transparent">
        <div className="relative bg-background/80 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary-glow/10 rounded-2xl" />
          
          <div className="relative p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AuthStepOne onComplete={handleStepOneComplete} />
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AuthStepTwo 
                    authMethod={authMethod}
                    identifier={identifier}
                    onComplete={handleStepTwoComplete}
                    onBack={handleBack}
                  />
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <AuthStepThree 
                    onComplete={handleStepThreeComplete}
                    onBack={handleBack}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
