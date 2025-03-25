import React from "react";
import { DashboardLayout } from "./DashboardComponents/dashboard-layout"; 
import { ProfileSection } from "./DashboardComponents/profile-section.jsx"
import { InterviewSetup } from "./DashboardComponents/interview-setup";
import { InterviewHistory } from "./DashboardComponents/interview-history";
import { DashboardFooter } from "./DashboardComponents/dashboard-footer";
import { useIsMobile } from "../../hooks/useIsMobile.jsx";

export default function DashboardPage() {
  const isMobile = useIsMobile();

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6 p-6 md:gap-8">
        <ProfileSection
          name="John Doe"
          email="john.doe@example.com"
          profilePicture="/placeholder.svg?height=100&width=100"
        />

        <InterviewSetup />
        <InterviewHistory />

        {!isMobile && <DashboardFooter />}
      </div>
    </DashboardLayout>
  );
}
