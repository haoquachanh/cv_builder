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
  FaMapMarkerAlt,
  FaStar,
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
      location: "",
      gpa: "",
      description: "",
    };
    updateCV("education", [...(cv?.education || []), newEducation]);
    setIsCollapsed(false);
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
      className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      <FaPlus className="text-white" /> Add Education
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
        className={`space-y-6 transition-all duration-300 ease-in-out ${
          isCollapsed ? "hidden" : ""
        }`}
      >
        {cv?.education?.map((edu, idx) => (
          <div
            key={edu.id}
            className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Education #{idx + 1}
              </h3>
              <button
                onClick={() => handleDeleteEducation(idx)}
                className="text-red-500 hover:text-red-700 transition-colors p-1"
                title="Delete education"
              >
                <FaTrash />
              </button>
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
                  onChange={(e) =>
                    handleUpdateEducation(idx, "school", e.target.value)
                  }
                  hint="Enter the name of your school or university"
                />
                <Input
                  name={`degree-${edu.id}`}
                  label="Degree"
                  placeholder="e.g. Bachelor of Science"
                  icon={<FaGraduationCap />}
                  value={edu.degree}
                  onChange={(e) =>
                    handleUpdateEducation(idx, "degree", e.target.value)
                  }
                  hint="Your degree type"
                />
              </div>
              <div className="space-y-4">
                <Input
                  name={`fieldOfStudy-${edu.id}`}
                  label="Field of Study"
                  placeholder="e.g. Computer Science"
                  icon={<FaBook />}
                  value={edu.fieldOfStudy}
                  onChange={(e) =>
                    handleUpdateEducation(idx, "fieldOfStudy", e.target.value)
                  }
                  hint="Your major or concentration"
                />
                <Input
                  name={`location-${edu.id}`}
                  label="Location"
                  placeholder="e.g. Cambridge, MA"
                  icon={<FaMapMarkerAlt />}
                  value={edu.location || ""}
                  onChange={(e) =>
                    handleUpdateEducation(idx, "location", e.target.value)
                  }
                  hint="City and state/country of the institution"
                />
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    name={`startDate-${edu.id}`}
                    label="Start Date"
                    placeholder="MM/YYYY"
                    icon={<FaCalendar />}
                    value={edu.startDate}
                    onChange={(e) =>
                      handleUpdateEducation(idx, "startDate", e.target.value)
                    }
                    hint="When you started"
                  />
                  <Input
                    name={`endDate-${edu.id}`}
                    label="End Date"
                    placeholder="MM/YYYY or Present"
                    icon={<FaCalendar />}
                    value={edu.endDate || ""}
                    onChange={(e) =>
                      handleUpdateEducation(idx, "endDate", e.target.value)
                    }
                    hint="When you completed/expect to complete"
                  />
                </div>
                <Input
                  name={`gpa-${edu.id}`}
                  label="GPA (Optional)"
                  placeholder="e.g. 3.8/4.0"
                  icon={<FaStar />}
                  value={edu.gpa || ""}
                  onChange={(e) =>
                    handleUpdateEducation(idx, "gpa", e.target.value)
                  }
                  hint="Include if it strengthens your application"
                />
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description (Optional)
                  </label>
                  <textarea
                    name={`description-${edu.id}`}
                    placeholder="Notable achievements, activities, or relevant coursework..."
                    value={edu.description || ""}
                    onChange={(e) =>
                      handleUpdateEducation(idx, "description", e.target.value)
                    }
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
                    Include relevant coursework, honors, or extracurricular
                    activities
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {(!cv?.education || cv.education.length === 0) && (
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
};
