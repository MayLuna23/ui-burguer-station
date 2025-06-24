import { useAuth } from "@/context/AuthContext";
import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";
import HeroHeader from "./HeroHeader";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

if (loading) {
  return (
    <div className="flex flex-col pt-16 items-center h-screen bg-black">
      <HeroHeader />
      <div className=" mt-20 w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname, message: "Debes registrarte o iniciar sesión" }}
      />
    );
  }

  return children;
}
