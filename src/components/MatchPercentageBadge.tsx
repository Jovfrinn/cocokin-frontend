interface MatchPercentageBadgeProps {
  score: number; // 0 to 100
  className?: string;
}

export default function MatchPercentageBadge({
  score,
  className = "",
}: MatchPercentageBadgeProps) {
  let badgeColor = "";
  
  if (score < 50) {
    badgeColor =
      "bg-romantic-clay/5 dark:bg-romantic-dark-border/20 text-romantic-muted dark:text-romantic-dark-muted border border-romantic-border dark:border-romantic-dark-border";
  } else if (score < 80) {
    badgeColor =
      "bg-romantic-clay/10 text-romantic-clay border border-romantic-clay/30 dark:text-romantic-dark-clay dark:border-romantic-dark-clay/30";
  } else {
    badgeColor =
      "bg-gradient-to-r from-romantic-rose to-romantic-clay text-white shadow-sm shadow-romantic-rose/10 dark:from-romantic-dark-rose dark:to-romantic-dark-clay";
  }

  return (
    <span
      className={`inline-flex items-center justify-center font-sans font-bold px-3 py-1.5 rounded-full text-xs sm:text-sm leading-none ${badgeColor} ${className}`}
    >
      {score}% Cocok
    </span>
  );
}
