"use client";

import FiEdit from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { useAppContext } from "@/contexts/Provider.js";
import { useRouter } from "next/navigation";
import RewardGrid from "./RewardGrid";
import images1 from "../../../public/assets/images/images 1.png";
import Image from "next/image";

function Profile() {
  const { user, logout } = useAppContext();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };


  const [isToggled, setIsToggled] = useState(false);

  const handleToggleData = () => {
    setIsToggled(!isToggled);
  };


  // const [points, setPoints] = useState(user ? user.points : 0);

  // useEffect(() => {
  //   if (user) {
  //     setPoints(user.points);
  //   }
  // }, [user]);

  // const Redeem = () => {
  //   if (Points >= 10) {
  //     SetUser({
  //       ...user,
  //       points: user.points - 10,
  //     });
  //     alert(
  //       "Your points have been redeemed ! Your current points are ",
  //       user.points
  //     );
  //   } else {
  //     alert("You currently do not have enough points to redeem for this offer");
  //   }
  // };

  // const AddPoints = () => {
  //   if (user?.order == true) {
  //     user?.point = user?.point  + 1;
  //   }
  // };

  const rewards = [
    {
      title: "Buy one, Get another 50%",
      description: "Buy one Large Bubble Tea, get another one free (any size)",
      promocode: "PRICE50"
    },
    {
      title: "Get 10% off your next order",
      description: "Enjoy a discount of 10% on your next purchase with us",
      promocode: "HELLO10"
    },
    {
      title: "LIMITED TIME: 4.99 for all drinks",
      description: "For a limited time only, large bubble tea for 4.99 only",
      promocode: "LIM499"
    },
  ];
  return (
    <div>
      <div className="font-bold">
        <div className="flex flex-col md:flex-row "> 
          <div className="flex flex-col gap-3">
            <h2 className="flex justify-start text-5xl font-bold p-4">Welcome {user?.first_name}!</h2>
            <Image
              className="align-center justify-center p-10 px-10"
              src={images1}
              alt="profile picture"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className=" p-2">Name</h2>
              <div className="flex w-full h-full bg-gray-100 rounded-[100px] p-2 grid-cols-2 gap-12 ">
                <h2> {user?.first_name}</h2>
                <h2 >{user?.last_name}</h2>
              </div>{" "}
              <br /> <br />
              <h2 className="p-2">Email Address</h2>
              <div className="flex w-full h-full bg-gray-100 rounded-[100px] p-2">
                
                <h2> {user?.email}</h2>
              </div>
              <br />
              <div>  
                <h2 className="p-4"> Address </h2>
                <div className="flex w-full h-full bg-gray-100 rounded-[100px] p-2">    
                    <h2 className=" flex w-full h-full bg-gray-100 rounded-[100px] p-2"
                    >{user?.address}</h2>
              </div>
        

                  <div className="p-2">
                    <h2> Phone Number</h2>
                    <h2 className=" flex w-full h-full bg-gray-100 rounded-[100px] p-2">{user?.mobile}</h2>
                  </div>
                </div>
              </div>
          </div>
        </div>

        {/* SAGU Rewards */}
        <div>
          {" "}
          <div>
            <h2 
            className="text-black text-3xl font-bold align-center">
              SAGU Rewards
            </h2>
          </div>

          <div>
            <div className="flex justify-center">
                <h2 className = "text-bold px-6 py-4">
                  For Every 10 orders, get a Boba Tea for free!
              </h2>
            </div>

            <br/>
            <h3 className="text-2xl">
              <span className="text-4xl">{user?.point}</span>/10
            </h3>{" "}
            <br />
          </div>
          {/* Rewards Bar*/}
          <div>
            {/* Outer Bar */}
            <div className="w-100 h-10 bg-customColor rounded-[100px] border border-black shadow-md">
              {/* Inner Bar */}
              <div 
              className="w-[150px] h-10 bg-white rounded-[100px] border border-black shadow-md"
              ></div>
            </div>
          </div>
          <br />
          <div>
            <button 
            className="w-[150px] h-10 bg-customColor rounded-[100px] hover:text-white shadow-md"
            onclick={handleToggleData}>
              {/* Reward Details */}
              {isToggled ? 'Hide Rewards Details' : " Reward Details"}
            </button>
            {isToggled && <div>
              <h2>
              Imagine treating yourself to your favorite boba flavors not just once, but TEN times!
              
              And guess what? On your TENTH order, you&apos;ll receive a FREE, mouthwatering boba delight that&apos;ll leave
              you jumping for joy! 
              </h2>
              <p>
              It&apos;s as easy as 1, 2, 3:
              <br/>
              Place an order.
              Keep counting until you reach TEN.
              Voila! Your FREE Boba is here to brighten your day!
              </p>
              </div>}
          </div>
          <div>
            
          </div>
          {/* More Rewards */}
          <div 
          className="text-md hover:underline">
          More Rewards</div>
          <br />
          <section>
            <RewardGrid rewards={rewards} />
          </section>
          <br />
          <div>
            <div>
              <h2 className="text-black text-3xl font-bold align-center"> Recent Orders </h2>
            </div>
          </div>
          {/* Sign out Button */}
          <div className="flex justify-center p-6">
            <button className=" w-[150px] h-10 bg-customColor rounded-[100px] hover:text-white shadow-md" onClick={() => handleLogout()}>
              Sign out
            </button>
          </div>
        </div>
      </div>
  );
}

export default Profile;
