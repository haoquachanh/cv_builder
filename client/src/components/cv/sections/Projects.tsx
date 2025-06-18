"use client";

import React, { useState } from "react";
import { Project } from "@/types/cv";
import { useCV } from "@/context/CVContext";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import {
  FaTrash,
  FaCalendar,
  FaLink,
  FaTags,
  FaInfoCircle,
  FaPlus,
} from "react-icons/fa";

export const Projects = () => {
  const { cv, updateCV } = useCV();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [dateErrors, setDateErrors] = useState<{ [key: string]: string }>({});

  const handleAddProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: "",
      description: "",
      link: "",
      startDate: "",
      endDate: "",
      technologies: [],
    };
    updateCV("projects", [...(cv?.projects || []), newProject]);
    setIsCollapsed(false);
  };

  const handleDeleteProject = (index: number) => {
    const updatedProjects = cv?.projects?.filter((_, idx) => idx !== index);
    updateCV("projects", updatedProjects || []);
  };

  const validateDates = (
    projectId: string,
    startDate: string | undefined,
    endDate: string | undefined
  ) => {
    if (!startDate || !endDate) return true;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) return true;

    if (start > end) {
      setDateErrors((prev) => ({
        ...prev,
        [projectId]: "End date must be after start date",
      }));
      return false;
    }

    setDateErrors((prev) => {
      const next = { ...prev };
      delete next[projectId];
      return next;
    });
    return true;
  };

  const handleUpdateProject = (
    index: number,
    field: keyof Project,
    value: string | string[]
  ) => {
    if (!cv?.projects) return;

    const project = cv.projects[index];

    if (
      (field === "startDate" || field === "endDate") &&
      typeof value === "string"
    ) {
      const updatedStartDate =
        field === "startDate" ? value : project.startDate;
      const updatedEndDate = field === "endDate" ? value : project.endDate;

      if (!validateDates(project.id, updatedStartDate, updatedEndDate)) {
        return;
      }
    }

    const updatedProjects = [...cv.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    updateCV("projects", updatedProjects);
  };

  const handleTechnologiesChange = (index: number, value: string) => {
    const technologies = value
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item !== "");
    handleUpdateProject(index, "technologies", technologies);
  };

  const addButton = (
    <Button
      onClick={handleAddProject}
      variant="primary"
      className="flex items-center gap-2 px-4 py-2 text-sm"
    >
      <FaPlus /> Add Project
    </Button>
  );

  if (isCollapsed && (!cv?.projects || cv.projects.length === 0)) {
    return addButton;
  }

  return (
    <div className="space-y-6">
      {!isCollapsed &&
        (cv?.projects || []).map((project, idx) => (
          <div
            key={project.id}
            className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 
            dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Project #{idx + 1}
              </h3>
              <Button
                onClick={() => handleDeleteProject(idx)}
                variant="outline"
                className="text-red-500 hover:text-red-700 transition-colors p-2 border-none rounded-full"
                title="Delete project"
              >
                <FaTrash />
              </Button>
            </div>

            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  name={`project-name-${project.id}`}
                  label="Project Name"
                  placeholder="e.g. E-commerce Website"
                  value={project.name}
                  onChange={(e) =>
                    handleUpdateProject(idx, "name", e.target.value)
                  }
                  required
                />
                <div className="relative">
                  <Input
                    name={`project-url-${project.id}`}
                    label="Project URL"
                    placeholder="https://project-demo.com"
                    value={project.link || ""}
                    onChange={(e) =>
                      handleUpdateProject(idx, "link", e.target.value)
                    }
                    icon={<FaLink className="text-gray-400" />}
                  />
                </div>
              </div>

              {/* Timeline */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <Input
                    name={`project-start-${project.id}`}
                    label="Start Date"
                    type="date"
                    value={project.startDate || ""}
                    onChange={(e) =>
                      handleUpdateProject(idx, "startDate", e.target.value)
                    }
                    icon={<FaCalendar className="text-gray-400" />}
                    required
                  />
                </div>
                <div className="relative">
                  <Input
                    name={`project-end-${project.id}`}
                    label="End Date"
                    type="date"
                    value={project.endDate || ""}
                    onChange={(e) =>
                      handleUpdateProject(idx, "endDate", e.target.value)
                    }
                    icon={<FaCalendar className="text-gray-400" />}
                    error={dateErrors[project.id]}
                  />
                  {!project.endDate && (
                    <p className="mt-1 text-sm text-gray-500">
                      Leave empty for ongoing projects
                    </p>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <textarea
                  placeholder="Describe your project, its goals, and your role..."
                  value={project.description || ""}
                  onChange={(e) =>
                    handleUpdateProject(idx, "description", e.target.value)
                  }
                  className="w-full px-3 py-2 bg-white dark:bg-gray-900
                  border border-gray-300 dark:border-gray-700 rounded-lg
                  shadow-sm outline-none transition-all duration-200
                  placeholder:text-gray-400 dark:placeholder:text-gray-500
                  hover:border-gray-400 dark:hover:border-gray-600
                  focus:border-primary-500 focus:ring-1 focus:ring-primary-500
                  dark:focus:border-primary-500 dark:focus:ring-primary-500/20
                  min-h-[100px] resize-y
                  disabled:opacity-60 disabled:cursor-not-allowed
                  aria-invalid:border-red-500 dark:aria-invalid:border-red-500"
                  required
                  aria-required="true"
                />
              </div>

              {/* Technologies */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Technologies Used
                  <span className="text-gray-500 ml-1 text-xs font-normal">
                    (recommended)
                  </span>
                </label>
                <div className="relative group">
                  <textarea
                    placeholder="React, TypeScript, Node.js, AWS..."
                    value={(project.technologies || []).join(", ")}
                    onChange={(e) =>
                      handleTechnologiesChange(idx, e.target.value)
                    }
                    className="w-full pl-9 pr-3 py-2 bg-white dark:bg-gray-900
                    border border-gray-300 dark:border-gray-700 rounded-lg
                    shadow-sm outline-none transition-all duration-200
                    placeholder:text-gray-400 dark:placeholder:text-gray-500
                    hover:border-gray-400 dark:hover:border-gray-600 
                    focus:border-primary-500 focus:ring-1 focus:ring-primary-500
                    dark:focus:border-primary-500 dark:focus:ring-primary-500/20
                    min-h-[60px] resize-y"
                    aria-describedby={`tech-tooltip-${project.id}`}
                  />
                  <FaTags className="absolute left-3 top-2.5 text-gray-400" />
                  <div
                    id={`tech-tooltip-${project.id}`}
                    role="tooltip"
                    className="invisible group-hover:visible absolute z-10 px-3 py-2 text-sm
                    text-white bg-gray-900 rounded-lg opacity-0 group-hover:opacity-100
                    transition-opacity duration-300 mt-2 w-64 left-0"
                  >
                    List the technologies, frameworks, or tools used in this
                    project. Separate multiple items with commas.
                  </div>
                </div>
                <p className="mt-1 text-sm text-gray-500 flex items-center gap-1">
                  <FaInfoCircle className="text-gray-400" />
                  Separate technologies with commas
                </p>
              </div>
            </div>
          </div>
        ))}

      <div className="flex justify-center">{addButton}</div>
    </div>
  );
};
