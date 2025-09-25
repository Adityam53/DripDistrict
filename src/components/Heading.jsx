import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
const Heading = ({ title }) => {
  return (
    <>
      <div className="container text-center px-0 mt-5">
        <p
          className="logo display-6"
          // style={{ fontFamily: "Poppins", fontWeight: 600 }}
        >
          {title}
        </p>
      </div>
      <div>
        <p className="text-center">
          <Link
            to="/"
            className="text-dark fw-lighter-hover me-2"
            style={{ textDecoration: "none" }}
          >
            Home
          </Link>
          <AiOutlineArrowRight />
          <span className="fw-lighter ms-2">{title}</span>
        </p>
      </div>
    </>
  );
};
export default Heading;
