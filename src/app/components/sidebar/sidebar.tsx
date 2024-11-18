import React from "react";
import { MdDashboard, MdStars } from "react-icons/md";
import { FaRegFile } from "react-icons/fa";

const Sidebar = () => {
  return (
    <nav className="w-52 h-screen overflow-hidden border-r border-gray-400 flex flex-col gap-4 py-14">
      <a className="flex items-center gap-2 px-5 py-2.5 w-full hover:cursor-pointer hover:text-indigo-600 hover:bg-indigo-100">
        <MdDashboard /> Dashboard
      </a>
      <a className="flex items-center gap-2 px-5 py-2.5 w-full hover:cursor-pointer hover:text-indigo-600 hover:bg-indigo-100">
        <MdStars /> Skill Test
      </a>
      <a className="flex items-center gap-2 px-5 py-2.5 w-full hover:cursor-pointer hover:text-indigo-600 hover:bg-indigo-100">
        <FaRegFile /> Internship
      </a>
    </nav>
  );
};

export default Sidebar;
