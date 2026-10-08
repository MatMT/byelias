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
  descriptionEs: string;
  descriptionEn: string;
  url: string;
}

export interface EmailContactItem {
  id: "work" | "personal" | "icloud";
  typeKey: "workLabel" | "personalLabel" | "icloudLabel";
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
    "Técnico en Ingeniería en Ciencias de la Computación y estudiante activo de Ingeniería (UDB). Apasionado por la tecnología, el software escalable y la comunicación digital. Fundador en OlaLabs.",
  bioEn:
    "Associate Degree (Técnico) in Computer Science & active Engineering Student @ UDB. Passionate about software architecture, modern web and tech storytelling. Founder at OlaLabs.",
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
      descriptionEs: "Logros profesionales, proyectos y networking",
      descriptionEn: "Professional achievements, projects & network",
      url: "https://www.linkedin.com/in/oscarelias2004",
    },
    {
      id: "tiktok",
      title: "TikTok",
      handle: "@byelias_",
      badgeEs: "Tech & Vida UDB",
      badgeEn: "Vlog & Tech",
      descriptionEs: "Anécdotas, eventos en la UDB, reflexiones y tecnología",
      descriptionEn: "Tech stories, UDB university life & engineering events",
      url: "https://tiktok.com/@byelias_",
    },
    {
      id: "instagram",
      title: "Instagram",
      handle: "@byelias._",
      badgeEs: "Personal",
      badgeEn: "Lifestyle",
      descriptionEs: "Vida personal, fotos, historias y momentos cotidianos",
      descriptionEn: "Personal updates, daily life, and stories",
      url: "https://instagram.com/byelias._",
    },
  ],
  emails: [
    {
      id: "work",
      typeKey: "workLabel",
      email: "oelias@olabsv.com",
      isPrimary: true,
    },
    {
      id: "personal",
      typeKey: "personalLabel",
      email: "oscarmateoelias@gmail.com",
    },
    {
      id: "icloud",
      typeKey: "icloudLabel",
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
