// src/components/cv/sections/Skills.tsx
"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { useCV } from "@/context/CVContext";
import { SectionHeader } from "@/components/cv/shared/SectionHeader";
import {
  SKILL_COLORS,
  FONT_STYLES,
  FONT_WEIGHTS,
  TEXT_DECORATIONS,
} from "@/lib/contants";
import { Skill as SkillType } from "@/types/cv";
import { FaPlus, FaTrash } from "react-icons/fa";

import { Button } from "@/components/common/Button";

// Create a memoized SkillItem component to avoid unnecessary re-renders
const SkillItem = React.memo(
  ({
    skill,
    category,
    onUpdate,
    onDelete,
  }: {
    skill: SkillType;
    category: string;
    onUpdate: (skillId: string, field: keyof SkillType, value: string) => void;
    onDelete: (skillId: string) => void;
  }) => {
    return (
      <div className="p-4 bg-white border border-gray-200 rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Left column - Content */}
          <div className="lg:col-span-3">
            <Input
              name={`skill-name-${skill.id}`}
              label="Skill Content"
              placeholder="e.g. JavaScript, TypeScript"
              value={skill.name}
              onChange={(e) => onUpdate(skill.id, "name", e.target.value)}
            />
          </div>

          {/* Middle column - Style Options */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Select
                label="Color"
                options={[...SKILL_COLORS]}
                value={skill.color || "inherit"}
                onChange={(e) => onUpdate(skill.id, "color", e.target.value)}
              />
            </div>
            <div>
              <Select
                label="Font Style"
                options={[...FONT_STYLES]}
                value={skill.fontStyle || "normal"}
                onChange={(e) =>
                  onUpdate(skill.id, "fontStyle", e.target.value)
                }
              />
            </div>
            <div>
              <Select
                label="Font Weight"
                options={[...FONT_WEIGHTS]}
                value={skill.fontWeight || "normal"}
                onChange={(e) =>
                  onUpdate(skill.id, "fontWeight", e.target.value)
                }
              />
            </div>
            <div>
              <Select
                label="Decoration"
                options={[...TEXT_DECORATIONS]}
                value={skill.textDecoration || "none"}
                onChange={(e) =>
                  onUpdate(skill.id, "textDecoration", e.target.value)
                }
              />
            </div>
          </div>

          {/* Right column - Delete button */}
          <div className="lg:col-span-1 flex lg:justify-end">
            <Button
              onClick={() => onDelete(skill.id)}
              variant="outline"
              className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50"
              title="Delete skill"
            >
              <FaTrash />
            </Button>
          </div>
        </div>

        {/* Preview section */}
        <div className="mt-4 p-3 border border-gray-100 rounded-lg bg-gray-50">
          <span className="text-sm text-gray-500 mr-2">Preview:</span>
          <span className="font-medium mr-1">{category}:</span>
          <span
            style={{
              color: skill.color || "inherit",
              fontStyle: skill.fontStyle || "normal",
              fontWeight: skill.fontWeight || "normal",
              textDecoration: skill.textDecoration || "none",
            }}
          >
            {skill.name || "Skill content"}
          </span>
        </div>
      </div>
    );
  }
);

SkillItem.displayName = "SkillItem";

// Memoized category component
const SkillCategory = React.memo(
  ({
    category,
    skills,
    onAddSkill,
    onUpdateSkill,
    onDeleteSkill,
  }: {
    category: string;
    skills: SkillType[];
    onAddSkill: (category: string) => void;
    onUpdateSkill: (
      skillId: string,
      field: keyof SkillType,
      value: string
    ) => void;
    onDeleteSkill: (skillId: string) => void;
  }) => {
    return (
      <div key={category} className="space-y-4">
        {/* Category header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="text-lg font-semibold text-gray-700">{category}</h3>
          <Button
            onClick={() => onAddSkill(category)}
            variant="outline"
            className="text-sm flex items-center gap-1"
          >
            <FaPlus size={12} /> Add Skill
          </Button>
        </div>

        {/* Skills in this category */}
        <div className="pl-4 space-y-4 border-l-2 border-gray-100">
          {skills.map((skill) => (
            <SkillItem
              key={skill.id}
              skill={skill}
              category={category}
              onUpdate={onUpdateSkill}
              onDelete={onDeleteSkill}
            />
          ))}
        </div>
      </div>
    );
  }
);

SkillCategory.displayName = "SkillCategory";

// Using React.memo to prevent unnecessary renders
export const Skills = React.memo(() => {
  const { cv, updateCV } = useCV();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  // Local state for skills
  const [localSkills, setLocalSkills] = useState<SkillType[]>([]);
  const didInitialize = useRef(false);

  // Initialize local state from context only once at component mount
  useEffect(() => {
    if (!didInitialize.current && cv?.skills) {
      setLocalSkills(cv.skills);
      didInitialize.current = true;
    }
  }, [cv?.skills]); // Include cv.skills in dependencies to satisfy linter

  // Group skills by category and filter out empty categories
  const skillsByCategory = useMemo(() => {
    if (!localSkills?.length) return new Map<string, SkillType[]>();

    const grouped = new Map<string, SkillType[]>();
    localSkills.forEach((skill) => {
      const category = skill.category?.trim();
      if (!category) return;
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      const categorySkills = grouped.get(category);
      if (categorySkills) {
        categorySkills.push(skill);
      }
    });
    return grouped;
  }, [localSkills]);

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
      updateCV("skills", localSkills);
    }, 300); // 300ms debounce - reduced for more responsive preview updates

    // Cleanup
    return () => {
      if (updateTimeout.current) {
        clearTimeout(updateTimeout.current);
      }
    };
  }, [localSkills, updateCV]);

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
  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    // Generate a unique ID with timestamp to guarantee uniqueness
    const uniqueId = `skill_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const newSkill: SkillType = {
      id: uniqueId,
      name: "",
      color: "inherit",
      fontStyle: "normal",
      fontWeight: "normal",
      textDecoration: "none",
      category: newCategory.trim(),
    };

    // Update only local state - the useEffect will handle updating CVContext
    setLocalSkills((prev) => [...prev, newSkill]);

    setNewCategory(""); // Reset input
    setIsCollapsed(false);
  };
  const handleAddSkill = (category: string) => {
    // Generate a unique ID with timestamp to guarantee uniqueness
    const uniqueId = `skill_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
    const newSkill: SkillType = {
      id: uniqueId,
      name: "",
      color: "inherit",
      fontStyle: "normal",
      fontWeight: "normal",
      textDecoration: "none",
      category,
    };

    // Update only local state - the useEffect will handle updating CVContext
    setLocalSkills((prev) => [...prev, newSkill]);
  };

  const handleDeleteSkill = (skillId: string) => {
    // Update only local state - the useEffect will handle updating CVContext
    setLocalSkills((prev) => prev.filter((s) => s.id !== skillId));
  };

  const handleUpdateSkill = (
    skillId: string,
    field: keyof SkillType,
    value: string
  ) => {
    const skillIndex = localSkills.findIndex((s) => s.id === skillId);
    if (skillIndex === -1) return;

    // Update only local state - the useEffect will handle updating CVContext
    setLocalSkills((prev) => {
      const updated = [...prev];
      updated[skillIndex] = {
        ...updated[skillIndex],
        [field]: value,
      };
      return updated;
    });
  };

  // Add new category section
  const addCategorySection = (
    <div className="flex gap-4 items-end mb-6">
      <div className="flex-1">
        <Input
          name="new-category"
          label="Add New Category"
          placeholder="e.g. Programming Languages"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddCategory();
            }
          }}
        />
      </div>
      <Button
        onClick={handleAddCategory}
        disabled={!newCategory.trim()}
        variant="primary"
        className="h-10 flex items-center gap-2"
      >
        <FaPlus size={12} /> Add Category
      </Button>
    </div>
  );

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Skills"
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
      />

      <div
        className={`space-y-6 transition-all duration-300 ease-in-out ${
          isCollapsed ? "hidden" : ""
        }`}
      >
        {/* Add new category section */}
        {addCategorySection}

        {/* Categories and their skills */}
        <div className="space-y-8">
          {Array.from(skillsByCategory).map(([category, skills]) => (
            <SkillCategory
              key={category}
              category={category}
              skills={skills}
              onAddSkill={handleAddSkill}
              onUpdateSkill={handleUpdateSkill}
              onDeleteSkill={handleDeleteSkill}
            />
          ))}
        </div>

        {localSkills.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <p className="text-gray-500">
              No skills yet. Add a category to get started.
            </p>
            <p className="text-gray-400 mt-2">
              Tip: Start with categories like &quot;Programming Languages&quot;,
              &quot;Framework / Lib&quot;, etc.
            </p>
          </div>
        )}
      </div>
    </section>
  );
});

Skills.displayName = "Skills";

export default Skills;
