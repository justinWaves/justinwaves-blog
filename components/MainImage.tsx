import React from "react";

function MainImage() {
  return (
    <div className="flex flex-col border-y items-center bg-main-bg w-screen h-screen overflow-hidden bg-cover relative ">
      <div
        className="  w-screen h-screen bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 "
        w-screen
        h-screen
      ></div>
      {/* <video
        autoPlay
        loop
        muted
        className="relative bottom-40
     max-w-7xl "
      >
        <source src="/jw-bg-vid.mp4" type="video/mp4" />
      </video> */}
      <div className=" z-10 my-auto  hidden:7xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img
          className=" w-60 object-contain animate-pulse"
          src="jw-logo-round.svg"
          alt=""
        />
        {/* 
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1257957508%3Fsecret_token%3Ds-vq5YSoPpOCT&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
        ></iframe> */}
      </div>
    </div>
  );
}

export default MainImage;
