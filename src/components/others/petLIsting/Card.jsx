import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";
import getDate from "../../../utils/getDate";

export default function PetCard({ data }) {
  return (
    <Card className="text-2xl cabin">
      <img
        src={data.petimages[0]}
        alt={data.petname}
        className="w-full h-[20rem]"
      />
      <CardContent>
        <p>
          <span className="font-bold"> Pet name:</span> {data.petname}
        </p>
        <p>
          <span className="font-bold"> Pet location:</span> {data.petlocation}
        </p>
        <p>
          <span className="font-bold"> Pet age:</span> {data.petage}
        </p>
        <p>
          <span className="font-bold"> Pet category:</span> {data.petType}
        </p>
        <p>
          <span className="font-bold">Pet listing date:</span>{" "}
          {getDate(data.dateTime)}
        </p>
      </CardContent>
      <CardActions>
        <Link to={`/petdetails/${data._id}`} state={data}>
          <Button variant="outlined">Details</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
