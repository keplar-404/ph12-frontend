import { useContext, useRef, useState } from "react";
import { UserContext } from "../wraper/ContextWraper";
import { addPet, updatePet } from "../../services/api/axios/axios";
import { useFormik } from "formik";
import InputField from "./InputField";
import Textarea from "./Textarea";
import OptionComponent from "./Options";
import { addPetSchema } from "../../libs/schema";
import { handleFileValidation } from "../../utils/validation";

export default function PetForm({ initialValues }) {
  const [isSubmitting, setIsSubmittiong] = useState(false);
  const photo = useRef("");
  const { userData, setUserData } = useContext(UserContext);

  const onSubmit = async (value, action) => {
    const Photo = photo.current.files[0] || null;
    setIsSubmittiong(true);

    // call update api if initial value exits
    if (initialValues) {
      // update initialValues from the value which is given by formik
      for (const key in value) {
        if (initialValues.hasOwnProperty(key)) {
          initialValues[key] = value[key];
        }
      }
      await updatePet(initialValues, Photo);
      await setIsSubmittiong(false);
      return;
    }
    await addPet(value, userData?.id, Photo);
    await setIsSubmittiong(false);
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        petname: initialValues?.petname || "",
        petage: initialValues?.petage || "",
        petType: initialValues?.petType || "",
        petlocation: initialValues?.petlocation || "",
        shortDescription: initialValues?.shortDescription || "",
        longDescription: initialValues?.longDescription || "",
      },
      validationSchema: addPetSchema,
      // then handleSubmit will be call onSubmit func
      onSubmit,
    });

  const inputField = [
    {
      id: "petname",
      type: "text",
      errors: errors.petname,
      placeholder: "Pet name",
      values: values.petname,
      touched: touched.petname,
    },
    {
      id: "petage",
      type: "number",
      errors: errors.petage,
      placeholder: "Pet age",
      values: values.petage,
      touched: touched.petage,
    },
    {
      id: "petlocation",
      type: "text",
      errors: errors.petlocation,
      placeholder: "Pet location",
      values: values.petlocation,
      touched: touched.petlocation,
    },
    {
      id: "shortDescription",
      type: "text",
      errors: errors.shortDescription,
      placeholder: "short description",
      values: values.shortDescription,
      touched: touched.shortDescription,
    },
  ];

  const options = [
    { value: "dog", label: "Dog" },
    { value: "cat", label: "Cat" },
    { value: "bird", label: "Bird" },
    { value: "rabbit", label: "Rabbit" },
  ];

  return (
    <>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="mx-auto h-screen mb-0 mt-8 max-w-md space-y-4"
      >
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

        <Textarea
          id="longDescription"
          touched={touched.longDescription}
          handleBlur={handleBlur}
          errors={errors.longDescription}
          placeholder="Long description"
          handleChange={handleChange}
          values={values.longDescription}
          options={options}
        />
        <OptionComponent
          id="petType"
          touched={touched.petType}
          handleBlur={handleBlur}
          errors={errors.petType}
          placeholder="Select pet category"
          handleChange={handleChange}
          value={values.petType}
          options={options}
        />

        <div>
          <input
            type="file"
            className="relative m-0 block w-full min-w-0 flex-auto rounded bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-black transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none file:bg-white"
            ref={photo}
            required={!initialValues && true}
            onChange={(event) => handleFileValidation(event)}
          />
        </div>

        <button
          type="submit"
          className="btn disabled:cursor-wait disabled:opacity-[70%]"
          disabled={isSubmitting === true ? true : false}
        >
          submit
        </button>
      </form>
    </>
  );
}
