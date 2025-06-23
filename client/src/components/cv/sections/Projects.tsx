"use client";

import React, { useState, useEffect, useRef } from "react";
import { Project } from "@/types/cv";
import { useCV } from "@/context/CVContext";
import { Input } from "@/components/common/Input";
import { Button } from "@/components/common/Button";
import { FaTrash, FaCalendar, FaLink, FaTags, FaPlus } from "react-icons/fa";
import { SectionHeader } from "../shared/SectionHeader";

// Create a memoized ProjectItem component to avoid unnecessary re-renders
const ProjectItem = React.memo(
  ({
    project,
    index,
    onUpdate,
    onDelete,
    onTechnologiesChange,
    dateErrors,
  }: {
    project: Project;
    index: number;
    onUpdate: (
      index: number,
      field: keyof Project,
      value: string | string[]
    ) => void;
    onDelete: (index: number) => void;
    onTechnologiesChange: (index: number, value: string) => void;
    dateErrors: { [key: string]: string };
  }) => {
    return (
      <div
        key={project.id}
        className="p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 
      dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex justify-between items-start mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Project #{index + 1}
          </h3>
          <Button
            onClick={() => onDelete(index)}
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
              onChange={(e) => onUpdate(index, "name", e.target.value)}
              required
            />
            <div className="relative">
              <Input
                name={`project-url-${project.id}`}
                label="Project URL"
                placeholder="https://project-demo.com"
                value={project.link || ""}
                onChange={(e) => onUpdate(index, "link", e.target.value)}
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
                onChange={(e) => onUpdate(index, "startDate", e.target.value)}
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
                onChange={(e) => onUpdate(index, "endDate", e.target.value)}
                icon={<FaCalendar className="text-gray-400" />}
              />
              {dateErrors[project.id] && (
                <p className="text-red-500 text-xs mt-1">
                  {dateErrors[project.id]}
                </p>
              )}
            </div>
          </div>{" "}
          {/* Project Description section removed */}
          {/* Technologies */}
          <div className="relative">
            {" "}
            <label className="flex text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 items-center gap-2">
              <FaTags className="text-gray-400" />
              Technologies Used
            </label>
            <textarea
              name={`project-tech-${project.id}`}
              placeholder="React, TypeScript, Node.js, AWS..."
              value={(project.technologies || []).join(", ")}
              onChange={(e) => onTechnologiesChange(index, e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-gray-900
              border border-gray-300 dark:border-gray-700 rounded-lg
              shadow-sm outline-none transition-all duration-200
              placeholder:text-gray-400 dark:placeholder:text-gray-500
              hover:border-gray-400 dark:hover:border-gray-600
              focus:border-primary-500 focus:ring-1 focus:ring-primary-500
              dark:focus:border-primary-500 dark:focus:ring-primary-500/20
              min-h-[60px] resize-y"
            />
            <p className="mt-1.5 text-sm text-gray-500">
              List technologies used, separated by commas
            </p>
          </div>
        </div>
      </div>
    );
  }
);

ProjectItem.displayName = "ProjectItem";

// Using React.memo to prevent unnecessary renders
export const Projects = React.memo(() => {
  const { cv, updateCV } = useCV();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [dateErrors, setDateErrors] = useState<{ [key: string]: string }>({});
  // Local state for projects
  const [localProjects, setLocalProjects] = useState<Project[]>([]); // One-time initialization from context
  const didInitialize = useRef(false);

  // Initialize local state from context only once at component mount
  useEffect(() => {
    if (!didInitialize.current && cv?.projects) {
      setLocalProjects(cv.projects);
      didInitialize.current = true;
    }
  }, [cv?.projects]); // Include cv.projects in dependencies to satisfy linter

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
      updateCV("projects", localProjects);
    }, 300); // 300ms debounce - reduced for more responsive preview updates

    // Cleanup
    return () => {
      if (updateTimeout.current) {
        clearTimeout(updateTimeout.current);
      }
    };
  }, [localProjects, updateCV]);

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
  const handleAddProject = () => {
    // Generate a unique ID with timestamp to guarantee uniqueness
    const uniqueId = `proj_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const newProject: Project = {
      id: uniqueId,
      name: "",
      link: "",
      startDate: "",
      endDate: "",
      technologies: [],
    };
    // Update only local state - the useEffect will handle updating CVContext
    setLocalProjects((prev) => [...prev, newProject]);

    setIsCollapsed(false);
  };

  const handleDeleteProject = (index: number) => {
    // Update only local state - the useEffect will handle updating CVContext
    setLocalProjects((prev) => prev.filter((_, idx) => idx !== index));
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
    const project = localProjects[index];

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
    // Update only local state - the useEffect will handle updating CVContext
    setLocalProjects((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
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

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Projects"
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        actionButton={addButton}
      />
      <div
        className={`space-y-6 transition-all duration-300 ease-in-out ${
          isCollapsed ? "hidden" : ""
        }`}
      >
        {localProjects.map((project, idx) => (
          <ProjectItem
            key={project.id}
            project={project}
            index={idx}
            onUpdate={handleUpdateProject}
            onDelete={handleDeleteProject}
            onTechnologiesChange={handleTechnologiesChange}
            dateErrors={dateErrors}
          />
        ))}

        {localProjects.length === 0 && (
          <div className="text-center py-8 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700">
            <p className="text-gray-500 dark:text-gray-400">
              No projects added yet. Click &quot;Add Project&quot; to get
              started.
            </p>
          </div>
        )}
      </div>{" "}
    </section>
  );
});

Projects.displayName = "Projects";
