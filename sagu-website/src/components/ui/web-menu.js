import Link from "next/link";
import React from "react";
import { usePathname } from 'next/navigation';
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import { useAppContext } from "@/contexts/Provider.js";

const WebMenu = ({ links, cart, setCart, items }) => {
  const pathname = usePathname();
  const { isLoggedIn } = useAppContext();

  return (
    <div className="hidden lg:flex uppercase font-semibold list-none">
      <div className="lg:flex space-x-4 items-center">
        <div className="space-x-4 pr-3">
          {links.map(({ text, path }, index) => {
            const isActive = pathname === path;
            return (
              <Link
                key={index}
                href={path}
                className={`relative group duration-300 cursor-pointer ${
                  isActive ? "text-white" : "hover:text-white"
                }`}
              >
                {text}
                <span className={`absolute left-0 bottom-0 h-[1px] w-2/5 bg-white transform ${
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 transition-transform duration-300"}`}></span>
              </Link>
            );
          })}
        </div>

        <a
          href={`${isLoggedIn ? "/account" : "/login"}`}
          className="duration-300 cursor-pointer hover:text-white hover:scale-110 transition-all"
        >
          <AiOutlineUser className="w-7 h-7" />
        </a>

        <div className="flex flex-col space-y-4 text-left items-end relative group duration-300 bg-customColor hover:text-white cursor-pointer">
          <button
            onClick={() => setCart(!cart)}
            className="duration-300 cursor-pointer hover:text-white hover:scale-110 transition-all"
          >
            {items.length === 0 ? (
              <AiOutlineShoppingCart className="w-7 h-7" />
            ) : (
              <>
                <AiOutlineShoppingCart className="w-7 h-7" />
                <span className="absolute flex h-3 w-3 transform translate-x-[175%] -translate-y-[250%]">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="inline-flex rounded-full h-3 w-3 bg-white">
                    <div className="w-full h-full">
                      <p className="text-xs text-black focus:text-customColor -translate-y-[10%]">
                        {items.length}
                      </p>
                    </div>
                  </span>
                </span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebMenu;
