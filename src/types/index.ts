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
