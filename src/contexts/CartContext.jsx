import { createContext, useContext, useEffect, useState } from "react";
import { useProductContext } from "./ProductContext";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);
export const CartProvider = ({ children }) => {
  const { products } = useProductContext();
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  const addToCartHandler = (selectedProdId, selectedQuantity) => {
    const product = products.find((prod) => prod._id === selectedProdId);
    if (!product) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item._id === selectedProdId);
      if (existing) {
        return prev.map((item) =>
          item._id === selectedProdId
            ? { ...item, quantity: item.quantity + selectedQuantity }
            : item
        );
      }
      return [...prev, { ...product, quantity: selectedQuantity }];
    });

    toast.success(`Added ${product.title} to cart`);
  };

  const removeFromCartHandler = (selectedProdId) => {
    setCartItems((prev) => prev.filter((item) => item._id != selectedProdId));
  };

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  const increaseProductPageQuantity = () => {
    setQuantity((prev) => Math.min(prev + 1, 9));
  };

  const decreaseProductPageQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCartHandler,
        quantity,
        setQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCartHandler,
        increaseProductPageQuantity,
        decreaseProductPageQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
