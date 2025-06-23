"use client";

// Import the public page content and the public layout components
import PublicPage from "./(public)/page";
import Navbar from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";

// Wrap the public page in the same layout as used in (public)/layout.tsx
export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4">
        <PublicPage />
      </main>
      <Footer />
    </div>
  );
}
