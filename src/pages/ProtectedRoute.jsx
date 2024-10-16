import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ component: Component }) => {
  const { user } = useContext(AuthContext);
  return user ? <Component /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
