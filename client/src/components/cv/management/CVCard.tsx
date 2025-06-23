import Link from "next/link";
import { CV } from "@/types/cv";
import { Button } from "@/components/common/Button";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

type CVCardProps = {
  cv: CV & {
    id: string;
    name: string;
    lastUpdated: string;
    status: "draft" | "completed" | "published";
  };
  onRename: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onExport: (id: string) => void;
  isExporting: string | null;
};

export const CVCard = ({
  cv,
  onRename,
  onDuplicate,
  onDelete,
  onExport,
  isExporting,
}: CVCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
      {/* Status Badge */}
      <div className="px-5 py-3 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            cv.status === "draft"
              ? "bg-yellow-100 text-yellow-800"
              : cv.status === "completed"
              ? "bg-green-100 text-green-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {cv.status.charAt(0).toUpperCase() + cv.status.slice(1)}
        </span>
        <span className="text-xs text-gray-500">
          Updated {new Date(cv.lastUpdated).toLocaleDateString()}
        </span>
      </div>

      {/* CV Preview */}
      <div className="p-6 border-b border-gray-100 relative">
        <div className="flex gap-5">
          {/* CV Thumbnail */}
          <div className="w-24 h-32 bg-white rounded-md overflow-hidden flex-shrink-0 shadow-sm border border-gray-200 relative">
            <div
              className="h-full w-full flex items-center justify-center"
              style={{
                backgroundColor: cv.style?.backgroundColor || "#ffffff",
                borderTop: `4px solid ${cv.style?.primaryColor || "#3b82f6"}`,
              }}
            >
              {/* Small preview of content */}
              <div className="w-full h-full p-1.5 flex flex-col">
                <div
                  className="w-full h-3 rounded-sm mb-2 opacity-70"
                  style={{
                    backgroundColor: cv.style?.primaryColor || "#3b82f6",
                  }}
                ></div>
                <div className="w-2/3 h-1.5 bg-gray-300 rounded-sm mb-1.5"></div>
                <div className="w-1/2 h-1.5 bg-gray-300 rounded-sm mb-3"></div>
                <div className="w-full h-0.5 bg-gray-200 rounded mb-2"></div>
                <div className="w-full h-0.5 bg-gray-200 rounded mb-1.5"></div>
                <div className="w-3/4 h-0.5 bg-gray-200 rounded mb-1.5"></div>
                <div className="w-full h-0.5 bg-gray-200 rounded mb-1.5"></div>
                <div className="w-2/3 h-0.5 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>

          {/* CV Details */}
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-gray-800 mb-1.5 line-clamp-1">
              {cv.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-1">
              {cv.personalInfo?.title || "No title specified"}
            </p>

            {/* Personal Info Summary */}
            {cv.personalInfo && (
              <div className="flex flex-wrap items-center gap-3 mb-3 text-xs text-gray-500">
                {cv.personalInfo.location && (
                  <span className="flex items-center">
                    <svg
                      className="w-3 h-3 mr-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {cv.personalInfo.location}
                  </span>
                )}
                {cv.personalInfo.email && (
                  <span className="hidden sm:flex items-center">
                    <svg
                      className="w-3 h-3 mr-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 6l-10 7L2 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {cv.personalInfo.email}
                  </span>
                )}
                {cv.personalInfo.phone && (
                  <span className="hidden md:flex items-center">
                    <svg
                      className="w-3 h-3 mr-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {cv.personalInfo.phone}
                  </span>
                )}
              </div>
            )}

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {cv.skills && cv.skills.length > 0 ? (
                cv.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700 border border-gray-200 transition-colors"
                    style={{
                      backgroundColor: `${
                        cv.style?.primaryColor || "#3b82f6"
                      }15`,
                      borderColor: `${cv.style?.primaryColor || "#3b82f6"}30`,
                      color: cv.style?.primaryColor || "#3b82f6",
                    }}
                  >
                    {skill.name}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-500">No skills added</span>
              )}
              {cv.skills && cv.skills.length > 3 && (
                <span className="text-xs text-gray-500 px-1.5">
                  +{cv.skills.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Sections summary */}
        <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-500 border-t border-gray-100 pt-4">
          <div className="flex items-center">
            <svg
              className="w-3.5 h-3.5 mr-1.5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{cv.experience?.length || 0} Experience</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-3.5 h-3.5 mr-1.5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2v11z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{cv.education?.length || 0} Education</span>
          </div>
          <div className="flex items-center">
            <svg
              className="w-3.5 h-3.5 mr-1.5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>{cv.projects?.length || 0} Projects</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-5 bg-gray-50 grid grid-cols-2 gap-3">
        <Link href={`/builder?id=${cv.id}`} className="col-span-2">
          <Button
            variant="primary"
            fullWidth
            iconLeft={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            }
          >
            Edit
          </Button>
        </Link>
        <Button
          variant="outline"
          iconLeft={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          }
          onClick={() => onRename(cv.id)}
        >
          Rename
        </Button>
        <Button
          variant="outline"
          iconLeft={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
              />
            </svg>
          }
          onClick={() => onDuplicate(cv.id)}
        >
          Duplicate
        </Button>
        <Button
          variant="outline"
          iconLeft={
            isExporting === cv.id ? (
              <LoadingSpinner size="sm" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            )
          }
          disabled={isExporting === cv.id}
          onClick={() => onExport(cv.id)}
        >
          Export PDF
        </Button>
        <Button
          variant="danger"
          iconLeft={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          }
          onClick={() => onDelete(cv.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};
