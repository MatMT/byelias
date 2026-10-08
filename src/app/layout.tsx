import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Oscar Mateo Elías (Elías) | Lead Software Developer",
  description:
    "Tarjeta de presentación digital de Oscar Mateo Elías (@byelias_). Computer Science Engineer & Lead Software Developer en olabsv.com.",
  authors: [{ name: "Oscar Mateo Elías", url: "https://olabsv.com" }],
  openGraph: {
    title: "Oscar Mateo Elías (Elías) | Lead Software Developer",
    description:
      "Computer Science Engineer | Building scalable software & modern web experiences.",
    url: "https://olabsv.com",
    siteName: "Elías - Digital Card",
    images: [
      {
        url: "https://github.com/MatMT.png",
        width: 400,
        height: 400,
        alt: "Oscar Mateo Elías",
      },
    ],
    locale: "es_SV",
    type: "profile",
  },
  twitter: {
    card: "summary",
    title: "Oscar Mateo Elías (@byelias_)",
    description:
      "Computer Science Engineer & Lead Software Developer.",
    images: ["https://github.com/MatMT.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-zinc-800 selection:text-white">
        {children}
      </body>
    </html>
  );
}
