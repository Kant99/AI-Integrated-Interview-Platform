import { Brain, BarChart, Clock, Briefcase, MessageSquare, Video } from "lucide-react";
import React from "react";
import "../landingPage.css";

const features = [
  {
    icon: <Brain className="h-8 w-8 text-blue-600" />,
    title: "AI-Powered Interviews",
    description:
      "Our advanced AI simulates real interviewers from top companies, adapting to your responses in real-time.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-blue-600" />,
    title: "Detailed Analytics",
    description:
      "Receive comprehensive feedback on your performance, including communication skills, technical accuracy, and confidence.",
  },
  {
    icon: <Clock className="h-8 w-8 text-blue-600" />,
    title: "Practice Anytime",
    description: "No scheduling required. Practice interviews whenever it's convenient for you, 24/7.",
  },
  {
    icon: <Briefcase className="h-8 w-8 text-blue-600" />,
    title: "Industry-Specific Questions",
    description: "Choose from a wide range of industries and job roles for tailored interview experiences.",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
    title: "Personalized Feedback",
    description: "Get actionable insights and suggestions to improve your interview skills with each practice session.",
  },
  {
    icon: <Video className="h-8 w-8 text-blue-600" />,
    title: "Video Recording",
    description:
      "Review your interview recordings to identify areas for improvement in your body language and delivery.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Features That Set Us Apart</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            MockInterview.ai combines cutting-edge AI technology with proven interview techniques to help you succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-[#f5f9ff] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
