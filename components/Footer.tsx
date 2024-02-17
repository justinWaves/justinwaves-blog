import Link from "next/link";
import React from "react";
import EmailInput from "./EmailInput";
import DonateButton from "./DonateButton";
import RoundLogoSvg from "./RoundLogoSvg";

function Footer() {
  return (
    <div className=" flex flex-col absolute bottom-0 w-screen ">
      <div>

        <div className="  flex flex-col">
          <div className="p-5 md:p-10  flex flex-col md:flex-row justify-cemter md:items-end">
       
     
            <EmailInput className=" bg-[#141C2F] bg-filter backdrop-blur-lg bg-opacity-30 py-10 rounded-xl flex flex-col  mx-auto  text-center mb-8 md:mb-0 w-full  max-w-md border-white border" />
            <DonateButton className="mx-auto lg:ml-10  bg-[#141C2F] bg-filter backdrop-blur-lg bg-opacity-30 p-3 rounded-md px-3 border-white border " />
            <div className="flex flex-col "></div>
            {/* <hr className="mt-10 mb-10" /> */}
            <div className=" flex flex-row justify-between ">
              <div>
                {/* <Link href="/">
                  <svg
                    className="w-24 md:w-30   object-contain cursor-pointer fill-slate-200 hover:animate-pulse hover:fill-[#CC8470]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="500"
                    height="44"
                    viewBox="0 0 500 68"
                  >
                    <defs></defs>
                    <path
                      className="cls-1"
                      d="M2479.51,994.508q6.27,1.482,10.88,2.767a62.636,62.636,0,0,1,8.42,2.965,20.845,20.845,0,0,1,4.07,2.22,12.562,12.562,0,0,1,3.23,3.31,16.341,16.341,0,0,1,2.11,4.75,25.009,25.009,0,0,1,.78,6.72,17.48,17.48,0,0,1-1.96,8.4,18.678,18.678,0,0,1-5.29,6.17,24.242,24.242,0,0,1-7.84,3.86,33.248,33.248,0,0,1-9.5,1.33q-14.2,0-21.36-5.53t-7.54-16.41h13.13a9.593,9.593,0,0,0,4.06,7.96,16.382,16.382,0,0,0,9.95,2.91q6.465,0,9.8-2.37a7.478,7.478,0,0,0,3.33-6.42,10.409,10.409,0,0,0-.4-2.92,5.508,5.508,0,0,0-1.51-2.42,10.368,10.368,0,0,0-3.09-1.92,30.105,30.105,0,0,0-5.1-1.54q-7.44-1.575-12.88-3.21a32.349,32.349,0,0,1-8.96-4.05,14.97,14.97,0,0,1-5.2-5.881,17.885,17.885,0,0,1-1.66-8.271,14.851,14.851,0,0,1,1.47-6.562,14.681,14.681,0,0,1,4.5-5.653,22.3,22.3,0,0,1,7.5-3.889,32.116,32.116,0,0,1,10.53-1.794,34.046,34.046,0,0,1,10.58,1.532c3.14,1.022,5.83,1.947,8.09,3.825a19.449,19.449,0,0,1,5.24,6.819c1.24,2.668,1.92,4.046,2.06,7.273h-12.94c-0.32-3.36-1.53-4.291-3.62-5.939s-5.23-2.471-9.41-2.471c-7.71,0-11.56,1.883-11.56,7.219a5.451,5.451,0,0,0,2.4,4.532C2473.42,993.1,2475.98,993.652,2479.51,994.508Zm-45.37-14.048-4.57,14.033h24.65c0.59,2.978,6.4,11.567,14.37,11.567H2426.3l-5.23,16.9h32.24s3.76,12.12,14.73,13.99c-7.49-.05-64.11.02-64.11,0.02L2424.83,969h42.39s-9.71,2.7-12.87,11.464h-20.21Zm-48.65,56.51L2366.06,969h11.88l14.21,46.054L2406.26,969h14.11l-22.05,67.974h-12.83Zm-29.79-53.249h0.1l8.13,26.089h-16.56Zm-43.5,53.249-10.09-45.046-10.29,45.046h-12.74L2256.74,969h14.5l14.6,42.494L2294.86,969h14.3l9.9,42.494L2333.56,969h13.91l-22.14,67.974H2312.2Zm-99.96-46.317v46.177H2199.6V969.109h14.41l25.86,42.2v-42.2h12.74v67.721h-12.54Zm-34.9,46.177h-13.62V980.573h-11.16s-3.24-9.611-13.26-11.464h55.91v11.464h-17.87v56.257Zm-28.95-55.624c1.24,2.668,1.92,4.046,2.05,7.273h-12.93c-0.33-3.36-1.54-4.291-3.62-5.939-2.1-1.646-5.23-2.471-9.41-2.471-7.71,0-11.56,1.883-11.56,7.219a5.451,5.451,0,0,0,2.4,4.532c1.6,1.284,4.16,1.832,7.69,2.688q6.27,1.482,10.88,2.767a63.637,63.637,0,0,1,8.42,2.965,21.137,21.137,0,0,1,4.07,2.22,12.562,12.562,0,0,1,3.23,3.31,16.891,16.891,0,0,1,2.11,4.75,25.009,25.009,0,0,1,.78,6.72,17.48,17.48,0,0,1-1.96,8.4,18.794,18.794,0,0,1-5.29,6.17,24.242,24.242,0,0,1-7.84,3.86,33.248,33.248,0,0,1-9.5,1.33q-14.2,0-21.36-5.53t-7.55-16.41h13.13a9.6,9.6,0,0,0,4.07,7.96,16.372,16.372,0,0,0,9.94,2.91q6.48,0,9.8-2.37a7.478,7.478,0,0,0,3.33-6.42,10.415,10.415,0,0,0-.39-2.92,5.532,5.532,0,0,0-1.52-2.42,10.307,10.307,0,0,0-3.08-1.92,30.105,30.105,0,0,0-5.1-1.54q-7.44-1.575-12.88-3.21a32.286,32.286,0,0,1-8.97-4.05,15.02,15.02,0,0,1-5.19-5.881,17.878,17.878,0,0,1-1.67-8.271,15.537,15.537,0,0,1,5.98-12.215,22.11,22.11,0,0,1,7.5-3.889,32.116,32.116,0,0,1,10.53-1.794,34.046,34.046,0,0,1,10.58,1.532c3.14,1.022,5.83,1.947,8.08,3.825A19.476,19.476,0,0,1,2148.39,981.206ZM2074.15,1037c-6.33,0-10.61-1.69-14.14-5.09s-5.29-8.48-5.29-15.27V969.076h12.35v46.874c0,3.36.58,5.85,1.76,7.46s3.17,2.43,5.98,2.43q4.7,0,6.22-2.33c1.01-1.54,1.52-4.13,1.52-7.75V969.109h13.61v47.931q0,9-5.38,14.48C2087.18,1035.17,2081.21,1037,2074.15,1037Zm-45.07,0q-9.495,0-14.79-5.09t-5.29-15.27v-6.72h12.34v6.03q0,5.04,1.77,7.46t5.97,2.43q4.71,0,6.22-2.33c1.02-1.54,1.52-4.13,1.52-7.75V969.109h13.62v47.931q0,9-5.39,14.48T2029.08,1037Zm166.12-.17h-13.62V984.921h13.62v51.909Zm172.65-15.75,4.12,15.89h-32.73l4.61-15.89h24Z"
                      transform="translate(-2009 -969)"
                    />
                  </svg>
                </Link> */}
                {/* <div className="text-slate-300 ">
                  <Link href="/about">
                    <h2 className="hover:text-[#CC8470] cursor-pointer">About</h2>
                  </Link>
                  <h2>Contact</h2>
                  <h2>Mixes</h2>
                  <h2>Shows</h2>
                  <h2>Shop</h2>
                </div> */}
              </div>
              {/* <Link href="/">
            <RoundLogoSvg className="fill-white w-20 relative top-10 hover:fill-[#CC8470] hover:animate-pulse cursor-pointer"/>
              </Link> */}
            </div>
          </div>
        </div>
        <div className=" px-2 p-2  flex flex-row justify-between bg-[#141C2F] text-slate-600 text-xs">
          <p>
            Design and build by{" "}
            <a
              href="https://justinwaves.github.io/jw-portfolio-2021/"
              className="text-[#CC8470] hover:text-[#A34141]"
            >
              Justin Weisberg
            </a>
          </p>
          <p>© 2022</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
