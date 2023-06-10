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
     p-3  mx-auto max-w-7xl  bg-black w-screen z-10 left-0 right-0 bg-filter backdrop-blur-xl bg-opacity-90 z-15 md:rounded-br-md"
    >
      <div className="w-fill- absolute mx-auto left-0 right-0 flex justify-center">
        <h1 className="text-white font-thin text-md pr-3 mt-4">JUSTIN</h1>
        <Link href="/" className="">
          <RoundLogoSvg className="fill-sky-100 w-14   hover:fill-sky-300 hover:animate-pulse cursor-pointer"/>
        </Link>
        <h1 className="text-white font-thin text-md pl-3 mt-4">WAVES</h1>
      </div>
      <MenuButton />
      <div className="hidden lg:flex relative items-center space-x-5  text-slate-200">
        <a href="https://www.instagram.com/justinwaves/" target="_blank">
          <InstagramIcon fontSize="large" />
        </a>
        <a href="https://soundcloud.com/justinwaves" target="_blank">
          <PianoIcon fontSize="large" />
        </a>
      </div>
    </header>
  );
}

export default Header;
