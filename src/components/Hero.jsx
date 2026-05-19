import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <section className="container p-0">
        <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
          {/* Women */}
          <Link
            to="/category/Women"
            className="w-100 text-decoration-none position-relative overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGZhc2hpb24lMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D"
              className="img-fluid w-100 h-100 object-fit-cover"
              alt="Women"
            />
            <div
              className="position-absolute top-0 start-0 m-3 px-4 py-2 text-uppercase fw-bold fs-5 text-white"
              style={{
                background: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(4px)",
                transform: "rotate(-2deg)",
                borderRadius: "0 1rem 1rem 0",
              }}
            >
              Women
            </div>
          </Link>

          {/* Men */}
          <Link
            to="/category/Men"
            className="w-100 text-decoration-none position-relative overflow-hidden"
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1688497830987-e4f7ce4da50b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZmFzaGlvbiUyMG1vZGVsJTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D"
              className="img-fluid w-100 h-100 object-fit-cover"
              alt="Men"
            />
            <div
              className="position-absolute top-0 start-0 m-3 px-4 py-2 text-uppercase fw-bold fs-5 text-white"
              style={{
                background: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(4px)",
                transform: "rotate(2deg)",
                borderRadius: "0 1rem 1rem 0",
              }}
            >
              Men
            </div>
          </Link>
        </div>
      </section>

      {/* Kids Section */}
      <section className="container p-0 pt-5">
        <Link
          to="/category/Kids"
          className="text-decoration-none position-relative overflow-hidden d-block"
        >
          <img
            src="https://plus.unsplash.com/premium_photo-1697183203094-47d3f553994a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzd8fGZhc2hpb24lMjBtb2RlbCUyMGtpZHN8ZW58MHx8MHx8fDA%3D"
            alt="Kids"
            className="img-fluid h-100 w-100 object-fit-cover"
          />
          <div
            className="position-absolute top-0 start-0 m-3 px-4 py-2 text-uppercase fw-bold fs-5 text-white"
            style={{
              background: "rgba(0, 0, 0, 0.5)",
              backdropFilter: "blur(4px)",
              transform: "rotate(-1deg)",
              borderRadius: "0 1rem 1rem 0",
            }}
          >
            Kids
          </div>
        </Link>
      </section>
    </>
  );
};

export default Hero;
