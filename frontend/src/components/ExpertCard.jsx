import React from "react";
import { Link } from "react-router-dom";

function ExpertCard({ expert }) {
  return (
    <div className="border rounded-xl p-5 shadow-md">
      <h2 className="text-2xl font-bold">{expert.name}</h2>
      <p className="mt-2">Category:{expert.category}</p>
      <p>Experience:{expert.experience} years</p>
      <p> Rating: ⭐ {expert.rating}</p>

      <Link
        to={`/expert/${expert._id}`}
        className="inline-block mt-4 bg-black text-white
      px-4 py-2 rounded-lg hover:bg-gray-800 transition"
      >
        View detauls
      </Link>
    </div>
  );
}

export default ExpertCard;
