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
    "inline-flex items-center justify-center font-sans font-semibold tracking-tight rounded-lg transition-all duration-200 active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary:
      "bg-romantic-rose hover:bg-romantic-rose-hover text-white dark:bg-romantic-dark-rose dark:hover:bg-romantic-dark-rose-hover dark:text-romantic-dark-bg shadow-[0_2px_0_0_rgba(0,0,0,0.12)] active:shadow-none border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-romantic-bg dark:focus-visible:ring-offset-romantic-dark-bg focus-visible:ring-romantic-rose",
    secondary:
      "bg-romantic-text/[0.05] hover:bg-romantic-text/[0.09] text-romantic-text dark:bg-white/[0.06] dark:hover:bg-white/[0.1] dark:text-romantic-dark-text border border-romantic-border dark:border-romantic-dark-border",
    outline:
      "bg-transparent hover:bg-romantic-rose/[0.06] border border-romantic-rose/40 text-romantic-rose dark:hover:bg-romantic-dark-rose/10 dark:border-romantic-dark-rose/40 dark:text-romantic-dark-rose",
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
