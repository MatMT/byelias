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
    <div className="relative min-h-screen w-full flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      {/* Ambient Top Glow Spotlight & Apple Mesh */}
      <div
        className="pointer-events-none fixed -top-48 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-[var(--ola-blue)]/10 via-[var(--ola-blue)]/5 to-transparent blur-3xl rounded-full"
        aria-hidden="true"
      />
      <div className="pointer-events-none fixed inset-0 bg-mesh-pattern" aria-hidden="true" />

      {/* Floating Navigation Pill (i18n [ES | EN] + Theme Switcher) */}
      <FloatingNav />

      {/* Main Adaptive Layout */}
      <main className="relative z-10 w-full my-auto">
        {/* MOBILE LAYOUT (< 1024px): Single Centered Vertical Bento (max-w-md) */}
        <div className="lg:hidden w-full max-w-md mx-auto apple-card rounded-3xl p-7 sm:p-9 space-y-7">
          <CardHeader onOpenQr={() => setIsQrOpen(true)} />
          <FeaturedProject />
          <LinkStream />
          <EmailModule />
          <TechPills />
          <CardFooter />
        </div>

        {/* DESKTOP LAYOUT (>= 1024px): Balanced 2-Column Split-Screen / Bento (max-w-5xl) */}
        <div className="hidden lg:grid grid-cols-12 max-w-5xl mx-auto gap-8 lg:gap-10 items-start">
          {/* Left Column: Fixed / Sticky Profile Information & Tech Stack (5 cols) */}
          <div className="col-span-5 sticky top-8 apple-card rounded-3xl p-8 sm:p-9 space-y-7 shadow-xl">
            <CardHeader onOpenQr={() => setIsQrOpen(true)} />
            <div className="pt-5 border-t border-[var(--border)]/60">
              <TechPills />
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
