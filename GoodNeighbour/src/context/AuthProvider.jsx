import React, { createContext, useState, useCallback, useContext } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext({
  isLoggedIn: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = Cookies.get("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isLoggedIn = !!user;
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

export const useAuth = () => {
  return useContext(AuthContext);
};
