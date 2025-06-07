"use client";

import { Button } from "@/components/common/Button";
import { Select } from "@/components/common/Select";
import { useCV } from "@/context/CVContext";
import { TemplateType } from "@/context/CVContext";

export const Toolbar = () => {
  const { saveCv, exportPDF, selectedTemplate, setSelectedTemplate } = useCV();

  const templates = [
    { label: "Modern Template", value: "modern" },
    { label: "Classic Template", value: "classic" },
    { label: "Minimal Template", value: "minimal" },
  ];

  return (
    <div className="flex w-full items-center justify-between border-b border-gray-300 pb-4">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-semibold">CV Builder</h2>
        <Select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value as TemplateType)}
          options={templates}
          className="w-48"
        />
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={saveCv}>
          Save
        </Button>
        <Button variant="primary" onClick={exportPDF}>
          Download PDF
        </Button>
      </div>
    </div>
  );
};
