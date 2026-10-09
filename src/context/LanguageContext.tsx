"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useSyncExternalStore,
  startTransition,
} from "react";
import { Locale, TranslationDictionary, translations } from "@/data/i18n";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "es",
  setLocale: () => {},
  t: translations.es,
});

const LOCALE_KEY = "byelias_locale";
const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
}

function getSnapshot(): Locale {
  try {
    const saved = localStorage.getItem(LOCALE_KEY);
    if (saved === "es" || saved === "en") return saved;
  } catch {
    // Ignore storage errors
  }
  return "es";
}

function getServerSnapshot(): Locale {
  return "es";
}

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLocale = useCallback((newLocale: Locale) => {
    try {
      localStorage.setItem(LOCALE_KEY, newLocale);
    } catch {
      // Ignore storage errors
    }
    startTransition(() => {
      listeners.forEach((listener) => listener());
    });
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: translations[locale],
    }),
    [locale, setLocale]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
