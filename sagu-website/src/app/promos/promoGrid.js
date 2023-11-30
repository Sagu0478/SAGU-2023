"use-client";

// Load required modules
import React from "react";
import Image from 'next/image';
import frame19 from "../../../public/assets/images/Frame 19.jpg";
import Link from "next/link";

/**
 * Creates the layout for the promo grid
 * @param {*} param0 the main info for a promo label
 * @returns The layout
 */
function PromoGrid({promos}) {
    return (
        // Using a grid layout to display
        <div className="grid grid-cols-1 gap-4 items-center overflow-x-auto no-scrollbar my-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {/* Mapping the promo items defined in a dictionary */}
            {promos.map(({ title, description, note, imageUrl }, index) => {
                return (
                    <div className="flex flex-col items-center">
                        <div className="flex flex-col border border-1 border-solid border-gray-500 gap-10">
                            <div className="relative w-48 md:w-60 h-64 md:h-80 overflow-hidden">
                            <Image 
                                className="w-full h-full"
                                src={process.env.NEXT_PUBLIC_API_URL + imageUrl}
                                alt={`Image of ${title}`}

                                layout="fill"
                                objectFit="cover"
                                objectPosition="center"
                            />
                            </div>
                            
                            <div className="flex flex-col gap-5 p-2">
                                <span className="text-black text-start font-public-sans text-2xl font-bold">
                                    {title}
                                </span>

                                <p className="text-black text-start font-public-sans">
                                    {description}
                                </p>

                                <Link href="/menu">
                                    <button class="h-[40px] w-[159px] overflow-hidden bg-customColor text-lg font-semibold text-white duration-300 mb-2 md:mb-0 uppercase hover:drop-shadow-md hover:brightness-90">
                                        Get a Bubble
                                    </button>
                                </Link>

                                <p className="text-black text-start font-public-sans text-sm font-light">
                                    {note}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default PromoGrid;