import toast from "react-hot-toast";
import axios from "../../config";
import photoUpload from "../uploadPhoto";
import Cookies from "js-cookie";

export const addPet = async (data, id, photo) => {
  // create pet to the data base
  const response = await axios.post("/addpet", {
    petname: data.petname,
    petlocation: data.petlocation,
    petage: data.petage,
    petType: data.petType,
    ownerId: id,
    shortDescription: data.shortDescription,
    longDescription: data.longDescription,
  });

  //   get new createde pet data
  const newCreatedPetData = await response.data;

  if (newCreatedPetData.message == "Petname is already taken") {
    toast.error("Pet name already taken");
    return;
  }

  //   set token to cookies
  Cookies.set("accessToken", newCreatedPetData.accessToken);
  Cookies.set("refreshToken", newCreatedPetData.refreshToken);

  //   upload image to the firebase file store
  // if (photo !== null) {
  const photoUrl = await photoUpload(photo);
  //   update the pet info
  const pet = await axios.post("/update", {
    _id: newCreatedPetData.pet._id,
    petimages: [photoUrl],
  });
  // }

  toast.success("Successfully pet added");
};

export const getPetDataByUser = async (id, setPetsData) => {
  const { data } = await axios.post("/getuserpets", { id: id });
  await setPetsData(data.pets);
  //  console.log(data.pets)
};

export const updatePet = async (data, photo) => {
  const response = await axios.post("/update", data);
  const newUpdatedPetData = await response.data;

  //   set token to cookies
  Cookies.set("accessToken", newUpdatedPetData.accessToken);
  Cookies.set("refreshToken", newUpdatedPetData.refreshToken);

  //   upload image to the firebase file store
  if (photo !== null) {
    const photoUrl = await photoUpload(photo);
    //   update the pet info

    const pet = await axios.post("/updatepetimg", {
      _id: newUpdatedPetData.pet._id,
      petimages: [photoUrl],
    });
    // console.log(pet.data);
  }

  toast.success("Successfully pet updated");
};

export const deletePetByUser = async (data) => {
  const response = await axios.post("/deletepetbyuser", data);
  toast.success("Pet deleted successfull");
};

export const updateAdoptedStatus = async (data) => {
  const a = await axios.post("/updateadoptionstatus", data);
  //  console.log()
  if (a.data.message === "No adoption requests found for this pet") {
    toast.error(a.data.message);
  } else {
    toast.success(a.data.message);
  }
};

export const removeAdoptionStatus = async (_id) => {
  const { data } = await axios.post("/removeadoptionstatus", { _id });
  return data.message;
};

export const acceptOrRejectReqPet = async (_data, status) => {
  const { data } = await axios.post("/petreqstatusupdate", {
    petId: _data.petId,
    status: status,
    requestedUserId: _data.requestedUserId,
    phone: _data.phone,
    requserlocation: _data.requserlocation,
    requsername: _data.requsername,
  });
  return data.message;
};

export const addDonation = async (data, id, photo) => {
  // upload photo to the cloud
  const photoUrl = await photoUpload(photo);

  // create pet to the data base
  const response = await axios.post("/donationadd", {
    petname: data.petname,
    ownerId: id,
    shortDescription: data.shortDescription,
    longDescription: data.longDescription,
    petimage: photoUrl,
    maximumDonationAmount: data.maximumDonationAmount,
    highestAmountUserCanDonate: data.highestAmountUserCanDonate,
    lastDateOfDonation: data.lastDateOfDonation,
  });

  //   get new createde pet data
  const newCreatedDoantionData = await response.data;

  //   set token to cookies
  Cookies.set("accessToken", newCreatedDoantionData.accessToken);
  Cookies.set("refreshToken", newCreatedDoantionData.refreshToken);

  toast.success("Successfully Donation campaign created");
};

export const delDonationByAdmin = async (_id) => {
  const { data } = await axios.post("/deldonactioncampaingbyadmin", { _id });
  toast.success("Campaign deleted successfull");
  return data;
};

export const updateDonaton = async (data, photo) => {
  if (photo !== null) {
    photo = await photoUpload(photo);
    data.petimage = photo;
  }

  const response = await axios.post("/donationupdate", data);
  const newUpdatedDonationData = await response.data;

  //   set token to cookies
  Cookies.set("accessToken", newUpdatedDonationData.accessToken);
  Cookies.set("refreshToken", newUpdatedDonationData.refreshToken);

  toast.success("Successfully pet updated");
};

export const getDonationCampaignsDataByUser = async (
  id,
  setDonationsCampaignData
) => {
  const { data } = await axios.post("/getuserdonationcampaign", { id: id });
  await setDonationsCampaignData(data.donations);
  //  console.log(data.pets)
};

export const pauseOrUnpause = async (data) => {
  axios.post("/pauseorunpausedonationcampaigns", data);
};

export const getUserDonations = async (userId, setDonationsData) => {
  const { data } = await axios.post("/getuserdonations", { id: userId });

  setDonationsData(data.donations);
};

export const refund = async (userId, data, donationID) => {
  await axios.post("/refund", {
    userId: userId,
    donationCampaignId: data._id,
    donationID: donationID,
  });
};

//
export const getAll = async () => {
  const { data } = await axios.get("/getall");
  return data;
};

export const adptionReq = async (_data) => {
  const { data } = await axios.post("/addreqpetadoption", _data);
  return data;
};

export const payment = async (token, amount, _id, userId) => {
  const { data } = await axios.post("/payment", {
    token,
    amount,
    _id,
    userId,
  });
  return data;
};

export const getReqPetForUser = async (id) => {
  const { data } = await axios.post("/reqadoption", { userId: id });
  return data;
};
