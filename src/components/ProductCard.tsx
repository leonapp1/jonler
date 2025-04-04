
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
        <div className="relative h-full w-full group">
          <Link href={`/product/${product.id}`} className="block h-full">
            <div className="absolute top-2 left-2 z-10">
              <p className="text-base font-bold bg-yellow-400 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                S/.{parseFloat(product.price).toFixed(2)}
              </p>
            </div>
            <Image
              src={product.image}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 rounded-t-xl"
            />
          </Link>
          <div className="absolute top-2 right-2 flex gap-2 z-10">
            <button
              onClick={() => {}}
              className="p-2 rounded-full cursor-pointer bg-black/50 backdrop-blur-sm hover:bg-pink-500/70 transition-all duration-200 text-white hover:scale-110"
              aria-label="Add to favorites"
            >
              <Heart size={18} className="hover:fill-current" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 p-4 h-full justify-between">
        <div className="flex justify-between items-start flex-wrap gap-2">
         
            <h3 className="text-base font-semibold text-white hover:text-purple-200 transition-colors">
              <Link href={`/product/${product.id}`} className='hover:underline'>{product.name}</Link>
      
            </h3>
          
<p className="line-clamp-2 text-sm text-gray-300">{product.description}</p>
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