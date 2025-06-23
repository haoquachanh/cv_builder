"use client";

import { Button } from "@/components/common/Button";
import { Select } from "@/components/common/Select";
import { useCV } from "@/context/CVContext";
import { TemplateType } from "@/context/CVContext";

export const Toolbar = () => {
  const {
    saveCv,
    exportPDF,
    selectedTemplate,
    setSelectedTemplate,
    isExporting,
  } = useCV();

  const templates = [
    { label: "Modern Template", value: "modern" },
    { label: "Classic Template", value: "classic" },
    { label: "Minimal Template", value: "minimal" },
    { label: "Compact Template", value: "compact" },
    { label: "Creative Template", value: "creative" },
  ];

  return (
    <div className="flex flex-wrap w-full items-center justify-between border-b border-gray-200 rounded-xl bg-white sticky top-0 z-400 shadow-sm px-4 sm:px-6 md:px-8 h-auto min-h-[72px] gap-y-3">
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 min-w-0">
        <h2 className="text-2xl font-bold tracking-tight text-blue-700 whitespace-nowrap">
          CV Builder
        </h2>
        <Select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value as TemplateType)}
          options={templates}
          className="w-44 sm:w-48"
        />
        {/* Quote chỉ hiển thị trên laptop lớn (>=14") */}
        <span className="hidden 2xl:inline-block ml-4 text-gray-500 italic text-sm/relaxed select-none opacity-30 px-1 truncate max-w-[670px]">
          When even large websites make silly mistakes sometimes, I guess my
          scrappy little site can be forgiven too.
        </span>
      </div>
      <div className="flex gap-2 sm:gap-3 items-center w-full sm:w-auto justify-end">
        {" "}
        <Button
          variant="primary"
          size="md"
          onClick={saveCv}
          disabled={isExporting}
          fullWidth={true}
          className="sm:w-auto"
          iconLeft={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
              />
            </svg>
          }
        >
          Save
        </Button>
        <Button
          variant="secondary"
          size="md"
          onClick={exportPDF}
          disabled={isExporting}
          tooltip={isExporting ? "PDF generation in progress..." : ""}
          fullWidth={true}
          className="sm:w-auto opacity-20"
          iconLeft={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
              />
            </svg>
          }
        >
          {isExporting ? "Generating PDF..." : "Download PDF"}
        </Button>
      </div>
    </div>
  );
};

// Thêm đoạn CSS sau vào global hoặc component để hiện tooltip khi hover:
// .download-tooltip { visibility: hidden; }
// button[disabled]:hover .download-tooltip { visibility: visible; transition: none; }
