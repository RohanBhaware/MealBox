import { useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

export default function AddMess() {
  const [menu, setMenu] = useState([]);
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    location: "",
    offers: ""
  });

  const addMenuItem = () => {
    setMenu([
      ...menu,
      { name: "", description: "", price: "", availableToday: true }
    ]);
  };

  const updateMenu = (index, field, value) => {
    const updated = [...menu];
    updated[index][field] = value;
    setMenu(updated);
  };

  const submit = async () => {
    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("location", form.location);
      data.append("offers", form.offers);
      data.append("menu", JSON.stringify(menu));
      if (image) data.append("image", image);

      await API.post("/mess/add", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Mess added successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to add mess");
    }
  };

  return (
    <div className="flex">
      <Sidebar role="admin" />

      <div className="ml-64 p-8 w-full">
        <h2 className="text-2xl font-bold mb-4">Add Mess</h2>

        <input
          className="input"
          placeholder="Mess Name"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          className="input mt-3"
          placeholder="Location"
          onChange={e => setForm({ ...form, location: e.target.value })}
        />

        <input
          className="input mt-3"
          placeholder="Offers"
          onChange={e => setForm({ ...form, offers: e.target.value })}
        />

        <input
          type="file"
          className="mt-3"
          onChange={e => setImage(e.target.files[0])}
        />

        <h3 className="mt-6 text-xl font-semibold">Menu</h3>

        {menu.map((item, i) => (
          <div key={i} className="bg-white p-3 rounded shadow mt-3">
            <input
              className="input"
              placeholder="Item Name"
              onChange={e => updateMenu(i, "name", e.target.value)}
            />
            <input
              className="input mt-2"
              placeholder="Description"
              onChange={e => updateMenu(i, "description", e.target.value)}
            />
            <input
              className="input mt-2"
              placeholder="Price"
              type="number"
              onChange={e => updateMenu(i, "price", e.target.value)}
            />
          </div>
        ))}

        <button
          onClick={addMenuItem}
          className="mt-3 bg-blue-500 text-white px-4 py-1 rounded"
        >
          + Add Menu Item
        </button>

        <button
          onClick={submit}
          className="mt-6 bg-green-500 text-white px-6 py-2 rounded"
        >
          Submit Mess
        </button>
      </div>
    </div>
  );
}
