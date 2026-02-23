// src/components/ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user } = useContext(AuthContext);
  const params = useParams();

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  // Optional: enforce province match for customers/rdc_staff
  if ((user.role === "customer" || user.role === "rdc_staff") && params.province) {
    const routeProv = params.province.replace(/-/g,' ').toLowerCase();
    const userProv = (user.province || "").toLowerCase();
    if (userProv && routeProv !== userProv) return <Navigate to="/login" replace />;
  }

  return children;
}

