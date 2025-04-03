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
import Image from "next/image";


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
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo and Navigation Section */}
            <div className="flex items-center justify-between w-full md:w-auto space-x-8 animate-fadeIn">
                {/* Logo */}
                <Image 
                    src="/jonler.png"
                    alt="Jonler Logo"
                    width={120}
                    height={40}
                    className="h-10 w-auto"
                />
                <Link
                    href="/"
                    className="text-2xl md:text-3xl font-extrabold text-white hover:text-blue-200 transition-all duration-300 transform hover:scale-105"
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-400">
                        Jonler estore
                    </span>
                </Link>

                {/* Navigation Links - Moved here for better organization */}
                <Link
                    href="/categorias"
                    className="text-white hover:text-blue-200 transition-colors duration-300 font-medium px-4 py-2 rounded-lg hover:bg-white/10"
                >
                    Categorías
                </Link>
            </div>

            {/* Search and Cart Section */}
            <div className="flex items-center space-x-4 w-full md:w-auto animate-fadeIn">
                {/* Search Form */}
                <form
                    className="flex-1 md:flex-none flex items-center group relative"
                    onSubmit={(e) => {
                        e.preventDefault();
                        router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
                    }}
                >
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setShowSuggestions(!!e.target.value);
                            }}
                            onFocus={() => setShowSuggestions(searchTerm.length > 0)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            className="w-full md:w-96 px-6 py-3 rounded-full focus:outline-none text-gray-800 bg-gray-50 ring-2 ring-transparent focus:ring-purple-300 transition-all duration-300 hover:shadow-lg"
                            placeholder="Buscar productos, marcas..."
                        />
                        {/* Search Suggestions Dropdown */}
                        {showSuggestions && suggestions.length > 0 && (
                            <div className="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-xl overflow-hidden animate-fadeInDown">
                                {suggestions.map((suggestion, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-3 hover:bg-gray-50 active:bg-gray-100 cursor-pointer border-b last:border-b-0 text-sm md:text-base transition-all duration-200 hover:pl-6"
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
                        className="ml-2 p-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        <Search size={20} className="text-white" />
                    </button>
                </form>

                {/* Shopping Cart Button */}
                <button
                    onClick={open}
                    className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-purple-600 to-indigo-900 hover:from-purple-700 hover:to-indigo-950 transition-all duration-300 rounded-full shadow-xl hover:shadow-2xl z-50 transform hover:scale-105"
                >
                    <div className="relative">
                        <ShoppingCart
                            size={24}
                            className="text-white"
                        />
                        {itemCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center font-bold shadow-lg animate-pulse">
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
