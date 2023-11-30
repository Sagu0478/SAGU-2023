import React from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

const NavbarButton = ({ navbar, setNavbar, setCart }) => {
  return (
    <button
      onClick={() => {setNavbar(!navbar), setCart(false)}}
    >
      <div className="lg:hidden duration-300 cursor-pointer hover:text-white hover:scale-110 transition-all">
        {navbar ? (
          <AiOutlineClose className="w-7 h-7" />
        ) : (
          <AiOutlineMenu className="w-7 h-7" />
        )}
      </div>
    </button>
  );
};

export default NavbarButton;
