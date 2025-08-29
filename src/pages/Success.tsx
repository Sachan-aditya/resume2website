import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle, 
  ExternalLink, 
  Share2, 
  Download, 
  Copy,
  Twitter,
  Linkedin,
  Facebook,
  QrCode,
  BarChart3,
  Sparkles,
  Trophy,
  Zap,
  Plus
} from 'lucide-react';
import toast from 'react-hot-toast';

const Success = () => {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data and generate website URL
    const user = JSON.parse(localStorage.getItem('resume2website_user') || '{}');
    setUserData(user);
    
    // Generate a mock website URL
    const username = user.name?.toLowerCase().replace(/\s+/g, '') || 'user';
    setWebsiteUrl(`https://${username}.resume2website.com`);
    
    // Trigger celebration animation after a short delay
    setTimeout(() => {
      setShowCelebration(true);
    }, 500);
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('URL copied to clipboard!');
    } catch (error) {
      toast.success('URL copied to clipboard!');
    }
  };

  const shareOnSocial = (platform: string) => {
    const url = websiteUrl;
    const text = `Check out my new professional website: ${url}`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const downloadHTML = () => {
    // Mock download functionality
    toast.success('Website HTML package will be ready for download shortly!');
  };

  if (!userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle relative overflow-hidden">
      {/* Celebration Elements */}
      {showCelebration && (
        <>
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary"
              initial={{ 
                x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
                y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
                scale: 0 
              }}
              animate={{ 
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                y: typeof window !== 'undefined' ? Math.random() * window.innerHeight : 0,
                scale: [0, 1, 0]
              }}
              transition={{ 
                duration: 2,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            />
          ))}
          
          {/* Confetti burst */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`confetti-${i}`}
              className="absolute w-3 h-3 rounded-full"
              style={{ 
                backgroundColor: ['#2563EB', '#3B82F6', '#60A5FA', '#DBEAFE'][i % 4]
              }}
              initial={{ 
                x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, 
                y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
                rotate: 0
              }}
              animate={{ 
                x: typeof window !== 'undefined' ? window.innerWidth / 2 + (Math.random() - 0.5) * 800 : 0,
                y: typeof window !== 'undefined' ? window.innerHeight / 2 + (Math.random() - 0.5) * 600 : 0,
                rotate: 360
              }}
              transition={{ 
                duration: 3,
                delay: i * 0.05,
                ease: "easeOut"
              }}
            />
          ))}
        </>
      )}

      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm relative z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Resume2Website
            </Link>
            
            <Button 
              onClick={() => navigate('/dashboard')}
              variant="outline"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Success Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ 
              delay: 0.3, 
              type: "spring", 
              stiffness: 200,
              damping: 10
            }}
            className="relative mx-auto mb-6"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center">
              <Trophy className="h-12 w-12 text-white" />
            </div>
            
            {/* Sparkle effects */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0"
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${angle}deg) translateY(-40px)`,
                  }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                >
                  <Sparkles className="h-2 w-2 text-primary" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent"
          >
            🎉 Website Deployed!
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Your professional website is now live and ready to impress. Share it with the world and watch your career soar!
          </motion.p>
        </motion.div>

        {/* Website URL Display */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <Card className="card-elegant text-center">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4 flex items-center justify-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                Your Website is Live!
              </h3>
              
              <div className="bg-primary/5 rounded-lg p-6 mb-6">
                <p className="text-sm text-muted-foreground mb-2">Website URL</p>
                <p className="text-2xl font-bold text-primary break-all mb-4">{websiteUrl}</p>
                
                <div className="flex gap-3 justify-center">
                  <Button 
                    onClick={() => copyToClipboard(websiteUrl)}
                    variant="outline"
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Copy URL
                  </Button>
                  <Button 
                    onClick={() => window.open(websiteUrl, '_blank')}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </Button>
                </div>
              </div>
              
              {/* Social Sharing */}
              <div>
                <h4 className="font-semibold mb-3">Share Your Success</h4>
                <div className="flex gap-3 justify-center">
                  <Button variant="outline" size="sm" onClick={() => shareOnSocial('linkedin')}>
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => shareOnSocial('twitter')}>
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => shareOnSocial('facebook')}>
                    <Facebook className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Next Steps */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6"
        >
          <Card className="card-elegant text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Share2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Share Your Website</h3>
              <p className="text-sm text-muted-foreground">
                Add your URL to your email signature, LinkedIn profile, and job applications
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-elegant text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Monitor Performance</h3>
              <p className="text-sm text-muted-foreground">
                Track visitors and engagement to optimize your professional presence
              </p>
            </CardContent>
          </Card>
          
          <Card className="card-elegant text-center">
            <CardContent className="p-6">
              <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-4">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Keep Building</h3>
              <p className="text-sm text-muted-foreground">
                Create specialized websites for different roles or industries
              </p>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Create Another Website */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
          className="text-center mt-12"
        >
          <Button 
            onClick={() => navigate('/upload')}
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-lg px-8"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create Another Website
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Success;