import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const activeUser = JSON.parse(localStorage.getItem("activeUser"));
      if (activeUser) {
        setUser(activeUser);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    const isAdmin = userData.email === "adminalonso@hotmail.com";
    const userWithRole = { ...userData, isAdmin };
    localStorage.setItem("activeUser", JSON.stringify(userWithRole));
    setUser(userWithRole);
    setIsAuthenticated(true);
    return isAdmin ? "/administracion" : "/mi-cuenta";
  };

  const logout = () => {
    localStorage.removeItem("activeUser");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
