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
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export const Skills = () => {
  const { cv, updateCV } = useCV();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleAddSkill = () => {
    const newSkill: SkillType = {
      id: generateId("skill"),
      name: "",
      color: "inherit",
      fontStyle: "normal",
      fontWeight: "normal",
      textDecoration: "none",
    };
    updateCV("skills", [...(cv?.skills || []), newSkill]);
    setIsCollapsed(false); // Expand section when adding new skill
  };

  const handleDeleteSkill = (index: number) => {
    const updatedSkills = cv?.skills?.filter((_, idx) => idx !== index);
    updateCV("skills", updatedSkills || []);
  };

  const handleUpdateSkill = (
    index: number,
    field: keyof SkillType,
    value: string
  ) => {
    if (!cv?.skills) return;
    const updatedSkills = [...cv.skills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value,
    };
    updateCV("skills", updatedSkills);
  };

  const addButton = (
    <button
      onClick={handleAddSkill}
      className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
    >
      <FaPlus /> Add new
    </button>
  );

  return (
    <section className="space-y-6">
      <SectionHeader
        title="Skills"
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        actionButton={addButton}
      />

      <div
        className={`space-y-4 transition-all duration-300 ease-in-out ${
          isCollapsed ? "hidden" : ""
        }`}
      >
        {cv?.skills?.map((skill, idx) => (
          <div
            key={skill.id}
            className="p-4 bg-white border border-gray-200 rounded-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
              <div className="lg:col-span-2">
                <Input
                  label="Skill Name"
                  placeholder="e.g. React.js"
                  value={skill.name}
                  onChange={(e) =>
                    handleUpdateSkill(idx, "name", e.target.value)
                  }
                />
              </div>
              <div>
                <Select
                  label="Màu chữ"
                  options={SKILL_COLORS}
                  value={skill.color || "inherit"}
                  onChange={(e) =>
                    handleUpdateSkill(idx, "color", e.target.value)
                  }
                />
              </div>
              <div>
                <Select
                  label="Kiểu chữ"
                  options={FONT_STYLES}
                  value={skill.fontStyle || "normal"}
                  onChange={(e) =>
                    handleUpdateSkill(idx, "fontStyle", e.target.value)
                  }
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Select
                    label="Độ đậm"
                    options={FONT_WEIGHTS}
                    value={skill.fontWeight || "normal"}
                    onChange={(e) =>
                      handleUpdateSkill(idx, "fontWeight", e.target.value)
                    }
                  />
                </div>
                <div className="flex-1">
                  <Select
                    label="Gạch chân"
                    options={TEXT_DECORATIONS}
                    value={skill.textDecoration || "none"}
                    onChange={(e) =>
                      handleUpdateSkill(idx, "textDecoration", e.target.value)
                    }
                  />
                </div>
                <button
                  onClick={() => handleDeleteSkill(idx)}
                  className="self-end text-red-500 hover:text-red-700 transition-colors p-2 mt-6"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            {/* Preview */}
            <div className="mt-4 p-2 border-t border-gray-100">
              <span className="text-sm text-gray-500">Preview: </span>
              <span
                style={{
                  color: skill.color || "inherit",
                  fontStyle: skill.fontStyle || "normal",
                  fontWeight: skill.fontWeight || "normal",
                  textDecoration: skill.textDecoration || "none",
                }}
              >
                {skill.name || "Skill name"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {(!cv?.skills || cv.skills.length === 0) && (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <p className="text-gray-500">
            No skills yet. Click &quot;Add new skill&quot; to get started.
          </p>
        </div>
      )}
    </section>
  );
};
