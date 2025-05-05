import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import Vapi from "@vapi-ai/web";


const InterviewPage = () => {
  const [speaking, setSpeaking] = useState("bot"); // "bot" or "user"
  const vapiRef = useRef(null);

  useEffect(() => {
    // Initialize VAPI
    vapiRef.current = new Vapi({
      apiKey: import.meta.env.VITE_VAPI_API_KEY, 
    });

    // Event when call starts
    vapiRef.current.on("call-start", () => {
      console.log("Call started");
    });

    // Handle speech events
    vapiRef.current.on("speech-start", (event) => {
      if (event.speaker === "agent") {
        setSpeaking("bot");
      } else {
        setSpeaking("user");
      }
    });

    // Event when call ends
    vapiRef.current.on("call-end", () => {
      console.log("Call ended");
      setSpeaking("bot"); // reset
    });

    // Cleanup
    return () => {
      vapiRef.current.hangUp();
    };
  }, []);

  const startInterview = () => {
    if (!vapiRef.current) return;

    vapiRef.current.start({
      agentId: import.meta.env.VITE_VAPI_ASSISTANT_ID, 
      user: { name: "User" },
      context: {
        // 🔁 You can replace this with dynamically fetched questions
        questions: [
          "Tell me about yourself.",
          "What are your strengths?",
          "Explain a challenging bug you fixed.",
          "What is the difference between REST and GraphQL?",
          "How do you stay updated with tech trends?"
        ],
      },
    });
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
            onClick={startInterview}
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition"
          >
            Start Interview
          </button>
          <button
            onClick={() => vapiRef.current?.hangUp()}
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
