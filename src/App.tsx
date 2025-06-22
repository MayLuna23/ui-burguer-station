import AppRouter from "./router";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BrowserRouter>
        <CartProvider>
          <Navbar username="Mayra Alejandra Luna Beltran" />
          <AppRouter />
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}
