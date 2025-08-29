import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, Star, Zap, Crown } from 'lucide-react';

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'Free',
      description: 'Perfect for getting started',
      features: [
        'Create 1 website',
        'Basic templates',
        'PDF resume upload',
        'Standard customization',
        'Basic analytics'
      ],
      icon: <Star className="h-6 w-6" />,
      buttonText: 'Start Free',
      popular: false
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9/month',
      description: 'Best for professionals',
      features: [
        'Create unlimited websites',
        'Premium templates',
        'PDF & DOCX support',
        'Advanced customization',
        'Priority support',
        'Custom domain',
        'Advanced analytics',
        'SEO optimization'
      ],
      icon: <Zap className="h-6 w-6" />,
      buttonText: 'Go Pro',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$29/month',
      description: 'For teams and businesses',
      features: [
        'Everything in Pro',
        'Team collaboration',
        'White-label branding',
        'API access',
        'Dedicated support',
        'Custom integrations',
        'Advanced security',
        'Priority processing'
      ],
      icon: <Crown className="h-6 w-6" />,
      buttonText: 'Contact Sales',
      popular: false
    }
  ];

  const handlePlanSelect = (planId: string) => {
    // Store selected plan
    localStorage.setItem('resume2website_selected_plan', planId);
    
    // Navigate to processing or payment flow
    if (planId === 'basic') {
      navigate('/processing');
    } else {
      // For pro/enterprise, you would typically redirect to payment
      // For now, we'll simulate payment success and proceed
      setTimeout(() => {
        navigate('/processing');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/upload" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Upload
            </Link>
            
            <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Resume2Website
            </Link>
            
            <div className="text-sm text-muted-foreground">
              Choose Plan
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the perfect plan to transform your resume into a stunning website
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 z-10">
                  Most Popular
                </Badge>
              )}
              
              <Card className={`card-elegant h-full ${plan.popular ? 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-105' : ''}`}>
                <CardHeader className="text-center pb-4">
                  <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center ${
                    plan.popular ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                  }`}>
                    {plan.icon}
                  </div>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary mb-2">{plan.price}</div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="flex flex-col h-full">
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-success flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    onClick={() => handlePlanSelect(plan.id)}
                    variant={plan.popular ? "default" : "outline"}
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

        {/* FAQ Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            <div>
              <h4 className="font-semibold mb-2">Can I upgrade or downgrade anytime?</h4>
              <p className="text-muted-foreground text-sm">Yes, you can change your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Is there a free trial?</h4>
              <p className="text-muted-foreground text-sm">The Basic plan is completely free forever. Pro and Enterprise plans offer a 14-day free trial.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">What payment methods do you accept?</h4>
              <p className="text-muted-foreground text-sm">We accept all major credit cards, PayPal, and wire transfers for Enterprise customers.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Do you offer refunds?</h4>
              <p className="text-muted-foreground text-sm">Yes, we offer a 30-day money-back guarantee for all paid plans.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;