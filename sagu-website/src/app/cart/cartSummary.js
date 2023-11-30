"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAppContext } from "@/contexts/Provider";

const CartSummary = () => {
  const { cartItems } = useAppContext();
  const { checkoutTotal, setCheckoutTotal, updateCheckoutTotal } =
    useAppContext();
  const { selectedTip, setSelectedTip } = useAppContext();
  const [customTip, setCustomTip] = useState("");
  const { isCustomTipActive, setIsCustomTipActive } = useAppContext();

  // Calculate the subtotal from items in the cart
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  // Calculate the final total by adding tip amounts to the subtotal
  const finalTotal = useMemo(() => {
    const tipAmount = isCustomTipActive
      ? parseFloat(customTip || 0)
      : parseFloat(selectedTip || 0);
    return subtotal + tipAmount;
  }, [subtotal, selectedTip, customTip]);

  // Update the final total states
  const updateTotal = () => {
    setCheckoutTotal(parseFloat(finalTotal).toFixed(2));
    updateCheckoutTotal(parseFloat(finalTotal).toFixed(2));
  };

  // function for calculating preset tip amounts
  function roundToNearest50Cents(amount) {
    const rounded = Math.round(amount * 2) / 2;
    const cents = rounded % 1;
    if (cents !== 0.5) {
      return (rounded + 0.5).toFixed(2);
    }
    return rounded.toFixed(2);
  }

  // function for handling when a preset tip is selected
  const handleTipClick = (percentage) => {
    if (isCustomTipActive) {
      setIsCustomTipActive(false);
      setCustomTip(null);
    }
    const tipAmount = parseFloat(roundToNearest50Cents(subtotal * percentage));
    setSelectedTip((prevTip) => (prevTip === tipAmount ? null : tipAmount));
  };

  // function for handling the custom tip selection
  const handleCustomTip = (e) => {
    setCustomTip(e.target.value);
    setSelectedTip(e.target.value);
    setIsCustomTipActive(true);
  };

  const tipPercentages = [0.05, 0.1, 0.15, 0.25];
  const seenTipAmounts = new Set();

  return (
    <div className="flex flex-col gap-3">
      {/* Tip Section */}
      <div className="bg-[#adaaaa] p-5 bg-opacity-20 rounded-md">
        <h1 className="text-lg font-bold">Add A Tip</h1>
        <div className="grid grid-cols-4 sm:grid-cols-4 grid-rows-2 gap-2 items-stretch w-full pt-2">
          {tipPercentages.map((percentage, index) => {
            const tipAmount = roundToNearest50Cents(subtotal * percentage);

            if (seenTipAmounts.has(tipAmount)) {
              return null;
            }

            seenTipAmounts.add(tipAmount);

            return (
              <button
                key={index}
                className={`rounded-lg py-3 text-sm md:text-lg font-bold ${
                  parseFloat(selectedTip).toFixed(2) === tipAmount ||
                  customTip === tipAmount
                    ? "bg-white text-customColor"
                    : "bg-customColor text-white"
                }`}
                onClick={() => handleTipClick(percentage)}
              >
                ${tipAmount}
              </button>
            );
          })}
          <button
            className={`col-span-4 rounded-lg py-3 text-xl font-bold ${
              isCustomTipActive
                ? "bg-white text-customColor"
                : "bg-customColor text-white"
            }`}
            onClick={() => {
              setCustomTip(null);

              setIsCustomTipActive(!isCustomTipActive);
            }}
          >
            Other
          </button>
          {isCustomTipActive && (
            <input
              type="number"
              value={customTip}
              onChange={handleCustomTip}
              className="col-span-4 rounded-lg py-3 px-6 text-xl font-bold text-customColor"
              placeholder="Custom Tip Amount"
            />
          )}
          {isCustomTipActive ||
            (selectedTip != null && (
              <button
                className={`col-span-4 rounded-lg py-3 text-xl font-bold ${
                  isCustomTipActive
                    ? "bg-white text-customColor"
                    : "bg-customColor text-white"
                }`}
                onClick={() => {
                  setIsCustomTipActive(false);
                  setCustomTip(null);
                  setSelectedTip(null);
                }}
              >
                Remove Tip
              </button>
            ))}
        </div>
      </div>

      {/* Summaries */}
      <div className="bg-[#adaaaa] p-5 bg-opacity-20 rounded-md">
        <div>
          <p className="text-lg font-bold">
            Subtotal: ${parseFloat(subtotal).toFixed(2)}
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
          <p className="text-lg ">
            <strong>Tax:</strong> <i>calculated at checkout</i>
          </p>
          <div className="my-4"></div>
          <hr className="border-gray-600 py-2" />
          <p className="text-lg font-bold">
            Total: ${parseFloat(finalTotal).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Service Method */}
      <div className="bg-[#adaaaa] p-5 bg-opacity-20 rounded-md">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-bold">Service Method</h2>
        </div>

        <div className="flex flex-col justify-between mb-4">
          <label htmlFor="pickup">
            <input
              type="radio"
              id="pickup"
              name="service-method"
              value="pickup"
            />
            <span className="ml-2">Pickup</span>
          </label>
          <label htmlFor="delivery">
            <input
              type="radio"
              id="delivery"
              name="service-method"
              value="delivery"
              disabled
            />
            <span className="ml-2">Delivery</span>
          </label>
        </div>

        <hr className="border-gray-600 py-2" />

        <div className="">
          <h2 className="text-lg font-bold">Review Order Settings</h2>
          <div className="flex justify-between items-center mt-2">
            <span>My Location</span>
            <button className="text-customColor px-2 py-1 underline hover:no-underline">
              Add Location
            </button>
          </div>
          <p className="text-sm mt-2 text-red-500">Please add your location</p>
          <p className="text-sm text-red-500">No branch available.</p>
        </div>
      </div>

      {/* Checkout Button */}
      <div>
        <button className="h-[50px] self-end overflow-hidden rounded-md bg-[#b7b6f5] text-md font-semibold text-white duration-300 mb-2 md:mb-0 uppercase hover:drop-shadow-md hover:brightness-90 w-full">
          <a href="/checkout" onClick={updateTotal()}>
            Proceed to Checkout
          </a>
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
