'use client';

import { useSearchParams } from 'next/navigation';
import ProductGrid from '@/components/ProductGrid';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  
  return (
    <>
      <Header />
      
     
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-900 relative overflow-hidden p-6 md:p-8 lg:p-12">
      <h1 className="text-2xl font-bold mb-6 text-white">Resultados de búsqueda para: {searchTerm} {category}</h1>
      <ProductGrid searchTerm={searchTerm} category={category} />
    </div>
    <Footer />
    </>
  );
}