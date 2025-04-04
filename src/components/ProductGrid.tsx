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
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <svg 
            className="animate-spin h-12 w-12 text-purple-500" 
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span className="text-xl text-purple-300">Cargando productos...</span>
        </div>
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