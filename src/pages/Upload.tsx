import React, { useState, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-hot-toast';
import PricingCards from '../components/PricingCards';
import { 
  Upload as UploadIcon, 
  FileText, 
  X, 
  CheckCircle, 
  AlertCircle,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

const Upload = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const [showPricing, setShowPricing] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      if (rejection.errors[0]?.code === 'file-too-large') {
        setUploadError('File is too large. Please choose a file under 10MB.');
      } else if (rejection.errors[0]?.code === 'file-invalid-type') {
        setUploadError('Invalid file type. Please upload a PDF or DOCX file.');
      } else {
        setUploadError('There was an error with your file. Please try again.');
      }
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      setUploadError('');
      toast.success('Resume uploaded successfully!');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false
  });

  const removeFile = () => {
    setUploadedFile(null);
    setUploadError('');
    setUploadProgress(0);
  };

  const handleSelectPlan = (plan: 'basic' | 'pro' | 'enterprise') => {
    // Store selected plan
    localStorage.setItem('resume2website_selected_plan', plan);
    
    // Store the uploaded file info for processing page
    localStorage.setItem('resume2website_uploaded_file', JSON.stringify({
      name: uploadedFile?.name,
      size: uploadedFile?.size,
      type: uploadedFile?.type,
      uploadedAt: new Date().toISOString()
    }));
    
    toast.success(`${plan.charAt(0).toUpperCase() + plan.slice(1)} plan selected!`);
    navigate('/processing');
  };

  const handleContinue = () => {
    if (!uploadedFile) {
      toast.error('Please select a file first');
      return;
    }
    
    navigate('/pricing');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Link>
            
            <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Resume2Website
            </Link>
            
            <div className="text-sm text-muted-foreground">
              {user?.name}
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
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                  1
                </div>
                <span className="ml-2 font-medium">Upload</span>
              </div>
              
              <div className="w-16 h-px bg-muted"></div>
              
              {/* Step 2: Process */}
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold">
                  2
                </div>
                <span className="ml-2 text-muted-foreground">Process</span>
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
            <h1 className="text-4xl font-bold mb-4">Upload Your Resume</h1>
            <p className="text-xl text-muted-foreground">
              Upload your resume and our AI will extract all the important information automatically
            </p>
          </motion.div>

          {/* Upload Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <Card className="card-elegant">
              <CardContent className="p-8">
                {!uploadedFile ? (
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-all ${
                      isDragActive 
                        ? 'border-primary bg-primary/5' 
                        : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-primary/5'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <UploadIcon className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                    
                    {isDragActive ? (
                      <div>
                        <h3 className="text-xl font-semibold mb-2 text-primary">Drop your resume here</h3>
                        <p className="text-muted-foreground">Release to upload your file</p>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Drag & drop your resume</h3>
                        <p className="text-muted-foreground mb-4">
                          or click to browse your files
                        </p>
                        <Button className="btn-primary">
                          Choose File
                        </Button>
                      </div>
                    )}
                    
                    <div className="mt-6 text-sm text-muted-foreground">
                      <p>Supported formats: PDF, DOCX</p>
                      <p>Maximum file size: 10MB</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* File Preview */}
                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                      <FileText className="h-12 w-12 text-primary" />
                      <div className="flex-1">
                        <h4 className="font-semibold">{uploadedFile.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {formatFileSize(uploadedFile.size)} • {uploadedFile.type.includes('pdf') ? 'PDF' : 'DOCX'}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-success" />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeFile}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Upload Progress */}
                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Uploading...</span>
                          <span>{Math.round(uploadProgress)}%</span>
                        </div>
                        <Progress value={uploadProgress} className="h-2" />
                      </div>
                    )}
                  </div>
                )}

                {/* Error Message */}
                {uploadError && (
                  <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-center gap-3">
                    <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0" />
                    <p className="text-destructive">{uploadError}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Instructions */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <Card className="card-elegant">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Tips for best results
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    Use a well-formatted resume with clear sections
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    Include contact information, work experience, and skills
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    PDF format typically works better than DOCX
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                    Avoid images or complex formatting that might not parse correctly
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          {/* Continue Button or Pricing */}
          {uploadedFile && !isUploading && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <Button 
                onClick={handleContinue}
                size="lg" 
                className="btn-primary text-lg px-8"
              >
                Continue to Pricing
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;