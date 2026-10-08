"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Copy, Check, Download, QrCode } from "lucide-react";
import { profileData } from "@/data/profile";
import { generateAndDownloadVCard } from "@/utils/vcard";

interface CardHeaderProps {
  onOpenQr: () => void;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ onOpenQr }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <header className="flex flex-col items-center text-center">
      {/* Avatar Container with glowing status ring */}
      <div className="relative mb-5">
        <div className="relative w-24 h-24 rounded-full p-[2px] bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 shadow-xl">
          <div className="relative w-full h-full rounded-full overflow-hidden bg-zinc-900">
            <Image
              src={profileData.avatarUrl}
              alt={profileData.fullName}
              width={96}
              height={96}
              priority
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Live Availability Badge */}
        <div
          className="absolute -bottom-1 -right-1 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-700/80 shadow-md backdrop-blur-sm"
          title={profileData.availability}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-medium tracking-tight text-zinc-300">
            Available
          </span>
        </div>
      </div>

      {/* Name and Brand Moniker */}
      <div className="space-y-1 mb-2">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {profileData.fullName}
          </h1>
          <span className="px-2 py-0.5 text-xs font-semibold rounded bg-zinc-800/90 border border-zinc-700/60 text-zinc-300 tracking-wide">
            {profileData.name}
          </span>
        </div>
        <p className="text-sm font-medium text-zinc-400 tracking-tight">
          {profileData.title}
        </p>
      </div>

      {/* Bio / Tagline */}
      <p className="text-xs text-zinc-400 max-w-sm leading-relaxed mb-6">
        {profileData.tagline}
      </p>

      {/* Primary Action Buttons Bar */}
      <div className="flex items-center justify-center gap-2.5 w-full max-w-xs">
        {/* Save Contact vCard */}
        <button
          onClick={generateAndDownloadVCard}
          type="button"
          className="flex-1 min-h-[44px] flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-white bg-zinc-800/90 hover:bg-zinc-700/90 border border-zinc-700/80 hover:border-zinc-600 transition-all duration-200 active:scale-[0.98] shadow-sm"
        >
          <Download className="w-4 h-4 text-zinc-300" />
          <span>Guardar</span>
        </button>

        {/* View QR Code */}
        <button
          onClick={onOpenQr}
          type="button"
          aria-label="Ver código QR de la tarjeta"
          className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-xl text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 active:scale-[0.98]"
        >
          <QrCode className="w-4 h-4" />
        </button>

        {/* Copy Email Button */}
        <button
          onClick={handleCopyEmail}
          type="button"
          aria-label="Copiar correo electrónico"
          className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2.5 rounded-xl text-xs font-medium text-zinc-300 hover:text-white bg-zinc-900/80 hover:bg-zinc-800/90 border border-zinc-800 hover:border-zinc-700 transition-all duration-200 active:scale-[0.98]"
        >
          {copied ? (
            <Check className="w-4 h-4 text-emerald-400 transition-transform duration-200" />
          ) : (
            <Copy className="w-4 h-4 transition-transform duration-200" />
          )}
        </button>
      </div>

      {copied && (
        <span className="text-[11px] text-emerald-400 font-medium mt-2 transition-opacity duration-200 animate-fadeIn">
          Correo copiado al portapapeles
        </span>
      )}
    </header>
  );
};
