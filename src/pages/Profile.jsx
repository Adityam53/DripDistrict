import React, { useState } from "react";
import Heading from "../components/Heading";
import { useOrderContext } from "../contexts/OrderContext";
import { Link } from "react-router-dom";
import { useAddressContext } from "../contexts/AddressContext";
import ShippingDetails from "../components/ShippingDetails";

const Profile = () => {
  const { orders } = useOrderContext();
  const { addresses, setAddresses } = useAddressContext();

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
    <div className="container py-5">
      <Heading title={"User Profile"} />

      {/* Responsive Grid */}
      <div className="row gx-4 gy-4 mt-4">
        {/* Profile Details */}
        <div className="col-12">
          <div className="p-4 border rounded bg-light h-100 shadow-sm">
            <h4 className="mb-3">Profile Details</h4>
            <p className="mb-2">
              <strong>Name:</strong> {user.name}
            </p>
            <p className="mb-2">
              <strong>Email:</strong>{" "}
              <span className="text-break">{user.email}</span>
            </p>
            <p className="mb-0">
              <strong>Phone:</strong> {user.phone}
            </p>
          </div>
        </div>

        {/* Address Section */}
        <div className="col-12">
          <div className="h-100">
            <ShippingDetails />
          </div>
        </div>

        {/* Order History */}
        <div className="col-12">
          <div className="p-4 border rounded bg-light shadow-sm">
            <h4 className="mb-3">Order History</h4>

            {orders.length === 0 ? (
              <p>No saved orders yet.</p>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table table-striped">
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
                          <td className="text-break">{order._id}</td>
                          <td>{order.placedAt}</td>
                          <td>₹{order.total.toFixed(2)}</td>
                          <td>Delivered</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <Link to="/orders" className="btn btn-outline-dark mt-3">
                  View All Orders
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
