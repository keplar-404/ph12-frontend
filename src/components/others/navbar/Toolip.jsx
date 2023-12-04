import { Avatar } from "@mui/material";
import React, { useState } from "react";
import Button from "../../shared/Button";
import logoutUser from "../../../services/auth/logout";
import { Link } from "react-router-dom";

export default function Toolip({ userData, setUserData }) {
  const [model, setModel] = useState(false);
  return (
    <>
      <div className="relative">
        <div onClick={() => setModel(!model)} className="cursor-pointer">
          <Avatar
            sx={{ width: 56, height: 56 }}
            alt={userData.name}
            src={userData.profilePic}
          />
        </div>

        {model && (
          <div className="absolute z-[1000000] right-0 bg-gray-100 rounded-xl px-[2rem] py-4 flex flex-col gap-4">
            <p>{userData.name}</p>
            <p>{userData.email}</p>

            <Link to={`/${userData.id}`} className="cursor-pointer">
              Dashboard
            </Link>

            {userData.role === "admin" && (
              <Link to={"/admin"} className="cursor-pointer">
                Admin Dashboard
              </Link>
            )}
            <div onClick={() => logoutUser(setUserData)}>
              <Button name={"Logout"} />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
