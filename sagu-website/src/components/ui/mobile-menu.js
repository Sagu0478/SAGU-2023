import Link from "next/link";
import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";

const MobileMenu = ({ links, navbar, setNavbar }) => {
  if (navbar == false) return null;
  return (
    // <div className={`${navbar ? "block" : "hidden"}`}>
      <div class="z-[50]">
        <div class="fixed inset-0 top-0 left-0 h-screen w-full backdrop-blur-[0px] bg-black bg-opacity-50"></div>
        <div class="fixed inset-0 top-0 right-0 items-start flex justify-end">
          <div class="flex flex-col bg-white h-screen w-[400px] max-w-[90%]">
            <header part="header" class="flex items-center justify-between p-5">
              <div>
                <a className="duration-300 cursor-pointer hover:text-[#b7b6f5] hover:scale-110 transition-all">
                  <AiOutlineUser className="w-7 h-7" />
                </a>
              </div>
              <button onClick={() => setNavbar(!navbar)}>
                <IoCloseOutline className="w-7 h-7 hover:scale-110 transition-all cursor-pointer" />
              </button>
            </header>
            <div className="divide-y p-5 h-screen overflow-y-auto">
              {links.map(({ text, path }, index) => {
                return (
                  <Link
                    key={index}
                    href={path}
                    className="flex flex-col space-y-4 text-left items-end py-2 relative group duration-300 hover:text-[#b7b6f5] cursor-pointer"
                  >
                    {text}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default MobileMenu;
