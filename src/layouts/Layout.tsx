import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import DarkModeToggle from "../components/DarkModeToggle";
import Avatar from "../components/Avatar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Read current user from localStorage
  const userJson = localStorage.getItem("currentUser");
  const user = userJson ? JSON.parse(userJson) : null;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("access_token");
    navigate("/");
  };

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-romantic-bg/75 dark:bg-romantic-dark-bg/75 border-b border-romantic-border dark:border-romantic-dark-border">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to={user ? "/dashboard" : "/"}
            className="flex items-center gap-1.5 focus:outline-none"
          >
            <Icon
              icon="solar:heart-bold"
              className="text-romantic-rose dark:text-romantic-dark-rose w-6 h-6 animate-pulse"
            />
            <span className="font-serif font-bold text-xl tracking-tight bg-gradient-to-r from-romantic-rose to-romantic-clay dark:from-romantic-dark-rose dark:to-romantic-dark-clay bg-clip-text text-transparent">
              Cocokin.ai
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            {!isAuthPage && (
              <nav className="hidden sm:flex items-center gap-6">
                {!user ? (
                  <>
                    <a
                      href="#cara-kerja"
                      className="text-xs font-bold uppercase tracking-wider text-romantic-muted hover:text-romantic-rose dark:text-romantic-dark-muted dark:hover:text-romantic-dark-rose transition-colors"
                    >
                      Cara Kerja
                    </a>
                  </>
                ) : (
                  <>
                    <Link
                      to="/dashboard"
                      className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                        location.pathname === "/dashboard"
                          ? "text-romantic-rose dark:text-romantic-dark-rose"
                          : "text-romantic-muted hover:text-romantic-rose dark:text-romantic-dark-muted dark:hover:text-romantic-dark-rose"
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/quiz/create"
                      className={`text-xs font-bold uppercase tracking-wider transition-colors ${
                        location.pathname === "/quiz/create"
                          ? "text-romantic-rose dark:text-romantic-dark-rose"
                          : "text-romantic-muted hover:text-romantic-rose dark:text-romantic-dark-muted dark:hover:text-romantic-dark-rose"
                      }`}
                    >
                      Buat Ruang Uji
                    </Link>
                  </>
                )}
              </nav>
            )}

            <div className="flex items-center gap-3">
              <DarkModeToggle />

              {!isAuthPage && (
                <>
                  {!user ? (
                    <div className="flex items-center gap-2">
                      <Link
                        to="/login"
                        className="text-xs font-bold uppercase tracking-wider text-romantic-rose hover:text-romantic-rose-hover dark:text-romantic-dark-rose dark:hover:text-romantic-dark-rose-hover px-3 py-2 transition-colors"
                      >
                        Masuk
                      </Link>
                      <Link
                        to="/login?tab=register"
                        className="text-xs font-bold uppercase tracking-wider bg-romantic-rose hover:bg-romantic-rose-hover text-white dark:bg-romantic-dark-rose dark:hover:bg-romantic-dark-rose-hover dark:text-romantic-dark-bg px-4 py-2 rounded-xl shadow-sm transition-all"
                      >
                        Daftar
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 border-l border-romantic-border dark:border-romantic-dark-border pl-3">
                      <div className="hidden md:flex flex-col text-right">
                        <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                          {user.full_name || user.name}
                        </span>
                        <span className="text-[9px] text-gray-400 dark:text-gray-500 font-mono">
                          @{user.username}
                        </span>
                      </div>
                      <Avatar
                        name={user.full_name || user.name || "User"}
                        size="sm"
                      />
                      <button
                        onClick={handleLogout}
                        title="Keluar"
                        className="p-1 text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                      >
                        <Icon
                          icon="solar:logout-bold-duotone"
                          className="w-5 h-5"
                        />
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-romantic-border dark:border-romantic-dark-border py-6 bg-white/20 dark:bg-romantic-dark-card/25 mt-12">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <Icon
              icon="solar:heart-linear"
              className="text-romantic-rose/50 dark:text-romantic-dark-rose/50 w-5 h-5"
            />
            <span className="font-serif font-bold text-sm text-gray-500 dark:text-gray-400">
              Cocokin.ai
            </span>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            &copy; {new Date().getFullYear()} Cocokin.ai. Dibuat dengan cinta &
            matematika.
          </p>
          <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
            <a
              href="#"
              className="hover:text-romantic-rose dark:hover:text-romantic-dark-rose transition-colors"
            >
              Tentang
            </a>
            <a
              href="#"
              className="hover:text-romantic-rose dark:hover:text-romantic-dark-rose transition-colors"
            >
              Kebijakan Privasi
            </a>
            <a
              href="#"
              className="hover:text-romantic-rose dark:hover:text-romantic-dark-rose transition-colors"
            >
              Kontak
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
