"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { ShoppingCart, Search, Menu } from "lucide-react";
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
    const [menuOpen, setMenuOpen] = useState(false);

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
                        <div className="flex flex-wrap items-center justify-between w-full md:w-auto animate-fadeIn">

                            <div className="flex flex-wrap items-center justify-between space-x-14">
                                {/* Logo */}
                                <div className="flex items-center  space-x-2 group">
                                    <Image
                                        src="/jonler.png"
                                        alt="Jonler Logo"
                                        width={120}
                                        height={40}
                                        className="h-12 w-auto transition-transform duration-300 group-hover:scale-110"
                                    />
                                    <Link
                                        href="/"
                                        className="relative text-xl md:text-3xl font-extrabold text-white transition-all duration-300"
                                    >
                                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 hover:from-blue-300 hover:via-purple-300 hover:to-pink-300">
                                            Jonler estore
                                        </span>
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-200 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </div>

                                {/* Navigation Links - Visible on desktop */}
                                <div className="hidden m-auto md:flex space-x-6 justify-between items-center">
                                    <Link
                                        href="/categorias"
                                        className="relative text-white hover:text-blue-200 transition-all duration-300 font-medium px-4 py-2 rounded-lg overflow-hidden group"
                                    >
                                        <span className="relative z-10">Categorías</span>
                                        <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
                                    </Link>
                                    <Link
                                        href="/tipo"
                                        className="relative text-white hover:text-blue-200 transition-all duration-300 font-medium px-4 py-2 rounded-lg overflow-hidden group"
                                    >
                                        <span className="relative z-10">Tipo</span>
                                        <div className="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
                                    </Link>
                                </div>
                            </div>
                            {/* Hamburger Menu Icon - Only visible on mobile */}
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="text-white md:hidden focus:outline-none hover:text-blue-200 transition-colors duration-300"
                            >
                                <Menu size={28} className="transform hover:rotate-180 transition-transform duration-300" />
                            </button>

                            {/* Navigation Links - Hamburger Menu */}
                            <div className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-purple-600 to-indigo-900 shadow-2xl transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-500 ease-in-out z-30 md:hidden`}>
                                <button
                                    onClick={() => setMenuOpen(false)}
                                    className="absolute top-4 right-4 text-white hover:text-blue-200 transition-colors duration-300 text-xl font-bold"
                                >
                                    ✕
                                </button>
                                <div className="flex flex-col p-6 space-y-6 mt-16">
                                    <Link
                                        href="/categorias"
                                        className="text-white hover:text-blue-200 transition-all duration-300 font-medium text-lg flex items-center space-x-2 group"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <span className="transform group-hover:translate-x-2 transition-transform duration-300">Categorías</span>
                                    </Link>
                                    <Link
                                        href="/tipo"
                                        className="text-white hover:text-blue-200 transition-all duration-300 font-medium text-lg flex items-center space-x-2 group"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        <span className="transform group-hover:translate-x-2 transition-transform duration-300">Tipo</span>
                                    </Link>
                                </div>
                            </div>
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
                                    className="ml-2 p-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer"
                                >
                                    <Search size={20} className="text-white" />
                                </button>
                            </form>

                            {/* Shopping Cart Button */}
                            <button
                                onClick={open}
                                className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-purple-600 to-indigo-900 hover:from-purple-700 hover:to-indigo-950 transition-all duration-300 rounded-full shadow-xl hover:shadow-2xl z-50 transform hover:scale-105 cursor-pointer"
                            >
                                <div className="relative">
                                    <ShoppingCart
                                        size={24}
                                        className="text-white"
                                    />
                                    {itemCount > 0 && (
                                        <span className="absolute -top-5 -right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center font-bold shadow-lg">
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
