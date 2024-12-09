const LoadingSpinner = () => {
  return (
    <div className="flex min-h-[calc(100vh-10rem)] items-center justify-center bg-black">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-yellow-200 border-t-transparent" />
        <p className="text-yellow-200">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
