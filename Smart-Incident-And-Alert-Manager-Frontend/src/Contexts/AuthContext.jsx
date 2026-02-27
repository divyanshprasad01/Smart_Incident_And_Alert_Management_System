import { createContext, useContext, useState, useEffect } from "react";

export const authContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    null
    // {
    // name : '', 
    // email : '', 
    // mobileNumber : '', 
    // userSince : ''
    // }
    );
  const [authToken, setAuthToken] = useState(null);

  const setAuthentication = (user, authToken) => {
    setUser(user);
    localStorage.setItem("authToken", authToken);
  };

  const removeAuthentication = () => {
    // setUser({name : '', email : '', mobileNumber : '', userSince : ''});
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