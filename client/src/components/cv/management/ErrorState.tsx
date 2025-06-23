import { Button } from "@/components/common/Button";

type ErrorStateProps = {
  error: string;
  onRetry: () => void;
};

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <div className="bg-white rounded-lg p-8 text-center shadow-sm border border-gray-200">
      <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Error Loading CVs
      </h2>
      <p className="text-gray-600 mb-6">{error}</p>
      <Button
        onClick={onRetry}
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        }
      >
        Try Again
      </Button>
    </div>
  );
};
