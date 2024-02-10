import React from "react";
import { InstagramEmbed } from "react-social-media-embed";
interface MainImageProps{
  releaseUrl? : string,
  releaseName : string,
  releaseType : string,
  isDebut? : boolean,
}

const MainImage: React.FC<MainImageProps> = ({releaseUrl, releaseName,releaseType,isDebut }) => {
  return (
    <div className="relative pb-10 w-screen overflow-hidden flex justify-center items-center h-screen">
      <div className="mx-auto">
        <img
          src="/stencil-logo-white.png"
          alt=""
          className="w-5/6 mx-auto my-auto"
        />
        <h1 className="mt-10 text-4xl md:text-5xl font-thin text-white text-center">{releaseName.toLocaleUpperCase()}</h1>
        <p className="text-white text-center font-thin text-lg mt-5">{ isDebut? "DEBUT": "NEW"} {releaseType.toLocaleUpperCase()} </p>
        <p className="text-white text-center font-thin text-lg">OUT NOW</p>
        <div
          className="border-white border-2
 w-[200px] h-[50px] mt-5 mx-auto grid place-items-center hover:bg-white hover:bg-opacity-20 hover:rounded-3xl transition-all duration-500 cursor-pointer"
        >
          <a href={releaseUrl} target="_blank" rel="noopener noreferrer" className="text-white text-2xl font-thin animate-pulse">
            LISTEN
          </a>
        </div>
      </div>
    </div>
  );
}

export default MainImage;
