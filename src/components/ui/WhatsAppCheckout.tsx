'use client';

interface WhatsAppCheckoutProps {
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  disabled?: boolean;
}

export default function WhatsAppCheckout({ items, total, disabled = false }: WhatsAppCheckoutProps) {
  const formatWhatsAppMessage = (): string => {
    // Format the greeting and introduction
    const greeting = '¡Hola! Gracias por su preferencia.';
    const introduction = 'Me gustaría confirmar su pedido con los siguientes detalles:';
    const header = `${greeting}\n${introduction}\n\n`;

    // Format the items list with proper spacing and alignment
    const itemsList = items
      .map(item => {
        const itemTotal = (item.price * item.quantity).toFixed(2);
        return `• ${item.quantity.toString().padStart(2)} x ${item.name.padEnd(30)} S/.${itemTotal}`;
      })
      .join('\n');

    // Format the total section with a separator
    const separator = '\n' + '─'.repeat(40) + '\n';
    const totalSection = `${separator}Total a pagar: S/.${total.toFixed(2)}`;

    // Add a footer message
    const footer = '\n\n¿Desea proceder con el pedido?';

    // Combine all sections and encode for WhatsApp
    return encodeURIComponent(header + itemsList + totalSection + footer);
  };

  const handleCheckout = () => {
    const phoneNumber = '51965208963'; // Replace with your actual WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${formatWhatsAppMessage()}`;
    window.open(url, '_blank');
  };

  return (
    <button 
      onClick={handleCheckout}
      disabled={disabled}
      className="w-full bg-purple-700 text-white py-4 rounded-full 
        hover:bg-accent transition-colors disabled:opacity-50 
        disabled:cursor-not-allowed font-medium text-lg flex items-center justify-center gap-2"
    >
      Proceder al Pago
    </button>
  );
}