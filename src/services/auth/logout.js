import toast from "react-hot-toast";
import { auth } from "./firebaseConfig";
import Cookies from "js-cookie";
import { signOut } from "firebase/auth";

const logoutUser = (setUserData) => {
  signOut(auth)
    .then(() => {
      setUserData(null);
      toast.success("Log out successfully");
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
    })
    .catch((err) => toast.error(err.message));
};

export default logoutUser;
