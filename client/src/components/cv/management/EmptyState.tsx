import Link from "next/link";
import { Button } from "@/components/common/Button";

type EmptyStateProps = {
  hasFilters: boolean;
  onClearFilters: () => void;
};

export const EmptyState = ({ hasFilters, onClearFilters }: EmptyStateProps) => {
  return (
    <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-200">
      <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">No CVs Found</h2>
      {hasFilters ? (
        <>
          <p className="text-gray-600 mb-6">
            No CVs match your current filters. Try adjusting your search
            criteria.
          </p>
          <Button
            onClick={onClearFilters}
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            }
          >
            Clear Filters
          </Button>
        </>
      ) : (
        <>
          <p className="text-gray-600 mb-6">
            You haven&apos;t created any CVs yet. Get started with your first CV
            now!
          </p>
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
              Create Your First CV
            </Button>
          </Link>
        </>
      )}
    </div>
  );
};
