import Link from 'next/link';
import React, { useState, useRef, useEffect } from 'react';
import CareerApplication from './careerApplication.js';

function  JobLayout({jobs}){
    const [selectedJob, setSelectedJob] = useState(null);
    const applicationFormRef = useRef(null);


    const handleApplyClick = (jobTitle) => {
        setSelectedJob(jobTitle);
    };

    useEffect(() => {
        // Scroll to the application form
        if (selectedJob && applicationFormRef.current) {
            applicationFormRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedJob]);

    /**
     * This function will be used to create the layout for the job application page
     * Contains job title, job description, and a button to apply
     */
    return(
        <div>
            <div className='flex grid grid-cols-3 gap-6'>
                {jobs.map(({jobTitle,jobDescription},index) =>{
                    return(
                        <div className="flex items-center justify-center p-2">
                            <div className="border border-black rounded-2xl p-2 text-center ">
                                <div className="p-2">
                                    <p className='text-black text-3x1 font-bold'>
                                        {jobTitle}
                                        
                                    </p>
                                    <p className="">
                                        {jobDescription}
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    {/* <Link href="/careerApplication"> */}
                                    <button 
                                    onClick= {() => handleApplyClick(jobTitle)}
                                    className='w-[150px] h-10 bg-customColor rounded-[100px] hover:text-white shadow-md p-2'>
                                            Apply
                                    </button>
                                    {/* </Link> */}
                                </div>
                        
                            </div>
                            
                        </div>
                    );
                })}
            </div>
            <div>
              {selectedJob ? <CareerApplication ref={applicationFormRef} jobTitle={selectedJob} /> : <></>}  
              
            </div>
            
        </div>
    );
}

export default JobLayout;