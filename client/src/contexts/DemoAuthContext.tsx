import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockUser, mockAdmin } from '@/lib/mockData';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  fullName?: string | null;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, password: string, email: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function DemoAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('demoUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let loggedInUser: User | null = null;
    
    if (username === 'demo' && password === 'demo') {
      loggedInUser = mockUser;
    } else if (username === 'admin' && password === 'admin') {
      loggedInUser = mockAdmin;
    }
    
    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem('demoUser', JSON.stringify(loggedInUser));
      return true;
    }
    
    return false;
  };

  const register = async (username: string, password: string, email: string, fullName: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      username,
      email,
      fullName,
      role: 'user',
    };
    
    setUser(newUser);
    localStorage.setItem('demoUser', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('demoUser');
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
