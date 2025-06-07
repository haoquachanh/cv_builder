"use client";

import { FaChevronDown, FaChevronRight } from "react-icons/fa";

interface SectionHeaderProps {
  title: string;
  isCollapsed: boolean;
  onToggle: () => void;
  actionButton?: React.ReactNode;
}

export const SectionHeader = ({
  title,
  isCollapsed,
  onToggle,
  actionButton,
}: SectionHeaderProps) => {
  return (
    <div className="flex justify-between items-center border-b border-gray-300 pb-2">
      <div
        className="flex items-center gap-2 cursor-pointer group"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
      >
        <span
          className="p-1 group-hover:bg-gray-100 rounded transition-colors"
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? (
            <FaChevronRight className="text-gray-600" />
          ) : (
            <FaChevronDown className="text-gray-600" />
          )}
        </span>
        <h2 className="text-2xl font-semibold text-gray-800 group-hover:text-gray-600 transition-colors">
          {title}
        </h2>
      </div>
      {actionButton}
    </div>
  );
};
