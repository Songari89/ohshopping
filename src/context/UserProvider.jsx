import React, { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../api/firebase";

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [loading, setLoading ] = useState(true);
  
  useEffect(() => {
    onUserStateChange((user) => {
    setUser(user);
    setLoading(false)
    });
  }, []);

  return <UserContext.Provider value={{user, login, logout, loading}}>{children}</UserContext.Provider>;
}

export function useUserContext(){
  return useContext(UserContext);
}
