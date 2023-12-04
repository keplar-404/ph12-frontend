import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  GithubAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import toast from "react-hot-toast";
import { axiosLoginUser, axiosRegisterUser, jwtGenerate } from "./axios/auth";

// google sign in
const goodleProvider = new GoogleAuthProvider();
export const handleGoogleSignIn = (setUserData) => {
  signInWithPopup(auth, goodleProvider)
    .then(async (data) => {
      toast.success("Login successfull");

      // check user is already exits to the data base
      const userIsExitsOrNot = await axiosLoginUser(
        data.user.uid,
        data.user.email,
        true
      );

      // if user does not exits than register user and login user
      if (typeof userIsExitsOrNot === typeof "user doesn't exits") {
        // register user to the database
        const registerUser = await axiosRegisterUser(
          data.user.displayName,
          data.user.email,
          data.user.uid,
          data.user.photoURL
        );
        const loginUser = await axiosLoginUser(
          registerUser.firebaseUid,
          registerUser.email
        );

        // Set user data in your application state
        setUserData({
          id: loginUser.user._id,
          email: loginUser.user.email,
          name: loginUser.user.name,
          role: loginUser.user.role,
          profilePic: data.user.photoURL,
        });
      } else {
        jwtGenerate(
          userIsExitsOrNot.user.firebaseUid,
          userIsExitsOrNot.user.email
        );
        setUserData({
          id: userIsExitsOrNot.user._id,
          email: userIsExitsOrNot.user.email,
          name: userIsExitsOrNot.user.name,
          role: userIsExitsOrNot.user.role,
          profilePic: data.user.photoURL,
        });
      }
    })
    .catch((err) => {
      const error = err.message;
      const match = error.match(/\(auth\/(.+?)\)/);
      const message = match[1];
      toast.error(message);
    });
};

// const handleFacebookLogin=()=>{
//   signInWithPopup(auth, facebookProvider).then((result)=>{

//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//     const credential = FacebookAuthProvider.credentialFromResult(result);
//     const accessToken = credential.accessToken;
//     // fetch facebook graph api to get user actual profile picture
//     fetch(`https://graph.facebook.com/${result.user.providerData[0].uid}/picture?type=large&access_token=${accessToken}`)
//     .then((response)=>response.blob())
//     .then((blob)=>{
//       // setProfilePicture(URL.createObjectURL(blob));
//       console.log(URL.createObjectURL(blob))
//     })
//   }).catch((err)=>{
//     console.log(err);
//   })
// }

// Facebook sign in
// const facebookProvider = new FacebookAuthProvider();

const github = new GithubAuthProvider();
export const handleGithubSignIn = async (setUserData) => {
  try {
    const data = await signInWithPopup(auth, github);

    // // Successful login
    toast.success("Login successfull");

    // check user is already exits to the data base
    const userIsExitsOrNot = await axiosLoginUser(
      data.user.uid,
      data.user.email,
      true
    );

    // if user does not exits than register user and login user
    if (typeof userIsExitsOrNot === typeof "user doesn't exits") {
      // register user to the database
      const registerUser = await axiosRegisterUser(
        data.user.displayName,
        data.user.email,
        data.user.uid,
        data.user.photoURL
      );
      const loginUser = await axiosLoginUser(
        registerUser.firebaseUid,
        registerUser.email
      );

      // Set user data in your application state
      setUserData({
        id: loginUser.user._id,
        email: loginUser.user.email,
        name: loginUser.user.name,
        role: loginUser.user.role,
        profilePic: data.user.photoURL,
      });
    } else {
      jwtGenerate(
        userIsExitsOrNot.user.firebaseUid,
        userIsExitsOrNot.user.email
      );
      setUserData({
        id: userIsExitsOrNot.user._id,
        email: userIsExitsOrNot.user.email,
        name: userIsExitsOrNot.user.name,
        role: userIsExitsOrNot.user.role,
        profilePic: data.user.photoURL,
      });
    }
  } catch (err) {
    // Handle errors
    const error = err.message;
    console.log(error);
    const match = error.match(/\(auth\/(.+?)\)/);
    const message = match ? match[1] : "An error occurred";
    toast.error(message);
  }
};
