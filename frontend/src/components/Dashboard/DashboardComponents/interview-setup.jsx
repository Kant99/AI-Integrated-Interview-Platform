import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, MessageSquare } from "lucide-react";

export function InterviewSetup() {
  const navigate = useNavigate();
  const [jobDesignation, setJobDesignation] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [interviewMode, setInterviewMode] = useState("chat");

  const handleStartInterview = () => {
    if (!jobDesignation || !experienceLevel) {
      alert("Please fill in all required fields");
      return;
    }
    navigate(`/interview?job=${encodeURIComponent(jobDesignation)}&level=${experienceLevel}&mode=${interviewMode}`);
  };

  return (
    <div className="border-2 border-blue-400 rounded-lg shadow-md p-6 bg-white">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Start a New Interview</h2>
        <p className="text-gray-500">Set up your mock interview based on your job designation and experience</p>
      </div>

      <div className="space-y-6">
        {/* Job Designation Input */}
        <div className="space-y-2">
          <label htmlFor="job-designation" className="text-sm font-medium text-gray-600">Job Designation</label>
          <input
            id="job-designation"
            type="text"
            placeholder="e.g. Software Engineer, Data Scientist"
            value={jobDesignation}
            onChange={(e) => setJobDesignation(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Experience Level Selection */}
        <div className="space-y-2">
          <label htmlFor="experience-level" className="text-sm font-medium text-gray-600">Experience Level</label>
          <select
            id="experience-level"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
          >
            <option value="" disabled>Select your experience level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        {/* Interview Mode Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-600">Interview Mode</label>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            {/* Verbal Interview */}
            <label className="flex items-center cursor-pointer space-x-2">
              <input
                type="radio"
                name="interview-mode"
                value="verbal"
                checked={interviewMode === "verbal"}
                onChange={() => setInterviewMode("verbal")}
                className="hidden peer"
              />
              <div className="flex items-center px-3 py-2 border rounded-md cursor-pointer peer-checked:bg-blue-100">
                <Mic className="mr-2 h-4 w-4 text-blue-600" />
                <span className="text-gray-700">Verbal Interview</span>
              </div>
            </label>

            {/* Chat-based Interview */}
            <label className="flex items-center cursor-pointer space-x-2">
              <input
                type="radio"
                name="interview-mode"
                value="chat"
                checked={interviewMode === "chat"}
                onChange={() => setInterviewMode("chat")}
                className="hidden peer"
              />
              <div className="flex items-center px-3 py-2 border rounded-md cursor-pointer peer-checked:bg-blue-100">
                <MessageSquare className="mr-2 h-4 w-4 text-blue-600" />
                <span className="text-gray-700">Chat-based Interview</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Start Interview Button */}
      <div className="mt-4">
        <button
          onClick={handleStartInterview}
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
        >
          Start Interview
        </button>
      </div>
    </div>
  );
}
