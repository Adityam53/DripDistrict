import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import { ProductProvider } from "./contexts/ProductContext";
import CategoryProducts from "./pages/CategoryProducts";
import CompanyInfo from "./pages/CompanyInfo";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishListContext";
import Address from "./pages/Address";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";
import { AddressProvider } from "./contexts/AddressContext";
import { OrderProvider } from "./contexts/OrderContext";
function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <ToastContainer position="top-center" autoClose={2000} />
      <Router>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              <AddressProvider>
                <OrderProvider>
                  <Header />
                  <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/products" element={<Products />}></Route>
                    <Route
                      path="/products/:productId"
                      element={<ProductDetails />}
                    ></Route>
                    <Route
                      path="/category/:categoryName"
                      element={<CategoryProducts />}
                    ></Route>
                    <Route path="/cart" element={<Cart />}></Route>
                    <Route path="/wishlist" element={<Wishlist />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/address" element={<Address />}></Route>
                    <Route path="/checkout" element={<Checkout />}></Route>
                    <Route path="/orders" element={<Orders />}></Route>
                    <Route
                      path="/info/:pageName"
                      element={<CompanyInfo />}
                    ></Route>
                  </Routes>
                  <Footer />
                </OrderProvider>
              </AddressProvider>
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </Router>
    </div>
  );
}

export default App;
