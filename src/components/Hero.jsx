import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <>
      <section className="container p-0">
        <div className="d-flex flex-column flex-md-row justify-content-between gap-2">
          {/* Women */}
          <div className="w-100 position-relative overflow-hidden">
            <img
              src="https://everdion.com/cdn/shop/files/177.webp?v=1737108733"
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
              <Link to="/category/Women" className="nav-link">
                Women
              </Link>
            </div>
          </div>

          {/* Men */}
          <div className="w-100 position-relative overflow-hidden">
            <img
              src="https://image.hm.com/assets/hm/04/13/0413f5010ec537b8dc3c3e4779658e0b7c4ac7f3.jpg?imwidth=1536"
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
              <Link className="nav-link" to="/category/Men">
                Men
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container p-0 pt-5">
        <div className="position-relative overflow-hidden">
          <img
            src="https://plus.unsplash.com/premium_photo-1706382233381-dfd2489fbbe7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjYxfHxraWRzJTIwJTIwbW9kZWwlMjBmb3IlMjBjbG90aGluZyUyMGJyYW5kfGVufDB8fDB8fHww"
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
            <Link className="nav-link" to="/category/Kids">
              Kids
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
