import Heading from "../components/Heading";
import { useOrderContext } from "../contexts/OrderContext";

const Orders = () => {
  const { orders } = useOrderContext();

  return (
    <section style={{ marginBottom: "50px" }}>
      <div className="container px-0 py-5">
        <div style={{ marginBottom: "50px" }}>
          <Heading title="My Orders" />
        </div>

        {orders.length === 0 ? (
          <p className="text-center">You haven't placed any orders yet.</p>
        ) : (
          <div className="d-flex flex-column gap-4">
            {orders.map((order) => (
              <div key={order._id} className="p-4 border rounded shadow-sm">
                <h6 className="mb-3">
                  Order #{order._id} <br />
                  <small className="text-muted">
                    Placed on {order.placedAt}
                  </small>
                </h6>
                <div className="d-flex flex-column gap-3">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="d-flex gap-3 align-items-center"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        style={{
                          width: "70px",
                          height: "90px",
                          borderRadius: "6px",
                          objectFit: "cover",
                        }}
                      />
                      <div>
                        <p className="fw-bold mb-1">{item.title}</p>
                        <small>Qty: {item.quantity}</small>
                        <p className="mb-0">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <hr />
                <p>
                  <strong>Total:</strong> ₹{order.total.toFixed(2)}
                </p>
                <p>
                  <strong>Delivery Address:</strong> {order.address}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Orders;
