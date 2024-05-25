import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

const ContextProvider = ({ children }) => {
  const [data, setData] = useState({
    isAuthenticated: false,
  });
  useEffect(() => {
    const token = JSON.parse(sessionStorage.getItem("userToken"));
    if (token) {
      setData({ ...data, isAuthenticated: true, token: token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ data, setData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { ContextProvider };
