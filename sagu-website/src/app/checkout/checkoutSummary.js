"use client";

import React from "react";
import { useAppContext } from "@/contexts/Provider";
import CheckoutCart from "./checkoutCart.js";

function checkoutSummary() {
  const { checkoutTotal, selectedTip } = useAppContext();
  const { cartItems } = useAppContext();
  const cart = [];

  const TAX_RATE = 0.11;
  const tax = (checkoutTotal - selectedTip) * TAX_RATE;
  const finalTotal = tax + parseFloat(checkoutTotal);

  return (
    <div>
      <div className="bg-[#adaaaa] p-5 bg-opacity-20 rounded-md">
        <div>
          <p className="text-lg font-bold">
            Subtotal: ${parseFloat(checkoutTotal - selectedTip).toFixed(2)}
          </p>
          {selectedTip === null ? (
            <></>
          ) : (
            <p className="text-lg font-bold">
              Tip: ${parseFloat(selectedTip).toFixed(2)}
            </p>
          )}

          <div className="my-4"></div>
          <hr className="border-gray-600 py-2" />
          <p className="text-lg font-bold">
            Tax: ${parseFloat(tax).toFixed(2)}
          </p>
          <div className="my-4"></div>
          <hr className="border-gray-600 py-2" />
          <p className="text-lg font-bold">
            Total: ${parseFloat(finalTotal).toFixed(2)}
          </p>
        </div>
      </div>

      <CheckoutCart menuItems={cartItems} cart={cart} />
    </div>
  );
}

export default checkoutSummary;
