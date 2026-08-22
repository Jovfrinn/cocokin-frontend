import { Icon } from "@iconify/react";

interface RatingSliderProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const RATING_OPTIONS = [
  { val: 1, icon: "solar:heart-broken-bold-duotone", label: "Tidak Cocok" },
  { val: 2, icon: "solar:heart-linear", label: "Biasa Saja" },
  { val: 3, icon: "solar:heart-bold-duotone", label: "Cukup Cocok" },
  { val: 4, icon: "solar:heart-shine-bold-duotone", label: "Cocok" },
  { val: 5, icon: "solar:hearts-bold-duotone", label: "Sangat Cocok" },
];

export default function RatingSlider({
  value,
  onChange,
  disabled = false,
}: RatingSliderProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="grid grid-cols-5 gap-2 sm:gap-3 w-full">
        {RATING_OPTIONS.map((option) => {
          const isSelected = value === option.val;
          return (
            <button
              key={option.val}
              type="button"
              disabled={disabled}
              onClick={() => onChange(option.val)}
              className={`relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-lg border transition-all duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] cursor-pointer active:scale-95 ${
                isSelected
                  ? "bg-romantic-rose/10 border-romantic-rose text-romantic-rose dark:bg-romantic-dark-rose/15 dark:border-romantic-dark-rose dark:text-romantic-dark-rose shadow-[0_2px_0_0_var(--color-romantic-rose)] dark:shadow-[0_2px_0_0_var(--color-romantic-dark-rose)] scale-[1.06] -translate-y-0.5"
                  : "bg-white dark:bg-romantic-dark-card border-romantic-border dark:border-romantic-dark-border hover:border-romantic-clay dark:hover:border-romantic-dark-clay hover:-translate-y-0.5 text-romantic-muted dark:text-romantic-dark-muted"
              }`}
            >
              <span className="absolute top-1.5 left-2 text-[9px] font-mono font-semibold opacity-40">
                {option.val}
              </span>
              <Icon
                icon={option.icon}
                className={`w-7 h-7 sm:w-8 sm:h-8 mb-1 transition-transform duration-300 ease-[cubic-bezier(0.34,1.4,0.64,1)] ${isSelected ? "scale-110" : ""}`}
              />
              <span
                className={`text-[11px] font-semibold text-center leading-tight transition-colors ${
                  isSelected
                    ? "text-romantic-rose dark:text-romantic-dark-rose"
                    : "text-romantic-muted dark:text-romantic-dark-muted"
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
