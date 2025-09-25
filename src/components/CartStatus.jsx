import { useCartContext } from "../contexts/CartContext";

const CartStatus = () => {
  const { cartItems } = useCartContext();

  return (
    cartItems.length > 0 && (
      <span
        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
        style={{
          fontSize: "0.7rem",
          padding: "4px 6px",
          minWidth: "18px",
          textAlign: "center",
        }}
      >
        {cartItems.length}
      </span>
    )
  );
};

export default CartStatus;
