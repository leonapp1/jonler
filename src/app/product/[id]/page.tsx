'use client';

import { use } from 'react';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CartButton from '@/components/ui/CartButton';
import { useCart } from '@/context/CartContext';
import { useCartStore } from '@/store/useCartStore';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useProducts from '@/hooks/useProducts';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  tipo?: string;
  categoria?: string;
  images?: string[];
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { dispatch } = useCart();
  const openCart = useCartStore((state) => state.open);
  const { products, loading, error } = useProducts();
  const [product, setProduct] = useState<Product | null>(null);
  // Removed selectedImage as it is not used

  useEffect(() => {
    const foundProduct = products.find(p => p.id === resolvedParams.id);
    if (foundProduct) {
      setProduct(foundProduct);
      // Removed setSelectedImage as it is not used
    }
  }, [products, resolvedParams.id]);

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

  return (
    <>
      <Header/>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-900 via-purple-800 to-pink-900 relative overflow-hidden mt-32 md:mt-20">
        <div className="container mx-auto px-2 py-4 sm:px-4 sm:py-8 max-w-7xl">
          <div className="rounded-xl sm:rounded-2xl shadow-lg overflow-hidden backdrop-blur-sm bg-white/5">
            <button
              onClick={() => router.back()}
              className="flex items-center text-white hover:text-accent transition-all duration-300 transform hover:scale-105 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm"
            >
              <ArrowLeft />
              <span className="text-sm sm:text-base font-medium">Volver</span>
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-12 p-2 sm:p-4">
              {/* Image Gallery Section */}
              <div className="space-y-4 sm:space-y-6 flex flex-col items-center">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1}
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg sm:rounded-xl overflow-hidden"
                >
                  {[product.image, ...(product.images || [])].map((img, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
                        quality={90}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
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

                <CartButton onClick={addToCart}>
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