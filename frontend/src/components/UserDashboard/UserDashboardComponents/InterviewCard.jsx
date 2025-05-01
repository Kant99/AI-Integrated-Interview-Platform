import { CalendarIcon, ClockIcon, FileTextIcon, RefreshCwIcon } from "lucide-react"

const InterviewCard = ({ interview }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{interview.technology}</h3>
            <p className="text-gray-600">{interview.role}</p>
          </div>
          <div className="bg-purple-50 text-purple-700 font-medium rounded-full px-3 py-1 text-sm">
            {interview.score}%
          </div>
        </div>

        <InterviewDateTime date={interview.date} time={interview.time} />

        <div className="flex space-x-3 mt-4">
          <InterviewActionButton
            icon={<FileTextIcon className="h-4 w-4 mr-2" />}
            label="Feedback"
            variant="secondary"
            onClick={() => alert(`Viewing feedback for ${interview.technology} interview`)}
          />
          <InterviewActionButton
            icon={<RefreshCwIcon className="h-4 w-4 mr-2" />}
            label="Retake"
            variant="primary"
            onClick={() => alert(`Retaking ${interview.technology} interview`)}
          />
        </div>
      </div>
    </div>
  )
}

const InterviewDateTime = ({ date, time }) => {
  return (
    <div className="flex items-center text-sm text-gray-500 mb-4">
      <CalendarIcon className="h-4 w-4 mr-1" />
      <span>{new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
      <span className="mx-2">•</span>
      <ClockIcon className="h-4 w-4 mr-1" />
      <span>{time}</span>
    </div>
  )
}

const InterviewActionButton = ({ icon, label, variant, onClick }) => {
  const baseClasses =
    "flex-1 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
  const variantClasses = {
    primary: "bg-purple-50 hover:bg-purple-100 text-purple-700",
    secondary: "bg-gray-50 hover:bg-gray-100 text-gray-700",
  }

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} onClick={onClick}>
      {icon}
      {label}
    </button>
  )
}

export default InterviewCard
