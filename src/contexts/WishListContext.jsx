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
    const product = wishlistItems.find((item) => item._id === selectedProdId);

    setWishlistItems((prev) =>
      prev.filter((item) => item._id !== selectedProdId),
    );

    if (product) {
      toast.info(`Removed ${product.title} from wishlist`, {
        toastId: product._id,
      });
    }
  };

  const moveToWishlistHandler = (selectedProdId) => {
    const product = products.find((prod) => prod._id === selectedProdId);

    if (!product) return;

    setWishlistItems((prev) => {
      const existing = prev.find((item) => item._id === selectedProdId);

      // Already exists in wishlist
      if (existing) {
        toast.info(`${product.title} already in wishlist`, {
          toastId: product._id,
        });

        return prev;
      }

      toast.success(`Moved ${product.title} to wishlist`, {
        toastId: product._id,
      });

      return [...prev, product];
    });
  };
  const addToCartFromWishlistHandler = () => {
    toast.error("Please select a size to move forward.");
  };
  return (
    <WishListContext.Provider
      value={{
        addToWishlistHandler,
        wishlistItems,
        removeFromWishlistHandler,
        addToCartFromWishlistHandler,
        moveToWishlistHandler,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};
