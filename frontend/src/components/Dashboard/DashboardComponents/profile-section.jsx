import React, { useState } from "react";

export function ProfileSection({ name, email, profilePicture }) {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);

  const handleSave = () => {
    // Here you would typically save the updated profile to your backend
    setIsEditing(false);
  };

  return (
    <div className="border rounded-lg p-6 shadow-md bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Your Profile</h2>
        <button 
          className="border px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100" 
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}>
          {isEditing ? "Save" : "Edit"}
        </button>
      </div>
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="flex justify-center sm:justify-start">
          <div className="relative h-24 w-24 overflow-hidden rounded-full border">
            <img src={profilePicture || "/placeholder.svg"} alt="Profile" className="object-cover w-full h-full" />
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-4">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-gray-600">Name</label>
            {isEditing ? (
              <input 
                id="name" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                className="w-full p-2 mt-1 border rounded-md" 
              />
            ) : (
              <div className="mt-1 text-lg font-medium">{userName}</div>
            )}
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-600">Email</label>
            {isEditing ? (
              <input 
                id="email" 
                type="email" 
                value={userEmail} 
                onChange={(e) => setUserEmail(e.target.value)} 
                className="w-full p-2 mt-1 border rounded-md" 
              />
            ) : (
              <div className="mt-1">{userEmail}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
