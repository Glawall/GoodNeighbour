import React, { createContext, useContext, useState } from "react";
import { useAuth as useAuthHook } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const { validateCredentials } = useAuthHook();
  const navigate = useNavigate();

  const login = async (credentials) => {
    try {
      const userData = await validateCredentials(credentials);
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/help-requests");
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  const value = {
    user,
    login,
    logout,
    isLoggedIn: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
