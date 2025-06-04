import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../services/firebase';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, ChevronUp, Award, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';

const FeedbackPage = () => {
  const [user] = useAuthState(auth);
  const userName = user?.displayName || 'Candidate';
  const location = useLocation();
  const { state } = location;
  const interviewMessages = state?.messages || [];
  const feedback = state?.feedback || null;

  const [expandedSections, setExpandedSections] = useState({
    strengths: true,
    improvements: true,
    technical: true,
    communication: true,
  });

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  // Data for chart
  const prepareChartData = () => {
    if (!feedback) return [];
    return feedback.categoryScores.map(category => ({
      name: category.name,
      score: category.score,
      fill: getColorForScore(category.score),
    }));
  };

  // Get color based on score
  const getColorForScore = (score) => {
    if (score >= 80) return '#4ade80'; // green
    if (score >= 60) return '#facc15'; // yellow
    return '#f87171'; // red
  };

  if (!feedback || !interviewMessages || interviewMessages.length <= 1) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-purple-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-md max-w-md">
          <AlertTriangle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Interview Data</h2>
          <p className="text-gray-600">
            We couldn't find any interview data to analyze. Please complete an interview first.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-white to-purple-50 py-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 mb-6"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-purple-700 mb-2">
            Interview Feedback for {userName}
          </h1>
          <div className="flex items-center">
            <div className="text-4xl font-bold text-gray-800">{feedback.totalScore}</div>
            <div className="text-2xl text-gray-500 ml-1">/100</div>
            <div className="ml-4 px-3 py-1 rounded text-white font-medium"
              style={{ backgroundColor: getColorForScore(feedback.totalScore) }}>
              {feedback.totalScore >= 80 ? 'Excellent' : 
               feedback.totalScore >= 60 ? 'Good' : 'Needs Improvement'}
            </div>
          </div>
        </motion.div>

        {/* Score visualization */}
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance by Category</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={prepareChartData()}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="score" nameKey="name" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Category details */}
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <button 
            className="w-full flex justify-between items-center mb-4"
            onClick={() => toggleSection('technical')}
          >
            <h2 className="text-xl font-semibold text-gray-800">Detailed Assessment</h2>
            {expandedSections.technical ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {expandedSections.technical && (
            <div className="space-y-4">
              {feedback.categoryScores.map((category, index) => (
                <motion.div
                  key={index}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">{category.name}</h3>
                    <div className="flex items-center">
                      <span className="font-bold text-lg">{category.score}</span>
                      <span className="text-gray-500 text-sm ml-1">/100</span>
                    </div>
                  </div>
                  <p className="text-gray-700">{category.comment}</p>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Strengths */}
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button 
            className="w-full flex justify-between items-center mb-2"
            onClick={() => toggleSection('strengths')}
          >
            <div className="flex items-center">
              <Award className="text-green-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Strengths</h2>
            </div>
            {expandedSections.strengths ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {expandedSections.strengths && (
            <ul className="space-y-2 mt-3">
              {feedback.strengths.map((strength, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.2 }}
                >
                  <CheckCircle className="text-green-500 mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>{strength}</span>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Areas for Improvement */}
        <motion.div
          className="bg-white rounded-lg shadow-md p-6 mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <button 
            className="w-full flex justify-between items-center mb-2"
            onClick={() => toggleSection('improvements')}
          >
            <div className="flex items-center">
              <Lightbulb className="text-amber-500 mr-2" />
              <h2 className="text-xl font-semibold text-gray-800">Areas for Improvement</h2>
            </div>
            {expandedSections.improvements ? <ChevronUp /> : <ChevronDown />}
          </button>
          
          {expandedSections.improvements && (
            <ul className="space-y-2 mt-3">
              {feedback.areasForImprovement.map((area, index) => (
                <motion.li
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index + 0.2 }}
                >
                  <AlertTriangle className="text-amber-500 mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
                  <span>{area}</span>
                </motion.li>
              ))}
            </ul>
          )}
        </motion.div>

        {/* Final Assessment */}
        <motion.div
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Final Assessment</h2>
          <p className="text-gray-700 leading-relaxed">{feedback.finalAssessment}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeedbackPage;
