import { Link } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile sidebar backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg lg:fixed transition-transform duration-200 ease-in-out lg:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-screen flex-col"> {/* Set full height */}
          {/* Sidebar header */}
          <div className="flex items-center justify-between border-b px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-blue-600 p-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5 text-white"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span className="font-semibold">MockInterview.ai</span>
            </div>
            <button className="rounded-md p-2 hover:bg-gray-100 lg:hidden" onClick={() => setIsOpen(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>

          {/* Sidebar content */}
          <nav className="flex-1 px-2 py-4">
            <ul className="space-y-1">
              <li>
                <Link to="/" className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="flex items-center gap-2 rounded-md bg-gray-100 px-3 py-2 text-blue-600 font-medium">
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/history" className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
                  <span>Interview History</span>
                </Link>
              </li>
              <li>
                <Link to="/settings" className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Sidebar footer */}
          <div className="border-t px-2 py-4">
            <Link to="/logout" className="flex items-center gap-2 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-100">
              <span>Logout</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
