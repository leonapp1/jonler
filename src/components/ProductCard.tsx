
import { useCart } from '@/context/CartContext';
import { useCartStore } from '@/store/useCartStore';
import Image from 'next/image';
import CartButton from '@/components/ui/CartButton';
import Link from 'next/link';
import ProductPrice from '@/components/ui/ProductPrice';

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
      <div className="overflow-hidden rounded-t-xl bg-transparent min-h-40 md:min-h-52">
        <div className="relative h-full w-full group">
          <Link href={`/product/${product.id}`} className="block h-full">
            <div className="absolute -top-6 -right-6 z-10">
              <ProductPrice price={product.price} />
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

        </div>
      </div>
      <div className="flex flex-col gap-4 p-4 h-full justify-between">
        <div className="flex justify-between items-start flex-wrap gap-2">

          <h3 className=" text-base sm:text-sm font-semibold text-white hover:text-purple-200 transition-colors">
            <Link href={`/product/${product.id}`} className='hover:underline'>{product.name}</Link>
          </h3>

          <p className="line-clamp-2 text-sm text-gray-300">{product.description}</p>
        </div>
          <CartButton
            onClick={addToCart}
            aria-label="Add to cart"
          >
            <span className="hidden sm:block text-sm font-medium">Agregar al Carrito</span>

            <span className="sm:hidden text-sm font-medium">Agregar</span>
          </CartButton>
      </div>
    </div>
  );
}