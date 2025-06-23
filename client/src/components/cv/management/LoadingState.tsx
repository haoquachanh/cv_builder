import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-500">Loading your CVs...</p>
    </div>
  );
};
