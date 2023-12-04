import React, { useEffect, useState } from "react";
import { getAll } from "../services/api/axios/axios";
import DonationCampaingCard from "../components/others/donationCampaingsPage/Card";

export default function DonationsCampaign() {
  const [donationsCampaigns, setDonationsCampaigns] = useState("loading");

  const getData = async () => {
    const data = await getAll();
    await setDonationsCampaigns(data.donationsCampaign);
    return;
  };

  useEffect(() => {
    getData();
  }, []);

  if (donationsCampaigns === "loading") {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-2xl balboo">
          Please kindly wait for 20 sec we are delevering your content
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex-center mt-7">
        <div className="responsive">
          {donationsCampaigns.length === 0 ? (
            <>
              <div className="w-full h-screen flex justify-center items-center">
                <p className="text-2xl balboo">No donation campaign found</p>
              </div>
            </>
          ) : (
            <>
              {/* <div className="w-full"> */}
              <div className="mt-[5rem] w-full h-screen place-content-center grid  grid-cols-3 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {donationsCampaigns
                  .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
                  .map((data, index) => (
                    <div key={index}>
                      <DonationCampaingCard data={data} />
                    </div>
                  ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
