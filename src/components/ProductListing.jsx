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
                prod.discountOffered
              ).toFixed(0);
              const isInWishlist = wishlistItems.some(
                (item) => item._id === prod._id
              );

              return (
                <div
                  key={prod._id}
                  className="col-12 col-sm-6 col-md-4 col-lg-3"
                >
                  <div className="card h-100 shadow-sm border-0">
                    <Link
                      onClick={scrollToTop}
                      to={`/products/${prod._id}`}
                      className="text-decoration-none text-dark"
                    >
                      <img
                        src={prod.imageUrl}
                        alt={prod.title}
                        className="card-img-top img-fluid"
                        loading="lazy"
                        style={{ height: "250px", objectFit: "cover" }}
                      />
                      <div className="card-body d-flex flex-column justify-content-between">
                        <p className="card-title mb-1 fw-semibold">
                          {prod.title}
                        </p>
                        <p className="mb-2 fw-bold">
                          ₹{discountedPrice}
                          {prod.price && (
                            <span className="ms-2 text-muted text-decoration-line-through">
                              ₹{prod.price}
                            </span>
                          )}
                        </p>
                      </div>
                    </Link>
                    <div className="card-footer bg-white border-0">
                      <button
                        onClick={() => addToWishlistHandler(prod._id)}
                        className="btn btn-outline-dark w-100"
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
