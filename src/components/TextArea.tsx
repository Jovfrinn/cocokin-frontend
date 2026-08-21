import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 font-sans tracking-wide uppercase">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`w-full px-4 py-3 rounded-xl border bg-white dark:bg-romantic-dark-card border-romantic-border dark:border-romantic-dark-border focus:outline-none focus:ring-2 focus:ring-romantic-rose/30 dark:focus:ring-romantic-dark-rose/30 focus:border-romantic-rose dark:focus:border-romantic-dark-rose text-romantic-text dark:text-romantic-dark-text transition-all duration-300 font-sans placeholder-gray-400 dark:placeholder-gray-500 text-sm min-h-[100px] resize-y ${
            error
              ? "border-red-400 focus:ring-red-400 focus:ring-red-400/20"
              : "hover:border-romantic-rose dark:hover:border-romantic-dark-rose"
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="text-xs text-red-500 font-medium mt-0.5 pl-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
