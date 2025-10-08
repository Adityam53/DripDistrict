import Heading from "../components/Heading";
import { useAddressContext } from "../contexts/AddressContext";
import { useCartContext } from "../contexts/CartContext";
import { useProductContext } from "../contexts/ProductContext";
import { useOrderContext } from "../contexts/OrderContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cartItems, setCartItems } = useCartContext();
  const { getDiscountedPrice } = useProductContext();
  const { selectedAddress } = useAddressContext();
  const { addOrder } = useOrderContext();
  const navigate = useNavigate();

  const cartTotal = cartItems.reduce((acc, curr) => {
    const discountedPrice = getDiscountedPrice(
      curr.price,
      curr.discountOffered
    );
    return acc + discountedPrice * curr.quantity;
  }, 0);

  const shipping = cartTotal > 2000 ? 0 : 299;
  const total = shipping + cartTotal;

  const placeOrderHandler = () => {
    if (!selectedAddress) {
      toast.error(" Please select an address before placing the order.");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("🛒 Your cart is empty!");
      return;
    }

    const newOrder = {
      items: cartItems.map((item) => ({
        _id: item._id,
        title: item.title,
        imageUrl: item.imageUrl,
        price: item.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize,
      })),
      total: cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
      address: selectedAddress,
    };

    addOrder(newOrder);
    toast.success("Order placed successfully!");

    // Redirect after short delay
    setTimeout(() => {
      navigate("/orders");
    }, 1500);
    setCartItems([]);
  };

  return (
    <div className="container px-0 py-5">
      <Heading title={"Checkout"} />

      {/* Order Summary */}
      <div className="mb-4 p-4 border rounded shadow">
        <h6>
          Order Summary |{" "}
          {cartItems.length > 0 && <span>{cartItems.length} Items</span>}
        </h6>
        <hr />
        <div className="d-flex flex-column gap-3">
          {cartItems.map((item) => {
            const discountedPrice = getDiscountedPrice(
              item.price,
              item.discountOffered
            ).toFixed(0);

            return (
              <div
                className="d-flex align-items-center gap-4"
                key={item.id || item.title}
              >
                <img
                  src={item.imageUrl}
                  className="card-img-top"
                  style={{
                    height: "110px",
                    width: "75px",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                  alt={item.title}
                />
                <div>
                  <p className="fw-bold mb-1">{item.title}</p>
                  <p className="mb-0">₹{discountedPrice}</p>
                  <p
                    className="text-muted"
                    style={{ textDecoration: "line-through" }}
                  >
                    ₹{item.price}
                  </p>
                  <small>Qty: {item.quantity}</small>
                </div>
              </div>
            );
          })}
        </div>
        <hr style={{ borderTop: "1px dashed" }} />
        <div className="mt-2">
          <p className="fw-bold">Subtotal: ₹{cartTotal.toFixed(2)}</p>
          <p>
            Shipping:{" "}
            {shipping === 0 ? (
              <span className="text-success">Free Delivery</span>
            ) : (
              `₹${shipping}`
            )}
          </p>
          <h5>Total: ₹{total.toFixed(2)}</h5>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="mb-4 p-4 border rounded shadow">
        <h6>Delivery Address</h6>
        <hr />
        {selectedAddress ? (
          <div>
            <p>{selectedAddress}</p>
          </div>
        ) : (
          <p className="text-danger">No address selected. Please add one.</p>
        )}
      </div>

      {/* Place Order */}
      <div className="text-center">
        <button
          className="btn btn-dark btn-lg"
          disabled={cartItems.length === 0 || !selectedAddress}
          onClick={placeOrderHandler}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
