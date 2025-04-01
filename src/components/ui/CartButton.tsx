'use client';

import { ShoppingCart } from 'lucide-react';

interface CartButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}
export default function CartButton({ onClick, children }: CartButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="inline-flex items-center justify-center gap-1 sm:gap-2 text-white 
      bg-purple-700 hover:bg-purple-800 
      focus:outline-none focus:ring-4
      focus:ring-purple-300 font-medium rounded-full 
      text-xs sm:text-sm 
      px-3 sm:px-5 py-2 sm:py-2.5
      text-center transition-all duration-200 
      w-full sm:w-auto
      mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 
      dark:focus:ring-purple-900
      hover:shadow-lg"
      aria-label="Carrito de Compras"
    >
      <ShoppingCart 
        size={16} 
        className="text-white transition-transform group-hover:scale-105
        w-4 sm:w-[18px] h-4 sm:h-[18px]" 
      />
      <span className="font-medium tracking-wide truncate">{children}</span>
    </button>
  );
}