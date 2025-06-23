"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/common/Input";
import { useCV } from "@/context/CVContext";
import { SectionHeader } from "@/components/cv/shared/SectionHeader";
import { Experience as ExperienceType } from "@/types/cv";
import {
  FaBriefcase,
  FaBuilding,
  FaCalendar,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { Button } from "@/components/common/Button";

// Create a memoized ExperienceItem component to avoid unnecessary re-renders
const ExperienceItem = React.memo(
  ({
    exp,
    index,
    onUpdate,
    onDelete,
    onAchievementsChange,
    onTechnologiesChange,
  }: {
    exp: ExperienceType;
    index: number;
    onUpdate: (
      index: number,
      field: keyof ExperienceType,
      value: string | string[]
    ) => void;
    onDelete: (index: number) => void;
    onAchievementsChange: (index: number, value: string) => void;
    onTechnologiesChange: (index: number, value: string) => void;
  }) => {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Experience #{index + 1}
          </h3>
          <Button
            onClick={() => onDelete(index)}
            variant="outline"
            className="text-red-500 hover:text-red-700 transition-colors p-1 border-none"
            title="Delete education"
          >
            <FaTrash />
          </Button>
        </div>

        {/* Basic Information */}
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div className="space-y-4 grid-cols-2">
            <Input
              name={`company-${exp.id}`}
              label="Company Name"
              placeholder="e.g. Google"
              icon={<FaBuilding />}
              value={exp.company}
              onChange={(e) => onUpdate(index, "company", e.target.value)}
            />
            <Input
              name={`position-${exp.id}`}
              label="Job Title"
              placeholder="e.g. Senior Software Engineer"
              icon={<FaBriefcase />}
              value={exp.position}
              onChange={(e) => onUpdate(index, "position", e.target.value)}
            />
          </div>
          <div className="space-y-4 grid-cols-2">
            <div className="grid grid-cols-2 gap-4">
              <Input
                name={`startDate-${exp.id}`}
                label="Start Date"
                type="date"
                placeholder="YYYY-MM-DD"
                icon={<FaCalendar />}
                value={exp.startDate}
                onChange={(e) => onUpdate(index, "startDate", e.target.value)}
              />
              <Input
                name={`endDate-${exp.id}`}
                label="End Date"
                type="date"
                placeholder="YYYY-MM-DD"
                icon={<FaCalendar />}
                value={exp.endDate || ""}
                onChange={(e) => onUpdate(index, "endDate", e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Description and Details */}
        <div className="space-y-4">
          {/* Job Description section removed */}
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
              onChange={(e) => onAchievementsChange(index, e.target.value)}
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
              List your achievements one per line, starting with action verbs
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
              onChange={(e) => onTechnologiesChange(index, e.target.value)}
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
    );
  }
);

ExperienceItem.displayName = "ExperienceItem";

// Helper function to check if an ID already exists in the experience array
const isIdDuplicate = (id: string, experiences: ExperienceType[]): boolean => {
  return experiences.some((exp) => exp.id === id);
};

// Using React.memo to prevent unnecessary renders
export const Experience = React.memo(() => {
  const { cv, updateCV } = useCV();
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Local state to store experience data
  const [localExperience, setLocalExperience] = useState<ExperienceType[]>([]);
  const didInitialize = useRef(false);

  // Initialize local state from context only once at component mount
  useEffect(() => {
    if (!didInitialize.current && cv?.experience) {
      // Ensure all experience items have truly unique IDs by adding timestamp to their IDs
      const validatedExperience = cv.experience.map((exp, index) => {
        // Create a guaranteed unique ID
        const uniqueId = `exp_${Date.now() + index}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        return { ...exp, id: uniqueId };
      });

      setLocalExperience(validatedExperience);
      didInitialize.current = true;
    }
  }, [cv?.experience]); // Include cv.experience in dependencies to satisfy linter

  const handleAddExperience = () => {
    // Generate a unique ID with timestamp and random string to guarantee uniqueness
    const uniqueId = `exp_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    const newExperience: ExperienceType = {
      id: uniqueId,
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      location: "",
      achievements: [],
      technologies: [],
    };

    // Only update local state, not global context
    setLocalExperience((prev) => [...prev, newExperience]);
    setIsCollapsed(false);
  };

  const handleDeleteExperience = (index: number) => {
    // Only update local state
    setLocalExperience((prev) => prev.filter((_, idx) => idx !== index));
  };

  // Use debounce to prevent update loops
  const updateTimeout = useRef<NodeJS.Timeout | null>(null);

  // Update context with debouncing to prevent infinite loops
  useEffect(() => {
    // Skip the initial render
    if (!didInitialize.current) return;

    // Clear any existing timeout
    if (updateTimeout.current) {
      clearTimeout(updateTimeout.current);
    } // Schedule update after a delay
    updateTimeout.current = setTimeout(() => {
      updateCV("experience", localExperience);
    }, 300); // 300ms debounce - reduced for more responsive preview updates

    // Cleanup
    return () => {
      if (updateTimeout.current) {
        clearTimeout(updateTimeout.current);
      }
    };
  }, [localExperience, updateCV]);

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

  // Update only local state - the useEffect above will handle updating CVContext
  const handleUpdateExperience = (
    index: number,
    field: keyof ExperienceType,
    value: string | string[]
  ) => {
    setLocalExperience((prev) => {
      const updated = [...prev];
      if (updated[index]) {
        updated[index] = {
          ...updated[index],
          [field]: value,
        };
      }
      return updated;
    });
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
    <Button
      onClick={handleAddExperience}
      variant="primary"
      className="flex items-center gap-2 px-4 py-2 text-sm"
    >
      <FaPlus /> Add Experience
    </Button>
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
        {localExperience.map((exp, idx) => (
          <ExperienceItem
            key={exp.id}
            exp={exp}
            index={idx}
            onUpdate={handleUpdateExperience}
            onDelete={handleDeleteExperience}
            onAchievementsChange={handleAchievementsChange}
            onTechnologiesChange={handleTechnologiesChange}
          />
        ))}

        {localExperience.length === 0 && (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
            <div className="flex flex-col items-center gap-2">
              <FaBriefcase className="text-gray-400 dark:text-gray-600 text-2xl" />
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
});

Experience.displayName = "Experience";
