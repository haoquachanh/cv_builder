// src/components/cv/sections/Education.tsx
"use client";

import { useState } from "react";
import { Input } from "@/components/common/Input";
import { useCV } from "@/context/CVContext";
import { SectionHeader } from "@/components/cv/shared/SectionHeader";
import { Education as EducationType } from "@/types/cv";
import { generateId } from "@/lib/utils/id";
import {
  FaGraduationCap,
  FaUniversity,
  FaBook,
  FaCalendar,
  FaTrash,
  FaPlus,
} from "react-icons/fa";

export const Education = () => {
  const { cv, updateCV } = useCV();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const handleAddEducation = () => {
    const newEducation: EducationType = {
      id: generateId("edu"),
      school: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
    };
    updateCV("education", [...(cv?.education || []), newEducation]);
    setIsCollapsed(false); // Expand section when adding new education
  };

  const handleDeleteEducation = (index: number) => {
    const updatedEducation = cv?.education?.filter((_, idx) => idx !== index);
    updateCV("education", updatedEducation || []);
  };

  const handleUpdateEducation = (
    index: number,
    field: keyof EducationType,
    value: string
  ) => {
    if (!cv?.education) return;
    const updatedEducation = [...cv.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value,
    };
    updateCV("education", updatedEducation);
  };

  const addButton = (
    <button
      onClick={handleAddEducation}
      className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
    >
      <FaPlus /> Add new
    </button>
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
        className={`space-y-4 transition-all duration-300 ease-in-out ${
          isCollapsed ? "hidden" : ""
        }`}
      >
        <div className="space-y-6">
          {cv?.education?.map((edu: EducationType, idx: number) => (
            <div
              key={edu.id}
              className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium text-gray-700">
                  Education #{idx + 1}
                </h3>
                <button
                  onClick={() => handleDeleteEducation(idx)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                      <FaUniversity />
                    </div>
                    <Input
                      label="School/University"
                      placeholder="e.g. Harvard University"
                      value={edu.school}
                      onChange={(e) =>
                        handleUpdateEducation(idx, "school", e.target.value)
                      }
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                      <FaGraduationCap />
                    </div>
                    <Input
                      label="Degree"
                      placeholder="e.g. Bachelor of Science"
                      value={edu.degree}
                      onChange={(e) =>
                        handleUpdateEducation(idx, "degree", e.target.value)
                      }
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                      <FaBook />
                    </div>
                    <Input
                      label="Field of Study"
                      placeholder="e.g. Computer Science"
                      value={edu.fieldOfStudy}
                      onChange={(e) =>
                        handleUpdateEducation(
                          idx,
                          "fieldOfStudy",
                          e.target.value
                        )
                      }
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                      <FaCalendar />
                    </div>
                    <Input
                      label="Start Date"
                      placeholder="e.g. 2020"
                      value={edu.startDate}
                      onChange={(e) =>
                        handleUpdateEducation(idx, "startDate", e.target.value)
                      }
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                      <FaCalendar />
                    </div>
                    <Input
                      label="End Date"
                      placeholder="e.g. 2024 (or leave blank if current)"
                      value={edu.endDate}
                      onChange={(e) =>
                        handleUpdateEducation(idx, "endDate", e.target.value)
                      }
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                      <FaBook />
                    </div>
                    <Input
                      label="Description (Optional)"
                      placeholder="e.g. Relevant coursework, achievements, etc."
                      value={edu.description || ""}
                      onChange={(e) =>
                        handleUpdateEducation(
                          idx,
                          "description",
                          e.target.value
                        )
                      }
                      className="pl-10"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                      <FaGraduationCap />
                    </div>
                    <Input
                      label="GPA (Optional)"
                      placeholder="e.g. 3.8/4.0"
                      value={edu.gpa || ""}
                      onChange={(e) =>
                        handleUpdateEducation(idx, "gpa", e.target.value)
                      }
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!cv?.education || cv.education.length === 0) && (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500">
              {" "}
              No education yet. Click &quot;Add new education&quot; to get
              started.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
