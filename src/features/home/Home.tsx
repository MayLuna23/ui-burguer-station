import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AddToCartButton } from "@/features/total/Total";
import Navbar from "@/components/Navbar";
import axios from "axios";

const circles = [
  { size: "w-6 h-6", top: "top-10", left: "left-10", delay: "delay-0" },
  { size: "w-4 h-4", top: "top-20", left: "left-1/3", delay: "delay-100" },
  { size: "w-8 h-8", top: "top-5", left: "left-1/5", delay: "delay-200" },
  { size: "w-3 h-3", top: "top-1/3", left: "left-2/3", delay: "delay-300" },
  { size: "w-5 h-5", top: "top-1/4", left: "left-[80%]", delay: "delay-500" },
  { size: "w-2 h-2", top: "top-[60%]", left: "left-[30%]", delay: "delay-700" },
  { size: "w-7 h-7", top: "top-[70%]", left: "left-[70%]", delay: "delay-900" },
  // 👇 Nuevas burbujas lejos del centro
  { size: "w-4 h-4", top: "top-[10%]", left: "left-[5%]", delay: "delay-[1000ms]" }, // arriba izquierda
  { size: "w-3 h-3", top: "top-[80%]", left: "left-[10%]", delay: "delay-[1100ms]" }, // abajo izquierda
  { size: "w-5 h-5", top: "top-[85%]", left: "left-[85%]", delay: "delay-[1200ms]" }, // abajo derecha
  { size: "w-3 h-3", top: "top-[5%]", left: "left-[90%]", delay: "delay-[1300ms]" }, // arriba derecha
];

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [adiciones, setAdiciones] = useState<string[]>([]);
  const [salsas, setSalsas] = useState<string[]>([]);
  const [papa, setPapa] = useState<string | null>(null);
  const [bebida, setBebida] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [products, setProducts] = useState([]);
  const [options, setOptions] = useState({
  adiciones: [],
  salsas: [],
  papas: [],
  bebidas: [],
});
  
  useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/categories");
      const categories = response.data;

      const hamburguesas = categories.find((cat) => cat.category_id === 1);

      if (hamburguesas && hamburguesas.products) {
        setProducts(hamburguesas.products);
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  fetchProducts();
}, []);

