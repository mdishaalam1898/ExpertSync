import { useState } from "react";

import api from "../services/api";

import Navbar from "../components/Navbar";

function MyBookings() {

  const [email, setEmail] = useState("");

  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {

    try {

      const response = await api.get(
        `/api/bookings?email=${email}`
      );

      setBookings(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div>

      <Navbar />

      <div className="p-6">

        <h1 className="text-4xl font-bold mb-6">
          My Bookings
        </h1>

        <div className="flex gap-4 mb-6">

          <input
            type="email"
            placeholder="Enter email"
            className="border p-3 rounded-lg w-full"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <button
            onClick={fetchBookings}
            className="bg-black text-white px-5 rounded-lg"
          >
            Search
          </button>

        </div>

        <div className="space-y-4">

          {bookings.map((booking) => (

            <div
              key={booking._id}
              className="border p-5 rounded-xl"
            >

              <h2 className="text-2xl font-bold">
                {
                  booking.expertId?.name
                }
              </h2>

              <p>
                Date: {booking.date}
              </p>

              <p>
                Time: {booking.timeSlot}
              </p>

              <p>
                Status: {booking.status}
              </p>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default MyBookings;