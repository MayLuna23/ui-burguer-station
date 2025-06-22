import { ShoppingCart, TrainFront } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import CartSidebar from "@/features/Cart/Cart";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { cartItems } = useCart();
  const [totalItems, setTotalItems] = useState(0);

  const { userName } = useAuth();

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const name = userName ? capitalize(userName.split(" ")[0]) : "Invitado";

  useEffect(() => {
    const total = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setTotalItems(total);
  }, [cartItems]);

  return (
    <nav className="bg-black shadow-md px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <span>
          <TrainFront />
        </span>
        <span className="text-xl font-bold text-white hidden sm:block">Burger App</span>
      </div>

      {/* User info + cart */}
      <div className="flex items-center space-x-4">
        <span className="text-white font-bold">{name}</span>
        <CartSidebar />
      </div>
    </nav>
  );
}
