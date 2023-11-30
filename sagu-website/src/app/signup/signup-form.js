"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const URL = "/api/signup";
const url1 = `http://localhost:3001${URL}`;
const URLS = [url1];

const Signup = () => {
  // State for the form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setPhoneNumber] = useState("");
  // State for the address fields
  const [apartment, setApartment] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Concatenate address fields
    const address =
      `${apartment} ${street} ${city} ${province} ${postalCode}`.trim();

    const userData = {
      firstName,
      lastName,
      email,
      password,
      mobile,
      address, // Add the address to the user data object
    };

    // Validations
    if (!email.includes("@")) {
      alert("Please provide a valid email address.");
      return;
    }
    if (password.length < 6) {
      alert("Password should be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Fetch call to the API
    try {
      const response = await fetch(URLS[0], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.status === 200) {
        alert(data.message);
        // Additional success logic here
        router.push("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("There was a problem processing your request. Please try again.");
    }
  };

  return (
    <div>
      <form action="" method="" class="" onSubmit={handleSignup}>
        {/* First Name & Last Name */}
        <div className="grid grid-cols-2 grid-rows-1 gap-5 mb-5">
          <div class="">
            <label>First Name</label>
            <input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="John"
              class="w-full rounded-md border-none bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div class="">
            <label>Last Name</label>
            <input
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Doe"
              class="w-full rounded-md border-none bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Email */}
        <div class="mb-5">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email Address"
            class="w-full rounded-md border-none bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div class="mb-5">
          <label>Password*</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            class="w-full rounded-md border-none bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md"
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>

        {/* Confirm Password */}
        <div class="mb-5">
          <label>Confirm Password*</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            class="w-full rounded-md border-none bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></input>
        </div>

        {/* Phone Number */}
        <div class="mb-5">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone_number"
            id="phone_number"
            placeholder="Phone Number"
            class="w-full rounded-md border-none bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Address */}
        <div className="grid grid-cols-3 grid-rows-2 gap-5 mb-5">
          <div class="">
            <label>Apartment</label>
            <input
              type="text"
              name="apartment"
              id="apartment"
              placeholder="Apartment"
              class="w-full rounded-md border-none bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md"
              onChange={(e) => setApartment(e.target.value)}
            />
          </div>

          <div class="">
            <label>Street</label>
            <input
              type="text"
              name="street"
              id="street"
              placeholder="Street"
              class="w-full rounded-md border-none bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md"
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>

          <div class="">
            <label>City</label>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="City"
              class="w-full rounded-md border-none bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div class="">
            <label>Province</label>
            <input
              type="text"
              name="province"
              id="province"
              placeholder="Province"
              class="w-full rounded-md border-none bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md"
              onChange={(e) => setProvince(e.target.value)}
            />
          </div>

          <div class="">
            <label>Postal Code</label>
            <input
              type="text"
              name="postal_code"
              id="postal_code"
              placeholder="Postal Code"
              class="w-full rounded-md border-none bg-white py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md"
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div class="flex justify-center mb-5">
          <button
            type="submit"
            className="bg-white text-black hover:drop-shadow-md hover:brightness-90 duration-300 font-bold rounded-lg px-10 h-[30px]"
          >
            Create an Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
