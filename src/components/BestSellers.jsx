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
                    className="img-fluid"
                    alt="Clothing"
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
