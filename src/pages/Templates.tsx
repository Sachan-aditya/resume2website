import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, Eye, Palette, Layout, Zap } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  color: string;
  preview: string;
  features: string[];
  popular?: boolean;
}

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [resumeData, setResumeData] = useState<any>(null);
  const navigate = useNavigate();

  const templates: Template[] = [
    {
      id: 'professional-executive',
      name: 'Professional Executive',
      description: 'Clean corporate design perfect for executives and business professionals',
      category: 'Business',
      color: 'Blue',
      preview: 'Clean sidebar layout with professional typography',
      features: [
        'Sidebar navigation with profile photo',
        'Timeline layout for experience',
        'Skills displayed as progress bars',
        'Download resume button',
        'Contact information sidebar',
        'Professional color scheme'
      ],
      popular: true
    },
    {
      id: 'creative-portfolio',
      name: 'Creative Portfolio',
      description: 'Colorful, artistic design that showcases creativity and personality',
      category: 'Creative',
      color: 'Purple & Pink',
      preview: 'Grid-based portfolio with vibrant gradients',
      features: [
        'Grid-based portfolio layout',
        'Creative typography and animations',
        'Image galleries for projects',
        'Social media integration',
        'Animated hover effects',
        'Gradient color scheme'
      ]
    },
    {
      id: 'minimal-modern',
      name: 'Minimal Modern',
      description: 'Ultra-clean design focusing on typography and white space',
      category: 'Minimal',
      color: 'Gold & White',
      preview: 'Typography-focused with elegant spacing',
      features: [
        'Typography-focused layout',
        'Card-based information display',
        'Geometric shapes and spacing',
        'Professional photography areas',
        'Subtle shadows and clean lines',
        'Minimalist aesthetic'
      ],
      popular: true
    }
  ];

  useEffect(() => {
    // Check if user has parsed resume data
    const parsedData = localStorage.getItem('resume2website_parsed_data');
    if (!parsedData) {
      navigate('/upload');
      return;
    }
    
    try {
      setResumeData(JSON.parse(parsedData));
    } catch (error) {
      console.error('Error parsing resume data:', error);
      navigate('/upload');
    }
  }, [navigate]);

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (!selectedTemplate) return;
    
    // Store selected template
    localStorage.setItem('resume2website_selected_template', selectedTemplate);
    navigate('/preview');
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
            <Link to="/processing" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Processing
            </Link>
            
            <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Resume2Website
            </Link>
            
            <div className="text-sm text-muted-foreground">
              Choose Template
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-4">
              {/* Step 1: Upload */}
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center font-semibold">
                  ✓
                </div>
                <span className="ml-2 text-success font-medium">Upload</span>
              </div>
              
              <div className="w-16 h-px bg-success"></div>
              
              {/* Step 2: Process */}
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center font-semibold">
                  ✓
                </div>
                <span className="ml-2 text-success font-medium">Process</span>
              </div>
              
              <div className="w-16 h-px bg-primary"></div>
              
              {/* Step 3: Template */}
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  3
                </div>
                <span className="ml-2 font-medium">Template</span>
              </div>
              
              <div className="w-16 h-px bg-muted"></div>
              
              {/* Step 4: Deploy */}
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold">
                  4
                </div>
                <span className="ml-2 text-muted-foreground">Deploy</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4">Choose Your Template</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select a professional template that best represents your style. 
            Your resume data will be automatically populated into the design.
          </p>
        </motion.div>

        {/* Resume Preview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl mx-auto mb-8"
        >
          <Card className="card-elegant">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Extracted Information Preview
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">PERSONAL INFO</h4>
                  <div className="space-y-1">
                    <p className="font-semibold">{resumeData.personalInfo.name}</p>
                    <p className="text-muted-foreground">{resumeData.personalInfo.title}</p>
                    <p className="text-sm text-muted-foreground">{resumeData.personalInfo.email}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-2">WORK EXPERIENCE</h4>
                  <div className="space-y-1">
                    <p className="font-medium">{resumeData.workExperience[0]?.position}</p>
                    <p className="text-sm text-muted-foreground">{resumeData.workExperience[0]?.company}</p>
                    <p className="text-xs text-muted-foreground">+ {resumeData.workExperience.length - 1} more positions</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Templates Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid lg:grid-cols-3 gap-8 mb-8"
        >
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card 
                className={`card-elegant cursor-pointer transition-all hover:scale-[1.02] ${
                  selectedTemplate === template.id 
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                    : ''
                }`}
                onClick={() => handleSelectTemplate(template.id)}
              >
                <CardContent className="p-6">
                  {/* Template Preview */}
                  <div className="aspect-[3/4] bg-gradient-subtle rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                    {/* Mock Template Preview */}
                    {template.id === 'professional-executive' && (
                      <div className="w-full h-full bg-blue-50 relative">
                        <div className="absolute left-4 top-4 w-16 h-16 rounded-full bg-blue-200"></div>
                        <div className="absolute left-4 top-24 space-y-1">
                          <div className="w-20 h-2 bg-blue-300 rounded"></div>
                          <div className="w-16 h-1 bg-blue-200 rounded"></div>
                        </div>
                        <div className="absolute right-4 top-4 space-y-2">
                          <div className="w-32 h-2 bg-gray-300 rounded"></div>
                          <div className="w-24 h-1 bg-gray-200 rounded"></div>
                          <div className="w-28 h-1 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    )}
                    
                    {template.id === 'creative-portfolio' && (
                      <div className="w-full h-full bg-gradient-to-br from-purple-100 to-pink-100 relative">
                        <div className="absolute inset-4 grid grid-cols-2 gap-2">
                          <div className="bg-purple-200 rounded"></div>
                          <div className="bg-pink-200 rounded"></div>
                          <div className="col-span-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded h-8"></div>
                        </div>
                      </div>
                    )}
                    
                    {template.id === 'minimal-modern' && (
                      <div className="w-full h-full bg-white relative">
                        <div className="absolute inset-4">
                          <div className="w-full h-3 bg-yellow-200 rounded mb-4"></div>
                          <div className="space-y-2">
                            <div className="w-3/4 h-1 bg-gray-200 rounded"></div>
                            <div className="w-1/2 h-1 bg-gray-100 rounded"></div>
                            <div className="w-5/6 h-1 bg-gray-100 rounded"></div>
                          </div>
                          <div className="mt-4 grid grid-cols-2 gap-2">
                            <div className="h-12 bg-gray-50 rounded border"></div>
                            <div className="h-12 bg-gray-50 rounded border"></div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Popular Badge */}
                    {template.popular && (
                      <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                        <Zap className="h-3 w-3 mr-1" />
                        Popular
                      </Badge>
                    )}

                    {/* Selection Indicator */}
                    {selectedTemplate === template.id && (
                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                          ✓
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Template Info */}
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">{template.name}</h3>
                        <Badge variant="outline">{template.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Palette className="h-4 w-4" />
                        {template.color}
                      </div>
                      <div className="flex items-center gap-1">
                        <Layout className="h-4 w-4" />
                        {template.preview}
                      </div>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="text-sm font-medium mb-2">Features:</h4>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {template.features.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-center gap-1">
                            <div className="w-1 h-1 bg-primary rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                        {template.features.length > 3 && (
                          <li className="text-primary">+{template.features.length - 3} more features</li>
                        )}
                      </ul>
                    </div>

                    {/* Select Button */}
                    <Button 
                      variant={selectedTemplate === template.id ? "default" : "outline"}
                      className="w-full"
                      onClick={() => handleSelectTemplate(template.id)}
                    >
                      {selectedTemplate === template.id ? 'Selected' : 'Select Template'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Continue Button */}
        {selectedTemplate && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Button 
              onClick={handleContinue}
              size="lg" 
              className="btn-primary text-lg px-8"
            >
              Continue to Preview
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Templates;