import React from 'react'

const landingPage = () => {
  return <>
  <div className="flex items-center justify-center h-screen w-screen bg-white">
      <div className="text-center">
        {/* Title */}
        <h1 className="text-5xl font-bold font-inter text-red mb-4">MockInterview.ai</h1>
        
        {/* Subtitle */}
        <p className="text-gray-600 text-lg mb-6">
          Master your interview skills with realistic AI simulations.
        </p>
        
        {/* Get Started Button */}
        <button className="bg-black text-white px-6 py-3 rounded-lg text-lg font-medium shadow-md hover:bg-gray-800 transition">
          Get Started
        </button>
      </div>
    </div>
  </>
}

export default landingPage