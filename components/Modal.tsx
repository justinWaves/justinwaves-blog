import React, { useState, useEffect } from 'react';
import EmailInput from './EmailInput';
import CloseIcon from '@mui/icons-material/Close';
import DonateButton from './DonateButton';
import RoundLogoSvg from './RoundLogoSvg';

interface ModalProps {
    closeModal: () => void;
    className?: string;
}

const Modal: React.FC<ModalProps> = ({ closeModal, className }) => {

  return (
    <div className={`fixed inset-0 flex justify-center items-center bg-white bg-opacity-20 bg-filter backdrop-blur-xl z-50`}>
      <div className="bg-black rounded-lg p-8 relative flex flex-col items-center w-screen md:w-2/6">
      <RoundLogoSvg className="fill-white w-14   hover:fill-sky-300 hover:animate-pulse cursor-pointer"/>
        <button
          className="absolute top-0 right-0 p-2 text-gray-600"
          onClick={closeModal}
        >
          <CloseIcon fontSize='large' className='text-neutral-200 hover:animate-spin  hover:text-sky-300 transition-all duration-300' />
        </button>
        <EmailInput className='flex flex-col p-2 mx-auto text-center mb-10  w-full  max-w-md'/>
       
        <DonateButton className="mb-5"/>
      </div>
    </div>
  );
};

export default Modal;
