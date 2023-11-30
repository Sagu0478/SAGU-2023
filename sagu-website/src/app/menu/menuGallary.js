"use client";

// Loaded required modules
import { useAppContext } from "@/contexts/Provider";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GrAddCircle } from "react-icons/gr";
import { FaCartPlus } from "react-icons/fa";

/**
 * Creates the layout for the menu grid
 * @param {*} menuItems a dictionary for the main info in a menu item
 * @returns the menu grid
 */
function MenuGallary({ menuItems }) {
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useAppContext();

  useEffect(() => {
    // Initialize quantities for all items
    const initialQuantities = menuItems.reduce((acc, item) => {
      acc[item.id] = 1; // Default quantity is 1
      return acc;
    }, {});

    setQuantities(initialQuantities);
  }, [menuItems]);

  const handleAddToCart = (item) => {
    const quantity = quantities[item.id] || 1;
    addToCart({ ...item, quantity });
  };

  const handleQuantityChange = (id, value) => {
    const newQuantity = Math.max(1, parseInt(value, 10));
    setQuantities((currentQuantities) => ({
      ...currentQuantities,
      [id]: newQuantity,
    }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto h-[500px] w-full no-scrollbar">
      {menuItems.map((menuItem) => {
        const { id, title, price, imageUrl } = menuItem;

        const decreaseQuantity = (id) => {
          setQuantities((currentQuantities) => ({
            ...currentQuantities,
            [id]: Math.max(1, currentQuantities[id] - 1),
          }));
        };

        const increaseQuantity = (id) => {
          setQuantities((currentQuantities) => ({
            ...currentQuantities,
            [id]: currentQuantities[id] + 1,
          }));
        };

        return (
          <div key={menuItem.id} className="flex flex-col items-center gap-1">
            <span className="text-black text-center font-public-sans text-lg font-bold">
              {title}
            </span>

            <div className="relative w-48 md:w-60 h-64 md:h-80 overflow-hidden">
              <Image
                src={process.env.NEXT_PUBLIC_API_URL + imageUrl}
                alt={`Image of ${title}`}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
              />
            </div>

            <div className="flex justify-between items-center gap-4">
              <span className="text-black text-center font-publix-sans text-lg font-bold">
                ${price}
              </span>

              <div className="flex">
                <label className="pr-2">Qty: </label>
                <div className="flex">
                  <button
                    className={`${
                      quantities[menuItem.id] === 1
                        ? "brightness-90"
                        : "cursor-pointer"
                    } bg-customColor rounded-full w-6 h-6 text-white text-center`}
                    onClick={() => decreaseQuantity(menuItem.id)}
                    disabled={quantities[menuItem.id] === 1}
                  >
                    -
                  </button>
                  <input
                    className="outline-none text-center w-8 font-semibold text-md"
                    type="number"
                    value={quantities[menuItem.id]}
                    onChange={(e) =>
                      handleQuantityChange(menuItem.id, e.target.value)
                    }
                    min="1"
                    readOnly
                  />
                  <button
                    className="bg-customColor rounded-full w-6 h-6 text-white text-center"
                    onClick={() => increaseQuantity(menuItem.id)}
                  >
                    +
                  </button>
                </div>
                {/* <input
                  type="number"
                  min="1"
                  value={quantities[id]}
                  className="w-12"
                  onChange={(e) => updateQuantity(id, e.target.value)}
                /> */}
              </div>

              <FaCartPlus
                className=" text-customColor text-2xl cursor-pointer align-middle"
                onClick={() => handleAddToCart(menuItem)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MenuGallary;
