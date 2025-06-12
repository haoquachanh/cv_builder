// src/components/cv/sections/PersonalInfo.tsx
"use client";

import { useState } from "react";
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
} from "react-icons/fa";

export const PersonalInfo = () => {
  const { cv, updateCV } = useCV();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleChange = (field: keyof PersonalInfoType, value: string) => {
    updateCV("personalInfo", {
      ...(cv?.personalInfo || {
        fullName: "",
        email: "",
        phone: "",
        location: "",
      }),
      [field]: value,
    });
  };

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Personal Information"
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />

      <div
        className={`space-y-8 transition-all duration-300 ease-in-out ${
          isCollapsed ? "hidden" : ""
        }`}
      >
        {/* Basic Information */}
        <fieldset className="space-y-4">
          <legend className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <FaUser className="text-gray-400" />
            Basic Information
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              name="fullName"
              label="Full Name"
              placeholder="Enter your full name"
              icon={<FaUser />}
              value={cv?.personalInfo?.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
              hint="Enter your name as you'd like it to appear on your CV"
            />
            <Input
              name="title"
              label="Professional Title"
              placeholder="e.g. Senior Software Engineer"
              icon={<FaBriefcase />}
              value={cv?.personalInfo?.title || ""}
              onChange={(e) => handleChange("title", e.target.value)}
              hint="Your current job title or professional role"
            />
          </div>
        </fieldset>

        {/* Contact Information */}
        <fieldset className="space-y-4">
          <legend className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <FaEnvelope className="text-gray-400" />
            Contact Information
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              name="email"
              label="Email"
              type="email"
              placeholder="example@mail.com"
              icon={<FaEnvelope />}
              value={cv?.personalInfo?.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              hint="Your primary contact email"
            />
            <Input
              name="phone"
              label="Phone"
              placeholder="+1 (234) 567-8900"
              icon={<FaPhone />}
              value={cv?.personalInfo?.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              hint="Include your country code"
            />
            <Input
              name="location"
              label="Location"
              placeholder="City, Country"
              icon={<FaMapMarkerAlt />}
              value={cv?.personalInfo?.location || ""}
              onChange={(e) => handleChange("location", e.target.value)}
              hint="Your current location or preferred work location"
            />
          </div>
        </fieldset>

        {/* Online Presence */}
        <fieldset className="space-y-4">
          <legend className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <FaGlobe className="text-gray-400" />
            Online Presence
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              name="linkedin"
              label="LinkedIn Profile"
              placeholder="https://linkedin.com/in/yourprofile"
              icon={<FaLinkedin />}
              value={cv?.personalInfo?.linkedin || ""}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              hint="Full URL to your LinkedIn profile"
            />
            <Input
              name="github"
              label="GitHub Profile"
              placeholder="https://github.com/yourusername"
              icon={<FaGithub />}
              value={cv?.personalInfo?.github || ""}
              onChange={(e) => handleChange("github", e.target.value)}
              hint="Full URL to your GitHub profile"
            />
            <Input
              name="website"
              label="Personal Website"
              placeholder="https://yourwebsite.com"
              icon={<FaGlobe />}
              value={cv?.personalInfo?.website || ""}
              onChange={(e) => handleChange("website", e.target.value)}
              hint="Your portfolio or personal website URL"
            />
          </div>
        </fieldset>

        {/* Professional Summary */}
        <fieldset className="space-y-4">
          <legend className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <FaInfoCircle className="text-gray-400" />
            Professional Summary
          </legend>
          <div className="grid grid-cols-1 gap-6">
            <div className="col-span-full">
              <textarea
                name="summary"
                placeholder="Write a brief summary of your professional background and career objectives..."
                value={cv?.personalInfo?.summary || ""}
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
};
