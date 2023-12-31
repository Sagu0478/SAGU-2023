import React from "react";
import ShoppingCart from "./shoppingCart";

export const metadata = {
  title: "Cart | SAGU Bubble Tea",
  description: "Generated by Next.js",
};

function Cart() {
  return (
    <div>
      {/* Heading */}
      {/* <section className="flex w-full mt-10 lg:mt-20 px-6 overflow-hidden">
        <div className="grid grid-cols-12 grid-rows-1 gap-6 items-stretch w-full">
          <div className="col-span-12 sm:col-span-5 flex flex-col p-1 justify-center order-last sm:order-none">
            <div>
              <h1 className="text-customColor text-start font-public-sans font-bold text-2xl">
                Your Cart
              </h1>
            </div>
          </div>
        </div>
      </section> */}

      {/* Shopping Cart */}
      <section className="flex w-full mt-10 lg:mt-20 mb-10 lg:mb-20 px-6 overflow-hidden">
        <ShoppingCart />
      </section>
    </div>
  );
}

export default Cart;
