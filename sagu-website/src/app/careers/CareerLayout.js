"use client";
import React from 'react'
import JoblayoutGrid from './CareerGrid'
import Image from "next/image";
import frame27 from "../../../public/assets/images/Frame 27.png";
import { useState } from 'react';

export const metadata = {
  title: "Careers | SAGU Bubble Tea",
  description: "Generated by Next.js",
};

function Careers() {
  const jobs = [
    {
      jobTitle: "Bubble Tea Barista",
      jobDescription: "Prepare and serve delicious bubble tea beverages with a friendly and efficient attitude."
    },
    {
      jobTitle: "Cashier",
      jobDescription: "Handle customer transactions accurately and provide excellent customer service at the checkout counter."
    },
    {
      jobTitle: "Store Manager",
      jobDescription: "Oversee daily operations, manage staff, and ensure the smooth functioning of the bubble tea store."
    },
    {
      jobTitle: "Kitchen Staff",
      jobDescription: "Assist in the preparation of ingredients, cooking, and maintaining cleanliness in the kitchen area."
    },
    {
      jobTitle: "Customer Service Representative",
      jobDescription: "Interact with customers, answer inquiries, and provide information about our bubble tea menu."
    },
    {
      jobTitle: "Delivery Driver",
      jobDescription: "Deliver bubble tea orders to customers with a focus on timeliness and customer satisfaction."
    },
    {
      jobTitle: "Inventory Manager",
      jobDescription: "Monitor and manage inventory levels, order supplies, and ensure stock availability."
    },
    {
      jobTitle: "Marketing Coordinator",
      jobDescription: "Create and implement marketing strategies to promote the bubble tea store, both online and offline."
    },
    {
      jobTitle: "Quality Control Specialist",
      jobDescription: "Ensure the quality and consistency of bubble tea products through regular testing and inspections."
    },
    {
      jobTitle: "Cleanliness Inspector",
      jobDescription: "Maintain the cleanliness of the store premises and equipment to meet hygiene standards."
    },
    {
      jobTitle: "Event Coordinator",
      jobDescription: "Organize and coordinate events, promotions, and collaborations to attract more customers to the bubble tea store."
    },
    {
      jobTitle: "Assistant Manager",
      jobDescription: "Assist the store manager in daily tasks, staff management, and operational responsibilities."
    }
  ];

  const[selectedCategory, setSelectedCategory] = useState(null);

  const baristaPositions = jobs.filter(job => ["Bubble Tea Barista", "Cashier", "Kitchen Staff"].includes(job.jobTitle));
  const managementPositions = jobs.filter(job => ["Store Manager", "Assistant Manager"].includes(job.jobTitle));
  const supportPositions = jobs.filter(job => !["Bubble Tea Barista", "Cashier", "Kitchen Staff", "Store Manager", "Assistant Manager"].includes(job.jobTitle));


  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  }

  const getCategoryJobs = () => {
    switch (selectedCategory) {
      case 'Barista':
        return baristaPositions;
      case 'Management':
        return managementPositions;
      case 'Support':
        return supportPositions;
      default:
        return jobs;
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-center my-10">Join the Sagu Family!</h1>
      <Image
      className="w-full h-25 rounded-2xl"
      src={frame27}
      alt="Picture of Sagu Family"/>
       <div className='flex justify-center'>
       
        <div className='flex grid grid-cols-3 gap-6 p-6 items-center justify-center'>
                <div className=''>
                    <button 
                        onClick={() => handleCategoryClick('Barista')}
                        className="w-[150px] h-10 bg-customColor rounded-[100px] hover:text-white shadow-md p-2"> Barista
                    </button>
                </div>
                <div>
                    <button 
                        onClick={() => handleCategoryClick('Management')}
                        className="w-[150px] h-10 bg-customColor rounded-[100px] hover:text-white shadow-md p-2">Management
                    </button>
                </div>
                <div>
                    <button 
                        onClick={() => handleCategoryClick('Support')}
                        className="w-[150px] h-10 bg-customColor rounded-[100px] hover:text-white shadow-md p-2">Support
                    </button>
                </div>
        </div>
       </div>

      <JoblayoutGrid jobs={getCategoryJobs()} />
    </div>
  )
}

export default Careers;