"use client";

import React from "react";
import { useAppContext } from "@/contexts/Provider";
import ItemsInCart from "./itemsInCart";
import CartSummary from "./cartSummary";

function ShoppingCart() {
  const { cartItems } = useAppContext();
  const cart = [];

  return (
    <section className="flex flex-col sm:flex-row w-full mt-1 lg:mt-2">
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-stretch w-full">
        <div
          className={`col-start-1 col-span-4 row-start-1 sm:row-start-1 w-auto h-auto ${
            cartItems.length < 0 ? "sm:col-span-12" : "sm:col-span-4"
          }`}
        >
          <h1 className="text-customColor text-start font-public-sans font-bold text-2xl whitespace-nowrap">
            Your Cart
          </h1>
        </div>
        {cartItems.length > 0 && (
          <div className="col-start-1 col-span-4 row-start-3 sm:row-start-1 sm:col-start-9 h-auto">
            <h1 className="text-customColor text-start font-public-sans font-bold text-2xl">
              Summary
            </h1>
          </div>
        )}
        {/* Items in Cart */}
        <div
          className={`col-span-12 ${
            cartItems.length > 0 ? "sm:col-span-8" : "sm:col-span-12"
          } row-start-2 sm:row-start-2 flex flex-col justify-start`}
        >
          <ItemsInCart menuItems={cartItems} cart={cart} />
        </div>

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <>
            <div className="col-span-12 sm:col-span-4 row-start-4 sm:row-start-2 flex flex-col justify-start gap-5">
              <CartSummary />
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default ShoppingCart;
