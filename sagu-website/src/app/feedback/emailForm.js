"use client";

import React, { useState } from 'react';

function Email(isFeedback, isJobApp) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const sendEmail = async() => {
        try {
            const response = await fetch('http://localhost:3001/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({
                    name, email, subject, message,
                }),
            });

            if (response.ok) {
                alert('Successfully received your feedback. Thank you!');

                setName('');
                setEmail('');
                setSubject('');
                setMessage('');
            } else {
                console.error('Failed to send email!');
                alert('Response Failed in mailHandler.js');
            }
        } catch (error) {
            console.error(`Error sending email: ${error}`);
            alert('Error sending an email!');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        sendEmail();
    }

    return (
        <form onSubmit={ handleSubmit } action="" method="">
            <div className="grid grid-cols-2 gap-6 mb-5">
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={ name }
                    placeholder="Full Name"
                    className="w-full rounded-md border-none bg-customColor py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md"
                    onChange={ (e) => setName(e.target.value) }
                />

                <input
                    type="email"
                    name="email"
                    id="email"
                    value={ email }
                    placeholder="Email"
                    className="w-full rounded-md border-none bg-customColor py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md"
                    onChange={ (e) => setEmail(e.target.value) }
                />
            </div>

            <div className="mb-5">
                <input
                    type="text"
                    name="subject"
                    id="subject"
                    value={ subject }
                    placeholder="Subject"
                    className="w-full rounded-md border-none bg-customColor py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md"
                    onChange={ (e) => setSubject(e.target.value) }
                />
            </div>

            <div className="mb-5">
                <textarea
                    rows="4"
                    name="message"
                    id="message"
                    value={ message }
                    placeholder="Body"
                    className="w-full resize-none rounded-md border-none bg-customColor py-3 px-6 text-base font-medium text-black outline-none  focus:shadow-md"
                    onChange={ (e) => setMessage(e.target.value) }
                />
            </div>

            <div>
                <button 
                    className="h-[40px] w-[159px] overflow-hidden rounded-full bg-customColor text-lg font-semibold text-white duration-300 mb-2 md:mb-0 uppercase hover:drop-shadow-md hover:brightness-90"
                    type='submit'
                >
                    Send
                </button>
            </div>
        </form>
    );
}

export default Email;