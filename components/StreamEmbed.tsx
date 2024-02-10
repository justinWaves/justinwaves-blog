import React from 'react'

const iframeStyleApple: React.CSSProperties = {
    width: "100%",
    maxWidth: "660px",
    overflow: "hidden",
    borderRadius: "10px",
    transform: "translateZ(0px)",
    animation: "2s ease 0s 6 normal none running loading-indicator",
    backgroundColor: "rgb(228, 228, 228)",
    margin: "auto",
    marginTop: "40px",
   
  };
  
  const iframeStyleSpotify: React.CSSProperties = {
    margin: "auto",
  };

function StreamEmbed() {
  return (
    <div>    <div className="flex flex-col justify-evenly w-screen lg:flex-row">
    {/* <img src="/live-waves.jpg" alt="" className="w-96 hidden xl:block m-auto"/> */}
    <iframe
      src="https://open.spotify.com/embed/artist/13TnKCSQSOkWzKgK09wNzQ?utm_source=generator&theme=0"
      width="360px"
      height="600px"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      style={iframeStyleSpotify}
    ></iframe>
    <iframe
      id="embedPlayer"
      src="https://embed.music.apple.com/us/album/through-the-fire-single/1719458435?app=music&amp;itsct=music_box_player&amp;itscg=30200&amp;ls=1&amp;theme=auto"
      height="450px"
      sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
      allow="autoplay *; encrypted-media *; clipboard-write"
      style={iframeStyleApple}
    ></iframe>
  </div></div>
  )
}

export default StreamEmbed