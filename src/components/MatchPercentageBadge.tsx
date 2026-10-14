interface MatchPercentageBadgeProps {
  score: number; // 0 to 100
  className?: string;
}

export default function MatchPercentageBadge({
  score,
  className = "",
}: MatchPercentageBadgeProps) {
  let tone: string;

  if (score < 50) {
    tone =
      "border-romantic-border text-romantic-muted dark:border-romantic-dark-border dark:text-romantic-dark-muted";
  } else if (score < 80) {
    tone =
      "border-romantic-clay/50 text-romantic-clay dark:border-romantic-dark-clay/50 dark:text-romantic-dark-clay";
  } else {
    tone =
      "border-romantic-rose text-romantic-rose bg-romantic-rose/[0.06] dark:border-romantic-dark-rose dark:text-romantic-dark-rose dark:bg-romantic-dark-rose/[0.08]";
  }

  return (
    <span
      className={`inline-flex items-baseline gap-0.5 font-mono font-semibold px-2.5 py-1 rounded-md border text-xs leading-none ${tone} ${className}`}
    >
      <span className="opacity-50 text-[0.85em]">{"⟨"}</span>
      {score}%
      <span className="opacity-50 text-[0.85em]">{"⟩"}</span>
    </span>
  );
}
