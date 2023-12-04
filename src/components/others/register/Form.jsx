import InputField from "../../shared/InputField";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { registerFormSchema } from "../../../libs/schema";
import register from "../../../services/auth/registerUser";
import { useEffect, useRef, useState } from "react";
import { handleFileValidation } from "../../../utils/validation";

export default function Form() {
  const [isSubmitting, setIsSubmittiong] = useState(false);
  const photo = useRef("");

  const onSubmit = async (value, action) => {
    const Photo = photo.current.files[0];
    // await new Promise ((resolve)=> setTimeout(resolve, 1000))
    setIsSubmittiong(true);
    await register(value.name, value.email, value.password, Photo, action);
    await setIsSubmittiong(false);
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: registerFormSchema,
      onSubmit,
    });

  const inputField = [
    {
      id: "name",
      type: "text",
      errors: errors.name,
      placeholder: "Full name",
      values: values.name,
      touched: touched.name,
    },
    {
      id: "email",
      type: "email",
      errors: errors.email,
      placeholder: "Email",
      values: values.email,
      touched: touched.email,
    },
    {
      id: "password",
      type: "password",
      errors: errors.password,
      placeholder: "Password",
      values: values.password,
      touched: touched.password,
    },
  ];

  return (
    <>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
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

        <div>
          <input
            id="img"
            type="file"
            className="relative m-0 block w-full min-w-0 flex-auto rounded bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-black transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none file:bg-white"
            ref={photo}
            required={true}
            onChange={(event) => handleFileValidation(event)}
          />
        </div>
        <div className="flex items-center justify-between cabin">
          <p className="text-sm text-gray-500">
            Already have account?
            <Link to={"/login"} className="underline ml-3" href="">
              Login
            </Link>
          </p>

          <button
            type="submit"
            className="btn disabled:cursor-wait disabled:opacity-[70%]"
            disabled={isSubmitting === true ? true : false}
          >
            submit
          </button>
        </div>
      </form>
    </>
  );
}
