import { motion } from 'framer-motion';
import { Film, Users, Play } from 'lucide-react';

const steps = [
  {
    icon: Film,
    title: 'Choose Your Movie',
    description: 'Browse our collection of blockbusters and hidden gems.',
    step: '01',
  },
  {
    icon: Users,
    title: 'Create or Join a Room',
    description: 'Watch solo or invite friends to your viewing room.',
    step: '02',
  },
  {
    icon: Play,
    title: 'Enjoy Together',
    description: 'Sync playback and chat in real-time with friends.',
    step: '03',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
            How It Works
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
            Three Simple Steps
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-3xl font-bold text-primary">
                  {step.step}
                </span>
              </div>

              <h3 className="text-lg font-semibold mb-2 text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
