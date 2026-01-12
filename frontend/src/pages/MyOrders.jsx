import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders/my").then(res => setOrders(res.data));
  }, []);

  return (
    <div className="flex">
      <Sidebar role="user" />

      <div className="ml-64 p-8 w-full bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6">My Orders</h2>

        {orders.map(order => (
          <div
            key={order._id}
            className="bg-white p-4 rounded shadow mb-3"
          >
            <p><b>Mess:</b> {order.messId.name}</p>
            <p>
              <b>Status:</b>{" "}
              <span
                className={
                  order.status === "accepted"
                    ? "text-green-600"
                    : order.status === "rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }
              >
                {order.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
