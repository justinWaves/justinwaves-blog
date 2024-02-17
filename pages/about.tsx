import { ClassNames } from "@emotion/react";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InstagramEmbed from "react-instagram-embed";
import MenuButton from "../components/NavBarItems";

function about() {
  return (
    <div className="relative min-h-screen bg-main-bg bg-cover bg-center text-sky-100">
      <div className="  w-screen pb-[700px] ">
        <MenuButton />
        <Header />
        <div className="relative flex justify-between w-fit md:w-5/6  backdrop-filter backdrop-blur-xl bg-opacity-60 mx-auto rounded-xl h-screen">
          <div className="w-5/6 mx-auto flex flex-col text-center">
            <div className=" grid place-items-center">
              <img
                src="/waves epk banner.jpg"
                alt=""
                className="w-5/6 max-w-7xl rounded-xl mx-auto mt-32"
              />
            </div>
            <div className=" grid place-items-center">
              <div className="">
                <h1 className="w-fit mx-auto px-10 pt-2  text-5xl mt-5 font-thin  ">
                  Artist Bio
                </h1>

                <p className="  mb-20    text-left mt-5">
                  Justin Waves is not only a visionary sonic alchemist but also
                  a multifaceted artist, revered as a singer-songwriter, record
                  producer, and classically trained composer. Armed with a profound
                  understanding of music composition, harmony, and groove,
                  Justin pioneers uncharted territories in electronic music by
                  seamlessly blending cutting-edge technology with timeless
                  musical principles. Hailing from the vibrant cultural hub of
                  San Francisco, he draws inspiration from its eclectic energy,
                  infusing his compositions with a transformative spirit of
                  creativity and innovation. As a sonic explorer, Justin Waves
                  deftly navigates the realms of electronic music, constantly
                  pushing the boundaries of sonic possibilities. His classical
                  training as a composer and prowess as a guitarist equip him
                  with the tools to meticulously craft each piece, exploring the
                  mathematical intricacies inherent in musical harmony. Beyond
                  his instrumental proficiency, Justin's dynamic live
                  performances showcase his talents as a captivating vocalist,
                  transcending traditional boundaries and guiding audiences on a
                  journey of enlightenment and cosmic understanding. Through
                  immersive performances and captivating visual storytelling,
                  Justin Waves invites listeners to delve deep into their own
                  creativity and inner transformation. With each sonic journey,
                  he sparks a sense of wonder and exploration, inviting
                  audiences to connect with the universal language of music on a
                  profound level.
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
