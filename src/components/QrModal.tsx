"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { X, Copy, Check, Download } from "lucide-react";
import { profileData } from "@/data/profile";
import { useLanguage } from "@/context/LanguageContext";

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const [qrUrl, setQrUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const targetUrl = typeof window !== "undefined" ? window.location.href : profileData.domain;

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(targetUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      })
        .then((url) => setQrUrl(url))
        .catch(console.error);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, targetUrl, onClose]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownloadQr = () => {
    if (!qrUrl) return;
    const a = document.createElement("a");
    a.href = qrUrl;
    a.download = `${profileData.name.toLowerCase()}-qr.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl bg-[var(--card-bg)] border border-[var(--border)] p-6 shadow-2xl transition-all duration-200 active:scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label={t.actions.close}
          className="absolute top-4 right-4 p-2 rounded-xl text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <h2 id="qr-modal-title" className="text-lg font-bold text-[var(--foreground)] tracking-tight mb-1">
            {t.qrModal.title}
          </h2>
          <p className="text-xs text-[var(--muted)] mb-5 max-w-xs">
            {t.qrModal.description}
          </p>

          {/* QR Code Container */}
          <div className="p-3.5 bg-white rounded-2xl shadow-md border border-zinc-200 mb-6">
            {qrUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrUrl}
                alt="Código QR de contacto"
                className="w-48 h-48 rounded-lg"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center text-zinc-600 font-mono text-xs">
                ...
              </div>
            )}
          </div>

          {/* Modal Actions */}
          <div className="flex items-center gap-2 w-full">
            <button
              onClick={handleCopy}
              type="button"
              className="flex-1 min-h-[44px] flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[var(--foreground)] bg-[var(--surface-hover)] hover:bg-[var(--border)]/40 border border-[var(--border)] transition-all active:scale-[0.98] cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-500">{t.actions.copied}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[var(--muted)]" />
                  <span>{t.actions.copyLink}</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadQr}
              type="button"
              className="flex-1 min-h-[44px] flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-white bg-[var(--ola-blue)] hover:opacity-90 transition-all active:scale-[0.98] cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" />
              <span>{t.actions.downloadQr}</span>
            </button>
          </div>

          <a
            href="/card"
            className="w-full mt-2.5 min-h-[42px] flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[var(--muted)] hover:text-[var(--foreground)] bg-[var(--surface-hover)] border border-[var(--border)] transition-all active:scale-[0.98]"
          >
            <svg
              className="w-4 h-4 text-[var(--ola-blue)]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <line x1="2" x2="22" y1="10" y2="10" />
            </svg>
            <span>Ver Tarjeta Física para Imprimir (3.5″ × 2″)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
