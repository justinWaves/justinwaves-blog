import React from "react";

function MainImage() {
  return (
    <div className="flex flex-col border-y items-center bg-blend-darken w-screen max-h-80 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="relative bottom-40
     max-w-7xl "
      >
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
