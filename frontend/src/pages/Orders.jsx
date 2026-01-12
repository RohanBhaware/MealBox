import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () =>
    API.get("/orders/admin").then(res => setOrders(res.data));

  const updateStatus = async (id, status) => {
    await API.put(`/orders/status/${id}`, { status });
    fetchOrders();
  };

  useEffect(fetchOrders, []);

  return (
    <div className="flex">
      <Sidebar role="admin" />

      <div className="ml-64 p-8 w-full bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6">Orders</h2>

        {orders.map(o => (
          <div key={o._id} className="bg-white p-4 rounded shadow mb-4">
            <p><b>User:</b> {o.userId.name}</p>
            <p><b>Mess:</b> {o.messId.name}</p>
            <p><b>Status:</b> {o.status}</p>

            <div className="mt-3">
              <button
                onClick={() => updateStatus(o._id, "accepted")}
                className="bg-green-500 text-white px-4 py-1 rounded mr-2">
                Accept
              </button>
              <button
                onClick={() => updateStatus(o._id, "rejected")}
                className="bg-red-500 text-white px-4 py-1 rounded">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
