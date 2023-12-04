import React, { useContext } from "react";
import { UserContext } from "../wraper/ContextWraper";

export default function SocialLogin({ name, img, action }) {
  const { userData, setUserData } = useContext(UserContext);
  return (
    <>
      <button
        className=" group h-12 w-full px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-[#FE5629] focus:bg-blue-50 active:bg-blue-100"
        onClick={() => action(setUserData)}
      >
        <div className="relative flex items-center space-x-4 justify-center">
          <img src={img} className="absolute left-0 w-5" alt="Facebook logo" />
          <span className="block w-max font-semibold tracking-wide text-gray-700 text-sm transition duration-300 group-hover:text-[#FE5629] sm:text-base">
            Continue with {name}
          </span>
        </div>
      </button>
    </>
  );
}
