import { useNavigate } from "react-router-dom";

export default function MessCard({ mess }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white p-5 rounded-xl shadow hover:scale-105 transition">
      <img
        src={`http://localhost:5000/uploads/${mess.image}`}
        className="h-40 w-full object-cover rounded"
      />

      <h3 className="text-xl font-bold mt-3">{mess.name}</h3>
      <p>{mess.location}</p>
      <p className="text-green-600">{mess.offers}</p>

      <button
        onClick={() => navigate(`/mess/${mess._id}`)}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
      >
        View Details
      </button>
    </div>
  );
}
