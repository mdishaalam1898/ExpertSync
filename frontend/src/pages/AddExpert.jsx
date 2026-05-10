import { useState } from "react";

import Navbar from "../components/Navbar";

import api from "../services/api";

function AddExpert() {

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    experience: "",
    rating: "",
    bio: "",
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

      const expertData = {
        ...formData,
        availableSlots: [
          {
            date: "2026-05-10",
            slots: [
              "10 AM",
              "11 AM",
              "2 PM",
              "5 PM"
            ],
          },
        ],
      };

      await api.post(
        "/api/experts",
        expertData
      );

      setMessage("Expert added successfully");

      setFormData({
        name: "",
        category: "",
        experience: "",
        rating: "",
        bio: "",
      });

    } catch (error) {

      console.log(error);

      setMessage("Failed to add expert");

    }
  };

  return (
    <div>

      <Navbar />

      <div className="max-w-xl mx-auto p-6">

        <h1 className="text-4xl font-bold mb-6">
          Add Expert
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

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
            type="text"
            name="category"
            placeholder="Category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            name="experience"
            placeholder="Experience"
            required
            value={formData.experience}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating"
            required
            value={formData.rating}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <textarea
            name="bio"
            placeholder="Bio"
            required
            value={formData.bio}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
          />

          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Add Expert
          </button>

        </form>

        {message && (

          <p className="mt-4 font-semibold">
            {message}
          </p>

        )}

      </div>

    </div>
  );
}

export default AddExpert;