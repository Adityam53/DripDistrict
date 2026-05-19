import { useProductContext } from "../contexts/ProductContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useCartContext } from "../contexts/CartContext";
import { useWishListContext } from "../contexts/WishListContext";

const ProductListing = () => {
  const {
    displayProducts,
    loading,
    error,
    allProducts,
    scrollToTop,
    setProducts,
    setDisplayProducts,
    handleClearClick,
    setIsCategoryView,
    setSearch,
    getDiscountedPrice,
  } = useProductContext();

  // const { addToCartHandler, quantity } = useCartContext();
  const { addToWishlistHandler, wishlistItems } = useWishListContext();

  useEffect(() => {
    setProducts(allProducts);
    setDisplayProducts(allProducts);
    handleClearClick();
    scrollToTop();
    setIsCategoryView(false);
    setSearch("");
  }, []);

  const totalProducts = displayProducts?.length || 0;

  return (
    <section className="container-fluid px-3 px-md-4 mb-5">
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-danger">An error occurred.</p>}

      {!loading && !error && (
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center mb-3 text-center text-sm-start">
          <h5 className="fw-semibold mb-2 mb-sm-0">All Products</h5>
          <p className="text-muted m-0">
            Showing <strong>{totalProducts}</strong>{" "}
            {totalProducts === 1 ? "product" : "products"}
          </p>
        </div>
      )}

      <div className="row g-3">
        {displayProducts && displayProducts.length > 0
          ? displayProducts.map((prod) => {
              const discountedPrice = getDiscountedPrice(
                prod.price,
                prod.discountOffered,
              ).toFixed(0);
              const isInWishlist = wishlistItems.some(
                (item) => item._id === prod._id,
              );

              return (
                <div
                  key={prod._id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                >
                  <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
                    <Link
                      onClick={scrollToTop}
                      to={`/products/${prod._id}`}
                      className="text-decoration-none text-dark"
                    >
                      <div
                        className="bg-light d-flex align-items-center justify-content-center overflow-hidden position-relative"
                        style={{
                          aspectRatio: "3/4",
                        }}
                      >
                        <img
                          src={prod.imageUrl}
                          alt={prod.title}
                          loading="lazy"
                          className="img-fluid w-100 h-100"
                          style={{
                            objectFit: "cover",
                            transition: "transform 0.3s ease",
                          }}
                          onError={(e) => {
                            e.target.src =
                              "https://placehold.co/600x800?text=No+Image";
                            e.target.style.objectFit = "contain";
                            e.target.style.padding = "20px";
                            e.target.style.opacity = "0.7";
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                          }}
                        />

                        {prod.discountOffered > 0 && (
                          <span className="badge bg-dark position-absolute top-0 start-0 m-2 px-3 py-2 rounded-pill">
                            {prod.discountOffered}% OFF
                          </span>
                        )}
                      </div>

                      <div className="card-body d-flex flex-column">
                        <p
                          className="fw-semibold mb-2 text-truncate"
                          style={{
                            minHeight: "48px",
                            whiteSpace: "normal",
                          }}
                        >
                          {prod.title}
                        </p>

                        <div className="mt-auto">
                          <p className="fw-bold fs-5 mb-0">
                            ₹{discountedPrice}
                            {prod.price && (
                              <span className="text-muted text-decoration-line-through fs-6 ms-2">
                                ₹{prod.price}
                              </span>
                            )}
                          </p>
                        </div>
                      </div>
                    </Link>

                    <div className="card-footer bg-white border-0 pt-0">
                      <button
                        onClick={() => addToWishlistHandler(prod._id)}
                        className={`btn w-100 rounded-3 fw-semibold ${
                          isInWishlist ? "btn-dark" : "btn-outline-dark"
                        }`}
                      >
                        {isInWishlist
                          ? "REMOVE FROM WISHLIST"
                          : "ADD TO WISHLIST"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : !loading && (
              <p className="text-center w-100 mt-4">No products available.</p>
            )}
      </div>
    </section>
  );
};

export default ProductListing;
