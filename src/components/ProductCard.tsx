'use client';

import { useCart } from '@/context/CartContext';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import CartButton from '@/components/ui/CartButton';
import { useRouter } from 'next/navigation';

interface ProductProps {
  product: {
    id: string;        // Changed to string as Google Sheets data comes as strings
    name: string;    // Changed from 'name' to match Google Sheets column
    price: string;    // Changed from 'price' to match Google Sheets column
    image: string;    // Changed from 'image' to match Google Sheets column
    description: string; // Changed from 'description' to match Google Sheets column
  }
}

export default function ProductCard({ product }: ProductProps) {
  console.log('Product:', product);
  const router = useRouter();
  const { dispatch } = useCart();
  const openCart = useCartStore((state) => state.open);

  const viewProductDetails = () => {
    router.push(`/product/${product.id}`);
  };

  const addToCart = () => {
    // Ensure product.id exists
    if (!product.id) {
      console.error('Product ID is missing');
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.image,
      quantity: 1,
    };
    console.log('Adding to cart:', cartItem);
    
    dispatch({
      type: 'ADD_ITEM',
      payload: cartItem,
    });
    openCart();
  };

  return (
    <div className="group relative transition-transform hover:scale-[1.03] duration-300 bg-transparent backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl border border-purple-200/30">
      <div className="overflow-hidden rounded-t-xl bg-transparent lg:aspect-none group-hover:opacity-95 h-[150px] sm:h-[200px] md:h-[250px] lg:h-[300px]">
        <div className="relative h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            onClick={viewProductDetails}
          />
          <div className="absolute top-2 right-2 flex gap-2 z-10">
            <button
              onClick={() => {}}
              className="p-1.5 rounded-full bg-white/70 backdrop-blur-sm hover:bg-pink-50 transition-all duration-200 hover:text-pink-500 shadow-md hover:scale-110"
              aria-label="Add to favorites"
            >
              <Heart size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="p-3 space-y-2 backdrop-blur-sm">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <h3 className="text-base font-semibold text-white hover:text-purple-200 transition-colors">
            <span onClick={viewProductDetails} className="cursor-pointer hover:underline">
              {product.name}
            </span>
          </h3>
          <p className="text-base font-bold text-white">${product.price}</p>
        </div>
        <p className="flex self-end text-xs text-white/90 line-clamp-2 min-h-[2rem]">{product.description}</p>
        <CartButton 
          onClick={addToCart}
          aria-label="Add to cart"
        >
          <span className="text-sm">Agregar</span>
        </CartButton>
      </div>
    </div>
  );
}