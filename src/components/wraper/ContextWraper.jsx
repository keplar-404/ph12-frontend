import React, { createContext, useLayoutEffect, useState } from "react";
import checkUser from "../../services/auth/firebaseCheckUser";

export const UserContext = createContext();
export function ContextWraper({ children }) {
  const [userData, setUserData] = useState(null);
  useLayoutEffect(() => {
    checkUser(setUserData);
  }, []);
  return (
    <>
      <UserContext.Provider value={{ userData, setUserData }}>
        {children}
      </UserContext.Provider>
    </>
  );
}
