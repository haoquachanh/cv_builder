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
        className={`space-y-4 transition-all duration-300 ease-in-out ${
          isCollapsed ? "hidden" : ""
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <FaUser />
            </div>
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              value={cv?.personalInfo?.fullName || ""}
              onChange={(e) => handleChange("fullName", e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <FaEnvelope />
            </div>
            <Input
              label="Email"
              type="email"
              placeholder="example@mail.com"
              value={cv?.personalInfo?.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <FaPhone />
            </div>
            <Input
              label="Phone"
              placeholder="e.g. +123 456 789"
              value={cv?.personalInfo?.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <FaMapMarkerAlt />
            </div>
            <Input
              label="Location"
              placeholder="City, Country"
              value={cv?.personalInfo?.location || ""}
              onChange={(e) => handleChange("location", e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <FaLinkedin />
            </div>
            <Input
              label="LinkedIn"
              placeholder="LinkedIn profile URL"
              value={cv?.personalInfo?.linkedin || ""}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <FaGithub />
            </div>
            <Input
              label="GitHub"
              placeholder="GitHub profile URL"
              value={cv?.personalInfo?.github || ""}
              onChange={(e) => handleChange("github", e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative col-span-2">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
              <FaGlobe />
            </div>
            <Input
              label="Personal Website"
              placeholder="Your website URL"
              value={cv?.personalInfo?.website || ""}
              onChange={(e) => handleChange("website", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
