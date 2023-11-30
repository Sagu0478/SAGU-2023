import React, { useState } from 'react'


//After every 10 orders, the user gets a free boba tea
// initial point = 0
function Rewards({user}) {
    const Redeem = () => {
        if (user.points >= 10){
            SetUser({
                ...user, points:user.points - 10,
            });
            alert("Your points have been redeemed ! Your current points are ", user.points);
        }
        else{
            alert("You currently do not have enough points to redeem for this offer");
        }

         }
    }
    const AddPoints = () =>{
        if(user.order == true){
            SetUser.points(user.points + 1);
        }
        

    }
  return (
    <div>
        <div> 
            <h2 className = "text-bold px-6 py-4">
                For Every 10 orders, get a Boba Tea for free!
            </h2>
            <div> 
                <button 
                onClick={Redeem}
                className = " center flex bg-customColor  hover:bg-customColor text-black hover:text-white font-bold rounded-lg px-6 h-[30px]">
                        Redeem Points
                </button>
            </div>
        </div>
    </div>
  )




export default Rewards;