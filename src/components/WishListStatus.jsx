import { useCartContext } from "../contexts/CartContext";
import { useWishListContext } from "../contexts/WishListContext";

const WishListStatus = () => {
  const { wishlistItems } = useWishListContext();

  return (
    wishlistItems.length > 0 && (
      <span
        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        style={{
          fontSize: "0.7rem",
          padding: "4px 6px",
          minWidth: "18px",
          textAlign: "center",
        }}
      >
        {wishlistItems.length}
      </span>
    )
  );
};

export default WishListStatus;
