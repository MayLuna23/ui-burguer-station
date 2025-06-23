import { useState } from "react";
import ConfirmModal from "@/components/Modal";
import SpinnerModal from "@/components/SpinnerModal";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(true);
  console.log(cartItems);
  const grandTotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleConfirmOrder = async () => {
    setShowSpinner(true);

    const emailData = {
      total: grandTotal,
      products: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        totalPrice: item.totalPrice,
        extras: item.extras || [],
      })),
    };

    try {
      const token = localStorage.getItem("token");
      const result = await axios.post("http://localhost:3000/email/send", emailData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(result.data.statusCode)

      if (result.data.statusCode === 200) {
        setShowConfirmModal(true);
        clearCart()
        setIsEmailSent(true)
      } else {
        setIsEmailSent(false)
      }
      
    } catch (error) {
      console.error("Error al enviar el pedido:", error);
    } finally {
      setShowSpinner(false);
    }
  };

  return (
    <>
      <Navbar />
      <SpinnerModal isOpen={showSpinner} />
      <ConfirmModal isOpen={showConfirmModal} success={isEmailSent} onClose={() => {
        setShowConfirmModal(false);
        navigate("/");
      }} />

      <div className="h-[calc(100vh-64px)] bg-black py-5 px-4">
        <div className="max-w-3xl mx-auto bg-gray-200 p-6 rounded-lg shadow-md flex flex-col h-[87vh]">
          <span className="text-2xl font-bold mb-4 text-center mb-4">Revisar Pedido</span>

          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500 flex-1">Tu carrito está vacío.</p>
          ) : (
            <>
              <div className="space-y-6 overflow-y-auto pr-2 flex-1 scrollbar-light">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex gap-4 border-b pb-4">
                    <img src={`${item.product_id}.webp`} alt={item.name} className="w-1/4 h-24 object-contain rounded" />
                    <div className="flex-1 flex flex-col justify-between h-full">
                      <div>
                        <h2 className="text-lg font-semibold flex justify-between">
                          {item.name}
                          <p className="text-sm mr-2">${item.price}</p>
                        </h2>

                        {item.extras && item.extras.length > 0 ? (
                          <div className="text-sm text-gray-600">
                            <p className="font-medium">Adiciones:</p>
                            <ul>
                              {item.extras.map((extra, idx) => (
                                <li key={idx} className="text-xs text-gray-500 flex justify-between">
                                  <p>{extra.name}</p>
                                  <p className="mr-2" >(${extra.price.toFixed(2)})</p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">Sin adiciones</p>
                        )}
                      </div>
                      <div className="mt-2 flex justify-between items-center text-sm">
                        <span>Cantidad: {item.quantity}</span>
                        <span className="font-bold text-orange-600 mr-2">
                          Total: ${item.totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t mt-4">
                <div className="flex justify-between items-center text-lg font-bold mb-4">
                  <span>Total a Pagar:</span>
                  <span className="text-orange-600">${grandTotal.toFixed(2)}</span>
                </div>

                <button
                  onClick={handleConfirmOrder}
                  className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg shadow hover:bg-orange-600 transition"
                >
                  <span className="text-white mb-0">Confirmar Pedido</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
