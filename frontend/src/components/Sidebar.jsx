import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg";

export default function Sidebar({ role }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed flex flex-col">

      {/* LOGO */}
      <div className="flex flex-col items-center mb-10">
        <img
          src={logo}
          alt="PG Mess Logo"
          className="w-20 h-20 object-contain rounded-full mb-2"
        />
        <h1 className="text-xl font-bold text-center">
          PG Mess
        </h1>
      </div>

      {/* NAV LINKS */}
      <div className="flex-1">
        {role === "admin" ? (
          <>
            <Link
              to="/admin"
              className="block mb-4 px-3 py-2 rounded hover:bg-gray-800 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/add-mess"
              className="block mb-4 px-3 py-2 rounded hover:bg-gray-800 transition"
            >
              Add Mess
            </Link>

            <Link
              to="/orders"
              className="block mb-4 px-3 py-2 rounded hover:bg-gray-800 transition"
            >
              Orders
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/user"
              className="block mb-4 px-3 py-2 rounded hover:bg-gray-800 transition"
            >
              Home
            </Link>

            <Link
              to="/my-orders"
              className="block mb-4 px-3 py-2 rounded hover:bg-gray-800 transition"
            >
              My Orders
            </Link>
          </>
        )}
      </div>

      {/* LOGOUT BUTTON */}
      <button
        onClick={logout}
        className=" bg-red-500 hover:bg-red-600 text-white py-2 rounded transition"
      >
        Logout
      </button>
    </div>
  );
}
