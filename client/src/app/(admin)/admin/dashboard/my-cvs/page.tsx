// src/app/admin/dashboard/my-cvs/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface CV {
  id: string;
  title: string;
}

export default function MyCVsPage() {
  const [cvs, setCvs] = useState<CV[]>([]);

  useEffect(() => {
    // Fetch CVs từ API hoặc mock
    setCvs([
      { id: "1", title: "Frontend Developer CV" },
      { id: "2", title: "Backend Developer CV" },
    ]);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My CVs</h2>
      <Link href="/builder/page" className="btn btn-primary mb-4 inline-block">
        Create New CV
      </Link>
      <ul className="space-y-2">
        {cvs.map((cv) => (
          <li key={cv.id} className="border p-4 rounded-md hover:shadow">
            <Link
              href={`/builder/${cv.id}`}
              className="font-medium text-blue-600"
            >
              {cv.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
