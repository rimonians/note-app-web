import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicOutlet = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
};

export default PublicOutlet;
