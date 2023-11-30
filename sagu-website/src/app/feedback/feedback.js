"use client";

import React from 'react';
import Email from './emailForm';
import { useAppContext } from '@/contexts/Provider';

function Feedback () {
    return (
        <div className="col-span-12 sm:col-span-8 flex flex-col p-1 justify-center order-first sm:order-none">
            <div>
              <h4 className="text-start text-2xl sm:text-2xl md:text-2xl font-medium pb-4">
                Send us your feedback!
              </h4>
              <p className="text-lg sm:text-2xl md:text-2xl pb-8">
                We value your time and experience with us, let us know how we
                are doing!
              </p>
            </div>

            <Email isFeedback={ true } isJobApp={ false } />
          </div>
    );
}

export default Feedback;