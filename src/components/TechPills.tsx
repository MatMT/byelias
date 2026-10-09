"use client";

import React, { useState } from "react";
import { profileData } from "@/data/profile";
import { useLanguage } from "@/context/LanguageContext";

export const TechPills: React.FC = () => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="w-full">
      <div className="flex items-center justify-between px-1 mb-2.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
          {t.sections.techFocus}
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5 items-center">
        {/* Core Visible Skills */}
        {profileData.coreSkills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--ola-blue)]/50 transition-colors duration-150"
          >
            {skill}
          </span>
        ))}

        {/* Expanded Skills (revealed on click) */}
        {isExpanded &&
          profileData.moreSkills.map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[var(--ola-blue)]/10 border border-[var(--ola-blue)]/30 text-[var(--foreground)] animate-fadeIn transition-colors duration-150"
            >
              {skill}
            </span>
          ))}

        {/* Interactive "+ Más" / "+ More" Tag */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          type="button"
          aria-expanded={isExpanded}
          className="min-h-[32px] px-2.5 py-1 text-xs font-semibold rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] hover:border-[var(--ola-blue)] hover:text-[var(--ola-blue)] hover:bg-[var(--ola-blue)]/5 text-[var(--muted)] transition-transform transition-colors duration-150 cursor-pointer active:scale-95"
        >
          {isExpanded ? t.actions.lessSkills : t.actions.moreSkills}
        </button>
      </div>
    </section>
  );
};
