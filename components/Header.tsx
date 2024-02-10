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
     p-3  mx-auto max-w-7xl   w-screen z-10 left-0 right-0 bg-filter backdrop-blur-xl bg-opacity-90 z-15 md:rounded-br-md h-16"
    >
      <div className="w-fill absolute mx-auto left-0 right-0 flex justify-center h-10 hover:animate-pulse cursor-pointer my-auto">
<div className="w-32">
      <img src="/justin.png" />
      </div>
        <RoundLogoSvg className="fill-white w-14 hover:fill-[#CC8470]  " />
        <div className="w-32">
        <img src="/waves.png" />
        </div>
      </div>
      
      <MenuButton />
      {/* <div className="w-72 my-auto">
          <img src="/JW__text-stencil-white.png" className="" />
        </div> */}
      <div className="hidden lg:flex relative items-center space-x-5  text-slate-200">
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
