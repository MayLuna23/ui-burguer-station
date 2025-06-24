import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import { Minus, Plus } from "lucide-react";

interface AddToCartButtonProps {
  unitPrice: number;
  setIsOpen: (isOpen: boolean) => void;
  resetExtras: () => void;
  selectedProduct: {
    product_id: number;
    name: string;
    price: number;
    image: string;
    categoryId: number;
    description?: string | null;
    extras?: { name: string; price: number }[];
  };
}

export const AddToCartButton = ({ unitPrice, selectedProduct, setIsOpen, resetExtras }: AddToCartButtonProps) => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const { addItem } = useCart();

  useEffect(() => {
    setProduct(selectedProduct);
  }, [selectedProduct]);

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

  const addQuantityToItem = () => {
    const itemToAdd = {
      ...product,
      quantity: quantity,
      totalPrice: quantity * unitPrice,
      extras: selectedProduct.extras ?? [],
    };
    console.log(itemToAdd);
    addItem(itemToAdd);
  };

  return (
    <div className="  pl-3 pt-3 pr-3 pb-2 space-x-2 flex items-center lg:w-max:42 bottom-0 left-0 w-full bg-black z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] ">
    {/* <div className="flex items-center space-x-2 "> */}
      {/* Contador */}
      <div className="flex items-center bg-gray-100 rounded-xl px-4 py-2">
        <button
          onClick={handleDecrease}
          disabled={quantity === 1}
          className={`text-xl font-bold px-2 ${quantity === 1 ? "text-gray-300" : "text-black"}`}
        >
            <Minus color="black" />
        </button>
        <span className="mx-3 text-lg font-semibold text-black">{quantity}</span>
        <button onClick={handleIncrease} className="text-xl font-bold px-2 ">
            <Plus color="black" />
        </button>
      </div>

      {/* Botón Agregar */}
      <button
        onClick={() => {
          addQuantityToItem(), setIsOpen(false), resetExtras();
        }}
        className="flex-1 flex justify-between items-center bg-gradient-to-r from-orange-500 to-orange-400  font-semibold px-5 py-3 rounded-xl shadow-md min-w-[160px]"
      >
        <span className="text-white">Agregar</span>
        <span className="text-white">{formatPrice(quantity * unitPrice)}</span>
      </button>
    </div>
  );
};
