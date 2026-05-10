import { Link } from "react-router-dom";

function Navbar() {

  return (
    <div className="flex justify-between items-center p-5 bg-black text-white">

      <h1 className="text-2xl font-bold">
        Expert Booking
      </h1>

      <div className="flex gap-6">

        <Link to="/">
          Home
        </Link>

        <Link to="/my-bookings">
          My Bookings
        </Link>

        <Link to="/add-expert">
          Add Expert
        </Link>

      </div>

    </div>
  );
}

export default Navbar;