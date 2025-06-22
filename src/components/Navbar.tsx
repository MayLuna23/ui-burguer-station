import { ShoppingCart, TrainFront } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import CartSidebar from "@/features/Cart/Cart";

interface NavbarProps {
  username: string;
}

export default function Navbar({ username }: NavbarProps) {
  const firstName = username.split(" ")[0];
  const { cartItems } = useCart();
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(total);
  }, [cartItems]);

  return (
    <>
      <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span>
            <TrainFront />
          </span>
          <span className="text-xl font-bold text-orange-600 hidden sm:block">Burger App</span>
        </div>

        {/* User info + cart */}
        <div className="flex items-center space-x-4">
          {/* Username visible truncado solo en mobile */}
          <span className="text-gray-700 font-medium">
            <span>{firstName}</span>
          </span>
          <CartSidebar />
        </div>
      </nav>
    </>
  );
}
