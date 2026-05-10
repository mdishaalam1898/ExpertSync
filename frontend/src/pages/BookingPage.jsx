import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import api from "../services/api";

function BookingPage() {
  const { id } = useParams();
  const location = useLocation();

  const date = location.state?.date || "";
  const timeSlot = location.state?.timeSlot || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bookingData = {
        expertId: id,
        date,
        timeSlot,
        ...formData,
      };

      const response = await api.post("/api/bookings", bookingData);

      setMessage(response.data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        notes: "",
      });

    } catch (error) {
      if (error.response && error.response.data.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Booking failed");
      }
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Book Session</h1>

        <div className="mb-6">
          <p><strong>Date:</strong> {date}</p>
          <p><strong>Time:</strong> {timeSlot}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Confirm Booking
          </button>
        </form>

        {message && (
          <p className="mt-4 text-lg font-semibold">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default BookingPage;