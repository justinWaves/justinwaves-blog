import React from "react";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import PianoIcon from "@mui/icons-material/Piano";
import MenuButton from "./MenuButton";

function Header() {
  return (
    <header
      className=" flex justify-between fixed 
     p-3  mx-auto max-w-7xl  bg-black w-screen z-10 left-0 right-0 bg-filter backdrop-blur-xl bg-opacity-90 z-15 rounded-br-3xl md:rounded-br-md"
    >
      <div className="w-fill- absolute mx-auto left-0 right-0 flex justify-center">
        <h1 className="text-white font-thin text-md pr-5 mt-4">JUSTIN</h1>
        <Link href="/" className="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 434 415.969"
            className="fill-slate-300 w-14   hover:fill-sky-300 hover:animate-pulse cursor-pointer"
          >
            <defs></defs>
            <path
              className="cls-1"
              d="M215.213,470.046c109.021,27.684,216.729-47.112,234.235-99.419C370.543,352.128,362.493,463.517,215.213,470.046ZM465.9,342.445s-59.129-32-125.343,34.445c-31.677,31.788-87.32,62.8-150.692,61.586C124.049,437.221,59.947,394.437,46,276.688c33.873,75.771,103.4,88.565,145.862,89.418,78.036,1.568,134.611-70.614,212.932-71.413C464.03,294.693,465.9,342.445,465.9,342.445ZM480,290s-37.607-33.662-72.856-33.662c-68.2,0-138,71.238-217.783,71.238S56.968,267.842,56.968,217.193s38.26-106.949,107.967-112.857c28.393-2.065,64.219,7.574,80.352,41.24,10.119,23.579,7.76,69.6-66.921,65.4,63.571-5.928,62.334-85.746-17.99-71.392-23,4.11-43.709,24.891-44.01,56.149,0.641,36.326,18.985,57.44,44.794,59.819,84.121,3.45,146.707-59.258,212.3-58.712C418.342,195.924,480,221.49,480,290ZM135.307,81.763s129.18-48.4,112.809-.783C238.129,104.3,197.485,66.466,135.307,81.763ZM293.552,62.193c18,0,17.7,28.182,0,28.182C273.9,90.375,275.557,62.193,293.552,62.193ZM187.564,159.346c-20.437.423-21.373,28.523,0.712,28.523C207.891,187.967,208.062,159.82,187.564,159.346ZM387.1,73.152c-30.646,0-55.943,23.874-55.943,53.332,0,23.81,17.7,57.83,58.515,57.83,27.285,0,52.727-22.169,52.727-55.9,0,3.616-14.123,38.553-48.226,38.553-33.606,0-46.3-29.442-46.3-46.264C347.874,95.1,369.99,73.152,387.1,73.152ZM263.355,103.683c17.42,0,17.137,26.616,0,26.616C244.329,130.3,245.936,103.683,263.355,103.683Z"
              transform="translate(-46 -60.031)"
            />
          </svg>
        </Link>
        <h1 className="text-white font-thin text-md pl-5 mt-4">WAVES</h1>
      </div>
      <MenuButton />
      <div className="hidden lg:flex items-center space-x-5  text-slate-200">
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
