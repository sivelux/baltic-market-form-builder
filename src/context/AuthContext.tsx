
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Simple authentication - in a real app, this would be more secure
  const login = (username: string, password: string) => {
    if (username === "admin" && password === "Admin123!") {
      setIsAuthenticated(true);
      toast.success("Zalogowano pomyślnie!");
      return true;
    }
    toast.error("Niepoprawne dane logowania");
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigate("/");
    toast.info("Wylogowano pomyślnie");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
