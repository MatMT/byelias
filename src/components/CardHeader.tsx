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
      {/* Avatar Container with Apple HIG halo */}
      <div className="relative mb-4">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[3px] bg-gradient-to-b from-[var(--border)] to-[var(--card-bg)] shadow-xl">
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

        {/* Live Availability Beacon */}
        <div
          className="absolute bottom-0 right-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--card-bg)] border border-[var(--border)] shadow-md backdrop-blur-md"
          title={t.availability.subtext}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-semibold tracking-tight text-[var(--foreground)]">
            {t.availability.status}
          </span>
        </div>
      </div>

      {/* Name and Brand Tag */}
      <div className="space-y-1 mb-2">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            {profileData.fullName}
          </h1>
          <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--muted)]">
            {profileData.name}
          </span>
        </div>
        <p className="text-sm font-semibold text-[var(--ola-blue)] tracking-tight">
          {t.role}
        </p>
      </div>

      {/* Tagline / Bio */}
      <p className="text-xs text-[var(--muted)] max-w-sm sm:max-w-md leading-relaxed mb-6">
        {locale === "es" ? profileData.taglineEs : profileData.taglineEn}
      </p>

      {/* Primary Action Buttons Bar */}
      <div className="flex items-center justify-center gap-2.5 w-full max-w-xs">
        {/* Save Contact vCard */}
        <button
          onClick={generateAndDownloadVCard}
          type="button"
          className="flex-1 min-h-[44px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-[var(--ola-blue)] hover:opacity-90 transition-all duration-200 active:scale-[0.98] shadow-sm cursor-pointer"
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
          className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-xl text-xs font-medium text-[var(--foreground)] bg-[var(--surface-hover)] hover:bg-[var(--border)]/40 border border-[var(--border)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
        >
          <QrCode className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
