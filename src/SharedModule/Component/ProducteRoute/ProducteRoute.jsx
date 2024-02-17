import React from "react";
import { Navigate } from "react-router-dom";

export default function ProducteRoute({ DataAdmin, children }) {
  if (DataAdmin == null && localStorage.getItem("tokemAdmin") == null) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}
