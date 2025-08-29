import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Crown, Zap } from 'lucide-react';

interface PricingCardsProps {
  onSelectPlan: (plan: 'basic' | 'pro' | 'enterprise') => void;
}

const PricingCards: React.FC<PricingCardsProps> = ({ onSelectPlan }) => {
  const plans = [
    {
      id: 'basic' as const,
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for getting started',
      icon: <Zap className="h-6 w-6" />,
      features: [
        '1 website',
        'Basic templates',
        'PDF export',
        'Community support'
      ],
      buttonText: 'Get Started Free',
      buttonVariant: 'outline' as const,
      popular: false
    },
    {
      id: 'pro' as const,
      name: 'Pro',
      price: '$9/month',
      description: 'Best for professionals',
      icon: <Star className="h-6 w-6" />,
      features: [
        '5 websites',
        'Premium templates',
        'Custom domain',
        'Analytics dashboard',
        'Priority support',
        'Advanced customization'
      ],
      buttonText: 'Start Pro Trial',
      buttonVariant: 'default' as const,
      popular: true
    },
    {
      id: 'enterprise' as const,
      name: 'Enterprise',
      price: '$29/month',
      description: 'For teams and agencies',
      icon: <Crown className="h-6 w-6" />,
      features: [
        'Unlimited websites',
        'All templates',
        'Team collaboration',
        'White-label solution',
        'API access',
        'Dedicated support',
        'Custom integrations'
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'secondary' as const,
      popular: false
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {plans.map((plan, index) => (
        <motion.div
          key={plan.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="relative"
        >
          {plan.popular && (
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white px-4 py-1 z-10">
              Most Popular
            </Badge>
          )}
          
          <Card className={`h-full transition-all duration-300 hover:shadow-large ${
            plan.popular ? 'ring-2 ring-primary scale-105' : ''
          }`}>
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className={`p-3 rounded-full ${
                  plan.popular ? 'bg-primary text-primary-foreground' : 'bg-muted'
                }`}>
                  {plan.icon}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold">{plan.name}</h3>
              <div className="text-3xl font-bold text-primary mb-2">{plan.price}</div>
              <p className="text-muted-foreground">{plan.description}</p>
            </CardHeader>
            
            <CardContent className="pt-0">
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-success flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button
                onClick={() => onSelectPlan(plan.id)}
                variant={plan.buttonVariant}
                className="w-full"
                size="lg"
              >
                {plan.buttonText}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default PricingCards;