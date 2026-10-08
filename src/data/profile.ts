export interface ProjectItem {
  id: string;
  title: string;
  badge: string;
  url: string;
  subtitleEs: string;
  subtitleEn: string;
  status: string;
  isPrimary?: boolean;
}

export interface SocialLinkItem {
  id: string;
  title: string;
  handle?: string;
  badgeEs: string;
  badgeEn: string;
  url: string;
}

export interface EmailContactItem {
  id: "work" | "personal" | "icloud";
  labelEs: string;
  labelEn: string;
  email: string;
  isPrimary?: boolean;
}

export interface ProfileData {
  name: string;
  handle: string;
  fullName: string;
  title: string;
  bioEs: string;
  bioEn: string;
  domain: string;
  avatarUrl: string;
  github: string;
  projects: ProjectItem[];
  socialLinks: SocialLinkItem[];
  emails: EmailContactItem[];
  coreSkills: string[];
  moreSkills: string[];
}

export const profileData: ProfileData = {
  name: "Elías",
  handle: "@byelias",
  fullName: "Oscar Mateo Elías López",
  title: "Lead Software Developer & Tech Builder",
  bioEs:
    "Técnico en CC. de la Computación & estudiante de Ingeniería (UDB). Creando software y divulgando tecnología. Fundador en OlaLabs.",
  bioEn:
    "CS Associate & Engineering Student @ UDB. Building software & tech content. Founder at OlaLabs.",
  domain: "https://olabsv.com",
  avatarUrl: "https://github.com/MatMT.png",
  github: "https://github.com/MatMT",
  projects: [
    {
      id: "olalabs",
      title: "OlaLabs",
      badge: "Startup",
      url: "https://olabsv.com",
      subtitleEs: "Laboratorio y desarrollo de soluciones tecnológicas",
      subtitleEn: "Tech lab & software ventures",
      status: "Live",
      isPrimary: true,
    },
    {
      id: "olastudio",
      title: "OlaStudio",
      badge: "E-commerce",
      url: "https://olabsv.com",
      subtitleEs: "Tienda en línea oficial",
      subtitleEn: "Official online store",
      status: "Online",
    },
  ],
  socialLinks: [
    {
      id: "linkedin",
      title: "LinkedIn",
      badgeEs: "Carrera",
      badgeEn: "Career",
      url: "https://www.linkedin.com/in/oscarelias2004",
    },
    {
      id: "tiktok",
      title: "TikTok",
      handle: "@byelias_",
      badgeEs: "Tech & Vida UDB",
      badgeEn: "Vlog & Tech",
      url: "https://tiktok.com/@byelias_",
    },
    {
      id: "instagram",
      title: "Instagram",
      handle: "@byelias._",
      badgeEs: "Personal",
      badgeEn: "Lifestyle",
      url: "https://instagram.com/byelias._",
    },
  ],
  emails: [
    {
      id: "work",
      labelEs: "Trabajo / OlaLabs",
      labelEn: "Work / OlaLabs",
      email: "oelias@olabsv.com",
      isPrimary: true,
    },
    {
      id: "personal",
      labelEs: "Personal",
      labelEn: "Personal",
      email: "oscarmateoelias@gmail.com",
    },
    {
      id: "icloud",
      labelEs: "iCloud",
      labelEn: "iCloud",
      email: "oscarmateoelias@icloud.com",
    },
  ],
  coreSkills: [
    "TypeScript",
    "Next.js / React",
    "Inteligencia Artificial (IA)",
    "Systems Architecture",
    "Design Engineering",
    "Node.js",
    "Docker",
  ],
  moreSkills: [
    "Python",
    "Tailwind CSS",
    "PostgreSQL",
    "Cloud Architecture",
    "Git & CI/CD",
    "Apple HIG",
  ],
};
