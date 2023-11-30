"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useAppContext } from "@/contexts/Provider.js";
import { useRouter } from "next/navigation";

const URL = "/api/login";
const url1 = `http://localhost:3001${URL}`;
const URLS = [url1];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoggedIn, setIsLoggedIn } = useAppContext();
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default behavior

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch(URLS[0], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      console.log('Login response data:', result);

      if (response.status === 401) {
        // If unauthorized, display the error message to the user
        alert(result.message);
      } else if (response.status === 200) {
        // On successful login, redirect to the /account page
        alert("Login successful");
        login(result.user);
        router.push("/account");
      } else {
        // For all other responses, throw an error
        throw new Error(result.message || "Login failed!");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="">
      <form action="" method="" class="">
        <div class="mb-5">
          <label>Email Address*</label>
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
        <div class="mt-10">
          <button
            type="button"
            className="bg-white text-black hover:drop-shadow-md hover:brightness-90 duration-300 font-bold rounded-lg px-10 h-[40px] w-full"
            onClick={handleLogin}
          >
            Log In
          </button>
        </div>
        {/* <div class="mt-5">
          <button
            type="button"
            className="bg-[#db4a39] text-white hover:drop-shadow-md hover:brightness-90 duration-300 font-bold rounded-lg px-10 h-[40px]"
            onClick={() => signIn("google")}
          >
            Continue with Google
          </button>
        </div> */}
      </form>
    </div>
  );
};

export default Login;
