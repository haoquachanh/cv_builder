"use client";

import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8">Admin Area</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => router.push("/admin/dashboard")}
          className="bg-white shadow-md rounded-lg p-6 cursor-pointer hover:shadow-lg transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
          <p className="text-gray-600">View and manage your CVs</p>
        </div>
        {/* Add more admin options as needed */}
      </div>
    </div>
  );
}
