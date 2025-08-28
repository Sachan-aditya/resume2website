import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, FileSearch, User, Briefcase, Award, Lightbulb, Palette } from 'lucide-react';

const Processing = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const processingSteps = [
    {
      icon: FileSearch,
      title: 'Reading your resume...',
      description: 'Analyzing document structure and extracting text content'
    },
    {
      icon: User,
      title: 'Extracting personal information...',
      description: 'Identifying contact details and professional summary'
    },
    {
      icon: Briefcase,
      title: 'Analyzing work experience...',
      description: 'Processing job titles, companies, and achievements'
    },
    {
      icon: Award,
      title: 'Identifying skills and education...',
      description: 'Categorizing technical skills and educational background'
    },
    {
      icon: Lightbulb,
      title: 'Optimizing content structure...',
      description: 'Organizing information for maximum impact'
    },
    {
      icon: Palette,
      title: 'Preparing website templates...',
      description: 'Getting everything ready for template selection'
    }
  ];

  useEffect(() => {
    // Check if user came from upload page
    const uploadedFile = localStorage.getItem('resume2website_uploaded_file');
    if (!uploadedFile) {
      navigate('/upload');
      return;
    }

    const duration = 8000; // 8 seconds total
    const stepDuration = duration / processingSteps.length;
    
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + (100 / (duration / 100));
        
        // Update current step based on progress
        const step = Math.floor((newProgress / 100) * processingSteps.length);
        setCurrentStep(Math.min(step, processingSteps.length - 1));
        
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Generate mock resume data and store it
          const mockResumeData = {
            personalInfo: {
              name: "Sarah Johnson",
              title: "Digital Marketing Manager",
              email: "sarah.johnson@email.com",
              phone: "+1 (555) 123-4567",
              location: "San Francisco, CA",
              linkedin: "linkedin.com/in/sarahjohnson",
              website: "sarahjohnson.dev",
              summary: "Experienced digital marketing professional with 5+ years of expertise in developing and executing data-driven marketing strategies. Proven track record of increasing brand awareness, driving customer acquisition, and optimizing conversion rates across multiple channels."
            },
            workExperience: [
              {
                company: "TechCorp Inc.",
                position: "Senior Marketing Manager",
                duration: "2021 - Present",
                location: "San Francisco, CA",
                description: "Led digital marketing campaigns resulting in 40% increase in qualified leads. Managed cross-functional team of 5 marketing professionals and $2M annual marketing budget. Implemented marketing automation workflows that improved lead nurturing by 60%.",
                achievements: [
                  "Increased organic traffic by 150% through SEO optimization",
                  "Launched successful product campaigns with 25% higher ROI",
                  "Reduced customer acquisition cost by 30%"
                ]
              },
              {
                company: "StartupXYZ",
                position: "Digital Marketing Specialist",
                duration: "2019 - 2021",
                location: "San Francisco, CA",
                description: "Developed and executed comprehensive digital marketing strategies for B2B SaaS products. Managed social media presence across 5 platforms and grew follower base by 300%.",
                achievements: [
                  "Created content marketing strategy that generated 200+ MQLs monthly",
                  "Optimized PPC campaigns with 45% improvement in conversion rates",
                  "Built email marketing sequences with 35% open rates"
                ]
              },
              {
                company: "Marketing Agency Pro",
                position: "Marketing Coordinator",
                duration: "2018 - 2019",
                location: "San Francisco, CA",
                description: "Supported marketing campaigns for 15+ clients across various industries. Assisted in campaign planning, execution, and performance analysis.",
                achievements: [
                  "Managed client relationships and maintained 95% retention rate",
                  "Created marketing materials that increased brand engagement by 25%"
                ]
              }
            ],
            education: [
              {
                institution: "University of California, Berkeley",
                degree: "Bachelor of Arts in Marketing",
                year: "2018",
                gpa: "3.8",
                relevant: "Relevant Coursework: Digital Marketing, Consumer Behavior, Marketing Analytics, Brand Management"
              }
            ],
            skills: [
              {
                category: "Digital Marketing",
                items: ["SEO/SEM", "Google Analytics", "Google Ads", "Facebook Ads", "Content Marketing"]
              },
              {
                category: "Marketing Automation",
                items: ["HubSpot", "Mailchimp", "Marketo", "Pardot", "ActiveCampaign"]
              },
              {
                category: "Analytics & Tools",
                items: ["Google Analytics", "Tableau", "Salesforce", "WordPress", "Canva"]
              },
              {
                category: "Technical Skills",
                items: ["HTML/CSS", "JavaScript Basics", "SQL", "A/B Testing", "CRO"]
              }
            ],
            certifications: [
              {
                name: "Google Analytics Certified",
                issuer: "Google",
                year: "2023",
                id: "GA-12345"
              },
              {
                name: "HubSpot Content Marketing Certified",
                issuer: "HubSpot",
                year: "2023",
                id: "HUB-67890"
              },
              {
                name: "Facebook Blueprint Certified",
                issuer: "Facebook",
                year: "2022",
                id: "FB-54321"
              }
            ],
            projects: [
              {
                name: "E-commerce Growth Campaign",
                description: "Led comprehensive digital marketing campaign for fashion e-commerce client",
                results: "300% increase in online sales, 150% improvement in ROAS",
                technologies: ["Google Ads", "Facebook Ads", "Google Analytics", "Shopify"]
              },
              {
                name: "B2B SaaS Lead Generation",
                description: "Developed multi-channel lead generation strategy for SaaS startup",
                results: "Generated 500+ qualified leads in 6 months, 40% conversion rate",
                technologies: ["HubSpot", "LinkedIn Ads", "Content Marketing", "Email Automation"]
              }
            ]
          };
          
          localStorage.setItem('resume2website_parsed_data', JSON.stringify(mockResumeData));
          
          // Navigate to templates after a brief delay
          setTimeout(() => {
            navigate('/templates');
          }, 1000);
          
          return 100;
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [navigate]);

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
            
            <div className="w-20"></div>
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
              
              <div className="w-16 h-px bg-primary"></div>
              
              {/* Step 2: Process */}
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  2
                </div>
                <span className="ml-2 font-medium">Process</span>
              </div>
              
              <div className="w-16 h-px bg-muted"></div>
              
              {/* Step 3: Template */}
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold">
                  3
                </div>
                <span className="ml-2 text-muted-foreground">Template</span>
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

        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold mb-4">Processing Your Resume</h1>
            <p className="text-xl text-muted-foreground">
              Our AI is analyzing your resume and extracting key information
            </p>
          </motion.div>

          {/* Processing Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <Card className="card-elegant">
              <CardContent className="p-8">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-3" />
                </div>

                {/* Current Step */}
                <div className="text-center">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-primary text-white mb-4"
                  >
                    {React.createElement(processingSteps[currentStep]?.icon || FileSearch, { 
                      className: "h-8 w-8" 
                    })}
                  </motion.div>
                  
                  <motion.div
                    key={`text-${currentStep}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {processingSteps[currentStep]?.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {processingSteps[currentStep]?.description}
                    </p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Processing Steps List */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="card-elegant">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Processing Steps</h3>
                <div className="space-y-3">
                  {processingSteps.map((step, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        index < currentStep 
                          ? 'bg-success text-success-foreground' 
                          : index === currentStep 
                            ? 'bg-primary text-primary-foreground animate-pulse' 
                            : 'bg-muted text-muted-foreground'
                      }`}>
                        {index < currentStep ? '✓' : index + 1}
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${
                          index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                        }`}>
                          {step.title.replace('...', '')}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Processing;