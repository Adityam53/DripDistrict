import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import { useAddressContext } from "../contexts/AddressContext";
import { useCartContext } from "../contexts/CartContext";
const Address = () => {
  const {
    formData,
    addNewAddressHandler,
    handleChange,
    selectedAddress,
    setSelectedAddress,
    addresses,
  } = useAddressContext();
  const { cartItems } = useCartContext();

  return (
    <div className="container px-0 py-5">
      <Heading title={"Shipping Details"} />
      <div className="mb-4 p-4 border rounded bg-light">
        <h4>Addresses</h4>
        {addresses.map((addr, index) => (
          <div className="d-flex align-items-center mb-2" key={index}>
            <input
              type="radio"
              name="address"
              defaultChecked={selectedAddress}
              id={`address-${index}`}
              value={addr}
              onChange={(e) => setSelectedAddress(e.target.value)}
            />
            <label htmlFor={`address-${index}`} className="bg-white px-2 ms-2">
              {addr}
            </label>
          </div>
        ))}

        <form
          className="bg-white w-50 p-3 rounded shadow-sm"
          onSubmit={addNewAddressHandler}
        >
          <label className="me-2">
            FullName:
            <input
              type="text"
              name="fullName"
              className="form-control"
              value={formData.fullName}
              onChange={handleChange}
            />
          </label>
          <label className="me-2">
            House Number:
            <input
              type="text"
              name="houseNumber"
              className="form-control"
              value={formData.houseNumber}
              onChange={handleChange}
            />
          </label>
          <label className="me-2">
            Street:
            <input
              type="text"
              name="street"
              className="form-control"
              value={formData.street}
              onChange={handleChange}
            />
          </label>
          <label className="me-2">
            City:
            <input
              type="text"
              name="city"
              className="form-control"
              value={formData.city}
              onChange={handleChange}
            />
          </label>
          <label className="me-2">
            State:
            <input
              type="text"
              name="state"
              className="form-control"
              value={formData.state}
              onChange={handleChange}
            />
          </label>
          <label className="me-2">
            Country:
            <input
              type="text"
              name="country"
              className="form-control"
              value={formData.country}
              onChange={handleChange}
            />
          </label>
          <label className="me-2">
            Pincode:
            <input
              type="number"
              name="pincode"
              className="form-control"
              value={formData.pincode}
              onChange={handleChange}
            />
          </label>
          <label className="me-2">
            Phone:
            <input
              type="number"
              name="phone"
              className="form-control"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit" className="btn btn-light mt-3 w-50">
            ADD NEW ADDRESS
          </button>{" "}
          <br />
          <br />
          <Link to={"/checkout"}>
            <button
              className="btn btn-dark w-100"
              disabled={cartItems.length === 0 || !selectedAddress}
            >
              CONTINUE
            </button>
          </Link>
        </form>
        {/* {selectedAddress} */}
      </div>
    </div>
  );
};

export default Address;