useEffect(() => {
  const fetchProductsAndOptions = async () => {
    try {
      const response = await axios.get("http://localhost:3000/categories");
      const categories = response.data;

      // Obtener hamburguesas
      const hamburguesas = categories.find((cat) => cat.category_id === 1);
      if (hamburguesas?.products) {
        setProducts(hamburguesas.products);
      }

      // Obtener opciones por categoría
      const adiciones = categories.find((cat) => cat.category_id === 2)?.products || [];
      const papas = categories.find((cat) => cat.category_id === 3)?.products || [];
      const bebidas = categories.find((cat) => cat.category_id === 4)?.products || [];
      const salsas = categories.find((cat) => cat.category_id === 5)?.products || [];

      setOptions({ adiciones, salsas, papas, bebidas });
    } catch (error) {
      console.error("Error al obtener productos u opciones:", error);
    }
  };

  fetchProductsAndOptions();
}, []);


  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 740);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleCheck = (name: string, list: string[], setList: (val: string[]) => void, limit: number) => {
    if (list.includes(name)) {
      setList(list.filter((item) => item !== name));
    } else if (list.length < limit) {
      setList([...list, name]);
    }
  };

  const getPrice = (name: string, list: { name: string; price: number }[]) => {
    return list.find((item) => item.name === name)?.price || 0;
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

  const totalPrice = useMemo(() => {
    if (!selectedProduct) return 0;

    const base = selectedProduct.price;
    const totalAdiciones = adiciones.reduce((sum, name) => sum + getPrice(name, options.adiciones), 0);
    const totalSalsas = salsas.reduce((sum, name) => sum + getPrice(name, options.salsas), 0);
    const totalPapa = papa ? getPrice(papa, options.papas) : 0;
    const totalBebida = bebida ? getPrice(bebida, options.bebidas) : 0;

    return base + totalAdiciones + totalSalsas + totalPapa + totalBebida;
  }, [selectedProduct, adiciones, salsas, papa, bebida]);

  const imagenTemporal: string =
    "https://png.pngtree.com/png-vector/20231016/ourmid/pngtree-burger-food-png-free-download-png-image_10199386.png";

  // const products = [
  //   {
  //     product_id: 1,
  //     name: "El Ranchero",
  //     description:
  //       "rilla marinado, tocino crujiente, queso provolone, aros de cebolla fritos y salsa ranch. rilla marinado, tocino crujiente, queso provolone, aros de cebolla fritos y salsa ranchrilla marinado, tocino crujiente, queso provolone, aros de cebolla fritos y salsa ranch",
  //     price: 5.99,
  //     categoryId: 1,
  //     image: imagenTemporal,
  //   },
  //   {
  //     product_id: 2,
  //     name: "El Picante",
  //     description:
  //       "rilla de pollo empanizada, jalapeños, queso pepper jack, lechuga y salsa sriracha. rilla de pollo empanizada, jalapeños, queso pepper jack, lechuga y salsa sriracharilla de pollo empanizada, jalapeños, queso pepper jack, lechuga y salsa sriracha",
  //     price: 6.49,
  //     categoryId: 1,
  //     image: imagenTemporal,
  //   },
  //   {
  //     product_id: 3,
  //     name: "El Clásico",
  //     description:
  //       "rilla de res a la parrilla, lechuga, tomate, cebolla y mayonesa. rilla de res a la parrilla, lechuga, tomate, cebolla y mayonesarilla de res a la parrilla, lechuga, tomate, cebolla y mayonesa",
  //     price: 4.99,
  //     categoryId: 1,
  //     image: imagenTemporal,
  //   },
  //   {
  //     product_id: 4,
  //     name: "El Vegetariano",
  //     description:
  //       "hamburguesa de garbanzos con aguacate, espinacas frescas y salsa de yogur. hamburguesa de garbanzos con aguacate, espinacas frescas y salsa de yogurhamburguesa de garbanzos con aguacate, espinacas frescas y salsa de yogur",
  //     price: 5.49,
  //     categoryId: 1,
  //     image: imagenTemporal,
  //   },
  //   {
  //     product_id: 5,
  //     name: "El BBQ",
  //     description:
  //       "rilla de cerdo desmenuzado con salsa BBQ ahumada, cebolla morada encurtida y coleslaw. rilla de cerdo desmenuzado con salsa BBQ ahumada, cebolla morada encurtida y coleslawrilla de cerdo desmenuzado con salsa BBQ ahumada, cebolla morada encurtida y coleslaw",
  //     price: 7.99,
  //     categoryId: 1,
  //     image: imagenTemporal,
  //   },
  // ];

  const renderOptionLabel = (name: string, price: number, selected: boolean) => {
    const priceLabel = price === 0 ? "Gratis" : `+$${price.toFixed(2)}`;
    const priceClass = selected ? "font-bold ml-auto" : "ml-auto";
    return (
      <>
        <span>{name}</span>
        <span className={priceClass}>{priceLabel}</span>
      </>
    );
  };

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

  const resetExtras = () => {
    setAdiciones([]);
    setSalsas([]);
    setPapa(null);
    setBebida(null);
  };

  useEffect(() => {
    if (!isOpen) {
      resetExtras(); // ← limpia los campos cuando se cierra el modal
    }
  }, [isOpen]);

  return (
    <>
    <Navbar username="Mayra Alejandra Luna Beltran" />
      <header className="relative w-full  lg:h-80 bg-black overflow-hidden">
        <div className="grid place-content-center relative z-[30]">
          <img
            src="/public/logo.png"
            alt="Burger logo"
            className="w-36 h-18 rounded-full drop-shadow-[0_0_40px_#000000]"
            style={{
              WebkitMaskImage: "radial-gradient(circle at center, black 40%, transparent 70%)",
              maskImage: "radial-gradient(circle at center, black 40%, transparent 70%)",
            }}
          />
        </div>
        <h1
          className="text-white text-center z-[30] text-6xl lg:text-8xl relative"
          style={{ fontFamily: "Tagesschrift, serif" }}
        >
          Burger
        </h1>
        <h1
          className="text-white text-center z-[30] text-6xl lg:text-8xl relative"
          style={{ fontFamily: "Tagesschrift, serif" }}
        >
          Station
        </h1>

        {circles.map((circle, i) => (
          <span
            key={i}
            className={`absolute rounded-full bg-orange-500 opacity-80 animate-float ${circle.size} ${circle.top} ${circle.left} ${circle.delay}`}
          />
        ))}
      </header>

      <div className="relative min-h-screen bg-black p-4">
        <main className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:max-w-7xl md:m-auto">
          {products.map((product) => (
            <div
              key={product.product_id}
              onClick={() => {
                setSelectedProduct(product);
                setIsOpen(true);
              }}
              className="bg-transparent rounded-lg p-4 flex flex-col justify-center items-center text-center w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mb-6 md:m-auto cursor-pointer max-h-full min-h-full
    ring-2  border-1 shadow-[0_0_10px_#f97316]  drop-shadow-[0_0_20px_#f97316] transition-all duration-300 hover:drop-shadow-[0_0_40px_#f97316] hover:shadow-[0_0_15px_#fbbf24,0_0_30px_#fbbf24,0_0_45px_#fbbf24]"
            >
              <img src={imagenTemporal} alt="" className="mb-2 max-h-48 object-contain" />
              {/* <img src="/Montanesa.webp" alt="" className="mb-2 max-h-48 object-contain" /> */}
              <h2 className="text-xl font-bold text-white"  style={{ fontFamily: "Tagesschrift, serif" }}>{product.name}</h2>
              <span className="mb-2 text-sm text-white line-clamp-2">{product.description}</span>
              <p className="text-2xl font-bold text-white">${product.price.toFixed(2)}</p>
            </div>
          ))}
        </main>

        <AnimatePresence>
          {isOpen && selectedProduct && (
            <div>
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[9998]" onClick={() => setIsOpen(false)}></div>

              <motion.div
                initial={isDesktop ? { x: "100%" } : { y: "100%" }}
                animate={isDesktop ? { x: 0 } : { y: 0 }}
                exit={isDesktop ? { x: "100%" } : { y: "100%" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`fixed z-[9999] bg-white shadow-2xl overflow-y-auto p-6 rounded-t-3xl ${
                  isDesktop
                    ? "top-0 right-0 h-full  rounded-none rounded-l-3xl"
                    : "bottom-0 left-0 right-0 max-h-[100%]"
                }`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">{selectedProduct.name}</h2>
                  <button onClick={() => setIsOpen(false)}>✕</button>
                </div>

                <div className=" lg:h-full">
                  <div className="flex flex-col justify-center items-center mb-4 lg:mb-0 lg:flex-1 lg:justify-center max-w-md mx-auto ">
                    {/* <img src={"/Montanesa.webp"} alt={selectedProduct.name} className="h-64 object-contain mb-2" /> */}
                    <img src={imagenTemporal} alt={selectedProduct.name} className="h-64 object-contain mb-2" />
                    <p className="text-gray-600 text-center px-4 mb-2 break-words">{selectedProduct.description}</p>
                    <p className="text-lg font-bold text-center">${selectedProduct.price.toFixed(2)}</p>
                  </div>

                  <div className="lg:flex-1 lg:flex lg:m-auto lg:flex-col lg:justify-center ">
                    <div className="mb-4">
                      <h3 className="font-semibold">Adiciones (máximo 3)</h3>
                      {options.adiciones.map((item) => (
                        <label key={item.name} className="flex items-center justify-between mb-1">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={adiciones.includes(item.name)}
                            onChange={() => toggleCheck(item.name, adiciones, setAdiciones, 3)}
                          />
                          {renderOptionLabel(item.name, item.price, adiciones.includes(item.name))}
                        </label>
                      ))}
                    </div>

                    <div className="mb-4">
                      <h3 className="font-semibold">Salsas (máximo 2)</h3>
                      {options.salsas.map((item) => (
                        <label key={item.name} className="flex items-center justify-between mb-1">
                          <input
                            type="checkbox"
                            className="mr-2"
                            checked={salsas.includes(item.name)}
                            onChange={() => toggleCheck(item.name, salsas, setSalsas, 2)}
                          />
                          {renderOptionLabel(item.name, item.price, salsas.includes(item.name))}
                        </label>
                      ))}
                    </div>

                    <div className="mb-4">
                      <h3 className="font-semibold">Tipo de Papas</h3>
                      {options.papas.map((item) => (
                        <label key={item.name} className="flex items-center justify-between mb-1">
                          <input
                            type="radio"
                            name="papa"
                            className="mr-2"
                            checked={papa === item.name}
                            onChange={() => setPapa(item.name)}
                          />
                          {renderOptionLabel(item.name, item.price, papa === item.name)}
                        </label>
                      ))}
                    </div>

                    <div className="mb-4">
                      <h3 className="font-semibold">Bebida</h3>
                      {options.bebidas.map((item) => (
                        <label key={item.name} className="flex items-center justify-between mb-1">
                          <input
                            type="radio"
                            name="bebida"
                            className="mr-2"
                            checked={bebida === item.name}
                            onChange={() => setBebida(item.name)}
                          />
                          {renderOptionLabel(item.name, item.price, bebida === item.name)}
                        </label>
                      ))}
                    </div>
                    <AddToCartButton
                      setIsOpen={setIsOpen}
                      selectedProduct={{ ...selectedProduct, extras: buildExtras() }}
                      unitPrice={totalPrice.toFixed(2)}
                      resetExtras={resetExtras}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
