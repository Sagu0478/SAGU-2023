"use client";

import React, { useState, forwardRef } from "react";

const CareerApplication = forwardRef(({ jobTitle }, ref) => {
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [resume, setResume] = useState(null);
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [attractions, setAttractions] = useState("");

  const fullName = `${firstName} ${lastName}`;
  const subject = `Job application for ${fullName}`;
  const message = `I would like to apply for a job position.\n${details} ${attractions}\n\nYou can contact me by phone: ${phonenumber} or by email: ${email}\n\nSincerely,\n${fullName}`;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("name", fullName);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);

    try {
      const response = await fetch("http://localhost:3001/api/emailApp", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Successfully recieved your application :)");
      } else {
        alert("Failed to recive your application :(");
      }
    } catch (error) {
      console.error(
        `Failed to send job application in careerApplication: Error => ${error}`
      );
      return error;
    }
  };

  //upload resume
  return (
    <div ref={ref}>
      <h1 className="text-3xl font-bold text-center my-10">
        Join the Sagu Family!
      </h1>
      <h2 className="text-3x1 font-bold py-4">
        Applying for position: {jobTitle}
      </h2>
      <form>
        <div>
          <h2 className="text-md font-bold">Personal Details</h2>
          <div className="flex grid grid-cols-2 gap-6">
            <div className="flex justify-center">
              <div className="flex flex-col w-full">
                <label className="text-sm font-bold text-gray-500">
                  First Name
                </label>
                <input
                  className="border border-gray-400 p-2 rounded-lg"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex flex-col w-full">
                <label className="text-sm font-bold text-gray-500">
                  Last Name
                </label>
                <input
                  className="border border-gray-400 p-2 rounded-lg"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col w-full">
              <label className="text-sm font-bold text-gray-500">
                Phone Number
              </label>
              <input
                className="border border-gray-400 p-2 rounded-lg"
                type="tel"
                value={phonenumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className="flex flex-col w-full">
              <label className="text-sm font-bold text-gray-500">Email</label>
              <input
                className="border border-gray-400 p-2 rounded-lg"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div>
          <div>
            <h2 className="text-md font-bold">Relevant Work Experience</h2>
          </div>
          <div>
            <div>
              <label className="text-sm font-bold text-gray-500">
                {" "}
                Provide details of your relevant work experience
              </label>
              <textarea
                className="w-full h-[150px] border border-gray-400 rounded-lg p-6"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label className="text-sm font-bold text-gray-500">
                {" "}
                What attracted you to apply for a position at our bubble tea
                store?
              </label>
              <textarea
                className="w-full h-[150px] border border-gray-400 rounded-lg p-6"
                value={attractions}
                onChange={(e) => setAttractions(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>

        <div className="flex justify-center p-2">
          <div className="flex flex-col w-full">
            <label className="text-sm font-bold text-gray-500">
              Upload Resume
            </label>
            <input
              className="border border-gray-400 p-2 rounded-lg w-full h-[50px]"
              type="file"
              onChange={handleFileChange}
            />
          </div>
        </div>
        <div className="flex justify-center p-3">
          <button
            className="w-[150px] h-10 bg-customColor rounded-[100px] hover:text-white shadow-md p-2"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
      <h2 className="text-md font-bold text-center p-6">
        Thank you for your interest in joining the Sagu Family!
      </h2>
    </div>
  );
});

CareerApplication.displayName = 'CareerApplication';
export default CareerApplication;
