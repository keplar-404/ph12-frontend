import React, { useContext, useLayoutEffect, useState } from "react";
import { UserContext } from "../../../../wraper/ContextWraper";
import Table from "../../../../shared/Table";
import { getPetDataByUser } from "../../../../../services/api/axios/axios";
import CircularIndeterminate from "../../../../shared/CircleProgress";
import { tableDataFormat } from "../../../../../utils/tableHelper";
import RedirectUserTologinWraper from "../../../../wraper/RedirectUserTologinWraper";



export function MyPets() {
  const { userData, setUserData } = useContext(UserContext);
  const [petsData, setPetsData] = useState("loading");
  // this is for component re render
  const [rerender, setRerender] = useState(0)

  useLayoutEffect(() => {
    getPetDataByUser(userData.id, setPetsData);
  }, [rerender]);

  
  if (petsData === "loading") {
    return <CircularIndeterminate />;
  } else if (petsData.length === 0) {
    return (
      <>
        <div className="w-full h-screen flex justify-center items-center">
          <p className="text-2xl balboo font-bold">
            You have not added any pets
          </p>
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
      <Table rerender={setRerender} data={petsData} columns={columnFields} type={"my pets"} />
    </RedirectUserTologinWraper>
    </>
  );
}
