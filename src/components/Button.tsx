import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans font-medium rounded-2xl transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary:
      "bg-romantic-rose hover:bg-romantic-rose-hover text-white dark:bg-romantic-dark-rose dark:hover:bg-romantic-dark-rose-hover dark:text-romantic-dark-bg shadow-sm border border-transparent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-romantic-rose",
    secondary:
      "bg-romantic-clay/10 hover:bg-romantic-clay/20 text-romantic-rose dark:bg-romantic-dark-clay/10 dark:hover:bg-romantic-dark-clay/20 dark:text-romantic-dark-rose border border-transparent",
    outline:
      "bg-transparent hover:bg-romantic-rose/5 border border-romantic-rose/30 text-romantic-rose dark:hover:bg-romantic-dark-rose/5 dark:border-romantic-dark-rose/30 dark:text-romantic-dark-rose",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4 text-current"
            viewBox="0 0 24 24"
            fill="none"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}
