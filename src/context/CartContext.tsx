import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import useLocalStorageState from 'use-local-storage-state';


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

type CartItem = Product & { quantity: number; totalPrice: number };

interface CartContextType {
  cartItems: CartItem[];
  addItem: (item: Product) => void;
  total: number;
  removeItem: (item: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useLocalStorageState<CartItem[]>("cartItems", {
    defaultValue: [],
  });

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

  const removeItem = (item: Product) => {
    setCartItems((prev) =>
      prev.filter((p) => {
        if (p.product_id !== item.product_id) return true;

        const extrasA = p.extras ?? [];
        const extrasB = item.extras ?? [];

        if (extrasA.length !== extrasB.length) return true;

        const sameExtras = extrasA.every((ea) =>
          extrasB.some((eb) => eb.name === ea.name && eb.price === ea.price)
        );

        return !sameExtras;
      })
    );
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be inside CartProvider");
  return context;
};
