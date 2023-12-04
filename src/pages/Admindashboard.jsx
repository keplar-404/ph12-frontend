import React, { useLayoutEffect, useState } from "react";
import RedirectUserTologinWraper from "../components/wraper/RedirectUserTologinWraper";
import LeftBarBtnForDashboard from "../components/shared/LeftBarBtnForDashboard";
import AllUsers from "../components/others/admin/allUsers/AllUsers";
import AllPets from "../components/others/admin/allPets/AllPets";
import AllDonationsCampaign from "../components/others/admin/allDonationsCampaign/AllDonationsCampaign";

export default function Admindashboard() {
  const [rightSection, setRightSection] = useState("All users");
  const rightSectionComponents = [
    {
      name: "All users",
    },
    {
      name: "All pets",
    },
    {
      name: "All Donation Campaigns",
    },
  ];

  return (
    <>
      <RedirectUserTologinWraper>
        <div className="sm:mt-[5rem] lg:mt-0 w-full flex sm:flex-col lg:flex-row overflow-hidden">
          {/* left sectopm */}
          <section className="cabin font-medium sm:h-fit lg:h-screen sm:w-[100%] lg:w-[20%] flex flex-wrap sm:flex-row lg:flex-col justify-center items-center gap-4">
            {rightSectionComponents.map((data, index) => (
              <LeftBarBtnForDashboard
                name={data.name}
                setRightSection={setRightSection}
                key={index}
              />
            ))}
          </section>

          {/* devider */}
          <div className="sm:w-full sm:flex sm:justify-center sm:items-center lg:w-fit lg:block lg:justify-normal lg:items-start">
            <div className="sm:w-[85dvw] sm:h-[1px] lg:w-[1px] lg:h-screen bg-slate-500"></div>
          </div>

          {/* right section */}
          <section className="h-screen w-full flex justify-center overflow-hidden">
            {rightSection === "All users" && <AllUsers />}
            {rightSection === "All pets" && <AllPets />}
            {rightSection === "All Donation Campaigns" && (
              <AllDonationsCampaign />
            )}
          </section>
        </div>
      </RedirectUserTologinWraper>
    </>
  );
}
