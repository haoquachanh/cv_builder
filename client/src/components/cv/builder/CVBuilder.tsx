"use client";

import { CV } from "@/types/cv";
import {
  PersonalInfo,
  Education,
  Experience,
  Skills,
  Projects,
} from "../sections";
import { StyleCustomizer } from "./StyleCustomizer";
import { useState } from "react";
import { useCV } from "@/context/CVContext";

interface CVBuilderProps {
  className?: string;
}

type Section =
  | "personalInfo"
  | "education"
  | "experience"
  | "skills"
  | "projects";
type SectionError = Record<Section, string | null>;

export const CVBuilder: React.FC<CVBuilderProps> = ({ className }) => {
  const { cv, updateCV } = useCV();
  const [errors, setErrors] = useState<SectionError>({
    personalInfo: null,
    education: null,
    experience: null,
    skills: null,
    projects: null,
  });

  const handleUpdate = <K extends keyof CV>(key: K, data: CV[K]) => {
    if (!cv) {
      setErrors((prev) => ({
        ...prev,
        [key]: "CV object is not initialized",
      }));
      return;
    }

    try {
      updateCV(key, data);
      // Clear error when update is successful
      setErrors((prev) => ({
        ...prev,
        [key]: null,
      }));
    } catch (error) {
      console.error(`Error updating ${key}:`, error);
      setErrors((prev) => ({
        ...prev,
        [key]:
          error instanceof Error ? error.message : "An unknown error occurred",
      }));
    }
  };

  const renderSection = (
    title: string,
    key: Section,
    Component: React.ComponentType<any>
  ) => (
    <section className="space-y-2">
      <div className="flex justify-between items-center">
        {/* <h2 className="text-xl font-semibold">{title}</h2> */}
        {errors[key] && (
          <span className="text-red-500 text-sm">{errors[key]}</span>
        )}
      </div>
      <Component />
    </section>
  );

  return (
    <div className={`${className} space-y-6 p-4`}>
      <StyleCustomizer />
      {renderSection("Personal Information", "personalInfo", PersonalInfo)}
      {renderSection("Education", "education", Education)}
      {renderSection("Experience", "experience", Experience)}
      {renderSection("Skills", "skills", Skills)}
      {renderSection("Projects", "projects", Projects)}
    </div>
  );
};
