import React from "react";
import { InstagramEmbed } from "react-social-media-embed";

function MainImage() {
  return (
    <div className="relative pb-10 w-screen   overflow-hidden grid place-items-center pt-32">
      <div className="flex justify-evenly w-screen">
      <img src="/live-waves.jpg" alt="" className="w-96 hidden md:block"/>
      <iframe
        src="https://open.spotify.com/embed/artist/13TnKCSQSOkWzKgK09wNzQ?utm_source=generator&theme=0"
        width="360px"
        height="600px"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
      </div>
    </div>
  );
}

export default MainImage;
