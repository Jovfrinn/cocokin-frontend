export default function LoadingSpinner({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
      <div className="relative w-12 h-12">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-romantic-rose/10 dark:border-romantic-dark-rose/10 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-romantic-rose dark:border-t-romantic-dark-rose rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-[10px] font-bold text-romantic-rose dark:text-romantic-dark-rose font-sans tracking-widest uppercase animate-pulse">
        Memuat Data...
      </p>
    </div>
  );
}
