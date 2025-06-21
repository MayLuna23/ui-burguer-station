// src/router/index.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../features/home/Home"
import NotFound from "../pages/Notfound"

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
