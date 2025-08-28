import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../contexts/AuthContext';
import { 
  Plus, 
  Globe, 
  Edit, 
  Trash2, 
  ExternalLink, 
  BarChart3,
  Users,
  Crown,
  Search,
  Filter
} from 'lucide-react';

interface Website {
  id: string;
  name: string;
  url: string;
  template: string;
  status: 'live' | 'draft' | 'processing';
  createdAt: string;
  views: number;
}

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock websites data - in real app, this would come from an API
  const [websites] = useState<Website[]>([
    {
      id: '1',
      name: 'John Doe - Portfolio',
      url: 'johndoe.resume2website.com',
      template: 'Professional Executive',
      status: 'live',
      createdAt: '2024-01-15',
      views: 1247
    },
    {
      id: '2',
      name: 'Sarah Johnson - Resume',
      url: 'sarah-johnson.resume2website.com',
      template: 'Creative Portfolio',
      status: 'live',
      createdAt: '2024-01-10',
      views: 892
    },
    {
      id: '3',
      name: 'Marketing Manager Site',
      url: '',
      template: 'Minimal Modern',
      status: 'processing',
      createdAt: '2024-01-20',
      views: 0
    }
  ]);

  const stats = {
    totalWebsites: websites.length,
    liveWebsites: websites.filter(w => w.status === 'live').length,
    totalViews: websites.reduce((sum, w) => sum + w.views, 0),
    templatesUsed: new Set(websites.map(w => w.template)).size
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live': return 'bg-success text-success-foreground';
      case 'draft': return 'bg-warning text-warning-foreground';
      case 'processing': return 'bg-secondary text-secondary-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const filteredWebsites = websites.filter(website =>
    website.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    website.template.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Resume2Website
            </Link>
            
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Pro
              </Button>
              
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <div className="font-medium">{user?.name}</div>
                  <div className="text-sm text-muted-foreground">{user?.email}</div>
                </div>
                <Button variant="ghost" onClick={logout} className="text-muted-foreground">
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-xl text-muted-foreground">
            Ready to create another amazing website?
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="card-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Websites</p>
                  <p className="text-3xl font-bold">{stats.totalWebsites}</p>
                </div>
                <Globe className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Live Websites</p>
                  <p className="text-3xl font-bold">{stats.liveWebsites}</p>
                </div>
                <ExternalLink className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Views</p>
                  <p className="text-3xl font-bold">{stats.totalViews.toLocaleString()}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card className="card-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Templates Used</p>
                  <p className="text-3xl font-bold">{stats.templatesUsed}</p>
                </div>
                <Users className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Create New Website CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="card-elegant gradient-primary text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to create your next website?</h2>
              <p className="text-white/90 mb-6">
                Upload your resume and get a professional website in minutes
              </p>
              <Link to="/upload">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Website
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>

        {/* Websites List */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Your Websites</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search websites..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-ring focus:border-transparent outline-none"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          {filteredWebsites.length === 0 ? (
            <Card className="card-elegant">
              <CardContent className="p-12 text-center">
                <Globe className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No websites found</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery ? 'Try adjusting your search terms.' : "You haven't created any websites yet."}
                </p>
                {!searchQuery && (
                  <Link to="/upload">
                    <Button className="btn-primary">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Website
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {filteredWebsites.map((website) => (
                <Card key={website.id} className="card-elegant hover:scale-[1.02] transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold">{website.name}</h3>
                          <Badge className={getStatusColor(website.status)}>
                            {website.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-6 text-muted-foreground mb-4">
                          {website.url ? (
                            <a
                              href={`https://${website.url}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 hover:text-primary transition-colors"
                            >
                              <Globe className="h-4 w-4" />
                              {website.url}
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          ) : (
                            <span className="flex items-center gap-1">
                              <Globe className="h-4 w-4" />
                              URL pending
                            </span>
                          )}
                          <span>{website.template}</span>
                          <span>{website.views} views</span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          Created on {new Date(website.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {website.status === 'live' && (
                          <Button variant="outline" size="sm">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Analytics
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;