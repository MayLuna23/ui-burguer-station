import { ShoppingCart, TrainFront } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface NavbarProps {
  username: string;
}

export default function Navbar({ username }: NavbarProps) {
  const firstName = username.split(" ")[0];
  const { cartItems } = useCart();

  return (
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

        <div className="relative">
          <ShoppingCart className="h-6 w-6 text-gray-700 " />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          )}
        </div>
      </div>
    </nav>
  );
}
