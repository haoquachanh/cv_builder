"use client";

import { useState, useRef, useEffect } from "react";
import { Select } from "@/components/common/Select";
import { useCV } from "@/context/CVContext";
import {
  PRIMARY_COLORS,
  BACKGROUND_COLORS,
  BACKGROUND_PATTERNS,
} from "@/lib/contants";
import { CVStyle } from "@/types/cv";

export const StyleCustomizer = () => {
  const { cv, updateCV } = useCV();
  const isOpenRef = useRef(false);
  const [, forceUpdate] = useState({});

  const setIsOpen = (open: boolean) => {
    isOpenRef.current = open;
    forceUpdate({});
  }; // We need a local state to avoid rendering errors
  const [localStyle, setLocalStyle] = useState<CVStyle>(
    cv?.style || {
      primaryColor: PRIMARY_COLORS[0].value,
      backgroundColor: BACKGROUND_COLORS[0].value,
      backgroundPattern: BACKGROUND_PATTERNS[0].value,
    }
  );
  // One-time initialization from context
  const didInitialize = useRef(false);
  // Initialize local state from context only once at component mount
  useEffect(() => {
    if (!didInitialize.current && cv?.style) {
      setLocalStyle(cv.style);
      didInitialize.current = true;
    }
  }, [cv?.style]); // Include cv.style in dependencies to satisfy linter

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
      updateCV("style", localStyle);
    }, 800); // 800ms debounce - increased to reduce flickering

    // Cleanup
    return () => {
      if (updateTimeout.current) {
        clearTimeout(updateTimeout.current);
      }
    };
  }, [localStyle, updateCV]);

  const handleStyleChange = (field: keyof CVStyle, value: string) => {
    // Update only local state - the useEffect will handle updating CVContext
    setLocalStyle((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
      <button
        onClick={() => setIsOpen(!isOpenRef.current)}
        className="flex items-center justify-between w-full px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-md hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
            />
          </svg>
          <span>Customize Style</span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${
            isOpenRef.current ? "transform rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpenRef.current && (
        <div className="mt-4 space-y-4">
          <div className="border-l-4 border-blue-500 pl-3 py-1 mb-3">
            <h3 className="text-sm font-semibold text-gray-700">
              Style Options
            </h3>
          </div>{" "}
          <Select
            label="Primary Color"
            value={localStyle.primaryColor}
            onChange={(e) => handleStyleChange("primaryColor", e.target.value)}
            options={[...PRIMARY_COLORS]}
          />
          <Select
            label="Background Color"
            value={localStyle.backgroundColor}
            onChange={(e) =>
              handleStyleChange("backgroundColor", e.target.value)
            }
            options={[...BACKGROUND_COLORS]}
          />
          <div className="border-l-4 border-blue-500 pl-3 py-1 my-3">
            <h3 className="text-sm font-semibold text-gray-700">
              Patterns & Textures
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Add subtle visual elements to your CV
            </p>
          </div>
          <Select
            label="Background Pattern"
            value={localStyle.backgroundPattern}
            onChange={(e) =>
              handleStyleChange("backgroundPattern", e.target.value)
            }
            options={[...BACKGROUND_PATTERNS]}
          />
          <div className="bg-gray-50 rounded-md p-3 mt-2">
            <p className="text-xs text-gray-500">
              Select from various patterns to add visual interest while
              maintaining professionalism.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
