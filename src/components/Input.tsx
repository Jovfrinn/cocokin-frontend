import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-[11px] font-semibold text-romantic-muted dark:text-romantic-dark-muted font-mono tracking-wide uppercase">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 py-3 rounded-lg border bg-white dark:bg-romantic-dark-card border-romantic-border dark:border-romantic-dark-border focus:outline-none focus:ring-2 focus:ring-romantic-rose/25 dark:focus:ring-romantic-dark-rose/25 focus:border-romantic-rose dark:focus:border-romantic-dark-rose text-romantic-text dark:text-romantic-dark-text transition-all duration-300 font-sans placeholder-romantic-muted/60 dark:placeholder-romantic-dark-muted/50 text-sm ${
            error
              ? "border-red-400 focus:ring-red-400 focus:ring-red-400/20"
              : "hover:border-romantic-rose dark:hover:border-romantic-dark-rose"
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 font-medium animate-pulse mt-0.5 pl-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
