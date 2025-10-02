import Heading from "../components/Heading";
import { useProductContext } from "../contexts/ProductContext";
import { useWishListContext } from "../contexts/WishListContext";
import { useCartContext } from "../contexts/CartContext";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlistHandler } = useWishListContext();
  const { getDiscountedPrice } = useProductContext();
  const { addToCartHandler, quantity } = useCartContext();

  return (
    <section style={{ marginBottom: "50px" }}>
      <div className="container px-0 py-5">
        <div style={{ marginBottom: "150px" }}>
          <Heading title="Wishlist" />
        </div>

        {wishlistItems.length === 0 ? (
          <p className="text-center fs-3">Make a wish!</p>
        ) : (
          <div className="row g-4">
            {wishlistItems.map((item) => {
              const discountedPrice = getDiscountedPrice(
                item.price,
                item.discountOffered
              );

              return (
                <div
                  key={item._id}
                  className="col-sm-6 col-md-4 col-lg-3 d-flex"
                >
                  <div className="card shadow-sm border-0 w-100 d-flex flex-column">
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
                      <p
                        className="fw-medium mb-1"
                        style={{ fontSize: "1.05rem" }}
                      >
                        {item.title}
                      </p>
                      <p
                        className="mb-0 text-muted text-decoration-line-through"
                        style={{ fontSize: "0.95rem" }}
                      >
                        ₹{item.price}
                      </p>
                      <p
                        className="fw-bold mb-3"
                        style={{ fontSize: "1.05rem" }}
                      >
                        ₹{discountedPrice.toFixed(2)}
                      </p>
                      <div className="mt-auto">
                        <button
                          className="btn btn-dark w-100 mb-2 fw-medium"
                          onClick={() => addToCartHandler(item._id, quantity)}
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
