import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, ArrowRight, Monitor, Tablet, Smartphone, Palette, Type, Eye, Rocket } from 'lucide-react';

const Preview = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('');
  const [resumeData, setResumeData] = useState<any>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedColorScheme, setSelectedColorScheme] = useState<string>('default');
  const navigate = useNavigate();

  const colorSchemes = {
    'professional-executive': [
      { id: 'default', name: 'Corporate Blue', primary: '#1e3a8a', secondary: '#3b82f6' },
      { id: 'elegant', name: 'Elegant Navy', primary: '#1e1b4b', secondary: '#6366f1' },
      { id: 'modern', name: 'Modern Teal', primary: '#134e4a', secondary: '#14b8a6' }
    ],
    'creative-portfolio': [
      { id: 'default', name: 'Creative Purple', primary: '#7c3aed', secondary: '#ec4899' },
      { id: 'vibrant', name: 'Vibrant Orange', primary: '#ea580c', secondary: '#f59e0b' },
      { id: 'artistic', name: 'Artistic Green', primary: '#16a34a', secondary: '#84cc16' }
    ],
    'minimal-modern': [
      { id: 'default', name: 'Golden Elegance', primary: '#f59e0b', secondary: '#fbbf24' },
      { id: 'monochrome', name: 'Pure Monochrome', primary: '#374151', secondary: '#6b7280' },
      { id: 'rose', name: 'Rose Gold', primary: '#e11d48', secondary: '#f43f5e' }
    ]
  };

  useEffect(() => {
    // Check if user has selected template and parsed data
    const template = localStorage.getItem('resume2website_selected_template');
    const parsedData = localStorage.getItem('resume2website_parsed_data');
    
    if (!template || !parsedData) {
      navigate('/templates');
      return;
    }
    
    try {
      setSelectedTemplate(template);
      setResumeData(JSON.parse(parsedData));
    } catch (error) {
      console.error('Error loading data:', error);
      navigate('/templates');
    }
  }, [navigate]);

  const handleDeploy = () => {
    // Store customization settings
    const customizations = {
      template: selectedTemplate,
      colorScheme: selectedColorScheme,
      deployedAt: new Date().toISOString()
    };
    
    localStorage.setItem('resume2website_customizations', JSON.stringify(customizations));
    navigate('/success');
  };

  const getDeviceClass = () => {
    switch (previewDevice) {
      case 'tablet': return 'w-[768px] h-[1024px]';
      case 'mobile': return 'w-[375px] h-[667px]';
      default: return 'w-full h-[800px]';
    }
  };

  if (!resumeData || !selectedTemplate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const currentColorSchemes = colorSchemes[selectedTemplate as keyof typeof colorSchemes] || colorSchemes['professional-executive'];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/templates" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Templates
            </Link>
            
            <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Resume2Website
            </Link>
            
            <div className="text-sm text-muted-foreground">
              Preview & Customize
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
              
              <div className="w-16 h-px bg-success"></div>
              
              {/* Step 3: Template */}
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center font-semibold">
                  ✓
                </div>
                <span className="ml-2 text-success font-medium">Template</span>
              </div>
              
              <div className="w-16 h-px bg-primary"></div>
              
              {/* Step 4: Deploy */}
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  4
                </div>
                <span className="ml-2 font-medium">Deploy</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Customization Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Template Info */}
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Preview Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Device Preview */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Device Preview</label>
                  <div className="flex gap-2">
                    <Button
                      variant={previewDevice === 'desktop' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreviewDevice('desktop')}
                    >
                      <Monitor className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={previewDevice === 'tablet' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreviewDevice('tablet')}
                    >
                      <Tablet className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={previewDevice === 'mobile' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setPreviewDevice('mobile')}
                    >
                      <Smartphone className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Color Schemes */}
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Color Schemes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentColorSchemes.map((scheme) => (
                  <div
                    key={scheme.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      selectedColorScheme === scheme.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedColorScheme(scheme.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">{scheme.name}</div>
                        <div className="flex gap-2 mt-1">
                          <div 
                            className="w-4 h-4 rounded-full border" 
                            style={{ backgroundColor: scheme.primary }}
                          ></div>
                          <div 
                            className="w-4 h-4 rounded-full border" 
                            style={{ backgroundColor: scheme.secondary }}
                          ></div>
                        </div>
                      </div>
                      {selectedColorScheme === scheme.id && (
                        <div className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs">
                          ✓
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Website Info */}
            <Card className="card-elegant">
              <CardHeader>
                <CardTitle>Website Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Template</label>
                  <p className="font-medium capitalize">{selectedTemplate.replace('-', ' ')}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Domain</label>
                  <p className="font-medium text-primary">
                    {resumeData.personalInfo.name.toLowerCase().replace(' ', '-')}.resume2website.com
                  </p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Status</label>
                  <Badge className="ml-2">Ready to Deploy</Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Preview Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3"
          >
            <Card className="card-elegant">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Website Preview</h2>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      Live Preview
                    </Badge>
                    <Button onClick={handleDeploy} className="btn-primary">
                      <Rocket className="h-4 w-4 mr-2" />
                      Deploy Website
                    </Button>
                  </div>
                </div>

                {/* Preview Container */}
                <div className="bg-muted/30 rounded-lg p-8 flex items-center justify-center min-h-[600px]">
                  <div className={`${getDeviceClass()} bg-background rounded-lg shadow-large overflow-hidden transition-all duration-300`}>
                    {/* Mock Website Content */}
                    <div className="h-full overflow-y-auto">
                      {selectedTemplate === 'professional-executive' && (
                        <div className="grid grid-cols-3 h-full">
                          {/* Sidebar */}
                          <div className="bg-blue-900 text-white p-6">
                            <div className="w-24 h-24 rounded-full bg-blue-700 mb-4 mx-auto"></div>
                            <h3 className="text-center font-bold text-lg">{resumeData.personalInfo.name}</h3>
                            <p className="text-center text-blue-200 text-sm mb-6">{resumeData.personalInfo.title}</p>
                            
                            <div className="space-y-3">
                              <div>
                                <h4 className="text-blue-200 text-xs font-semibold mb-1">CONTACT</h4>
                                <p className="text-xs">{resumeData.personalInfo.email}</p>
                                <p className="text-xs">{resumeData.personalInfo.phone}</p>
                              </div>
                              
                              <div>
                                <h4 className="text-blue-200 text-xs font-semibold mb-1">SKILLS</h4>
                                {resumeData.skills[0]?.items.slice(0, 3).map((skill: string, i: number) => (
                                  <div key={i} className="mb-1">
                                    <p className="text-xs">{skill}</p>
                                    <div className="w-full bg-blue-800 rounded-full h-1">
                                      <div className="bg-blue-300 h-1 rounded-full" style={{width: `${90 - i * 10}%`}}></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          {/* Main Content */}
                          <div className="col-span-2 p-6">
                            <div className="mb-6">
                              <h2 className="text-2xl font-bold mb-2">{resumeData.personalInfo.name}</h2>
                              <p className="text-blue-600 font-semibold">{resumeData.personalInfo.title}</p>
                              <p className="text-sm text-gray-600 mt-2">{resumeData.personalInfo.summary}</p>
                            </div>
                            
                            <div className="space-y-4">
                              <div>
                                <h3 className="text-lg font-semibold text-blue-900 mb-2">Experience</h3>
                                {resumeData.workExperience.slice(0, 2).map((exp: any, i: number) => (
                                  <div key={i} className="mb-3 pb-3 border-b border-gray-200 last:border-b-0">
                                    <div className="flex justify-between items-start mb-1">
                                      <h4 className="font-medium">{exp.position}</h4>
                                      <span className="text-xs text-gray-500">{exp.duration}</span>
                                    </div>
                                    <p className="text-sm text-blue-600">{exp.company}</p>
                                    <p className="text-xs text-gray-600 mt-1">{exp.description.substring(0, 100)}...</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedTemplate === 'creative-portfolio' && (
                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 h-full">
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 text-center">
                            <div className="w-32 h-32 rounded-full bg-white/20 mx-auto mb-4"></div>
                            <h1 className="text-3xl font-bold">{resumeData.personalInfo.name}</h1>
                            <p className="text-xl text-purple-100">{resumeData.personalInfo.title}</p>
                          </div>
                          
                          <div className="p-8">
                            <div className="grid grid-cols-2 gap-6">
                              <div className="bg-white rounded-xl p-6 shadow-soft">
                                <h3 className="font-bold text-purple-600 mb-3">About Me</h3>
                                <p className="text-sm text-gray-600">{resumeData.personalInfo.summary}</p>
                              </div>
                              
                              <div className="bg-white rounded-xl p-6 shadow-soft">
                                <h3 className="font-bold text-pink-600 mb-3">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                  {resumeData.skills[0]?.items.slice(0, 6).map((skill: string, i: number) => (
                                    <span key={i} className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedTemplate === 'minimal-modern' && (
                        <div className="bg-white h-full p-8">
                          <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-12">
                              <h1 className="text-4xl font-light mb-2">{resumeData.personalInfo.name}</h1>
                              <div className="w-24 h-px bg-yellow-500 mx-auto mb-4"></div>
                              <p className="text-xl text-gray-600">{resumeData.personalInfo.title}</p>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                              <div>
                                <h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">Experience</h2>
                                {resumeData.workExperience.slice(0, 2).map((exp: any, i: number) => (
                                  <div key={i} className="mb-6">
                                    <div className="bg-gray-50 p-4 rounded">
                                      <h3 className="font-medium">{exp.position}</h3>
                                      <p className="text-gray-600 text-sm">{exp.company} • {exp.duration}</p>
                                      <p className="text-xs text-gray-500 mt-2">{exp.description.substring(0, 80)}...</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              
                              <div>
                                <h2 className="text-2xl font-light mb-6 pb-2 border-b border-gray-200">Skills</h2>
                                <div className="space-y-3">
                                  {resumeData.skills[0]?.items.slice(0, 5).map((skill: string, i: number) => (
                                    <div key={i} className="flex justify-between items-center">
                                      <span className="text-sm">{skill}</span>
                                      <div className="w-20 bg-gray-200 rounded-full h-1">
                                        <div className="bg-yellow-500 h-1 rounded-full" style={{width: `${90 - i * 5}%`}}></div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Preview;