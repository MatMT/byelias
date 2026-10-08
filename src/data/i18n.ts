export type Locale = "es" | "en";

export interface TranslationDictionary {
  availability: {
    status: string;
    subtext: string;
  };
  role: string;
  actions: {
    saveContact: string;
    showQr: string;
    copyEmail: string;
    copied: string;
    visitSite: string;
    sendEmail: string;
    close: string;
    downloadQr: string;
    copyLink: string;
    moreSkills: string;
    lessSkills: string;
  };
  sections: {
    projectsAndVentures: string;
    channels: string;
    directContact: string;
    techFocus: string;
    linksCount: (count: number) => string;
  };
  emailModule: {
    title: string;
    subtitle: string;
    primaryAction: string;
    workLabel: string;
    personalLabel: string;
    icloudLabel: string;
    clickToCopy: string;
    copiedTooltip: string;
  };
  qrModal: {
    title: string;
    description: string;
  };
  footer: {
    rights: string;
    title: string;
  };
}

export const translations: Record<Locale, TranslationDictionary> = {
  es: {
    availability: {
      status: "Disponible",
      subtext: "Disponible para proyectos & consultoría",
    },
    role: "Lead Software Developer & Tech Builder",
    actions: {
      saveContact: "Guardar Contacto",
      showQr: "Código QR",
      copyEmail: "Copiar Email",
      copied: "¡Copiado!",
      visitSite: "Visitar",
      sendEmail: "Escribir Correo",
      close: "Cerrar",
      downloadQr: "Descargar QR",
      copyLink: "Copiar Enlace",
      moreSkills: "+ Más",
      lessSkills: "− Menos",
    },
    sections: {
      projectsAndVentures: "Proyectos & Emprendimientos",
      channels: "Canales & Redes",
      directContact: "Contacto Directo",
      techFocus: "Especialidades Técnicas",
      linksCount: (count: number) => `${count} perfiles`,
    },
    emailModule: {
      title: "Contacto por Correo",
      subtitle: "Selecciona el canal según el propósito de tu mensaje:",
      primaryAction: "Enviar Correo Principal",
      workLabel: "Trabajo / Proyectos",
      personalLabel: "Personal",
      icloudLabel: "iCloud / Direct",
      clickToCopy: "Clic para copiar",
      copiedTooltip: "¡Copiado al portapapeles!",
    },
    qrModal: {
      title: "Tarjeta Digital en QR",
      description: "Escanea con la cámara de tu teléfono para abrir esta tarjeta de presentación al instante.",
    },
    footer: {
      rights: "Todos los derechos reservados.",
      title: "Lead Software Developer & Tech Builder",
    },
  },
  en: {
    availability: {
      status: "Available",
      subtext: "Available for projects & consulting",
    },
    role: "Lead Software Developer & Tech Builder",
    actions: {
      saveContact: "Save Contact",
      showQr: "QR Code",
      copyEmail: "Copy Email",
      copied: "Copied!",
      visitSite: "Visit",
      sendEmail: "Send Email",
      close: "Close",
      downloadQr: "Download QR",
      copyLink: "Copy Link",
      moreSkills: "+ More",
      lessSkills: "− Less",
    },
    sections: {
      projectsAndVentures: "Projects & Ventures",
      channels: "Channels & Socials",
      directContact: "Direct Contact",
      techFocus: "Technical Focus",
      linksCount: (count: number) => `${count} profiles`,
    },
    emailModule: {
      title: "Email Contact",
      subtitle: "Select the direct channel that best fits your inquiry:",
      primaryAction: "Send Primary Email",
      workLabel: "Work / Projects",
      personalLabel: "Personal",
      icloudLabel: "iCloud / Direct",
      clickToCopy: "Click to copy",
      copiedTooltip: "Copied to clipboard!",
    },
    qrModal: {
      title: "Digital Card QR",
      description: "Scan with your phone's camera to instantly open and share this presentation card.",
    },
    footer: {
      rights: "All rights reserved.",
      title: "Lead Software Developer & Tech Builder",
    },
  },
};
