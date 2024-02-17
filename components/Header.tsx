import React, { useEffect, useState } from "react";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import PianoIcon from "@mui/icons-material/Piano";
import MenuButton from "./NavBarItems";
import RoundLogoSvg from "./RoundLogoSvg";

function Header() {
  const [show, handleShow] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 400) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <header
      className={`flex justify-between fixed 
     p-3  mx-auto   w-screen z-10 left-0 right-0  md:rounded-br-md h-16 ${
       show && "bg-black bg-filter backdrop-blur-xl blur-sm bg-opacity-20  "
     } transition-all duration-500`}
    >
     


    </header>
  );
}

export default Header;
