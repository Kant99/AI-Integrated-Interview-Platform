import React from "react";
import { UserPlus, ListChecks, Video, MessageSquare, BarChart } from "lucide-react";

const steps = [
  {
    icon: <UserPlus className="h-8 w-8 text-white" />,
    title: "Create Your Profile",
    description: "Sign up and tell us about your target roles, industry, and experience level.",
  },
  {
    icon: <ListChecks className="h-8 w-8 text-white" />,
    title: "Select Interview Type",
    description: "Choose from behavioral, technical, or role-specific interview simulations.",
  },
  {
    icon: <Video className="h-8 w-8 text-white" />,
    title: "Start Your Interview",
    description: "Connect your camera and microphone for a realistic interview experience.",
  },
  {
    icon: <MessageSquare className="h-8 w-8 text-white" />,
    title: "Answer Questions",
    description: "Respond to AI-generated questions tailored to your target position.",
  },
  {
    icon: <BarChart className="h-8 w-8 text-white" />,
    title: "Get Instant Feedback",
    description: "Receive detailed analysis and actionable tips to improve your performance.",
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 bg-[#f5f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">How MockInterview.ai Works</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Our simple 5-step process helps you prepare for interviews with confidence.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>

          {/* Steps */}
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative md:grid md:grid-cols-2 md:gap-8 items-center ${index % 2 === 0 ? "" : "md:flex-row-reverse"}`}
              >
                {/* Timeline dot */}
                <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 z-10"></div>

                {/* Content */}
                <div className={`md:col-span-1 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:pl-12"}`}>
                  <div className={`flex items-center ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 md:hidden">
                      {step.icon}
                    </div>
                    <h3
                      className={`text-xl font-semibold text-gray-900 ${index % 2 === 0 ? "md:ml-0 ml-4" : "ml-4 md:ml-0"}`}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <p className={`mt-2 text-gray-600 ${index % 2 === 0 ? "md:ml-0 ml-16" : "ml-16 md:ml-0"}`}>
                    {step.description}
                  </p>
                </div>

                {/* Icon for desktop */}
                <div className={`hidden md:flex md:col-span-1 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
                  <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-blue-600">
                    {step.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
