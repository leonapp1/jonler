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
			className="font-medium tracking-wide truncate flex flex-row gap-2 items-center justify-center bg-purple-600 py-2 px-4 rounded-full text-gray-50 text-center cursor-pointer hover:bg-purple-500 active:bg-purple-700 transition-colors duration-300 ease-in-out"
			aria-label="Carrito de Compras"
		>
			<ShoppingCart size={16} className="" />
			{children}
		</button>
	);
}
