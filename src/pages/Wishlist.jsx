import { useState } from "react";
import Heading from "../components/Heading";
import { useProductContext } from "../contexts/ProductContext";
import { useWishListContext } from "../contexts/WishListContext";
import { useCartContext } from "../contexts/CartContext";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlistHandler } = useWishListContext();

  const { getDiscountedPrice } = useProductContext();

  const { addToCartHandler } = useCartContext();

  // store selected size for each product
  const [selectedSizes, setSelectedSizes] = useState({});

  const handleSizeChange = (productId, size) => {
    setSelectedSizes((prev) => ({
      ...prev,
      [productId]: size,
    }));
  };

  const handleAddToCart = (item) => {
    const size = selectedSizes[item._id];

    if (!size) {
      toast.error("Please select a size");
      return;
    }

    // SAME STYLE as ProductDetails
    addToCartHandler(item._id, 1, size);
  };

  return (
    <section style={{ marginBottom: "50px" }}>
      <div className="container px-0 py-5">
        <div style={{ marginBottom: "80px" }}>
          <Heading title="Wishlist" />
        </div>

        {wishlistItems.length === 0 ? (
          <p className="text-center fs-3">Make a wish!</p>
        ) : (
          <div className="row g-4">
            {wishlistItems.map((item) => {
              const discountedPrice = getDiscountedPrice(
                item.price,
                item.discountOffered,
              );

              return (
                <div
                  key={item._id}
                  className="col-sm-6 col-md-4 col-lg-3 d-flex"
                >
                  <div className="card shadow-sm border-0 w-100 d-flex flex-column">
                    {/* IMAGE */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="card-img-top"
                      style={{
                        height: "220px",
                        objectFit: "cover",
                        borderTopLeftRadius: "8px",
                        borderTopRightRadius: "8px",
                      }}
                    />

                    <div className="card-body text-center d-flex flex-column flex-grow-1">
                      {/* TITLE */}
                      <p className="fw-medium mb-1">{item.title}</p>

                      {/* PRICE */}
                      <p className="text-muted text-decoration-line-through mb-0">
                        ₹{item.price}
                      </p>

                      <p className="fw-bold mb-2">
                        ₹{discountedPrice.toFixed(0)}
                      </p>

                      {/* SIZE SELECTOR */}
                      {item.availableSizes?.length > 0 && (
                        <div className="mb-3">
                          <select
                            className="form-select form-select-sm"
                            value={selectedSizes[item._id] || ""}
                            onChange={(e) =>
                              handleSizeChange(item._id, e.target.value)
                            }
                          >
                            <option value="">Select Size</option>

                            {item.availableSizes.map((size) => (
                              <option key={size} value={size}>
                                {size}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {/* ACTION BUTTONS */}
                      <div className="mt-auto">
                        <button
                          className="btn btn-dark w-100 mb-2 fw-medium"
                          onClick={() => handleAddToCart(item)}
                        >
                          Add to Cart
                        </button>

                        <button
                          className="btn btn-outline-secondary w-100 fw-medium"
                          onClick={() => removeFromWishlistHandler(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
