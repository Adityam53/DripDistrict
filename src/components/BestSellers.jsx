import { useProductContext } from "../contexts/ProductContext";
import { Link } from "react-router-dom";
const BestSellers = () => {
  const { allProducts, loading, error, scrollToTop } = useProductContext();

  return (
    <>
      <section className="pt-5">
        <div className="d-flex justify-content-between align-items-center mx-3 px-0 fw-lighter">
          <div>
            <p>BEST SELLERS</p>
          </div>
          <div>
            <Link className="text-dark" to="/products">
              VIEW ALL
            </Link>
          </div>
        </div>
        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-danger">An error occured.</p>}
        <div className="row bg-light mx-2 mx-md-0 px-0">
          {allProducts &&
            allProducts.length > 0 &&
            allProducts.slice(0, 12).map((item) => (
              <div className="col-4 col-md-2" key={item._id}>
                <Link to={`/products/${item._id}`}>
                  <img
                    src={item.imageUrl}
                    className="img-fluid w-100"
                    alt="Clothing"
                    loading="lazy"
                    style={{
                      aspectRatio: "3/4",
                      objectFit: "cover",
                      borderRadius: "12px",
                      transition: "transform 0.3s ease",
                      backgroundColor: "#f8f9fa",
                    }}
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/600x800?text=No+Image";

                      e.target.style.objectFit = "contain";
                      e.target.style.padding = "20px";
                      e.target.style.opacity = "0.7";
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "scale(1.03)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                </Link>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};
export default BestSellers;
