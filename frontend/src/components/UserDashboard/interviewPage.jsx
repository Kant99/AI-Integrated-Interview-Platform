import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import Vapi from "@vapi-ai/web";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import { useLocation } from "react-router-dom";
import assistantOptions from "../../services/interviewer";

const InterviewPage = () => {
  const [speaking, setSpeaking] = useState("bot"); // "bot" or "user"
  const vapiRef = useRef(null); // Ref to hold Vapi instance
  const [user] = useAuthState(auth);
  const location = useLocation();
  const { state } = location;
  const questionsArray = Object.values(state.questions);
  const userName = user?.displayName || "Candidate";
  const [transcripts, setTranscripts] = useState([]);

  const formattedQuestion = questionsArray
    .map((question) => `- ${question}`)
    .join("\n");

  // Initialize Vapi once
  useEffect(() => {
    vapiRef.current = new Vapi(import.meta.env.VITE_VAPI_API_KEY);

    vapiRef.current.on("transcript", (data) => {
      console.log("📄 Transcript event:", data);
      if (data.isFinal) {
        setTranscripts((prev) => [...prev, data.transcript]);
      }
    });

    return () => {
      vapiRef.current?.stop(); // Cleanup on unmount
    };
  }, []);

  const startInterviewCall = async () => {
    try {
      const options = assistantOptions(formattedQuestion, userName);
      const callStart = await vapiRef.current.start(options);
      console.log("Interview call started:", callStart);
    } catch (error) {
      console.error("Failed to start the interview call:", error);
    }
  };

  const endInterviewCall = async () => {
    try {
      const callEnd = await vapiRef.current.stop();
      console.log("Interview call ended:", callEnd);
  
      // Give state time to flush (e.g. transcript event still coming in)
      setTimeout(() => {
        console.log("📄 Full Transcript (delayed log):", transcripts);
      }, 3000); // 1 second delay
    } catch (error) {
      console.error("Failed to end the interview call:", error);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-purple-50 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center"
      >
        <h1 className="text-3xl font-bold text-purple-700 mb-8">Mock Interview</h1>

        <div className="flex gap-20 items-center">
          {/* Bot Icon */}
          <motion.div
            animate={{
              scale: speaking === "bot" ? 1.2 : 1,
              boxShadow: speaking === "bot" ? "0px 0px 20px rgba(168, 85, 247, 0.7)" : "none",
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-full p-6 shadow-md"
          >
            <Bot className="h-16 w-16 text-purple-600" />
          </motion.div>

          {/* User Icon */}
          <motion.div
            animate={{
              scale: speaking === "user" ? 1.2 : 1,
              boxShadow: speaking === "user" ? "0px 0px 20px rgba(79, 70, 229, 0.7)" : "none",
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-full p-6 shadow-md"
          >
            <User className="h-16 w-16 text-indigo-600" />
          </motion.div>
        </div>

        <div className="mt-12 flex gap-4">
          <button
            onClick={startInterviewCall}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          >
            Start Interview
          </button>
          <button
            onClick={endInterviewCall}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
          >
            End Interview
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default InterviewPage;
