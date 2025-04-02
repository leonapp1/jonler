
import { useCart } from '@/context/CartContext';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import CartButton from '@/components/ui/CartButton';
import Link  from 'next/link';

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
  // console.log('Product:', product);
  const { dispatch } = useCart();
  const openCart = useCartStore((state) => state.open);

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
    <div className="group transition-transform hover:scale-[1.03] duration-300 bg-transparent rounded-xl shadow-lg hover:shadow-xl border border-purple-200/30 h-full max-h-[600px] max-w-80 flex flex-col">
      <div className="overflow-hidden rounded-t-xl bg-transparent min-h-80">
        <div className="relative h-full w-full">
          <Link href={`/product/${product.id}`} className='group'>
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
          <div className="absolute top-2 right-2 flex gap-2 z-10">
            <button
              onClick={() => {}}
              className="p-1.5 rounded-full cursor-pointer bg-white/70  hover:bg-pink-50 transition-all duration-200 hover:text-pink-500 shadow-md hover:scale-110"
              aria-label="Add to favorites"
            >
              <Heart size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 p-4 h-full justify-between">
        <div className="flex justify-between items-start flex-wrap gap-2">
          <div className='flex flex-row gap-2 justify-between w-full'>
            <h3 className="text-base font-semibold text-white hover:text-purple-200 transition-colors">
              <Link href={`/product/${product.id}`} className='hover:underline'>{product.name}</Link>
      
            </h3>
            <p className="text-base font-bold text-white w-fit">${product.price}</p>
          </div>
          <p className="flex self-end text-xs text-white/90 line-clamp-2 min-h-[2rem]">{product.description}</p>
        </div>
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