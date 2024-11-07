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
                src="jw-hero-web.jpg"
                alt=""
                className="w-5/6 md:w-[500px]  rounded-xl mx-auto"
              />
            </div>
            <div className=" grid place-items-center">
              <div className="max-w-4xl bg-[#141C2F] bg-filter backdrop-blur-lg bg-opacity-70 rounded-xl  mx-auto px-5 md:px-20 py-10   ">
                <h1 className="w-fit mx-auto px-10 pt-2  text-5xl mt-5 font-thin  ">
                  Artist Bio
                </h1>

                <p className="  text-lg  text-left mt-5">

<strong>Justin Waves is an artist driven by a deep, almost obsessive connection to creativity—a connection that has shaped every aspect of his music.</strong> From his early days in San Francisco to his evolution as a solo producer, Justin has consistently pushed the boundaries of electronic music, seeking to capture complex emotions within his deeply layered, signature sound.
                  <br/>
                  <br/>
                  From the moment he began experimenting with electronic records at 16, Justin was hooked, influenced by indie electronic acts like Four Tet and The Postal Service. But it wasn’t until he ventured out on his own that Justin truly found his voice. After years of releasing house and techno under his full name, a pivotal moment occurred when he began incorporating his own vocals into his tracks. This marked the birth of Justin Waves, a project where organic percussion and melodic depth intertwine with indie-inspired songwriting and a hint of pop sensibility.
                  <br/>
                  <br/>
                  Justin’s journey hasn’t just been about creating music—it’s been about perfecting a craft that allows him to express the full spectrum of human emotion. His live performances are a testament to this, blending traditional DJ sets with live piano and heartfelt vocals, creating an immersive experience that resonates with audiences on a profound level. Whether on stage at an intimate club or a sprawling festival, Justin’s hybrid/live sets offer a unique journey, one that has seen him share stages with renowned artists such as Bob Moses, Hayden James, and Télépopmusik.
                  <br/>
                  <br/>
                  At the heart of Justin Waves’ music is a desire to connect—to use his songs as a vessel to transport listeners out of their worries and into the present moment. This passion for connection and his relentless pursuit of emotional depth in music defines Justin Waves, making him a distinctive voice in the world of electronic music.
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
