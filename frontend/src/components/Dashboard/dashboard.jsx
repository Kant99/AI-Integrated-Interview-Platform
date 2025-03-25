import DashboardLayout from "./DashboardComponents/DashboardLayout"
import ProfileSection from "./DashboardComponents/ProfileSection"
import InterviewSetup from "./DashboardComponents/InterviewSetup"
import InterviewHistory from "./DashboardComponents/InterviewHistory"
import DashboardFooter from "./DashboardComponents/DashboardFooter"

function Dashboard() {
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

        <DashboardFooter />
      </div>
    </DashboardLayout>
  )
}

export default Dashboard

