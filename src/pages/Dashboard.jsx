import React, { useState } from "react";
import LeftBarBtnForDashboard from "../components/shared/LeftBarBtnForDashboard";
import { MyPets } from "../components/others/dashboard/rightSection/MyPets/MyPets";
import AdoptionRequest from "../components/others/dashboard/rightSection/adoptionRequest/AdoptionRequest";
import DonationCampaigns from "../components/others/dashboard/rightSection/donationCampaigns/DonationCampaigns";
import Donations from "../components/others/dashboard/rightSection/donations/Donations";
import RedirectUserTologinWraper from "../components/wraper/RedirectUserTologinWraper";
import PetForm from "../components/shared/PetForm";
import DonationForm from "../components/shared/DonationForm";

export default function Dashboard() {
  const [rightSection, setRightSection] = useState("Add a pet");

  const rightSectionComponents = [
    {
      name: "Add a pet",
    },
    {
      name: "My added pets",
    },
    {
      name: "Adoption Request",
    },
    {
      name: "Create Donation Campaign",
    },
    {
      name: "My Donation Campaigns",
    },
    {
      name: "My Donations",
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
          <section className="w-full flex justify-center overflow-hidden">
            {rightSection === "Add a pet" && <PetForm />}

            {rightSection === "My added pets" && <MyPets />}

            {rightSection === "Adoption Request" && <AdoptionRequest />}

            {rightSection === "Create Donation Campaign" && <DonationForm />}

            {rightSection === "My Donation Campaigns" && <DonationCampaigns />}

            {rightSection === "My Donations" && <Donations />}
          </section>
        </div>
      </RedirectUserTologinWraper>
    </>
  );
}
