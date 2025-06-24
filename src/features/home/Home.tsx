import { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/Navbar";
import axios from "axios";
import AnimatedModalWrapper from "@/components/AnimatedModalWrapper";
import HeroHeader from "@/components/HeroHeader";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { BASE_URL } from "@/api";
import Footer from "@/components/Footer";

export interface Product {
  product_id: number;
  name: string;
  price: number;
  description: string | null;
  categoryId: number;
}

export interface Category {
  category_id: number;
  name: string;
  products: Product[];
}

export interface Options {
  adiciones: Product[];
  salsas: Product[];
  papas: Product[];
  bebidas: Product[];
}

export default function Home() {
  useDocumentTitle("Menu - BS");
  const [errMessg, setErrMessg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [adiciones, setAdiciones] = useState<string[]>([]);
  const [salsas, setSalsas] = useState<string[]>([]);
  const [papa, setPapa] = useState<string | null>(null);
  const [bebida, setBebida] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [options, setOptions] = useState<Options>({
    adiciones: [],
    salsas: [],
    papas: [],
    bebidas: [],
  });

  useEffect(() => {
  const fetchProductsAndOptions = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${BASE_URL}/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.statusCode === 200) {
        const categories: Category[] = response.data.data;

        const hamburguesas = categories.find((cat) => cat.category_id === 1);
        if (hamburguesas?.products) {
          setProducts(hamburguesas.products);
        }

        const adiciones = categories.find((cat) => cat.category_id === 2)?.products || [];
        const papas = categories.find((cat) => cat.category_id === 3)?.products || [];
        const bebidas = categories.find((cat) => cat.category_id === 4)?.products || [];
        const salsas = categories.find((cat) => cat.category_id === 5)?.products || [];

        setOptions({ adiciones, salsas, papas, bebidas });
      } else {
        setErrMessg("Error del servidor, contacta al equipo de Burger Station!");
      }
    } catch (error) {
      console.error("Error al obtener productos u opciones:", error);
      setErrMessg("Hubo un problema cargando los productos.");
    } finally {
      setIsLoading(false); 
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

  const getPrice = (name: string, list: Product[]): number => {
    return list.find((item) => item.name === name)?.price || 0;
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

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
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
      resetExtras();
    }
  }, [isOpen]);

  return (
  <div className="pt-[68px] flex flex-col min-h-screen bg-black">
    <Navbar />
    <HeroHeader />

    <div className="relative p-4 flex-grow">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <main className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:max-w-7xl md:m-auto">
          {products.map((product) => (
            <div
              key={product.product_id}
              onClick={() => {
                setSelectedProduct(product);
                setIsOpen(true);
              }}
              className="bg-transparent rounded-lg p-4 flex flex-col justify-center items-center text-center w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mb-6 md:m-auto cursor-pointer max-h-full min-h-full
                ring-2 border-1 shadow-[0_0_10px_#f97316] drop-shadow-[0_0_20px_#f97316] transition-all duration-300 hover:drop-shadow-[0_0_40px_#f97316] hover:shadow-[0_0_15px_#fbbf24,0_0_30px_#fbbf24,0_0_45px_#fbbf24]"
            >
              <img
                src={`${product.product_id}.webp`}
                alt={product.name}
                className="mb-4 max-h-48 max-w-42 object-contain"
              />
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "Tagesschrift, serif" }}>
                {product.name}
              </h2>
              <span className="mb-2 text-sm text-white line-clamp-2">{product.description}</span>
              <span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
            </div>
          ))}
        </main>
      )}

      {errMessg && (
        <div>
          <h1 style={{ fontFamily: "Tagesschrift, serif" }} className="text-white text-center">{errMessg}</h1>
        </div>
      )}

      {selectedProduct && (
        <AnimatedModalWrapper
          isOpen={isOpen}
          isDesktop={isDesktop}
          onClose={() => setIsOpen(false)}
          selectedProduct={selectedProduct}
          adiciones={adiciones}
          setAdiciones={setAdiciones}
          salsas={salsas}
          setSalsas={setSalsas}
          papa={papa}
          setPapa={setPapa}
          bebida={bebida}
          setBebida={setBebida}
          options={options}
          totalPrice={totalPrice}
          resetExtras={resetExtras}
        />
      )}
    </div>

    <Footer />
  </div>
);

}
