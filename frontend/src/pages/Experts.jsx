import Navbar from "../components/Navbar";
import api from "../services/api";
import Loader from "../components/Loader";
import ExpertCard from "../components/ExpertCard";

import { useEffect, useState } from "react";

function Experts() {

  const [experts, setExperts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("");

  const [page, setPage] = useState(1);

  const fetchExperts = async () => {

    try {

      setLoading(true);

      const response = await api.get(
        `/api/experts?page=${page}&search=${search}&category=${category}`
      );

      console.log(response.data);

      setExperts(response.data);

      setError("");

    } catch (err) {

      console.log(err);

      setError("Failed to fetch experts");

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchExperts();
  }, [page, search, category]);

  return (
    <div>

      <Navbar />

      <div className="p-6">

        <h1 className="text-4xl font-bold mb-6">
          Experts
        </h1>

        <div className="flex gap-4 mb-6">

          <input
            type="text"
            placeholder="Search experts..."
            className="border p-2 rounded-lg w-full"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <select
            className="border p-2 rounded-lg"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >
            <option value="">
              All
            </option>

            <option value="Fitness">
              Fitness
            </option>

            <option value="Career">
              Career
            </option>

            <option value="Finance">
              Finance
            </option>

          </select>

        </div>

        {loading && <Loader />}

        {error && (
          <p className="text-red-500">
            {error}
          </p>
        )}

        <div className="grid md:grid-cols-3 gap-5">

          {experts?.length > 0 ? (

            experts.map((expert) => (

              <ExpertCard
                key={expert._id}
                expert={expert}
              />

            ))

          ) : (

            !loading && (
              <p>No experts found</p>
            )

          )}

        </div>

        <div className="flex gap-4 mt-8">

          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Previous
          </button>

          <button
            onClick={() => setPage(page + 1)}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}

export default Experts;