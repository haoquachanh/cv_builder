import { Button } from "@/components/common/Button";

export type SortOption = "name" | "lastUpdated" | "status";
export type SortDirection = "asc" | "desc";
export type StatusFilter = "all" | "draft" | "completed" | "published";

type SearchAndFilterBarProps = {
  searchQuery: string;
  statusFilter: StatusFilter;
  sortBy: SortOption;
  sortDirection: SortDirection;
  onSearchChange: (query: string) => void;
  onStatusFilterChange: (status: StatusFilter) => void;
  onSortByChange: (sortBy: SortOption) => void;
  onSortDirectionChange: (direction: SortDirection) => void;
  onClearFilters: () => void;
};

export const SearchAndFilterBar = ({
  searchQuery,
  statusFilter,
  sortBy,
  sortDirection,
  onSearchChange,
  onStatusFilterChange,
  onSortByChange,
  onSortDirectionChange,
  onClearFilters,
}: SearchAndFilterBarProps) => {
  const hasActiveFilters =
    searchQuery ||
    statusFilter !== "all" ||
    sortBy !== "lastUpdated" ||
    sortDirection !== "desc";
  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-grow relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search CVs by name..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
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
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <div>
            <select
              value={statusFilter}
              onChange={(e) =>
                onStatusFilterChange(e.target.value as StatusFilter)
              }
              className="w-full sm:w-auto pl-3 pr-10 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              aria-label="Filter by status"
            >
              <option value="all">All Statuses</option>
              <option value="draft">Draft</option>
              <option value="completed">Completed</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <select
              value={sortBy}
              onChange={(e) => onSortByChange(e.target.value as SortOption)}
              className="w-full sm:w-auto pl-3 pr-10 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              aria-label="Sort by"
            >
              <option value="name">Name</option>
              <option value="lastUpdated">Last Updated</option>
              <option value="status">Status</option>
            </select>
          </div>
          <div className="flex items-center">
            <button
              onClick={() =>
                onSortDirectionChange(sortDirection === "asc" ? "desc" : "asc")
              }
              className="p-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label={`Sort ${
                sortDirection === "asc" ? "descending" : "ascending"
              }`}
            >
              {sortDirection === "asc" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
              )}
            </button>
          </div>
          {hasActiveFilters && (
            <div>
              <Button
                variant="outline"
                onClick={onClearFilters}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
