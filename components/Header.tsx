import React from "react";
import Link from "next/link";

function Header() {
  return (
    <header className="flex justify-between p-5 mx-auto max-w-7xl">
      <div
        className="flex items-center
         space-x-5"
      >
        <Link href="/">
          <img
            className="w-44  object-contain cursor-pointer"
            src="justinwaves.svg"
            alt=""
          />
        </Link>
        <div
          className="hidden md:inline-flex items-center
         space-x-5"
        >
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="text-white bg-slate-500 py-1 rounded-full px-4">
            Follow
          </h3>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-slate-500">
        <h3>Sign In</h3>
        <h3 className="border px-4 py-1 rounded-full border-slate-500">
          Get Started
        </h3>
      </div>
    </header>
  );
}

export default Header;
