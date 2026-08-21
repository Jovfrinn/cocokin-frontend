import { Icon } from "@iconify/react";
import { useDarkMode } from "../hooks/useDarkMode";

export default function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      type="button"
      className="p-2 rounded-xl bg-romantic-rose/10 dark:bg-romantic-dark-rose/10 hover:bg-romantic-rose/20 dark:hover:bg-romantic-dark-rose/20 text-romantic-rose dark:text-romantic-dark-rose transition-all duration-300 focus:outline-none cursor-pointer flex items-center justify-center border border-romantic-rose/20 dark:border-romantic-dark-rose/20"
      aria-label="Toggle dark mode"
    >
      <Icon
        icon={isDark ? "solar:sun-bold-duotone" : "solar:moon-bold-duotone"}
        className="w-5 h-5 transition-transform duration-500 hover:rotate-45"
      />
    </button>
  );
}
