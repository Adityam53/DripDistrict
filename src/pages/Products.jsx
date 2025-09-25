import Heading from "../components/Heading";
import Information from "../components/Information";
import ProductListing from "../components/ProductListing";
import SideBar from "../components/SideBar";

const Products = () => {
  return (
    <>
      <Heading title={"All Collection"} />
      <section className="container px-0 mb-5" style={{ marginTop: "75px" }}>
        <div className="row">
          <div className="col-md-3">
            <SideBar showCategoryFilter={true} />
          </div>
          <div className="col-md-9">
            <div className="row">
              <ProductListing />
            </div>
          </div>
        </div>
      </section>
      <Information />
    </>
  );
};
export default Products;
