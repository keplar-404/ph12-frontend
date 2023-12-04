import React, { useContext, useEffect } from "react";
import { UserContext } from "./ContextWraper";
import { useNavigate } from "react-router-dom";

export default function RedirectUserTologinWraper({ children }) {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userData === null) {
      navigate("/login");
      return;
    }
  }, [userData]);
  return <>{children}</>;
}
