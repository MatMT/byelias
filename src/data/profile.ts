export interface ProfileLink {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  featured?: boolean;
}

export interface EmailContactItem {
  id: "work" | "personal" | "icloud";
  typeKey: "workLabel" | "personalLabel" | "icloudLabel";
  email: string;
  isPrimary?: boolean;
}

export interface ProfileData {
  name: string;
  fullName: string;
  title: string;
  taglineEs: string;
  taglineEn: string;
  domain: string;
  avatarUrl: string;
  github: string;
  links: ProfileLink[];
  emails: EmailContactItem[];
  skills: string[];
}

export const profileData: ProfileData = {
  name: "Elías",
  fullName: "Oscar Mateo Elías",
  title: "Lead Software Developer",
  taglineEs: "Computer Science Engineer | Building scalable software & modern web experiences",
  taglineEn: "Computer Science Engineer | Building scalable software & modern web experiences",
  domain: "https://olabsv.com",
  avatarUrl: "https://github.com/MatMT.png",
  github: "https://github.com/MatMT",
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
  ],
  skills: [
    "TypeScript",
    "React / Next.js",
    "Systems Architecture",
    "Design Engineering",
    "Node.js",
    "Docker",
    "Apple HIG",
  ],
};
