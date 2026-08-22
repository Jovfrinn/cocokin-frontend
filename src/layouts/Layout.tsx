import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import DarkModeToggle from "../components/DarkModeToggle";
import Avatar from "../components/Avatar";

function Logomark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 19.5H20"
        stroke="var(--color-romantic-clay)"
        strokeWidth="2"
        strokeLinecap="round"
        className="opacity-70"
      />
      <path
        d="M4 19.5L17 6.5"
        stroke="var(--color-romantic-rose)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9.5 19.5A5.5 5.5 0 0 0 12.9 15"
        stroke="var(--color-romantic-clay)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="4" cy="19.5" r="1.6" fill="var(--color-romantic-text)" />
    </svg>
  );
}

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
      <header className="sticky top-0 z-50 backdrop-blur-md bg-romantic-bg/85 dark:bg-romantic-dark-bg/85 border-b border-romantic-border dark:border-romantic-dark-border">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            to={user ? "/dashboard" : "/"}
            className="flex items-center gap-2 focus:outline-none"
          >
            <Logomark className="w-6 h-6" />
            <span className="font-serif font-semibold text-xl tracking-tight text-romantic-text dark:text-romantic-dark-text">
              Cocokin<span className="text-romantic-rose dark:text-romantic-dark-rose">.ai</span>
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
                      className="text-xs font-semibold uppercase tracking-wider text-romantic-muted hover:text-romantic-rose dark:text-romantic-dark-muted dark:hover:text-romantic-dark-rose transition-colors"
                    >
                      Cara Kerja
                    </a>
                  </>
                ) : (
                  <>
                    <Link
                      to="/dashboard"
                      className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
                        location.pathname === "/dashboard"
                          ? "text-romantic-rose dark:text-romantic-dark-rose"
                          : "text-romantic-muted hover:text-romantic-rose dark:text-romantic-dark-muted dark:hover:text-romantic-dark-rose"
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/quiz/create"
                      className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
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
                        className="text-xs font-semibold uppercase tracking-wider text-romantic-muted hover:text-romantic-rose dark:text-romantic-dark-muted dark:hover:text-romantic-dark-rose px-3 py-2 transition-colors"
                      >
                        Masuk
                      </Link>
                      <Link
                        to="/login?tab=register"
                        className="text-xs font-semibold uppercase tracking-wider bg-romantic-rose hover:bg-romantic-rose-hover text-white dark:bg-romantic-dark-rose dark:hover:bg-romantic-dark-rose-hover dark:text-romantic-dark-bg px-4 py-2 rounded-lg shadow-[0_2px_0_0_rgba(0,0,0,0.12)] transition-all"
                      >
                        Daftar
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 border-l border-romantic-border dark:border-romantic-dark-border pl-3">
                      <div className="hidden md:flex flex-col text-right">
                        <span className="text-xs font-semibold text-romantic-text dark:text-romantic-dark-text">
                          {user.full_name || user.name}
                        </span>
                        <span className="text-[11px] text-romantic-muted dark:text-romantic-dark-muted font-mono">
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
                        className="p-1 text-romantic-muted hover:text-romantic-rose dark:hover:text-romantic-dark-rose transition-colors cursor-pointer"
                      >
                        <Icon
                          icon="solar:logout-2-linear"
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
        <div key={location.pathname} className="animate-fade-up">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-romantic-border dark:border-romantic-dark-border py-6 bg-white/40 dark:bg-romantic-dark-card/25 mt-12">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logomark className="w-4 h-4 opacity-60" />
            <span className="font-serif font-semibold text-sm text-romantic-muted dark:text-romantic-dark-muted">
              Cocokin.ai
            </span>
          </div>
          <p className="text-xs text-romantic-muted dark:text-romantic-dark-muted">
            © {new Date().getFullYear()} Cocokin.ai. Dibuat dengan cinta dan
            matematika.
          </p>
          <div className="flex gap-4 text-xs text-romantic-muted dark:text-romantic-dark-muted">
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
