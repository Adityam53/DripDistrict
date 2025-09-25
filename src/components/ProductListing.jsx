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

  const { addToWishlistHandler, wishlistItems } = useWishListContext();
  useEffect(() => {
    setProducts(allProducts);
    setDisplayProducts(allProducts);
    handleClearClick();
    scrollToTop();
    setIsCategoryView(false);
    setSearch("");
  }, []);

  const listProducts =
    displayProducts &&
    displayProducts.length > 0 &&
    displayProducts.slice(0, 20).map((prod) => {
      const discountedPrice = getDiscountedPrice(
        prod.price,
        prod.discountOffered
      ).toFixed(0);

      const isInWishlist = wishlistItems.some((item) => item._id === prod._id);

      return (
        <div key={prod._id} className="col-md-3 bg-light pb-5">
          <div
            className=" d-flex flex-column justify-content-between"
            style={{ height: "100%" }}
          >
            <Link
              onClick={scrollToTop}
              to={`/products/${prod._id}`}
              style={{ color: "black", textDecoration: "none" }}
            >
              {" "}
              <img className="img-fluid pb-3" src={prod.imageUrl} alt="" />
              <div>
                <p className="mb-1">{prod.title}</p>
              </div>
              <div>
                <p className="">
                  ₹.
                  {discountedPrice}
                  {prod.price && (
                    <span
                      className="ms-3"
                      style={{ textDecoration: "line-through", color: "red" }}
                    >
                      ₹.{prod.price}
                    </span>
                  )}
                </p>
              </div>{" "}
            </Link>

            <button
              className="btn btn-dark w-100"
              onClick={() => addToWishlistHandler(prod._id)}
            >
              {isInWishlist ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
            </button>
          </div>
        </div>
      );
    });
  return (
    <>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-danger">An error occured.</p>}
      {listProducts}
    </>
  );
};
export default ProductListing;
