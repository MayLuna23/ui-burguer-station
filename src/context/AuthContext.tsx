// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  userName: string | null;
  logout: () => void;
  login: (token: string, userName: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
const [userName, setUserName] = useState<string | null>(null);


const login = (token: string, userName: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userName", userName);
  setIsAuthenticated(true);
  setUserName(userName); // ← actualiza el estado
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  setIsAuthenticated(false);
  setUserName(null); // ← limpia el estado
};

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("userName");
    if (storedName) setUserName(storedName);
    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      await axios.get("http://localhost:3000/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
      localStorage.removeItem("token");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);


  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, logout, login, userName  }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
