import { motion } from 'framer-motion';
import { Check, Star, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for casual movie watchers',
    icon: Star,
    features: [
      'Join public movie rooms',
      'Chat with other viewers',
      'Basic movie search',
      'Standard video quality',
      'Mobile app access'
    ],
    buttonText: 'Get Started',
    variant: 'outline' as const,
    popular: false
  },
  {
    name: 'Premium',
    price: '$9.99',
    period: 'per month',
    description: 'For movie enthusiasts who want more',
    icon: Crown,
    features: [
      'Create private movie rooms',
      'Invite up to 10 friends',
      'HD video quality',
      'Advanced chat features',
      'Movie recommendations',
      'Skip ads',
      'Priority support'
    ],
    buttonText: 'Start Free Trial',
    variant: 'hero' as const,
    popular: true
  },
  {
    name: 'Cinema Club',
    price: '$19.99',
    period: 'per month',
    description: 'Ultimate experience for movie clubs',
    icon: Zap,
    features: [
      'Unlimited private rooms',
      'Invite unlimited friends',
      '4K video quality',
      'Screen sharing',
      'Voice chat',
      'Custom room themes',
      'Analytics dashboard',
      'Premium support',
      'Early access to features'
    ],
    buttonText: 'Go Premium',
    variant: 'premium' as const,
    popular: false
  }
];

export default function Pricing() {
  const handleSubscribe = (planName: string) => {
    console.log(`Subscribing to ${planName} plan`);
    // In a real app, this would redirect to payment processing
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-primary-glow/10 pt-20 pb-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent mb-6">
              Choose Your Plan
            </h1>
            <p className="text-xl text-muted-foreground">
              Find the perfect plan for your movie watching experience. Start free and upgrade anytime.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-6 -mt-8">
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <Card className={`h-full ${plan.popular ? 'border-primary shadow-lg shadow-primary/20 scale-105' : 'border-border/50'} bg-card/80 backdrop-blur`}>
                  <CardHeader className="text-center pb-8">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-primary">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center">
                          <Check className="w-5 h-5 text-primary mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      variant={plan.variant}
                      size="lg"
                      className="w-full"
                      onClick={() => handleSubscribe(plan.name)}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
          <div className="grid gap-6 text-left">
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
                <p className="text-muted-foreground">Yes, you can cancel your subscription at any time. Your access will continue until the end of your current billing period.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-muted-foreground">Premium plans come with a 7-day free trial. No credit card required to start.</p>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border/50">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">We accept all major credit cards, PayPal, and bank transfers.</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}