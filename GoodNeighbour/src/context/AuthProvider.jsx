import React, { createContext, useState, useCallback, useContext } from "react";
import Cookies from "js-cookie";

// Define the AuthContext with default values
const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

// AuthProvider component using cookies
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = Cookies.get("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isLoggedIn = !!user; // Boolean check to ensure that isLoggedIn is updated based on the user state

  const login = useCallback((userData) => {
    Cookies.set("user", JSON.stringify(userData), { expires: 7, path: "/" });
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove("user", { path: "/" });
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
