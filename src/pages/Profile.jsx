import React, { useState } from "react";
import Heading from "../components/Heading";
import { useOrderContext } from "../contexts/OrderContext"; // ✅ import
import { Link } from "react-router-dom"; // ✅ use Link for smooth nav
import { useAddressContext } from "../contexts/AddressContext";

const Profile = () => {
  const { orders } = useOrderContext(); // ✅ real orders from context

  const { addresses } = useAddressContext();

  const [formData, setFormData] = useState({
    houseNo: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const user = {
    name: "Aditya Moorjmalani",
    email: "aditya@example.com",
    phone: "+91-9876543210",
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addNewAddressHandler = (e) => {
    e.preventDefault();
    const { houseNo, street, city, state, pincode } = formData;

    if (!houseNo || !street || !city || !state || !pincode) {
      alert("Please fill all fields!");
      return;
    }

    const newAddress = `${houseNo}, ${street}, ${city}, ${state} - ${pincode}`;
    setAddresses([...addresses, newAddress]);

    setFormData({
      houseNo: "",
      street: "",
      city: "",
      state: "",
      pincode: "",
    });
  };

  return (
    <div className="container px-0 py-5">
      <Heading title={"User Profile"} />

      {/* Profile Section */}
      <div
        className="mb-4 p-4 border rounded bg-light mx-2 mx-md-0"
        style={{ marginTop: "70px" }}
      >
        <h4>Profile Details</h4>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
      </div>

      {/* Addresses Section */}
      <div className="mb-4 p-4 border rounded bg-light mx-2 mx-md-0 w-100 w-md-auto">
        <h4>Addresses</h4>
        {addresses.map((addr, index) => (
          <p key={index}>📍 {addr}</p>
        ))}

        <form
          className="bg-white w-50 p-3 rounded shadow-sm"
          onSubmit={addNewAddressHandler}
        >
          <label className="me-2">
            House Number:
            <input
              type="text"
              name="houseNo"
              className="form-control"
              value={formData.houseNo}
              onChange={handleChange}
            />
          </label>
          <label>
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
          <label>
            State:
            <input
              type="text"
              name="state"
              className="form-control"
              value={formData.state}
              onChange={handleChange}
            />
          </label>
          <label>
            Pincode:
            <input
              type="number"
              name="pincode"
              className="form-control"
              value={formData.pincode}
              onChange={handleChange}
            />
          </label>
          <button type="submit" className="btn btn-dark mt-3 w-100">
            Add New Address
          </button>
        </form>
      </div>

      {/* Saved Orders */}
      <div className="p-4 border rounded bg-light mx-2 mx-md-0">
        <h4>Order History</h4>
        {orders.length === 0 ? (
          <p>No saved orders yet.</p>
        ) : (
          <>
            <table className="table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 3).map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.placedAt}</td>
                    <td>₹{order.total.toFixed(2)}</td>
                    <td>Delivered</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Navigate to Orders Page */}
            <Link to="/orders" className="btn btn-outline-dark mt-3">
              View All Orders
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
