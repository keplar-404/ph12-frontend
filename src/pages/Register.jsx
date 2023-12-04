import React from "react";
import Form from "../components/others/register/Form";

export default function Register() {
  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl balboo">
              Get start today
            </h1>

            <p className="mt-4 text-gray-500 cabin">
              Create a new account and help the community to grow a world wide
              leading organization for helping pet animals.
            </p>
          </div>

          <Form />
        </div>
      </div>
    </>
  );
}
