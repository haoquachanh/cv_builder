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
      id: String(Date.now()),
      company: "",
      position: "",
      startDate: "",
      location: "",
      description: "",
    };
    updateCV("experience", [...(cv?.experience || []), newExperience]);
    setIsCollapsed(false); // Expand section when adding new experience
  };

  const handleDeleteExperience = (index: number) => {
    const updatedExperience = cv?.experience?.filter((_, idx) => idx !== index);
    updateCV("experience", updatedExperience || []);
  };

  const handleUpdateExperience = (
    index: number,
    field: keyof ExperienceType,
    value: string
  ) => {
    if (!cv?.experience) return;
    const updatedExperience = [...cv.experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    updateCV("experience", updatedExperience);
  };

  const addButton = (
    <button
      onClick={handleAddExperience}
      className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
    >
      <FaPlus /> Add new
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
        className={`space-y-4 transition-all duration-300 ease-in-out ${
          isCollapsed ? "hidden" : ""
        }`}
      >
        {cv?.experience?.map((exp, idx) => (
          <div
            key={exp.id}
            className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-medium text-gray-700">
                Experience #{idx + 1}
              </h3>
              <button
                onClick={() => handleDeleteExperience(idx)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <FaTrash />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                    <FaBuilding />
                  </div>
                  <Input
                    label="Company"
                    placeholder="e.g. Google"
                    value={exp.company}
                    onChange={(e) =>
                      handleUpdateExperience(idx, "company", e.target.value)
                    }
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                    <FaBriefcase />
                  </div>
                  <Input
                    label="Position"
                    placeholder="e.g. Software Engineer"
                    value={exp.position}
                    onChange={(e) =>
                      handleUpdateExperience(idx, "position", e.target.value)
                    }
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                    <FaMapMarkerAlt />
                  </div>
                  <Input
                    label="Location"
                    placeholder="e.g. San Francisco, CA"
                    value={exp.location}
                    onChange={(e) =>
                      handleUpdateExperience(idx, "location", e.target.value)
                    }
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                    <FaCalendar />
                  </div>
                  <Input
                    label="Period"
                    placeholder="e.g. Jan 2020 - Present"
                    value={
                      exp.endDate
                        ? `${exp.startDate} - ${exp.endDate}`
                        : exp.startDate || ""
                    }
                    onChange={(e) =>
                      handleUpdateExperience(idx, "startDate", e.target.value)
                    }
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="col-span-2">
                <Input
                  label="Description"
                  placeholder="Brief description of your role and achievements"
                  value={exp.description || ""}
                  onChange={(e) =>
                    handleUpdateExperience(idx, "description", e.target.value)
                  }
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {(!cv?.experience || cv.experience.length === 0) && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500">
            {" "}
            No experience yet. Click &quot;Add new experience&quot; to get
            started.
          </p>
        </div>
      )}
    </section>
  );
};
