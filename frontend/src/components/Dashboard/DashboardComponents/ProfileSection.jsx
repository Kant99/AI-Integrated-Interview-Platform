"use client"

import { useState } from "react"

function ProfileSection({ name, email, profilePicture }) {
  const [isEditing, setIsEditing] = useState(false)
  const [userName, setUserName] = useState(name)
  const [userEmail, setUserEmail] = useState(email)

  const handleSave = () => {
    // Here you would typically save the updated profile to your backend
    setIsEditing(false)
  }

  return (
    <div className="rounded-lg border bg-white shadow">
      <div className="border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Profile</h2>
          <button
            className="flex items-center rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium hover:bg-gray-100"
            onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            {isEditing ? (
              <>
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
                  className="mr-2 h-4 w-4"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                Save
              </>
            ) : (
              <>
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
                  className="mr-2 h-4 w-4"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
                </svg>
                Edit
              </>
            )}
          </button>
        </div>
      </div>
      <div className="px-6 py-4">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="flex justify-center sm:justify-start">
            <div className="relative h-24 w-24 overflow-hidden rounded-full">
              <img
                src={profilePicture || "/placeholder.svg"}
                alt="Profile picture"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-4">
            <div>
              <label htmlFor="name" className="text-sm font-medium text-gray-500">
                Name
              </label>
              {isEditing ? (
                <input
                  id="name"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              ) : (
                <div className="mt-1 text-lg font-medium">{userName}</div>
              )}
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-500">
                Email
              </label>
              {isEditing ? (
                <input
                  id="email"
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              ) : (
                <div className="mt-1">{userEmail}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSection

