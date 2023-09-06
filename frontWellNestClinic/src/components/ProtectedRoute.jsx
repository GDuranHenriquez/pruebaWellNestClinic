// import React from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ children }) => {
//   const user = userSelector((state) => state.user);
//   let location = useLocation();

//   if (!user.state.isAuthenticated) {
//     return <Navigate to="/" state={{ from: location }} replace />;
//   }
//   return children;
// };

// export default ProtectedRoute;
