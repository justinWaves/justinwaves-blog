import { ClassNames } from "@emotion/react";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InstagramEmbed from "react-instagram-embed";

function about() {
  return (
    <div className="relative min-h-screen bg-main-bg bg-cover bg-center text-sky-100">
      <div className="  w-screen pb-[300px] ">
        <Header />
        <div className="relative flex justify-between w-fit md:w-5/6  backdrop-filter backdrop-blur-xl bg-opacity-60 mx-auto rounded-xl">
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
                  Legend of Justin Waves
                </h1>
           
                <p className="  mb-20    text-left mt-5">
                "Justin Waves is a visionary sonic alchemist, utilizing the latest of music technology with a deep understanding of music composition, harmony, groove, and nature, to create uncharted territorys in the electronic music realm. With roots in the vibrant culture of San Francisco, Justin draws inspiration from the city's eclectic energy, infusing his compositions with the transformative spirit of creativity and innovation. As a sonic explorer, classically trained composer, and proficient guitarist, Justin approaches his craft with precision and curiosity, meticulously experimenting with the mathematical forces of nature inherent in musical harmony. A dynamic live vocalist, Justin's performances transcend traditional boundaries, inviting audiences on a transcendent journey of enlightenment and cosmic understanding. Through his immersive performances and visual storytelling, Justin Waves invites listeners to delve into the depths of their own creativity and inner transformation."
                </p>
                <a
                  href="https://www.dropbox.com/scl/fo/3jg7jgmf5xbol7r5mg9ib/h?rlkey=ulr8gdjs40ueh0tp7uwbjkrua&dl=0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* <button className="text-xl  text-slate-900 h-10 w-full bg-[#CC8470] hover-bg-200 mt-2 rounded-md cursor-pointer">
                    Download EPK
                  </button> */}
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
