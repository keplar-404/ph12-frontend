// react router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// components
import LayoutMain from "./pages/layout/MainLayout";
import Home from "./pages/Home";
import DonationsCampaign from "./pages/DonationsCampaign";
import PetListing from "./pages/PetListing";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UpdatePet from "./pages/updatePet";
import UpdateDonationCampaign from "./pages/UpdateDonationCampaign";
import PetDetails from "./pages/PetDetails";
import DonationCampaignDetails from "./pages/DonationCampaignDetails";
import Admindashboard from "./pages/Admindashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutMain />,
    errorElement: (
      <div className="bg-white w-full h-screen flex justify-center items-center">
        <p className="text-[3rem] font-medium">
          <span className="text-red-700">404</span> page not found
        </p>
      </div>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/petlist",
        element: <PetListing />,
      },
      {
        path: "/donations",
        element: <DonationsCampaign />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/:id",
        element: <Dashboard />,
      },
      {
        path: "/admin",
        element: <Admindashboard />,
      },
      {
        path: "/updatepet/:id",
        element: <UpdatePet />,
      },
      {
        path: "/updatedonationcampaign/:id",
        element: <UpdateDonationCampaign />,
      },
      {
        path: "/petdetails/:id",
        element: <PetDetails />,
      },
      {
        path: "/donationcampaigndetails/:id",
        element: <DonationCampaignDetails />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
