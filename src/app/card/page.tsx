"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { Printer, ArrowLeft, Globe, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { profileData } from "@/data/profile";

// Inline LinkedIn Icon
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

export default function BusinessCardPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>("");

  const targetQrUrl = "https://byelias-five.vercel.app";

  useEffect(() => {
    setMounted(true);

    QRCode.toDataURL(targetQrUrl, {
      width: 480,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    })
      .then((url) => setQrUrl(url))
      .catch(console.error);
  }, []);

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 print-card-wrapper overflow-x-hidden">
      {/* Subtle Atmospheric Ambient Glow */}
      <div
        className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-[radial-gradient(ellipse_at_top,var(--ola-blue),transparent_70%)] opacity-15 blur-[120px] no-print"
        aria-hidden="true"
      />

      {/* Floating Action Controls Bar (No Print) */}
      <nav
        aria-label="Controles de impresión y navegación"
        className="fixed top-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 p-1.5 rounded-full bg-[var(--card-bg)]/90 border border-[var(--border)] shadow-xl backdrop-blur-xl no-print transition-all duration-200"
      >
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-all active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver</span>
        </Link>

        <div className="h-4 w-[1px] bg-[var(--border)]/60" />

        <button
          onClick={handlePrint}
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-[var(--ola-blue)] hover:opacity-90 shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Imprimir / Exportar PDF</span>
        </button>

        <div className="h-4 w-[1px] bg-[var(--border)]/60" />

        <button
          onClick={toggleTheme}
          type="button"
          aria-label="Alternar tema"
          className="w-8 h-8 flex items-center justify-center rounded-full text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-all active:scale-95 cursor-pointer"
        >
          {mounted ? (
            theme === "dark" ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700" />
            )
          ) : (
            <div className="w-4 h-4" />
          )}
        </button>
      </nav>

      {/* Physical Business Card Mockup & Printable Layout (3.5" x 2" ratio = 1.75:1) */}
      <div className="w-full max-w-[650px] my-auto">
        <div
          id="business-card"
          className="print-card apple-card rounded-3xl p-6 sm:p-7 relative overflow-hidden flex flex-row items-stretch justify-between w-full aspect-[1.75/1] min-h-[340px] sm:min-h-[365px] border border-[var(--border)] shadow-2xl bg-[var(--card-bg)]"
        >
          {/* Ambient card subtle gradient light */}
          <div
            className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-[radial-gradient(circle,var(--ola-blue),transparent_70%)] opacity-10 blur-2xl"
            aria-hidden="true"
          />

          {/* LEFT SIDE: Identity, Academic details & Tech Stack (60%) */}
          <div className="relative z-10 flex flex-col justify-between h-full w-[62%] pr-4 sm:pr-5">
            {/* Header: Photo, Name & Handle */}
            <div className="flex items-start gap-3.5">
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] bg-gradient-to-b from-[var(--border)] to-[var(--card-bg)] shadow-md shrink-0">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[var(--card-bg)]">
                  <Image
                    src={profileData.avatarUrl}
                    alt={profileData.fullName}
                    width={64}
                    height={64}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-0.5">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-[var(--foreground)] leading-tight">
                  {profileData.fullName}
                </h1>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[11px] font-mono font-bold text-[var(--ola-blue)]">
                    {profileData.handle}
                  </span>
                  <span className="text-[10px] text-[var(--muted)]">•</span>
                  <span className="text-[10px] font-semibold text-[var(--muted)]">
                    OlaLabs
                  </span>
                </div>
              </div>
            </div>

            {/* Role & Exact Academic Formation */}
            <div className="my-auto space-y-1 py-1">
              <p className="text-xs sm:text-sm font-bold text-[var(--ola-blue)] tracking-tight">
                {profileData.title}
              </p>
              <p className="text-[10px] sm:text-[11px] text-[var(--muted)] leading-tight font-medium max-w-[280px]">
                Técnico en Ing. en Computación | Estudiante Ing. en CC. de la Computación (UDB)
              </p>
            </div>

            {/* Compact Tech Tags */}
            <div className="flex flex-wrap gap-1 mt-auto pt-2">
              {["TypeScript", "Next.js", "IA", "Architecture", "+ Más"].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-[9px] sm:text-[10px] font-semibold rounded-md bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--foreground)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Bento Box QR & Quick Direct Accesses (38%) */}
          <div className="relative z-10 flex flex-col justify-between h-full w-[38%] pl-4 sm:pl-5 border-l border-[var(--border)]/70">
            {/* Square Bento Box for QR Code */}
            <div className="w-full flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-white border border-zinc-200 shadow-sm">
              <div className="w-full max-w-[130px] aspect-square flex items-center justify-center">
                {qrUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={qrUrl}
                    alt="QR Code a byelias-five.vercel.app"
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[10px] text-zinc-500 font-mono">
                    Generando...
                  </div>
                )}
              </div>
              <span className="text-[8px] sm:text-[9px] font-mono text-zinc-600 mt-1 font-semibold tracking-tight">
                Escanea para conectar
              </span>
            </div>

            {/* Direct Contacts below QR */}
            <div className="w-full space-y-1.5 mt-auto pt-2 text-left">
              <a
                href="https://olabsv.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-[var(--foreground)] hover:text-[var(--ola-blue)] transition-colors truncate"
              >
                <Globe className="w-3.5 h-3.5 text-[var(--ola-blue)] shrink-0" />
                <span className="font-mono truncate">olabsv.com</span>
              </a>

              <a
                href="mailto:oelias@olabsv.com"
                className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-[var(--foreground)] hover:text-[var(--ola-blue)] transition-colors truncate"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--ola-blue)] shrink-0" />
                <span className="font-mono truncate">oelias@olabsv.com</span>
              </a>

              <a
                href="https://www.linkedin.com/in/oscarelias2004"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-[var(--foreground)] hover:text-[#0077b5] transition-colors truncate"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#0077b5] shrink-0" />
                <span className="truncate">LinkedIn</span>
              </a>
            </div>
          </div>
        </div>

        {/* Caption below card on screen (No Print) */}
        <p className="text-center text-xs text-[var(--muted)] mt-5 no-print">
          Formato estándar 3.5″ × 2″ apaisado • Optimizado para impresión o captura en alta resolución
        </p>
      </div>
    </div>
  );
}
