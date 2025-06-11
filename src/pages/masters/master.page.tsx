import { useEffect, useState } from "react";
import chessApi from "@api/axios";
import { useNavigate } from "react-router-dom";

export const MasterPage = () => {
  const [masters, setMasters] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    chessApi
      .get("/titled/GM")
      .then((res) => {
        setMasters(res.data.players || []);
      })
      .catch((err) => {
        console.error("Failed to fetch GMs", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Chess Grandmasters</h1>
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {masters.map((name) => (
            <li
              key={name}
              className="bg-white shadow rounded-xl p-4 hover:bg-gray-100 transition cursor-pointer"
              onClick={() => navigate(`/master/${name}`)}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
