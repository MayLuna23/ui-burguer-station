import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  const grandTotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <>
    <Navbar username="Mayra Alejandra Luna Beltran" />
    
    <div className="h-[calc(100vh-64px)] bg-gray-10 py-5 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col h-[87vh]">
        <h1 className="text-2xl font-bold mb-4 text-center">Revisar Pedido</h1>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 flex-1">Tu carrito está vacío.</p>
        ) : (
          <>
            {/* Contenedor scrollable solo para productos */}
            <div className="space-y-6 overflow-y-auto pr-2 flex-1">
              {cartItems.map((item, index) => (
                <div key={index} className="flex gap-4 border-b pb-4">
                  {/* Imagen */}
                  <img src={item.image} alt={item.name} className="w-1/4 h-24 object-contain rounded" />

                  {/* Contenido */}
                  <div className="flex-1 flex flex-col justify-between h-full">
                    {/* Parte superior: nombre + extras */}
                    <div>
                      <h2 className="text-lg font-semibold flex justify-between">
                        {item.name}
                        <p className="text-sm">${item.price}</p>
                      </h2>

                      {item.extras && item.extras.length > 0 ? (
                        <div className="text-sm text-gray-600">
                          <p className="font-medium">Adiciones:</p>
                          <ul>
                            {item.extras.map((extra, idx) => (
                              <li key={idx} className="text-xs text-gray-500 flex justify-between">
                                <p>{extra.name}</p>
                                <p>(${extra.price.toFixed(2)})</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">Sin adiciones</p>
                      )}
                    </div>

                    {/* Parte inferior: cantidad + total */}
                    <div className="mt-2 flex justify-between items-center text-sm">
                      <span>Cantidad: {item.quantity}</span>
                      <span className="font-bold text-orange-600">Total: ${item.totalPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Total y botón fijo al fondo */}
            <div className="pt-4 border-t mt-4">
              <div className="flex justify-between items-center text-lg font-bold mb-4">
                <span>Total a Pagar:</span>
                <span className="text-orange-600">${grandTotal.toFixed(2)}</span>
              </div>

              <button
                onClick={() => {
                  alert("✅ Pedido confirmado");
                  navigate("/");
                }}
                className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg shadow hover:bg-orange-600 transition"
              >
                <p className="text-white">Confirmar Pedido</p>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
    </>
  );
}
