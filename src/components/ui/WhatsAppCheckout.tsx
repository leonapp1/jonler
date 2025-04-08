'use client';

interface WhatsAppCheckoutProps {
  items: Array<{
    name: string;
    price: number;
    quantity: number;
    productUrl?: string;
  }>;
  total: number;
  disabled?: boolean;
  customerName?: string;
  customerAddress?: string;
  customerPhone?: string;
}

import { useState } from 'react';

export default function WhatsAppCheckout({ 
  items, 
  total, 
  disabled = false,
  customerName = '',
  customerAddress = '',
  customerPhone = ''
}: WhatsAppCheckoutProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const formatWhatsAppMessage = (): string => {
    if (items.length === 0) {
      return encodeURIComponent('El carrito está vacío. Por favor, agregue productos antes de continuar.');
    }

    // Format the greeting and introduction
    const greeting = '¡Hola, qué tal!'; 
const introduction = 'Estoy listo para hacer el pedido con los siguientes detalles:';

    const header = `${greeting}\n${introduction}\n\n`;

    // Format the items list with proper spacing and alignment
    const itemsList = items
      .map(item => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        const productLink = item.productUrl ? `\nEnlace: ${item.productUrl}` : '';
        return `• ${item.quantity.toString().padStart(2)} x ${item.name.padEnd(30)} S/.${itemTotal}${productLink}`;
      })
      .join('\n');

    // Format the total section with a separator
    const separator = '\n' + '─'.repeat(40) + '\n';
    const totalSection = `${separator}Total a pagar: S/.${total.toFixed(2)}`;

    // Add customer information if available
    let customerInfo = '';
    if (customerName || customerAddress || customerPhone) {
      customerInfo = '\n\nInformación del cliente:';
      if (customerName) customerInfo += `\nNombre: ${customerName}`;
      if (customerAddress) customerInfo += `\nDirección: ${customerAddress}`;
      if (customerPhone) customerInfo += `\nTeléfono: ${customerPhone}`;
    }

    // Add a footer message
    const footer = '\n\n¿Desea proceder con el pedido?';

    // Combine all sections and encode for WhatsApp
    return encodeURIComponent(header + itemsList + totalSection + customerInfo + footer);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Por favor, agregue productos al carrito antes de continuar.');
      return;
    }
    setShowConfirmation(true);
  };

  const confirmCheckout = () => {
    const phoneNumber = '51965208963'; // Replace with your actual WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${formatWhatsAppMessage()}`;
    window.open(url, '_blank');
    setShowConfirmation(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={handleCheckout}
        disabled={disabled}
        className="w-full bg-purple-600 text-white py-4 rounded-full 
          disabled:opacity-50 
          disabled:cursor-not-allowed font-medium text-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-purple-700 hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-in-out"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.91 5.84L2 22l4.16-1.91C7.81 21.3 9.83 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm.97 14.95c-.83 0-1.64-.13-2.42-.38l-2.77.58.59-2.77c-.25-.78-.38-1.59-.38-2.42 0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8z"
          />
        </svg>
        Proceder al Pago
      </button>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-bold mb-4">Confirmar Pedido</h3>
            <p className="mb-4">¿Está seguro que desea proceder con el pedido?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={confirmCheckout}
                className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 cursor-pointer"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}