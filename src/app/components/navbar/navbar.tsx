import React from "react";
import Image from "next/image";
import WhatBytesLogo from "../../../../public/10130633-833576a963b41d8946174d102bdc1200-medium_jpg-removebg-preview.png";
import Avatar from "../../../../public/avatar-1577909_1280.png";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between border-b border-gray-400 py-5 px-4">
      <div className="flex items-center text-2xl font-semibold">
        <Image
          src={WhatBytesLogo}
          alt="company-logo"
          className="w-12 h-12"
        />
        <span className="ml-2">WhatBytes</span>
      </div>

      <div className="flex items-center justify-center gap-2 rounded-md border border-gray-400 px-5 py-2.5 text-base font-semibold">
        <div className="w-6 h-6 rounded-full overflow-hidden">
          <Image
            src={Avatar}
            alt="user-image"
            className="w-full h-full object-cover"
          />
        </div>
        <p>Rahil Siddique</p>
      </div>
    </nav>
  );
};

export default Navbar;
