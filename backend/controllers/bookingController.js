const Booking = require("../models/Booking");

exports.createBooking = async (req, res) => {

  try {

    const booking = await Booking.create(
      req.body
    );

    req.app
      .get("io")
      .emit("slotBooked", {
        expertId: booking.expertId,
        date: booking.date,
        timeSlot: booking.timeSlot,
      });

    res.status(201).json({
      message: "Booking successful",
      booking,
    });

  } catch (error) {

    if (error.code === 11000) {

      return res.status(400).json({
        message:
          "Slot already booked. Please choose another time",
      });

    }

    res.status(500).json({
      message: "Booking failed",
    });

  }
};

exports.getBookingsByEmail = async (
  req,
  res
) => {

  try {

    const { email } = req.query;

    let bookings;

    if (email) {

      bookings = await Booking.find({
        email,
      });

    } else {

      bookings = await Booking.find();

    }

    res.json(bookings);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message:
        "Failed to fetch bookings",
    });

  }
};