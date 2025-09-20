import { motion } from 'framer-motion';
import { Plus, Users, Clock, Trash2, Edit, Eye, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JoinRoomModal } from '@/components/modals/JoinRoomModal';

const myRooms = [
  { id: 1, name: 'Friday Night Movies', movie: 'Nexus Dawn', members: 8, created: '2 hours ago', status: 'active' },
  { id: 2, name: 'Sci-Fi Marathon', movie: 'Quantum Shift', members: 5, created: '1 day ago', status: 'waiting' },
  { id: 3, name: 'Fantasy Club', movie: 'Golden Realm', members: 12, created: '3 days ago', status: 'ended' },
];

const invitedRooms = [
  { id: 4, name: 'Action Heroes', movie: 'Stellar Odyssey', host: 'Alex Parker', members: 6, invited: '1 hour ago' },
  { id: 5, name: 'Drama Night', movie: 'Midnight Echoes', host: 'Sarah Johnson', members: 4, invited: '3 hours ago' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background pt-6 pb-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                My Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Manage your movie rooms and join friends
              </p>
            </div>
            <div className="flex gap-3">
              <JoinRoomModal>
                <Button variant="outline" size="lg">
                  <UserPlus className="w-5 h-5 mr-2" />
                  Join Room
                </Button>
              </JoinRoomModal>
              <Button variant="hero" size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Create New Room
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-muted-foreground">Active Rooms</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">25</p>
                  <p className="text-muted-foreground">Hours Watched</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur border-border/50">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/20 rounded-lg">
                  <Eye className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">42</p>
                  <p className="text-muted-foreground">Movies Watched</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* My Rooms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4 text-primary">My Rooms</h2>
          <div className="grid gap-4">
            {myRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 smooth-transition">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold">{room.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            room.status === 'active' 
                              ? 'bg-green-500/20 text-green-400' 
                              : room.status === 'waiting'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-gray-500/20 text-gray-400'
                          }`}>
                            {room.status}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-1">Movie: {room.movie}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {room.members} members
                          </span>
                          <span>Created {room.created}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="hover:border-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Invited Rooms */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-primary">Room Invitations</h2>
          <div className="grid gap-4">
            {invitedRooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 smooth-transition">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
                        <p className="text-muted-foreground mb-1">Movie: {room.movie}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Hosted by {room.host}</span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {room.members} members
                          </span>
                          <span>Invited {room.invited}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="hero" size="sm">
                          Join Room
                        </Button>
                        <Button variant="outline" size="sm">
                          Decline
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}