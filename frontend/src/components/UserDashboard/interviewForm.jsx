// InterviewForm.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // for redirect
import { motion } from "framer-motion";
import { db, auth } from "../../services/firebase"; 
import { collection, doc, setDoc } from "firebase/firestore";


const InterviewForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    techStack: "",
    role: "",
    experience: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      dateTime: new Date().toLocaleString(),
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.techStack.trim()) newErrors.techStack = "Tech Stack is required";
    if (!formData.role.trim()) newErrors.role = "Role is required";
    if (!formData.experience) newErrors.experience = "Experience is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to start an interview.");
      return;
    }
  
    setIsSubmitting(true);
  
    try {
      const interviewsCollectionRef = collection(db, "users", user.uid, "interviews");
      const newInterviewDocRef = doc(interviewsCollectionRef);
      const interviewId = newInterviewDocRef.id;
  
      const interviewData = {
        ...formData,
        userId: user.uid,
        interviewId,
      };
  
      // Save to Firestore
      await setDoc(newInterviewDocRef, interviewData);
      console.log("Interview data saved to Firestore:", interviewData);
  
      // Get questions from Gemini via backend

  
      const response = await fetch("http://localhost:5000/api/generate-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("Response from backend:", response);
      
  
      const data = await response.json();
  
      if (!response.ok) throw new Error(data.error || "Failed to get questions");
  
      // Optionally save questions to Firestore under the same document
      await setDoc(newInterviewDocRef, {
        ...interviewData,
        questions: data.questions,
      });
  
      // Or store in state / context and navigate to a page to display
      navigate("/interview", { state: { questions: data.questions } });
  
    } catch (error) {
      console.error("Error saving interview:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  
  

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-100 via-white to-purple-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-extrabold text-center text-purple-700 mb-8"
        >
          Start Interview
        </motion.h1>

        <motion.form
          variants={containerVariants}
          initial="hidden"
          animate="show"
          onSubmit={handleSubmit}
        >
          {["techStack", "role", "experience"].map((field) => (
            <motion.div key={field} variants={itemVariants} className="mb-5">
              <label htmlFor={field} className="block text-sm font-semibold text-gray-700 mb-1 capitalize">
                {field === "techStack" ? "Tech Stack" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === "experience" ? "number" : "text"}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={
                  field === "techStack"
                    ? "e.g., React.js, Node.js"
                    : field === "role"
                    ? "e.g., Frontend Developer"
                    : "e.g., 2"
                }
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  errors[field] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[field] && <p className="mt-1 text-sm text-red-500">{errors[field]}</p>}
            </motion.div>
          ))}

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 shadow-md"
          >
            {isSubmitting ? "Starting..." : "Start Interview"}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default InterviewForm;
