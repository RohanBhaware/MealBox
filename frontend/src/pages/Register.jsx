import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "", email: "", password: "", role: "user"
  });
  const navigate = useNavigate();

  const register = async () => {
    await API.post("/auth/register", form);
    navigate("/");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        <input className="input" placeholder="Name"
          onChange={e => setForm({ ...form, name: e.target.value })} />

        <input className="input mt-3" placeholder="Email"
          onChange={e => setForm({ ...form, email: e.target.value })} />

        <input type="password" className="input mt-3" placeholder="Password"
          onChange={e => setForm({ ...form, password: e.target.value })} />

        <select className="input mt-3"
          onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={register}
          className="mt-6 w-full bg-green-500 text-white py-2 rounded">
          Register
        </button>
      </div>
    </div>
  );
}
