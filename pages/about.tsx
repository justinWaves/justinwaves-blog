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

                Justin Waves is a singer, songwriter, and producer whose music captures the raw essence of human emotion through a unique fusion of indie songwriting, layered electronic soundscapes, and live instrumentation. Born from a passion for connection and creativity, Justin's journey began in San Francisco, inspired by electronic pioneers like Four Tet and The Postal Service. Over the years, he’s honed his craft, blending heartfelt vocals with organic house rhythms to create a signature sound that resonates deeply with audiences. His immersive live performances—featuring piano, vocals, and DJ sets—have captivated crowds alongside acts like Bob Moses and Hayden James. Driven by an unrelenting desire to free listeners from their worries and ground them in the present moment, Justin Waves is redefining the boundaries of electronic music.
              
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
