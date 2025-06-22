import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

type Product = {
  product_id: number;
  name: string;
  price: number;
  image: string;
  categoryId: number;
  description?: string | null;
  quantity?: number;
  extras?: { name: string; price: number }[];
};

type CartItem = Product & { quantity: number };

interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: Product) => void;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

const addItem = (item: Product) => {
  setCartItems((prev) => {
    const existing = prev.find((p) => {
      if (p.product_id !== item.product_id) return false;

      const extrasA = p.extras ?? [];
      const extrasB = item.extras ?? [];

      if (extrasA.length !== extrasB.length) return false;

      const sameExtras = extrasA.every((ea) =>
        extrasB.some((eb) => eb.name === ea.name && eb.price === ea.price)
      );

      return sameExtras;
    });

    const quantityToAdd = item.quantity ?? 1;
    const itemTotalPrice = item.totalPrice ?? item.price;

    if (existing) {
      return prev.map((p) =>
        p === existing
          ? {
              ...p,
              quantity: p.quantity + quantityToAdd,
              totalPrice: p.totalPrice + itemTotalPrice,
            }
          : p
      );
    }

    // Nuevo producto
    return [
      ...prev,
      {
        ...item,
        quantity: quantityToAdd,
        totalPrice: itemTotalPrice,
      },
    ];
  });
};

  useEffect(() => {
  console.log("🛒 Carrito actualizado:", cartItems);
}, [cartItems]);

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addItem, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be inside CartProvider");
  return context;
};
