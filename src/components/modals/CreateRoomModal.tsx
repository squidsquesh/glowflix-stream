import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Users, Lock, Globe } from 'lucide-react';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  movieTitle: string;
  movieId: number;
}

export default function CreateRoomModal({ 
  isOpen, 
  onClose, 
  movieTitle, 
  movieId 
}: CreateRoomModalProps) {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState(`${movieTitle} Watch Party`);
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [maxMembers, setMaxMembers] = useState('10');
  const [allowChat, setAllowChat] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateRoom = async () => {
    setIsCreating(true);
    
    // Simulate room creation delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a random room ID for demo
    const roomId = Math.random().toString(36).substr(2, 9);
    
    // Navigate to the room
    navigate(`/room/${roomId}`);
    
    setIsCreating(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            Create Watch Room
          </DialogTitle>
          <DialogDescription>
            Set up a room to watch <span className="font-semibold text-primary">{movieTitle}</span> with friends
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Room Name */}
          <div className="space-y-2">
            <Label htmlFor="roomName">Room Name</Label>
            <Input
              id="roomName"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              placeholder="Enter room name"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description for your room"
              rows={2}
            />
          </div>

          {/* Privacy Settings */}
          <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
            <div className="flex items-center gap-3">
              {isPrivate ? (
                <Lock className="w-4 h-4 text-muted-foreground" />
              ) : (
                <Globe className="w-4 h-4 text-muted-foreground" />
              )}
              <div>
                <Label className="text-sm font-medium">
                  {isPrivate ? 'Private Room' : 'Public Room'}
                </Label>
                <p className="text-xs text-muted-foreground">
                  {isPrivate 
                    ? 'Only invited users can join' 
                    : 'Anyone can discover and join'
                  }
                </p>
              </div>
            </div>
            <Switch
              checked={isPrivate}
              onCheckedChange={setIsPrivate}
            />
          </div>

          {/* Max Members */}
          <div className="space-y-2">
            <Label htmlFor="maxMembers">Maximum Members</Label>
            <div className="flex gap-2">
              <Input
                id="maxMembers"
                type="number"
                min="2"
                max="50"
                value={maxMembers}
                onChange={(e) => setMaxMembers(e.target.value)}
                className="w-20"
              />
              <div className="flex gap-1">
                {['5', '10', '20', '50'].map((num) => (
                  <Button
                    key={num}
                    variant={maxMembers === num ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMaxMembers(num)}
                    className="px-3"
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Settings */}
          <div className="flex items-center justify-between p-3 bg-card/50 rounded-lg">
            <div>
              <Label className="text-sm font-medium">Enable Chat</Label>
              <p className="text-xs text-muted-foreground">
                Allow members to chat during the movie
              </p>
            </div>
            <Switch
              checked={allowChat}
              onCheckedChange={setAllowChat}
            />
          </div>

          {/* Room Features */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              Synchronized Playback
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Real-time Chat
            </Badge>
            <Badge variant="secondary" className="text-xs">
              Member Management
            </Badge>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose} disabled={isCreating}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreateRoom} 
            disabled={isCreating || !roomName.trim()}
            className="min-w-[100px]"
          >
            {isCreating ? 'Creating...' : 'Create Room'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}