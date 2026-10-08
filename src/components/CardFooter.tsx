"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { useLanguage } from "@/context/LanguageContext";

export const CardFooter: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="w-full pt-8 pb-4 border-t border-[var(--border)]/60 text-center space-y-2">
      <p className="text-xs text-[var(--muted)] font-medium">
        © 2026 {profileData.fullName} • {t.footer.rights}
      </p>
      <div className="flex items-center justify-center gap-3 text-[11px] text-[var(--muted)]">
        <a
          href={profileData.domain}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--ola-blue)] transition-colors underline decoration-[var(--border)] underline-offset-4"
        >
          olabsv.com
        </a>
        <span>•</span>
        <span>{t.footer.title}</span>
      </div>
    </footer>
  );
};
