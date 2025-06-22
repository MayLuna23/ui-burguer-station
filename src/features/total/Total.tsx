import { useState } from "react";
import { useCart } from "@/context/CartContext";


interface AddToCartButtonProps {
  unitPrice: number;
  setIsOpen: (isOpen: boolean) => void;
  selectedProduct: {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category?: string;
  };
}

export const AddToCartButton = ({ unitPrice, selectedProduct, setIsOpen }: AddToCartButtonProps) => {
  const [quantity, setQuantity] = useState(1);


  const { addItem } = useCart()
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Contador */}
      <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2">
        <button
          onClick={handleDecrease}
          disabled={quantity === 1}
          className={`text-xl font-bold px-2 ${
            quantity === 1 ? "text-gray-300" : "text-black"
          }`}
        >
          −
        </button>
        <span className="mx-3 text-lg font-semibold">{quantity}</span>
        <button
          onClick={handleIncrease}
          className="text-xl font-bold px-2 text-black"
        >
          +
        </button>
      </div>

      {/* Botón Agregar */}
      <button className="flex-1 flex justify-between items-center bg-gradient-to-r from-orange-500 to-orange-400  font-semibold px-5 py-3 rounded-xl shadow-md min-w-[180px]" onClick={() => {addItem(selectedProduct), setIsOpen(false)}}>
        <span className="text-white">Agregar</span>
        <span className="text-white">{formatPrice(quantity * unitPrice)}</span>
      </button>
    </div>
  );
};
