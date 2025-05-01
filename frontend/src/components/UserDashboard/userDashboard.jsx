import { useState, useEffect } from "react";
import WelcomeSection from "./UserDashboardComponents/WelcomeSection";
import PreviousInterviews from "./UserDashboardComponents/PreviousInterview";

// Sample interview data
const sampleInterviews = [
  {
    id: 1,
    date: "2024-04-10",
    time: "14:30",
    technology: "React.js",
    role: "Frontend Developer",
    score: 85,
  },
  {
    id: 2,
    date: "2024-04-05",
    time: "10:15",
    technology: "Node.js",
    role: "Backend Developer",
    score: 78,
  },
  {
    id: 3,
    date: "2024-03-28",
    time: "16:00",
    technology: "Python",
    role: "Data Scientist",
    score: 92,
  },
];

const UserDashboard = () => {
  const [interviews, setInterviews] = useState(sampleInterviews);
  const [showEmptyState, setShowEmptyState] = useState(false);
  const [quote, setQuote] = useState("Loading motivational quote...");

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        // Using a CORS proxy or your backend API to avoid CORS issues
        const res = await fetch(
          "https://api.allorigins.win/raw?url=https://zenquotes.io/api/random"
        );
        if (!res.ok) {
          throw new Error("Failed to fetch quotes.");
        }
        const allQuotes = await res.json();
        
        // Check if quotes data is available
        if (allQuotes && allQuotes.length > 0) {
          const random = allQuotes[Math.floor(Math.random() * allQuotes.length)];
          setQuote(`"${random.q}" — ${random.a || "Unknown"}`);
        } else {
          setQuote("Stay motivated and keep pushing forward!");
        }
      } catch (err) {
        console.error("Error fetching quotes:", err);
        setQuote("Stay motivated and keep pushing forward!");
      }
    };
    fetchQuotes();
  }, []);

  const toggleEmptyState = () => {
    setShowEmptyState(!showEmptyState);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <WelcomeSection quote={quote} />
        <PreviousInterviews
          interviews={interviews}
          showEmptyState={showEmptyState}
          toggleEmptyState={toggleEmptyState}
        />
      </div>
    </div>
  );
};

export default UserDashboard;
