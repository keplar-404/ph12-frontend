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
      <div class="bg-gray-200 w-full px-16 md:px-0 h-screen flex items-center justify-center">
        <div class="bg-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
          <p class="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">
            404
          </p>
          <p class="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">
            Page Not Found
          </p>
          <p class="text-gray-500 mt-4 pb-4 border-b-2 text-center">
            Sorry, the page you are looking for could not be found.
          </p>
        </div>
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
