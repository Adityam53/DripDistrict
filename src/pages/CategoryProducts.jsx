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
    // Reset filters
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
  const listProducts =
    displayProducts &&
    displayProducts.length > 0 &&
    displayProducts.map((prod) => {
      const isInWishlist = wishlistItems.some((item) => item._id === prod._id);
      return (
        <div
          key={prod._id}
          className="col-12 col-sm-6 col-md-4 col-lg-3 bg-light pb-5"
        >
          <Link
            to={`/products/${prod._id}`}
            style={{ color: "black", textDecoration: "none" }}
          >
            <div
              className=" d-flex flex-column justify-content-between"
              style={{ height: "100%" }}
            >
              <img className="img-fluid pb-3" src={prod.imageUrl} alt="" />
              <div>
                <p className="mb-1">{prod.title}</p>
              </div>
              <div>{prod.rating} ⭐️</div>
              <div>
                <p className="">
                  ₹.
                  {(
                    prod.price -
                    (prod.price * prod.discountOffered) / 100
                  ).toFixed(0)}
                  {prod.price && (
                    <span
                      className="ms-3"
                      style={{ textDecoration: "line-through", color: "red" }}
                    >
                      ₹.{prod.price}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </Link>
          <button
            onClick={() => addToWishlistHandler(prod._id)}
            className="btn btn-dark w-100"
          >
            {isInWishlist ? "REMOVE FROM WISHLIST" : "ADD TO WISHLIST"}
          </button>
        </div>
      );
    });
  return (
    <>
      <Heading title={categoryName} />
      <section className="container px-0 mb-5" style={{ marginTop: "75px" }}>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-danger">An error occured.</p>}
        <div className="row">
          <div className="col-12 mb-4 mb-md-0 col-md-3 px-0 px-md-4">
            <SideBar showCategoryFilter={false} />
          </div>
          <div className="col-12 col-md-9 px-0">
            <div className="row">{listProducts}</div>
          </div>
        </div>
      </section>
      <Information />
    </>
  );
};

export default CategoryProducts;
