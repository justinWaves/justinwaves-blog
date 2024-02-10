import React from "react";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import PianoIcon from "@mui/icons-material/Piano";
import MenuButton from "./MenuButton";
import RoundLogoSvg from "./RoundLogoSvg";

function Header() {
  return (
    <header
      className=" flex justify-between fixed 
     p-3  mx-auto   w-screen z-10 left-0 right-0 bg-filter backdrop-blur-xl bg-opacity-90 md:rounded-br-md h-16"
    >
         
      <div className="w-fill absolute left-0 right-0 top-4 mx-auto my-auto flex justify-center h-10  cursor-pointer ">
<div className="w-24 md:w-32 my-auto">
      <img src="/justin.png" alt="" className="" />
      </div>
        <RoundLogoSvg className="fill-white w-14 hover:fill-[#CC8470]  " />
        <div className="w-24 md:w-32 my-auto">
        <img src="/waves.png" alt="" className="-ml-2"/>
        </div>
      </div>
   
  

      <div className="hidden lg:flex absolute right-3 items-center space-x-5  text-slate-200">
        <iframe
          className="relative left-32"
          scrolling="no"
          style={{ border: 0, width: "100%", height: 33 }}
          src="https://bandcamp.com/band_follow_button_classic/1352604993"
        ></iframe>
        <a
          href="https://www.instagram.com/justinwaves/"
          target="_blank"
          className="cursor-pointer z-10"
        >
          <InstagramIcon fontSize="large" />
        </a>
        <a
          href="https://soundcloud.com/justinwaves"
          target="_blank"
          className="text-4xl cursor-pointer z-10"
        >
          ☁️
        </a>
      </div>
    </header>
  );
}

export default Header;
