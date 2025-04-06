'use client';

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CartButton from '@/components/ui/CartButton';
import { useCart } from '@/context/CartContext';
import { useCartStore } from '@/store/useCartStore';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useProducts from '@/hooks/useProducts';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === resolvedParams.id);
    if (foundProduct) {
      setProduct(foundProduct);
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
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={10}
                  slidesPerView={1}
                  className="w-full h-[300px] sm:h-[400px] md:h-[500px] rounded-lg sm:rounded-xl overflow-hidden"
                >
                  {[product.image, ...(product.images || [])].map((img, index) => (
                    <SwiperSlide key={index} className="relative">
                      <Image
                        src={img}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
                        quality={90}
                      />
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="absolute bottom-4 right-4 p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-110"
                      >
                        <Maximize2 size={40} />
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Product Details */}
              <div className="flex flex-col text-white md:items-start p-6 backdrop-blur-md bg-white/5 rounded-xl">
                <div className="mb-6 text-left flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="space-y-2">
                    {product.categoria && (
                      <span className="inline-block bg-gradient-to-r from-purple-500/40 to-pink-500/40 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-purple-500/20 transition-all duration-300">
                        {product.categoria}
                      </span>
                    )}
                    {product.tipo && (
                      <p className="text-lg font-medium text-purple-200 bg-purple-500/10 px-4 py-1 rounded-full inline-block">
                        {product.tipo}
                      </p>
                    )}
                  </div>
                  <span className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-yellow-400 to-amber-300 bg-clip-text text-transparent">
                    S/.{parseFloat(product.price).toFixed(2)}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  {product.name}
                </h1>

                <div className="relative">
                  <p className="text-base sm:text-lg leading-relaxed mb-8 text-purple-100 text-justify border-l-4 border-purple-500/30 pl-4 py-2">
                    {product.description}
                  </p>
                </div>

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

      {/* Modal for Fullscreen Image */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-3 text-white text-2xl z-50 cursor-pointer hover:scale-110 hover:text-purple-300 transition-all duration-300 flex items-center gap-2"
          >
            X
          </button>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={10}
            slidesPerView={1}
            className="w-full h-full"
          >
            {[product.image, ...(product.images || [])].map((img, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={img}
                  alt={`Fullscreen Image ${index + 1}`}
                  fill
                  className="object-contain"
                  priority
                  sizes="100vw"
                  quality={90}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <Footer/>
    </>
  );
}