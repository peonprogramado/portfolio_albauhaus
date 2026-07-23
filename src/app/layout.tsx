
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "./components/CustomCursor";
import BasicLoading from "./components/BasicLoading";
import { Providers } from "./providers";
import ScrollbarFix from "./components/ScrollbarFix";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://albaanton.blog'),
  title: "Alba Antón - Portfolio",
  description: "Diseño innovador, sintético y accesible. Un lenguaje visual creativo enfocado en la funcionalidad.",
  icons: {
    icon: [{ url: '/images/Favicon.png', type: 'image/png', sizes: '48x48' }],
    shortcut: '/images/Favicon.png',
    apple: '/images/Favicon.png',
  },
  openGraph: {
    title: "Alba Antón - Portfolio",
    description: "Diseño innovador, sintético y accesible. Un lenguaje visual creativo enfocado en la funcionalidad.",
    url: "https://albaanton.blog",
    siteName: "Alba Antón - Portfolio",
    locale: "es_ES",
    type: "website",
    images: [
      {
        url: '/images/capturalink/preview.png',
        width: 1200,
        height: 630,
        alt: 'Alba Antón Portfolio - Diseño innovador y accesible',
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alba Antón - Portfolio",
    description: "Diseño innovador, sintético y accesible. Un lenguaje visual creativo enfocado en la funcionalidad.",
    images: ['/images/capturalink/preview.png'],
  },
};// ...existing code...
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
        />
        <link
          rel="preload"
          href="https://res.cloudinary.com/dr6lvwubh/raw/upload/v1529908256/CompressaPRO-GX.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ScrollbarFix />
          <BasicLoading>
            <CustomCursor />
            {children}
          </BasicLoading>
        </Providers>
      </body>
    </html>
  );
}
