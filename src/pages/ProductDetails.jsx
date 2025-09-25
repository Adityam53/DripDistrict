import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { AiOutlineHeart } from "react-icons/ai";
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
  } = useCartContext();
  const { addToWishlistHandler, wishlistItems } = useWishListContext();

  const { productId } = useParams();
  const { data, loading, error } = useFetch(
    `https://drip-district-backend.vercel.app/clothes/${productId}`
  );

  const isInWishlist = wishlistItems.some((item) => item._id === productId);
  useEffect(() => {
    scrollToTop();
  }, [scrollToTop, productId]);

  return (
    <>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-danger">An error occurred.</p>}

      {data && (
        <section>
          <div className="d-flex">
            {/* Product Image */}
            <div>
              <img src={data.imageUrl} className="img-fluid" alt={data.title} />
            </div>

            {/* Product Details */}
            <div className="w-100 ms-5 me-5">
              {/* Discount & Wishlist */}
              <div>
                <p className="d-flex justify-content-between">
                  <span className="bg-dark text-light px-3">
                    -{data.discountOffered}%
                  </span>
                  <span>
                    <AiOutlineHeart size={24} style={{ cursor: "pointer" }} />
                  </span>
                </p>
              </div>

              {/* Title */}
              <p className="fs-4 fw-semibold">{data.title}</p>

              {/* Rating */}
              <p style={{ fontSize: 13 }}>
                <span>Rating:</span> {data.rating}
              </p>

              {/* Price */}
              <p>
                <b className="fs-5">
                  ₹
                  {(
                    data.price -
                    (data.price * data.discountOffered) / 100
                  ).toFixed(0)}
                </b>
                {data.price && (
                  <span
                    className="ms-2"
                    style={{
                      textDecoration: "line-through",
                      color: "red",
                      fontSize: "14px",
                    }}
                  >
                    ₹{data.price}
                  </span>
                )}
              </p>

              {/* Quantity */}
              <p style={{ fontSize: 13, fontWeight: "500" }}>
                Quantity:
                <span
                  onClick={() => decreaseProductPageQuantity()}
                  className="border border-secondary p-1 px-2 rounded-circle ms-2"
                  style={{
                    cursor: "pointer",
                    background: "#f8f9fa",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#e9ecef")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#f8f9fa")
                  }
                >
                  -
                </span>
                <span className="ms-2">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min={1}
                    max={9}
                    className="text-center py-0 border rounded"
                    size={1}
                    style={{
                      width: "45px",
                      fontSize: "14px",
                      padding: "2px",
                    }}
                  />
                </span>
                <span
                  onClick={() => increaseProductPageQuantity()}
                  className="border border-secondary p-1 px-2 rounded-circle ms-2"
                  style={{
                    cursor: "pointer",
                    background: "#f8f9fa",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#e9ecef")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#f8f9fa")
                  }
                >
                  +
                </span>
              </p>

              {/* Sizes */}
              <p style={{ fontSize: 13, fontWeight: "500" }} className="pt-2">
                Size:{" "}
                {data.availableSizes.map((size, index) => (
                  <span
                    key={index}
                    className="border border-secondary py-1 px-3 ms-2 rounded"
                    style={{
                      fontSize: "12px",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#000";
                      e.currentTarget.style.color = "#fff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#000";
                    }}
                  >
                    {size}
                  </span>
                ))}
              </p>

              {/* Buttons */}
              <div className="pt-3 d-flex flex-column gap-3 w-100">
                <button
                  className="btn btn-dark text-light w-50"
                  style={{
                    borderRadius: "8px",
                    fontWeight: "500",
                    padding: "10px",
                    letterSpacing: "0.5px",
                  }}
                  onClick={() => addToCartHandler(data._id, parseInt(quantity))}
                >
                  ADD TO CART
                </button>
                <button
                  className="btn btn-outline-dark w-50"
                  style={{
                    borderRadius: "8px",
                    fontWeight: "500",
                    padding: "10px",
                    letterSpacing: "0.5px",
                  }}
                  onClick={() => addToWishlistHandler(data._id)}
                >
                  {isInWishlist ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
                </button>
              </div>

              {/* Features */}
              <div className="pt-3">
                <hr style={{ borderColor: "#dee2e6" }} />
                <div className="ms-3 d-flex gap-5 align-items-center text-muted">
                  <div className="d-flex flex-column align-items-center gap-2">
                    <AiOutlineWallet size={36} />
                    <span className="text-center" style={{ fontSize: 12 }}>
                      Pay On <br /> Delivery
                    </span>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-2">
                    <AiOutlineUndo size={36} />
                    <span className="text-center" style={{ fontSize: 12 }}>
                      10 Days <br /> Returnable
                    </span>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-2">
                    <AiOutlineCar size={36} />
                    <span className="text-center" style={{ fontSize: 12 }}>
                      Free <br /> Delivery
                    </span>
                  </div>
                  <div className="d-flex flex-column align-items-center gap-2">
                    <AiOutlineCreditCard size={36} />
                    <span className="text-center" style={{ fontSize: 12 }}>
                      Secure <br /> Payments
                    </span>
                  </div>
                </div>
                <hr style={{ borderColor: "#dee2e6" }} />
              </div>

              {/* Description */}
              <p style={{ fontSize: 13 }} className="pt-2">
                Description:
              </p>
              <ul>
                {data.description.map((desc, index) => (
                  <li key={index}>{desc}</li>
                ))}
              </ul>
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
