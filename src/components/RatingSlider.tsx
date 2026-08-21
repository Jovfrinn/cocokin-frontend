interface RatingSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const RATING_OPTIONS = [
  { val: 1, emoji: "💔", label: "Tidak Cocok" },
  { val: 2, emoji: "🤍", label: "Biasa Saja" },
  { val: 3, emoji: "💛", label: "Cukup Cocok" },
  { val: 4, emoji: "💖", label: "Cocok Banget" },
  { val: 5, emoji: "❤️", label: "Belahan Jiwa" },
];

export default function RatingSlider({
  value,
  onChange,
  disabled = false,
}: RatingSliderProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="grid grid-cols-5 gap-2 sm:gap-4 w-full">
        {RATING_OPTIONS.map((option) => {
          const isSelected = value === option.val;
          return (
            <button
              key={option.val}
              type="button"
              disabled={disabled}
              onClick={() => onChange(option.val)}
              className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl border transition-all duration-300 cursor-pointer ${
                isSelected
                  ? "bg-romantic-rose/15 border-romantic-rose text-romantic-text dark:bg-romantic-dark-rose/20 dark:border-romantic-dark-rose dark:text-romantic-dark-text scale-105 shadow-[0_8px_20px_rgba(214,140,150,0.1)]"
                  : "bg-white dark:bg-romantic-dark-card border-romantic-border dark:border-romantic-dark-border hover:border-romantic-rose dark:hover:border-romantic-dark-rose text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              }`}
            >
              <span className="text-2xl sm:text-3xl mb-1 transition-transform duration-300 hover:scale-120 select-none">
                {option.emoji}
              </span>
              <span
                className={`text-[9px] sm:text-xs font-semibold text-center leading-tight transition-colors ${
                  isSelected
                    ? "text-romantic-rose dark:text-romantic-dark-rose font-bold"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
