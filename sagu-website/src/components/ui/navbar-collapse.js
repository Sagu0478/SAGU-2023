import Link from "next/link";
import { useAppContext } from "@/contexts/Provider.js";
import { AiOutlineUser, AiOutlineShoppingCart } from "react-icons/ai";
import ShoppingCart from "./shopping-cart.js";

const NavbarCollapse = ({ links, navbar, cart, setCart, items }) => {
  const { isLoggedIn, user } = useAppContext();
  return (
    <div
      className={`${
        navbar ? "max-h-[1000px]" : "max-h-0"
      } bg-customColor font-red-hat-display transition-all duration-300 w-full justify-center overflow-hidden overflow-y-auto`}
    >
      <div className="px-5">
        <div className="divide-y max-h-46 overflow-hidden overflow-y-auto">
          {links.map(({ text, path }, index) => {
            return (
              <Link
                key={index}
                href={path}
                className="flex flex-col space-y-4 text-left items-end py-2 relative group duration-300 hover:text-white cursor-pointer mx-2"
              >
                {text}
              </Link>
            );
          })}
        </div>
        <div>
          <a
            href={`${isLoggedIn ? "/account" : "/login"}`}
            className="flex flex-col space-y-4 text-left items-end py-2 relative group duration-300 bg-white hover:customColor cursor-pointer"
          >
            <div className="flex items-center mx-2">
              {isLoggedIn && user ? (
                <>
                  <p className="mx-2 uppercase">
                    {user.first_name} <br />
                    {user.last_name}
                  </p>
                </>
              ) : (
                <>
                  <p className="mx-2 uppercase">
                    Sign In & Earn <br />
                    Rewards
                  </p>
                </>
              )}

              <AiOutlineUser className="w-7 h-7" />
            </div>
          </a>

          <div className="flex flex-col space-y-4 text-left items-end py-2 relative group duration-300 bg-customColor hover:text-white cursor-pointer">
            <button
              onClick={() => setCart(!cart)}
              className="flex flex-col relative group duration-300 items-end w-full bg-customColor hover:text-white cursor-pointer"
            >
              {items.length === 0 ? (
                <div className="flex items-center mx-2 my-2">
                  <p className="mx-2 uppercase">Cart</p>
                  <AiOutlineShoppingCart className="w-7 h-7" />
                </div>
              ) : (
                <div className="flex items-center mx-2 my-2">
                  <p className="mx-2 uppercase">Cart</p>
                  <AiOutlineShoppingCart className="w-7 h-7" />
                  <span className="absolute flex h-3 w-3 transform translate-x-[650%] -translate-y-[100%]">
                    <span className="animate-ping absolute h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="inline-flex rounded-full h-3 w-3 bg-white">
                      <div className="w-full h-full">
                        <p className="text-xs text-black focus:text-customColor -translate-y-[10%]">
                          {items.length}
                        </p>
                      </div>
                    </span>
                  </span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarCollapse;
