"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { toBlob } from "html-to-image";
import {
  Printer,
  ArrowLeft,
  Globe,
  Mail,
  Sun,
  Moon,
  Copy,
  Check,
  Sparkles,
  Zap,
} from "lucide-react";
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
        a.download = "byelias-dev-pass.png";
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
      {/* Subtle Atmospheric Ambient Glow (No Print) */}
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

      {/* ========================================================================= */}
      {/* Tech Pass / Developer Credential Card (Standard 3.5" x 2" ratio = 1.75:1) */}
      {/* ========================================================================= */}
      <div className="w-full max-w-[760px] my-auto">
        <div
          id="business-card"
          className="print-card rounded-3xl relative overflow-hidden bg-[#fcfcfd] dark:bg-[#121316] border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xl p-7 sm:p-8 flex flex-row items-stretch justify-between w-full aspect-[1.75/1] min-h-[390px] sm:min-h-[430px] transition-colors duration-250"
        >
          {/* Subtle 2px Top Accent Line (OlaStudio Blue) */}
          <div
            className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-[var(--ola-blue)] to-transparent opacity-90"
            aria-hidden="true"
          />

          {/* Technical Micro-Dots Texture */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(#e2e4e9_1px,transparent_1px)] [background-size:14px_14px] dark:bg-[radial-gradient(#26282e_1px,transparent_1px)] opacity-60"
            aria-hidden="true"
          />

          {/* Subtle Ambient Radial Light */}
          <div
            className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 bg-[radial-gradient(circle,var(--ola-blue),transparent_70%)] opacity-10 blur-3xl"
            aria-hidden="true"
          />

          {/* ===================================================================== */}
          {/* LEFT SIDE (60%): Identity, Hierarchy, Academic Formation & Tech Stack */}
          {/* ===================================================================== */}
          <div className="relative z-10 flex flex-col justify-between h-full w-[60%] pr-6 sm:pr-8 text-left">
            {/* Row 1: Square Photo (w-20/w-24) + Full Name + Handle Badge */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="relative w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden p-[2px] bg-gradient-to-b from-zinc-200 to-zinc-100 dark:from-zinc-700 dark:to-zinc-800 shadow-sm border border-zinc-200/90 dark:border-zinc-700/90 shrink-0">
                <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-zinc-100 dark:bg-zinc-800">
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
                <h1 className="text-2xl sm:text-[26px] font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
                  {profileData.fullName}
                </h1>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-mono font-bold text-[var(--ola-blue)] px-2 py-0.5 rounded-md bg-[var(--surface-hover)] border border-[var(--border)]">
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

            {/* Row 2: Featured Role */}
            <div className="pt-2">
              <p className="text-base sm:text-lg font-bold text-[var(--ola-blue)] tracking-tight">
                {profileData.title}
              </p>
            </div>

            {/* Row 3: Exact Academic Degree in 2 Clean Lines */}
            <div className="space-y-0.5 text-xs sm:text-sm leading-snug py-1">
              <p className="font-semibold text-zinc-800 dark:text-zinc-200">
                Técnico en Ingeniería en Computación
              </p>
              <p className="font-medium text-zinc-500 dark:text-zinc-400">
                Estudiante de Ing. en Ciencias de la Computación (UDB)
              </p>
            </div>

            {/* Row 4: Technical Pills Block */}
            <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
              {["TypeScript", "Next.js", "IA", "Architecture", "Docker"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 sm:px-3 py-1 text-xs font-mono font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200/90 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* ===================================================================== */}
          {/* RIGHT SIDE (40%): Floating Bento QR Box, Contacts & Ecosystem Tag    */}
          {/* ===================================================================== */}
          <div className="relative z-10 flex flex-col justify-between items-center h-full w-[40%] pl-6 sm:pl-7 border-l border-zinc-200/70 dark:border-zinc-800/80 text-center">
            {/* Top / Center: Floating Bento QR Container */}
            <div className="w-full flex-1 flex flex-col items-center justify-center my-auto">
              <div className="p-3 rounded-2xl bg-white shadow-md border border-zinc-200 dark:border-zinc-300 flex items-center justify-center">
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
              <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 mt-1.5 font-medium tracking-tight">
                Escanea para conectar
              </span>
            </div>

            {/* Compact Direct Channels Stack */}
            <div className="w-full space-y-1.5 pt-3 text-left">
              <a
                href="https://olabsv.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-[var(--ola-blue)] transition-colors truncate"
              >
                <Globe className="w-3.5 h-3.5 text-[var(--ola-blue)] shrink-0" />
                <span className="font-mono font-semibold truncate">olabsv.com</span>
              </a>

              <a
                href="mailto:oelias@olabsv.com"
                className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-[var(--ola-blue)] transition-colors truncate"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--ola-blue)] shrink-0" />
                <span className="font-mono font-semibold truncate">oelias@olabsv.com</span>
              </a>

              <a
                href="https://www.linkedin.com/in/oscarelias2004"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-[#0077b5] transition-colors truncate"
              >
                <LinkedinIcon className="w-3.5 h-3.5 text-[#0077b5] shrink-0" />
                <span className="font-mono truncate">in/oscarelias2004</span>
              </a>

              <a
                href="https://tiktok.com/@byelias_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-[var(--ola-blue)] transition-colors truncate"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="font-mono font-semibold truncate">@byelias_</span>
              </a>
            </div>

            {/* Microtext Footer Badge */}
            <div className="w-full pt-2.5 mt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
              <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                OlaLabs Ecosystem • Verified ID
              </span>
            </div>
          </div>
        </div>

        {/* Informative Footer note on screen (No Print) */}
        <p className="text-center text-xs text-[var(--muted)] mt-5 no-print">
          Estilo Developer Credential (3.5″ × 2″) • Textura técnica unificada de alta precisión • Optimizado para impresión física o portapapeles
        </p>
      </div>
    </div>
  );
}
