import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import UserDashboard from "./pages/UserDashboard";
import MyOrders from "./pages/MyOrders";

import AdminDashboard from "./pages/AdminDashboard";
import AddMess from "./pages/AddMess";
import Orders from "./pages/Orders";

import ProtectedRoute from "./components/ProtectedRoute";
import MessDetails from "./pages/MessDetails";

export default function App() {
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- PUBLIC ROUTES ---------- */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* ---------- USER ROUTES ---------- */}
        <Route
          path="/user"
          element={
            <ProtectedRoute role="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-orders"
          element={
            <ProtectedRoute role="user">
              <MyOrders />
            </ProtectedRoute>
          }
        />
        {/* ---------- ADMIN ROUTES ---------- */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-mess"
          element={
            <ProtectedRoute role="admin">
              <AddMess />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute role="admin">
              <Orders />
            </ProtectedRoute>
          }
        />
       
        <Route
          path="/mess/:id"
          element={
            <ProtectedRoute role="user">
              <MessDetails />
            </ProtectedRoute>
          }
        />
        {/* ---------- FALLBACK ROUTE ---------- */}
        <Route
          path="*"
          element={
            role === "admin" ? (
              <Navigate to="/admin" />
            ) : role === "user" ? (
              <Navigate to="/user" />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
