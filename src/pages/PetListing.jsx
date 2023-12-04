import React, { useEffect, useState } from "react";
import { getAll } from "../services/api/axios/axios";
import Select from "react-select";
import PetCard from "../components/others/petLIsting/Card";
import { useLocation } from "react-router-dom";

let allPetsData = [];
let selectData = "";
let searchData = "";
export default function PetListing() {
  const [petsData, setPetsData] = useState("loading");
  const location = useLocation();
  const data = location.state;

  const getData = async () => {
    const _data = await getAll();
    const petsData = _data.pets.filter(
      (data) => data?.adopted?.status === false
    );

    if (data !== null) {
      const re = petsData.filter((_data) => _data.petType == data);
      // console.log(re)
      setPetsData(re);
      return;
    }

    await setPetsData(petsData);
    allPetsData = petsData;
    return;
  };

  useEffect(() => {
    getData();
  }, []);

  const options = [
    { value: "all", label: "All" },
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "bird", label: "Bird" },
    { value: "rabbit", label: "Rabbit" },
  ];

  const changeSelectData = (option) => {
    selectData = option.value;

    if (searchData === "") {
      if (selectData === "all") {
        setPetsData(allPetsData);
        return;
      }

      const result = allPetsData.filter(
        (_data) => _data.petType === selectData
      );
      setPetsData(result);
      return;
    } else {
      const result = allPetsData.filter((_data) =>
        _data.petname.includes(searchData)
      );

      if (selectData === "all") {
        setPetsData(result);
        return;
      }

      const finalresult = result.filter(
        (_data) => _data.petType === selectData
      );
      setPetsData(finalresult);
    }
  };

  const changeSeachData = (option) => {
    searchData = option.target.value;

    if (selectData === "" || selectData === "all") {
      if (searchData === "") {
        setPetsData(allPetsData);
        return;
      }

      const result = allPetsData.filter((_data) =>
        _data.petname.includes(searchData)
      );

      setPetsData(result);
      return;
    } else {
      const result = allPetsData.filter(
        (_data) => _data.petType === selectData
      );

      const finalresult = result.filter((_data) =>
        _data.petname.includes(searchData)
      );
      setPetsData(finalresult);
    }
  };

  if (petsData === "loading") {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <p className="text-2xl balboo">
          Please kindly wait for 20 sec we are delevering your content
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="flex-center mt-7">
        <div className="responsive">
          <div className="flex w-full justify-center items-center gap-10">
            <Select
              options={options}
              placeholder={"Category..."}
              className="w-[10rem]"
              onChange={changeSelectData}
            />

            <input
              type="search"
              onChange={changeSeachData}
              className=" rounded-lg p-4 pe-12 text-sm shadow-sm outline-none border"
              placeholder="Seach..."
            />
          </div>

          {petsData.length === 0 ? (
            <>
              <div className="w-full h-screen flex justify-center items-center">
                <p className="text-2xl balboo">No pets data found</p>
              </div>
            </>
          ) : (
            <>
              {/* <div className="w-full"> */}
              <div className="mt-[5rem] w-full mb-4 place-content-center grid  grid-cols-3 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {petsData
                  .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
                  .map((data, index) => (
                    <div key={index}>
                      <PetCard data={data} />
                    </div>
                  ))}
              </div>
              {/* </div> */}
            </>
          )}
        </div>
      </div>
    </>
  );
}
