"use client";

import React, { useState } from "react";
import { CardHeader } from "@/components/CardHeader";
import { FeaturedProject } from "@/components/FeaturedProject";
import { LinkStream } from "@/components/LinkStream";
import { EmailModule } from "@/components/EmailModule";
import { TechPills } from "@/components/TechPills";
import { CardFooter } from "@/components/CardFooter";
import { QrModal } from "@/components/QrModal";
import { FloatingNav } from "@/components/FloatingNav";

export default function HomePage() {
  const [isQrOpen, setIsQrOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between pt-12 pb-24 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      {/* Enhanced Atmospheric Ambient Glow (OlaStudio Blue Atmosphere) */}
      <div
        className="pointer-events-none fixed -top-36 left-1/2 -translate-x-1/2 w-[1000px] sm:w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0071e3]/25 via-[#fbfbfd]/40 to-[#fbfbfd] dark:from-[#2997ff]/30 dark:via-[#000000]/60 dark:to-[#000000] blur-[110px] sm:blur-[130px]"
        aria-hidden="true"
      />

      {/* Technical Micro-Dots Grid Layer on Full Page Background */}
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(#d2d5dc_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#26282e_1px,transparent_1px)] opacity-75"
        aria-hidden="true"
      />

      {/* Floating Navigation Pill (i18n [ES | EN] + Theme Switcher) */}
      <FloatingNav />

      {/* Main Adaptive Layout */}
      <main className="relative z-10 w-full my-auto">
        {/* MOBILE LAYOUT (< 1024px): Single Centered Vertical Bento (max-w-md) */}
        <div className="lg:hidden w-full max-w-md mx-auto bg-white/90 dark:bg-[#16181d]/90 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl rounded-3xl p-7 sm:p-9 relative overflow-hidden">
          {/* Subtle 2px Top Accent Line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--ola-blue)] to-transparent opacity-80"
            aria-hidden="true"
          />
          {/* Subtle Internal Micro-Dots Texture with Mask */}
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(#d2d5dc_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#26282e_1px,transparent_1px)] opacity-35 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
            aria-hidden="true"
          />
          <div className="relative z-10 space-y-7">
            <CardHeader onOpenQr={() => setIsQrOpen(true)} />
            <FeaturedProject />
            <LinkStream />
            <EmailModule />
            <TechPills />
            <CardFooter />
          </div>
        </div>

        {/* DESKTOP LAYOUT (>= 1024px): Balanced 2-Column Split-Screen / Bento (max-w-5xl) */}
        <div className="hidden lg:grid grid-cols-12 max-w-5xl mx-auto gap-8 lg:gap-10 items-start">
          {/* Left Column: Fixed / Sticky Profile Information & Tech Stack (5 cols) */}
          <div className="col-span-5 sticky top-8 bg-white/90 dark:bg-[#16181d]/90 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 rounded-3xl p-8 sm:p-9 shadow-xl relative overflow-hidden">
            {/* Subtle 2px Top Accent Line */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--ola-blue)] to-transparent opacity-80"
              aria-hidden="true"
            />
            {/* Subtle Internal Micro-Dots Texture with Mask */}
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(#d2d5dc_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#26282e_1px,transparent_1px)] opacity-35 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]"
              aria-hidden="true"
            />
            <div className="relative z-10 space-y-7">
              <CardHeader onOpenQr={() => setIsQrOpen(true)} />
              <div className="pt-5 border-t border-[var(--border)]/60">
                <TechPills />
              </div>
            </div>
          </div>

          {/* Right Column: Stacked Content Blocks (7 cols) */}
          <div className="col-span-7 space-y-7">
            <FeaturedProject />
            <LinkStream />
            <EmailModule />
            <CardFooter />
          </div>
        </div>
      </main>

      {/* Interactive QR Code Modal */}
      <QrModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} />
    </div>
  );
}
