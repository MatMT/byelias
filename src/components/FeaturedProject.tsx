"use client";

import React from "react";
import { ArrowUpRight, Sparkles, Globe } from "lucide-react";
import { profileData } from "@/data/profile";
import { useLanguage } from "@/context/LanguageContext";

export const FeaturedProject: React.FC = () => {
  const { t } = useLanguage();
  const featured = profileData.links.find((l) => l.featured);

  if (!featured) return null;

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          {t.sections.featuredVenture}
        </span>
        <span className="text-[10px] text-emerald-500 font-semibold font-mono flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live
        </span>
      </div>

      <a
        href={featured.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block w-full p-4 sm:p-5 rounded-2xl apple-card hover:border-[var(--ola-blue)]/50 transition-all duration-200 active:scale-[0.98] overflow-hidden min-h-[68px]"
      >
        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)]/60 flex items-center justify-center text-[var(--ola-blue)] group-hover:scale-105 transition-transform duration-200">
              <Globe className="w-5 h-5" />
            </div>

            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--ola-blue)] transition-colors duration-200">
                  {featured.title}
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-semibold rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                  Official
                </span>
              </div>
              <p className="text-xs text-[var(--muted)] tracking-tight mt-0.5">
                {featured.subtitle}
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-lg bg-[var(--surface-hover)] flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--foreground)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </a>
    </section>
  );
};
