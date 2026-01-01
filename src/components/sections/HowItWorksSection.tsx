import { motion } from 'framer-motion';
import { Film, Users, Play } from 'lucide-react';

const steps = [
  {
    icon: Film,
    title: 'Choose Your Movie',
    description: 'Browse our collection of blockbusters and hidden gems.',
    step: '1',
  },
  {
    icon: Users,
    title: 'Create or Join a Room',
    description: 'Watch solo or invite friends to your viewing room.',
    step: '2',
  },
  {
    icon: Play,
    title: 'Enjoy Together',
    description: 'Sync playback and chat in real-time with friends.',
    step: '3',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 lg:py-28 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-3 text-foreground">
            How It Works
          </h2>
          <p className="text-muted-foreground text-base max-w-md mx-auto">
            Start watching with friends in three simple steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-10 max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              {/* Icon container */}
              <div className="relative inline-flex mb-6">
                <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center group-hover:scale-105 transition-transform duration-300 golden-glow">
                  <step.icon className="w-9 h-9 text-primary-foreground" />
                </div>
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-background border-2 border-primary text-primary text-sm font-bold flex items-center justify-center">
                  {step.step}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px] mx-auto">
                {step.description}
              </p>

              {/* Connector line (except last) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[calc(100%_-_1rem)] w-8 h-0.5 bg-border" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
