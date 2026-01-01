import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Play, ArrowRight } from 'lucide-react';

export default function CTAFooterSection() {
  const navigate = useNavigate();

  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
            Ready to Start Watching?
          </h2>
          <p className="text-muted-foreground text-base mb-8 max-w-md mx-auto">
            Join thousands enjoying synchronized watch parties with friends and family.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <Button
              size="lg"
              onClick={() => navigate('/movies')}
              className="group"
            >
              <Play className="mr-2 w-4 h-4" />
              Browse Movies
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/pricing')}
              className="group"
            >
              Get Started Free
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-muted-foreground text-xs">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Free plan available
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Cancel anytime
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
