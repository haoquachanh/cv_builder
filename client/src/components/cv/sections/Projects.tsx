"use client";

import { useState } from "react";
import { Input } from "@/components/common/Input";
import { useCV } from "@/context/CVContext";
import { SectionHeader } from "@/components/cv/shared/SectionHeader";
import { Project as ProjectType } from "@/types/cv";
import { generateId } from "@/lib/utils/id";
import { FaPlus, FaTrash } from "react-icons/fa";

export const Projects = () => {
  const { cv, updateCV } = useCV();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleAddProject = () => {
    const newProject: ProjectType = {
      id: generateId("proj"),
      name: "",
      description: "",
      link: "",
      technologies: [],
    };
    updateCV("projects", [...(cv?.projects || []), newProject]);
    setIsCollapsed(false); // Expand section when adding new project
  };

  const handleDeleteProject = (index: number) => {
    const updatedProjects = cv?.projects?.filter((_, idx) => idx !== index);
    updateCV("projects", updatedProjects || []);
  };

  const handleUpdateProject = (
    index: number,
    field: keyof ProjectType,
    value: string
  ) => {
    if (!cv?.projects) return;
    const updatedProjects = [...cv.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value,
    };
    updateCV("projects", updatedProjects);
  };

  const addButton = (
    <button
      onClick={handleAddProject}
      className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
    >
      <FaPlus /> Add new
    </button>
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
        className={`space-y-4 transition-all duration-300 ease-in-out ${
          isCollapsed ? "hidden" : ""
        }`}
      >
        {cv?.projects?.map((project, idx) => (
          <div
            key={project.id}
            className="space-y-4 p-4 bg-white border border-gray-200 rounded-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 space-y-4">
                <Input
                  label="Project Name"
                  placeholder="Enter project name"
                  value={project.name}
                  onChange={(e) =>
                    handleUpdateProject(idx, "name", e.target.value)
                  }
                />
                <Input
                  label="Description"
                  placeholder="Brief project description"
                  value={project.description || ""}
                  onChange={(e) =>
                    handleUpdateProject(idx, "description", e.target.value)
                  }
                />
                <Input
                  label="Link"
                  placeholder="Project URL"
                  value={project.link || ""}
                  onChange={(e) =>
                    handleUpdateProject(idx, "link", e.target.value)
                  }
                />
              </div>
              <button
                onClick={() => handleDeleteProject(idx)}
                className="text-red-500 hover:text-red-700 transition-colors p-2"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}

        {(!cv?.projects || cv.projects.length === 0) && (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500">
              {" "}
              No projects yet. Click &quot;Add new project&quot; to get started.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
