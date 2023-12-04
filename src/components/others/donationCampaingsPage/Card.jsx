import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import getDate from "../../../utils/getDate";

export default function DonationCampaingCard({ data }) {
  const getAmount = () => {
    if (data.donations.length === 0) {
      return 0;
    } else if (data.donations.length > 0) {
      const donationsAmount = data.donations.map((data) => data.amount);
      const sum = donationsAmount.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
      return sum;
    }
  };

  const donationsAmount = getAmount();

  return (
    <>
      <Card className="text-2xl cabin">
        <img
          src={data?.petimage}
          alt={data?.petname}
          className="w-full h-[25rem]"
        />
        <CardContent>
          <p>
            <span className="font-bold"> Pet name:</span> {data?.petname}
          </p>
          <p>
            <span className="font-bold">Maximum Donation Amount:</span>{" "}
            {data?.maximumDonationAmount}
          </p>
          <p>
            <span className="font-bold">Donated amount:</span> {donationsAmount}
          </p>
          <p>
            <span className="font-bold">Donation campaign creation date:</span>{" "}
            {getDate(data?.donationCreationTime)}
          </p>
          <p>
            <span className="font-bold">Last data for donation:</span>{" "}
            {getDate(data?.lastDateOfDonation)}
          </p>
        </CardContent>
        <CardActions>
          <Link to={`/donationcampaigndetails/${data?._id}`} state={data}>
            <Button variant="outlined">Details</Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
}
