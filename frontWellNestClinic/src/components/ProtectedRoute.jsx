import React, { useState } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import NavBar from "./NavBar/NavBar";
import { useAuth } from "../Authenticator/AuthPro";

const ProtectedRoute = ({ children }) => {
  const isAuth = useAuth();
  const { pathname } = useLocation();
  const noNavBar = ["/", "/checkUser", "/login", "/sign-up"];

  return (
    <>
      {isAuth.isAuthenticated && <NavBar />}
      {isAuth.isAuthenticated ? (
        <Outlet></Outlet>
      ) : (
        <Navigate to="/"></Navigate>
      )}
    </>
  );
};

export default ProtectedRoute;
