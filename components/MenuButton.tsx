import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from '@mui/icons-material/YouTube';

const MenuButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center px-3 py-3 text-white  border border-[#FFFFFF]  rounded-xl hover:bg-[#CC8470] focus:outline-none focus:ring cursor-pointer z-99 transition-all duration-300"
        onClick={toggleMenu}
      >
        <MenuIcon fontSize="medium" />
      </button>
      <div
        className={`${
          isOpen ? "scale-y-100 " : "scale-y-0 "
        }  -left-3 origin-top-left absolute rounded-b-xl  w-96  shadow-lg bg-[#141C2F]  bg-filter backdrop-blur-xl bg-opacity-90 ring-1 ring-black ring-opacity-5 divide-y divide-gray-600 focus:outline-none transition-all duration-300`}
      >
        <div className="py-3 px-2">
          <Link href="/about">
            <p className="block px-4 py-4 text-xl font-thin text-white hover:bg-black hover:bg-opacity-25 hover:rounded-2xl hover:text-[#CC8470] cursor-pointer">
              🌊 - Story of Justin Waves
            </p>
          </Link>
          {/* <a
            href="#"
            className="block px-4 py-4 text-xl font-thin text-slate-300 hover:bg-black hover:bg-opacity-25 hover:rounded-2xl hover:text-sky-300 cursor-pointer"
          >
            💿 Releases
          </a> */}
          <a
            href="#"
            className="block px-4 py-4 text-xl font-thin text-white hover:bg-black hover:bg-opacity-25 hover:rounded-2xl hover:text-[#CC8470] cursor-pointer"
          >
            🎹 - JW Music Co <span className="text-sm text-red-300">(Coming Soon!)</span>
          </a>
        </div>
        <div className="py-3 px-2">
          <div className="px-3 py-3">
        <iframe className="lg:hidden" scrolling="no" style={{border: 0, width: "100%", height: 33}} src="https://bandcamp.com/band_follow_button_classic/1352604993"></iframe>
        </div>
        <a
            href="https://open.spotify.com/artist/13TnKCSQSOkWzKgK09wNzQ?si=PV0-1SB0Sc2NAPrR9-MntQ"
            className="block px-4 py-4 text-xl font-thin text-white hover:bg-black hover:bg-opacity-25 hover:rounded-2xl hover:text-[#CC8470] cursor-pointer"
            rel="noreferrer noopener"
            target="_blank"
          >
            <img src="Spotify_Logo_RGB_White.png" className="w-32"/>
          </a>
          <a
            href="https://music.apple.com/us/artist/justin-waves/1498973677"
            className="block px-4 py-4 text-xl font-thin text-white hover:bg-black hover:bg-opacity-25 hover:rounded-2xl hover:text-[#CC8470] cursor-pointer"
            rel="noreferrer noopener"
            target="_blank"
          >
            <img src="apple-music-logo.png" className="w-32"/>
          </a>
          <a
            href="https://www.tiktok.com/@justinwaves"
            className="block px-4 py-4 text-2xl font-thin text-white hover:bg-black hover:bg-opacity-25 hover:rounded-2xl hover:text-[#CC8470] cursor-pointer"
            rel="noreferrer noopener"
            target="_blank"
          >
            <div className="flex align-middle">
            <img src="tiktok-64.png" className="w-8 h-8 mr-2  "/> Tiktok</div>
          </a>
          <a
            href="https://www.instagram.com/justinwaves/"
            className="block px-4 py-4 text-2xl font-thin text-white hover:bg-black hover:bg-opacity-25 hover:rounded-2xl hover:text-[#CC8470] cursor-pointer"
            rel="noreferrer noopener"
            target="_blank"
          >
            <InstagramIcon className="text-3xl mb-1"/> Instagram
          </a>
     
          <a
            href="https://www.youtube.com/channel/UCTL59752f6PIWECN-fzONQA"
            className="block px-4 py-4 text-2xl font-thin text-white hover:bg-black hover:bg-opacity-25 hover:rounded-2xl hover:text-[#CC8470] cursor-pointer"
            rel="noreferrer noopener"
            target="_blank"
          >
            <YouTubeIcon className="text-3xl mb-1"/> YouTube
          </a>
          <a
            href="https://soundcloud.com/justinwaves"
            className="block px-4 py-4 text-2xl font-thin text-white hover:bg-black hover:bg-opacity-25 hover:rounded-2xl hover:text-[#CC8470] cursor-pointer"
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
