import React, { useContext, useLayoutEffect, useState } from "react";
import { UserContext } from "../../../../wraper/ContextWraper";
import { getUserDonations } from "../../../../../services/api/axios/axios";
import CircularIndeterminate from "../../../../shared/CircleProgress";
import Table from "../../../../shared/Table";
import { tableDataFormat } from "../../../../../utils/tableHelper";
import RedirectUserTologinWraper from "../../../../wraper/RedirectUserTologinWraper";

export default function Donations() {
  const { userData, setUserData } = useContext(UserContext);
  const [donationsData, setDonationsData] = useState("loading");
  // this is for component re render
  const [rerender, setRerender] = useState(0);

  useLayoutEffect(() => {
    getUserDonations(userData.id, setDonationsData);
  }, [rerender]);

  if (donationsData === "loading") {
    return <CircularIndeterminate />;
  } else if (donationsData.length === 0) {
    return (
      <>
        <div className="w-full h-screen flex justify-center items-center">
          <p className="text-2xl balboo font-bold">
            You have not donate any campaign
          </p>
        </div>
      </>
    );
  }

  const donationData = donationsData[0];
  const generateColumnField = (data) => {
    const { _id, amount, petname, petimage } = data;

    const fieldData = { _id, amount, petname, petimage };

    const formattedData = Object.entries(fieldData).map(
      ([fieldName, value]) => {
        let capitalFieldName = "";

        if (fieldName == "_id") {
          capitalFieldName = "Serial";
        } else {
          capitalFieldName = fieldName.replace("pet", "");

          capitalFieldName =
            capitalFieldName.charAt(0).toUpperCase() +
            capitalFieldName.slice(1);
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
      <RedirectUserTologinWraper>
        <Table
          rerender={setRerender}
          data={donationsData}
          columns={columnFields}
          type={"my donations"}
        />
      </RedirectUserTologinWraper>
    </>
  );
}
