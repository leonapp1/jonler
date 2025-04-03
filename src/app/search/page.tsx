'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import ProductGrid from '@/components/ProductGrid';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function SearchResults() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-900 relative overflow-hidden p-6 md:p-8 lg:p-12 mt-32 md:mt-10">
      <h1 className="text-2xl font-bold mb-6 text-white">Resultados de búsqueda para: {searchTerm} {category}</h1>
      <ProductGrid searchTerm={searchTerm} category={category} />
    </div>
  );
}

export default function SearchPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Cargando...</div>}>
        <SearchResults />
      </Suspense>
      <Footer />
    </>
  );
}