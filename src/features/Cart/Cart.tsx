import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function CartSidebar() {
  const { cartItems, removeItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div>
      {/* Cart Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="relative p-2 rounded-full hover:bg-gray-100 transition">
        <ShoppingCart className="h-6 w-6 text-gray-700" />
        {cartItems.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          </span>
        )}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay oscuro */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40 "
              onClick={() => setIsOpen(false)} // permite cerrar al hacer clic fuera del sidebar
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col p-4"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Tu Carrito</h2>
                <button onClick={() => setIsOpen(false)} className="text-xl">
                  ✕
                </button>
              </div>

              {/* Si carrito vacío */}
              {cartItems.length === 0 ? (
                <p className="text-center text-gray-500 flex-1">El carrito está vacío.</p>
              ) : (
                <>
                  {/* Scrollable items */}
                  <div className="space-y-4 overflow-y-auto flex-1 scrollbar-light ">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-4 border-b pb-2">
                        <section className="w-1/2">
                          <img src={item.image} alt={item.name} className="w-20 h-20 object-contain rounded" />
                        </section>
                        <section className="w-full relative">
                          <h3 className="font-semibold text-sm">{item.name}</h3>
                          <ul>
                            {item.extras && item.extras.length > 0 ? (
                              item.extras.map((extra, index) => (
                                <li key={index} className="text-xs text-gray-500 flex justify-between">
                                  <p>{extra.name}</p> <p>(${extra.price.toFixed(2)})</p>
                                </li>
                              ))
                            ) : (
                              <li className="text-xs text-gray-500">Sin adiciones</li>
                            )}
                          </ul>
                          <div className="flex justify-between mt-1">
                            <p className="text-sm">Cantidad: {item.quantity}</p>
                            <p className="text-sm font-bold text-orange-600">${item.totalPrice.toFixed(2)}</p>
                          </div>

                          {/* Botón eliminar */}
                          <button
                            onClick={() => removeItem(item)}
                            className="absolute top-0 right-0 text-xs text-red-500 hover:text-red-700"
                            title="Eliminar"
                          >
                            <Trash2 size={"1.2rem"} />
                          </button>
                        </section>
                      </div>
                    ))}
                  </div>

                  {/* Total y botón */}
                  <div className=" pt-4 mt-4">
                    {/* <div className="flex justify-end text-sm font-semibold text-gray-700 w1/2">
                    <span>Total:</span>
                    <span className="text-orange-600 ml-3.5">
                      ${cartItems.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2)}
                    </span>
                  </div> */}
                    <Link to="/checkout" onClick={() => setIsOpen(false)}>
                      <button className="flex justify-between pl-12 pr-12  w-full bg-orange-500  font-semibold py-3 rounded-xl shadow-md mt-4">
                        <p className="text-white flex">Pagar</p>
                        <p className="text-white">
                          ${cartItems.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2)}
                        </p>
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
