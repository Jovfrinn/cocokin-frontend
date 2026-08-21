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
      className={`p-6 rounded-3xl bg-white dark:bg-romantic-dark-card border border-romantic-border dark:border-romantic-dark-border shadow-[0_8px_30px_rgba(214,140,150,0.06)] dark:shadow-none transition-all duration-300 ${
        hoverable
          ? "hover:shadow-[0_12px_40px_rgba(214,140,150,0.1)] dark:hover:border-romantic-dark-rose hover:-translate-y-0.5"
          : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
