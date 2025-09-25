import { createContext, useContext, useEffect, useState } from "react";

const OrderContext = createContext();

export const useOrderContext = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = async (order) => {
    try {
      const res = await fetch(
        "https://drip-district-backend.vercel.app/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        }
      );

      if (!res.ok) throw new Error("Failed to place order");

      const savedOrder = await res.json();

      // ✅ Update state only if request succeeded
      setOrders((prev) => [...prev, savedOrder]);
      return savedOrder;
    } catch (err) {
      console.error("Error placing order:", err);
      throw err; // optional, lets caller handle errors
    }
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
