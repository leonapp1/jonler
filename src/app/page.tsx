import ProductGrid from "@/components/ProductGrid";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
     
      
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
