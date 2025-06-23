"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { useCVManagement } from "@/hooks/useCVManagement";
import {
  SearchAndFilterBar,
  CVList,
  LoadingState,
  ErrorState,
  CVModals,
} from "@/components/cv/management";

export default function MyCVsPage() {
  const router = useRouter();
  const authContext = useContext(AuthContext);

  // Use the custom hook for CV management functionality
  const {
    cvs,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortDirection,
    setSortDirection,
    statusFilter,
    setStatusFilter,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    isRenameModalOpen,
    setIsRenameModalOpen,
    selectedCVName,
    isExporting,
    handleDeleteCV,
    confirmDeleteCV,
    handleRenameCV,
    confirmRenameCV,
    handleDuplicateCV,
    handleExportPDF,
    handleClearFilters,
    hasActiveFilters,
    fetchCVs,
  } = useCVManagement();

  // Check if user is authenticated
  if (!authContext?.isAuthenticated && !isLoading && !authContext?.isLoading) {
    router.push("/login");
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My CVs</h1>
              <p className="mt-1 text-sm text-gray-600">
                Manage all your CVs in one place
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mb-6">
          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState error={error} onRetry={fetchCVs} />
          ) : (
            <>
              {/* Search and Filter Bar */}
              <SearchAndFilterBar
                searchQuery={searchQuery}
                statusFilter={statusFilter}
                sortBy={sortBy}
                sortDirection={sortDirection}
                onSearchChange={setSearchQuery}
                onStatusFilterChange={setStatusFilter}
                onSortByChange={setSortBy}
                onSortDirectionChange={setSortDirection}
                onClearFilters={handleClearFilters}
              />

              {/* CV List */}
              <CVList
                cvs={cvs}
                hasFilters={Boolean(hasActiveFilters)}
                isExporting={isExporting}
                onClearFilters={handleClearFilters}
                onRename={handleRenameCV}
                onDuplicate={handleDuplicateCV}
                onDelete={handleDeleteCV}
                onExport={handleExportPDF}
              />
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <CVModals
        isDeleteModalOpen={isDeleteModalOpen}
        isRenameModalOpen={isRenameModalOpen}
        selectedCVName={selectedCVName}
        onCloseDeleteModal={() => setIsDeleteModalOpen(false)}
        onCloseRenameModal={() => setIsRenameModalOpen(false)}
        onConfirmDelete={confirmDeleteCV}
        onConfirmRename={confirmRenameCV}
      />
    </main>
  );
}
