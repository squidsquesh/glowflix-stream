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
    <section className="py-24 lg:py-32 relative">
      <div className="container mx-auto px-6">
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

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              {/* Step number */}
              <span className="text-6xl font-bold text-primary/20 mb-4 block">
                {step.step}
              </span>

              {/* Icon container */}
              <div className="inline-flex mb-6">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-base leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
