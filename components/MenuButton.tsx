import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';

const MenuButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button
        className="flex items-center justify-center px-4 py-4 text-slate-300 hover:text-sky-300 border border-slate-900 hover:border-sky-300 md:rounded-md hover:bg-black focus:outline-none focus:ring cursor-pointer z-99 transition-all duration-300"
        onClick={toggleMenu}
      >
       <MenuIcon fontSize='medium' />
      </button>
        <div className={`${isOpen? "scale-y-100 " : "scale-y-0 "}  -left-3 origin-top-left absolute  mt-3 w-96  shadow-lg bg-black  bg-filter backdrop-blur-xl bg-opacity-90 ring-1 ring-black ring-opacity-5 divide-y divide-gray-600 focus:outline-none transition-all duration-500`}>
          <div className="py-3 px-2">
            <Link href="/about">
            <p
              
              className="block px-4 py-4 text-xl font-thin text-slate-300 hover:bg-black hover:bg-opacity-25 hover:rounded-2xl hover:text-sky-300 cursor-pointer"
            >
              🌊 About
            </p>
            </Link>
            <a
              href="#"
              className="block px-4 py-4 text-xl font-thin text-slate-300 hover:bg-black hover:bg-opacity-25 hover:rounded-2xl hover:text-sky-300 cursor-pointer"
            >
  💿 Releases
            </a>
            <a
              href="#"
              className="block px-4 py-4 text-xl font-thin text-slate-300 hover:bg-black hover:bg-opacity-25 hover:rounded-2xl hover:text-sky-300 cursor-pointer"
            >
             🎹 JW Music Co
            </a>
          </div>
          <div className="py-3 px-2">
            <a
              href="https://www.paypal.com/donate?token=P3jbkN23inlF99d4gVsxWpMXuDqq9QTJBjJ_4qnZbS2fAzzBiBjcMlcAgKluiAbb8ri_kn1IVj-E9zvt"
              className="block px-4 py-4 text-xl font-thin text-slate-300 hover:bg-black hover:bg-opacity-25 hover:rounded-2xl hover:text-sky-300 cursor-pointer"
            >
              💙 Support 
            </a>
          </div>
        </div>
    </div>
  );
};

export default MenuButton;



