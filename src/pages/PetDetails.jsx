import React from "react";
import { useLocation } from "react-router-dom";
import RedirectUserTologinWraper from "../components/wraper/RedirectUserTologinWraper";
import getDate from "../utils/getDate";
import AdoptdModal from "../components/others/petLIsting/Model";

export default function PetDetails() {
  const { state } = useLocation();
  const data = state;

  return (
    <RedirectUserTologinWraper>
      <div className="flex-center mt-[5rem]">
        <div className="responsive flex justify-center items-center flex-col text-xl">
          <img
            src={data.petimages[0]}
            alt={data.petname}
            className="w-[35rem] h-auto"
          />

          <p className="mt-[5rem]">
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
            <span className="font-bold"> Short description:</span>{" "}
            {data.shortDescription}
          </p>
          <p>
            <span className="font-bold"> Long description:</span>{" "}
            {data.longDescription}
          </p>
          <p>
            <span className="font-bold">Pet listing date:</span>{" "}
            {getDate(data.dateTime)}
          </p>
          <div className="m-[2rem]">
            <AdoptdModal data={data} />
          </div>
        </div>
      </div>
    </RedirectUserTologinWraper>
  );
}
