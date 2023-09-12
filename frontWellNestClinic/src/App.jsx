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
import ProtectedRoute from "./components/ProtectedRoute";
import DetailPage from "./pages/DetailPage.jsx/DetailPage";
import { AuthProvider } from "./Authenticator/AuthPro";
import DoctorsPage from "./pages/Doctors/DoctorsPage";
import { GoogleOAuthProvider } from '@react-oauth/google';
import PurchaseDetail from "./components/Pharmacy/PurchaseDetail/PurchaseDetail";
import ProductDetail from "./components/Pharmacy/ProductDetail/ProductDetail";


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
          path: "/doctors",
          element: <DoctorsPage></DoctorsPage>,
        },
        {
          path: "/purchase-detail",
          element: <PurchaseDetail></PurchaseDetail>,
        },
        {
          path: "/product/:id",
          element: <ProductDetail></ProductDetail>,
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
