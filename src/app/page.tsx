import ProductGrid from "@/components/ProductGrid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Jonler - Productos de calidad",
  description: "Descubre nuestra selección de productos premium en Jonler",
  keywords: "productos, tienda online, calidad, jonler, regalos personalizados, decoración hogar, accesorios, artesanía, ropa personalizada, tazas personalizadas, cuadros decorativos, joyería, complementos, regalos corporativos, detalles para eventos, productos exclusivos, diseños únicos, regalos originales, artículos personalizados, merchandising, productos premium",
  openGraph: {
    title: "Jonler - Productos de calidad",
    description: "Descubre nuestra selección de productos premium en Jonler",
    url: "https://jonler.vercel.app/",
    siteName: "Jonler",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jonler - Productos de calidad",
      },
    ],
    locale: "es_ES",
    type: "website",
  }
};

export default function Home() {
  return (
    <>
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
      
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-900 relative overflow-hidden">
        {/* Add animated background particles */}
        <Header />
        <main className="flex-1  mx-auto py-12 sm:px-6 lg:px-8 relative z-10 mt-24 md:mt-10">
          <ProductGrid />
        </main>
        <Footer />
      </div>
    </>
  );
}
