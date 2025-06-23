"use client";

import React from "react";
import { FaFileAlt, FaDownload, FaEye, FaStar, FaUsers } from "react-icons/fa";
import Link from "next/link";
import { IconType } from "react-icons";
import { useAuth } from "@/context/AuthContext";

const StatCard = ({
  icon: Icon,
  title,
  value,
  description,
  colorClass,
}: {
  icon: IconType;
  title: string;
  value: string | number;
  description: string;
  colorClass: string;
}) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      <div className={`p-3 rounded-lg ${colorClass}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const RecentActivity = () => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
    <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
    <div className="space-y-4">
      {[
        {
          action: "Created new CV",
          template: "Modern Template",
          time: "2 hours ago",
        },
        {
          action: "Updated CV",
          template: "Professional Template",
          time: "1 day ago",
        },
        {
          action: "Downloaded CV",
          template: "Classic Template",
          time: "3 days ago",
        },
      ].map((activity, index) => (
        <div
          key={index}
          className="flex items-center justify-between py-3 border-b last:border-0"
        >
          <div>
            <p className="font-medium text-gray-900">{activity.action}</p>
            <p className="text-sm text-gray-500">{activity.template}</p>
          </div>
          <span className="text-sm text-gray-500">{activity.time}</span>
        </div>
      ))}
    </div>
  </div>
);

const PopularTemplates = () => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
    <h2 className="text-lg font-semibold mb-4">Popular Templates</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        { name: "Modern Professional", downloads: "2.3k", rating: 4.8 },
        { name: "Creative Designer", downloads: "1.8k", rating: 4.7 },
        { name: "Compact Professional", downloads: "1.4k", rating: 4.6 },
        { name: "Clean Minimal", downloads: "1.5k", rating: 4.6 },
      ].map((template, index) => (
        <div
          key={index}
          className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors"
        >
          <h3 className="font-medium text-gray-900">{template.name}</h3>
          <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
            <span className="flex items-center">
              <FaDownload className="w-4 h-4 mr-1" />
              {template.downloads}
            </span>
            <span className="flex items-center">
              <FaStar className="w-4 h-4 mr-1 text-yellow-400" />
              {template.rating}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const QuickActions = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
    {[
      {
        title: "Create New CV",
        description: "Start from scratch",
        href: "/builder",
        icon: FaFileAlt,
        color: "bg-blue-600 hover:bg-blue-700",
      },
      {
        title: "Browse Templates",
        description: "Find the perfect template",
        href: "/admin/dashboard/templates",
        icon: FaDownload,
        color: "bg-purple-600 hover:bg-purple-700",
      },
      {
        title: "View My CVs",
        description: "Manage your CVs",
        href: "/admin/dashboard/my-cvs",
        icon: FaEye,
        color: "bg-green-600 hover:bg-green-700",
      },
      {
        title: "Manage Users",
        description: "Add or edit users",
        href: "/admin/dashboard/users",
        icon: FaUsers,
        color: "bg-teal-600 hover:bg-teal-700",
      },
      {
        title: "Update Profile",
        description: "Edit your information",
        href: "/admin/dashboard/profile",
        icon: FaStar,
        color: "bg-orange-600 hover:bg-orange-700",
      },
    ].map((action, index) => (
      <Link
        key={index}
        href={action.href}
        className={`${action.color} text-white rounded-xl p-6 transition-transform hover:scale-105`}
      >
        <action.icon className="w-8 h-8 mb-3" />
        <h3 className="font-semibold text-lg">{action.title}</h3>
        <p className="text-sm opacity-90">{action.description}</p>
      </Link>
    ))}
  </div>
);

export default function AdminDashboard() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      <QuickActions />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          icon={FaFileAlt}
          title="Total CVs"
          value={12}
          description="Created this month"
          colorClass="bg-blue-600"
        />
        <StatCard
          icon={FaDownload}
          title="Downloads"
          value={48}
          description="Last 30 days"
          colorClass="bg-green-600"
        />
        <StatCard
          icon={FaEye}
          title="Views"
          value={284}
          description="This week"
          colorClass="bg-purple-600"
        />
        <StatCard
          icon={FaStar}
          title="Templates Used"
          value={5}
          description="Most used: Modern"
          colorClass="bg-orange-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity />
        <PopularTemplates />
      </div>
    </div>
  );
}
