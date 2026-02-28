import { createContext, useContext, useState } from "react";
import api from "../Api/axios";

export const authContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const setAuthentication = async (authToken) => {
    
    const userDetails = await api.post("/auth/getUserByAuthToken", {"authToken" : authToken });
    setUser(userDetails.data);
  };

  const removeAuthentication = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };
  
  return (
    <authContext.Provider value={{ user, setAuthentication, removeAuthentication }}>
      {children}
    </authContext.Provider>
  );
}


export function useAuth() {
  return useContext(authContext);
}