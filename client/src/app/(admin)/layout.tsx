"use client";

import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, isLoading } = useAuth();

  // Client-side redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      redirect("/login");
    }
  }, [isLoading, isAuthenticated]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Admin layout wrapper - no Navbar here */}
      <main className="flex-grow">{children}</main>
    </div>
  );
}
