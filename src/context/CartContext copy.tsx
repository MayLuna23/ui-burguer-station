import { createContext, useContext, useState,  } from 'react';
import type {ReactNode} from 'react';

type Product = { id: number; title: string; price: number; description: string; image: string; category?: string };

interface CartContextType {
  cartItems: Product[];
  addItem: (item: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addItem = (item: Product) => {
    setCartItems((prev) => [...prev, item]);
    console.log(cartItems);
  };

  return (
    <CartContext.Provider value={{ cartItems, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be inside CartProvider");
  return context;
};
