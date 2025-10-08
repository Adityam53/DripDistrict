import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import {
  AiOutlineWallet,
  AiOutlineUndo,
  AiOutlineCar,
  AiOutlineCreditCard,
} from "react-icons/ai";
import BestSellers from "../components/BestSellers";
import { useProductContext } from "../contexts/ProductContext";
import { useEffect } from "react";
import { useCartContext } from "../contexts/CartContext";
import { useWishListContext } from "../contexts/WishListContext";

const ProductDetails = () => {
  const { scrollToTop } = useProductContext();
  const {
    setQuantity,
    quantity,
    addToCartHandler,
    increaseProductPageQuantity,
    decreaseProductPageQuantity,
    size,
    setSize,
  } = useCartContext();
  const { addToWishlistHandler, wishlistItems } = useWishListContext();

  const { productId } = useParams();
  const { data, loading, error } = useFetch(
    `https://drip-district-backend.vercel.app/clothes/${productId}`
  );

  const isInWishlist = wishlistItems.some((item) => item._id === productId);
  useEffect(() => {
    scrollToTop();
    setSize(null);
  }, [scrollToTop, productId, setSize]);

  return (
    <>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-danger">An error occurred.</p>}

      {data && (
        <section className="px-3 py-4">
          <div className="product-details-wrapper d-flex flex-md-row flex-column gap-4">
            {/* IMAGE SECTION */}
            <div className="product-image-wrapper">
              <img
                src={data.imageUrl}
                className="img-fluid"
                alt={data.title}
                style={{ width: "100%", maxWidth: "500px" }}
              />
            </div>

            {/* PRODUCT INFO */}
            <div className="product-info flex-grow-1">
              {/* Discount & Wishlist */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="bg-dark text-light px-3 py-1 rounded">
                  -{data.discountOffered}%
                </span>
                <span
                  onClick={() => addToWishlistHandler(data._id)}
                  style={{ cursor: "pointer" }}
                >
                  {isInWishlist ? (
                    <AiFillHeart size={24} color="red" />
                  ) : (
                    <AiOutlineHeart size={24} color="black" />
                  )}
                </span>
              </div>

              {/* Title */}
              <h2 className="mb-2">{data.title}</h2>

              {/* Rating */}
              <p className="mb-2" style={{ fontSize: "0.9rem" }}>
                Rating: {data.rating}
              </p>

              {/* Price */}
              <div className="mb-3">
                <span className="fs-4 fw-bold text-dark">
                  ₹
                  {(
                    data.price -
                    (data.price * data.discountOffered) / 100
                  ).toFixed(0)}
                </span>
                <span
                  className="ms-2 text-muted"
                  style={{ textDecoration: "line-through", fontSize: "0.9rem" }}
                >
                  ₹{data.price}
                </span>
              </div>

              {/* Quantity */}
              <div className="mb-3">
                <label
                  className="me-2"
                  style={{ fontSize: "0.9rem", fontWeight: 500 }}
                >
                  Quantity:
                </label>
                <div className="d-inline-flex align-items-center">
                  <button
                    onClick={decreaseProductPageQuantity}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min={1}
                    max={9}
                    className="form-control mx-2 text-center"
                    style={{ width: "60px", padding: "0.25rem" }}
                  />
                  <button
                    onClick={increaseProductPageQuantity}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-4">
                <span style={{ fontSize: "0.9rem", fontWeight: 500 }}>
                  Sizes:
                </span>
                {data.availableSizes.map((item, idx) => (
                  <span
                    key={idx}
                    className="border border-secondary px-3 py-1 ms-2 rounded d-inline-block mt-2"
                    style={{
                      fontSize: "0.85rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      background: size === item ? "#000" : "transparent",
                      color: size === item ? "#fff" : "#000",
                      border:
                        size === item ? "2px solid #000" : "1px solid #ccc",
                    }}
                    onClick={() => setSize(item)}
                    onMouseEnter={(e) => {
                      if (size !== item) {
                        e.currentTarget.style.background = "#000";
                        e.currentTarget.style.color = "#fff";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (size !== item) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#000";
                      }
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
                <button
                  className="btn btn-outline-dark px-4"
                  onClick={() =>
                    addToCartHandler(data._id, parseInt(quantity), size)
                  }
                  // disabled={!size}
                >
                  ADD TO CART
                </button>
                <button
                  className="btn btn-outline-dark px-4"
                  onClick={() => addToWishlistHandler(data._id)}
                >
                  {isInWishlist ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
                </button>
              </div>

              {/* Features Section */}
              <div className="mb-4">
                <hr />
                <div className="d-flex flex-wrap justify-content-between text-center text-muted">
                  <div className="p-2 flex-fill d-flex flex-column align-items-center">
                    <AiOutlineWallet size={36} />
                    <span className="mt-2" style={{ fontSize: "0.85rem" }}>
                      Pay On <br /> Delivery
                    </span>
                  </div>
                  <div className="p-2 flex-fill d-flex flex-column align-items-center">
                    <AiOutlineUndo size={36} />
                    <span className="mt-2" style={{ fontSize: "0.85rem" }}>
                      10 Days <br /> Returnable
                    </span>
                  </div>
                  <div className="p-2 flex-fill d-flex flex-column align-items-center">
                    <AiOutlineCar size={36} />
                    <span className="mt-2" style={{ fontSize: "0.85rem" }}>
                      Free <br /> Delivery
                    </span>
                  </div>
                  <div className="p-2 flex-fill d-flex flex-column align-items-center">
                    <AiOutlineCreditCard size={36} />
                    <span className="mt-2" style={{ fontSize: "0.85rem" }}>
                      Secure <br /> Payments
                    </span>
                  </div>
                </div>
                <hr />
              </div>

              {/* Description */}
              <div>
                <h5>Description:</h5>
                <ul>
                  {data.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Best Sellers */}
      <div className="mb-5">
        <BestSellers />
      </div>
    </>
  );
};

export default ProductDetails;
