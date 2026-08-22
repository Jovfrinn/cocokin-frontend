import type { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export default function Card({
  children,
  hoverable = false,
  className = "",
  ...props
}: CardProps) {
  return (
    <div
      className={`p-6 rounded-xl bg-white dark:bg-romantic-dark-card border border-romantic-border dark:border-romantic-dark-border shadow-[0_1px_2px_rgba(33,27,44,0.04)] dark:shadow-none transition-all duration-300 ${
        hoverable
          ? "hover:border-romantic-rose/50 dark:hover:border-romantic-dark-rose/50 hover:shadow-[0_4px_16px_rgba(33,27,44,0.06)] hover:-translate-y-0.5"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
