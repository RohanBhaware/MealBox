import { useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

export default function AddMess() {
  const [form, setForm] = useState({ name: "", location: "", offers: "" });

  const submit = async () => {
    await API.post("/mess/add", form);
    alert("Mess Added");
  };

  return (
    <div className="flex">
      <Sidebar role="admin" />

      <div className="ml-64 p-8 w-full">
        <h2 className="text-2xl font-bold mb-6">Add Mess</h2>

        <input
          placeholder="Mess Name"
          className="input"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Location"
          className="input mt-4"
          onChange={e => setForm({ ...form, location: e.target.value })}
        />
        <input
          placeholder="Offers"
          className="input mt-4"
          onChange={e => setForm({ ...form, offers: e.target.value })}
        />

        <button
          onClick={submit}
          className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg"
        >
          Add Mess
        </button>
      </div>
    </div>
  );
}
