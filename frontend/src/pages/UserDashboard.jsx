import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import MessCard from "../components/MessCard";

export default function UserDashboard() {
  const [messes, setMesses] = useState([]);

  useEffect(() => {
    API.get("/mess/all").then(res => setMesses(res.data));
  }, []);

  return (
    <div className="flex">
      <Sidebar role="user" />

      <div className="ml-64 p-8 w-full bg-gray-100 min-h-screen">
        <h2 className="text-3xl font-bold mb-6">Available Mess</h2>

        <div className="grid grid-cols-3 gap-6">
          {messes.map(mess => (
            <MessCard key={mess._id} mess={mess} />
          ))}
        </div>
      </div>
    </div>
  );
}
