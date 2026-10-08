"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { X, Copy, Check, Download } from "lucide-react";
import { profileData } from "@/data/profile";

interface QrModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QrModal: React.FC<QrModalProps> = ({ isOpen, onClose }) => {
  const [qrUrl, setQrUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const targetUrl = typeof window !== "undefined" ? window.location.href : profileData.domain;

  useEffect(() => {
    if (isOpen) {
      QRCode.toDataURL(targetUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: "#09090b",
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl bg-zinc-950 border border-zinc-800 p-6 shadow-2xl transition-all duration-200 active:scale-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          aria-label="Cerrar modal"
          className="absolute top-4 right-4 p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center text-center">
          <h2 id="qr-modal-title" className="text-lg font-bold text-white tracking-tight mb-1">
            Código QR de Presentación
          </h2>
          <p className="text-xs text-zinc-400 mb-6">
            Escanea para acceder a esta tarjeta digital al instante.
          </p>

          {/* QR Code Container */}
          <div className="p-3 bg-white rounded-2xl shadow-inner mb-6">
            {qrUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrUrl}
                alt="Código QR de contacto"
                className="w-48 h-48 rounded-lg"
              />
            ) : (
              <div className="w-48 h-48 flex items-center justify-center text-zinc-600 font-mono text-xs">
                Generando...
              </div>
            )}
          </div>

          {/* Modal Actions */}
          <div className="flex items-center gap-2 w-full">
            <button
              onClick={handleCopy}
              type="button"
              className="flex-1 min-h-[44px] flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 transition-all active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copiado</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-zinc-300" />
                  <span>Copiar Link</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadQr}
              type="button"
              className="flex-1 min-h-[44px] flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-all active:scale-[0.98]"
            >
              <Download className="w-4 h-4 text-zinc-300" />
              <span>Guardar QR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
