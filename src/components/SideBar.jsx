import { useProductContext } from "../contexts/ProductContext";

const SideBar = ({ showCategoryFilter }) => {
  const {
    ratingFilter,
    categoryFilter,
    setRatingFilter,
    sort,
    setSort,
    handleCategoryCheckboxChange,
    handleClearClick,
    priceFilter,
    setPriceFilter,
  } = useProductContext();

  return (
    <aside className="bg-light p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="m-0 fw-bold">Filters</h5>
        <span
          className="text-decoration-underline"
          style={{ cursor: "pointer", fontSize: "0.9rem", color: "#555" }}
          onClick={handleClearClick}
        >
          Clear
        </span>
      </div>

      {/* Price Filter */}

      <div className="mb-4">
        <p className="mb-1 fw-semibold">Price: ₹{priceFilter}</p>
        <input
          id="priceRange"
          type="range"
          min="500"
          max="4000"
          step="100"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="form-range"
        />
      </div>

      {/* Category Filter */}
      {showCategoryFilter && (
        <div className="mb-4">
          <p className="mb-2 fw-semibold">Category</p>
          <div className="d-flex flex-column gap-2">
            {["Men", "Women", "Kids"].map((gen) => (
              <label
                key={gen}
                className="d-flex align-items-center gap-2"
                style={{ fontSize: "0.9rem" }}
              >
                <input
                  type="checkbox"
                  onChange={handleCategoryCheckboxChange}
                  checked={categoryFilter.includes(gen)}
                  value={gen}
                  name="category"
                />
                {gen}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Rating Filter */}
      <div className="mb-4">
        <p className="mb-2 fw-semibold">Rating</p>
        <div className="d-flex flex-column gap-2">
          {[4, 3, 2, 1].map((rating) => (
            <label
              key={rating}
              className="d-flex align-items-center gap-2"
              style={{ fontSize: "0.9rem" }}
            >
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={ratingFilter === rating}
                onChange={(e) => setRatingFilter(Number(e.target.value))}
              />
              {rating} Stars & Above
            </label>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div>
        <p className="mb-2 fw-semibold">Sort By</p>
        <div className="d-flex flex-column gap-2">
          <label
            className="d-flex align-items-center gap-2"
            style={{ fontSize: "0.9rem" }}
          >
            <input
              type="radio"
              name="sort"
              value="ascdesc"
              onChange={(e) => setSort(e.target.value)}
              checked={sort === "ascdesc"}
            />
            Price - Low to High
          </label>
          <label
            className="d-flex align-items-center gap-2"
            style={{ fontSize: "0.9rem" }}
          >
            <input
              type="radio"
              name="sort"
              value="descasc"
              onChange={(e) => setSort(e.target.value)}
              checked={sort === "descasc"}
            />
            Price - High to Low
          </label>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
