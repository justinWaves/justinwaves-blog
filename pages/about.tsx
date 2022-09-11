import { ClassNames } from "@emotion/react";
import React from "react";
import Header from "../components/Header";

function about() {
  return (
    <div className=" bg-main-bg w-screen h-screen overflow-hidden ">
      <Header />
      <div className="relative flex justify-between m-20 top-20 w-5/6 h-5/6 bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 text-black mx-auto rounded-xl">
        <div className="">
          <img
            src="/jwaves even smaller.jpg"
            alt=""
            className="w-64 rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default about;
