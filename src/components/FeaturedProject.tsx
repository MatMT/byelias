"use client";

import React from "react";
import { ArrowUpRight, Sparkles, Globe, ShoppingBag } from "lucide-react";
import { profileData, ProjectItem } from "@/data/profile";
import { useLanguage } from "@/context/LanguageContext";

export const FeaturedProject: React.FC = () => {
  const { t, locale } = useLanguage();

  const getProjectIcon = (id: string) => {
    switch (id) {
      case "olastudio":
        return <ShoppingBag className="w-5 h-5 text-purple-400" />;
      case "olalabs":
      default:
        return <Globe className="w-5 h-5 text-[var(--ola-blue)]" />;
    }
  };

  return (
    <section className="w-full space-y-2.5">
      <div className="flex items-center justify-between px-1 mb-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)] flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          {t.sections.projectsAndVentures}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {profileData.projects.map((project: ProjectItem) => {
          const subtitle = locale === "es" ? project.subtitleEs : project.subtitleEn;

          return (
            <a
              key={project.id}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col justify-between p-4 rounded-2xl apple-card hover:border-[var(--ola-blue)]/50 transition-transform duration-150 active:scale-[0.98] min-h-[96px]"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)]/60 flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                    {getProjectIcon(project.id)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--ola-blue)] transition-colors duration-200">
                        {project.title}
                      </span>
                    </div>
                    <span className="inline-block px-1.5 py-0.2 text-[9px] font-semibold rounded bg-[var(--surface-hover)] border border-[var(--border)]/70 text-[var(--muted)]">
                      {project.badge}
                    </span>
                  </div>
                </div>

                <div className="w-7 h-7 rounded-md bg-[var(--surface-hover)] flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--foreground)] transition-transform transition-colors duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              <p className="text-xs text-[var(--muted)] tracking-tight leading-snug">
                {subtitle}
              </p>
            </a>
          );
        })}
      </div>
    </section>
  );
};
