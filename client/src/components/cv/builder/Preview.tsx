// src/components/cv/builder/Preview.tsx
"use client";

import { useRef, useState, MouseEvent, forwardRef, useMemo } from "react";
import { useCV } from "@/context/CVContext";
import { getTemplateComponent } from "../templates";

interface PreviewProps {
  className?: string;
}

export const Preview = forwardRef<HTMLDivElement, PreviewProps>(
  ({ className }, ref) => {
    const { cv, selectedTemplate } = useCV();
    const zoom = 0.9;
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);
    // Using key prop approach to force re-renders when cv changes
    const forceUpdateKey = useMemo(
      () =>
        JSON.stringify({
          personalInfo: cv?.personalInfo,
          education: cv?.education?.length,
          experience: cv?.experience?.length,
          skills: cv?.skills?.length,
          projects: cv?.projects?.length,
        }),
      [cv]
    );

    const handleMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
      setStartY(e.pageY - (containerRef.current?.offsetTop || 0));
      setScrollLeft(containerRef.current?.scrollLeft || 0);
      setScrollTop(containerRef.current?.scrollTop || 0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - (containerRef.current?.offsetLeft || 0);
      const y = e.pageY - (containerRef.current?.offsetTop || 0);
      const walkX = (x - startX) * 1;
      const walkY = (y - startY) * 1;

      if (containerRef.current) {
        containerRef.current.scrollLeft = scrollLeft - walkX;
        containerRef.current.scrollTop = scrollTop - walkY;
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    // Memoize the template component to prevent unnecessary re-renders
    const TemplateComponent = useMemo(
      () => getTemplateComponent(selectedTemplate),
      [selectedTemplate]
    );

    // Memoize the CV data to use in the template
    const cvData = useMemo(
      () =>
        cv || {
          personalInfo: {
            fullName: "",
            email: "",
            phone: "",
            location: "",
          },
          education: [],
          experience: [],
          skills: [],
          projects: [],
        },
      [cv]
    );

    return (
      <div
        ref={containerRef}
        className={`${className} relative overflow-auto cursor-move`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          ref={ref}
          data-cv-preview
          className="inline-block min-w-full cv-document origin-top-center"
          style={{
            transform: `scale(${zoom})`,
          }}
        >
          {/* A4 size paper with exact dimensions for accurate PDF export */}{" "}
          <div className="w-[210mm] max-w-[210mm] min-w-[210mm] h-[297mm] min-h-[297mm] max-h-[297mm] overflow-hidden print:shadow-none relative cv-export-container">
            <TemplateComponent key={forceUpdateKey} data={cvData} />
          </div>
        </div>
      </div>
    );
  }
);

Preview.displayName = "Preview";
