import React from 'react'

interface DonateButtonProps {
    className?: string;
}

const DonateButton: React.FC<DonateButtonProps> = ({className}) => {
  return (
    <form
    action="https://www.paypal.com/donate"
    method="post"
    target="_top"
    className={`${className}`}
  >
     <p className='text-xs text-white mb-2 text-center'>Feeling tipsy? 🎩🌊 </p>
    <input type="hidden" name="hosted_button_id" value="VXAZ7FRZRBLLN" />
    <input
      type="image"
      src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
      name="submit"
      title="PayPal - The safer, easier way to pay online!"
      alt="Donate with PayPal button"
    />
    <img
      alt=""
      src="https://www.paypal.com/en_US/i/scr/pixel.gif"
      width="1"
      height="1"
    />
  </form>
  )
}

export default DonateButton