import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RedirectUserTologinWraper from "../components/wraper/RedirectUserTologinWraper";
import DonationCampaignModal from "../components/others/donationCampaingsPage/Model";
import { getAll } from "../services/api/axios/axios";
import DonationCampaingCard from "../components/others/donationCampaingsPage/Card";

export default function DonationCampaignDetails() {
  const { state } = useLocation();
  const [donationsCampaigns, setDonationsCampaigns] = useState([]);
  const data = state;

  const getData = async () => {
    const { donationsCampaign } = await getAll();

    const activeCampaigns = donationsCampaign.filter((data) => !data.completed);
    const [firstDnCm, scDnCm, thDnCm] = activeCampaigns.slice(0, 3);

    const campaignsToSet = [firstDnCm, scDnCm, thDnCm].filter(Boolean);

    await setDonationsCampaigns(campaignsToSet);
  };

  useLayoutEffect(() => {
    getData();
  }, []);

  const getAmount = () => {
    if (data.donations.length === 0) {
      return 0;
    } else if (data.donations.length > 0) {
      const donationsAmount = data.donations.map((data) => data.amount);
      const sum = donationsAmount.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
      return sum;
    }
  };

  const donationsAmount = getAmount();

  return (
    <>
      <RedirectUserTologinWraper>
        <div className="mt-[5rem]">
          <div className="responsive flex justify-center items-center flex-col text-xl">
            <img
              src={data.petimage}
              alt={data.petname}
              className="w-[35rem] h-auto"
            />

            <p className="mt-[5rem]">
              <span className="font-bold"> Pet name:</span> {data.petname}
            </p>
            <p>
              <span className="font-bold">Maximum Donation Amount:</span>{" "}
              {data.maximumDonationAmount}
            </p>
            <p>
              <span className="font-bold">Donated amount:</span>{" "}
              {donationsAmount}
            </p>
            <p>
              <span className="font-bold">
                Highest amount anyone can donate:
              </span>{" "}
              {data.highestAmountUserCanDonate}
            </p>
            <p>
              <span className="font-bold">Short description:</span>{" "}
              {data.shortDescription}
            </p>
            <p>
              <span className="font-bold">Long description:</span>{" "}
              {data.longDescription}
            </p>

            <DonationCampaignModal data={data} />

            <p className="mt-[5rem] text-xl mb-[5rem]">Recomanded</p>
            <div className="w-full flex justify-center items-center">
              <div className="responsive grid place-content-center grid-cols-3 gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                {donationsCampaigns.length > 0 &&
                  donationsCampaigns.map((data, index) => (
                    <div key={index}>
                      <DonationCampaingCard data={data} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </RedirectUserTologinWraper>
    </>
  );
}
