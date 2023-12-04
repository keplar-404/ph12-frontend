import { useContext, useState } from "react";
import { UserContext } from "../../wraper/ContextWraper";
import { useFormik } from "formik";
import InputField from "../../shared/InputField";
import { petAdoptionSchema } from "../../../libs/schema/index";
import { adptionReq } from "../../../services/api/axios/axios";
import toast from "react-hot-toast";

export default function PetAdoptionForm({ petData, handleClose }) {
  const [isSubmitting, setIsSubmittiong] = useState(false);
  const { userData, setUserData } = useContext(UserContext);

  const onSubmit = async (value, action) => {
    setIsSubmittiong(true);

    // call api here

    const dataToSend = {
      _id: petData._id,
      requestedUserId: userData.id,
      phone: value.phone,
      location: value.location,
    };

    await adptionReq(dataToSend);
    await setIsSubmittiong(false);
    await toast.success("Your request have been added");
    await handleClose()
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        location: "",
        phone: "",
      },
      validationSchema: petAdoptionSchema,
      // then handleSubmit will be call onSubmit func
      onSubmit,
    });

  const inputField = [
    {
      id: "location",
      type: "text",
      errors: errors.location,
      placeholder: "Your location",
      values: values.location,
      touched: touched.location,
    },
    {
      id: "phone",
      type: "number",
      errors: errors.phone,
      placeholder: "Phone/mobile number",
      values: values.phone,
      touched: touched.phone,
    },
  ];

  return (
    <>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <input
          type="text"
          value={userData.name}
          disabled={true}
          className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm outline-none border text-gray-500 bg-gray-200"
        />
        <input
          type="text"
          value={userData.email}
          disabled={true}
          className="w-full rounded-lg p-4 pe-12 text-sm shadow-sm outline-none border text-gray-500 bg-gray-200"
        />

        {inputField.map((data, index) => (
          <InputField
            key={index}
            id={data.id}
            type={data.type}
            errors={data.errors}
            placeholder={data.placeholder}
            values={data.values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            touched={data.touched}
          />
        ))}
        <button
          type="submit"
          className="btn disabled:cursor-wait disabled:opacity-[70%] mt-6"
          disabled={isSubmitting === true ? true : false}
        >
          submit
        </button>
      </form>
    </>
  );
}
