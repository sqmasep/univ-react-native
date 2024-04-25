import { createContext, useContext, useEffect, useState } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductContext = createContext<{
  isLoading: boolean;
  isError: boolean;
  products: Product[];
}>(null);

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [states, setStates] = useState({
    isLoading: true,
    isError: false,
  });

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setStates(prev => ({ ...prev, isLoading: false }));
      })
      .catch(() => {
        setStates(prev => ({ ...prev, isError: true }));
      });
  }, []);

  return (
    <ProductContext.Provider value={{ products, ...states }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  return useContext(ProductContext);
}
