import Image from 'next/image';
import React from 'react';
import storeIMG from "../../../public/assets/images/IMG_4364.JPG";

export const metadata = {
  title: "Terms & Conditions | SAGU Bubble Tea",
  description: "Generated by Next.js",
};

// Created a dictionary for the style of the information section
const infoText = [
  {
    title: "Terms & Conditions 1",
    body: "Voluptate mollit sit sunt ipsum consequat est dolor aliqua Lorem. Cillum laboris ex pariatur exercitation quis labore nisi magna nulla. Incididunt nostrud laboris Lorem minim esse ipsum proident proident exercitation id Lorem sunt sit. Ad aute in qui id in."
  },
  {
    title: "Terms & Conditions 2",
    body: "Voluptate mollit sit sunt ipsum consequat est dolor aliqua Lorem. Cillum laboris ex pariatur exercitation quis labore nisi magna nulla. Incididunt nostrud laboris Lorem minim esse ipsum proident proident exercitation id Lorem sunt sit. Ad aute in qui id in."
  },
  {
    title: "Terms & Conditions 3",
    body: "Voluptate mollit sit sunt ipsum consequat est dolor aliqua Lorem. Cillum laboris ex pariatur exercitation quis labore nisi magna nulla. Incididunt nostrud laboris Lorem minim esse ipsum proident proident exercitation id Lorem sunt sit. Ad aute in qui id in."
  },
  {
    title: "Terms & Conditions 4",
    body: "Voluptate mollit sit sunt ipsum consequat est dolor aliqua Lorem. Cillum laboris ex pariatur exercitation quis labore nisi magna nulla. Incididunt nostrud laboris Lorem minim esse ipsum proident proident exercitation id Lorem sunt sit. Ad aute in qui id in."
  },
  {
    title: "Terms & Conditions 5",
    body: "Voluptate mollit sit sunt ipsum consequat est dolor aliqua Lorem. Cillum laboris ex pariatur exercitation quis labore nisi magna nulla. Incididunt nostrud laboris Lorem minim esse ipsum proident proident exercitation id Lorem sunt sit. Ad aute in qui id in."
  },
  {
    title: "Terms & Conditions 6",
    body: "Voluptate mollit sit sunt ipsum consequat est dolor aliqua Lorem. Cillum laboris ex pariatur exercitation quis labore nisi magna nulla. Incididunt nostrud laboris Lorem minim esse ipsum proident proident exercitation id Lorem sunt sit. Ad aute in qui id in."
  }
];

function TermsAndConditions() {
  return (
    <div>
      {/* Tittle & Picture */}
      <section className="flex flex-grow items-center max-w-screen-xl my-10 lg:my-20 px-6 overflow-hidden">
        <div className="flex flex-col gap-10 items-center">
          <h1 className="text-black text-2xl font-bold md:text-4xl lg:text-5xl">
            SAGU Bubble Tea Terms & Conditions
          </h1>

          <Image
            className='flex w-full h-full drop-shadow-lg items-stretch'
            src={storeIMG}
          />
        </div>
      </section>

      {/* Text Section */}
      <section className='flex flex-grow items-center max-w-screen-xl my-10 lg:my-20 px-6 overflow-hidden'>
        <div className='flex flex-col gap-5'>
          {infoText.map(({ title, body }, index) => {
            return (
              <div key={ index } className='flex flex-col gap-4'>
                <h2 className='text-black font-medium font-public-sans text-xl md:text-2xl'>
                  {title}
                </h2>

                <p className='text-black font-normal font-red-hat'>
                  {body}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  )
}
  
  export default TermsAndConditions;