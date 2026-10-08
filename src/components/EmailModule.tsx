"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, Briefcase, User, Cloud } from "lucide-react";
import { profileData, EmailContactItem } from "@/data/profile";
import { useLanguage } from "@/context/LanguageContext";

export const EmailModule: React.FC = () => {
  const { t, locale } = useLanguage();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (email: string, id: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  const getEmailIcon = (id: string) => {
    switch (id) {
      case "work":
        return <Briefcase className="w-3.5 h-3.5 text-[var(--ola-blue)]" />;
      case "personal":
        return <User className="w-3.5 h-3.5 text-emerald-500" />;
      case "icloud":
        return <Cloud className="w-3.5 h-3.5 text-sky-400" />;
      default:
        return <Mail className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section className="w-full space-y-2">
      <div className="flex items-center justify-between px-1 mb-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)] flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-[var(--ola-blue)]" />
          {t.emailModule.title}
        </span>
      </div>

      {/* 3 Compact Direct Access Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {profileData.emails.map((item: EmailContactItem) => {
          const isCopied = copiedId === item.id;
          const label = locale === "es" ? item.labelEs : item.labelEn;

          return (
            <button
              key={item.id}
              onClick={() => handleCopy(item.email, item.id)}
              type="button"
              className="group relative flex flex-col justify-between p-3 rounded-2xl apple-card hover:border-[var(--ola-blue)]/50 transition-all duration-200 active:scale-[0.98] min-h-[64px] text-left cursor-pointer"
              title={`${t.emailModule.clickToCopy}: ${item.email}`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <div className="flex items-center gap-1.5">
                  {getEmailIcon(item.id)}
                  <span className="text-[11px] font-semibold text-[var(--foreground)] group-hover:text-[var(--ola-blue)] transition-colors">
                    {label}
                  </span>
                </div>

                <span className="text-[10px] text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                  {isCopied ? (
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
                  )}
                </span>
              </div>

              <span className="text-[11px] text-[var(--muted)] truncate font-mono">
                {item.email}
              </span>

              {isCopied && (
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-[var(--foreground)] text-[var(--background)] text-[10px] font-semibold shadow-md whitespace-nowrap animate-fadeIn z-20">
                  {t.actions.copied}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};
