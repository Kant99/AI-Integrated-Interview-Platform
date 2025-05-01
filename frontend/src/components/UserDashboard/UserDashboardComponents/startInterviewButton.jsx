import { ArrowRightIcon } from "lucide-react"
import { useNavigate } from "react-router"


const StartInterviewButton = () => {

  const navigate = useNavigate()
  const handleClick = () => {
    navigate("/setup-interview")
  }

  return (
    
    <button
      className="group relative inline-flex items-center justify-center px-8 py-3 bg-purple-600 text-white font-medium rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:bg-purple-700 hover:shadow-xl"
      onClick={handleClick}
    >
      <span className="relative z-10 flex items-center">
        Start New Interview
        <ArrowRightIcon className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
      <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </button>
  )
}

export default StartInterviewButton
