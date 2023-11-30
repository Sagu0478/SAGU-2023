"use client";

import {
  CreditCard,
  PaymentForm,
  ApplePay,
  GooglePay,
  Ach,
} from "react-square-web-payments-sdk";
import React, { useEffect, useMemo } from "react";
import { useAppContext } from "@/contexts/Provider";

function SquarePaymentForm() {
  const { checkoutTotal, selectedTip } = useAppContext();

  const TAX_RATE = 0.11;
  const tax = (checkoutTotal - selectedTip) * TAX_RATE;
  const finalTotal = tax + parseFloat(checkoutTotal);
  const subtotal = checkoutTotal - selectedTip;

  const totalAsInt = Math.round(finalTotal * 100 || 0);
  console.log({ totalAsInt, type: typeof totalAsInt });

  const totalAsString = (finalTotal).toFixed(2).toString();
  console.log({ totalAsString, type: typeof totalAsString });


  const calculateTotal = (lineItems) => {
    const amount = lineItems
        .reduce((total, lineItem) => {
            return total + parseFloat(lineItem.amount);
        }, 0.0)
        .toFixed(2);
 
    return { amount, label: 'Total' };
  }
  let lineItems = [
    {amount: "0.00", label: 'Subtotal'},
    {amount: "0.00", label: 'Tip'},
    {amount: "0.00", label: 'Tax'},
  ];

  let total = calculateTotal(lineItems);
  return (
    <div className="flex flex-col gap-3">
      {/* Square Payment Form */}
      <div className="bg-[#adaaaa] p-5 bg-opacity-20 rounded-md">
        <PaymentForm
          applicationId={process.env.NEXT_PUBLIC_SQUARE_SANDBOX_APPLICATION_ID}
          locationId={process.env.NEXT_PUBLIC_SQUARE_SANDBOX_LOCATION_ID}
          cardTokenizeResponseReceived={async (token, buyer) => {
            const response = await fetch("http://localhost:3001/api/pay", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                sourceId: token.token,
                amount: totalAsInt,
              }),
            });
            alert(JSON.stringify(await response.json(), null, 2));
          }}
          createPaymentRequest={() => ({
            countryCode: "CA",
            currencyCode: "CAD",
            lineItems,
            requestBillingContact: true,
            requestShippingContact: true,
            total,
          })}
        >
          <ApplePay />
          <br />
          <GooglePay />
          <br />
          <CreditCard />
          {/* Direct Debit Pay */}
          {/* <Ach/> */}
        </PaymentForm>
      </div>
    </div>
  );
}

export default SquarePaymentForm;
