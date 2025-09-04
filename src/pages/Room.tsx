import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Users, 
  Send, 
  Settings,
  ArrowLeft,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

// Hardcoded data
const roomData = {
  id: '1',
  movieTitle: 'Nexus Dawn',
  movieUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  host: 'John Doe',
  members: [
    { id: '1', name: 'John Doe', avatar: '', isHost: true, isOnline: true },
    { id: '2', name: 'Jane Smith', avatar: '', isHost: false, isOnline: true },
    { id: '3', name: 'Mike Johnson', avatar: '', isHost: false, isOnline: false },
    { id: '4', name: 'Sarah Wilson', avatar: '', isHost: false, isOnline: true }
  ],
  messages: [
    { id: '1', user: 'John Doe', message: 'Welcome to the room!', timestamp: '10:30', isSystem: true },
    { id: '2', user: 'Jane Smith', message: 'Hey everyone! Ready to watch?', timestamp: '10:31', isSystem: false },
    { id: '3', user: 'Mike Johnson', message: 'This movie looks amazing', timestamp: '10:32', isSystem: false },
    { id: '4', user: 'Sarah Wilson', message: 'Let\'s start!', timestamp: '10:33', isSystem: false }
  ]
};

export default function Room() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playerWidth, setPlayerWidth] = useState(80);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(roomData.messages);
  const videoRef = useRef<HTMLVideoElement>(null);
  const resizerRef = useRef<HTMLDivElement>(null);

  // Video controls
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  // Chat functionality
  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: (messages.length + 1).toString(),
        user: 'You',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        isSystem: false
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const onlineMembers = roomData.members.filter(member => member.isOnline);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card/50 border-b border-border/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/movies')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">{roomData.movieTitle}</h1>
              <p className="text-sm text-muted-foreground">
                Hosted by {roomData.host}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="gap-1">
              <Users className="w-3 h-3" />
              {onlineMembers.length} online
            </Badge>
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Video Player Section */}
        <motion.div 
          style={{ width: `${playerWidth}%` }}
          className="bg-black relative flex flex-col"
        >
          <div className="flex-1 relative">
            <video
              ref={videoRef}
              src={roomData.movieUrl}
              className="w-full h-full object-contain"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onClick={togglePlay}
            />
            
            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="flex items-center gap-4 mb-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={togglePlay}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20"
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </Button>
                
                <div className="flex-1 flex items-center gap-2 text-white text-sm">
                  <span>{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                  />
                  <span>{formatTime(duration)}</span>
                </div>
                
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/20"
                >
                  <Maximize className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Resizer */}
        <div 
          ref={resizerRef}
          className="w-1 bg-border hover:bg-primary cursor-col-resize transition-colors"
          onMouseDown={(e) => {
            const startX = e.clientX;
            const startWidth = playerWidth;
            
            const handleMouseMove = (e: MouseEvent) => {
              const diff = ((e.clientX - startX) / window.innerWidth) * 100;
              const newWidth = Math.max(50, Math.min(80, startWidth + diff));
              setPlayerWidth(newWidth);
            };
            
            const handleMouseUp = () => {
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };
            
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
        />

        {/* Chat Panel */}
        <div 
          style={{ width: `${100 - playerWidth}%` }}
          className="bg-card/30 flex flex-col border-l border-border/50"
        >
          {/* Members List */}
          <div className="p-4 border-b border-border/50">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Members ({roomData.members.length})
            </h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {roomData.members.map((member) => (
                <div key={member.id} className="flex items-center gap-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={member.avatar} />
                    <AvatarFallback className="text-xs">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm flex-1">{member.name}</span>
                  {member.isHost && (
                    <Badge variant="secondary" className="text-xs">Host</Badge>
                  )}
                  <div className={`w-2 h-2 rounded-full ${
                    member.isOnline ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <h3 className="font-semibold mb-3">Chat</h3>
            <div className="space-y-3">
              {messages.map((message) => (
                <div key={message.id} className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${
                      message.isSystem ? 'text-primary' : 'text-foreground'
                    }`}>
                      {message.user}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {message.timestamp}
                    </span>
                  </div>
                  <p className={`text-sm ${
                    message.isSystem ? 'text-muted-foreground italic' : 'text-foreground'
                  }`}>
                    {message.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border/50">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                className="bg-background/50"
              />
              <Button onClick={sendMessage} size="icon" variant="default">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}