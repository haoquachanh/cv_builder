"use client";

import { useState } from "react";
import {
  FaUser,
  FaLinkedin,
  FaGithub,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Button } from "@/components/common/Button";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    location: "New York, USA",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    // Here you would typically save the changes to your backend
    console.log("Saving profile data:", profileData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset any unsaved changes
    setIsEditing(false);
  };

  // Get initials for avatar
  const getInitials = () => {
    return profileData.fullName
      .split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Profile Settings
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage your personal information and account
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button
              variant={isEditing ? "outline" : "primary"}
              onClick={() => (isEditing ? handleCancel() : setIsEditing(true))}
              iconLeft={
                isEditing ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                )
              }
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </div>

        {/* Personal Information Card */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden mb-6">
          <div className="border-b border-gray-100 p-4 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-lg font-semibold text-gray-800">
              Personal Information
            </h2>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center space-y-3">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-semibold shadow-sm">
                    {getInitials()}
                  </div>
                  {isEditing && (
                    <button
                      className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-sm border border-gray-100 hover:bg-gray-50"
                      aria-label="Change profile picture"
                    >
                      <FaUser className="w-4 h-4 text-gray-600" />
                    </button>
                  )}
                </div>
                {isEditing && (
                  <span className="text-xs text-gray-500">
                    Click to upload new photo
                  </span>
                )}
              </div>

              {/* Profile Form */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      htmlFor="fullName"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 text-gray-700"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaUser className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={profileData.email}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 text-gray-700"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaEnvelope className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      htmlFor="phone"
                    >
                      Phone
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 text-gray-700"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaPhone className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-700 mb-1"
                      htmlFor="location"
                    >
                      Location
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={profileData.location}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 text-gray-700"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <FaMapMarkerAlt className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end mt-6">
                <Button
                  variant="primary"
                  onClick={handleSaveChanges}
                  iconLeft={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  }
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Social Profiles Card */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
          <div className="border-b border-gray-100 p-4 bg-gradient-to-r from-gray-50 to-white">
            <h2 className="text-lg font-semibold text-gray-800">
              Social Profiles
            </h2>
          </div>

          <div className="p-6">
            <div className="space-y-5">
              {/* LinkedIn */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <FaLinkedin className="text-blue-700 w-5 h-5" />
                </div>
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="linkedin"
                  >
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    id="linkedin"
                    name="linkedin"
                    value={profileData.linkedin}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 text-gray-700"
                  />
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                  <FaGithub className="text-gray-700 w-5 h-5" />
                </div>
                <div className="flex-1">
                  <label
                    className="block text-sm font-medium text-gray-700 mb-1"
                    htmlFor="github"
                  >
                    GitHub
                  </label>
                  <input
                    type="text"
                    id="github"
                    name="github"
                    value={profileData.github}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 text-gray-700"
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end mt-6">
                <Button
                  variant="primary"
                  onClick={handleSaveChanges}
                  iconLeft={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  }
                >
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
