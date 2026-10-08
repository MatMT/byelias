import { profileData } from "@/data/profile";

export function generateAndDownloadVCard() {
  const vcard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${profileData.fullName}`,
    `N:López;Oscar;Mateo Elías;;`,
    `NICKNAME:${profileData.handle}`,
    `TITLE:${profileData.title}`,
    `ORG:OlaLabs`,
    `EMAIL;TYPE=INTERNET,WORK;TYPE=PREF:${profileData.emails[0].email}`,
    `EMAIL;TYPE=INTERNET,HOME:${profileData.emails[1].email}`,
    `URL:${profileData.domain}`,
    `NOTE:${profileData.bioEs}`,
    "END:VCARD",
  ].join("\r\n");

  const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${profileData.handle.replace("@", "")}-contact.vcf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
