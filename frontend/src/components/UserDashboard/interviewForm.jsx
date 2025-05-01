// InterviewForm.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // for redirect
import { motion } from "framer-motion";

const InterviewForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    techStack: "",
    role: "",
    experience: "",
    dateTime: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);

      setTimeout(() => {
        navigate("/interview"); // Navigate after slight delay
      }, 1500); // 1.5 second loading effect
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

          <motion.div variants={itemVariants} className="mb-6">
            <label htmlFor="dateTime" className="block text-sm font-semibold text-gray-700 mb-1">
              Date and Time
            </label>
            <input
              type="text"
              id="dateTime"
              name="dateTime"
              value={formData.dateTime}
              disabled
              className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-not-allowed"
            />
          </motion.div>

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
