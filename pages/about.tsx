import { ClassNames } from "@emotion/react";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InstagramEmbed from "react-instagram-embed";
import MenuButton from "../components/NavBarItems";

function about() {
  return (
    <div className="relative  bg-main-bg bg-cover bg-center text-sky-100 overflow-auto">
      <div className=" w-screen pb-[700px] md:pb-[500px]  ">
        <MenuButton />
        <Header />
        <div className="relative flex justify-between w-fit md:w-5/6  mx-auto rounded-xl h-screen pt-20">
          <div className="w-screen mx-auto flex flex-col text-center">
            <div className=" flex justify-center mt-10">
              <img
                src="/blue-waves-2.jpg"
                alt=""
                className="w-5/6 md:w-[500px]  rounded-xl mx-auto"
              />
            </div>
            <div className=" grid place-items-center">
              <div className="max-w-4xl bg-[#141C2F] bg-filter backdrop-blur-lg bg-opacity-30 rounded-xl  mx-auto p-5 mt-10 border-white border ">
                <h1 className="w-fit mx-auto px-10 pt-2  text-5xl mt-5 font-thin  ">
                  Artist Bio
                </h1>

                <p className="  text-lg  text-left mt-5">
                <strong>Justin Waves</strong> is a multifaceted artist hailing from the vibrant city of San Francisco, CA. Immersed in music from an early age, Justin has been crafting his unique sound since he was 12. His journey as a musician is deeply rooted in the diverse musical landscape of the Bay Area, where he was exposed to an eclectic mix of classic rock, hip hop, and electronic music.

Justin’s project centers around house music infused with indie-inspired songwriting, creating a serene atmosphere that resonates with listeners. Drawing inspiration from artists like Four Tet, The Postal Service, The Flaming Lips, and LCD Soundsystem, he blends playful storytelling with lush, colorful soundscapes. His music is characterized by positive messaging, encouraging listeners to be their best selves and find deeper meaning in life's challenges and misfortunes.

An accomplished multi-instrumentalist, Justin plays piano, guitar, and trumpet, and performs his own vocals. His live shows are a dynamic fusion of traditional DJ decks, live piano, and heartfelt vocals, making each performance a unique and immersive experience and has shared stages with renowned acts like Bob Moses, Hayden James, Télépopmusik, Kraak & Smaak, Alex Cruz, and any others. Justin's music is perfectly tailored for both intimate club settings and large dance festivals.

Justin Waves is not just a performer but a visionary artist, constantly pushing the boundaries of his craft. His commitment to artistic expression and his ability to merge various influences into a cohesive and compelling sound make him a standout in the electronic music scene. Whether in the studio or on stage, Justin Waves utilizes his compositions as a means to liberate individuals from worries, enabling them to embrace the present moment wholeheartedly. His music is a catalyst for both freedom and immersion, reflecting his unwavering commitment to bringing people together through heartfelt sonic experiences.
                </p>

           
              </div>
              <img src="/secret.png" alt="" className=" w-72 mx-auto mt-10" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default about;
