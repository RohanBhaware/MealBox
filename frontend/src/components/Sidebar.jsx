import { Link } from "react-router-dom";
// import logo from "./assets/logo"

export default function Sidebar({ role }) {
  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-5 fixed">
      {/* <img src={logo} /> */}
      <h1 className="text-2xl font-bold mb-10 text-center">PG Mess</h1>

      {role === "admin" ? (
        <>
          <Link className="block mb-4 hover:text-green-400" to="/admin">
            Dashboard
          </Link>
          <Link className="block mb-4 hover:text-green-400" to="/add-mess">
            Add Mess
          </Link>
          <Link className="block mb-4 hover:text-green-400" to="/orders">
            Orders
          </Link>
        </>
      ) : (
        <>
          <Link className="block mb-4 hover:text-green-400" to="/user">
            Home
          </Link>
          <Link className="block mb-4 hover:text-green-400" to="/my-orders">
            My Orders
          </Link>
        </>
      )}
    </div>
  );
}
