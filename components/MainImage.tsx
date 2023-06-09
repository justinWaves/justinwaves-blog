import React from "react";

function MainImage() {
  return (
    // <div className="grid items-center bg-main-bg bg-center  w-screen h-[100vh] md:h-[60vh] bg-cover p-5">
    //   <div className=" ">
    //     {/* <img
    //       className=" w-40 object-contain animate-pulse mx-auto p-3"
    //       src="jw-logo-round.svg"
    //       alt=""
    //     /> */}

    //     {/* <iframe
    //       width="100%"
    //       height="166"
    //       scrolling="no"
    //       allow="autoplay"
    //       src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1257957508%3Fsecret_token%3Ds-vq5YSoPpOCT&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
    //     ></iframe> */}
    //   </div>
    // </div>

    <div className="grid items-center  w-screen pt-24  p-5">
      <img src="Screenshot 2023-06-08 at 9.29.34 PM.png" alt="" className="mx-auto"/>
      <form action="https://www.paypal.com/donate" method="post" target="_top" className="mx-auto mt-20">
<input type="hidden" name="hosted_button_id" value="VXAZ7FRZRBLLN" />
<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"  name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
<img alt=""  src="https://www.paypal.com/en_US/i/scr/pixel.gif" width="1" height="1" />
</form>

    {/* <iframe
          width="100%"
           height="166"
          scrolling="no"
         allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1257957508%3Fsecret_token%3Ds-vq5YSoPpOCT&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
    ></iframe> */}
    </div>
  );
}

export default MainImage;
