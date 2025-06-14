import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import Vapi from "@vapi-ai/web";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import {useNavigate, useLocation } from "react-router-dom";
import assistantOptions from "../../services/interviewer";

const InterviewPage = () => {
  const navigate=useNavigate();
  const [callActive, setCallActive] = useState(false);
  const [isSpeaking, setSpeaking] = useState(false);
  const [messages, setMessages] = useState([{ role: "", content: "" }]);
  const vapiRef = useRef(null);
  const [user] = useAuthState(auth);
  const location = useLocation();
  const { state } = location;
  const questionsArray = Object.values(state.questions);
  const userName = user?.displayName;
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);
  

  const formattedQuestion = questionsArray
    .map((question) => `- ${question}`)
    .join("\n");

  useEffect(() => {
    vapiRef.current = new Vapi(import.meta.env.VITE_VAPI_API_KEY);
    const onCallStart=()=>setCallActive(true);
    const onCallEnd=()=>setCallActive(false);
    const onMessage=(message)=>{
      if(message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = {
          role:message.role,
          content:message.transcript
        }
        setMessages((prev) => [...prev, newMessage]);
    };    
  }
  const onSpeechStart=()=>setSpeaking(true);
  const onSpeechEnd=()=>setSpeaking(false);
  const onError=(error)=>console.error("Error:", error);

    vapiRef.current.on("call-start", onCallStart);
    vapiRef.current.on("call-end", onCallEnd);
    vapiRef.current.on("message", onMessage);
    vapiRef.current.on("speech-start", onSpeechStart);
    vapiRef.current.on("speech-end", onSpeechEnd);
    vapiRef.current.on("error", onError);

    return () => {
      vapiRef.current.off("call-start", onCallStart);
      vapiRef.current.off("call-end", onCallEnd);
      vapiRef.current.off("message", onMessage);
      vapiRef.current.off("speech-start", onSpeechStart);
      vapiRef.current.off("speech-end", onSpeechEnd);
      vapiRef.current.off("error", onError);
      vapiRef.current?.stop();
    }
  }, []);

  useEffect(() => {
  
    
  }, [messages, callActive]);

// Function to start the interview call
  // This function is called when the user clicks the "Start Interview" button
  const startInterviewCall = async () => {
    try {
      const options = assistantOptions(formattedQuestion, userName);
      await vapiRef.current.start(options);
      setCallActive(true);

      console.log("Interview call started");
    } catch (error) {
      console.error("Failed to start interview:", error);
    }
  };
  // Function to analyze the interview
  // This function is called when the user clicks the "End Interview" button
  const analyzeInterview = async (interviewMessages) => {
  try {
    // If no messages, return early
    if (!interviewMessages || interviewMessages.length <= 1) {
      setLoading(false);
      return null;
    }

    // Send interview messages to your backend API
    const response = await fetch('http://localhost:5000/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: interviewMessages }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('API error:', errorData);
      throw new Error(`Failed to generate feedback: ${response.status}`);
    }

    const data = await response.json();
    console.log(typeof data);
    console.log('Feedback data:', data);
    return data.feedback;

  } catch (error) {
    console.error('Error analyzing interview:', error);
    throw error; // Re-throw to handle in parent function
  }
};

const endInterviewCall = async () => {
  try {
    // Set loading to true at the beginning
    setLoading(true);
    
    // Stop the Vapi call
    await vapiRef.current.stop();
    setCallActive(false);
    console.log(typeof messages);
    console.log(messages);
    
    // Analyze the interview and get feedback
    const feedbackData = await analyzeInterview(messages);
    
    // Navigate to feedback page with both messages and feedback
    navigate("/feedback", { 
      state: { 
        messages,
        feedback: feedbackData 
      } 
    });
    
  } catch (error) {
    console.error("Failed to end interview:", error);
    // Handle error - maybe show an error message to user
    // You might want to navigate even if analysis fails
    navigate("/feedback", { 
      state: { 
        messages,
        feedback: null,
        error: "Failed to analyze interview"
      } 
    });
  } finally {
    // Always set loading to false when done
    setLoading(false);
  }
};

  const lastMessage = messages[messages.length - 1].content;

  const handleToggleCall = () => {
    if (callActive) {
      endInterviewCall();
    } else {
      startInterviewCall();
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

        <div className="flex gap-20 items-center mb-10">
          {/* Bot Icon */}
          <motion.div
  animate={{
    scale: isSpeaking ? 1.2 : 1,
    boxShadow: isSpeaking
      ? "0 0 30px 10px rgba(168, 85, 247, 0.6)"
      : "none",
  }}
  transition={{ type: "spring", stiffness: 300 }}
  className="bg-white rounded-full p-6 shadow-md"
>
  <Bot className="h-16 w-16 text-purple-600" />
</motion.div>


          {/* User Icon */}
          <motion.div
            animate={{
              
            }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white rounded-full p-6 shadow-md"
          >
            <User className="h-16 w-16 text-indigo-600" />
          </motion.div>
        </div>

        {/* Last Message Display */}
        {lastMessage && (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="my-6 text-center max-w-xl px-4 text-gray-700 text-lg"
  >
     {lastMessage}
  </motion.div>
)}

        {/* Start/End Call Button */}
        <div>
          <button
            onClick={handleToggleCall}
            className={`px-6 py-3 text-lg font-medium text-white rounded-xl shadow transition-all duration-300 ${
              callActive
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {callActive ? "End Interview" : "Start Interview"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default InterviewPage;
