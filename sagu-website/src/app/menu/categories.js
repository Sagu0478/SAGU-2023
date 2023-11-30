"use client"

import React, { useEffect, useState } from 'react';
import {AiOutlineSearch} from "react-icons/ai";
import MenuItems from "./menuItems";

/**
 * Simple category link for the side nav menu
 * @param {*} param0 
 * @returns 
 */
function Categories({ category, headingType, underline, size, onSelect }) {
  const Tag = headingType;
  const classes = `text-${size} text-black text-center font-public-sans font-bold ${underline ? 'underline' : ''}`;

  return (
    <Tag
      onClick={() => onSelect(category)}
      className={classes}
      style={{ cursor: 'pointer' }}
    >
      {category}
    </Tag>
  );
}
  
function DisplayCategories () {

  const [selectedCategory, setSelectedCategory] = useState("Bubble Tea");

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <section className="flex flex-col gap-12 max-w-screen-xl mt-20 mb-20 px-6 sm:flex-row">
        {/* Left-side navigation menu */}
        <div className="flex-grow w-full sm:w-1/3 px-4 py-8 items-center gap-12 bg-[#b7b6f5] bg-opacity-20 shadow-lg">
          <div className="flex flex-col items-center gap-10">
            {/* Search Bar */}
            <form action='' method=''>
              <div className='flex flex-shrink gap-2'>
                <input
                  type='text'
                  name="item"
                  id="item"
                  placeholder="Search for an item"
                  className="p-1"
                />
                <a 
                href="/account"
                className="duration-300 cursor-pointer hover:text-white hover:scale-110 transition-all"
                >
                <AiOutlineSearch className="w-5 h-5 md:w-7 md:h-7" />
                </a>
              </div>
            </form>

            {/* Menu Categories */}
            <div className="flex flex-col items-center gap-8">
              <div className="w-[146px] h-[26px] justify-center items-center">
                <Categories category="Sagu's Menu" headingType="span" underline={true} size="2xl" onSelect={handleSelectCategory}/>
              </div>

              <div className="flex flex-col items-center gap-[20px]">
                <Categories category="Bubble Tea" headingType="span" underline={false} size="lg" onSelect={handleSelectCategory}/>
                <Categories category="Pinoy Dishes" headingType="span" underline={false} size="lg" onSelect={handleSelectCategory}/>
                <Categories category="Pinoy Snacks" headingType="span" underline={false} size="lg" onSelect={handleSelectCategory}/>
                <Categories category="Pastries / Deserts" headingType="span" underline={false} size="lg" onSelect={handleSelectCategory}/>
                <Categories category="Frozen Items" headingType="span" underline={false} size="lg" onSelect={handleSelectCategory}/>
                <Categories category="Other" headingType="span" underline={false} size="lg" onSelect={handleSelectCategory}/>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Gallery */}
        <div className="flex flex-col w-full items-center gap-8 overflow-hidden sm:overflow-hidden">
          <span className="text-black text-center font-public-sans font-bold text-4xl">
            Featured Items
          </span>

          <MenuItems  category={selectedCategory}/> 

        </div>
      </section>
    </div>
  )
}
export default DisplayCategories;