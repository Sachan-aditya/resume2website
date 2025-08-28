import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('resume2website_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Invalid user data in localStorage');
        localStorage.removeItem('resume2website_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - check against stored users or use demo credentials
    const storedUsers = JSON.parse(localStorage.getItem('resume2website_users') || '[]');
    const existingUser = storedUsers.find((u: any) => u.email === email && u.password === password);
    
    // Demo credentials
    if ((email === 'demo@resume2website.com' && password === 'demo123') || existingUser) {
      const userData = existingUser || {
        id: 'demo-user',
        name: 'Demo User',
        email: 'demo@resume2website.com',
        createdAt: new Date().toISOString()
      };
      
      setUser(userData);
      localStorage.setItem('resume2website_user', JSON.stringify(userData));
      setIsLoading(false);
      toast.success('Welcome back!');
      return true;
    } else {
      setIsLoading(false);
      toast.error('Invalid email or password');
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // Check if user already exists
    const storedUsers = JSON.parse(localStorage.getItem('resume2website_users') || '[]');
    if (storedUsers.find((u: any) => u.email === email)) {
      setIsLoading(false);
      toast.error('Account with this email already exists');
      return false;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password, // In real app, this would be hashed
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage (mock database)
    storedUsers.push(newUser);
    localStorage.setItem('resume2website_users', JSON.stringify(storedUsers));
    
    // Set current user (without password)
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('resume2website_user', JSON.stringify(userWithoutPassword));
    
    setIsLoading(false);
    toast.success('Account created successfully!');
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('resume2website_user');
    toast.success('Logged out successfully');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}