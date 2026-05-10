import { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import socket from "../socket";

import api from "../services/api";

function ExpertDetail() {
  const { id } = useParams();

  console.log("ID:", id);

  const [expert, setExpert] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const fetchExpert = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/api/experts/${id}`);

      console.log(response.data);

      setExpert(response.data);

      setError("");
    } catch (err) {
      console.log(err);

      setError("Failed to fetch expert");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpert();
  }, [id]);

  useEffect(() => {
    if (!expert) return;

    socket.on("slotBooked", ({ expertId, date, timeSlot }) => {
      if (expertId === expert._id) {
        setExpert((prev) => {
          const updatedSlots = prev.availableSlots.map((slotGroup) => {
            if (slotGroup.date === date) {
              return {
                ...slotGroup,
                slots: slotGroup.slots.filter((slot) => slot !== timeSlot),
              };
            }
            return slotGroup;
          });

          return {
            ...prev,
            availableSlots: updatedSlots,
          };
        });
      }
    });

    return () => {
      socket.off("slotBooked");
    };
  }, [expert]);
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="p-6">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  if (!expert) {
    return (
      <div className="p-6">
        <p>No expert found</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-4xl font-bold">{expert.name}</h1>

        <p className="mt-4 text-lg">Category: {expert.category}</p>

        <p className="text-lg">Experience: {expert.experience} years</p>

        <p className="text-lg">Rating: ⭐ {expert.rating}</p>

        <p className="mt-4 text-gray-700">{expert.bio}</p>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Available Slots</h2>

          {expert.availableSlots?.length > 0 ? (
            expert.availableSlots.map((slotGroup, index) => (
              <div key={index} className="border p-4 rounded-xl mb-5">
                <h3 className="text-xl font-semibold mb-3">{slotGroup.date}</h3>

                <div className="flex gap-3 flex-wrap">
                  {slotGroup.slots.map((slot, i) => (
                    <Link
                      key={i}
                      to={`/booking/${expert._id}`}
                      state={{
                        date: slotGroup.date,
                        timeSlot: slot,
                      }}
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                      {slot}
                    </Link>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>No slots available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExpertDetail;
