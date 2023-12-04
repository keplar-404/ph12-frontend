import { useLocation, useNavigate } from "react-router-dom";
import RedirectUserTologinWraper from "../components/wraper/RedirectUserTologinWraper";
import { UserContext } from "../components/wraper/ContextWraper";
import { useContext } from "react";
import PetForm from "../components/shared/petForm";

export default function UpdatePet() {
  const navigate = useNavigate();
  const location = useLocation();
  const petData = location.state;
  const { userData, setUserData } = useContext(UserContext);

  return (
    <RedirectUserTologinWraper>
      <PetForm initialValues={petData} />
    </RedirectUserTologinWraper>
  );
}
