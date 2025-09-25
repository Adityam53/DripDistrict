import { AiOutlineSearch } from "react-icons/ai"; // Material Design
import { useProductContext } from "../contexts/ProductContext";

const SearchBar = () => {
  const { setSearch, search } = useProductContext();
  return (
    <>
      <div
        className="position-relative w-100"
        style={{ maxWidth: "500px", margin: "0 auto" }}
      >
        <AiOutlineSearch
          className="position-absolute top-50 translate-middle-y ms-2  text-secondary"
          size={20}
          style={{ pointerEvents: "none" }}
        />{" "}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-control rounded-2 py-1 ps-5 fw-lighter"
          placeholder="Search Products"
          name=""
          id=""
        />
      </div>
    </>
  );
};
export default SearchBar;
