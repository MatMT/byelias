"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { profileData, SocialLinkItem } from "@/data/profile";
import { useLanguage } from "@/context/LanguageContext";

// SVG Icon for LinkedIn
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

// SVG Icon for TikTok
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.46 2.84 1.25-.01 2.45-.72 2.97-1.84.27-.53.37-1.13.36-1.72.02-4.95-.01-9.91.01-14.86z" />
  </svg>
);

// SVG Icon for Instagram
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const getLinkIcon = (id: string) => {
  switch (id) {
    case "linkedin":
      return <LinkedinIcon className="w-5 h-5 text-[#0077b5]" />;
    case "tiktok":
      return <TikTokIcon className="w-5 h-5 text-[var(--foreground)]" />;
    case "instagram":
      return <InstagramIcon className="w-5 h-5 text-[#E1306C]" />;
    default:
      return null;
  }
};

export const LinkStream: React.FC = () => {
  const { t, locale } = useLanguage();

  return (
    <section className="w-full space-y-2">
      <div className="flex items-center justify-between px-1 mb-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)]">
          {t.sections.channels}
        </span>
        <span className="text-[10px] text-[var(--muted)] font-mono">
          {t.sections.linksCount(profileData.socialLinks.length)}
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {profileData.socialLinks.map((link: SocialLinkItem) => {
          const badge = locale === "es" ? link.badgeEs : link.badgeEn;
          const description = locale === "es" ? link.descriptionEs : link.descriptionEn;

          return (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-3.5 rounded-2xl apple-card hover:border-[var(--ola-blue)]/50 transition-all duration-200 active:scale-[0.98] min-h-[58px]"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[var(--surface-hover)] border border-[var(--border)]/60 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shrink-0">
                  {getLinkIcon(link.id)}
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--ola-blue)] transition-colors">
                      {link.title}
                    </span>
                    {link.handle && (
                      <span className="text-[11px] font-mono text-[var(--muted)]">
                        {link.handle}
                      </span>
                    )}
                    {/* Tone Badge Pill */}
                    <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--muted)] tracking-tight">
                      {badge}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--muted)] tracking-tight mt-0.5 leading-snug">
                    {description}
                  </p>
                </div>
              </div>

              <div className="w-7 h-7 rounded-md flex items-center justify-center text-[var(--muted)] group-hover:text-[var(--foreground)] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-2">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
