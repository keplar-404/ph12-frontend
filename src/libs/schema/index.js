import * as Yup from "yup";

export const registerFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-z]/, "Password must include at least one lowercase letter")
    .matches(/[A-Z]/, "Password must include at least one uppercase letter")
    .matches(/\d/, "Password must include at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must include at least one special character"
    )
    .required("Password is required"),
});

export const loginFormSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const addPetSchema = Yup.object().shape({
  petname: Yup.string().required("Name is required"),
  petage: Yup.number().required(
    "Age of the pet must required and should be a number"
  ),
  petType: Yup.string().required("Category is required"),
  petlocation: Yup.string().required("Location is required"),
  shortDescription: Yup.string()
    .min(15, "Atleast include 15 letters")
    .required("Short description is required"),
  longDescription: Yup.string()
    .min(40, "Atleast include 40 letters")
    .required("Long description is required"),
});

export const addDoationSchema = Yup.object().shape({
  petname: Yup.string().required("Name is required"),
  maximumDonationAmount: Yup.number().required(
    "Maximum donation amount is required"
  ),
  highestAmountUserCanDonate: Yup.number().required(
    "Highest Amount User Can Donate is required"
  ),
  lastDateOfDonation: Yup.date().required("Last Date Of Donation is required"),
  shortDescription: Yup.string()
    .min(15, "Atleast include 15 letters")
    .required("Short description is required"),
  longDescription: Yup.string()
    .min(40, "Atleast include 40 letters")
    .required("Long description is required"),
});

export const petAdoptionSchema = Yup.object().shape({
  phone: Yup.number().required("Name is required"),
  location: Yup.string().required("Name is required"),
});
