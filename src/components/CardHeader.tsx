"use client";

import React from "react";
import Image from "next/image";
import { Download, QrCode } from "lucide-react";
import { profileData } from "@/data/profile";
import { generateAndDownloadVCard } from "@/utils/vcard";
import { useLanguage } from "@/context/LanguageContext";

interface CardHeaderProps {
  onOpenQr: () => void;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ onOpenQr }) => {
  const { t, locale } = useLanguage();

  return (
    <header className="flex flex-col items-center text-center">
      {/* Clean Circular Avatar */}
      <div className="relative mb-4">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[2px] bg-gradient-to-b from-[var(--border)] to-[var(--card-bg)] shadow-md">
          <div className="relative w-full h-full rounded-full overflow-hidden bg-[var(--card-bg)]">
            <Image
              src={profileData.avatarUrl}
              alt={profileData.fullName}
              width={112}
              height={112}
              priority
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>
      </div>

      {/* Name and Handle Tag (Line break on mobile, inline on desktop) */}
      <div className="space-y-3 mb-2">
        <div className="space-y-1.5 sm:gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            {profileData.fullName}
          </h1>
          <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--ola-blue)] font-mono">
            {profileData.handle}
          </span>
        </div>
        <p className="text-sm font-semibold text-[var(--ola-blue)] tracking-tight">
          {t.role}
        </p>
      </div>

      {/* Tagline / Academic Detail Bio */}
      <p className="text-xs text-[var(--muted)] max-w-sm sm:max-w-md leading-relaxed mb-6">
        {locale === "es" ? profileData.bioEs : profileData.bioEn}
      </p>

      {/* Primary Action Buttons Bar */}
      <div className="flex items-center justify-center gap-2.5 w-full max-w-xs">
        {/* Save Contact vCard */}
        <button
          onClick={generateAndDownloadVCard}
          type="button"
          className="flex-1 min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[var(--ola-blue)] hover:opacity-90 transition-transform transition-opacity duration-150 active:scale-[0.98] shadow-sm cursor-pointer"
        >
          <Download className="w-4 h-4" />
          <span>{t.actions.saveContact}</span>
        </button>

        {/* View QR Code */}
        <button
          onClick={onOpenQr}
          type="button"
          aria-label={t.actions.showQr}
          title={t.actions.showQr}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-xl text-xs font-medium text-[var(--foreground)] bg-[var(--surface-hover)] hover:bg-[var(--border)]/40 border border-[var(--border)] transition-transform transition-colors duration-150 active:scale-[0.98] cursor-pointer"
        >
          <QrCode className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
