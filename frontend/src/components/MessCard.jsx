import API from "../services/api";

export default function MessCard({ mess }) {
  const order = async () => {
    await API.post("/orders/create", {
      messId: mess._id,
      items: ["Lunch"],
      totalPrice: 100
    });
    alert("Order Placed");
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow hover:scale-105 transition">
      <h3 className="text-xl font-bold">{mess.name}</h3>
      <p>{mess.location}</p>
      <p className="text-green-600">{mess.offers}</p>

      <button
        onClick={order}
        className="mt-4 w-full bg-green-500 text-white py-2 rounded"
      >
        Order Now
      </button>
    </div>
  );
}
