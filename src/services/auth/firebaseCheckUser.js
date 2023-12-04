import { onAuthStateChanged } from "firebase/auth";
import { axiosLoginUser } from "./axios/auth";
import { auth } from "./firebaseConfig";

const checkUser = (setUserData) => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userData = await axiosLoginUser(user.uid, user.email);

      await setUserData({
        id: userData.user._id,
        email: userData.user.email,
        name: userData.user.name,
        role: userData.user.role,
        profilePic: user.photoURL,
      });
    } else {
      setUserData(null);
    }
  });
};

export default checkUser;
