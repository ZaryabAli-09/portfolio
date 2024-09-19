"use client";
import React, { useState } from "react";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleFoemSubmit(e) {
    e.preventDefault();

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, message }),
      });
      if (res.ok) {
        setEmail("");
        setMessage("");
        alert("Email sent successfully!");
      } else {
        alert("Failed to send email.");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div className="flex justify-between h-[85vh] flex-col lg:flex-row px-4 sm:px-8 md:px-12 lg:px-20 xl:px-48">
        {/* TEXT CONTAINER*/}
        <div className="h-[20vh] lg:h-full lg:w-[40vw] flex items-center justify-center">
          <h2 className="text-4xl">Lets Work Together</h2>
        </div>
        {/* CONTACT CONTAINER  */}
        <form className="h-[65vh] lg:h-full lg:w-1/2 rounded-3xl  shadow-xl border shadow-black-300/50 flex flex-col justify-center p-16">
          <span className="mb-5 font-bold text-3xl">Dear Zaryab Ali,</span>
          <input
            type="text"
            value={message}
            className="py-6 bg-transparent border-black border-b-2 outline-none px-2 focus:border-blue-700"
            placeholder="Enter your message here"
            onChange={(e) => setMessage(e.target.value)}
          />
          <br />
          <span className="">My mail address is:</span>
          <input
            type="email"
            value={email}
            className="py-6 bg-transparent border-black border-b-2 outline-none  focus:border-blue-700"
            placeholder="Enter your email here"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit" // Set type to submit
            onClick={handleFoemSubmit}
            className="bg-black text-white p-2 mt-6 rounded-md hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
