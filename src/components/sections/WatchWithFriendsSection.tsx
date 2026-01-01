import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, Users, MessageCircle, Link2, Tv } from 'lucide-react';

const features = [
  {
    icon: Tv,
    title: 'Real-time Sync',
    description: 'Perfectly synchronized playback across all devices.',
  },
  {
    icon: MessageCircle,
    title: 'Built-in Chat',
    description: 'Chat and react with friends while watching.',
  },
  {
    icon: Link2,
    title: 'Easy Sharing',
    description: 'Invite friends with a simple shareable link.',
  },
  {
    icon: Users,
    title: 'Watch Parties',
    description: 'Host watch parties with up to 10 friends.',
  },
];

export default function WatchWithFriendsSection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-2xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Watch Together,<br />No Matter the Distance
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Experience movies like never before. Our synchronized viewing technology 
              brings you and your friends together, creating shared moments even when you're apart.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Button 
              variant="hero" 
              size="lg"
              onClick={() => navigate('/movies')}
              className="group"
            >
              Create a Room
              <Users className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            </Button>
          </motion.div>

          {/* Right side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-3xl p-8 lg:p-12">
              {/* Mock UI */}
              <div className="space-y-6">
                {/* Video player mock */}
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[20px] border-l-primary border-y-[12px] border-y-transparent ml-1" />
                  </div>
                </div>

                {/* User avatars */}
                <div className="flex items-center justify-between">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary-glow border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                    <div className="w-10 h-10 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs text-muted-foreground">
                      +3
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    All synced
                  </div>
                </div>

                {/* Chat messages mock */}
                <div className="space-y-3">
                  {['This scene is amazing! 🎬', 'Best movie night ever!'].map((msg, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0" />
                      <div className="bg-muted/50 rounded-2xl rounded-tl-sm px-4 py-2 text-sm text-foreground">
                        {msg}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
