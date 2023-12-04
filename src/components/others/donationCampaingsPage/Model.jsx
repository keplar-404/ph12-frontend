import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import toast from "react-hot-toast";
import PaymentComponent from "./SripeComponent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// export const donationId = React.createContext();

export default function DonationCampaignModal({ data }) {
  const [open, setOpen] = React.useState(false);
  //   const [disable, setBtnDisable] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const ref = React.useRef(0);

  const donate = () => {
    const amount = ref?.current?.value;
    const amountNumber = Number(amount);
    const maxAmount = Number(data.highestAmountUserCanDonate);

    if (amountNumber > maxAmount) {
      toast.error(`Please donete us under ${data.highestAmountUserCanDonate} `);
      return { status: false };
    } else if (amountNumber === 0) {
      toast.error(
        `Please donate us larger then 0 and input field must be a number`
      );
      return { status: false };
    }

    return { status: true, amount: amountNumber };
  };

  // const

  const DonationBtn = ({ data }) => {
    const currentDate = new Date();
    const lastDateOfDonation = new Date(data.lastDateOfDonation);
  
    
  
    if (data.completed == true || data.pause == true || currentDate > lastDateOfDonation) {
      console.log("c")
      console.log(currentDate > lastDateOfDonation)
      console.log("pause")
      console.log(data.pause)
      console.log("complted")
      console.log(data.completed)
      return (
        <Button variant="contained" onClick={handleOpen} disabled={true}>
          <p className="text-xl cabin">Donate now</p>
        </Button>
      );
    } else {
      return (
        <Button variant="contained" onClick={handleOpen}>
          <p className="text-xl cabin">Donate now</p>
        </Button>
      );
    }
  };
  

  // console.log(typeof data.lastDateOfDonation)

  return (
    <div className="mt-7">
      <DonationBtn data={data} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="cabin"
      >
        <Box sx={style}>
          <div className="flex flex-col gap-5">
            <input
              type="number"
              required={true}
              ref={ref}
              placeholder="Amount"
              className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm outline-none border bg-gray-100"
            />

            <PaymentComponent
              data={data}
              donate={donate}
              handleModelClose={handleClose}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
