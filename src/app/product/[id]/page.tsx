'use client';

import {  use } from 'react';
import Image from 'next/image';
import { Heart, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import CartButton from '@/components/ui/CartButton';
import { useCart } from '@/context/CartContext';
import { useCartStore } from '@/store/useCartStore';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import useProducts from '@/hooks/useProducts';



export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const { dispatch } = useCart();
  const openCart = useCartStore((state) => state.open);
  const { products, loading, error } = useProducts();
  const product = products.find(p => p.id === resolvedParams.id);

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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-neutral hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 p-8">
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden group">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
              />
              <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                <Heart size={20} className="text-neutral hover:text-accent transition-colors" />
              </button>
            </div>

            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-primary mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold text-accent">S/.{product.price}</span>
                <span className="text-neutral/70 line-through">S/.{(parseFloat(product.price) * 1.2).toFixed(2)}</span>
              </div>
              <p className="text-neutral mb-8 text-lg leading-relaxed">
                {product.description}
              </p>
              <div className="mt-auto">
                <CartButton onClick={addToCart}>
                  Agregar al Carrito
                </CartButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
    
  );
}