import { Link } from "react-router-dom";
import { useProductContext } from "../contexts/ProductContext";
const SimilarItems = () => {
  const { products, error, loading } = useProductContext();
};
export default SimilarItems;
