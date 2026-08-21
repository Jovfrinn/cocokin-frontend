import { Icon } from "@iconify/react";
import Button from "./Button";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export default function EmptyState({
  icon = "solar:heart-broken-bold-duotone",
  title,
  description,
  actionText,
  onAction,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-10 text-center bg-white/50 dark:bg-romantic-dark-card/50 border border-dashed border-romantic-border dark:border-romantic-dark-border rounded-[32px] ${className}`}
    >
      <div className="p-4 rounded-full bg-romantic-rose/5 dark:bg-romantic-dark-rose/5 text-romantic-rose dark:text-romantic-dark-rose mb-4">
        <Icon icon={icon} className="w-12 h-12" />
      </div>
      <h3 className="text-lg font-bold font-sans text-gray-800 dark:text-gray-200 mb-2">
        {title}
      </h3>
      <p className="text-sm font-sans text-gray-500 dark:text-gray-400 max-w-xs mb-6">
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="secondary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
