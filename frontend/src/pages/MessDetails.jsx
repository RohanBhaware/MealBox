import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

export default function MessDetails() {
  const { id } = useParams();
  const [mess, setMess] = useState(null);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    API.get(`/mess/${id}`)
      .then(res => setMess(res.data))
      .catch(() => alert("Failed to load mess"));
  }, [id]);

  if (!mess) {
    return (
      <div className="flex">
        <Sidebar role="user" />
        <div className="ml-64 p-8">Loading...</div>
      </div>
    );
  }

  const toggleItem = (item) => {
    setSelected(prev =>
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const totalPrice = selected.reduce((sum, i) => sum + i.price, 0);

  const placeOrder = async () => {
    if (selected.length === 0) {
      alert("Select at least one item");
      return;
    }

    try {
      await API.post("/orders/create", {
        messId: mess._id,
        items: selected.map(i => i.name),
        totalPrice
      });
      alert("Order placed successfully");
      setSelected([]);
    } catch {
      alert("Order failed");
    }
  };

  return (
    <div className="flex">
      <Sidebar role="user" />

      <div className="ml-64 p-8 w-full bg-gray-100 min-h-screen">
        <img
          src={
            mess.image
              ? `http://localhost:5000/uploads/${mess.image}`
              : "https://via.placeholder.com/600x300"
          }
          className="h-64 w-full object-cover rounded"
          alt="Mess"
        />

        <h2 className="text-3xl font-bold mt-4">{mess.name}</h2>
        <p>{mess.location}</p>
        <p className="text-green-600">{mess.offers}</p>

        <h3 className="text-2xl font-semibold mt-6">Today's Menu</h3>

        {mess.menu?.length === 0 && (
          <p className="text-gray-500 mt-3">No menu available today</p>
        )}

        {mess.menu?.map((item, i) => (
          item.availableToday && (
            <div
              key={i}
              className="bg-white p-4 rounded shadow mt-3 flex justify-between items-center"
            >
              <div>
                <h4 className="font-bold">
                  {item.name} – ₹{item.price}
                </h4>
                <p className="text-gray-600">{item.description}</p>
              </div>

              <input
                type="checkbox"
                checked={selected.includes(item)}
                onChange={() => toggleItem(item)}
                className="w-5 h-5"
              />
            </div>
          )
        ))}

        <div className="mt-6 flex justify-between items-center">
          <p className="text-xl font-bold">Total: ₹{totalPrice}</p>

          <button
            onClick={placeOrder}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
