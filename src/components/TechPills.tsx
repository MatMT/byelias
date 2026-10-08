"use client";

import React from "react";
import { profileData } from "@/data/profile";
import { useLanguage } from "@/context/LanguageContext";

export const TechPills: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="w-full">
      <div className="flex items-center justify-between px-1 mb-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
          {t.sections.techFocus}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {profileData.skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--ola-blue)]/50 transition-colors duration-150"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};
