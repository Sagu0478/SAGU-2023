"use client";

import Image from "next/image";
import { useAppContext } from "@/contexts/Provider";
import React, { useState, useEffect } from "react";

import { MdDeleteForever } from "react-icons/md";

const ShoppingCart = ({ items, cart }) => {
  const [editedQuantities, setEditedQuantities] = useState({});
  const { updateCartItemQuantity, removeFromCart } = useAppContext();

  useEffect(() => {
    const initialQuantities = {};
    items.forEach((item, index) => {
      initialQuantities[index] = item.quantity;
    });
    setEditedQuantities(initialQuantities);
  }, [items]);

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) {
      return;
    }

    const updatedQuantities = { ...editedQuantities, [index]: newQuantity };
    setEditedQuantities(updatedQuantities);

    const item = items[index];
    updateCartItemQuantity(item.id, newQuantity);
  };

  return (
    <div
      className={`${
        cart ? "max-h-[1000px]" : "max-h-0"
      } bg-customColor font-red-hat-display transition-all duration-300 w-full max-w-screen-xl justify-end overflow-hidden mx-auto`}
    >
      <div class="bg-white mx-5">
        <div className="divide-y max-h-[30vh] overflow-hidden overflow-y-auto">
          <table className="border-collapse w-full h-full">
            {items.length === 0 ? (
              <thead></thead>
            ) : (
              <thead>
                <tr className="bg-gray-100 sticky top-0 z-10">
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
              {items.map(({ title, price, quantity, imageUrl }, index) => {
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
                    {/* <td className="text-center">{quantity}</td> */}
                    <td className="text-start pl-8">
                      <div className="">
                        <button
                          className={`${
                            quantity === 1 ? "brightness-90" : "cursor-pointer"
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
                      ${(parseFloat(price) * quantity).toFixed(2)}
                    </td>
                    <td className="text-start">
                      <MdDeleteForever
                        className=" text-customColor text-2xl cursor-pointer align-middle"
                        onClick={() => removeFromCart(items[index].id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div class="divide-y text-right px-5">
          {items.length === 0 ? (
            <>
              <p className="py-2">Your cart is empty.</p>
              <div className="py-2">
                <button className="h-[30px] w-[150px] overflow-hidden rounded-full bg-customColor text-md font-semibold text-white duration-300 mb-2 md:mb-0 uppercase hover:drop-shadow-md hover:brightness-90">
                  <a href="/menu">Browse Menu</a>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* <div class="px-2 pt-2">Subtotal: ${subtotal.toFixed(2)}</div> */}
              <div className="py-2">
                <button className="h-[30px] w-[150px] overflow-hidden rounded-full bg-customColor text-md font-semibold text-white duration-300 mb-2 md:mb-0 uppercase hover:drop-shadow-md hover:brightness-90">
                  <a href="/cart">Go to Cart</a>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
