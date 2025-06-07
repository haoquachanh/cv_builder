// src/app/builder/page.tsx
"use client";

import { CVLayout } from "@/components/cv/builder";
import { CVProvider } from "@/context/CVContext";

export default function BuilderPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white py-6">
      <CVProvider>
        <CVLayout />
      </CVProvider>
    </main>
  );
}
