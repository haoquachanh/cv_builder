"use client";

import { useState, useRef } from "react";
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
  };

  const handleStyleChange = (field: keyof CVStyle, value: string) => {
    updateCV("style", {
      ...(cv?.style || {
        primaryColor: PRIMARY_COLORS[0].value,
        backgroundColor: BACKGROUND_COLORS[0].value,
        backgroundPattern: BACKGROUND_PATTERNS[0].value,
      }),
      [field]: value,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <button
        onClick={() => setIsOpen(!isOpenRef.current)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
      >
        <span>Customize Style</span>
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
          <Select
            label="Primary Color"
            value={cv?.style?.primaryColor || PRIMARY_COLORS[0].value}
            onChange={(e) => handleStyleChange("primaryColor", e.target.value)}
            options={[...PRIMARY_COLORS]}
          />
          <Select
            label="Background Color"
            value={cv?.style?.backgroundColor || BACKGROUND_COLORS[0].value}
            onChange={(e) =>
              handleStyleChange("backgroundColor", e.target.value)
            }
            options={[...BACKGROUND_COLORS]}
          />
          <Select
            label="Background Pattern"
            value={cv?.style?.backgroundPattern || BACKGROUND_PATTERNS[0].value}
            onChange={(e) =>
              handleStyleChange("backgroundPattern", e.target.value)
            }
            options={[...BACKGROUND_PATTERNS]}
          />
        </div>
      )}
    </div>
  );
};
