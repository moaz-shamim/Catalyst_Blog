import React from "react";
import logo from "../assets/brand.png";

function Logo({ width = "175px" }) {
  return <img width="175px" src={logo} alt="logo" />;
}

export default Logo;
