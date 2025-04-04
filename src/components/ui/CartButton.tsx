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
    className="font-medium tracking-wide truncate flex flex-row gap-2 items-center justify-center bg-amber-400 py-2.5 px-5 rounded-full text-indigo-800 text-center cursor-pointer hover:bg-indigo-600 hover:text-amber-100 active:bg-indigo-800 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg active:shadow-sm"
    aria-label="Carrito de Compras"
>
    <ShoppingCart size={18} className="animate-bounce-subtle" />
    {children}
</button>
	);
}
