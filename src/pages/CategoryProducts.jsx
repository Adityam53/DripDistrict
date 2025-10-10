import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { Link } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useProductContext } from "../contexts/ProductContext";
import { useEffect } from "react";
import Heading from "../components/Heading";
import { useWishListContext } from "../contexts/WishListContext";
import Information from "../components/Information";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const { data, error, loading } = useFetch(
    `https://drip-district-backend.vercel.app/clothes/category/${categoryName}`
  );

  const {
    setProducts,
    displayProducts,
    handleClearClick,
    setIsCategoryView,
    scrollToTop,
    setSearch,
  } = useProductContext();

  const { addToWishlistHandler, wishlistItems } = useWishListContext();

  useEffect(() => {
    // Reset filters when category changes
    handleClearClick();
    setIsCategoryView(true);
    scrollToTop();
    setSearch("");
  }, [categoryName]);

  useEffect(() => {
    if (data && data.length > 0) {
      setProducts(data);
    }
  }, [data]);
  const totalProducts = displayProducts?.length || 0;

  return (
    <>
      <Heading title={categoryName} />
      <section
        className="container-fluid px-3 px-md-5 mb-5"
        style={{ marginTop: "75px" }}
      >
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-danger">An error occurred.</p>}

        <div className="row">
          {/* Sidebar */}
          <div className="col-12 mb-4 col-md-3">
            <SideBar showCategoryFilter={false} />
          </div>

          {/* Products */}
          <div className="col-12 col-md-9">
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
                            to={`/products/${prod._id}`}
                            className="text-decoration-none text-dark"
                          >
                            <img
                              src={prod.imageUrl}
                              className="card-img-top img-fluid"
                              alt={prod.title}
                              loading="lazy"
                              style={{
                                height: "250px",
                                objectFit: "cover",
                              }}
                            />
                            <div className="card-body d-flex flex-column justify-content-between">
                              <p className="card-title mb-1 fw-semibold">
                                {prod.title}
                              </p>
                              <div className="mb-1">{prod.rating} ⭐️</div>
                              <p className="mb-2 fw-bold">
                                ₹
                                {(
                                  prod.price -
                                  (prod.price * prod.discountOffered) / 100
                                ).toFixed(0)}
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
                    <p className="text-center w-100 mt-4">
                      No products found in this category.
                    </p>
                  )}
            </div>
          </div>
        </div>
      </section>
      <Information />
    </>
  );
};

export default CategoryProducts;
