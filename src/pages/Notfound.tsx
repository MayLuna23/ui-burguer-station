import { Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full text-center">
        <h1 className="text-6xl font-bold text-orange-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Pagina no encontrada
        </h2>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-700 transition"
        >
          <ArrowLeft size={18} />
          Volver a Burguer Station
        </Link>
      </div>
    </div>
  )
}
