import Image from "next/image";
import OurStoryAbountUs from "./about-us.js";
import OurStoryOurGoal from "./our-goal.js";
import StoreHours from "./store-hours.js";
import axios from "axios";


export const metadata = {
  title: "Our Story | SAGU Bubble Tea",
  description: "Generated by Next.js",
};

import IMG_4364 from "../../../public/assets/images/IMG_4364.JPG";
import frame32 from "../../../public/assets/images/Frame 32.png";
import frame33 from "../../../public/assets/images/Frame 33.png";
import frame34 from "../../../public/assets/images/Frame 34.png";
import frame40 from "../../../public/assets/images/Frame 40.png";
import Carousel from "./carousel.js";

function OurStory() {
  return (
    
    <div>
      {/* About Us */}
      <section class="flex max-w-screen-xl mt-10 lg:mt-20 px-6 overflow-hidden">
        <div class="grid grid-cols-12 grid-rows-1 gap-6 items-stretch w-full">
          <Image
            class="col-span-12 sm:col-span-6 order-first sm:order-none flex items-stretch drop-shadow-lg max-h-[200px] sm:max-h-[354px] object-cover w-full h-full rounded-lg"
            src={IMG_4364}
          />

          <div class="col-span-12 sm:col-span-6 sm:col-start-7 flex flex-col p-1 justify-center order-last sm:order-none ">
            <div>
              <h1 class="text-xl sm:text-3xl md:text-4xl font-medium pb-4 uppercase">
                About Us
              </h1>
              <OurStoryAbountUs/>
            </div>
          </div>
        </div>
      </section>

      {/* Our Goal */}
      <section class="flex max-w-screen-xl mt-10 lg:mt-20 px-6 overflow-hidden">
        <div class="grid grid-cols-12 grid-rows-1 gap-6 items-stretch w-full">
          <div class="col-span-12 sm:col-span-6 flex flex-col p-1 justify-center order-last sm:order-none ">
            <div>
              <h1 class="text-xl sm:text-3xl md:text-4xl font-medium pb-4 uppercase">
                Our Goal
              </h1>
              <OurStoryOurGoal/>
            </div>
          </div>

          <div class="col-span-12 sm:col-span-6 sm:col-start-7 order-first sm:order-none flex items-stretch drop-shadow-lg  object-cover w-full h-full rounded-lg justify-center">
            <Carousel />
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section class="flex max-w-screen-xl my-10 lg:mt-20 px-6 overflow-hidden">
        <div class="grid grid-cols-12 grid-rows-1 gap-6 items-stretch w-full place-content-center">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2610.148688336281!2d-102.99809042248518!3d49.14080128078939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x532023f8f347a375%3A0x4526b8b013b660b5!2sSAGU%20Bubble%20Tea%20Mobile%20Store!5e0!3m2!1sen!2sca!4v1697974575248!5m2!1sen!2sca"
            class="border-none col-span-12 sm:col-span-8 order-first sm:order-none flex max-h-[300px] sm:max-h-[450px] max-w-full sm:max-w-[750px] object-cover w-full h-[470px] rounded-lg"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>

          <div class="col-span-12 sm:col-span-6 sm:col-start-9 flex flex-col p-1 order-last sm:order-none ">
            <div class="flex flex-col items-center justify-between h-full sm:items-start">
              <h1 class="text-xl sm:text-3xl md:text-4xl font-medium pb-4 uppercase">
                Location & Hours
              </h1>
              <ul class="sm:leading-10 text-center sm:text-start">
                <StoreHours/>
              </ul>
              <a 
                class="pt-3 sm:p-0 text-center sm:text-start"
                href="https://maps.app.goo.gl/fyV5yxF74cKZvym28"
              >
                1213 4th Street Estevan, SK S4A
                <br />
                0W8306-471-6000
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

OurStory.getInitialProps = async (ctx) => {

  // Replace this URL with the actual URL from which you need to fetch data
  const res = await axios.get('http://localhost:1337/api/our-stories');
    
  // Here we're just mimicking a response, replace it with your actual data
  console.log("testing");
  const aboutUs = "Default About Us text";
  const ourGoal = "Default Our Goal text";
    
  return { aboutUs, ourGoal };
};

export default OurStory;
