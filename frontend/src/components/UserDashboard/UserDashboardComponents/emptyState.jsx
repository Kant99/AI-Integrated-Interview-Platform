
import { FileTextIcon, ArrowRightIcon } from "lucide-react"

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="bg-purple-50 p-4 rounded-full mb-4">
        <FileTextIcon className="h-12 w-12 text-purple-500" />
      </div>
      <h3 className="text-xl font-medium text-gray-900 mb-2">No interviews yet</h3>
      <p className="text-gray-500 max-w-md mb-6">
        You haven't completed any mock interviews yet. Start your first interview to get AI-powered feedback on your
        performance.
      </p>
      <button
        className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white font-medium rounded-xl transition-all duration-300 hover:bg-purple-700 hover:shadow-lg"
        onClick={() => alert("Starting your first interview...")}
      >
        Start Your First Interview
        <ArrowRightIcon className="ml-2 h-5 w-5" />
      </button>
    </div>
  )
}

export default EmptyState
