export interface ProfileLink {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  featured?: boolean;
}

export interface ProfileData {
  name: string;
  fullName: string;
  title: string;
  tagline: string;
  availability: string;
  email: string;
  domain: string;
  avatarUrl: string;
  github: string;
  links: ProfileLink[];
  skills: string[];
}

export const profileData: ProfileData = {
  name: "Elías",
  fullName: "Oscar Mateo Elías",
  title: "Lead Software Developer",
  tagline: "Computer Science Engineer | Building scalable software & modern web experiences",
  availability: "Available for projects",
  email: "oscarmateoelias@gmail.com",
  domain: "https://olabsv.com",
  avatarUrl: "https://github.com/MatMT.png",
  github: "https://github.com/MatMT",
  links: [
    {
      id: "website",
      title: "olabsv.com",
      subtitle: "Official Website & Labs",
      url: "https://olabsv.com",
      featured: true,
    },
    {
      id: "linkedin",
      title: "LinkedIn",
      subtitle: "Professional Profile & Experience",
      url: "https://www.linkedin.com/in/oscarelias2004",
    },
    {
      id: "tiktok",
      title: "TikTok",
      subtitle: "@byelias_ • Tech, Engineering & Code",
      url: "https://tiktok.com/@byelias_",
    },
    {
      id: "instagram",
      title: "Instagram",
      subtitle: "@byelias._ • Updates & Builds",
      url: "https://instagram.com/byelias._",
    },
    {
      id: "contact",
      title: "Email Contact",
      subtitle: "oscarmateoelias@gmail.com",
      url: "mailto:oscarmateoelias@gmail.com",
    },
  ],
  skills: [
    "TypeScript",
    "Next.js / React",
    "Systems Architecture",
    "Design Engineering",
    "Node.js",
    "Docker",
    "High Craft UI",
  ],
};
