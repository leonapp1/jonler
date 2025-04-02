"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { ShoppingCart, Search } from "lucide-react";
import debounce from "lodash/debounce";
import { useCartStore } from "@/store/useCartStore";
import CartModal from "./CartModal";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import useProducts from '../hooks/useProducts';

interface Product {
	name: string;
}

export default function Header() {
	const [searchTerm, setSearchTerm] = useState("");
	const [suggestions, setSuggestions] = useState<string[]>([]);
	const [showSuggestions, setShowSuggestions] = useState(false);

	const { isOpen, open, close } = useCartStore();
	const { state } = useCart();
	const router = useRouter();

	const itemCount = useMemo(
		() => state.items.reduce((total, item) => total + item.quantity, 0),
		[state.items]
	);

	const { products } = useProducts(undefined, searchTerm.toLowerCase());

	const debouncedFetchSuggestions = useMemo(
		() =>
			debounce(() => {
				if (!searchTerm) {
					setSuggestions([]);
					return;
				}

				const filtered = products
					.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
					.slice(0, 5)
					.map(p => p.name);

				setSuggestions(filtered);
			}, 300),
		[products, searchTerm]
	);

	useEffect(() => {
		debouncedFetchSuggestions();
	}, [searchTerm, debouncedFetchSuggestions]);

	return (
		<>
			<header className="bg-gradient-to-r from-purple-600 to-indigo-900 z-20 border-b shadow-lg fixed w-full top-0 animate-slideDown">
				<nav className="container mx-auto px-4 py-4">
					<div className="flex flex-col md:flex-row items-center justify-between md:space-y-0">
						{/* Logo and Navigation Section */}
						<div className="flex flex-col md:flex-row items-center md:space-y-0 md:gap-8 w-full md:w-auto animate-fadeIn">
							{/* Logo */}
							<Link
								href="/"
								className="text-2xl md:text-3xl font-extrabold text-white hover:text-blue-200 transition-all transform hover:scale-105 animate-bounce"
							>
								<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-400">
									Jonler estore
								</span>
							</Link>
							{/* Navigation Links */}
							<nav className="flex flex-wrap justify-center gap-3 md:gap-6">
								<Link
									href="/categorias"
									className="text-white hover:text-blue-200 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-white/10 hover:animate-pulse"
								>
									Categorías
								</Link>
							</nav>
						</div>

						{/* Search and Cart Section */}
						<div className="flex flex-col md:flex-row items-center md:space-y-0 md:space-x-6 w-full md:w-auto animate-fadeIn">
							{/* Search Form */}
							<form
								className="flex items-center group relative w-full md:w-auto"
								onSubmit={(e) => {
									e.preventDefault();
									router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
								}}
							>
								<div className="relative flex-1 md:flex-none">
									<input
										type="text"
										value={searchTerm}
										onChange={(e) => {
											setSearchTerm(e.target.value);
											setShowSuggestions(!!e.target.value);
										}}
										onFocus={() => setShowSuggestions(searchTerm.length > 0)}
										onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
										className="w-full md:w-80 px-4 md:px-6 py-2 rounded-full focus:outline-none text-gray-800 bg-gray-50 ring-2 ring-transparent focus:ring-purple-300 transition-all hover:shadow-lg"
										placeholder="Buscar productos, marcas..."
									/>
									{/* Search Suggestions Dropdown */}
									{showSuggestions && suggestions.length > 0 && (
										<div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl overflow-hidden animate-fadeInDown">
											{suggestions.map((suggestion, index) => (
												<div
													key={index}
													className="px-4 py-3 hover:bg-gray-50 active:bg-gray-200  cursor-pointer border-b last:border-b-0 text-sm md:text-base hover:translate-x-1 transform transition-transform"
													onMouseDown={() => {
														setSearchTerm(suggestion);
														setShowSuggestions(false);
													}}
												>
													{suggestion}
												</div>
											))}
										</div>
									)}
								</div>
								{/* Search Button */}
								<button
									type="submit"
									className="ml-2 p-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-full transition-all shadow-lg hover:shadow-xl hover:rotate-12"
								>
									<Search size={20} className="text-white transform group-hover:scale-110 transition-transform" />
								</button>
							</form>
							{/* Shopping Cart Button */}
							<button
								onClick={open}
								className="fixed bottom-4 right-4 p-3 bg-gradient-to-r from-purple-600 to-indigo-900 hover:from-purple-700 hover:to-indigo-950 transition-all group rounded-full shadow-lg hover:shadow-xl z-50 animate-bounce hover:animate-none"
							>
								<div className="relative">
									<ShoppingCart
										size={28}
										className="text-white transform group-hover:scale-110 transition-transform"
									/>
									{itemCount > 0 && (
										<span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-bold shadow-lg animate-pulse">
											{itemCount}
										</span>
									)}
								</div>
							</button>
						</div>
					</div>
				</nav>
			</header>

			<CartModal isOpen={isOpen} onClose={close} />
		</>
	);
}
