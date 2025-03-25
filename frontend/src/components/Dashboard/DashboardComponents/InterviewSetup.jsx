"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

function InterviewSetup() {
  const navigate = useNavigate()
  const [jobDesignation, setJobDesignation] = useState("")
  const [experienceLevel, setExperienceLevel] = useState("")
  const [interviewMode, setInterviewMode] = useState("chat")

  const handleStartInterview = () => {
    if (!jobDesignation || !experienceLevel) {
      alert("Please fill in all required fields")
      return
    }

    // In a real app, you would navigate to the interview page with the selected options
    navigate(`/interview?job=${encodeURIComponent(jobDesignation)}&level=${experienceLevel}&mode=${interviewMode}`)
  }

  return (
    <div className="rounded-lg border-2 border-blue-100 bg-white shadow">
      <div className="border-b px-6 py-4">
        <h2 className="text-lg font-semibold">Start a New Interview</h2>
        <p className="text-sm text-gray-500">Set up your mock interview based on your job designation and experience</p>
      </div>
      <div className="space-y-6 px-6 py-4">
        <div className="space-y-2">
          <label htmlFor="job-designation" className="block text-sm font-medium">
            Job Designation
          </label>
          <input
            id="job-designation"
            type="text"
            placeholder="e.g. Software Engineer, Data Scientist"
            value={jobDesignation}
            onChange={(e) => setJobDesignation(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="experience-level" className="block text-sm font-medium">
            Experience Level
          </label>
          <select
            id="experience-level"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select your experience level
            </option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Interview Mode</label>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="verbal"
                name="interview-mode"
                value="verbal"
                checked={interviewMode === "verbal"}
                onChange={() => setInterviewMode("verbal")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="verbal" className="flex items-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                  <line x1="12" y1="19" x2="12" y2="23"></line>
                  <line x1="8" y1="23" x2="16" y2="23"></line>
                </svg>
                Verbal Interview
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="chat"
                name="interview-mode"
                value="chat"
                checked={interviewMode === "chat"}
                onChange={() => setInterviewMode("chat")}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="chat" className="flex items-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
                Chat-based Interview
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t px-6 py-4">
        <button
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={handleStartInterview}
        >
          Start Interview
        </button>
      </div>
    </div>
  )
}

export default InterviewSetup

