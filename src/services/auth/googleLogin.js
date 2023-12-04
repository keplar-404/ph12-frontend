import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseConfig";
import toast from "../../utils/toast";

const provider = new GoogleAuthProvider();

 const handleGoogleSignIn = (setUserData) => {
  signInWithPopup(auth, provider)
    .then((data) => {
      toast("Login successfull", true);
      // generate jwt token
    //   jwtGenerate(data.user.uid, data.user.email);
    //   setUserData({
    //     email: data.user.email,
    //     photo: data.user.photoURL,
    //   });
    })
    .catch((err) => {
      const error = err.message;
      const match = error.match(/\(auth\/(.+?)\)/);
      const message = match[1];
      toast(message, false);
    });
};

export default handleGoogleSignIn