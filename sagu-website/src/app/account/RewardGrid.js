import React from 'react'
import Image from "next/image";
import frame27 from "../../../public/assets/images/Frame 27.png";
import { useAppContext } from "@/contexts/Provider.js";

function RewardGrid({ rewards }) {
    

    /**
     * Creates a grid of personalized rewards for the user 
     * Contains: a picture, title, description and a button to redeem rewards
     */
    return (
        <div>
            <div className="grid grid-cols-3 gap-6 text-md p-2">
                {rewards.map(({title,description,promocode},index) =>{
                    return(
                        <div className=" items-center p-2">
                            <div className="border border-black rounded-2xl">
                                <Image 
                                    className="w-full h-full rounded-2xl"
                                    src={frame27} 
                                    alt="Bubble tea picture" />
                            
                                <div className="p-2">
                                    <span className="text-2xl font-bold">
                                        {title}
                                    </span>
                                    <p className='text-black'>
                                        {description}
                                        
                                    </p>
                                    <p className="font-bold">
                                        PROMOCODE : {promocode}
                                    </p>
                                </div>

                                <div className="flex justify-center">
                                    <button 
                                    className=' w-[150px] h-10 bg-customColor rounded-[100px] hover:text-white shadow-md p-2'>
                                            Redeem
                                    </button>
                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>

        </div>
    )
}

export default RewardGrid;