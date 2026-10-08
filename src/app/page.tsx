"use client";

import React, { useState } from "react";
import { CardHeader } from "@/components/CardHeader";
import { FeaturedProject } from "@/components/FeaturedProject";
import { LinkStream } from "@/components/LinkStream";
import { TechPills } from "@/components/TechPills";
import { CardFooter } from "@/components/CardFooter";
import { QrModal } from "@/components/QrModal";

export default function HomePage() {
  const [isQrOpen, setIsQrOpen] = useState(false);

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-x-hidden bg-zinc-950">
      {/* Ambient Top Glow Spotlight (Linear / Vercel Aesthetic) */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-white/10 via-white/5 to-transparent blur-3xl rounded-full"
        aria-hidden="true"
      />

      {/* Subtle radial corner highlights */}
      <div
        className="pointer-events-none absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/5 blur-3xl rounded-full"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/5 blur-3xl rounded-full"
        aria-hidden="true"
      />

      {/* Main Presentation Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-zinc-900/40 border border-zinc-800/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
        {/* Profile Header & Primary Quick Actions */}
        <CardHeader onOpenQr={() => setIsQrOpen(true)} />

        {/* Featured Venture (olabsv.com) */}
        <FeaturedProject />

        {/* Links & Social Streams */}
        <LinkStream />

        {/* Engineering Competencies & Stack */}
        <TechPills />

        {/* Minimal Signature Footer */}
        <CardFooter />
      </div>

      {/* Interactive QR Code Modal */}
      <QrModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />
    </main>
  );
}
