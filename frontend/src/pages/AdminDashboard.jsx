import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMess: 0,
    totalOrders: 0,
    pendingOrders: 0
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await API.get("/admin/dashboard-stats");
      setStats(res.data);
    } catch (err) {
      console.error("Failed to load dashboard stats");
    }
  };

  return (
    <div className="flex">
      <Sidebar role="admin" />

      <div className="ml-64 p-8 w-full bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-8">
          Admin Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* TOTAL MESS */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg text-gray-600">
              Total Mess
            </h3>
            <p className="text-4xl font-bold text-blue-600 mt-2">
              {stats.totalMess}
            </p>
          </div>

          {/* TOTAL ORDERS */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg text-gray-600">
              Total Orders
            </h3>
            <p className="text-4xl font-bold text-green-600 mt-2">
              {stats.totalOrders}
            </p>
          </div>

          {/* PENDING ORDERS */}
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-lg text-gray-600">
              Pending Orders
            </h3>
            <p className="text-4xl font-bold text-yellow-500 mt-2">
              {stats.pendingOrders}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
