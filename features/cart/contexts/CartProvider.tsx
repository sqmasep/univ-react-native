import { createContext, useContext, useState } from "react";
import { Product } from "../../products/contexts/ProductProvider";

const CartContext = createContext<{
  products: { id: Product["id"]; quantity: number }[];
  addToCart: (id: number) => void;
  removeFromCart: (id: number, shouldRemoveAll?: boolean) => void;
  clearCart: () => void;
}>({
  products: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

export default function CartProvider({ children }) {
  const [products, setCart] = useState([]);

  function addToCart(id: number) {
    const existingProduct = products.find(product => product.id === id);

    if (existingProduct) {
      setCart(
        products.map(product =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    } else {
      setCart([...products, { id, quantity: 1 }]);
    }
  }

  function removeFromCart(id: number, shouldRemoveAll = false) {
    const existingProduct = products.find(product => product.id === id);

    if (existingProduct) {
      if (existingProduct.quantity === 1 || shouldRemoveAll) {
        setCart(products.filter(product => product.id !== id));
      } else {
        setCart(
          products.map(product =>
            product.id === id
              ? { ...product, quantity: product.quantity - 1 }
              : product
          )
        );
      }
    }
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <CartContext.Provider
      value={{ products, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
