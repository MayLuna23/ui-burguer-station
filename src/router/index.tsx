// src/router/index.tsx
import { Routes, Route } from "react-router-dom"
import Home from "../features/home/Home"
import NotFound from "../pages/Notfound"
import Checkout from "@/features/checkout/Checkout"

export default function AppRouter() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  )
}
