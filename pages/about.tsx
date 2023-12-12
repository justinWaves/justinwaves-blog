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
                  Artist Bio: Justin Waves
                </h1>
                <h3 className="text-2xl text-sky-300 ">
                  Riding the Sonic Tides of Alternative/Indie Dance
                </h3>
                <p className="  mb-20  px-10  text-left mt-5">
                  Justin “Waves” Weisberg started his first rock band at the age
                  of 12, and since then has never stopped writing music. In
                  2009, while involved in a diverse array of musical projects,
                  the SF Bay Area artist discovered a deep fascination with the
                  SF’s vibrant electronic music community. He immersed himself
                  in DJing and spent over a decade producing dance music. It
                  wasn’t until 2017 that he merged both his early musical
                  influences as an alternative/indie singer-songwriter with his
                  electronic productions, giving birth to Justin Waves. His
                  music spans many moods, melding different colors together for
                  a unique experience. His productions have gotten him on stages
                  with renowned acts like Bob Moses, Hayden James, Télépopmusik,
                  Kraak & Smaak, Alex Cruz, and secured festival time slots at
                  Outside Lands, Bonaroo, Northern Nights, and Shabang Festival.
                  His music is a catalyst for both freedom and immersion,
                  reflecting his unwavering commitment to bringing people
                  together through heartfelt sonic experiences.
                </p>
                <a
                  href="https://www.dropbox.com/scl/fo/3jg7jgmf5xbol7r5mg9ib/h?rlkey=ulr8gdjs40ueh0tp7uwbjkrua&dl=0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-xl  text-slate-900 h-10 w-full bg-sky-300 hover-bg-200 mt-2 rounded-md cursor-pointer">
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
