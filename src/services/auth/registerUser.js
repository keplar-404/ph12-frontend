import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebaseConfig";
import photoUpload from "../api/uploadPhoto";
import toast from "react-hot-toast";
import { axiosRegisterUser } from "./axios/auth";

const register = async (name, email, password, photo, action) => {
  try {
    // Create the user account
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = await userCredential.user;

    // Update the user's photoURL
    const photoURL = await photoUpload(photo);
    if (photoURL === null) {
      toast.error(
        "Photo was not successfully uploaded try it from your dashboard"
      );
    } else {
      await updateProfile(user, { photoURL });
    }

    // register user to the database
    await axiosRegisterUser(name, user.email, user.uid, photoURL);

    // Success
    toast.success("Registered successfully. Please log in.");
    // reset form
    await action.resetForm();
  } catch (err) {
    const error = err.message;
    const match = error.match(/\(auth\/(.+?)\)/);
    const message = match[1];
    toast.error(message);
  }
};

export default register;
