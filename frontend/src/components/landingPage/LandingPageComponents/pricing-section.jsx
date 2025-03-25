import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import "../landingPage.css";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out the platform",
    features: [
      "3 mock interviews per month",
      "Basic feedback and analysis",
      "Limited question bank",
      "Text-based feedback only",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "$29",
    period: "per month",
    description: "For serious job seekers",
    features: [
      "Unlimited mock interviews",
      "Advanced feedback and analysis",
      "Full question bank access",
      "Video recording and review",
      "Industry-specific questions",
      "Resume analysis",
    ],
    cta: "Start 7-Day Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "per month",
    description: "For teams and organizations",
    features: [
      "Everything in Professional",
      "Team management dashboard",
      "Custom question sets",
      "Branded interview experiences",
      "Progress tracking for teams",
      "Priority support",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-20 bg-[#f5f9ff]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Simple, Transparent Pricing</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include our core AI interview technology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md ${
                plan.popular ? "ring-2 ring-blue-600 transform md:-translate-y-2" : ""
              }`}
            >
              {plan.popular && <div className="bg-blue-600 text-white text-center py-2 font-medium">Most Popular</div>}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline">
                  <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                  <span className="ml-1 text-xl text-gray-600">/{plan.period}</span>
                </div>
                <p className="mt-2 text-gray-600">{plan.description}</p>

                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-blue-600 flex-shrink-0 mr-2" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <button
                    className={`w-full px-4 py-2 text-white text-center rounded-md ${
                      plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-800 hover:bg-gray-900"
                    }`}
                  >
                    <Link to="/signup">{plan.cta}</Link>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
