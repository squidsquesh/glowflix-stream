import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Users, MessageCircle, Link2, Tv, ArrowRight } from 'lucide-react';

const features = [
  { icon: Tv, text: 'Real-time sync across devices' },
  { icon: MessageCircle, text: 'Built-in chat & reactions' },
  { icon: Link2, text: 'Easy invite links' },
  { icon: Users, text: 'Up to 10 friends per room' },
];

export default function WatchWithFriendsSection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-5xl mx-auto">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
              Watch Together,<br />
              <span className="text-primary">No Matter the Distance</span>
            </h2>
            <p className="text-muted-foreground text-base mb-8 leading-relaxed max-w-md">
              Synchronized viewing brings you and your friends together, 
              creating shared movie moments even when apart.
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <motion.li
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 text-foreground"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-sm">{feature.text}</span>
                </motion.li>
              ))}
            </ul>

            <Button 
              onClick={() => navigate('/movies')}
              className="group"
            >
              Create a Room
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>

          {/* Right - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
              {/* Video area */}
              <div className="aspect-video bg-muted rounded-xl mb-5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[16px] border-l-primary-foreground border-y-[10px] border-y-transparent ml-1" />
                </div>
              </div>

              {/* User row */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex -space-x-2">
                  {['A', 'B', 'C', 'D'].map((letter, i) => (
                    <div
                      key={letter}
                      className="w-9 h-9 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold border-2 border-card"
                      style={{ zIndex: 4 - i }}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  All synced
                </div>
              </div>

              {/* Chat messages */}
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex-shrink-0" />
                  <div className="bg-muted rounded-full px-3 py-1.5 text-xs text-foreground">
                    This scene is amazing! 🎬
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex-shrink-0" />
                  <div className="bg-muted rounded-full px-3 py-1.5 text-xs text-foreground">
                    Best movie night ever! 🍿
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
