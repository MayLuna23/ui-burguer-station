import { AnimatePresence, motion } from "framer-motion";
import { AddToCartButton } from "@/features/total/Total";

type Product = {
  name: string;
  description: string;
  price: number;
  product_id: number;
};

type OptionItem = {
  name: string;
  price: number;
};

type AnimatedModalWrapperProps = {
  isOpen: boolean;
  isDesktop: boolean;
  onClose: () => void;
  selectedProduct: Product;
  adiciones: string[];
  setAdiciones: (val: string[]) => void;
  salsas: string[];
  setSalsas: (val: string[]) => void;
  papa: string | null;
  setPapa: (val: string) => void;
  bebida: string | null;
  setBebida: (val: string) => void;
  options: {
    adiciones: OptionItem[];
    salsas: OptionItem[];
    papas: OptionItem[];
    bebidas: OptionItem[];
  };
  totalPrice: number;
  resetExtras: () => void;
};

export default function AnimatedModalWrapper({
  isOpen,
  isDesktop,
  onClose,
  selectedProduct,
  adiciones,
  setAdiciones,
  salsas,
  setSalsas,
  papa,
  setPapa,
  bebida,
  setBebida,
  options,
  totalPrice,
  resetExtras,
}: AnimatedModalWrapperProps) {
  const toggleCheck = (
    name: string,
    list: string[],
    setList: (val: string[]) => void,
    limit: number
  ) => {
    if (list.includes(name)) {
      setList(list.filter((item) => item !== name));
    } else if (list.length < limit) {
      setList([...list, name]);
    }
  };

  const buildExtras = () => {
    const extras: { name: string; price: number }[] = [];

    adiciones.forEach((name) => {
      const item = options.adiciones.find((opt) => opt.name === name);
      if (item) extras.push({ name: item.name, price: item.price });
    });

    salsas.forEach((name) => {
      const item = options.salsas.find((opt) => opt.name === name);
      if (item) extras.push({ name: item.name, price: item.price });
    });

    if (papa) {
      const item = options.papas.find((opt) => opt.name === papa);
      if (item) extras.push({ name: item.name, price: item.price });
    }

    if (bebida) {
      const item = options.bebidas.find((opt) => opt.name === bebida);
      if (item) extras.push({ name: item.name, price: item.price });
    }

    return extras;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998]"
            onClick={onClose}
          ></div>

          <motion.div
            initial={isDesktop ? { x: "100%" } : { y: "100%" }}
            animate={isDesktop ? { x: 0 } : { y: 0 }}
            exit={isDesktop ? { x: "100%" } : { y: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className={`fixed z-[9999] bg-black text-white shadow-2xl p-6 rounded-t-3xl flex flex-col ${
              isDesktop
                ? "top-0 right-0 h-full w-[400px] rounded-none rounded-l-3xl shadow-[0_0_40px_#f97316]"
                : "bottom-0 left-0 right-0 max-h-[100%]"
            }`}
          >

            <div className="flex justify-between items-center mb-4">
              <button onClick={onClose}>✕</button>
            </div>

            <div className="flex flex-col justify-center items-center mb-4 lg:mb-0 lg:flex-none max-w-md mx-auto">
              <img
                src={`${selectedProduct.product_id}.webp`}
                alt={selectedProduct.name}
                className="h-64 object-contain mb-2"
              />
              <h2 className="text-3xl font-bold" style={{ fontFamily: "Tagesschrift, serif" }}>
                {selectedProduct.name}
              </h2>
              <span className="text-white text-center px-4 mb-2 break-words">
                {selectedProduct.description}
              </span>
              <span className="text-lg font-bold text-center mt-0.5 mb-4">
                ${selectedProduct.price.toFixed(2)}
              </span>
            </div>

            <div className="overflow-y-auto flex-1 pr-2 space-y-4 scroll-dark">
              {/* ADICIONES */}
              <div>
                <span className="font-bold text-lg">Adiciones (máximo 3)</span>
                {options.adiciones.map((item) => {
                  const isChecked = adiciones.includes(item.name);
                  return (
                    <label key={item.name} className="flex items-center justify-between mb-2 mt-3 cursor-pointer">
                      <div className="flex items-center w-full justify-between">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCheck(item.name, adiciones, setAdiciones, 3)}
                          className="hidden peer"
                        />
                        <span className="w-5 h-5 mr-3 rounded border border-gray-400 flex items-center justify-center peer-checked:bg-orange-500 peer-checked:border-orange-500">
                          {isChecked && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                        <span className="flex justify-between w-full pr-4">
                          <span>{item.name}</span>
                          <span className={`ml-4 ${isChecked ? "font-bold" : ""}`}>${item.price.toFixed(2)}</span>
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* SALSAS */}
              <div>
                <span className="font-bold text-lg">Salsas (máximo 2)</span>
                {options.salsas.map((item) => {
                  const isChecked = salsas.includes(item.name);
                  return (
                    <label key={item.name} className="flex items-center justify-between mb-2 mt-3 cursor-pointer">
                      <div className="flex items-center w-full justify-between">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleCheck(item.name, salsas, setSalsas, 2)}
                          className="hidden peer"
                        />
                        <span className="w-5 h-5 mr-3 rounded border border-gray-400 flex items-center justify-center peer-checked:bg-orange-500 peer-checked:border-orange-500">
                          {isChecked && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </span>
                        <span className="flex justify-between w-full pr-4">
                          <span>{item.name}</span>
                          <span className={`ml-4 ${isChecked ? "font-bold" : ""}`}>${item.price.toFixed(2)}</span>
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* PAPAS */}
              <div>
                <span className="font-bold text-lg">Tipo de Papas</span>
                {options.papas.map((item) => {
                  const isSelected = papa === item.name;
                  return (
                    <label key={item.name} className="flex items-center justify-between mb-2 mt-3 cursor-pointer">
                      <div className="flex items-center w-full justify-between">
                        <input
                          type="radio"
                          name="papa"
                          className="hidden peer"
                          checked={isSelected}
                          onChange={() => setPapa(item.name)}
                        />
                        <span className="w-5 h-5 mr-3 rounded-full border border-gray-400 flex items-center justify-center peer-checked:border-orange-500 peer-checked:ring-2 peer-checked:ring-orange-500">
                          {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                        </span>
                        <span className="flex justify-between w-full pr-4">
                          <span>{item.name}</span>
                          <span className={`ml-4 ${isSelected ? "font-bold" : ""}`}>${item.price.toFixed(2)}</span>
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>

              {/* BEBIDAS */}
              <div>
                <span className="font-bold text-lg">Bebida</span>
                {options.bebidas.map((item) => {
                  const isSelected = bebida === item.name;
                  return (
                    <label key={item.name} className="flex items-center justify-between mb-2 mt-3 cursor-pointer">
                      <div className="flex items-center w-full justify-between">
                        <input
                          type="radio"
                          name="bebida"
                          className="hidden peer"
                          checked={isSelected}
                          onChange={() => setBebida(item.name)}
                        />
                        <span className="w-5 h-5 mr-3 rounded-full border border-gray-400 flex items-center justify-center peer-checked:border-orange-500 peer-checked:ring-2 peer-checked:ring-orange-500">
                          {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />}
                        </span>
                        <span className="flex justify-between w-full pr-4">
                          <span>{item.name}</span>
                          <span className={`ml-4 ${isSelected ? "font-bold" : ""}`}>${item.price.toFixed(2)}</span>
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="mt-4">
              <AddToCartButton
                setIsOpen={onClose}
                selectedProduct={{ ...selectedProduct, extras: buildExtras() }}
                unitPrice={totalPrice.toFixed(2)}
                resetExtras={resetExtras}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
