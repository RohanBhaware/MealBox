import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      res.data.role === "admin"
        ? navigate("/admin")
        : navigate("/user");
    } catch {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <input
          className="w-full p-2 border rounded mb-4"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-2 border rounded mb-4"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          Login
        </button>

        <p className="mt-4 text-center">
          No account? <Link className="text-blue-500" to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
