"use client";

import { useRef } from "react";
import { CVBuilder } from "./CVBuilder";
import { Preview } from "./Preview";
import { Toolbar } from "./Toolbar";
import { useCV } from "@/context/CVContext";

export const CVLayout: React.FC = () => {
  const { cv, previewRef } = useCV();
  const builderRef = useRef<HTMLDivElement>(null);

  const handleScroll = (source: "builder" | "preview", scrollTop: number) => {
    if (source === "builder" && previewRef.current) {
      previewRef.current.scrollTop = scrollTop;
    } else if (source === "preview" && builderRef.current) {
      builderRef.current.scrollTop = scrollTop;
    }
  };

  return (
    <div className="container mx-auto px-4">
      <Toolbar />
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div
          className="lg:w-1/2"
          ref={builderRef}
          onScroll={(e) => handleScroll("builder", e.currentTarget.scrollTop)}
        >
          <CVBuilder className="bg-white rounded-lg shadow-sm" />
        </div>
        <div
          className="lg:w-1/2"
          onScroll={(e) => handleScroll("preview", e.currentTarget.scrollTop)}
        >
          <Preview ref={previewRef} className="h-full" />
        </div>
      </div>
    </div>
  );
};
