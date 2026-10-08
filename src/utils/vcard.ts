import { profileData } from "@/data/profile";

export function generateAndDownloadVCard() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${profileData.fullName}`,
    `N:Elías;Oscar;Mateo;;`,
    `NICKNAME:${profileData.name}`,
    `TITLE:${profileData.title}`,
    `ORG:OLabs`,
    `EMAIL;TYPE=INTERNET,WORK:${profileData.email}`,
    `URL:${profileData.domain}`,
    `NOTE:${profileData.tagline}`,
    "END:VCARD",
  ].join("\r\n");

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${profileData.name.toLowerCase()}-contact.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
