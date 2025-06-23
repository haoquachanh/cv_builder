// src/components/cv/sections/Education.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/common/Input";
import { useCV } from "@/context/CVContext";
import { SectionHeader } from "@/components/cv/shared/SectionHeader";
import { Education as EducationType } from "@/types/cv";

import {
  FaGraduationCap,
  FaUniversity,
  FaBook,
  FaCalendar,
  FaTrash,
  FaPlus,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";
import { Button } from "@/components/common/Button";

// Create a memoized EducationItem component to avoid unnecessary re-renders
const EducationItem = React.memo(
  ({
    edu,
    index,
    onUpdate,
    onDelete,
  }: {
    edu: EducationType;
    index: number;
    onUpdate: (
      index: number,
      field: keyof EducationType,
      value: string
    ) => void;
    onDelete: (index: number) => void;
  }) => {
    return (
      <div className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm">
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Education #{index + 1}
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

        {/* School Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <Input
              name={`school-${edu.id}`}
              label="School/University"
              placeholder="e.g. Harvard University"
              icon={<FaUniversity />}
              value={edu.school}
              onChange={(e) => onUpdate(index, "school", e.target.value)}
            />
            <Input
              name={`degree-${edu.id}`}
              label="Degree"
              placeholder="e.g. Bachelor of Science"
              icon={<FaGraduationCap />}
              value={edu.degree}
              onChange={(e) => onUpdate(index, "degree", e.target.value)}
            />
          </div>
          <div className="space-y-4">
            <Input
              name={`fieldOfStudy-${edu.id}`}
              label="Field of Study"
              placeholder="e.g. Computer Science"
              icon={<FaBook />}
              value={edu.fieldOfStudy}
              onChange={(e) => onUpdate(index, "fieldOfStudy", e.target.value)}
            />
            <Input
              name={`location-${edu.id}`}
              label="Location"
              placeholder="e.g. Cambridge, MA"
              icon={<FaMapMarkerAlt />}
              value={edu.location || ""}
              onChange={(e) => onUpdate(index, "location", e.target.value)}
            />
          </div>
        </div>

        {/* Additional Details */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                name={`startDate-${edu.id}`}
                label="Start Date"
                type="date"
                placeholder="YYYY-MM-DD"
                icon={<FaCalendar />}
                value={edu.startDate}
                onChange={(e) => onUpdate(index, "startDate", e.target.value)}
              />
              <Input
                name={`endDate-${edu.id}`}
                label="End Date"
                type="date"
                placeholder="YYYY-MM-DD"
                icon={<FaCalendar />}
                value={edu.endDate || ""}
                onChange={(e) => onUpdate(index, "endDate", e.target.value)}
              />
            </div>
            <Input
              name={`gpa-${edu.id}`}
              label="GPA (Optional)"
              placeholder="e.g. 3.8/4.0"
              icon={<FaStar />}
              value={edu.gpa || ""}
              onChange={(e) => onUpdate(index, "gpa", e.target.value)}
            />
          </div>
          {/* Description section removed */}
        </div>
      </div>
    );
  }
);

EducationItem.displayName = "EducationItem";

// Using React.memo to prevent unnecessary renders
export const Education = React.memo(() => {
  const { cv, updateCV } = useCV();
  const [isCollapsed, setIsCollapsed] = useState(false);
  // Local state for education data
  const [localEducation, setLocalEducation] = useState<EducationType[]>([]);
  const didInitialize = useRef(false);

  // Initialize local state from context only once at component mount
  useEffect(() => {
    if (!didInitialize.current && cv?.education) {
      setLocalEducation(cv.education);
      didInitialize.current = true;
    }
  }, [cv?.education]); // Include cv.education in dependencies to satisfy linter
  const handleAddEducation = () => {
    // Generate a unique ID with timestamp to guarantee uniqueness
    const uniqueId = `edu_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const newEducation: EducationType = {
      id: uniqueId,
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      location: "",
      gpa: "",
    };
    // Update only local state - the useEffect will handle updating CVContext
    setLocalEducation((prev) => [...prev, newEducation]);
    setIsCollapsed(false);
  };

  const handleDeleteEducation = (index: number) => {
    // Update only local state - the useEffect will handle updating CVContext
    setLocalEducation((prev) => prev.filter((_, idx) => idx !== index));
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
      updateCV("education", localEducation);
    }, 300); // 300ms debounce - reduced for more responsive preview updates

    // Cleanup
    return () => {
      if (updateTimeout.current) {
        clearTimeout(updateTimeout.current);
      }
    };
  }, [localEducation, updateCV]);

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

  // Update only local state - the useEffect will handle updating CVContext
  const handleUpdateEducation = (
    index: number,
    field: keyof EducationType,
    value: string
  ) => {
    setLocalEducation((prev) => {
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

  const addButton = (
    <Button
      onClick={handleAddEducation}
      variant="primary"
      className="flex items-center gap-2 px-4 py-2 text-sm"
    >
      <FaPlus /> Add Education
    </Button>
  );

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Education"
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        actionButton={addButton}
      />
      <div
        className={`space-y-6 transition-all duration-300 ease-in-out ${
          isCollapsed ? "hidden" : ""
        }`}
      >
        {localEducation.map((edu, idx) => (
          <EducationItem
            key={edu.id}
            edu={edu}
            index={idx}
            onUpdate={handleUpdateEducation}
            onDelete={handleDeleteEducation}
          />
        ))}
        {localEducation.length === 0 && (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
            <div className="flex flex-col items-center gap-2">
              <FaGraduationCap className="text-gray-400 dark:text-gray-600 text-2xl" />
              <p className="text-gray-500 dark:text-gray-400">
                No education added yet. Click &quot;Add Education&quot; to get
                started.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

Education.displayName = "Education";
