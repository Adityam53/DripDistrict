import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import { useAddressContext } from "../contexts/AddressContext";
import { useCartContext } from "../contexts/CartContext";
import ShippingDetails from "../components/ShippingDetails";

const Address = () => {
  return (
    <div className="px-3 py-5">
      <Heading title={"Shipping Details"} />
      <ShippingDetails />
    </div>
  );
};

export default Address;
