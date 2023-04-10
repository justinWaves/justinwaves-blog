import React from "react";

function MainImage() {
  return (
    <div className="grid border-y items-center bg-main-bg bg-center  w-screen h-[60vh] bg-cover p-5">
      <div className=" ">
        <img
          className=" w-40 object-contain animate-pulse mx-auto p-3"
          src="jw-logo-round.svg"
          alt=""
        />

        {/* <iframe
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
