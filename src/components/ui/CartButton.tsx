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
    className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 text-purple-950 px-4 sm:px-8 py-2.5 sm:py-3.5 rounded-full text-base sm:text-lg font-bold shadow-xl sm:shadow-2xl hover:shadow-yellow-400/50 transform hover:scale-105 sm:hover:scale-110 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 hover:bg-gradient-to-l relative overflow-hidden group w-full sm:w-auto cursor-pointer"
    aria-label="Carrito de Compras"
>
    <span className="absolute inset-0 bg-gradient-to-r from-yellow-200/20 to-transparent transform -skew-x-12 transition-transform group-hover:translate-x-full duration-700"></span>
    <ShoppingCart size={18} className="animate-bounce-subtle group-hover:rotate-12 transition-transform duration-300 sm:size-20" />
    <span className="relative z-10 group-hover:tracking-wider transition-all duration-300">{children}</span>
</button>
);
}
