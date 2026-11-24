"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Download, MessageCircle, QrCode } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { profileData } from "@/data/profile";
import { generateAndDownloadVCard } from "@/utils/vcard";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(useGSAP);

interface CardHeaderProps {
  onOpenQr: () => void;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ onOpenQr }) => {
  const { t, locale } = useLanguage();
  const avatarRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(avatarRef.current, {
          y: -3,
          duration: 2.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      });

      return () => motion.revert();
    },
    { scope: avatarRef },
  );

  return (
    <header className="flex flex-col items-center text-center">
      {/* Clean Circular Avatar */}
      <div ref={avatarRef} className="relative mb-4">
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
      <div className="flex w-full flex-col gap-3">
        {/* Primary WhatsApp Action */}
        <a
          href={profileData.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.actions.whatsapp}
          title={t.actions.whatsapp}
          className="flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-xl bg-[var(--ola-blue)] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-transform transition-opacity duration-200 hover:opacity-90 active:scale-[0.98]"
        >
          <MessageCircle className="h-4 w-4 shrink-0" />
          <span>{t.actions.whatsapp}</span>
        </a>

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={generateAndDownloadVCard}
            type="button"
            aria-label={t.actions.saveContact}
            title={t.actions.saveContact}
            className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] px-4 text-sm font-semibold text-[var(--foreground)] transition-transform transition-colors duration-200 hover:border-[var(--ola-blue)]/40 hover:bg-[var(--border)]/40 active:scale-[0.98]"
          >
            <Download className="h-4 w-4" />
            <span>{t.actions.saveContact}</span>
          </button>

          {/* View QR Code */}
          <button
            onClick={onOpenQr}
            type="button"
            aria-label={t.actions.showQr}
            title={t.actions.showQr}
            className="flex min-h-[52px] flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--border)] bg-[var(--surface-hover)] px-4 text-sm font-semibold text-[var(--foreground)] transition-transform transition-colors duration-200 hover:bg-[var(--border)]/40 active:scale-[0.98] cursor-pointer"
          >
            <QrCode className="h-4 w-4" />
            <span>{t.actions.showQr}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
