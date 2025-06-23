"use client";

import React from "react";
import { AuthProvider } from "@/context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      {/* No NavBar, no Footer - only content */}
      <main className="flex-1">{children}</main>
    </AuthProvider>
  );
}
