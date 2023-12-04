import { useContext, useLayoutEffect, useState } from "react";
import { UserContext } from "../../../../wraper/ContextWraper";
import { getDonationCampaignsDataByUser } from "../../../../../services/api/axios/axios";
import CircularIndeterminate from "../../../../shared/CircleProgress";
import { tableDataFormat } from "../../../../../utils/tableHelper";
import Table from "../../../../shared/Table";

export default function DonationCampaigns() {
  const { userData, setUserData } = useContext(UserContext);
  const [donationsData, setDonationsData] = useState("loading");
  // this is for component re render
  const [rerender, setRerender] = useState(0);

  useLayoutEffect(() => {
    getDonationCampaignsDataByUser(userData.id, setDonationsData);
  }, [rerender]);

  if (donationsData === "loading") {
    return <CircularIndeterminate />;
  } else if (donationsData.length === 0) {
    return (
      <>
        <div className="w-full h-screen flex justify-center items-center">
          <p className="text-2xl balboo font-bold">
            You have not added any donation campaign
          </p>
        </div>
      </>
    );
  }

  const donationData = donationsData[0];
  const generateColumnField = (data) => {
    const { _id, petname, maximumDonationAmount, donations } = data;
    const fieldData = { _id, petname, maximumDonationAmount, donations };

    const formattedData = Object.entries(fieldData).map(
      ([fieldName, value]) => {
        let capitalFieldName = "";

        if (fieldName == "_id") {
          capitalFieldName = "Serial";
        } else {
          if (fieldName == "maximumDonationAmount") {
            capitalFieldName = fieldName.replace(
              "maximumDonationAmount",
              "Maximum Donation Amount"
            );
          }

          capitalFieldName =
            fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
        }

        // Call tableDataFormat with the required arguments
        return tableDataFormat(capitalFieldName, fieldName);
      }
    );

    return formattedData;
  };
  const columnFields = generateColumnField(donationData);

  return (
    <>
      {/* <RedirectUserTologinWraper> */}
      <Table
        rerender={setRerender}
        data={donationsData}
        columns={columnFields}
        type={"donations campaings"}
      />
      {/* </RedirectUserTologinWraper> */}
    </>
  );
}
