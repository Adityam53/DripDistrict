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
  const [size, setSize] = useState("");

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  const addToCartHandler = (selectedProdId, selectedQuantity, selectedSize) => {
    const product = products.find((prod) => prod._id === selectedProdId);
    if (!product) return;

    if (!size) {
      toast.error("Please select a size to move forward.");
      return;
    }

    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item._id === selectedProdId && item.selectedSize === selectedSize
      );
      if (existing) {
        return prev.map((item) =>
          item._id === selectedProdId && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + selectedQuantity }
            : item
        );
      }
      return [
        ...prev,
        { ...product, quantity: selectedQuantity, selectedSize },
      ];
    });

    toast.success(`Added ${product.title} (${selectedSize}) to cart`);
  };

  const removeFromCartHandler = (selectedProdId, selectedSize) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item._id === selectedProdId &&
            (!selectedSize || item.selectedSize === selectedSize)
          )
      )
    );
  };

  const increaseQuantity = (id, selectedSize) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id && item.selectedSize === selectedSize
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id, selectedSize) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id &&
        item.quantity > 1 &&
        item.selectedSize === selectedSize
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
  const resetSize = () => setSize("");

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
        size,
        setSize,
        resetSize,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
