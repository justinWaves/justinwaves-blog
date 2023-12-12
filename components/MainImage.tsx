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
<iframe  src="https://open.spotify.com/embed/artist/13TnKCSQSOkWzKgK09wNzQ?utm_source=generator&theme=0" width="80%" height="60%" frameBorder="0"  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
<div className="absolute bottom-2 mx-auto">

      
      <h1 className="animate-bounce text-5xl md:text-4xl text-white text-center">⇓</h1>
      <h1 className=" text-3xl md:text-4xl text-white font-thin  mb-2  rounded-full px-3 animate-pulse bg-black p-2">Scroll to purchase music in any format</h1>
      </div>
    </div>
  );
}

export default MainImage;
