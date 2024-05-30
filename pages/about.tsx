import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MenuButton from "../components/NavBarItems";

function about() {
  return (
    <div className="relative  bg-main-bg bg-cover bg-center text-sky-100  ">
      <div className=" w-screen  md:pb-[500px]  ">
        <MenuButton />
        <Header />
        <div className="relative flex justify-between w-fit md:w-5/6  mx-auto rounded-xl  pt-20">
          <div className="w-screen mx-auto flex flex-col text-center">
            <div className=" flex justify-center ">
              <img
                src="blue-waves-2.jpg"
                alt=""
                className="w-5/6 md:w-[500px]  rounded-xl mx-auto"
              />
            </div>
            <div className=" grid place-items-center">
              <div className="max-w-4xl bg-[#141C2F] bg-filter backdrop-blur-lg bg-opacity-30 rounded-xl  mx-auto px-5 md:px-20 py-10   ">
                <h1 className="w-fit mx-auto px-10 pt-2  text-5xl mt-5 font-thin  ">
                  Artist Bio
                </h1>

                <p className="  text-lg  text-left mt-5">
                  Justin Waves is a multifaceted artist and producer from San
                  Francisco, CA. Immersed in music projects since age 12, he
                  began making electronic records at the age of 16 inspired by
                  Four Tet, The Postal Service, and similar indie electronic
                  acts, which soon opened the door to the world of dance music.
                  At the age of 21 he left his band to pursue a solo career as a
                  DJ/ Producer, releasing house and techno records under his
                  full name (Justin Weisberg), until one evening, after
                  experimenting with adding his own vocals to a track, a new
                  sound emerged, and Justin Waves was born. 
                  <br/>
                  <br/>
                  Justin’s music has
                  matured over time into an unmistakable signature sound, deeply
                  layered and musical, laced with indie-inspired songwriting and
                  a touch of pop sensibility, all glued together with punchy,
                  organic house percussion and baselines. His live shows blend
                  traditional DJ decks, live piano, and heartfelt vocals,
                  creating unique and immersive experiences, and has shared
                  stages with acts like Bob Moses, Hayden James, Télépopmusik,
                  Kraak & Smaak, Alex Cruz, and many others. Also a DJ with a
                  wealth of experience spanning well over a decade, Justin’s
                  hybrid/ live sets are perfect for both intimate clubs and
                  large festivals. 
                  <br/>
                  <br/>
                  Driven by a deep-seated passion for forging
                  connections through the universal language of music, Justin
                  Waves utilizes his songwriting as a means to liberate
                  individuals from worries, enabling them to embrace the present
                  moment wholeheartedly.
                </p>
                <img src="waves-donner.jpg" alt="" className="mt-5 rounded-lg shadow-lg" />
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
