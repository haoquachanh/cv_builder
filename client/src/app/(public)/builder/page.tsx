// src/app/builder/page.tsx
"use client";

import { CVLayout } from "@/components/cv/builder";
import { CVProvider } from "@/context/CVContext";

export default function BuilderPage() {
  return (
    <CVProvider>
      <CVLayout />
    </CVProvider>
  );
}
