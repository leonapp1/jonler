'use client';

import ProductCard from './ProductCard';
import useProducts from '../hooks/useProducts';
import { useState } from 'react';

interface ProductGridProps {
  category?: string;
  searchTerm?: string;
}

export default function ProductGrid({ category, searchTerm }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const { products, loading } = useProducts(category, searchTerm);
  
  // Pagination calculations
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex flex-wrap flex-row gap-2 p-2">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-100 animate-pulse h-[300px] sm:h-[400px] rounded-xl"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4
        gap-2 sm:gap-3 md:gap-4 lg:gap-5
        p-2 sm:p-3 md:p-4 lg:p-5
        mx-auto max-w-[2000px]
        animate-fadeIn">
        {paginatedProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product}
          />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 pb-8">
        <button
          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full 
                   disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
        >
          Anterior
        </button>
        
        <span className="text-gray-700 font-medium">
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
          disabled={currentPage === totalPages || products.length === 0}
          className="px-6 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full 
                   disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transition-transform"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}