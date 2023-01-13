import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ role, children }) => {
  const user = useSelector((state) => state.User);

  if (!user) return <h1>Loading</h1>;

  if (user && !user.isAuth) return <Navigate to="/Login" />;

  if (role && user.role !== role) return <Navigate to="/Login" />;

  return children;
};

export default PrivateRoute;
