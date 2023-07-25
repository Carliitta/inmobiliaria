
import { useSelector } from 'react-redux';
import React from "react";
import { Navigate, Outlet } from "react-router-dom";


export default function PrivateRoute() {
  const user = JSON.parse(window.localStorage.getItem("user-log"));
 // console.log(user);
    if (!user) {
      return <Navigate to="/" />;
    }
  
  return <Outlet />;
  
  
}

