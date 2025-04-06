'use client';

import { createContext, useContext, useReducer, ReactNode, useCallback, useMemo } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  productUrl?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const MAX_QUANTITY = 100;
const MIN_QUANTITY = 1;

const calculateTotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        // Si el producto ya existe, incrementamos su cantidad
        const newQuantity = Math.min(existingItem.quantity + 1, MAX_QUANTITY);
        if (newQuantity === existingItem.quantity) {
          console.warn(`No se puede exceder la cantidad máxima de ${MAX_QUANTITY} unidades para ${existingItem.name}`);
          return state;
        }
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: newQuantity }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          total: calculateTotal(updatedItems)
        };
      }
      const newItems = [...state.items, { ...action.payload, quantity: 1 }];
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems)
      };
    }
    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    case 'UPDATE_QUANTITY': {
      const item = state.items.find(item => item.id === action.payload.id);
      if (!item) return state;
      
      if (action.payload.quantity > MAX_QUANTITY) {
        console.warn(`No se puede exceder la cantidad máxima de ${MAX_QUANTITY} unidades para ${item.name}`);
        return state;
      }
      
      if (action.payload.quantity < MIN_QUANTITY) {
        console.warn(`La cantidad mínima debe ser ${MIN_QUANTITY} unidad`);
        return state;
      }
      
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      return {
        ...state,
        items: updatedItems,
        total: calculateTotal(updatedItems)
      };
    }
    default:
      return state;
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const memoizedDispatch = useCallback(dispatch, [dispatch]);
  const contextValue = useMemo(() => ({
    state,
    dispatch: memoizedDispatch
  }), [state, memoizedDispatch]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}