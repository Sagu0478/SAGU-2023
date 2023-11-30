import SubscriptionForm from "@/components/ui/subscription-form.js";

import Image from "next/image";
import { HiLocationMarker } from "react-icons/hi";
import {
  AiOutlineInstagram,
  AiOutlineFacebook,
  AiOutlineTwitter,
} from "react-icons/ai";

import logo from "../../public/assets/images/SAGU logo 1.png";

function Footer() {
  return (
    <footer className="bg-customColor font-red-hat-display duration-300 inset-x-0 bottom-0 justify-center min-w-[320px] overflow-x-hidden">
      <div className="items-center py-10 px-6 mx-auto justify-between max-w-screen-xl">
        {/* Footer Form */}
        {/* <div className="flex flex-auto flex-col text-center justify-center mb-3">
          <div className="mb-4 container md:w-3/5 mx-auto">
            <h2 className="text-xl mb-2 font-medium uppercase">
              Join The Sagu Club!
            </h2>
            <p>
              Create a profile with SAGU Bubble Tea to earn SAGU points, for a
              chance to get a free drink on us. Make sure to opt-in our weekly
              news letter, so you will never miss out on fun and exciting
              upcoming events!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-5">
            <input
              type="text"
              placeholder="Full Name"
              className="duration-300 p-2 w-full sm:w-[240px] h-[40px] rounded-2xl"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="duration-300 p-2 w-full sm:w-[240px] h-[40px] rounded-2xl"
            />
            <button className="h-[40px] w-[100px] overflow-hidden rounded-2xl bg-white text-lg font-semibold text-[#b7b6f5] duration-300 hover:text-black uppercase hover:bg-white/60">
              Enter
            </button>
          </div>
        </div> */}
        <SubscriptionForm />

        {/* Footer Links */}
        <div className="flex flex-row flex-wrap flex-grow mt-10 text-left md:mt-0 h-full items-end">
          <div className="w-full text-center md:w-1/3 md:items-start flex flex-col items-center">
            <div className="md:text-left">
              <a 
                className="flex justify-center md:justify-start"
                href="/"
              >
                <Image src={logo} height={90}/>
              </a>
              <a 
                className="flex justify-center md:justify-start items-center"
                href="https://maps.app.goo.gl/fyV5yxF74cKZvym28"
              >
                <HiLocationMarker />
                <p className="ml-2">1234 St, Estevan, SK S4A 0W8</p>
              </a>
            </div>
          </div>
          <div className="w-full text-center md:w-1/3">
            <nav className="flex text-center list-none justify-center my-3">
              <li className="mx-2 hover:scale-110 transition-all">
                <a className="duration-300 cursor-pointer hover:text-white">
                  <AiOutlineInstagram className="w-7 h-7" />
                </a>
              </li>
              <li className="mx-2 hover:scale-110 transition-all">
                <a 
                  className="duration-300 cursor-pointer hover:text-white"
                  href="https://www.facebook.com/sagububbleteaesTEAvan"
                >
                  <AiOutlineFacebook className="w-7 h-7" />
                </a>
              </li>
              <li className="mx-2 hover:scale-110 transition-all">
                <a className="duration-300 cursor-pointer hover:text-white">
                  <AiOutlineTwitter className="w-7 h-7" />
                </a>
              </li>
            </nav>
            <nav className="text-center list-none ">
              <li className="">
                <a
                  href="/terms-and-conditions"
                  clasName="duration-300 hover:text-white cursor-pointer"
                >
                  Terms & Conditions
                </a>
              </li>
              <li className="">
                <a
                  href="/privacy-policy"
                  className="duration-300 hover:text-white cursor-pointer"
                >
                  Privacy Policy
                </a>
              </li>
            </nav>
          </div>
          <div className="w-full text-center md:w-1/3">
            <nav className="md:text-right list-none ">
              <li className="">
                <a
                  href="/menu"
                  className="duration-300 hover:text-white cursor-pointer"
                >
                  Menu
                </a>
              </li>
              <li className="">
                <a
                  href="/promos"
                  className="duration-300 hover:text-white cursor-pointer"
                >
                  Promos
                </a>
              </li>
              <li className="">
                <a
                  href="/careers"
                  className="duration-300 hover:text-white cursor-pointer"
                >
                  Careers
                </a>
              </li>
              <li className="">
                <a
                  href="/our-story"
                  className="duration-300 hover:text-white cursor-pointer"
                >
                  Our Story
                </a>
              </li>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
