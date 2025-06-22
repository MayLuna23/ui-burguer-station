import AppRouter from "./router"
import "./App.css";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <CartProvider>
      <AppRouter />
      </CartProvider>
    </div>
  )
}
