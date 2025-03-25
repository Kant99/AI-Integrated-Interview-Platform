import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Software Engineer at Google",
    image: "/placeholder.svg",
    quote:
      "MockInterview.ai helped me prepare for my technical interviews at Google. The AI feedback was spot-on and helped me identify weaknesses in my responses that I wouldn't have caught otherwise.",
    stars: 5,
  },
  {
    name: "Michael Chen",
    role: "Product Manager at Amazon",
    image: "/placeholder.svg",
    quote:
      "After using MockInterview.ai for two weeks, I felt so much more confident going into my interviews. The behavioral questions were incredibly similar to what I was actually asked!",
    stars: 5,
  },
  {
    name: "Jessica Williams",
    role: "Marketing Director at Spotify",
    image: "/placeholder.svg",
    quote:
      "The industry-specific questions and personalized feedback made all the difference in my interview preparation. I landed my dream job after just a month of practice.",
    stars: 4,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Success Stories</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of professionals who have improved their interview skills with MockInterview.ai.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-[#f5f9ff] p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < testimonial.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 italic mb-6">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
