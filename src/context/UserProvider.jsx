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

  return <UserContext.Provider value={{user, uid: user&&user.uid, login, logout, loading}}>
  {/* uid:user&&user.uid는 uid의 이름을 변경하는게 아니라 key인 uid의 값을 할당하기 위한 것 */}
  {children}</UserContext.Provider>;
}

export function useUserContext(){
  return useContext(UserContext);
}
