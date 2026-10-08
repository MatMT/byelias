import React from "react";
import { profileData } from "@/data/profile";

export const CardFooter: React.FC = () => {
  return (
    <footer className="w-full pt-8 pb-4 border-t border-zinc-800/60 text-center space-y-2">
      <p className="text-xs text-zinc-400 font-medium">
        © 2026 {profileData.fullName} ({profileData.name})
      </p>
      <div className="flex items-center justify-center gap-3 text-[11px] text-zinc-400">
        <a
          href={profileData.domain}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-zinc-200 transition-colors underline decoration-zinc-800 underline-offset-4"
        >
          olabsv.com
        </a>
        <span>•</span>
        <span>Computer Science Engineer</span>
      </div>
    </footer>
  );
};
