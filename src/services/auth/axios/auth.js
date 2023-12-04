import Cookies from "js-cookie";
import axios from "../../config";

export const axiosRegisterUser = async (name, email, uid, profilePic) => {
  const response = await axios.post("/register", {
    name,
    email,
    uid,
    profilePic
  });
  const userData = await response.data;
  return userData;
};

export const jwtGenerate = async (firebseUid, email) => {
  const responseJwt = await axios.post("/jwtgenerate", {
    id: firebseUid,
    email: email,
  });

  const { accessToken, refreshToken } = await responseJwt.data;

  Cookies.set("accessToken", accessToken);
  Cookies.set("refreshToken", refreshToken);
};

export const axiosLoginUser = async (firebseUid, email, socialLogin) => {
  // this if statement only for socail account creation or login
  if (socialLogin == true) {
    const response = await axios.post("/login", { firebseUid: firebseUid });
    return response.data;
  }

  // this code for normal password based login
  if (socialLogin == undefined) {
    const responseUser = await axios.post("/login", { firebseUid: firebseUid });
    jwtGenerate(firebseUid, email);
    const userData = await responseUser.data;
    return userData;
  }
};
