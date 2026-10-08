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

// Combined Socials Icon (TikTok & Instagram)
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

  const targetQrUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://links.olabsv.com";

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
  }, [targetQrUrl]);

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
        // Fallback: descarga directa en caso de navegadores con restricciones
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "byelias-card-split.png";
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

      {/* High-Resolution Bicolor / Split Physical Business Card (Standard 3.5" x 2" ratio = 1.75:1) */}
      <div className="w-full max-w-[780px] my-auto">
        <div
          id="business-card"
          className="print-card rounded-3xl overflow-hidden border border-zinc-200/90 dark:border-zinc-800 shadow-2xl flex flex-row items-stretch w-full aspect-[1.75/1] min-h-[390px] sm:min-h-[430px]"
        >
          {/* ========================================================================= */}
          {/* LEFT HALF (58%): Clean White Surface for Identity, Academics & Tech Stack */}
          {/* ========================================================================= */}
          <div className="w-[58%] sm:w-[60%] bg-white dark:bg-zinc-900 p-6 sm:p-8 flex flex-col justify-between text-left transition-colors duration-250">
            {/* Header: Square Modern Avatar (rounded-2xl) + Name & Handle */}
            <div className="flex items-start gap-4 sm:gap-5">
              {/* Square Avatar Container */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden p-[2.5px] bg-gradient-to-b from-zinc-200 to-zinc-100 dark:from-zinc-700 dark:to-zinc-800 shadow-md border border-zinc-200/80 dark:border-zinc-700 shrink-0">
                <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <Image
                    src={profileData.avatarUrl}
                    alt={profileData.fullName}
                    width={112}
                    height={112}
                    priority
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Name & Handle */}
              <div className="space-y-1 pt-1">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
                  {profileData.fullName}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm font-mono font-bold text-[#0071e3] dark:text-[#2997ff]">
                    {profileData.handle}
                  </span>
                  <span className="text-xs text-zinc-400">•</span>
                  <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    OlaLabs
                  </span>
                </div>
              </div>
            </div>

            {/* Role & Clean Academic Breakdown (Con salto de línea) */}
            <div className="my-auto space-y-2 py-2">
              <p className="text-sm sm:text-base font-bold text-[#0071e3] dark:text-[#2997ff] tracking-tight">
                {profileData.title}
              </p>
              
              <div className="space-y-0.5 text-xs sm:text-sm leading-snug">
                <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                  Técnico en Ing. en Computación
                </p>
                <p className="font-medium text-zinc-500 dark:text-zinc-400">
                  Estudiante de Ing. en Ciencias de la Computación (UDB)
                </p>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
              {["TypeScript", "Next.js", "IA", "Architecture", "+ Más"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT HALF (42%): Solid OlaStudio Blue for QR Code & Contact Channels     */}
          {/* ========================================================================= */}
          <div className="w-[42%] sm:w-[40%] bg-gradient-to-br from-[#0071e3] to-[#0055b3] p-5 sm:p-7 flex flex-col justify-between items-center text-white relative overflow-hidden text-center shadow-inner">
            {/* Ambient Reflection Lighting */}
            <div
              className="pointer-events-none absolute -top-24 -right-24 w-64 h-64 bg-white/10 blur-3xl rounded-full"
              aria-hidden="true"
            />

            {/* QR Section: Bright White Floating Bento Card */}
            <div className="w-full flex-1 flex flex-col items-center justify-center my-auto">
              <div className="p-3 sm:p-3.5 rounded-2xl bg-white shadow-xl border border-white/20 flex items-center justify-center">
                <div className="w-28 h-28 sm:w-32 sm:h-32 aspect-square flex items-center justify-center">
                  {qrUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={qrUrl}
                      alt="QR a links.olabsv.com"
                      className="w-full h-full object-contain rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-zinc-500 font-mono">
                      Generando QR...
                    </div>
                  )}
                </div>
              </div>
              <span className="text-white/95 text-xs font-semibold mt-2.5 tracking-tight drop-shadow-sm">
                Escanea para conectar
              </span>
            </div>

            {/* Contact Channels Stack with Pure White Typography & Icons */}
            <div className="w-full space-y-2 pt-3 text-left">
              <a
                href="https://olabsv.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white hover:text-white/80 transition-colors truncate drop-shadow-sm"
              >
                <Globe className="w-4 h-4 text-white shrink-0" />
                <span className="font-mono truncate">olabsv.com</span>
              </a>

              <a
                href="mailto:oelias@olabsv.com"
                className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white hover:text-white/80 transition-colors truncate drop-shadow-sm"
              >
                <Mail className="w-4 h-4 text-white shrink-0" />
                <span className="font-mono truncate">oelias@olabsv.com</span>
              </a>

              <a
                href="https://www.linkedin.com/in/oscarelias2004"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white hover:text-white/80 transition-colors truncate drop-shadow-sm"
              >
                <LinkedinIcon className="w-4 h-4 text-white shrink-0" />
                <span className="font-mono truncate">in/oscarelias2004</span>
              </a>

              <a
                href="https://tiktok.com/@byelias_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white hover:text-white/80 transition-colors truncate drop-shadow-sm"
              >
                <SocialShareIcon className="w-4 h-4 text-white shrink-0" />
                <span className="font-mono truncate">@byelias_</span>
              </a>
            </div>
          </div>
        </div>

        {/* Informative Footer note on screen (No Print) */}
        <p className="text-center text-xs text-[var(--muted)] mt-5 no-print">
          Estética Split OlaStudio • Formato estándar 3.5″ × 2″ apaisado • Optimizado para impresión física y copiado en resolución Retina
        </p>
      </div>
    </div>
  );
}
