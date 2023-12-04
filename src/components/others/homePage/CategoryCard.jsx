import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ name, fetchDataName, img }) {
  return (
    <>
      <section className="w-[15.375rem] relative group">
        <Link to={"/petlist"} state={fetchDataName}>
          <div className="w-full absolute bg-black opacity-[30%] rounded-[0.75rem] h-[12.9375rem] group-hover:block group-hover:cursor-pointer hidden"></div>
          <img
            src={img}
            alt={fetchDataName}
            className="group-hover:cursor-pointer"
          />
          <p className="category-card-title mt-[0.38rem] group-hover:cursor-pointer">
            {name}
          </p>
        </Link>
      </section>
    </>
  );
}
