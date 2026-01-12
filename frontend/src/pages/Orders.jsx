import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await API.get("/orders/admin");
    setOrders(res.data);
  };

  const updateStatus = async (id, status) => {
    await API.put(`/orders/status/${id}`, { status });
    fetchOrders(); // refresh UI
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="flex">
      <Sidebar role="admin" />

      <div className="ml-64 p-8 w-full bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6">Orders</h2>

        {orders.map(order => (
          <div
            key={order._id}
            className="bg-white p-4 rounded shadow mb-4"
          >
            <p><b>User:</b> {order.userId.name}</p>
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

            {order.status === "pending" && (
              <div className="mt-3">
                <button
                  onClick={() => updateStatus(order._id, "accepted")}
                  className="bg-green-500 text-white px-4 py-1 rounded mr-2"
                >
                  Accept
                </button>

                <button
                  onClick={() => updateStatus(order._id, "rejected")}
                  className="bg-red-500 text-white px-4 py-1 rounded"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
