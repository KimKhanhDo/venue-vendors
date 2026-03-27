const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-white/70 backdrop-blur-sm">
      <div
        className="border-t-secondary h-12 w-12 animate-spin rounded-full border-4 border-purple-200"
        style={{ animationDuration: '1.5s' }}
      />

      <p className="text-sm font-medium text-purple-400">Loading...</p>
    </div>
  );
};

export default Loading;
