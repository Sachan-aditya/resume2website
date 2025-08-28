import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { 
  CheckCircle, 
  ExternalLink, 
  Copy, 
  Download,
  Share2,
  BarChart3,
  Plus,
  Twitter,
  Linkedin,
  Facebook,
  QrCode
} from 'lucide-react';

const Success = () => {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [resumeData, setResumeData] = useState<any>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user completed the flow
    const customizations = localStorage.getItem('resume2website_customizations');
    const parsedData = localStorage.getItem('resume2website_parsed_data');
    
    if (!customizations || !parsedData) {
      navigate('/dashboard');
      return;
    }
    
    try {
      const customData = JSON.parse(customizations);
      const userData = JSON.parse(parsedData);
      
      setResumeData(userData);
      setSelectedTemplate(customData.template);
      
      // Generate website URL
      const urlName = userData.personalInfo.name.toLowerCase().replace(/\s+/g, '-');
      setWebsiteUrl(`${urlName}.resume2website.com`);
      
      // Save website to user's collection
      const existingWebsites = JSON.parse(localStorage.getItem('user_websites') || '[]');
      const newWebsite = {
        id: Date.now().toString(),
        name: `${userData.personalInfo.name} - ${userData.personalInfo.title}`,
        url: `${urlName}.resume2website.com`,
        template: customData.template,
        status: 'live',
        createdAt: new Date().toISOString(),
        views: Math.floor(Math.random() * 50) + 10 // Mock initial views
      };
      
      existingWebsites.push(newWebsite);
      localStorage.setItem('user_websites', JSON.stringify(existingWebsites));
      
    } catch (error) {
      console.error('Error loading success data:', error);
      navigate('/dashboard');
    }
  }, [navigate]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('URL copied to clipboard!');
    } catch (error) {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      toast.success('URL copied to clipboard!');
    }
  };

  const shareOnSocial = (platform: string) => {
    const url = `https://${websiteUrl}`;
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

  if (!resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Resume2Website
            </Link>
            
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="outline">Back to Dashboard</Button>
              </Link>
              <div className="text-sm text-muted-foreground">
                {user?.name}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Success Animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-success text-success-foreground mb-6">
            <CheckCircle className="h-12 w-12" />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">
              🎉 Congratulations!
            </h1>
            <p className="text-xl lg:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Your professional website is now live and ready to impress employers!
            </p>
          </motion.div>
        </motion.div>

        <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Website Details */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Website URL */}
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5" />
                  Your Website is Live!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground mb-1">Website URL</p>
                      <p className="font-mono text-lg font-semibold text-primary break-all">
                        {websiteUrl}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(`https://${websiteUrl}`)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(`https://${websiteUrl}`, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge className="bg-success text-success-foreground mt-1">
                      Live & Active
                    </Badge>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded-lg">
                    <p className="text-sm text-muted-foreground">Template</p>
                    <p className="font-medium capitalize mt-1">
                      {selectedTemplate.replace('-', ' ')}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* QR Code */}
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="h-5 w-5" />
                  Mobile Sharing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="w-32 h-32 bg-muted rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <QrCode className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Scan to share your website on mobile devices
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Analytics Preview */}
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Analytics Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">0</p>
                    <p className="text-sm text-muted-foreground">Total Views</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-secondary">0</p>
                    <p className="text-sm text-muted-foreground">This Week</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-warning">0</p>
                    <p className="text-sm text-muted-foreground">Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Actions */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-6"
          >
            {/* Share Your Website */}
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  Share Your Website
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Let the world know about your new professional website!
                </p>
                
                <div className="grid grid-cols-3 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => shareOnSocial('linkedin')}
                    className="flex flex-col gap-2 h-16"
                  >
                    <Linkedin className="h-5 w-5" />
                    <span className="text-xs">LinkedIn</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => shareOnSocial('twitter')}
                    className="flex flex-col gap-2 h-16"
                  >
                    <Twitter className="h-5 w-5" />
                    <span className="text-xs">Twitter</span>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => shareOnSocial('facebook')}
                    className="flex flex-col gap-2 h-16"
                  >
                    <Facebook className="h-5 w-5" />
                    <span className="text-xs">Facebook</span>
                  </Button>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => copyToClipboard(`Check out my professional website: https://${websiteUrl}`)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Sharing Message
                </Button>
              </CardContent>
            </Card>

            {/* Additional Options */}
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle>Additional Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={downloadHTML}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download HTML Package
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/preview')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Analytics Dashboard
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/preview')}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Customize Further
                </Button>
              </CardContent>
            </Card>

            {/* Create Another Website */}
            <Card className="card-elegant gradient-primary text-white">
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold mb-2">Create Another Website?</h3>
                <p className="text-white/90 mb-4">
                  Build websites for different roles or update your existing one
                </p>
                <Link to="/upload">
                  <Button size="lg" variant="secondary">
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Website
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Next Steps */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <Card className="card-elegant max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">What's Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Share2 className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Share Your Website</h4>
                  <p className="text-sm text-muted-foreground">
                    Add your new URL to your email signature, LinkedIn profile, and job applications
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                    <BarChart3 className="h-6 w-6 text-secondary" />
                  </div>
                  <h4 className="font-semibold mb-2">Monitor Performance</h4>
                  <p className="text-sm text-muted-foreground">
                    Track visitors and engagement to optimize your professional presence
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-3">
                    <Plus className="h-6 w-6 text-warning" />
                  </div>
                  <h4 className="font-semibold mb-2">Keep Building</h4>
                  <p className="text-sm text-muted-foreground">
                    Create specialized websites for different roles or industries
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Success;