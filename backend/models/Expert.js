const mongoose = require("mongoose");

const expertSchema = new mongoose.Schema({
  name: String,
  category: String,
  experience: Number,
  rating: Number,
  bio: String,

  availableSlots: [
    {
      date: String,

      slots: [String],
    },
  ],
});
module.exports = mongoose.model("Expert", expertSchema);