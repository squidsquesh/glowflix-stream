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
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          {/* Left - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
              Watch Together
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
              No Matter <span className="text-primary">the Distance</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Synchronized viewing brings you and your friends together, 
              creating shared movie moments even when apart.
            </p>

            <ul className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <motion.li
                  key={feature.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 text-foreground"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-base">{feature.text}</span>
                </motion.li>
              ))}
            </ul>

            <Button 
              size="lg"
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
            <div className="bg-card border border-border rounded-3xl p-8 lg:p-10">
              {/* Video area */}
              <div className="aspect-video bg-background rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden border border-border">
                <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[18px] border-l-primary border-y-[12px] border-y-transparent ml-1" />
                </div>
              </div>

              {/* User row */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex -space-x-3">
                  {['A', 'B', 'C', 'D'].map((letter, i) => (
                    <div
                      key={letter}
                      className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary/30 text-primary flex items-center justify-center text-sm font-semibold"
                      style={{ zIndex: 4 - i }}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="w-2 h-2 rounded-full bg-primary" />
                  All synced
                </div>
              </div>

              {/* Chat messages */}
              <div className="space-y-3">
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0" />
                  <div className="bg-background border border-border rounded-2xl px-4 py-2 text-sm text-foreground">
                    This scene is amazing! 🎬
                  </div>
                </div>
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0" />
                  <div className="bg-background border border-border rounded-2xl px-4 py-2 text-sm text-foreground">
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
