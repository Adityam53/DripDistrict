import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className="container p-0 mt-auto">
        <section className="row mx-2 mx-md-0">
          <div className="col-md-4 px-0 mb-4 mb-md-0">
            <h5 className="mb-4">SHOP</h5>
            <div className="fs-5 fw-lighter">
              <Link to="/products" className="nav-link">
                All
              </Link>
              <Link to="/category/Women" className="nav-link">
                Women
              </Link>
              <Link to="/category/Men" className="nav-link">
                Men
              </Link>
              <Link to="/category/Kids" className="nav-link">
                Kids
              </Link>
            </div>
          </div>
          <div className="col-md-4 px-0 mb-4 mb-md-0">
            <h5 className="mb-4">HELP</h5>
            <div className="fs-5 fw-lighter">
              <Link to="/info/returns" className="nav-link">
                RETURN POLICY
              </Link>
              <Link to="/info/terms" className="nav-link">
                TERMS AND CONDITIONS
              </Link>
              <Link to="/info/privacy" className="nav-link">
                PRIVACY POLICY
              </Link>
              <Link to="/info/contact" className="nav-link">
                CONTACT{" "}
              </Link>
            </div>
          </div>
          <div className="col-md-4 px-0 mb-4 mb-md-0">
            <h5 className="mb-4">ADDRESS:</h5>
            <p className="fw-lighter mb-4">
              Drip-District by Fashionova 2nd floor, plot no 121/A, Paud road,
              sector 37, Pune, 411038
            </p>
            <h5 className="mb-4 mb-md-2">CONNECT:</h5>
            <p>Email: </p>
            <a href="" className="text-dark">
              info@dripdistrict.com
            </a>
          </div>
        </section>
        <section className="mt-5 mx-2 mx-md-0 px-0">
          <p>&copy; DripDistrict</p>
        </section>
      </footer>
    </>
  );
};
export default Footer;
