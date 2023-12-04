import { useLocation, useNavigate } from "react-router-dom";
import RedirectUserTologinWraper from "../components/wraper/RedirectUserTologinWraper";
import { UserContext } from "../components/wraper/ContextWraper";
import { useContext } from "react";
import PetForm from "../components/shared/petForm";
import DonationForm from "../components/shared/DonationForm";

export default function UpdateDonationCampaign() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const { userData, setUserData } = useContext(UserContext);

  return (
    <RedirectUserTologinWraper>
      <DonationForm initialValues={data} />
    </RedirectUserTologinWraper>
  );
}
