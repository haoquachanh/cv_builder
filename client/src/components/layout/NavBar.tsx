// src/components/layout/NavBar.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useContext } from "react";
import { usePathname } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

// Add CSS for animations
const navbarAnimationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-10px); }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out forwards;
  }
  
  .animate-fadeOut {
    animation: fadeOut 0.2s ease-out forwards;
  }
`;

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const context = useContext(AuthContext);

  // Handle initial mounting and route changes
  useEffect(() => {
    setMounted(true);
    setIsOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try {
      if (context && context.logout) {
        await context.logout();
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isActivePath = (path: string) => {
    return pathname === path;
  };
  if (!mounted || !context) {
    // Return a placeholder with the same structure but without interactive elements
    return (
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-blue-100 rounded-md animate-pulse" />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                CV Builder
              </span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <div className="h-8 w-24 bg-gray-100 rounded animate-pulse" />
              <div className="h-8 w-24 bg-gray-100 rounded animate-pulse" />
              <div className="h-8 w-24 bg-gray-100 rounded animate-pulse" />
            </nav>
            <div className="h-8 w-32 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      </header>
    );
  }
  const { user } = context;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 w-full">
      <style jsx>{navbarAnimationStyles}</style>
      <div className="container mx-auto px-4">
        <div className="flex flex-row items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center min-w-[160px]">
            <div className="flex items-center gap-2">
              <Image
                src="/file.svg"
                width={32}
                height={32}
                alt="CV Builder Logo"
                className="h-8 w-auto"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                CV Builder
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Center content regardless of login state */}
          <nav className="hidden md:flex flex-1 items-center justify-center space-x-8">
            <Link
              href="/templates"
              className={`text-sm font-medium transition-colors ${
                isActivePath("/templates") || pathname?.startsWith("/templates")
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Templates
            </Link>

            {user && (
              <Link
                href="/builder"
                className={`text-sm font-medium transition-colors ${
                  isActivePath("/builder") || pathname?.startsWith("/builder")
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Create CV
              </Link>
            )}
          </nav>

          {/* User Menu (Desktop) or Sign In/Sign Up buttons */}
          {user ? (
            <div className="hidden md:flex items-center min-w-[220px] justify-end space-x-4">
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-blue-600 group"
                  aria-expanded={userMenuOpen}
                  aria-controls="user-menu"
                >
                  <div className="relative h-8 w-8 rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-blue-400 transition-colors">
                    {" "}
                    {/* <Image
                      src={user.avatarUrl || "/avatars/default-avatar.png"}
                      alt={user.fullName || "User avatar"}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/avatars/default-avatar.png";
                      }}
                    /> */}
                  </div>{" "}
                  <div className="flex flex-col items-start">
                    <span className="font-medium">
                      {user.fullName || "User"}
                    </span>
                    <span className="text-xs text-gray-500 truncate max-w-[150px]">
                      {user.email}
                    </span>
                  </div>
                  <svg
                    className={`w-4 h-4 transition-transform ${
                      userMenuOpen ? "transform rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div
                    id="user-menu"
                    className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100 transition-all duration-200 ease-in-out"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        Signed in as
                      </p>
                      <p className="text-sm text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <svg
                        className="h-4 w-4 mr-2 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Profile
                    </Link>

                    <Link
                      href="/my-cvs"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <svg
                        className="h-4 w-4 mr-2 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                      My CVs
                    </Link>

                    {user.role === "admin" && (
                      <Link
                        href="/admin/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <svg
                          className="h-4 w-4 mr-2 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        Admin Dashboard
                      </Link>
                    )}

                    <div className="border-t border-gray-100 my-1"></div>

                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <svg
                        className="h-4 w-4 mr-2 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center min-w-[220px] justify-end space-x-4">
              <Link
                href="/login"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="text-sm font-medium px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-1.5 rounded-md transition-colors ${
                isOpen
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-500 hover:text-gray-600 hover:bg-gray-50"
              }`}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">
                {isOpen ? "Close main menu" : "Open main menu"}
              </span>
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-fadeIn"
        >
          <div className="container mx-auto px-4 pt-3 pb-4 space-y-2">
            {/* Common Links */}
            <Link
              href="/"
              className={`flex items-center px-3 py-2.5 rounded-md text-base font-medium ${
                isActivePath("/")
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Home
            </Link>

            <Link
              href="/templates"
              className={`flex items-center px-3 py-2.5 rounded-md text-base font-medium ${
                isActivePath("/templates") || pathname?.startsWith("/templates")
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <svg
                className="h-5 w-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              </svg>
              Templates
            </Link>

            {user ? (
              <>
                <Link
                  href="/builder"
                  className={`flex items-center px-3 py-2.5 rounded-md text-base font-medium ${
                    isActivePath("/builder") || pathname?.startsWith("/builder")
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Create CV
                </Link>

                <Link
                  href="/my-cvs"
                  className={`flex items-center px-3 py-2.5 rounded-md text-base font-medium ${
                    isActivePath("/my-cvs") || pathname?.startsWith("/my-cvs")
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  My CVs
                </Link>

                <Link
                  href="/profile"
                  className={`flex items-center px-3 py-2.5 rounded-md text-base font-medium ${
                    isActivePath("/profile")
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Profile
                </Link>

                {user.role === "admin" && (
                  <Link
                    href="/admin/dashboard"
                    className={`flex items-center px-3 py-2.5 rounded-md text-base font-medium ${
                      pathname?.startsWith("/admin")
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Admin Dashboard
                  </Link>
                )}

                <div className="border-t border-gray-100 my-2 pt-2">
                  <div className="px-3 py-2 mb-2">
                    <p className="text-xs text-gray-500">Signed in as:</p>
                    <div className="flex items-center mt-1">
                      <div className="h-6 w-6 rounded-full overflow-hidden mr-2">
                        <Image
                          src={user.avatarUrl || "/avatars/default-avatar.png"}
                          alt={user.fullName || "User"}
                          width={24}
                          height={24}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-800 truncate max-w-[200px]">
                        {user.fullName || user.email}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2.5 rounded-md text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-3 mt-4 pt-3 border-t border-gray-100">
                <Link
                  href="/login"
                  className="flex items-center justify-center px-3 py-2.5 rounded-md text-base font-medium text-blue-600 border border-blue-600 hover:bg-blue-50"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="flex items-center justify-center px-3 py-2.5 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 shadow-sm"
                >
                  <svg
                    className="h-5 w-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
export default Navbar;
