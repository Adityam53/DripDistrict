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
    <div className="px-3 py-5">
      <Heading title={"Shipping Details"} />
      <div className="p-4 border rounded bg-light">
        <h4 className="mb-3">Addresses</h4>

        {/* Addresses List */}
        <div className="mb-4">
          {addresses.map((addr, index) => (
            <div
              className="d-flex align-items-center mb-2 flex-wrap"
              key={index}
            >
              <input
                type="radio"
                name="address"
                id={`address-${index}`}
                value={addr}
                checked={selectedAddress === addr}
                onChange={(e) => setSelectedAddress(e.target.value)}
              />
              <label
                htmlFor={`address-${index}`}
                className="bg-white px-2 ms-2"
              >
                {addr}
              </label>
            </div>
          ))}
        </div>

        {/* Address Form */}
        <div className="row">
          <div className="col-12 col-md-6">
            <form
              className="bg-white p-3 rounded shadow-sm"
              onSubmit={addNewAddressHandler}
            >
              <div className="mb-2">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">House Number</label>
                <input
                  type="text"
                  name="houseNumber"
                  className="form-control"
                  value={formData.houseNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Street</label>
                <input
                  type="text"
                  name="street"
                  className="form-control"
                  value={formData.street}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="city"
                  className="form-control"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">State</label>
                <input
                  type="text"
                  name="state"
                  className="form-control"
                  value={formData.state}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  name="country"
                  className="form-control"
                  value={formData.country}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-2">
                <label className="form-label">Pincode</label>
                <input
                  type="number"
                  name="pincode"
                  className="form-control"
                  value={formData.pincode}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="number"
                  name="phone"
                  className="form-control"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="d-grid mb-3">
                <button type="submit" className="btn btn-light">
                  ADD NEW ADDRESS
                </button>
              </div>

              <div className="d-grid">
                <Link to="/checkout">
                  <button
                    className="btn btn-dark w-100"
                    disabled={cartItems.length === 0 || !selectedAddress}
                  >
                    CONTINUE
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Address;
