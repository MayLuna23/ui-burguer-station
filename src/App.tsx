import AppRouter from "./router";
import "./App.css";
import { CartProvider } from "./context/CartContext";

import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <AppRouter />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}
