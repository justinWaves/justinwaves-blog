import { ClassNames } from "@emotion/react";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InstagramEmbed from "react-instagram-embed";
import MenuButton from "../components/NavBarItems";

function about() {
  return (
    <div className="relative min-h-screen bg-main-bg bg-cover bg-center text-sky-100">
      <div className="  w-screen pb-[800px] ">
        <MenuButton />
        <Header />
        <div className="relative flex justify-between w-fit md:w-5/6  mx-auto rounded-xl h-screen pt-20">
          <div className="w-5/6 mx-auto flex flex-col text-center">
            <div className=" grid place-items-center">
              <img
                src="/blue-waves-2.jpg"
                alt=""
                className="w-5/6 max-w-7xl  rounded-xl mx-auto"
              />
            </div>
            <div className=" grid place-items-center">
              <div className="">
                <h1 className="w-fit mx-auto px-10 pt-2  text-5xl mt-5 font-thin  ">
                  Artist Bio
                </h1>

                <p className="  mb-20    text-left mt-5">
                  Justin Waves is a consummate sonic explorer, crafting
                  mesmerizing compositions that offer an interesting new flavor
                  of house music. His music blends indie-inspired songwriting
                  and guitar work with lush analog synth-driven landscapes, all
                  painted with a deep understanding of musical harmony and
                  composition. Hailing from the vibrant culture of San
                  Francisco, Justin draws inspiration from the city's eclectic
                  energy to create music that transcends traditional boundaries.
                  With a composition and sound design, Justin's avant-garde
                  production techniques form the foundation of his works,
                  delivering a unique blend of sonic textures and atmospheres.
                  Having honed his craft through years of experimentation and
                  exploration, Justin's music is perfectly tailored for both
                  intimate venues and expansive dance festivals. Justin Waves
                  invites listeners on a transcendent journey of sonic alchemy
                  and inner transformation.
                </p>

                <img src="/secret.png" alt="" className=" w-72 mx-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default about;
