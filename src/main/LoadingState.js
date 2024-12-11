

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative w-24 h-24">
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-gray-200"></div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-blue-500">
          Loading...
        </div>
      </div>
    </div>
  );
}
