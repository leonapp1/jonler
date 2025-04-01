'use client';

import { useCart } from '@/context/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import WhatsAppCheckout from '@/components/ui/WhatsAppCheckout';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { state, dispatch } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  return (
    <>
      <div 
        className={`fixed inset-0 bg-purple-700/30 backdrop-blur-sm transition-all duration-300 z-40 
          ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div 
        className={`fixed right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-2xl 
          transform transition-all duration-300 ease-in-out z-50 
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ShoppingBag className="text-purple-700" size={24} />
              Tu Carrito
            </h2>
            <button 
              onClick={onClose} 
              className="p-2 hover:bg-purple-700/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="text-center py-12 space-y-4">
                <ShoppingBag size={48} className="mx-auto text-purple-700" />
                <p className="text-gray-500 text-lg">Tu carrito está vacío</p>
                <button 
                  onClick={onClose}
                  className="text-purple-700 hover:text-purple-500 font-medium"
                >
                  Continuar Comprando
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {state.items.map((item) => (
                  <div key={item.id} 
                    className="flex gap-4 pb-6 border-b last:border-0 group"
                  >
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-lg">{item.name}</h3>
                      <p className="text-purple-700 font-bold text-lg">
                        S/.{(item.price * item.quantity).toFixed(2)}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border rounded-full">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-purple-700/10 rounded-l-full px-2"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 hover:bg-purple-700/10 rounded-r-full px-2"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        <button
                          onClick={() => {
                            dispatch({ type: 'REMOVE_ITEM', payload: item.id });
                            if (state.items.length === 1) onClose();
                          }}
                          className="ml-auto text-red-500 hover:bg-red-500/10 p-2 rounded-full transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t p-6 space-y-4 bg-gray-50">
            <div className="space-y-2">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>S/.{state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Envío</span>
                <span>A coordinar con el vendedor</span>
              </div>
              <div className="flex justify-between text-lg font-semibold pt-2 border-t">
                <span>Total</span>
                <span className="text-purple-700">S/.{state.total.toFixed(2)}</span>
              </div>
            </div>
            <WhatsAppCheckout 
              items={state.items}
              total={state.total}
              disabled={state.items.length === 0}
            />
          </div>
        </div>
      </div>
    </>
  );
}