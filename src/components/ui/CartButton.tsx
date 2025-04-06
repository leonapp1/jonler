"use client";

import { ShoppingCart } from "lucide-react";

interface CartButtonProps {
	onClick: () => void;
	children: React.ReactNode;
}
export default function CartButton({ onClick, children }: CartButtonProps) {
	return (
<button
    onClick={onClick}
    className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500
     text-purple-950 px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-base sm:text-lg
      font-bold shadow-xl sm:shadow-2xl hover:shadow-yellow-400/50 transform
       hover:scale-105 sm:hover:scale-110 hover:-translate-y-1 transition-all 
       duration-300 flex items-center justify-center gap-2 sm:gap-3 
       hover:bg-gradient-to-l relative overflow-hidden group w-full sm:w-auto cursor-pointer
       active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
    aria-label="Carrito de Compras"
>
    <span className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 to-transparent transform -skew-x-12 transition-transform group-hover:translate-x-full duration-500 ease-in-out"></span>
    <ShoppingCart 
        size={4} 
        className="animate-bounce-subtle group-hover:rotate-12 transition-transform duration-300 size-6 group-hover:scale-105" 
    />
    <span className="text-xl relative z-10 group-hover:tracking-wide transition-all duration-300 group-hover:text-purple-900">{children}</span>
</button>
);
}
