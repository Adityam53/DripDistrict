import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext);
export const ProductProvider = ({ children }) => {
  const { data, loading, error } = useFetch(
    "https://drip-district-backend.vercel.app/clothes"
  );

  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [sort, setSort] = useState("none");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [ratingFilter, setRatingFilter] = useState(0);
  const [priceFilter, setPriceFilter] = useState(4000);
  const [isCategoryView, setIsCategoryView] = useState("false");
  const [search, setSearch] = useState("");

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const getDiscountedPrice = (price, discountOffered) => {
    return price - (price * discountOffered) / 100;
  };

  const handleCategoryCheckboxChange = (e) => {
    const { checked, value } = e.target;

    if (checked) {
      setCategoryFilter((prev) => [...prev, value]);
    } else {
      setCategoryFilter((prev) => prev.filter((gender) => gender !== value));
    }
  };

  const handleClearClick = () => {
    setSort("none");
    setCategoryFilter([]);
    setRatingFilter(0);
    setPriceFilter(4000);
  };
  useEffect(() => {
    scrollToTop();
  }, []);

  useEffect(() => {
    if (data) {
      setAllProducts(data);
      setProducts(data);
      setDisplayProducts(data);
    }
  }, [data]);

  useEffect(() => {
    const baseProducts = isCategoryView ? products : allProducts;
    let filtered = [...baseProducts];

    if (categoryFilter.length > 0) {
      filtered = filtered.filter((product) =>
        categoryFilter.includes(product.category.name)
      );
    }

    filtered = filtered.filter((prod) => prod.price <= priceFilter);

    if (sort === "ascdesc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === "descasc") {
      filtered.sort((a, b) => b.price - a.price);
    }
    if (ratingFilter !== 0) {
      filtered = filtered.filter((product) => {
        console.log("Checking rating:", product.rating, "vs", ratingFilter);
        return Number(product.rating) >= ratingFilter;
      });
    }

    if (search.trim() !== "") {
      filtered = filtered.filter((prod) =>
        prod.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    setDisplayProducts(filtered);
    console.log("Filtered Products:", filtered);
  }, [
    products,
    allProducts,
    categoryFilter,
    ratingFilter,
    sort,
    priceFilter,
    search,
  ]);

  return (
    <ProductContext.Provider
      value={{
        displayProducts,
        products,
        setProducts,
        setDisplayProducts,
        loading,
        allProducts,
        error,
        sort,
        setSort,
        categoryFilter,
        setCategoryFilter,
        ratingFilter,
        setRatingFilter,
        handleCategoryCheckboxChange,
        handleClearClick,
        scrollToTop,
        priceFilter,
        setPriceFilter,
        setIsCategoryView,
        setSearch,
        search,
        getDiscountedPrice,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
