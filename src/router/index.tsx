// src/router/index.tsx
import { Routes, Route } from "react-router-dom";
import Home from "../features/home/Home";
import NotFound from "../pages/Notfound";
import Checkout from "@/features/checkout/Checkout";
import LoginPage from "@/features/login/Login";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
