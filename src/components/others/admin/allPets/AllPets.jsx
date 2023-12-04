import React, { useContext, useLayoutEffect, useState } from "react";
import Table from "../../../shared/Table";
import CircularIndeterminate from "../../../shared/CircleProgress";
import { tableDataFormat } from "../../../../utils/tableHelper";
import RedirectUserTologinWraper from "../../../wraper/RedirectUserTologinWraper";
import { getAll } from "../../../../services/api/axios/axios";

export default function AllPets() {
  // const { userData, setUserData } = useContext(UserContext);
  const [petsData, setPetsData] = useState("loading");
  const [rerender, setRerender] = useState(0);

  const getPets = async () => {
    const data = await getAll();
    await setPetsData(data.pets);
  };

  useLayoutEffect(() => {
    getPets();
  }, [rerender]);

  if (petsData === "loading") {
    return <CircularIndeterminate />;
  } else if (petsData.length === 0) {
    return (
      <>
        <div className="w-full h-screen flex justify-center items-center">
          <p className="text-2xl balboo font-bold">No pets found</p>
        </div>
      </>
    );
  }

  const petData = petsData[0];
  const generateColumnField = (data) => {
    const { _id, petname, petType, petimages, adopted } = data;
    const fieldData = { _id, petname, petType, petimages, adopted };

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
  const columnFields = generateColumnField(petData);

  return (
    <>
      <RedirectUserTologinWraper>
        <Table
          rerender={setRerender}
          data={petsData}
          columns={columnFields}
          type={"all pets"}
        />
      </RedirectUserTologinWraper>
    </>
  );
}
