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
      <div className="flex flex-col xl:flex-row gap-6 mt-6">
        {/* Left column - Builder */}
        <div className="xl:w-[45%] flex flex-col gap-4">
          {" "}
          <div
            className="flex-1 overflow-y-auto"
            ref={builderRef}
            onScroll={(e) => handleScroll("builder", e.currentTarget.scrollTop)}
          >
            <CVBuilder className="bg-white rounded-lg shadow-md border border-gray-100" />
          </div>
        </div>

        {/* Right column - Preview */}
        <div className="xl:w-[55%] flex flex-col gap-4">
          <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100 flex items-center gap-3 sticky top-[90px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            <span className="text-sm text-gray-700">Preview Mode</span>
            <span className="ml-auto text-xs text-gray-400">
              Click and drag to move around
            </span>
          </div>

          <div
            className="sticky top-[150px] xl:h-[calc(100vh-180px)] bg-gray-100 rounded-lg p-4 border border-gray-200 shadow-inner"
            onScroll={(e) => handleScroll("preview", e.currentTarget.scrollTop)}
          >
            <Preview ref={previewRef} className="h-full overflow-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};
