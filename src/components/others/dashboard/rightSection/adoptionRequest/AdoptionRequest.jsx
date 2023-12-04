import React, { useContext, useLayoutEffect, useState } from "react";
import { UserContext } from "../../../../wraper/ContextWraper";
import Table from "../../../../shared/Table";
import { getReqPetForUser } from "../../../../../services/api/axios/axios";
import CircularIndeterminate from "../../../../shared/CircleProgress";
import { tableDataFormat } from "../../../../../utils/tableHelper";
import RedirectUserTologinWraper from "../../../../wraper/RedirectUserTologinWraper";

export default function AdoptionRequest() {
  const { userData, setUserData } = useContext(UserContext);
  const [reqPetsData, setReqPetsData] = useState("loading");
  // this is for component re render
  const [rerender, setRerender] = useState(0);

  const petReq = async () => {
    const data = await getReqPetForUser(userData.id);
    setReqPetsData(data.result);
  };

  useLayoutEffect(() => {
    petReq();
  }, [rerender]);

  if (reqPetsData === "loading") {
    return <CircularIndeterminate />;
  } else if (reqPetsData.length === 0) {
    return (
      <>
        <div className="w-full h-screen flex justify-center items-center">
          <p className="text-2xl balboo font-bold">No req found</p>
        </div>
      </>
    );
  }


  const petData = reqPetsData[0];
  const generateColumnField = (data) => {
    const { petname, petlocation, requsername, requseremail, requserlocation, phone } = data;
    const fieldData = { petname, petlocation, requsername, requseremail, requserlocation, phone };

    const formattedData = Object.entries(fieldData).map(
      ([fieldName, value]) => {
        const capitalFieldName =
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

        return tableDataFormat(capitalFieldName, fieldName);
      }
    );

    return formattedData;
  };
  const columnFields = generateColumnField(petData);

  return (
    <>
      <RedirectUserTologinWraper>
        <Table
          rerender={setRerender}
          data={reqPetsData}
          columns={columnFields}
          type={"req pets"}
        />
      </RedirectUserTologinWraper>
    </>
  );
}
