import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from '@mui/icons-material/YouTube';
import RoundLogoSvg from "./RoundLogoSvg";

const MenuButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed left-2 w-screen  top-2 z-20">
      <button
        className="relative flex items-center justify-center px-3 py-3 text-white  border border-[#FFFFFF]  rounded-xl hover:bg-[#CC8470] focus:outline-none focus:ring cursor-pointer z-50 transition-all duration-300 md:ml-3 "
        onClick={toggleMenu}
      >
        {isOpen ?  (<CloseIcon fontSize="medium" />) :( <MenuIcon fontSize="medium" />) }
     
      </button>
      <div className="w-fill absolute left-0 right-0 top-2 mx-auto my-auto flex justify-center h-10 z-40  cursor-pointer ">
        <div className="w-24 md:w-32 my-auto">
          <img src="/justin.png" alt="" className="" />
        </div>
        <RoundLogoSvg className="fill-white w-14 hover:fill-[#CC8470]  " />
        <div className="w-24 md:w-32 my-auto">
          <img src="/waves.png" alt="" className="-ml-2" />
        </div>
      </div>
      {/* desktop only right menu items */}
      <div className="hidden lg:flex absolute right-7 top-2 items-center space-x-5  text-slate-200 z-40">
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
        <img src="/soundcloud-white-icon.png" alt="" className="w-12" />
        </a>
      </div>
      {/* Open Menu */}
      <div
        className={`${
          isOpen ? "block opacity-100 backdrop-blur-xl bg-black " : "hidden opacity-0 backdrop-blur-sm "
        }  -left-2 -top-14 pt-24 relative md:rounded-br-xl w-screen md:w-96   bg-filter  bg-opacity-20 border-white border-b-2 md:border-r-2 ring-1 ring-black ring-opacity-5 divide-y  focus:outline-none transition-all duration-300 z-10 `}
      >
        <div className="py-3 px-2">
          <Link href="/about">
            <p className="block px-4 py-4 text-xl font-thin text-white hover:bg-white hover:bg-opacity-25 hover:rounded-2xl  cursor-pointer">
              ABOUT
            </p>
          </Link>
          <a href="mailto:jwmusicco@gmail.com">
            <p className="block px-4 py-4 text-xl font-thin text-white hover:bg-white hover:bg-opacity-25 hover:rounded-2xl  cursor-pointer">
              CONTACT
            </p>
          </a>
          {/* <a
            href="#"
            className="block px-4 py-4 text-xl font-thin text-slate-300 hover:bg-black hover:bg-opacity-25 hover:rounded-2xl hover:text-sky-300 cursor-pointer"
          >
            💿 Releases
          </a> */}
          {/* <a
            href="#"
            className="block px-4 py-4 text-xl font-thin text-white hover:bg-black hover:bg-opacity-25 hover:rounded-2xl hover:text-[#CC8470] cursor-pointer"
          >
            🎹 - JW Music Co <span className="text-sm text-red-300">(Coming Soon!)</span>
          </a> */}
        </div>
        <div className="py-3 px-2">
          <div className="px-3 py-3">
        <iframe className="lg:hidden" scrolling="no" style={{border: 0, width: "100%", height: 33}} src="https://bandcamp.com/band_follow_button_classic/1352604993"></iframe>
        </div>
        <a
            href="https://open.spotify.com/artist/13TnKCSQSOkWzKgK09wNzQ?si=PV0-1SB0Sc2NAPrR9-MntQ"
            className="block px-4 py-4 text-xl font-thin text-white hover:bg-white hover:bg-opacity-25 hover:rounded-2xl  cursor-pointer"
            rel="noreferrer noopener"
            target="_blank"
          >
            <img src="Spotify_Logo_RGB_White.png" className="w-32"/>
          </a>
          <a
            href="https://music.apple.com/us/artist/justin-waves/1498973677"
            className="block px-4 py-4 text-xl font-thin text-white hover:bg-white hover:bg-opacity-25 hover:rounded-2xl  cursor-pointer"
            rel="noreferrer noopener"
            target="_blank"
          >
            <img src="apple-music-logo.png" className="w-32"/>
          </a>
          <a
            href="https://www.tiktok.com/@justinwaves"
            className="block px-4 py-4 text-2xl font-thin text-white hover:bg-white hover:bg-opacity-25 hover:rounded-2xl  cursor-pointer"
            rel="noreferrer noopener"
            target="_blank"
          >
            <div className="flex align-middle">
            <img src="tiktok-64.png" className="w-8 h-8 mr-2  "/> Tiktok</div>
          </a>
          <a
            href="https://www.instagram.com/justinwaves/"
            className="block px-4 py-4 text-2xl font-thin text-white hover:bg-white hover:bg-opacity-25 hover:rounded-2xl  cursor-pointer"
            rel="noreferrer noopener"
            target="_blank"
          >
            <InstagramIcon className="text-3xl mb-1"/> Instagram
          </a>
     
          <a
            href="https://www.youtube.com/channel/UCTL59752f6PIWECN-fzONQA"
            className="block px-4 py-4 text-2xl font-thin text-white hover:bg-white hover:bg-opacity-25 hover:rounded-2xl  cursor-pointer"
            rel="noreferrer noopener"
            target="_blank"
          >
            <YouTubeIcon className="text-3xl mb-1"/> YouTube
          </a>
          <a
            href="https://soundcloud.com/justinwaves"
            className="block px-4 py-4 text-2xl font-thin text-white hover:bg-white hover:bg-opacity-25 hover:rounded-2xl  cursor-pointer"
            rel="noreferrer noopener"
            target="_blank"
          >
            ☁️ Soundcloud
          </a>
        </div>
      </div>
    </div>
  );
};

export default MenuButton;
