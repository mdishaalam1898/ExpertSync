const router = require("express").Router();

const {
  createBooking,
  getBookingsByEmail,
} = require(
  "../controllers/bookingController"
);

router.post(
  "/",
  createBooking
);

router.get(
  "/",
  getBookingsByEmail
);

module.exports = router;