import Sidebar from "../components/Sidebar";

export default function AdminDashboard() {
  return (
    <div className="flex">
      <Sidebar role="admin" />

      <div className="ml-64 p-8 w-full bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>

        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl">Total Orders</h3>
            <p className="text-3xl font-bold text-green-500">--</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl">Pending Orders</h3>
            <p className="text-3xl font-bold text-yellow-500">--</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-xl">Total Mess</h3>
            <p className="text-3xl font-bold text-blue-500">--</p>
          </div>
        </div>
      </div>
    </div>
  );
}
