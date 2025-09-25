import { createContext, useContext, useEffect, useState } from "react";
import { useProductContext } from "./ProductContext";
import { toast } from "react-toastify";

const WishListContext = createContext();

export const useWishListContext = () => useContext(WishListContext);
export const WishlistProvider = ({ children }) => {
  const { products } = useProductContext();
  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const addToWishlistHandler = (selectedProdId) => {
    const product = products.find((prod) => prod._id === selectedProdId);
    if (!product) return;

    setWishlistItems((prev) => {
      const existing = prev.find((item) => item._id === selectedProdId);

      if (existing) {
        toast.info(`Removed ${product.title} from wishlist`, {
          toastId: product._id,
        });
        return prev.filter((item) => item._id !== selectedProdId);
      } else {
        toast.success(`Added ${product.title} to wishlist`, {
          toastId: product._id,
        });
        return [...prev, product];
      }
    });
  };
  const removeFromWishlistHandler = (selectedProdId) => {
    setWishlistItems((prev) =>
      prev.filter((item) => item._id !== selectedProdId)
    );
  };
  return (
    <WishListContext.Provider
      value={{
        addToWishlistHandler,
        wishlistItems,
        removeFromWishlistHandler,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};
