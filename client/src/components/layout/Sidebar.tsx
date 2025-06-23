// src/components/layout/Sidebar.tsx
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFileAlt,
  FaCog,
  FaChartBar,
  FaHistory,
  FaDownload,
  FaUser,
  FaUsers,
} from "react-icons/fa";

export const Sidebar = () => {
  const pathname = usePathname();

  const isActivePath = (path: string) => pathname === path;
  const menuItems = [
    { href: "/admin/dashboard", icon: FaChartBar, label: "Overview" },
    { href: "/admin/dashboard/my-cvs", icon: FaFileAlt, label: "My CVs" },
    { href: "/admin/dashboard/history", icon: FaHistory, label: "History" },
    {
      href: "/admin/dashboard/templates",
      icon: FaDownload,
      label: "Templates",
    },
    { href: "/admin/dashboard/users", icon: FaUsers, label: "Users" },
    { href: "/admin/dashboard/profile", icon: FaUser, label: "Profile" },
    { href: "/admin/dashboard/settings", icon: FaCog, label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen shadow-sm">
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <span className="text-xl font-bold text-blue-600">CV Builder</span>
      </div>
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActivePath(item.href)
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
