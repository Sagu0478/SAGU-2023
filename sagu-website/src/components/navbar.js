"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/contexts/Provider.js";

import logo from "../../public/assets/images/SAGU logo 1.png";
import WebMenu from "./ui/web-menu";
import NavbarButton from "./ui/navbar-button.js";
import NavbarCollapse from "./ui/navbar-collapse.js";
import ShoppingCart from "./ui/shopping-cart.js";
import SearchBar from "./ui/search-bar.js";

const Navbar = () => {
  // Use the context to access global state
  const { navbarOpen, setNavbarOpen, cartOpen, setCartOpen, cartItems } =
    useAppContext();
  const [navbar, setNavbar] = useState(false);
  const [cart, setCart] = useState(false);

  const handleNavbarToggle = () => {
    setNavbarOpen(!navbarOpen);
  };

  const links = [
    {
      text: "Home",
      path: "/",
    },
    {
      text: "Menu",
      path: "/menu",
    },
    {
      text: "Promos",
      path: "/promos",
    },
    {
      text: "Our Story",
      path: "/our-story",
    },
  ];

  /**
   * The data that will be used to filter for in the search bar
   *  - (text) is the text that will appear on the drop down search menu
   *  - (related) possible user inputs that will be filtered accordingly
   *  - (path) will be used to redirect the user to the related page for their search
   */
  const searchData = [
    {
      text: "Home",
      related: [
        "Main Page/Home",
        "Feedback",
        "Limited Time Only/LTO/Discounts",
      ],
      path: "/",
    },
    {
      text: "Menu",
      related: [
        "Menu",
        "Bubble Tea Flavours",
        "Boba",
        "Hot/Cold Foods/Drinks",
        "Frozen/Cooked Meats/Vegetables/Meals",
        "Canned Items/Pastries/Baking/Snacks",
        "Pinoy Foods/Pastries/Deserts",
      ],
      path: "/menu",
    },
    {
      text: "Promos",
      related: [
        "Deals/Discounts/Sales/Promos",
        "Sesonal/Limited Time Only/LTO/Special",
      ],
      path: "/promos",
    },
    {
      text: "Our Story",
      related: [
        "Biography/About Us/Our Story/Information On The Store and Owner",
        "Location Of The Store/Time of Opening and Closing/Store Hours",
      ],
      path: "/our-story",
    },
    {
      text: "Terms & Conditions",
      related: ["Terms & Conditions/Agrement/Liability"],
      path: "/terms-and-conditions",
    },
    {
      text: "Privacy Policy",
      related: ["Privacy Policy/Liability/Consent"],
      path: "/privacy-policy",
    },
  ];

  const items = cartItems;

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth > 1024) {
        setNavbarOpen(false);
      }
    };
    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-screen-xl m-auto min-h-[90px]">
      <nav
        className="flex items-center justify-between px-6 w-full"
        aria-label="Global"
      >
        <div className="flex items-center">
          <a className="flex justify-center md:justify-start" href="/">
            <Image src={logo} height={90} />
          </a>
          <div className="mx-2">
            <SearchBar data={searchData} />
          </div>
        </div>

        <div className="flex justify-end">
          <WebMenu
            links={links}
            cart={cartOpen}
            setCart={setCartOpen}
            items={items}
          />
          <NavbarButton
            navbar={navbarOpen}
            setNavbar={handleNavbarToggle}
            setCart={setCartOpen}
          />
        </div>
      </nav>

      <div
        className={`${
          cartOpen ? "mb-5" : "mb-0"
        } transition-all duration-150 max-h-[80vh] w-full overflow-y-auto mx-auto`}
      >
        <NavbarCollapse
          links={links}
          navbar={navbarOpen}
          cart={cartOpen}
          setCart={setCartOpen}
          items={items}
        />
        <ShoppingCart items={items} cart={cartOpen} />
      </div>
    </div>
  );
};

export default Navbar;
