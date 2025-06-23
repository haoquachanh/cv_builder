"use client";

// Layout cho các trang public, bao gồm trang chính "/"
// Layout này sẽ hiển thị Navbar và Footer cho tất cả các trang public
import Navbar from "@/components/layout/NavBar";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4">{children}</main>
      <Footer />
    </div>
  );
}
