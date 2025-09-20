import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface JoinRoomModalProps {
  children: React.ReactNode;
}

export function JoinRoomModal({ children }: JoinRoomModalProps) {
  const [open, setOpen] = useState(false);
  const [roomCode, setRoomCode] = useState('');

  const handleJoinRoom = () => {
    if (roomCode.length === 6) {
      // TODO: Implement room joining logic
      console.log('Joining room with code:', roomCode);
      setOpen(false);
      setRoomCode('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur border-border/50">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2 text-primary">
            Join Movie Room
          </DialogTitle>
          <p className="text-muted-foreground text-center">
            Enter the 6-digit room code to join your friends
          </p>
        </DialogHeader>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 py-4"
        >
          <div className="flex justify-center">
            <div className="p-4 bg-primary/20 rounded-full">
              <Users className="w-8 h-8 text-primary" />
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center">
              <label className="text-sm font-medium text-foreground">
                Room Code
              </label>
            </div>
            
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={roomCode}
                onChange={setRoomCode}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </div>

          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="hero" 
              className="flex-1"
              onClick={handleJoinRoom}
              disabled={roomCode.length !== 6}
            >
              Join Room
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}