import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import { useLocation } from "react-router-dom";

const [user] = useAuthState(auth);
userName=user?.displayName;
const location = useLocation();
const { state } = location;
const feedbackData = state.messages;

async function createFeedback(userName, feedbackData ) {
    
}

const feedback = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 sm:px-10">
        <h1 className="text-3xl font-bold text-white">Your Interview Feedback</h1>
        <p className="mt-2 text-indigo-100">Here's how you performed in the mock interview.</p>
      </div>
  
      {/* User Profile Overview */}
      <div className="px-6 py-6 sm:px-10 border-b border-gray-200">
        <div className="flex flex-wrap justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Rohit Sharma</h2>
            <p className="text-gray-600">May 8, 2025 at 10:30 AM</p>
          </div>
          <div className="mt-4 sm:mt-0">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              Duration: 45 minutes
            </span>
          </div>
        </div>
      </div>
  
      {/* Feedback Summary Section */}
      <div className="px-6 py-6 sm:px-10 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">Performance Summary</h3>
  
        <div className="space-y-6">
          {/* Communication Skills */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">Communication Skills</span>
              <span className="text-sm font-medium text-indigo-600">85%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: "85%" }}></div>
            </div>
          </div>
  
          {/* Technical Knowledge */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">Technical Knowledge</span>
              <span className="text-sm font-medium text-indigo-600">78%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: "78%" }}></div>
            </div>
          </div>
  
          {/* Confidence */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">Confidence</span>
              <span className="text-sm font-medium text-indigo-600">92%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: "92%" }}></div>
            </div>
          </div>
  
          {/* Overall Score */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium text-gray-700">Overall Score</span>
              <span className="text-sm font-medium text-indigo-600">82%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600" style={{ width: "82%" }}></div>
            </div>
          </div>
        </div>
      </div>
  
      {/* Strengths Section */}
      <div className="px-6 py-6 sm:px-10 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Strengths</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-green-600"></span>
            </span>
            <span className="text-gray-700">Excellent communication skills with clear articulation of complex concepts</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-green-600"></span>
            </span>
            <span className="text-gray-700">Strong problem-solving approach with systematic thinking</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-green-600"></span>
            </span>
            <span className="text-gray-700">Confident demeanor throughout the interview process</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-2 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-green-600"></span>
            </span>
            <span className="text-gray-700">Good technical knowledge of React ecosystem and modern web development</span>
          </li>
        </ul>
      </div>
  
      {/* Weaknesses Section */}
      <div className="px-6 py-6 sm:px-10 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Weaknesses</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-red-600"></span>
            </span>
            <span className="text-gray-700">Sometimes provides overly detailed answers that could be more concise</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-red-600"></span>
            </span>
            <span className="text-gray-700">Limited examples of leadership experience in technical contexts</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center mr-2 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-red-600"></span>
            </span>
            <span className="text-gray-700">Could improve on quantifying impact in project descriptions</span>
          </li>
        </ul>
      </div>
  
      {/* Areas of Improvement Section */}
      <div className="px-6 py-6 sm:px-10 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Areas of Improvement</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-purple-600"></span>
            </span>
            <span className="text-gray-700">Practice more concise responses to common interview questions</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-purple-600"></span>
            </span>
            <span className="text-gray-700">Prepare specific examples that demonstrate leadership and initiative</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-purple-600"></span>
            </span>
            <span className="text-gray-700">Incorporate more metrics and quantifiable achievements in answers</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-purple-600"></span>
            </span>
            <span className="text-gray-700">Further develop knowledge of system design principles for senior roles</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center mr-2 mt-0.5">
              <span className="h-2 w-2 rounded-full bg-purple-600"></span>
            </span>
            <span className="text-gray-700">Work on connecting technical decisions to business outcomes</span>
          </li>
        </ul>
      </div>
  
      {/* Encouragement Box */}
      <div className="px-6 py-6 sm:px-10 bg-gradient-to-r from-purple-50 to-indigo-50">
        <div className="bg-white p-4 rounded-lg border border-indigo-200 shadow-sm">
          <p className="text-center text-gray-700">
            <span className="font-semibold text-indigo-700">Great effort, Rohit Sharma!</span> Practice a few more times to perfect your pitch.
          </p>
        </div>
      </div>
  
      {/* CTA Section */}
      <div className="px-6 py-6 sm:px-10 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-wrap justify-center gap-4">
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
            Retake Interview
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Feedback
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default feedback