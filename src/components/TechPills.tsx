import React from "react";
import { profileData } from "@/data/profile";

export const TechPills: React.FC = () => {
  return (
    <section className="w-full">
      <div className="flex items-center justify-between px-1 mb-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
          Enfoque Técnico
        </span>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {profileData.skills.map((skill) => (
          <span
            key={skill}
            className="px-2.5 py-1 text-xs font-medium rounded-lg bg-zinc-900/80 border border-zinc-800/90 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors duration-150"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};
