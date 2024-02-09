import { ClassNames } from "@emotion/react";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InstagramEmbed from "react-instagram-embed";

function about() {
  return (
    <div className="relative min-h-screen bg-neutral-900 text-sky-100">
      <div className="  w-screen pb-[700px] ">
        <Header />
        <div className="relative flex justify-between  bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 mx-auto rounded-xl">
          <div className="w-5/6 mx-auto flex flex-col text-center">
            <div className=" grid place-items-center">
              <img
                src="/waves epk banner.jpg"
                alt=""
                className="w-5/6 max-w-7xl rounded-xl mx-auto mt-32"
              />
            </div>
            <div className=" grid place-items-center">
              <div>
                <h1 className="w-fit mx-auto px-10 pt-2  text-5xl mt-5 font-thin  ">
                  Artist Bio:
                </h1>
                {/* <h3 className="text-2xl text-sky-300 ">
                  Riding the Sonic Tides of Alternative/Indie Dance
                </h3> */}
                <p className="  mb-20  px-10  text-left mt-5">
                "Justin Waves is a visionary Sonic Alchemist, seamlessly blending the ethereal harmonies of sound waves with the elemental rhythms of nature. With roots in the vibrant culture of San Francisco, Justin draws inspiration from the city's eclectic energy, infusing his compositions with the transformative spirit of creativity and innovation. As a sonic explorer, classically trained composer, and proficient guitarist, Justin approaches his craft with precision and curiosity, meticulously experimenting with the mathematical forces of nature inherent in musical harmony. A dynamic live vocalist, Justin's performances transcend traditional boundaries, inviting audiences on a transcendent journey of spiritual enlightenment and cosmic understanding. Through his immersive performances and visual storytelling, Justin Waves invites listeners to delve into the depths of their own creativity and inner transformation."
                </p>
                <a
                  href="https://www.dropbox.com/scl/fo/3jg7jgmf5xbol7r5mg9ib/h?rlkey=ulr8gdjs40ueh0tp7uwbjkrua&dl=0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-xl  text-slate-900 h-10 w-full bg-[#CC8470] hover-bg-200 mt-2 rounded-md cursor-pointer">
                    View Full EPK
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <InstagramEmbed
        url="https://www.instagram.com/p/CdHebfhJpqZ/"
        clientAccessToken="123|456"
        maxWidth={320}
        hideCaption={false}
        containerTagName="div"
        protocol=""
        injectScript
        onLoading={() => {}}
        onSuccess={() => {}}
        onAfterRender={() => {}}
        onFailure={() => {}}
      /> */}
      <Footer />
    </div>
  );
}

export default about;
