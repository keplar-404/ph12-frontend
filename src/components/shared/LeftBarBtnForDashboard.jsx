import React from "react";

export default function LeftBarBtnForDashboard({ name, setRightSection }) {
  return (
    <>
      <button
        onClick={() => setRightSection(name)}
        className="px-[1rem] py-[0.6rem] rounded-lg transition-all duration-300 hover:bg-white"
      >
        {name}
      </button>
    </>
  );
}
