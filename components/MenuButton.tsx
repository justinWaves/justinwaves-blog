import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

const MenuButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative transition-all">
      <button
        className="flex items-center justify-center px-4 py-4 text-slate-300 hover:text-sky-300 border border-slate-800 hover:border-sky-300  rounded-md hover:bg-black focus:outline-none focus:ring cursor-pointer z-99 transition-all duration-300"
        onClick={toggleMenu}
      >
       <MenuIcon fontSize='medium' />
      </button>
        <div className={`${isOpen? "-left-3 opacity-100" : "-left-[1500%] opacity-0"} origin-top-left absolute left-0 mt-3 w-96 rounded-br-3xl shadow-lg bg-black  bg-filter backdrop-blur-xl bg-opacity-90 ring-1 ring-black ring-opacity-5 divide-y divide-gray-600 focus:outline-none transition-all duration-500`}>
          <div className="py-3 px-2">
            <a
              href="#"
              className="block px-4 py-4 text-xl font-thin text-slate-300 hover:bg-black hover:text-sky-300"
            >
              About
            </a>
            <a
              href="#"
              className="block px-4 py-4 text-xl font-thin text-slate-300 hover:bg-black hover:text-sky-300"
            >
  Releases
            </a>
            <a
              href="#"
              className="block px-4 py-4 text-xl font-thin text-slate-300 hover:bg-black hover:text-sky-300"
            >
             JW Music Co
            </a>
          </div>
          <div className="py-3 px-2">
            <a
              href="#"
              className="block px-4 py-4 text-xl font-thin text-slate-300 hover:bg-black hover:text-sky-300"
            >
              Support
            </a>
          </div>
        </div>
    </div>
  );
};

export default MenuButton;



