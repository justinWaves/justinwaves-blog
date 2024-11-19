import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MenuButton from "../components/NavBarItems";

function about() {
  return (
    <div className="relative  bg-main-bg bg-cover bg-center text-sky-100  ">
      <div className=" w-screen  md:pb-[100px]  ">
        <MenuButton />
        <Header />
        <div className="relative flex justify-between w-fit md:w-5/6  mx-auto rounded-xl  pt-20">
          <div className="w-screen mx-auto flex flex-col text-center">
            <div className=" flex justify-center ">
              <img
                src="jw-hero-web.jpg"
                alt=""
                className="w-5/6 md:w-[500px]  rounded-xl mx-auto"
              />
            </div>
            <div className=" grid place-items-center">
              <div className="max-w-4xl  bg-filter backdrop-blur-lg bg-opacity-70 rounded-xl  mx-auto px-5 md:px-20 py-10   ">
                <h1 className="w-fit mx-auto px-10 pt-2  text-5xl mt-5 font-thin  ">
                  Artist Bio
                </h1>

                <p className="  text-lg  text-left mt-5">

                Justin Waves is a singer, songwriter, producer, and performer whose music merges introspective storytelling with immersive electronic soundscapes and live performance. Rooted in a passion for connection and creativity, Justin’s work is defined by heartfelt vocals and richly textured compositions that blend the intimacy of indie songwriting with the dynamic energy of electronic music. "At its core, my music is about telling stories—honest, human stories that connect people to themselves and each other," he says.
<br/><br/>
Hailing from San Francisco, Justin's artistic journey began with influences like Four Tet and The Postal Service, evolving into a sound that is unmistakably his own. Over the years, his craft has matured into emotionally charged performances where live piano, vocals, and DJ decks create an unforgettable experience. Sharing stages with artists like Bob Moses and Hayden James, Justin Waves continues to push boundaries, creating music that moves beyond genres and leaves a lasting impact.
                </p>
                {/* <img src="waves-donner.jpg" alt="" className="mt-5 rounded-lg shadow-lg" /> */}
              </div>
              <img src="/secret.png" alt="" className=" w-1/2 max-w-xs mx-auto mt-10" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default about;
