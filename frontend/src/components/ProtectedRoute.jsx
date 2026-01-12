import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Role mismatch
  if (role && role !== userRole) {
    return <Navigate to="/" replace />;
  }

  return children;
}
