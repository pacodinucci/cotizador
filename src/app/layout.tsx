import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/global/navbar";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";

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
        url: "https://res.cloudinary.com/ddtpavjz2/image/upload/v1730744851/doblev_hfidr9.jpg",
        width: 1200,
        height: 630,
        alt: "Descripción de la imagen",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/doblev.jpg" />
        </head>
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
    </SessionProvider>
  );
}
