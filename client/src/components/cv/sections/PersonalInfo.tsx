// src/components/cv/sections/PersonalInfo.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/common/Input";
import { useCV } from "@/context/CVContext";
import { SectionHeader } from "@/components/cv/shared/SectionHeader";
import { PersonalInfo as PersonalInfoType } from "@/types/cv";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaBriefcase,
  FaInfoCircle,
  FaCalendar,
} from "react-icons/fa";
import { Button } from "@/components/common/Button";

export const PersonalInfo = React.memo(() => {
  const { cv, updateCV } = useCV();
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Local state for personal info
  const [localPersonalInfo, setLocalPersonalInfo] = useState<PersonalInfoType>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    dateOfBirth: "",
  });
  const didInitialize = useRef(false);

  // Initialize local state from context only once at component mount
  useEffect(() => {
    if (!didInitialize.current && cv?.personalInfo) {
      setLocalPersonalInfo(cv.personalInfo);
      didInitialize.current = true;
    }
  }, [cv?.personalInfo]); // Include cv.personalInfo in dependencies to satisfy linter

  // Use debounce to prevent update loops
  const updateTimeout = useRef<NodeJS.Timeout | null>(null);
  // Update context with debouncing to prevent infinite loops
  useEffect(() => {
    // Skip the initial render
    if (!didInitialize.current) return;

    // Clear any existing timeout
    if (updateTimeout.current) {
      clearTimeout(updateTimeout.current);
    }
    // Schedule update after a delay
    updateTimeout.current = setTimeout(() => {
      updateCV("personalInfo", localPersonalInfo);
    }, 300); // 300ms debounce - reduced for more responsive preview updates

    // Cleanup
    return () => {
      if (updateTimeout.current) {
        clearTimeout(updateTimeout.current);
      }
    };
  }, [localPersonalInfo, updateCV]);

  // When user clicks Save in toolbar, sync data to context for localStorage
  useEffect(() => {
    const handleSave = () => {
      // No need to update CV here as it's already in sync through the effect above
      // The event is just a trigger for CVContext to save to localStorage
    };

    // Listen for save event
    window.addEventListener("cv-save", handleSave);

    // Cleanup
    return () => {
      window.removeEventListener("cv-save", handleSave);
    };
  }, []);

  const handleChange = (field: keyof PersonalInfoType, value: string) => {
    // Update only local state - the useEffect above will handle updating CVContext
    setLocalPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFillFromProfile = () => {
    // Mock profile data (could be replaced with actual API call)
    const profile = {
      fullName: "Nguyen Van A",
      email: "nguyenvana@email.com",
      phone: "+84 912 345 678",
      location: "Hanoi, Vietnam",
      dateOfBirth: "1990-01-15",
      title: "Frontend Developer",
      linkedin: "https://linkedin.com/in/nguyenvana",
      github: "https://github.com/nguyenvana",
      website: "https://nguyenvana.dev",
      summary:
        "Experienced frontend developer with a passion for building beautiful and performant web applications.",
    };

    // Update only local state - the useEffect will handle updating CVContext
    setLocalPersonalInfo(profile);
    // No direct updateCV call here to avoid React errors
  };

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Personal Information"
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        actionButton={
          <Button
            type="button"
            variant="primary"
            className="ml-4 px-3 py-1.5 text-xs font-medium"
            onClick={handleFillFromProfile}
          >
            Fill from Profile
          </Button>
        }
      />
      <div
        className={`space-y-8 transition-all duration-300 ease-in-out ${
          isCollapsed ? "hidden" : ""
        }`}
      >
        {/* Basic Information */}
        <fieldset className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              icon={<FaUser />}
              value={localPersonalInfo?.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
            <Input
              name="title"
              label="Professional Title"
              placeholder="e.g. Senior Software Engineer"
              icon={<FaBriefcase />}
              value={localPersonalInfo?.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <Input
              name="dateOfBirth"
              label="Date of Birth"
              type="date"
              placeholder="YYYY-MM-DD"
              icon={<FaCalendar />}
              value={localPersonalInfo?.dateOfBirth || ""}
              onChange={(e) => handleChange("dateOfBirth", e.target.value)}
            />
            <Input
              name="location"
              label="Location"
              placeholder="City, Country"
              icon={<FaMapMarkerAlt />}
              value={localPersonalInfo?.location || ""}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          </div>
        </fieldset>

        {/* Contact Information */}
        <fieldset className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="example@mail.com"
              icon={<FaEnvelope />}
              value={localPersonalInfo?.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <Input
              name="phone"
              label="Phone"
              placeholder="+1 (234) 567-8900"
              icon={<FaPhone />}
              value={localPersonalInfo?.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              name="linkedin"
              label="LinkedIn Profile"
              placeholder="https://linkedin.com/in/yourprofile"
              icon={<FaLinkedin />}
              value={localPersonalInfo?.linkedin || ""}
              onChange={(e) => handleChange("linkedin", e.target.value)}
            />
            <Input
              name="github"
              label="GitHub Profile"
              placeholder="https://github.com/yourusername"
              icon={<FaGithub />}
              value={localPersonalInfo?.github || ""}
              onChange={(e) => handleChange("github", e.target.value)}
            />
            <Input
              name="website"
              label="Personal Website"
              placeholder="https://yourwebsite.com"
              icon={<FaGlobe />}
              value={localPersonalInfo?.website || ""}
              onChange={(e) => handleChange("website", e.target.value)}
            />
          </div>
        </fieldset>

        {/* Professional Summary */}
        <fieldset className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            <div className="col-span-full">
              <textarea
                name="summary"
                placeholder="Write a brief summary of your professional background and career objectives..."
                value={localPersonalInfo?.summary || ""}
                onChange={(e) => handleChange("summary", e.target.value)}
                className="w-full px-3 py-2.5 bg-white dark:bg-gray-900
                  border border-gray-300 dark:border-gray-700 rounded-lg
                  shadow-sm outline-none transition-all duration-200
                  placeholder:text-gray-400 dark:placeholder:text-gray-500
                  hover:border-gray-400 dark:hover:border-gray-600
                  focus:border-primary-500 focus:ring-1 focus:ring-primary-500
                  dark:focus:border-primary-500 dark:focus:ring-primary-500/20
                  min-h-[120px] resize-y"
              />
              <p className="mt-1.5 text-sm text-gray-500">
                Keep your summary concise and impactful. Highlight your key
                strengths and career goals.
              </p>
            </div>
          </div>
        </fieldset>
      </div>
    </section>
  );
});

PersonalInfo.displayName = "PersonalInfo";
