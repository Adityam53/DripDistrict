import SearchBar from "./SearchBar";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai"; // Ant Design Icons
import { AiOutlineShoppingCart } from "react-icons/ai"; // Ant Design Icons
import { AiOutlineUser } from "react-icons/ai"; // Ant Design Icons
import WishListStatus from "./WishListStatus";
import CartStatus from "./cartStatus";

const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isCartPage = location.pathname === "/cart";
  const isWishlistPage = location.pathname === "/wishlist";
  const isProfilePage = location.pathname === "/profile";
  const isProductDetailsPage = location.pathname === "/products/id";

  return (
    <header className="my-3">
      <div className="container px-0">
        <div className="d-flex justify-content-between align-items-center gap-3">
          <div className="flex-shrink-0">
            <Link className="text-dark navbar-brand" to="/">
              <h2 className="logo m-0">Drip-District</h2>
            </Link>
          </div>
          {!isHomePage &&
            !isCartPage &&
            !isProfilePage &&
            !isWishlistPage &&
            !isProductDetailsPage && (
              <div className="flex-grow-1 px-3">
                <SearchBar />
              </div>
            )}
          <div className="d-flex align-items-center flex-shrink-0 position-relative">
            {/* <NavLink className="btn btn-dark btn-sm">Login</NavLink> */}
            <NavLink to="/wishlist" className="nav-link">
              <div className="position-relative d-inline-block">
                <AiOutlineHeart size={24} className="ms-3" />
                <WishListStatus />
              </div>
            </NavLink>
            <NavLink to="/cart" className="nav-link position-relative">
              <div className="position-relative d-inline-block">
                <AiOutlineShoppingCart size={24} className="ms-3" />
                <CartStatus />
              </div>
            </NavLink>
            <NavLink to="/profile" className="nav-link">
              {" "}
              <AiOutlineUser size={24} className="ms-3" />
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
