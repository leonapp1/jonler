'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { ShoppingCart, Search } from 'lucide-react';
import { debounce } from 'lodash';
import { useCartStore } from '@/store/useCartStore';
import CartModal from './CartModal';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const fetchSuggestions = useCallback(debounce(async (query: string) => {
    if (query.length > 0) {
      try {
        const apiUrl = new URL('https://script.google.com/macros/s/AKfycbyz00Fe_-oTsmYkQjauUKLkgBazgU46edkZLDXvp3EA7xAIeVx7WKQDe1YKpVIGpWEO/exec');
        apiUrl.searchParams.set('q', query);
        const response = await fetch(apiUrl.toString(), {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setSuggestions(data.map((product: any) => product.name).slice(0, 5));
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  }, 300), []);
  
  useEffect(() => {
    fetchSuggestions(searchTerm);
  }, [searchTerm, fetchSuggestions]);
  const { isOpen, open, close } = useCartStore();
  const { state } = useCart();
  const router = useRouter();
  
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className="bg-gradient-to-r from-purple-600 to-indigo-900">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link href="/" className="text-2xl font-bold text-white hover:text-blue-200 transition-colors">
                Jonler estore
              </Link>
              <Link href="/categorias" className="text-white hover:text-blue-200 transition-colors">
                Categorías
              </Link>
            </div>

            <div className="flex items-center space-x-6">
              <form onSubmit={(e) => {
                e.preventDefault();
                if(searchTerm.trim()) {
                  router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
                }
              }} className="flex items-center">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowSuggestions(e.target.value.length > 0);
                    }}
                    onFocus={() => searchTerm.length > 0 && setShowSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    className="px-4 py-1 rounded-l-full focus:outline-none text-gray-800"
                    placeholder="Buscar productos..."
                  />
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                      {suggestions.map((suggestion, index) => (
                        <div 
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
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
                <button 
                  type="submit"
                  className="p-2 bg-blue-500 hover:bg-blue-600 rounded-r-full transition-colors"
                >
                  <Search size={22} className="text-white" />
                </button>
              </form>
              <button 
                onClick={open} 
                className="p-2 hover:bg-blue-500 rounded-full transition-colors relative"
              >
                <ShoppingCart size={22} className="text-white" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-indigo-800 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <CartModal 
        isOpen={isOpen}
        onClose={close}
      />
      
    </>
  );
}