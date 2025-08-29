import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Globe,
  Download,
  ExternalLink,
  Calendar,
  Award,
  Briefcase,
  GraduationCap
} from 'lucide-react';

interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    website?: string;
    summary: string;
  };
  workExperience: Array<{
    company: string;
    position: string;
    duration: string;
    description: string;
    achievements?: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    year: string;
    gpa?: string;
  }>;
  skills: string[];
  certifications?: string[];
  projects?: Array<{
    name: string;
    description: string;
    technologies: string[];
    link?: string;
  }>;
}

interface PortfolioTemplateProps {
  data: ResumeData;
}

const PortfolioTemplate: React.FC<PortfolioTemplateProps> = ({ data }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-white py-20 px-6">
        <div className="absolute inset-0 opacity-10">
          <svg width="60" height="60" viewBox="0 0 60 60" className="w-full h-full" style={{ backgroundRepeat: 'repeat' }}>
            <circle cx="30" cy="30" r="2" fill="currentColor" />
          </svg>
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm border-4 border-white/30 mx-auto mb-8 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/40 to-white/20 flex items-center justify-center text-4xl font-bold">
                {data.personalInfo.name.charAt(0)}
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4">{data.personalInfo.name}</h1>
            <h2 className="text-2xl font-light mb-6 text-white/90">{data.personalInfo.title}</h2>
            <p className="text-lg max-w-2xl mx-auto text-white/80 leading-relaxed mb-8">
              {data.personalInfo.summary}
            </p>
            
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">{data.personalInfo.email}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">{data.personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">{data.personalInfo.location}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-white text-primary hover:bg-white/90" size="lg">
                <Download className="h-4 w-4 mr-2" />
                Download Resume
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary" size="lg">
                <Mail className="h-4 w-4 mr-2" />
                Get In Touch
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation */}
      <nav className="sticky top-0 bg-white border-b border-gray-200 z-50">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex justify-center space-x-8 py-4">
            {['Experience', 'Skills', 'Education', 'Projects', 'Contact'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-600 hover:text-primary font-medium transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-6xl px-6 py-12">
        {/* Experience Section */}
        <motion.section
          id="experience"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900">
            <Briefcase className="h-8 w-8 text-primary" />
            Work Experience
          </h3>
          <div className="space-y-8">
            {data.workExperience.map((job, index) => (
              <Card key={index} className="border-l-4 border-l-primary hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                    <div>
                      <h4 className="text-xl font-semibold text-gray-900">{job.position}</h4>
                      <p className="text-lg font-medium text-primary">{job.company}</p>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20 w-fit mt-2 lg:mt-0">
                      <Calendar className="h-3 w-3 mr-1" />
                      {job.duration}
                    </Badge>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">{job.description}</p>
                  {job.achievements && (
                    <ul className="space-y-2">
                      {job.achievements.map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          id="skills"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900">
            <Award className="h-8 w-8 text-primary" />
            Skills & Expertise
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                <Badge className="bg-primary/5 text-primary border-primary/20 w-full justify-center py-3 hover:bg-primary/10 transition-colors">
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          id="education"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900">
            <GraduationCap className="h-8 w-8 text-primary" />
            Education
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {data.education.map((edu, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{edu.degree}</h4>
                  <p className="text-primary font-medium mb-2">{edu.institution}</p>
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>{edu.year}</span>
                    {edu.gpa && <span>GPA: {edu.gpa}</span>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Projects Section (if available) */}
        {data.projects && data.projects.length > 0 && (
          <motion.section
            id="projects"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 text-gray-900">
              <Globe className="h-8 w-8 text-primary" />
              Featured Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.projects.map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">{project.name}</h4>
                      {project.link && (
                        <Button size="sm" variant="ghost" className="text-primary p-1">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        )}

        {/* Contact Section */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-8 text-gray-900">Let's Connect</h3>
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <p className="text-lg text-gray-600 mb-6">
              Interested in working together? Let's discuss how I can help bring your project to life.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-primary hover:bg-primary/90" size="lg">
                <Mail className="h-4 w-4 mr-2" />
                Send Message
              </Button>
              <Button variant="outline" size="lg">
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
              {data.personalInfo.github && (
                <Button variant="outline" size="lg">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
              )}
            </div>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t mt-16">
        <div className="container mx-auto max-w-6xl px-6 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">© 2024 {data.personalInfo.name}. All rights reserved.</p>
            <p className="text-sm">Created with Resume2Website</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioTemplate;