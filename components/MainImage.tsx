import React from "react";
import { InstagramEmbed } from "react-social-media-embed";

function MainImage() {
  return (
    // <div className="grid items-center bg-main-bg bg-center  w-screen h-[100vh] md:h-[60vh] bg-cover p-5">
    //   <div className=" ">
    //     {/* <img
    //       className=" w-40 object-contain animate-pulse mx-auto p-3"
    //       src="jw-logo-round.svg"
    //       alt=""
    //     /> */}

    //     {/* <iframe
    //       width="100%"
    //       height="166" 
    //       scrolling="no"
    //       allow="autoplay"
    //       src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1257957508%3Fsecret_token%3Ds-vq5YSoPpOCT&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
    //     ></iframe> */}
    //   </div>
    // </div>
    <div className="relative bg-main-bg bg-cover h-screen w-screen  bg-center overflow-hidden grid place-items-center">
<div className=" justify-center hidden md:flex"> <InstagramEmbed url="https://www.instagram.com/reel/CwDeYoKMgIl/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==" width={500} height={720}/></div>
<div className=" justify-center flex md:hidden"> <InstagramEmbed url="https://www.instagram.com/reel/CwDeYoKMgIl/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==" width={385} height={530}/></div>
<div className="absolute bottom-2 mx-auto">

      
      <h1 className="animate-bounce text-5xl md:text-7xl text-white text-center">⇓</h1>
      <h1 className=" text-2xl md:text-4xl text-white font-thin  mb-2  rounded-full px-3">Scroll For Music Releases</h1>
      </div>
    </div>
  );
}

export default MainImage;
