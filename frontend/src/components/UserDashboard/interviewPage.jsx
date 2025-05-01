// InterviewPage.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react"; // install lucide-react icons: npm install lucide-react

const InterviewPage = () => {
  const [speaking, setSpeaking] = useState("bot"); // "bot" or "user"

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
            onClick={() => setSpeaking("bot")}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow hover:bg-purple-600 transition"
          >
            Bot Speaking
          </button>
          <button
            onClick={() => setSpeaking("user")}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg shadow hover:bg-indigo-600 transition"
          >
            User Speaking
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default InterviewPage;
