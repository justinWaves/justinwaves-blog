import { ClassNames } from "@emotion/react";
import React from "react";
import Header from "../components/Header";

function about() {
  return (
    <div className=" bg-main-bg w-screen h-screen overflow-hidden ">
      <Header />
      {/* <div className="relative flex justify-between m-20 top-20 w-5/6 h-5/6 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 text-black mx-auto rounded-xl"> */}
      <div className="w-5/6 mx-auto flex flex-col text-center">
        <img
          src="/jwaves even smaller.jpg"
          alt=""
          className="w-64 rounded-xl mx-auto mt-40"
        />
        <h1 className=" text-slate-200 text-4xl mt-10">
          {" "}
          The Story of Justin Waves
        </h1>
        <p className="text-slate-300 mt-10">
          Justin Waves is a electonic music artist from the San Francisco Bay
          Area
        </p>
      </div>
      {/* </div> */}
    </div>
  );
}

export default about;
