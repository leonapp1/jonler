'use client';

import {  use } from 'react';
import Image from 'next/image';
import {  ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CartButton from '@/components/ui/CartButton';
import { useCart } from '@/context/CartContext';
import { useCartStore } from '@/store/useCartStore';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useProducts from '@/hooks/useProducts';
import { useState, useEffect } from 'react'; // Add useEffect

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  tipo?: string;
  categoria?: string;
  images?: string[];  // Properly define the images array
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params); // Unwrap promise with use()
  const router = useRouter();
  const { dispatch } = useCart();
  const openCart = useCartStore((state) => state.open);
  const { products, loading, error } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState('');

  useEffect(() => {
    const foundProduct = products.find(p => p.id === resolvedParams.id); // Use resolvedParams.id
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.image);
    }
  }, [products, resolvedParams.id]); // Update dependency

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  if (loading || !product) {
    return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  }

  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: parseFloat(product.price),
        image: product.image,
        quantity: 1,
      },
    });
    openCart();
  };

  // Remove this duplicate declaration:
  // const [selectedImage, setSelectedImage] = useState(product.image);

  return (
    <>
      <Header/>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-900 relative overflow-hidden">
        <div className="container mx-auto px-2 py-4 sm:px-4 sm:py-8 max-w-7xl">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-neutral hover:text-primary mb-4 sm:mb-8 transition-colors"
          >
            <ArrowLeft size={18} className="sm:size-20" />
            <span className="text-sm sm:text-base">Volver</span>
          </button>

          <div className=" rounded-xl sm:rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm bg-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 p-4 sm:p-8">
              {/* Image Gallery Section */}
              <div className="space-y-4 sm:space-y-6 flex flex-col items-center">
                <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full rounded-lg sm:rounded-xl overflow-hidden group">
                  <Image
                    src={selectedImage}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    priority
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
                    quality={90}
                  />
                </div>
                <div className="flex justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto pb-2 w-full">
                  {[product.image, ...(product.images || [])].map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 sm:w-24 sm:h-24 shrink-0 rounded-md sm:rounded-lg overflow-hidden border-2 ${
                        selectedImage === img ? 'border-purple-400' : 'border-transparent'
                      } transition-all hover:scale-105`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        width={96}
                        height={96}
                        className="object-cover w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col text-white items-center md:items-start">
                <div className="mb-4 sm:mb-6 text-center md:text-left">
                  {product.categoria && (
                    <span className="inline-block bg-purple-600/30 text-purple-200 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm mb-2 sm:mb-3">
                      {product.categoria}
                    </span>
                  )}
                  <h1 className="text-2xl sm:text-4xl font-bold mb-2 sm:mb-3">{product.name}</h1>
                  {product.tipo && (
                    <p className="text-lg sm:text-xl text-purple-300">{product.tipo}</p>
                  )}
                </div>

                <div className="flex items-center justify-center md:justify-start gap-4 mb-4 sm:mb-6">
                  <span className="text-2xl sm:text-3xl font-bold text-accent">
                    S/.{parseFloat(product.price).toFixed(2)}
                  </span>
                </div>

                <p className="text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 text-purple-100 text-center md:text-left">
                  {product.description}
                </p>

              
                  <CartButton 
                    onClick={addToCart}
                  >
                    Agregar al Carrito
                  </CartButton>
               
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
    
  );
}