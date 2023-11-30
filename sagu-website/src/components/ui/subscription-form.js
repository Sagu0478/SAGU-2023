"use client";
import React, { useState } from "react";
import { useAppContext } from "@/contexts/Provider.js";

const URL = "/api/subscribe";
const url1 = `http://localhost:3001${URL}`;
const URLS = [url1];

const SubscriptionForm = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Split the full name into first and last names
  const names = fullName.trim().split(/\s+/); // This regex splits by one or more spaces
  const first_name = names[0];
  const last_name = names.length > 1 ? names[names.length - 1] : "";

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Perform the subscription by sending a POST request to your API endpoint
    const response = await fetch(URLS[0], {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        first_name: first_name,
        last_name: last_name,
        preferences: [], // Add any other preferences you want to include
      }),
    });

    const data = await response.json();
    if (response.ok) {
      // Handle success
      console.log("Subscription successful", data);
      alert("Subscription successful");
      // Reset form or show a success message
    } else {
      // Handle error
      console.error("Subscription failed", data.error);
      alert("An error occurred Subscription. Please try again.");
      // Show an error message
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-auto flex-col text-center justify-center mb-3"
    >
      <div className="mb-4 container md:w-3/5 mx-auto">
        <h2 className="text-xl mb-2 font-medium uppercase">
          Join The Sagu Club!
        </h2>
        <p>
          Create a profile with SAGU Bubble Tea to earn SAGU points, for a
          chance to get a free drink on us. Make sure to opt-in our weekly
          newsletter, so you will never miss out on fun and exciting upcoming
          events!
        </p>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-5">
        <input
          type="text"
          placeholder="Full Name"
          className="duration-300 p-2 w-full sm:w-[240px] h-[40px] rounded-2xl"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="email" // Changed to type email for proper validation
          placeholder="Email Address" // Changed placeholder to Email Address
          className="duration-300 p-2 w-full sm:w-[240px] h-[40px] rounded-2xl"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required // Make sure the email is required
        />
        <input
          type="tel" // Changed to type tel for proper validation
          placeholder="Phone Number"
          className="duration-300 p-2 w-full sm:w-[240px] h-[40px] rounded-2xl"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button
          type="submit"
          className="h-[40px] w-[100px] overflow-hidden rounded-2xl bg-white text-lg font-semibold text-[#b7b6f5] duration-300 hover:text-black uppercase hover:bg-white/60"
        >
          Enter
        </button>
      </div>
    </form>
  );
}

export default SubscriptionForm;
