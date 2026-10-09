"use client";

import React, { useSyncExternalStore } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const emptySubscribe = () => () => {};

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

export const FloatingNav: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { locale, setLocale } = useLanguage();
  const mounted = useMounted();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav
      aria-label="Controles de navegación y tema"
      className="fixed top-4 right-4 z-40 max-sm:right-1/2 max-sm:translate-x-1/2 flex items-center gap-1.5 p-1.5 rounded-full bg-[var(--card-bg)]/90 border border-[var(--border)] shadow-lg backdrop-blur-xl transition-transform duration-200"
    >
      {/* Segmented Language Switcher [ES | EN] */}
      <div className="flex items-center rounded-full bg-[var(--surface-hover)] p-0.5 border border-[var(--border)]/40">
        <button
          onClick={() => setLocale("es")}
          type="button"
          aria-label="Cambiar idioma a Español"
          className={`min-h-[32px] px-2.5 py-1 text-[11px] font-semibold rounded-full transition-transform transition-colors duration-150 active:scale-95 cursor-pointer ${
            locale === "es"
              ? "bg-[var(--card-bg)] text-[var(--foreground)] shadow-sm font-bold"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          ES
        </button>
        <button
          onClick={() => setLocale("en")}
          type="button"
          aria-label="Switch language to English"
          className={`min-h-[32px] px-2.5 py-1 text-[11px] font-semibold rounded-full transition-transform transition-colors duration-150 active:scale-95 cursor-pointer ${
            locale === "en"
              ? "bg-[var(--card-bg)] text-[var(--foreground)] shadow-sm font-bold"
              : "text-[var(--muted)] hover:text-[var(--foreground)]"
          }`}
        >
          EN
        </button>
      </div>

      <div className="hidden sm:block h-4 w-[1px] bg-[var(--border)]/60 mx-0.5" />

      {/* Physical Card Link */}
      <Link
        href="/card"
        title="Ver Tarjeta Física para Imprimir"
        className="hidden sm:flex w-9 h-9 sm:w-8 sm:h-8 items-center justify-center rounded-full text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-transform transition-colors duration-150 active:scale-95"
      >
        <svg
          className="w-4 h-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <line x1="2" x2="22" y1="10" y2="10" />
        </svg>
      </Link>

      <div className="h-4 w-[1px] bg-[var(--border)]/60 mx-0.5" />

      {/* Theme Toggle Button (Apple Style) */}
      <button
        onClick={toggleTheme}
        type="button"
        aria-label="Alternar tema claro y oscuro"
        className="w-9 h-9 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-transform transition-colors duration-150 active:scale-95 cursor-pointer"
      >
        {mounted ? (
          theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200 rotate-0 hover:rotate-45" />
          ) : (
            <Moon className="w-4 h-4 text-zinc-700 transition-transform duration-200 rotate-0 hover:-rotate-12" />
          )
        ) : (
          <div className="w-4 h-4" />
        )}
      </button>
    </nav>
  );
};
