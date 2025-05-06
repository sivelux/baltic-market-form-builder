
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  changePassword: (currentPassword: string, newPassword: string) => boolean;
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

  // Change password functionality
  const changePassword = (currentPassword: string, newPassword: string) => {
    // Verify current password is correct
    if (currentPassword !== "Admin123!") {
      toast.error("Aktualne hasło jest nieprawidłowe");
      return false;
    }

    // In a real app, we would make an API call to update the password in the database
    // For this demo, we can only show success message as we don't have actual password storage
    toast.success("Hasło zostało zmienione pomyślnie");
    return true;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, changePassword }}>
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
