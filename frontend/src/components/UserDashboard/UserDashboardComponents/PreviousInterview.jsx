import InterviewCard from "./InterviewCard"
import EmptyState from "./emptyState"

const PreviousInterviews = ({ interviews, showEmptyState, toggleEmptyState }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Previous Interviews</h2>
        <button onClick={toggleEmptyState} className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
          {showEmptyState ? "Show Sample Data" : "Show Empty State"}
        </button>
      </div>

      {showEmptyState ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {interviews.map((interview) => (
            <InterviewCard key={interview.id} interview={interview} />
          ))}
        </div>
      )}
    </div>
  )
}

export default PreviousInterviews
