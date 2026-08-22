interface AvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Avatar({ name, size = "md", className = "" }: AvatarProps) {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm font-semibold",
    lg: "w-16 h-16 text-lg font-bold",
  };

  return (
    <div
      className={`rounded-full bg-romantic-text dark:bg-romantic-dark-text text-romantic-bg dark:text-romantic-dark-bg ring-2 ring-romantic-clay/40 dark:ring-romantic-dark-clay/40 flex items-center justify-center font-sans ${sizes[size]} select-none ${className}`}
    >
      {initials || "?"}
    </div>
  );
}
