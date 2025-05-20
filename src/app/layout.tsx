import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from '@/context/CartContext';
import Script from "next/script";

// Tipografías personalizadas
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO y OpenGraph metadata optimizados
export const metadata: Metadata = {
  title: "Regalos Personalizados en Ayacucho | Jonler",
  description: "Regalos personalizados en Ayacucho: crea tazas personalizadas, cuadros decorativos, gift boxes, rompecabezas, camisetas, y más. Encuentra el detalle perfecto para cumpleaños, aniversarios, eventos especiales o regalos corporativos. En Jonler ofrecemos productos únicos, de calidad, hechos a mano y con diseños originales. Sorprende con un regalo que realmente marque la diferencia.",
  keywords: [
    "regalos personalizados Ayacucho",
    "tienda online regalos",
    "Jonler",
    "tazas personalizadas",
    "ropa personalizada",
    "cuadros decorativos",
    "accesorios únicos",
    "detalles para eventos",
    "productos hechos a mano",
    "regalos originales",
    "regalos corporativos"
  ],
  openGraph: {
    title: "Regalos Personalizados en Ayacucho | Jonler",
    description: "Descubre los mejores regalos personalizados en Ayacucho. Productos únicos y de calidad hechos con amor.",
    url: "https://jonler.vercel.app/",
    siteName: "Jonler",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Regalos Personalizados en Jonler - Ayacucho",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Regalos Personalizados en Ayacucho | Jonler",
    description: "Regalos únicos, artesanales y de calidad. Hechos en Ayacucho, Perú. Descubre nuestra tienda.",
    images: ["/images/og-image.jpg"],
    site: "@jonler_store", // Si tienes Twitter
  },
  metadataBase: new URL("https://jonler.vercel.app"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta name="author" content="Jonler" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-72LYFF3TWB"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-72LYFF3TWB');
            `,
          }}
        />
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
