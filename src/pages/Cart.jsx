import Heading from "../components/Heading";
import { useCartContext } from "../contexts/CartContext";
import { useProductContext } from "../contexts/ProductContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCartHandler,
    size,
  } = useCartContext();
  const { getDiscountedPrice } = useProductContext();

  const cartTotal = cartItems.reduce((acc, curr) => {
    const discountedPrice = getDiscountedPrice(
      curr.price,
      curr.discountOffered
    );
    return acc + discountedPrice * curr.quantity;
  }, 0);

  return (
    <section style={{ marginBottom: "50px" }}>
      <div className="container px-0 py-5">
        <div style={{ marginBottom: "150px" }}>
          <Heading title="Shopping Cart" />
        </div>

        {cartItems.length === 0 ? (
          <p className="text-center fs-3">Your cart is empty!</p>
        ) : (
          <>
            {/* Table Header */}
            <div className="row border-bottom  fw-semibold text-secondary d-none d-md-flex">
              <div className="col-md-6">Product</div>
              <div className="col-md-2 text-end">Price</div>
              <div className="col-md-2 text-center">Quantity</div>
              <div className="col-md-2 text-end">Total</div>
            </div>

            {/* Cart Items */}
            {cartItems.map((item) => {
              const discountedPrice = getDiscountedPrice(
                item.price,
                item.discountOffered
              );

              return (
                <div
                  key={item._id}
                  className="row align-items-center border-bottom mx-2 mx-md-0"
                  style={{
                    padding: "28px 0", // bigger vertical spacing like reference
                  }}
                >
                  {/* Product Details */}
                  <div className="col-12 col-md-6 px-0 d-flex align-items-center mb-3 mb-md-0">
                    <Link
                      // onClick={scrollToTop}
                      to={`/products/${item._id}`}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="img-fluid me-3"
                        style={{
                          maxWidth: "100px",
                          borderRadius: "8px",
                        }}
                      />
                    </Link>
                    <div>
                      <p
                        className="mb-1 fw-medium"
                        style={{ fontSize: "1.1rem" }}
                      >
                        {item.title}
                      </p>
                      <p
                        className="mb-0 text-muted"
                        style={{ fontSize: "1rem" }}
                      >
                        Size: {item.selectedSize}
                      </p>
                      <button
                        onClick={() => removeFromCartHandler(item._id)}
                        className="btn btn-link p-0 mt-1"
                        style={{
                          fontSize: "0.9rem",
                          textDecoration: "underline",
                          color: "#6c757d",
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Price */}
                  <div
                    className="col-6 col-md-2 text-start px-0 text-md-end mb-2 mb-md-0"
                    style={{ fontSize: "1.05rem" }}
                  >
                    ₹{discountedPrice.toFixed(2)}
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-6 col-md-2 d-flex px-0 justify-content-start justify-content-md-center align-items-center gap-2 mb-2 mb-md-0">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      style={{ fontSize: "1.1rem", padding: "6px 12px" }}
                      onClick={() =>
                        decreaseQuantity(item._id, item.selectedSize)
                      }
                    >
                      −
                    </button>
                    <span
                      style={{
                        fontSize: "1.05rem",
                        minWidth: "28px",
                        textAlign: "center",
                      }}
                    >
                      {item.quantity}
                    </span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      style={{ fontSize: "1.1rem", padding: "6px 12px" }}
                      onClick={() =>
                        increaseQuantity(item._id, item.selectedSize)
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* Total */}
                  <div
                    className="col-12 col-md-2 text-start px-0 text-md-end"
                    style={{ fontSize: "1.05rem" }}
                  >
                    ₹{(discountedPrice * item.quantity).toFixed(2)}
                  </div>
                </div>
              );
            })}

            {/* Summary Section */}
            <div className="row justify-content-end mt-4 mx-2 mx-md-0">
              <div className="col-12 col-md-4 border-top pt-3 px-0">
                <div className="d-flex justify-content-between mb-2">
                  <span className="fw-medium">Subtotal</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
                <p className="text-muted mb-3" style={{ fontSize: "0.9rem" }}>
                  Taxes and shipping calculated at checkout
                </p>
                <Link to={"/address"}>
                  {" "}
                  <button className="btn btn-dark w-100 py-2 fw-medium">
                    CHECKOUT
                  </button>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Cart;
