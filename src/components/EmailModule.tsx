"use client";

import React, { useState } from "react";
import { Mail, Copy, Check, ArrowUpRight, Briefcase, User, Cloud } from "lucide-react";
import { profileData, EmailContactItem } from "@/data/profile";
import { useLanguage } from "@/context/LanguageContext";

export const EmailModule: React.FC = () => {
  const { t } = useLanguage();
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
        return <Briefcase className="w-4 h-4 text-[var(--ola-blue)]" />;
      case "personal":
        return <User className="w-4 h-4 text-emerald-500" />;
      case "icloud":
        return <Cloud className="w-4 h-4 text-sky-400" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const getEmailLabel = (typeKey: EmailContactItem["typeKey"]) => {
    return t.emailModule[typeKey];
  };

  const primaryEmail = profileData.emails.find((e) => e.isPrimary) || profileData.emails[0];

  return (
    <section className="w-full">
      <div className="flex items-center justify-between px-1 mb-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted)] flex items-center gap-1.5">
          <Mail className="w-3.5 h-3.5 text-[var(--ola-blue)]" />
          {t.emailModule.title}
        </span>
        <span className="text-[10px] text-[var(--muted)] font-mono">
          3 canales
        </span>
      </div>

      <div className="apple-card rounded-2xl p-4 sm:p-5 space-y-4">
        {/* Header with primary mailto action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border)]/60">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
                {primaryEmail.email}
              </span>
              <span className="px-1.5 py-0.5 text-[9px] font-semibold rounded-md bg-[var(--ola-blue)]/10 text-[var(--ola-blue)] border border-[var(--ola-blue)]/20">
                Principal
              </span>
            </div>
            <p className="text-xs text-[var(--muted)] mt-0.5">
              {t.emailModule.subtitle}
            </p>
          </div>

          <a
            href={`mailto:${primaryEmail.email}`}
            className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-[var(--ola-blue)] hover:opacity-90 transition-all duration-200 active:scale-[0.98] min-h-[40px] shadow-sm whitespace-nowrap"
          >
            <span>{t.emailModule.primaryAction}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Email Pills / Chips for instant copy */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {profileData.emails.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleCopy(item.email, item.id)}
                type="button"
                className="group relative flex flex-col text-left p-2.5 rounded-xl bg-[var(--surface-hover)] hover:bg-[var(--border)]/30 border border-[var(--border)]/50 transition-all duration-200 active:scale-[0.98] min-h-[56px] justify-between cursor-pointer"
                title={`${t.emailModule.clickToCopy}: ${item.email}`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <div className="flex items-center gap-1.5">
                    {getEmailIcon(item.id)}
                    <span className="text-[11px] font-semibold text-[var(--foreground)]">
                      {getEmailLabel(item.typeKey)}
                    </span>
                  </div>

                  <span className="text-[10px] text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
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
      </div>
    </section>
  );
};
