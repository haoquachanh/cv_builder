import Link from "next/link";
import { CV } from "@/types/cv";
import { Button } from "@/components/common/Button";
import { CVCard } from "./CVCard";
import { EmptyState } from "./EmptyState";

type CVListProps = {
  cvs: (CV & {
    id: string;
    name: string;
    lastUpdated: string;
    status: "draft" | "completed" | "published";
  })[];
  hasFilters: boolean;
  isExporting: string | null;
  onClearFilters: () => void;
  onRename: (id: string) => void;
  onDuplicate: (id: string) => void;
  onDelete: (id: string) => void;
  onExport: (id: string) => void;
};

export const CVList = ({
  cvs,
  hasFilters,
  isExporting,
  onClearFilters,
  onRename,
  onDuplicate,
  onDelete,
  onExport,
}: CVListProps) => {
  return (
    <>
      {/* CV List Header */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {cvs.length} {cvs.length === 1 ? "CV" : "CVs"}{" "}
            {hasFilters ? "found" : "total"}
          </h2>
          {hasFilters && (
            <p className="text-sm text-gray-500 mt-1">
              Filtered results based on your search criteria
            </p>
          )}
        </div>
        <Link href="/builder">
          <Button
            variant="primary"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            }
          >
            Create New CV
          </Button>
        </Link>
      </div>

      {/* Grid of CV Cards */}
      {cvs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {cvs.map((cv) => (
            <CVCard
              key={cv.id}
              cv={cv}
              onRename={onRename}
              onDuplicate={onDuplicate}
              onDelete={onDelete}
              onExport={onExport}
              isExporting={isExporting}
            />
          ))}
        </div>
      ) : (
        <EmptyState hasFilters={hasFilters} onClearFilters={onClearFilters} />
      )}
    </>
  );
};
