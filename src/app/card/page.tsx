"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { toBlob } from "html-to-image";
import { Printer, ArrowLeft, Globe, Mail, Sun, Moon, Copy, Check, Sparkles } from "lucide-react";
import { useTheme } from "next-themes";
import { profileData } from "@/data/profile";

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

// Combined Socials Icon (TikTok / Instagram)
const SocialShareIcon = ({ className }: { className?: string }) => (
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
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

export default function BusinessCardPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [qrUrl, setQrUrl] = useState<string>("");
  const [copiedImage, setCopiedImage] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);

  const targetQrUrl = "https://byelias-five.vercel.app";

  useEffect(() => {
    setMounted(true);

    QRCode.toDataURL(targetQrUrl, {
      width: 520,
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

  const handleCopyImage = async () => {
    const node = document.getElementById("business-card");
    if (!node || isCapturing) return;

    setIsCapturing(true);
    try {
      const blob = await toBlob(node, {
        pixelRatio: 2,
        cacheBust: true,
      });

      if (!blob) throw new Error("No se pudo generar la imagen");

      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2500);
      } else {
        // Fallback: descarga directa en caso de no soportar escritura de imágenes
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "byelias-presentation-card.png";
        a.click();
        URL.revokeObjectURL(url);
        setCopiedImage(true);
        setTimeout(() => setCopiedImage(false), 2500);
      }
    } catch (err) {
      console.error("Error al copiar imagen:", err);
    } finally {
      setIsCapturing(false);
    }
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 print-card-wrapper overflow-x-hidden">
      {/* Ambient Top Glow Spotlight (No Print) */}
      <div
        className="pointer-events-none fixed -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse_at_top,var(--ola-blue),transparent_70%)] opacity-15 blur-[120px] no-print"
        aria-hidden="true"
      />

      {/* Floating Action Controls Bar (No Print) */}
      <nav
        aria-label="Controles de exportación e impresión"
        className="fixed top-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 p-1.5 rounded-full bg-[var(--card-bg)]/90 border border-[var(--border)] shadow-2xl backdrop-blur-xl no-print transition-all duration-200"
      >
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-all active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver</span>
        </Link>

        <div className="h-4 w-[1px] bg-[var(--border)]/60" />

        {/* Copy as Image Button */}
        <button
          onClick={handleCopyImage}
          disabled={isCapturing}
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[var(--foreground)] bg-[var(--surface-hover)] hover:bg-[var(--border)]/40 border border-[var(--border)] transition-all active:scale-95 cursor-pointer disabled:opacity-50"
        >
          {copiedImage ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-bold">¡Copiada! ✓</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-[var(--ola-blue)]" />
              <span>{isCapturing ? "Generando..." : "Copiar Imagen"}</span>
            </>
          )}
        </button>

        {/* Print / PDF Button */}
        <button
          onClick={handlePrint}
          type="button"
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-[var(--ola-blue)] hover:opacity-90 shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Imprimir / PDF</span>
        </button>

        <div className="h-4 w-[1px] bg-[var(--border)]/60" />

        {/* Theme Switcher Button */}
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

      {/* High-Resolution Physical Business Card (Standard 3.5" x 2" ratio = 1.75:1) */}
      <div className="w-full max-w-[760px] my-auto">
        <div
          id="business-card"
          className="print-card apple-card rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-row items-stretch justify-between w-full aspect-[1.75/1] min-h-[380px] sm:min-h-[420px] border border-[var(--border)] shadow-2xl bg-[var(--card-bg)]"
        >
          {/* Subtle Ambient Card Glow */}
          <div
            className="pointer-events-none absolute -top-32 -left-32 w-80 h-80 bg-[radial-gradient(circle,var(--ola-blue),transparent_70%)] opacity-10 blur-3xl"
            aria-hidden="true"
          />

          {/* LEFT SIDE: Identity, Expanded Typography, Academic Title & Tech Stack (62%) */}
          <div className="relative z-10 flex flex-col justify-between h-full w-[62%] pr-5 sm:pr-7">
            {/* Header: Photo (w-20/w-24), Full Name & Handle */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full p-[2.5px] bg-gradient-to-b from-[var(--border)] to-[var(--card-bg)] shadow-lg shrink-0">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[var(--card-bg)]">
                  <Image
                    src={profileData.avatarUrl}
                    alt={profileData.fullName}
                    width={96}
                    height={96}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)] leading-tight">
                  {profileData.fullName}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm font-mono font-bold text-[var(--ola-blue)]">
                    {profileData.handle}
                  </span>
                  <span className="text-xs text-[var(--muted)]">•</span>
                  <span className="text-xs font-semibold text-[var(--muted)] flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    OlaLabs
                  </span>
                </div>
              </div>
            </div>

            {/* Role & Academic Title with exact sizing */}
            <div className="my-auto space-y-1.5 py-2">
              <p className="text-base sm:text-lg font-semibold text-[var(--ola-blue)] tracking-tight">
                {profileData.title}
              </p>
              <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300 leading-snug max-w-sm">
                Técnico en Ing. en Computación | Estudiante Ing. en CC. de la Computación (UDB)
              </p>
            </div>

            {/* Tech Stack Pills with enhanced sizing and padding */}
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
              {["TypeScript", "Next.js", "IA", "Architecture", "+ Más"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-lg bg-[var(--surface-hover)] border border-[var(--border)] text-[var(--foreground)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Centered Bento QR Code & Full Social Handles (38%) */}
          <div className="relative z-10 flex flex-col justify-between items-center h-full w-[38%] pl-5 sm:pl-7 border-l border-[var(--border)]/70">
            {/* QR Code Bento Box Container (Centrado Verticalmente) */}
            <div className="w-full flex-1 flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white border border-zinc-200 shadow-md my-auto max-h-[220px]">
              <div className="w-full max-w-[140px] sm:max-w-[155px] aspect-square flex items-center justify-center">
                {qrUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={qrUrl}
                    alt="QR a byelias-five.vercel.app"
                    className="w-full h-full object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-zinc-500 font-mono">
                    Generando QR...
                  </div>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono text-zinc-600 mt-1.5 font-bold tracking-tight">
                Escanea para conectar
              </span>
            </div>

            {/* Complete Links & Handles List below QR */}
            <div className="w-full space-y-2 pt-3 text-left">
              <a
                href="https://olabsv.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--foreground)] hover:text-[var(--ola-blue)] transition-colors truncate"
              >
                <Globe className="w-4 h-4 text-[var(--ola-blue)] shrink-0" />
                <span className="font-mono font-semibold truncate">olabsv.com</span>
              </a>

              <a
                href="mailto:oelias@olabsv.com"
                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--foreground)] hover:text-[var(--ola-blue)] transition-colors truncate"
              >
                <Mail className="w-4 h-4 text-[var(--ola-blue)] shrink-0" />
                <span className="font-mono font-semibold truncate">oelias@olabsv.com</span>
              </a>

              <a
                href="https://www.linkedin.com/in/oscarelias2004"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--foreground)] hover:text-[#0077b5] transition-colors truncate"
              >
                <LinkedinIcon className="w-4 h-4 text-[#0077b5] shrink-0" />
                <span className="font-mono truncate">in/oscarelias2004</span>
              </a>

              <a
                href="https://tiktok.com/@byelias_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--foreground)] hover:text-[var(--ola-blue)] transition-colors truncate"
              >
                <SocialShareIcon className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="font-mono font-semibold truncate">@byelias_</span>
              </a>
            </div>
          </div>
        </div>

        {/* Informative Footer note on screen (No Print) */}
        <p className="text-center text-xs text-[var(--muted)] mt-5 no-print">
          Formato estándar 3.5″ × 2″ apaisado • Resolución Retina optimizada para portapapeles, PDF o impresión física
        </p>
      </div>
    </div>
  );
}
