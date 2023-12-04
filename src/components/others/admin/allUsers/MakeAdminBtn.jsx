import { Button } from "@mui/material";
import React, { useState } from "react";
import axios from "../../../../services/config";

export default function MakeAdminBtn({ userData, rerender }) {
  const [btnDisable, setBtnDisable] = useState(false);
  const handleClick = async () => {
    setBtnDisable(true);
    const { data } = await axios.post("/updaterole", {
      _id: userData._id,
      role: "admin",
    });

    await setBtnDisable(false);
    await rerender((value) => (value += 1));
  };
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: "green",
        ":hover": {
          bgcolor: "green",
        },
      }}
      disabled={btnDisable}
      onClick={handleClick}
    >
      Make admin
    </Button>
  );
}
