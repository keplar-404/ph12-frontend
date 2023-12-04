// PaymentComponent.js
import React, { useContext, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { payment } from "../../../services/api/axios/axios";
import { UserContext } from "../../wraper/ContextWraper";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
  "pk_test_51OIZw5KzX3rFI0XXyOWKTw6yVEIN9XrTNpA5NemHGiTwe2VYDXjsiAUxjMDnHPTfGJLxT4Eg0uYk7HwF85OP14E300G0huPhsV"
);

const PaymentForm = ({ data, donate, handleModelClose }) => {
  const { userData, setUserData } = useContext(UserContext);
  const [disableBtn, setDisableBtn] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const amount = donate();

    if (amount.status === false) {
      return;
    } else {
      setDisableBtn(true);
      if (!stripe || !elements) {
        setDisableBtn(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);

      const { token, error } = await stripe.createToken(cardElement, {
        amount: amount.amount * 100,
      });

      if (error) {
        console.error(error);
        toast.error("Something went worng on server payment process");
        setDisableBtn(false);
      } else {
        const response = await payment(
          token.id,
          amount.amount,
          data._id,
          userData.id
        );
        // console.log();
        await toast.success("Sucessfully donated");
        await setDisableBtn(true);
        await handleModelClose();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <Button
        variant="contained"
        sx={{ background: "green", margin: "2rem 0 0 0" }}
        type="submit"
        disabled={disableBtn}
      >
        Donate
      </Button>
    </form>
  );
};

const PaymentComponent = ({ data, donate, handleModelClose }) => {
  return (
    <div>
      <h1 className="text-md font-medium cabin mb-4">Stripe</h1>
      <Elements stripe={stripePromise}>
        <PaymentForm
          data={data}
          donate={donate}
          handleModelClose={handleModelClose}
        />
      </Elements>
    </div>
  );
};

export default PaymentComponent;
