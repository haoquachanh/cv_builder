"use client";

import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {/* Dashboard sidebar navigation could go here */}
      <aside className="w-64 bg-gray-100 p-4 min-h-screen">
        <h3 className="font-bold text-lg mb-4">Dashboard</h3>
        <nav>
          <ul>
            <li className="mb-2">
              <a
                href="/admin/dashboard"
                className="text-blue-600 hover:underline"
              >
                Overview
              </a>
            </li>
            <li className="mb-2">
              <a
                href="/admin/dashboard/cv"
                className="text-blue-600 hover:underline"
              >
                My CVs
              </a>
            </li>
            {/* Add more navigation items as needed */}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
