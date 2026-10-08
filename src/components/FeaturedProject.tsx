import React from "react";
import { ArrowUpRight, Sparkles, Globe } from "lucide-react";
import { profileData } from "@/data/profile";

export const FeaturedProject: React.FC = () => {
  const featured = profileData.links.find((l) => l.featured);

  if (!featured) return null;

  return (
    <section className="w-full">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-amber-400" />
          Venture Destacado
        </span>
        <span className="text-[10px] text-zinc-500 font-mono">v1.0 Live</span>
      </div>

      <a
        href={featured.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block w-full p-4 rounded-2xl bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 border border-zinc-800/90 hover:border-zinc-700 transition-all duration-200 active:scale-[0.98] shadow-lg overflow-hidden min-h-[64px]"
      >
        {/* Subtle hover gradient illumination */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-zinc-200 group-hover:text-white group-hover:border-zinc-600 transition-colors duration-200">
              <Globe className="w-5 h-5" />
            </div>

            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-200">
                  {featured.title}
                </span>
                <span className="px-1.5 py-0.2 text-[9px] font-mono rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  Online
                </span>
              </div>
              <p className="text-xs text-zinc-400 tracking-tight">
                {featured.subtitle}
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-lg bg-zinc-850 flex items-center justify-center text-zinc-400 group-hover:text-white transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </a>
    </section>
  );
};
