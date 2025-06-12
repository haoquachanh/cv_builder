// src/components/cv/sections/Experience.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/common/Input";
import { useCV } from "@/context/CVContext";
import { SectionHeader } from "@/components/cv/shared/SectionHeader";
import { Experience as ExperienceType } from "@/types/cv";
import { generateId } from "@/lib/utils/id";
import {
  FaBriefcase,
  FaBuilding,
  FaCalendar,
  FaMapMarkerAlt,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

export const Experience = () => {
  const { cv, updateCV } = useCV();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleAddExperience = () => {
    const newExperience: ExperienceType = {
      id: generateId("exp"),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
      achievements: [],
      technologies: [],
    };
    updateCV("experience", [...(cv?.experience || []), newExperience]);
    setIsCollapsed(false);
  };

  const handleDeleteExperience = (index: number) => {
    const updatedExperience = cv?.experience?.filter((_, idx) => idx !== index);
    updateCV("experience", updatedExperience || []);
  };

  const handleUpdateExperience = (
    index: number,
    field: keyof ExperienceType,
    value: string | string[]
  ) => {
    if (!cv?.experience) return;
    const updatedExperience = [...cv.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    updateCV("experience", updatedExperience);
  };

  const handleAchievementsChange = (index: number, value: string) => {
    const achievements = value
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item !== "");
    handleUpdateExperience(index, "achievements", achievements);
  };

  const handleTechnologiesChange = (index: number, value: string) => {
    const technologies = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
    handleUpdateExperience(index, "technologies", technologies);
  };

  const addButton = (
    <button
      onClick={handleAddExperience}
      className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      <FaPlus className="text-white" /> Add Experience
    </button>
  );

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Experience"
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        actionButton={addButton}
      />

      <div
        className={`space-y-6 transition-all duration-300 ease-in-out ${
          isCollapsed ? "hidden" : ""
        }`}
      >
        {cv?.experience?.map((exp, idx) => (
          <div
            key={exp.id}
            className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Experience #{idx + 1}
              </h3>
              <button
                onClick={() => handleDeleteExperience(idx)}
                className="text-red-500 hover:text-red-700 transition-colors p-1"
                title="Delete experience"
              >
                <FaTrash />
              </button>
            </div>

            {/* Basic Information */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <Input
                  name={`company-${exp.id}`}
                  label="Company Name"
                  placeholder="e.g. Google"
                  icon={<FaBuilding />}
                  value={exp.company}
                  onChange={(e) =>
                    handleUpdateExperience(idx, "company", e.target.value)
                  }
                  hint="The name of the company you worked for"
                />
                <Input
                  name={`position-${exp.id}`}
                  label="Job Title"
                  placeholder="e.g. Senior Software Engineer"
                  icon={<FaBriefcase />}
                  value={exp.position}
                  onChange={(e) =>
                    handleUpdateExperience(idx, "position", e.target.value)
                  }
                  hint="Your role at the company"
                />
              </div>
              <div className="space-y-4">
                <Input
                  name={`location-${exp.id}`}
                  label="Location"
                  placeholder="e.g. San Francisco, CA"
                  icon={<FaMapMarkerAlt />}
                  value={exp.location || ""}
                  onChange={(e) =>
                    handleUpdateExperience(idx, "location", e.target.value)
                  }
                  hint="City and country/state of the job"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name={`startDate-${exp.id}`}
                    label="Start Date"
                    placeholder="MM/YYYY"
                    icon={<FaCalendar />}
                    value={exp.startDate}
                    onChange={(e) =>
                      handleUpdateExperience(idx, "startDate", e.target.value)
                    }
                    hint="When you started"
                  />
                  <Input
                    name={`endDate-${exp.id}`}
                    label="End Date"
                    placeholder="MM/YYYY or Present"
                    icon={<FaCalendar />}
                    value={exp.endDate || ""}
                    onChange={(e) =>
                      handleUpdateExperience(idx, "endDate", e.target.value)
                    }
                    hint="When you left"
                  />
                </div>
              </div>
            </div>

            {/* Description and Details */}
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Job Description
                </label>
                <textarea
                  name={`description-${exp.id}`}
                  placeholder="Describe your role, responsibilities, and key contributions..."
                  value={exp.description || ""}
                  onChange={(e) =>
                    handleUpdateExperience(idx, "description", e.target.value)
                  }
                  className="w-full px-3 py-2.5 bg-white dark:bg-gray-900
                    border border-gray-300 dark:border-gray-700 rounded-lg
                    shadow-sm outline-none transition-all duration-200
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    hover:border-gray-400 dark:hover:border-gray-600
                    focus:border-primary-500 focus:ring-1 focus:ring-primary-500
                    dark:focus:border-primary-500 dark:focus:ring-primary-500/20
                    min-h-[100px] resize-y"
                />
                <p className="mt-1.5 text-sm text-gray-500">
                  Provide a clear overview of your role and responsibilities
                </p>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Key Achievements
                </label>
                <textarea
                  name={`achievements-${exp.id}`}
                  placeholder="• Increased revenue by 25%
• Led a team of 5 developers
• Implemented new feature that..."
                  value={(exp.achievements || []).join("\n")}
                  onChange={(e) =>
                    handleAchievementsChange(idx, e.target.value)
                  }
                  className="w-full px-3 py-2.5 bg-white dark:bg-gray-900
                    border border-gray-300 dark:border-gray-700 rounded-lg
                    shadow-sm outline-none transition-all duration-200
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    hover:border-gray-400 dark:hover:border-gray-600
                    focus:border-primary-500 focus:ring-1 focus:ring-primary-500
                    dark:focus:border-primary-500 dark:focus:ring-primary-500/20
                    min-h-[100px] resize-y font-mono text-sm"
                />
                <p className="mt-1.5 text-sm text-gray-500">
                  List your achievements one per line, starting with action
                  verbs
                </p>
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Technologies Used
                </label>
                <textarea
                  name={`technologies-${exp.id}`}
                  placeholder="React, TypeScript, Node.js, AWS..."
                  value={(exp.technologies || []).join(", ")}
                  onChange={(e) =>
                    handleTechnologiesChange(idx, e.target.value)
                  }
                  className="w-full px-3 py-2.5 bg-white dark:bg-gray-900
                    border border-gray-300 dark:border-gray-700 rounded-lg
                    shadow-sm outline-none transition-all duration-200
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    hover:border-gray-400 dark:hover:border-gray-600
                    focus:border-primary-500 focus:ring-1 focus:ring-primary-500
                    dark:focus:border-primary-500 dark:focus:ring-primary-500/20
                    min-h-[60px] resize-y"
                />
                <p className="mt-1.5 text-sm text-gray-500">
                  List technologies separated by commas
                </p>
              </div>
            </div>
          </div>
        ))}

        {(!cv?.experience || cv.experience.length === 0) && (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
            <div className="flex flex-col items-center gap-2">
              <FaBriefcase className="text-gray-400 dark:text-gray-600 text-2xl" />{" "}
              <p className="text-gray-500 dark:text-gray-400">
                No experience added yet. Click &quot;Add Experience&quot; to get
                started.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
