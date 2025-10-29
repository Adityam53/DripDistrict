import SearchBar from "./SearchBar";
import { NavLink, Link, useLocation } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai"; // Ant Design Icons
import { AiOutlineShoppingCart } from "react-icons/ai"; // Ant Design Icons
import { AiOutlineUser } from "react-icons/ai"; // Ant Design Icons
import WishListStatus from "./WishListStatus";
import CartStats from "./CartStats";
const Header = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isCartPage = location.pathname === "/cart";
  const isWishlistPage = location.pathname === "/wishlist";
  const isProfilePage = location.pathname === "/profile";
  const isProductDetailsPage = location.pathname.startsWith("/products/");
  const isCompnayInfoPage = location.pathname.startsWith("/info/");

  return (
    <header className="my-3">
      <div className="container px-0">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mx-2 mx-md-0">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link className="text-dark navbar-brand" to="/">
              <h2 className="logo m-0">Drip-District</h2>
            </Link>
          </div>

          {/* Search Bar — only show when not on special pages */}
          {!isHomePage &&
            !isCartPage &&
            !isProfilePage &&
            !isWishlistPage &&
            !isProductDetailsPage &&
            !isCompnayInfoPage && (
              <div className="w-100 order-3 order-md-2">
                <SearchBar />
              </div>
            )}

          {/* Icons */}
          <div className="d-flex align-items-center flex-shrink-0 position-relative order-2 order-md-3 gap-4 gap-md-3 gap-lg-4">
            {/* Wishlist */}
            <NavLink to="/wishlist" className="nav-link">
              <div className="position-relative d-inline-block">
                <AiOutlineHeart size={24} />
                <WishListStatus />
              </div>
            </NavLink>

            {/* Cart */}
            <NavLink to="/cart" className="nav-link position-relative">
              <div className="position-relative d-inline-block">
                <AiOutlineShoppingCart size={24} />
                <CartStats />
              </div>
            </NavLink>

            {/* Profile */}
            <NavLink to="/profile" className="nav-link">
              <AiOutlineUser size={24} />
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
