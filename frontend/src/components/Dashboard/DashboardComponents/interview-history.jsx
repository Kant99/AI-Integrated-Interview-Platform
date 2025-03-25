import React from "react";
import { CalendarDays, MessageSquare, Mic, FileText, Play } from "lucide-react";

// Mock data for interview history
const mockInterviews = [
  {
    id: 1,
    date: "2025-03-20",
    jobRole: "Frontend Developer",
    mode: "chat",
    feedback: "Good communication skills, needs improvement in technical knowledge",
  },
  {
    id: 2,
    date: "2025-03-15",
    jobRole: "Data Scientist",
    mode: "verbal",
    feedback: "Strong technical background, could improve explanation clarity",
  },
  {
    id: 3,
    date: "2025-03-10",
    jobRole: "Product Manager",
    mode: "chat",
    feedback: "Excellent product understanding, needs to work on prioritization skills",
  },
];

export function InterviewHistory() {
  return (
    <div className="border rounded-lg shadow-md bg-white p-6">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Interview History</h2>
        <p className="text-gray-500">Review your past interviews and feedback</p>
      </div>

      {/* No Interview Case */}
      {mockInterviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-gray-500">You haven't completed any interviews yet.</p>
          <p className="text-sm text-gray-400">Start a new interview to see your history here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mockInterviews.map((interview) => (
            <div key={interview.id} className="flex flex-col gap-4 border p-4 rounded-lg sm:flex-row sm:items-center">
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-medium text-lg">{interview.jobRole}</h3>

                  {/* Mode Badge */}
                  <span
                    className={`flex items-center px-2 py-1 text-xs font-medium rounded-md ${
                      interview.mode === "verbal"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {interview.mode === "verbal" ? (
                      <Mic className="mr-1 h-3 w-3" />
                    ) : (
                      <MessageSquare className="mr-1 h-3 w-3" />
                    )}
                    {interview.mode === "verbal" ? "Verbal" : "Chat"}
                  </span>
                </div>

                {/* Date */}
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarDays className="mr-1 h-4 w-4" />
                  {new Date(interview.date).toLocaleDateString()}
                </div>

                {/* Feedback */}
                <p className="text-sm">{interview.feedback}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-row gap-2 sm:flex-col">
                <button className="flex items-center w-full justify-center border rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
                  <FileText className="mr-2 h-4 w-4" />
                  Report
                </button>
                <button className="flex items-center w-full justify-center border rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition">
                  <Play className="mr-2 h-4 w-4" />
                  Replay
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
