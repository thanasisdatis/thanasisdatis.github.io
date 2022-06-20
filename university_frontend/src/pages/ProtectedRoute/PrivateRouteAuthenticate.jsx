import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRouteAuthenticate({ auth }) {
  useEffect(() => {}, []);
  return auth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRouteAuthenticate;
