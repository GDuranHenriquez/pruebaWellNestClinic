import LandingPage from "./components/LandingPage/LandingPage";
import HomePages from "./pages/Home/Home";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import CheckUser from "./components/CheckUser/CheckUser";
import Appointment from "./pages/Appointment/Appointment";
import MySchedulePage from "./pages/mySchedule/MySchedulePage";
import LoginPages from "./pages/Login/LoginPages";
import SignUp from "./pages/SignUp/SignUp";
import MyProfilePage from "./pages/MyProfile/MyProfilePage";
import "./App.css";
import MyPharmacyPage from "./pages/pharmacy/pharmacyPage";
import shoppingCartPage from "./pages/shoppingCart/shoppingCartPage";
import checkoutPage from "./pages/checkoutPage/checkoutPage";
import ProtectedRoute from "./components/ProtectedRoute";
// import DetailPage from "./pages/DetailPage.jsx/DetailPage";
import { AuthProvider } from "./Authenticator/AuthPro";
import DoctorsPage from "./pages/Doctors/DoctorsPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage></LandingPage>,
    },
    {
      path: "/sign-up",
      element: <SignUp></SignUp>,
    },
    {
      path: "/login",
      element: <LoginPages></LoginPages>,
    },
    {
      path: "/checkUser",
      element: <CheckUser></CheckUser>,
    },
    {
      path: "/",
      element: <ProtectedRoute></ProtectedRoute>,
      children: [
        {
          path: "/home",
          element: <HomePages></HomePages>,
        },
        {
          path: "/makeAppointment",
          element: <Appointment></Appointment>,
        },
        {
          path: "/appointments",
          element: <MySchedulePage></MySchedulePage>,
        },
        {
          path: "/my-profile",
          element: <MyProfilePage></MyProfilePage>,
        },
        {
          path: "/pharmacy",
          element: <MyPharmacyPage></MyPharmacyPage>,
        },
        {
          path: "/shoppingcart",
          element: <shoppingCartPage></shoppingCartPage>,
        },
        {
          path: "/checkout",
          element: <checkoutPage></checkoutPage>,
        },
        {
          path: "/doctors",
          element: <DoctorsPage></DoctorsPage>,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
}

export default App;
