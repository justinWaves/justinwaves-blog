import React from "react";

function MainImage() {
  return (
    <div className="flex flex-col border-y items-center ">
      <video autoPlay loop muted className="mx-auto w-screen max-w-7xl">
        <source src="/jw-bg-vid.mp4" type="video/mp4" />
      </video>
      {/* <div className="absolute l z-10 p-5 hidden:7xl">
        <img
          className=" w-24 object-contain animate-pulse "
          src="jw-logo-round.svg"
          alt=""
        />
      </div> */}
    </div>
  );
}

export default MainImage;
