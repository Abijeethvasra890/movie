import { useState, useContext, createContext, ReactNode } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface User {
  id: number;
  email: string;
  display_name: string;
  photo_url: string;
}

interface AuthContextType {
  user: User | null;
  register: (email: string, password: string, displayName: string, photoURL?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const API_BASE_URL = 'https://movie-backend-1nau.onrender.com';

  const register = async (email: string, password: string, displayName: string, photoURL?: string) => {
    await axios.post(`${API_BASE_URL}/api/auth/register`, {
      email,
      password,
      display_name: displayName,
      photo_url: photoURL,
    });
  };

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
    if (response.data) {
      toast.success('Logged in successfully!');
    } else {
      toast.error('Login failed!');
    }
    const { token, user } = response.data;
    localStorage.setItem('token', token);
    console.log("logged in");
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully!');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
