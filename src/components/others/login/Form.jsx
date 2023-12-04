import InputField from "../../shared/InputField";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { loginFormSchema } from "../../../libs/schema";
import { useContext, useState } from "react";
import login from "../../../services/auth/firebaseLogin";
import { UserContext } from "../../wraper/ContextWraper";

export default function Form() {
  const [isSubmitting, setIsSubmittiong] = useState(false);
  const { userData, setUserData } = useContext(UserContext);
  
  const onSubmit = async(value, action) => {
   
    setIsSubmittiong(true);
    await login(value.email, value.password, setUserData);
    await setIsSubmittiong(false);
  };

  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginFormSchema,
      onSubmit,
    });

  const inputField = [
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

        <div className="flex items-center justify-between cabin">
          <p className="text-sm text-gray-500">
            No account?
            <Link to={"/register"} className="underline ml-3" href="">
              Sign up
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
