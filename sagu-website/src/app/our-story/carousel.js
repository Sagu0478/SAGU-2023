"use client";
import Image from "next/image";

import React, { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import Rectangle16 from "../../../public/assets/images/Rectangle 16.png";
import Rectangle17 from "../../../public/assets/images/Rectangle 17.png";
import frame33 from "../../../public/assets/images/Frame 33.png";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else {
        setCurrentIndex(images.length - 1);
      }
  };

  const images = [Rectangle17, Rectangle16, frame33];

  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative transition-all duration-300">
      {/* Carousel images */}
      <div className="flex justify-center items-center w-full h-[250px] relative">
        {/* Left Image */}
        <div
          className="-translate-x-[100%] left-0 w-1/4 h-3/4 flex items-center justify-end"
          onClick={handlePrevious}
        >
          {currentIndex > 0 && (
            <Image
              alt="Previous Carousel item"
              className="opacity-50 object-cover w-full h-full blur-[2px]"
              src={images[currentIndex - 1]}
            />
          )}
        </div>

        {/* Main Image */}
        <div className="absolute w-1/2 h-full flex items-center justify-center z-50">
          <Image
            alt="Main Carousel item"
            className="drop-shadow-lg object-cover w-full h-full"
            src={images[currentIndex]}
          />
        </div>

        {/* Right Image */}
        <div
          className="translate-x-[100%] right-0 w-1/4 h-3/4 flex items-center justify-start"
          onClick={handleNext}
        >
          {currentIndex < images.length - 1 && (
            <Image
              alt="Next Carousel item"
              className="opacity-50 object-cover w-full h-full blur-[2px]"
              src={images[currentIndex + 1]}
            />
          )}
        </div>
      </div>

      <div class="flex justify-between justify-items-center w-4/5 z-100">
        {/* Left arrow */}
        <div className="top-1/2 left-0 transform -translate-y-1/2">
          <AiOutlineArrowLeft
            className="text-[#6E6BEA] w-6 h-6 cursor-pointer"
            onClick={handlePrevious}
          />
        </div>

        {/* Right arrow */}
        <div className="top-1/2 right-0 transform -translate-y-1/2">
          <AiOutlineArrowRight
            className="text-[#6E6BEA] w-6 h-6 cursor-pointer"
            onClick={handleNext}
          />
        </div>
      </div>
    </div>
  );
}

export default Carousel;
