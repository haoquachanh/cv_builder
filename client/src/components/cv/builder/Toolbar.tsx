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
        <Button
          variant="primary"
          onClick={saveCv}
          disabled={isExporting}
          className="w-full sm:w-auto"
        >
          Save
        </Button>
        <Button
          variant="secondary"
          onClick={exportPDF}
          disabled={true}
          title="Coming Soon"
          style={{ position: "relative", pointerEvents: "auto" }}
          className="p-1 w-full sm:w-auto"
        >
          {isExporting ? "Generating PDF..." : "Download PDF"}
          <span
            style={{
              visibility: "hidden",
              background: "#222",
              color: "#fff",
              borderRadius: 4,
              padding: "4px 10px",
              position: "absolute",
              left: "50%",
              bottom: "120%",
              transform: "translateX(-50%)",
              fontSize: 12,
              whiteSpace: "nowrap",
              zIndex: 100,
            }}
            className="download-tooltip"
          >
            Comingsoon
          </span>
        </Button>
      </div>
    </div>
  );
};

// Thêm đoạn CSS sau vào global hoặc component để hiện tooltip khi hover:
// .download-tooltip { visibility: hidden; }
// button[disabled]:hover .download-tooltip { visibility: visible; transition: none; }
