import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/global/navbar";
import { Toaster } from "@/components/ui/toaster";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Clinica W",
  description: "Cotizador",
  openGraph: {
    title: "Clinica W - Cotizador",
    description: "Cotizador de servicios de Clinica W",
    url: "https://www.sopranow.com",
    type: "website",
    images: [
      {
        url: "https://www.clinicaw.com.ar/wp-content/uploads/2022/09/LOGO-CLINICA-W.jpg",
        width: 1200,
        height: 630,
        alt: "Descripción de la imagen",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
