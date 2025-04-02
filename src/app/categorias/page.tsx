'use client';

import Link from 'next/link';
import useProducts from '../../hooks/useProducts';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default function CategoriesPage() {
  const { products} = useProducts();
  return (
      <>
    <Header />
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-900 relative overflow-hidden p-6 md:p-8 lg:p-12">
      <h1 className="text-3xl font-bold mb-6 text-amber-50">Todas las categorías</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((category) => (
          <Link 
            key={category.id} 
            href={`/search?category=${category.categoria}`}
            className="bg-white/90 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm border border-purple-200/20"
          >
            <h2 className="text-xl font-bold text-purple-900 group-hover:text-indigo-700 transition-colors duration-200">{category.categoria}</h2>
          </Link>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
}