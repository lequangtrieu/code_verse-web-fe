const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-t-purple-500 border-l-transparent border-r-transparent border-b-transparent animate-spin"></div>
        <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center shadow-md">
          <img
            src="../../logoCodeVerse.png"
            alt="Loading..."
            className="w-14 h-14 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
