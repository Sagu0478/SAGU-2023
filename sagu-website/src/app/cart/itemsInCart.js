"use client";

import Image from "next/image";
import { useAppContext } from "@/contexts/Provider";
import React, { useState, useEffect } from "react";

import { MdDeleteForever } from "react-icons/md";

const ShoppingCart = ({ menuItems, cart }) => {
  const [editedQuantities, setEditedQuantities] = useState({});
  const { updateCartItemQuantity, removeFromCart } = useAppContext();

  useEffect(() => {
    const initialQuantities = {};
    menuItems.forEach((item, index) => {
      initialQuantities[index] = item.quantity;
    });
    setEditedQuantities(initialQuantities);
  }, [menuItems]);

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    const updatedQuantities = { ...editedQuantities, [index]: newQuantity };
    setEditedQuantities(updatedQuantities);

    const item = menuItems[index];
    updateCartItemQuantity(item.id, newQuantity);
  };

  return (
    <div className={`${cart ? "" : "max-h-0"} `}>
      <div className="p-5 bg-customColor">
        <div class="bg-white">
          <div className="divide-y max-h-[screen] overflow-visible">
            <table className="border-collapse w-full h-full">
              {menuItems.length === 0 ? (
                <thead></thead>
              ) : (
                <thead>
                  <tr className="bg-gray-100 border-b sticky top-0">
                    <th className="p-3 pl-0 text-start"></th>
                    <th className="p-3 pl-0 text-start">Product</th>
                    <th className="p-3 pl-0 text-start">Price</th>
                    <th className="p-3 pl-0 text-start">Quantity</th>
                    <th className="p-3 pl-0 text-start">Subtotal</th>
                    <th className="p-3 pl-0 text-start"></th>
                  </tr>
                </thead>
              )}
              <tbody class="">
                {menuItems.map(
                  ({ title, price, quantity, imageUrl }, index) => {
                    const decreaseQuantity = () => {
                      const newQuantity = Math.max(1, quantity - 1);
                      handleQuantityChange(index, newQuantity);
                    };

                    const increaseQuantity = () => {
                      const newQuantity = quantity + 1;
                      handleQuantityChange(index, newQuantity);
                    };

                    return (
                      <tr key={index} className="border-b">
                        <td className="flex p-3 justify-center">
                          <Image
                            src={process.env.NEXT_PUBLIC_API_URL + imageUrl}
                            alt={title}
                            width={56}
                            height={56}
                            className="w-14 h-14"
                          />
                        </td>
                        <td className="text-start">{title}</td>
                        <td className="text-start">${price}</td>
                        <td className="text-start">
                          <div className="">
                            <button
                              className={`${
                                quantity === 1
                                  ? "brightness-90"
                                  : "cursor-pointer"
                              } bg-customColor rounded-full w-6 h-6 text-white text-center`}
                              onClick={decreaseQuantity}
                              disabled={quantity === 1}
                            >
                              -
                            </button>
                            <input
                              className="w-10 text-center appearance-none rounded-md outline-none"
                              type="number"
                              value={quantity}
                              readOnly
                              min="1"
                            />
                            <button
                              className="bg-customColor rounded-full w-6 h-6 text-white text-center"
                              onClick={increaseQuantity}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="text-start">
                          <div className="flex items-center justify-between">
                            <span className="inline-block align-middle">
                              ${(parseFloat(price) * quantity).toFixed(2)}
                            </span>
                          </div>
                        </td>
                        <td className="text-start">
                          <MdDeleteForever
                            className=" text-customColor text-2xl cursor-pointer align-middle"
                            onClick={() => removeFromCart(menuItems[index].id)}
                          />
                        </td>
                        {/* <td>
                      <button
                        onClick={() => saveQuantity(index)}
                        disabled={!isSaveEnabled(index)}
                        className={`px-4 py-2 rounded ${
                          isSaveEnabled(index) ? "bg-[#b7b6f5]" : "bg-[#adaaaa]"
                        }`}
                      >
                        Save
                      </button>
                    </td> */}
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
          <div class="divide-y text-right">
            {menuItems.length === 0 ? (
              <>
                <p className="py-2">Your cart is empty.</p>
                <div className="py-2">
                  <button className="h-[30px] w-[150px] overflow-hidden rounded-full bg-[#b7b6f5] text-md font-semibold text-white duration-300 mb-2 md:mb-0 uppercase hover:drop-shadow-md hover:brightness-90">
                    <a href="/menu">Browse Menu</a>
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* <div class="px-2 pt-2">Subtotal: ${subtotal.toFixed(2)}</div> */}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
