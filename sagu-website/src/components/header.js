"use client";
import Navbar from "./navbar.js";
import React from "react";

function Header() {
  return (
    <header className="bg-customColor font-red-hat-display fixed w-full justify-center z-50 min-h-[90px]">
      <Navbar />
    </header>
  );
}

export default Header;
