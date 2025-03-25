import React from "react";
import Navbar from "./LandingPageComponents/navbar";
import HeroSection from "./LandingPageComponents/hero-section";
import FeaturesSection from "./LandingPageComponents/features-section";
import HowItWorksSection from "./LandingPageComponents/how-it-works";
import TestimonialsSection from "./LandingPageComponents/testimonial-section";
import PricingSection from "./LandingPageComponents/pricing-section";
import Footer from "./LandingPageComponents/footer";

export default function LandingPage() {
  return (
    <>
        <Navbar /> 
        <HeroSection />       
        <FeaturesSection />
        <HowItWorksSection />
        {/* <PricingSection /> */}
        <TestimonialsSection />        
        <Footer />
    </>
  );
}



