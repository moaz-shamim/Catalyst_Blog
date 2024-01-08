import React from "react";
import authService from "../appwrite/authentiation";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authentication/authSlice";

export default function LogoutBtn() {

  const dispatch = useDispatch();

  const logoutHandler = () => {

    authService.logout().then(() => {
      dispatch(logout());
    });
    
  };

  return (
    <button
      onClick={logoutHandler}
      
    >
      Logout
    </button>
  );
}
