import { ClassNames } from "@emotion/react";
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import InstagramEmbed from "react-instagram-embed";

function about() {
  return (
    <div>
      <div className=" bg-slate-200 w-screen  ">
        <Header />
        <div className="relative flex justify-between w-full h-full bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 text-black mx-auto rounded-xl">
          <div className="w-5/6 mx-auto flex flex-col text-center">
            <div className=" grid place-items-center">
              <img
                src="/waves epk banner.jpg"
                alt=""
                className="w-screen max-w-7xl rounded-xl mx-auto mt-32"
              />
            </div>
            <div className=" grid place-items-center">
              <div>
                <h1 className="w-fit mx-auto px-10 pt-2 text-slate-900 text-5xl mt-5 font-thin  ">
                  Meet Justin Waves
                </h1>
                <p className="text-slate-900  mb-20  p-10  text-left">
                  Driven by a curious imagination and a passion for pushing the
                  boundaries of electronic music, Justin Waves’ multi-decade
                  experience as a composer, producer, instrumentalist and
                  songwriter has narrowed into a solid focus: spread positivity
                  and healing in the world through dance music. The San
                  Francisco-based artist’s sound "waves" between the polarity of
                  playa-crusted, playful house music and the deeper darker edge
                  of the musical cosmos, tying in his 8 years as a rock musician
                  with vocals reminiscent of Thom Yorke or Wayne Coyne. The
                  result is a colorful, melodic landscape that keeps momentum on
                  the dance floor. As a Live Performer/ Vocalist, he has opened
                  for such acts as Télépopmusik, Kraak & Smaak, Alex Cruz, Oona
                  Dahl and has delivered all-original live sets at festivals
                  such as Outside Lands and Northern Nights. As a DJ, Justin has
                  well over a decade of experience keeping the vibes high at
                  countless Burning Man events such as Temple Galaxia fundraiser
                  and the Never Sleep Again Campouts and has captained the decks
                  at nearly every nightclub in San Francisco, bringing a wavy
                  blend of organic deep and tech house to the table. With a
                  passion for connecting with others through the language of
                  music, Justin Waves is dedicated to using his music as a
                  platform to free people from concern and live fully in the
                  now.
                </p>
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
