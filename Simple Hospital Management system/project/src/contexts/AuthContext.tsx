import React, { createContext, useContext, useState } from 'react';
import { toast } from 'react-hot-toast';

interface User {
  email: string;
  name: string;
  role: 'admin' | 'doctor' | 'staff';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email: string, password: string) => {
    // Simulate API call
    if (email === 'admin@hospital.com' && password === 'password') {
      const user = { email, name: 'Admin User', role: 'admin' as const };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      toast.success('Logged in successfully');
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (email: string, password: string, name: string) => {
    // Simulate API call
    const user = { email, name, role: 'staff' as const };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    toast.success('Registered successfully');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}