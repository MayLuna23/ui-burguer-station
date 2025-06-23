import { ArrowLeft, LogOut } from "lucide-react";
import CartSidebar from "@/features/Cart/Cart";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userName, logout } = useAuth();

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  const name = userName ? capitalize(userName.split(" ")[0]) : "Invitado";

  const isCheckoutPage = location.pathname === "/checkout";

  return (
    <nav className="bg-black shadow-md px-4 py-3 flex items-center justify-between">
      {/* Logo y botón de volver */}
      <div className="flex items-center space-x-2">
        {isCheckoutPage && (
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-between text-white w-22 font-semibold mr-2 border border-white rounded px-2 py-1 hover:bg-orange-700 hover:text-black transition"
          >
            <ArrowLeft />Menu
          </button>
        )}
        <span>
        </span>
        <span className="text-xl font-bold text-white hidden sm:block">Burger App</span>
      </div>

      {/* Info del usuario + carrito */}
      <div className="flex items-center space-x-4">
        <span className="text-white font-bold">{name}</span>
        <LogOut onClick={logout} color="white" className="cursor-pointer" />
        <CartSidebar />
      </div>
    </nav>
  );
}
