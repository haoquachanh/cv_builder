// src/components/cv/sections/Skills.tsx
"use client";

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
import { useState, useMemo } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { generateId } from "@/lib/utils/id";
import { Button } from "@/components/common/Button";

export const Skills = () => {
  const { cv, updateCV } = useCV();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // Group skills by category and filter out empty categories
  const skillsByCategory = useMemo(() => {
    if (!cv?.skills) return new Map<string, SkillType[]>();

    const grouped = new Map<string, SkillType[]>();
    cv.skills.forEach((skill) => {
      const category = skill.category?.trim();
      if (!category) return;
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category)?.push(skill);
    });
    return grouped;
  }, [cv?.skills]);

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    const newSkill: SkillType = {
      id: generateId("skill"),
      name: "",
      color: "inherit",
      fontStyle: "normal",
      fontWeight: "normal",
      textDecoration: "none",
      category: newCategory.trim(),
    };
    updateCV("skills", [...(cv?.skills || []), newSkill]);
    setNewCategory(""); // Reset input
    setIsCollapsed(false);
  };

  const handleAddSkill = (category: string) => {
    const newSkill: SkillType = {
      id: generateId("skill"),
      name: "",
      color: "inherit",
      fontStyle: "normal",
      fontWeight: "normal",
      textDecoration: "none",
      category,
    };
    updateCV("skills", [...(cv?.skills || []), newSkill]);
  };

  const handleDeleteSkill = (skillId: string) => {
    const updatedSkills = cv?.skills?.filter((s) => s.id !== skillId);
    updateCV("skills", updatedSkills || []);
  };

  const handleUpdateSkill = (
    skillId: string,
    field: keyof SkillType,
    value: string
  ) => {
    if (!cv?.skills) return;
    const skillIndex = cv.skills.findIndex((s) => s.id === skillId);
    if (skillIndex === -1) return;

    const updatedSkills = [...cv.skills];
    updatedSkills[skillIndex] = {
      ...updatedSkills[skillIndex],
      [field]: value,
    };
    updateCV("skills", updatedSkills);
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
          {Array.from(skillsByCategory.entries()).map(([category, skills]) => (
            <div key={category} className="space-y-4">
              {/* Category header */}
              <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-lg font-semibold text-gray-700">
                  {category}
                </h3>
                <Button
                  onClick={() => handleAddSkill(category)}
                  variant="outline"
                  className="text-sm flex items-center gap-1"
                >
                  <FaPlus size={12} /> Add Skill
                </Button>
              </div>

              {/* Skills in this category */}
              <div className="pl-4 space-y-4 border-l-2 border-gray-100">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="p-4 bg-white border border-gray-200 rounded-lg"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
                      {/* Left column - Content */}
                      <div className="lg:col-span-3">
                        <Input
                          name={`skill-name-${skill.id}`}
                          label="Skill Content"
                          placeholder="e.g. JavaScript, TypeScript"
                          value={skill.name}
                          onChange={(e) =>
                            handleUpdateSkill(skill.id, "name", e.target.value)
                          }
                        />
                      </div>

                      {/* Middle column - Style Options */}
                      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <Select
                            label="Color"
                            options={[...SKILL_COLORS]}
                            value={skill.color || "inherit"}
                            onChange={(e) =>
                              handleUpdateSkill(
                                skill.id,
                                "color",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <Select
                            label="Font Style"
                            options={[...FONT_STYLES]}
                            value={skill.fontStyle || "normal"}
                            onChange={(e) =>
                              handleUpdateSkill(
                                skill.id,
                                "fontStyle",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <Select
                            label="Font Weight"
                            options={[...FONT_WEIGHTS]}
                            value={skill.fontWeight || "normal"}
                            onChange={(e) =>
                              handleUpdateSkill(
                                skill.id,
                                "fontWeight",
                                e.target.value
                              )
                            }
                          />
                        </div>
                        <div>
                          <Select
                            label="Decoration"
                            options={[...TEXT_DECORATIONS]}
                            value={skill.textDecoration || "none"}
                            onChange={(e) =>
                              handleUpdateSkill(
                                skill.id,
                                "textDecoration",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </div>

                      {/* Right column - Delete button */}
                      <div className="lg:col-span-1 flex lg:justify-end">
                        <Button
                          onClick={() => handleDeleteSkill(skill.id)}
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
                      <span className="text-sm text-gray-500 mr-2">
                        Preview:
                      </span>
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
                ))}
              </div>
            </div>
          ))}
        </div>

        {(!cv?.skills || cv.skills.length === 0) && (
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
};

export default Skills;
