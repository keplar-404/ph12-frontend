import React, { useEffect, useState } from "react";
import { getAll } from "../../../../services/api/axios/axios";
import CircularIndeterminate from "../../../shared/CircleProgress";
import { tableDataFormat } from "../../../../utils/tableHelper";
import Table from "../../../shared/Table";

export default function AllUsers() {
  const [reRender, setReRender] = useState(0);
  const [users, setUsers] = useState("loading");

  const getUsers = async () => {
    const data = await getAll();
    await setUsers(data.users);
  };

  useEffect(() => {
    getUsers();
  }, [reRender]);

  if (users === "loading") {
    return <CircularIndeterminate />;
  } else if (users.length === 0) {
    return (
      <>
        <div className="w-full h-screen flex justify-center items-center">
          <p className="text-2xl balboo font-bold">No users found</p>
        </div>
      </>
    );
  }

  const userData = users[0];
  const generateColumnField = (data) => {
    const { name, role, email, profilePic } = data;
    const fieldData = { name, email, profilePic, role };

    const formattedData = Object.entries(fieldData).map(
      ([fieldName, value]) => {
        const capitalFieldName =
          fieldName.charAt(0).toUpperCase() + fieldName.slice(1);

        // Call tableDataFormat
        return tableDataFormat(capitalFieldName, fieldName);
      }
    );

    return formattedData;
  };
  const columnFields = generateColumnField(userData);

  return (
    <>
      <Table
        rerender={setReRender}
        data={users}
        columns={columnFields}
        type={"usersFromAdmin"}
      />
    </>
  );
}
