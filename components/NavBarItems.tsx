import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import RoundLogoSvg from "./RoundLogoSvg";
import AppleIcon from "@mui/icons-material/Apple";
import MailIcon from "@mui/icons-material/Mail";

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
        {isOpen ? (
          <CloseIcon fontSize="medium" />
        ) : (
          <MenuIcon fontSize="medium" />
        )}
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
      <div className="hidden lg:flex absolute right-7 top-2 items-center space-x-5  z-40">
        <a
          href="https://open.spotify.com/artist/13TnKCSQSOkWzKgK09wNzQ?si=PV0-1SB0Sc2NAPrR9-MntQ"
          className="pt-1  text-white cursor-pointer"
          rel="noreferrer noopener"
          target="_blank"
        >
          <svg
            className="w-8 fill-white hover:fill-[#CC8470]"
            xmlns="http://www.w3.org/2000/svg"
            shape-rendering="geometricPrecision"
            text-rendering="geometricPrecision"
            image-rendering="optimizeQuality"
            fill-rule="evenodd"
            clip-rule="evenodd"
            viewBox="0 0 512 511.991"
          >
            <path
              fill-rule="nonzero"
              d="M255.998.003C114.616.003 0 114.616 0 255.997c0 141.385 114.616 255.994 255.998 255.994C397.395 511.991 512 397.386 512 255.997 512 114.624 397.395.015 255.994.015l.004-.015v.003zm117.4 369.22c-4.585 7.519-14.427 9.908-21.949 5.288-60.104-36.714-135.771-45.027-224.882-24.668-8.587 1.954-17.146-3.425-19.104-12.015-1.967-8.591 3.394-17.15 12.003-19.104 97.518-22.28 181.164-12.688 248.645 28.55 7.522 4.616 9.907 14.427 5.288 21.95l-.001-.001zm31.335-69.703c-5.779 9.389-18.067 12.353-27.452 6.578-68.813-42.298-173.703-54.548-255.096-29.837-10.556 3.187-21.704-2.761-24.906-13.298-3.18-10.556 2.772-21.68 13.309-24.891 92.971-28.208 208.551-14.546 287.574 34.015 9.385 5.779 12.35 18.067 6.575 27.441v-.004l-.004-.004zm2.692-72.584c-82.511-49.006-218.635-53.51-297.409-29.603-12.649 3.837-26.027-3.302-29.86-15.955-3.832-12.656 3.303-26.023 15.96-29.867 90.428-27.452 240.753-22.149 335.747 34.245 11.401 6.754 15.133 21.446 8.375 32.809-6.728 11.378-21.462 15.13-32.802 8.371h-.011z"
            />
          </svg>
        </a>
        <a
          href="https://music.apple.com/us/artist/justin-waves/1498973677"
          className=" text-2xl font-thin text-white  cursor-pointer"
          rel="noreferrer noopener"
          target="_blank"
        >
          {" "}
          <AppleIcon
            fontSize="large"
            className="text-white hover:text-[#CC8470]"
          />
        </a>
        <a
          href="https://www.instagram.com/justinwaves/"
          target="_blank"
          className="cursor-pointer z-10 "
        >
          <InstagramIcon
            fontSize="large"
            className="mt-1 text-white hover:text-[#CC8470]"
          />
        </a>
        <a
          href="https://www.tiktok.com/@justinwaves"
          className="text-2xl font-thin text-white cursor-pointer"
          rel="noreferrer noopener"
          target="_blank"
        >
          <svg
            className="w-7 fill-white hover:fill-[#CC8470]"
            xmlns="http://www.w3.org/2000/svg"
            shape-rendering="geometricPrecision"
            text-rendering="geometricPrecision"
            image-rendering="optimizeQuality"
            fill-rule="evenodd"
            clip-rule="evenodd"
            viewBox="0 0 447 512.57"
          >
            <path
              fill-rule="nonzero"
              d="M380.23 102.74c-27.61-18-47.53-46.81-53.75-80.38-1.34-7.25-2.09-14.72-2.09-22.36h-88.12l-.14 353.16c-1.48 39.55-34.03 71.29-73.93 71.29-12.4 0-24.08-3.1-34.36-8.51-23.58-12.41-39.72-37.12-39.72-65.56 0-40.85 33.24-74.08 74.07-74.08 7.63 0 14.94 1.26 21.86 3.42v-89.96c-7.16-.98-14.44-1.58-21.86-1.58C72.76 188.18 0 260.93 0 350.38c0 54.87 27.41 103.43 69.25 132.8 26.34 18.5 58.39 29.39 92.95 29.39 89.44 0 162.2-72.76 162.2-162.19l-.01-179.09c34.56 24.81 76.92 39.42 122.61 39.42v-88.12c-24.61 0-47.53-7.31-66.77-19.85z"
            />
          </svg>
        </a>
        <a
          href="https://www.youtube.com/channel/UCTL59752f6PIWECN-fzONQA"
          className="text-2xl font-thin text-white cursor-pointer"
          rel="noreferrer noopener"
          target="_blank"
        >
          <YouTubeIcon
            fontSize="large"
            className="mt-1 text-white hover:text-[#CC8470]"
          />
        </a>
        <a
          href="https://soundcloud.com/justinwaves"
          target="_blank"
          className="text-4xl cursor-pointer z-10"
        >
          <svg
            className="w-10 fill-white hover:fill-[#CC8470]"
            xmlns="http://www.w3.org/2000/svg"
            shape-rendering="geometricPrecision"
            text-rendering="geometricPrecision"
            image-rendering="optimizeQuality"
            fill-rule="evenodd"
            clip-rule="evenodd"
            viewBox="0 0 512 229.209"
          >
            <path d="M511.962 161.134c-2.146 38.361-34.164 68.201-72.576 67.67H264.935c-7.99-.083-14.44-6.564-14.483-14.546V26.423a16.007 16.007 0 019.635-15.295S276.134 0 309.931 0a114.36 114.36 0 0158.657 16.117 116.064 116.064 0 0154.613 75.641 67.288 67.288 0 0118.504-2.52 69.843 69.843 0 0150.395 21.035 69.83 69.83 0 0119.87 50.864l-.008-.003zM228.68 38.299c5.261 63.709 9.084 121.814 0 185.315a5.662 5.662 0 01-5.627 5.044 5.668 5.668 0 01-5.635-5.044c-8.47-62.961-4.781-122.158 0-185.315a5.646 5.646 0 012.626-5.419 5.706 5.706 0 016.021 0 5.66 5.66 0 012.615 5.419zm-35.298 185.378a5.931 5.931 0 01-5.868 5.044 5.929 5.929 0 01-5.875-5.044 708.398 708.398 0 010-163.52 5.946 5.946 0 015.907-5.312 5.95 5.95 0 015.906 5.312 636.109 636.109 0 01-.074 163.52h.004zM158.009 54.625c5.729 58.377 8.336 110.678-.063 168.918a5.672 5.672 0 01-5.667 5.666 5.673 5.673 0 01-5.666-5.666c-8.128-57.491-5.399-111.293 0-168.918a5.713 5.713 0 015.698-5.104 5.716 5.716 0 015.698 5.104zm-35.425 169.127a5.817 5.817 0 01-5.78 5.166c-2.957 0-5.45-2.229-5.761-5.166a598.204 598.204 0 010-152.675 5.867 5.867 0 015.867-5.867c3.241 0 5.876 2.626 5.876 5.867a558.013 558.013 0 01-.209 152.675h.007zM87.204 109.25c8.951 39.59 4.918 74.557-.335 114.907a5.538 5.538 0 01-5.469 4.667 5.536 5.536 0 01-5.458-4.667c-4.78-39.799-8.742-75.589-.343-114.919a5.812 5.812 0 015.804-5.804 5.806 5.806 0 015.805 5.811l-.004.005zm-35.298-6.013c8.198 40.558 5.532 74.9-.209 115.597-.677 6.012-10.982 6.075-11.534 0-5.19-40.083-7.647-75.452-.208-115.597a6.026 6.026 0 015.981-5.368 5.995 5.995 0 015.97 5.368zm-35.633 19.661c8.596 26.903 5.659 48.761-.343 76.337a5.595 5.595 0 01-5.564 4.982 5.614 5.614 0 01-5.575-4.982c-5.19-27.036-7.293-49.364-.469-76.337.311-3.052 2.898-5.368 5.97-5.368a5.995 5.995 0 015.969 5.368h.012z" />
          </svg>
        </a>
      </div>
      {/* Open Menu */}
      <div
        className={`${
          isOpen
            ? "block opacity-100 backdrop-blur-xl bg-black "
            : "hidden opacity-0 backdrop-blur-sm "
        }  -left-2 -top-14 pt-16 md:pt-18 relative md:rounded-br-xl w-screen md:w-96   bg-filter  bg-opacity-20 border-white border-b-2 md:border-r-2 ring-1 ring-black ring-opacity-5 divide-y  focus:outline-none transition-all duration-300 z-10 `}
      >
        <div className=" py-1 md:py-3 px-2">
          <Link href="/about">
            <div className="flex px-4 hover:bg-white hover:bg-opacity-25 hover:rounded-2xl">
              <RoundLogoSvg className="fill-white w-8 " />
              <p className="block px-2 py-2 md:py-4 text-xl font-thin text-white   cursor-pointer">
                BIO
              </p>
            </div>
          </Link>
          {/* <a href="mailto:jwmusicco@gmail.com">
            <div className="flex px-4 hover:bg-white hover:bg-opacity-25 hover:rounded-2xl">
              <MailIcon className=" text-white text-3xl relative top-1 md:top-3" />
              <p className="block px-2 py-2 md:py-4 text-xl font-thin text-white   cursor-pointer">
                EMAIL
              </p>
            </div>
          </a> */}
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
        <div className="py-1 md:py-3 px-2">
          <div className="px-3 py-2 md:py-3">
            <iframe
              className="lg:hidden"
              scrolling="no"
              style={{ border: 0, width: "100%", height: 33 }}
              src="https://bandcamp.com/band_follow_button_classic/1352604993"
            ></iframe>
          </div>
          <a
            href="https://open.spotify.com/artist/13TnKCSQSOkWzKgK09wNzQ?si=PV0-1SB0Sc2NAPrR9-MntQ"
            className="block px-4 py-2.5 md:py-4 text-xl md:text-2xl font-thin text-white hover:bg-white hover:bg-opacity-25 hover:rounded-2xl  cursor-pointer"
            rel="noreferrer noopener"
            target="_blank"
          >
            <div className="flex">
              <svg
                className="w-8"
                xmlns="http://www.w3.org/2000/svg"
                shape-rendering="geometricPrecision"
                text-rendering="geometricPrecision"
                image-rendering="optimizeQuality"
                fill-rule="evenodd"
                clip-rule="evenodd"
                viewBox="0 0 512 511.991"
              >
                <path
                  fill="#fff"
                  fill-rule="nonzero"
                  d="M255.998.003C114.616.003 0 114.616 0 255.997c0 141.385 114.616 255.994 255.998 255.994C397.395 511.991 512 397.386 512 255.997 512 114.624 397.395.015 255.994.015l.004-.015v.003zm117.4 369.22c-4.585 7.519-14.427 9.908-21.949 5.288-60.104-36.714-135.771-45.027-224.882-24.668-8.587 1.954-17.146-3.425-19.104-12.015-1.967-8.591 3.394-17.15 12.003-19.104 97.518-22.28 181.164-12.688 248.645 28.55 7.522 4.616 9.907 14.427 5.288 21.95l-.001-.001zm31.335-69.703c-5.779 9.389-18.067 12.353-27.452 6.578-68.813-42.298-173.703-54.548-255.096-29.837-10.556 3.187-21.704-2.761-24.906-13.298-3.18-10.556 2.772-21.68 13.309-24.891 92.971-28.208 208.551-14.546 287.574 34.015 9.385 5.779 12.35 18.067 6.575 27.441v-.004l-.004-.004zm2.692-72.584c-82.511-49.006-218.635-53.51-297.409-29.603-12.649 3.837-26.027-3.302-29.86-15.955-3.832-12.656 3.303-26.023 15.96-29.867 90.428-27.452 240.753-22.149 335.747 34.245 11.401 6.754 15.133 21.446 8.375 32.809-6.728 11.378-21.462 15.13-32.802 8.371h-.011z"
                />
              </svg>{" "}
              <p className="ml-3">SPOTIFY</p>
            </div>
          </a>
          <a
            href="https://music.apple.com/us/artist/justin-waves/1498973677"
            className="block px-4 py-2.5 md:py-4 text-xl md:text-2xl font-thin text-white hover:bg-white hover:bg-opacity-25 hover:rounded-2xl  cursor-pointer"
            rel="noreferrer noopener"
            target="_blank"
          >
            <div className="flex">
              <AppleIcon fontSize="large" />
              <p className="ml-2">APPLE MUSIC</p>
            </div>
          </a>
          <a
            href="https://www.tiktok.com/@justinwaves"
            className="block px-4 py-2.5 md:py-4 text-xl md:text-2xl font-thin text-white hover:bg-white hover:bg-opacity-25 hover:rounded-2xl  cursor-pointer"
            rel="noreferrer noopener"
            target="_blank"
          >
            <div className="flex align-middle">
              <div className="flex">
                <img src="/tiktok-white-icon.svg" className="w-8 " />
                <p className="ml-3">TIKTOK</p>{" "}
              </div>
            </div>
          </a>
          <a
            href="https://www.instagram.com/justinwaves/"
            className="block px-4 py-2.5 md:py-4 text-xl md:text-2xl font-thin text-white hover:bg-white hover:bg-opacity-25 hover:rounded-2xl  cursor-pointer"
            rel="noreferrer noopener"
            target="_blank"
          >
            <div className="flex">
              <InstagramIcon fontSize="large" />
              <p className="ml-2"> INSTAGRAM</p>{" "}
            </div>
          </a>

          <a
            href="https://www.youtube.com/channel/UCTL59752f6PIWECN-fzONQA"
            className="block px-4 py-2.5 md:py-4 text-xl md:text-2xl font-thin text-white hover:bg-white hover:bg-opacity-25 hover:rounded-2xl  cursor-pointer"
            rel="noreferrer noopener"
            target="_blank"
          >
            <div className="flex">
              <YouTubeIcon fontSize="large" /> <p className="ml-2">YOUTUBE</p>
            </div>
          </a>
          <a
            href="https://soundcloud.com/justinwaves"
            className="block px-4 py-2.5 md:py-4 text-xl md:text-2xl font-thin text-white hover:bg-white hover:bg-opacity-25 hover:rounded-2xl  cursor-pointer"
            rel="noreferrer noopener"
            target="_blank"
          >
            <div className="flex">
              <svg
                className="w-8 fill-white hover:fill-[#CC8470]"
                xmlns="http://www.w3.org/2000/svg"
                shape-rendering="geometricPrecision"
                text-rendering="geometricPrecision"
                image-rendering="optimizeQuality"
                fill-rule="evenodd"
                clip-rule="evenodd"
                viewBox="0 0 512 229.209"
              >
                <path d="M511.962 161.134c-2.146 38.361-34.164 68.201-72.576 67.67H264.935c-7.99-.083-14.44-6.564-14.483-14.546V26.423a16.007 16.007 0 019.635-15.295S276.134 0 309.931 0a114.36 114.36 0 0158.657 16.117 116.064 116.064 0 0154.613 75.641 67.288 67.288 0 0118.504-2.52 69.843 69.843 0 0150.395 21.035 69.83 69.83 0 0119.87 50.864l-.008-.003zM228.68 38.299c5.261 63.709 9.084 121.814 0 185.315a5.662 5.662 0 01-5.627 5.044 5.668 5.668 0 01-5.635-5.044c-8.47-62.961-4.781-122.158 0-185.315a5.646 5.646 0 012.626-5.419 5.706 5.706 0 016.021 0 5.66 5.66 0 012.615 5.419zm-35.298 185.378a5.931 5.931 0 01-5.868 5.044 5.929 5.929 0 01-5.875-5.044 708.398 708.398 0 010-163.52 5.946 5.946 0 015.907-5.312 5.95 5.95 0 015.906 5.312 636.109 636.109 0 01-.074 163.52h.004zM158.009 54.625c5.729 58.377 8.336 110.678-.063 168.918a5.672 5.672 0 01-5.667 5.666 5.673 5.673 0 01-5.666-5.666c-8.128-57.491-5.399-111.293 0-168.918a5.713 5.713 0 015.698-5.104 5.716 5.716 0 015.698 5.104zm-35.425 169.127a5.817 5.817 0 01-5.78 5.166c-2.957 0-5.45-2.229-5.761-5.166a598.204 598.204 0 010-152.675 5.867 5.867 0 015.867-5.867c3.241 0 5.876 2.626 5.876 5.867a558.013 558.013 0 01-.209 152.675h.007zM87.204 109.25c8.951 39.59 4.918 74.557-.335 114.907a5.538 5.538 0 01-5.469 4.667 5.536 5.536 0 01-5.458-4.667c-4.78-39.799-8.742-75.589-.343-114.919a5.812 5.812 0 015.804-5.804 5.806 5.806 0 015.805 5.811l-.004.005zm-35.298-6.013c8.198 40.558 5.532 74.9-.209 115.597-.677 6.012-10.982 6.075-11.534 0-5.19-40.083-7.647-75.452-.208-115.597a6.026 6.026 0 015.981-5.368 5.995 5.995 0 015.97 5.368zm-35.633 19.661c8.596 26.903 5.659 48.761-.343 76.337a5.595 5.595 0 01-5.564 4.982 5.614 5.614 0 01-5.575-4.982c-5.19-27.036-7.293-49.364-.469-76.337.311-3.052 2.898-5.368 5.97-5.368a5.995 5.995 0 015.969 5.368h.012z" />
              </svg>
              <p className="ml-3">SOUNDCLOUD</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default MenuButton;
