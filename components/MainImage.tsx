import React from "react";

function MainImage() {
  return (
    <div className="flex flex-col border-y items-center ">
      <video autoPlay loop muted className="mx-auto w-screen max-w-7xl">
        <source src="/jw-bg-vid.mp4" type="video/mp4" />
      </video>
      <div className="absolute z-10 p-5 ">
        <img className=" w-16 object-contain" src="jw-logo-round.svg" alt="" />
      </div>
    </div>
  );
}

export default MainImage;
