import { useState, useEffect } from "react";
import { CVService, CVListItem } from "@/lib/services/CVService";
import { downloadPDF } from "@/lib/downloadPDF";
import {
  StatusFilter,
  SortOption,
  SortDirection,
} from "@/components/cv/management";

export function useCVManagement() {
  // State for CVs and loading
  const [cvs, setCvs] = useState<CVListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("lastUpdated");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  // State for modals and selected CV
  const [selectedCV, setSelectedCV] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [selectedCVName, setSelectedCVName] = useState("");

  // State for export progress
  const [isExporting, setIsExporting] = useState<string | null>(null);

  // Fetch CVs on component mount
  useEffect(() => {
    fetchCVs();
  }, []);

  // Fetch CVs function
  const fetchCVs = async () => {
    try {
      setIsLoading(true);
      const data = await CVService.fetchCVs();
      setCvs(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch CVs:", err);
      setError("Failed to load your CVs. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Filter and sort CVs
  const filteredAndSortedCVs = cvs
    .filter((cv) => {
      // Apply search filter
      const matchesSearch =
        cv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (cv.personalInfo?.fullName || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      // Apply status filter
      const matchesStatus =
        statusFilter === "all" || cv.status === statusFilter;

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      // Sort by selected criteria
      let comparison = 0;

      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === "lastUpdated") {
        comparison =
          new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
      } else if (sortBy === "status") {
        comparison = a.status.localeCompare(b.status);
      }

      // Apply sort direction
      return sortDirection === "asc" ? comparison : -comparison;
    });

  // Delete CV handler
  const handleDeleteCV = (cvId: string) => {
    setSelectedCV(cvId);
    setIsDeleteModalOpen(true);
  };

  // Confirm delete CV
  const confirmDeleteCV = async () => {
    if (!selectedCV) return;

    try {
      await CVService.deleteCV(selectedCV);
      // Update local state
      setCvs((prevCVs) => prevCVs.filter((cv) => cv.id !== selectedCV));
    } catch (err) {
      console.error("Failed to delete CV:", err);
      setError("Failed to delete the CV. Please try again.");
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedCV(null);
    }
  };

  // Rename CV handler
  const handleRenameCV = (cvId: string) => {
    const cv = cvs.find((c) => c.id === cvId);
    if (cv) {
      setSelectedCV(cvId);
      setSelectedCVName(cv.name);
      setIsRenameModalOpen(true);
    }
  };

  // Confirm rename CV
  const confirmRenameCV = async (newName: string) => {
    if (!selectedCV || !newName.trim()) return;

    try {
      await CVService.renameCV(selectedCV, newName.trim());
      // Update local state
      setCvs((prevCVs) =>
        prevCVs.map((cv) =>
          cv.id === selectedCV ? { ...cv, name: newName.trim() } : cv
        )
      );
    } catch (err) {
      console.error("Failed to rename CV:", err);
      setError("Failed to rename the CV. Please try again.");
    } finally {
      setIsRenameModalOpen(false);
      setSelectedCV(null);
    }
  };

  // Duplicate CV handler
  const handleDuplicateCV = async (cvId: string) => {
    try {
      const duplicatedCV = await CVService.duplicateCV(cvId);
      // Add the new CV to state
      setCvs((prevCVs) => [...prevCVs, duplicatedCV]);
    } catch (err) {
      console.error("Failed to duplicate CV:", err);
      setError("Failed to duplicate the CV. Please try again.");
    }
  };

  // Export PDF handler
  const handleExportPDF = async (cvId: string) => {
    try {
      setIsExporting(cvId);
      await downloadPDF(cvId);
    } catch (err) {
      console.error("Failed to export PDF:", err);
      setError("Failed to export the CV as PDF. Please try again.");
    } finally {
      setIsExporting(null);
    }
  };

  // Clear filters handler
  const handleClearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setSortBy("lastUpdated");
    setSortDirection("desc");
  };
  // Check if filters are active
  const hasActiveFilters = (): boolean => {
    return (
      Boolean(searchQuery) ||
      statusFilter !== "all" ||
      sortBy !== "lastUpdated" ||
      sortDirection !== "desc"
    );
  };

  return {
    cvs: filteredAndSortedCVs,
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
    selectedCV,
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
    hasActiveFilters: hasActiveFilters(),
    fetchCVs,
  };
}
