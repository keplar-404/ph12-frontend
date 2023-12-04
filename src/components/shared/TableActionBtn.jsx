import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Link } from "react-router-dom";
import {
  acceptOrRejectReqPet,
  delDonationByAdmin,
  deletePetByUser,
  pauseOrUnpause,
  refund,
  removeAdoptionStatus,
  updateAdoptedStatus,
} from "../../services/api/axios/axios";
import { UserContext } from "../wraper/ContextWraper";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TableActionBtn({ data, name, bg, rerender }) {
  // console.log(name)
  const { userData, setUserData } = React.useContext(UserContext);
  const [disabled, setDisabled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = async (del) => {
    setDisabled(true);

    if (del === true) {
      // call the delete api here
      if (name === "Delete Donation") {
        await delDonationByAdmin(data._id);
      } else {
        await deletePetByUser(data);
      }
      await rerender((value) => (value += 1));
    }
    await setDisabled(false);
    await setOpen(false);
  };

  React.useEffect(() => {
    // console.log("reloaded");
  }, [disabled]);

  const handleSubmit = async () => {
    setDisabled(true);
    if (name === "Adopted") {
      await updateAdoptedStatus(data);
    } else if (name === "remove adoption") {
      await removeAdoptionStatus(data._id);
    } else if (name === "Pause" || name === "Unpaused") {
      // console.log("clk p")
      await pauseOrUnpause(data);
      await toast.success(
        `Donation campaign is successfully ${name}. Due to server low connection ui changes slowly please visit other tabs or reload the page`,
        { duration: 6000 }
      );
      await rerender((value) => (value += 1));
    } else if ((name = "Refund")) {
      await refund(userData.id, data, data.donationId);
    }

    // console.log("clk")
    await setDisabled(false);
    await rerender((value) => (value += 1));
  };

  const petAcceptOrReject = async () => {
    setDisabled(true);
    if (name === "Accept") {
      await acceptOrRejectReqPet(data, "accept");
    } else {
      await acceptOrRejectReqPet(data, "reject");
    }
    await setDisabled(false);
    await rerender((value) => (value += 1));
  };

  if (name === "Adopted") {
    return (
      <>
        <Button
          variant="contained"
          style={{ background: bg }}
          disabled={data?.adopted?.status}
          onClick={handleSubmit}
        >
          {name}
        </Button>
      </>
    );
  } else if (name === "Update") {
    return (
      <>
        <Link to={`/updatepet/${data._id}`} state={data}>
          <Button
            variant="contained"
            style={{ background: bg }}
            disabled={disabled}
          >
            {name}
          </Button>
        </Link>
      </>
    );
  } else if (name === "Pause") {
    return (
      <>
        <Button
          variant="contained"
          style={{ background: bg }}
          disabled={data.pause}
          onClick={handleSubmit}
        >
          {name}
        </Button>
      </>
    );
  } else if (name === "Unpaused") {
    return (
      <>
        <Button
          variant="contained"
          style={{ background: bg }}
          disabled={!data.pause}
          onClick={handleSubmit}
        >
          {name}
        </Button>
      </>
    );
  } else if (name === "Edit") {
    return (
      <>
        <Link to={`/updatedonationcampaign/${data._id}`} state={data}>
          <Button variant="contained" style={{ background: bg }}>
            {name}
          </Button>
        </Link>
      </>
    );
  } else if (name === "Refund") {
    return (
      <>
        <Button onClick={handleSubmit} variant="contained" disabled={disabled}>
          Refund
        </Button>
      </>
    );
  } else if (name === "remove adoption") {
    return (
      <>
        <Button
          onClick={handleSubmit}
          variant="contained"
          sx={{ bgcolor: bg }}
          disabled={!data.adopted.status}
        >
          Remove adoption
        </Button>
      </>
    );
  } else if (name === "Accept" || name === "Reject") {
    return (
      <>
        <Button
          onClick={petAcceptOrReject}
          variant="contained"
          sx={{
            bgcolor: bg,
            ":hover": {
              bgcolor: bg,
            },
          }}
          disabled={disabled}
        >
          {name}
        </Button>
      </>
    );
  }
  // this is delete button
  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        style={{ background: bg }}
      >
        {name}
      </Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <p>Are you sure you want to delete</p>
          <div className="flex gap-4 mt-2">
            <Button
              variant="contained"
              style={{ background: bg }}
              onClick={() => handleClose(true)}
              disabled={disabled}
            >
              Yes
            </Button>
            <Button
              variant="contained"
              style={{ background: "green" }}
              onClick={handleClose}
            >
              No
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
