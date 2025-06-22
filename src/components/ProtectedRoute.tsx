import { useAuth } from "@/context/AuthContext";
import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>Cargando...</p>;

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
